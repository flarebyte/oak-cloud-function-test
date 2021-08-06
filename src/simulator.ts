import {
  mergeActionCompanions,
  mergeFunctionCompanions,
  OakFunctionCompanionBuilder,
  transformActionCompanion,
  transformFunctionCompanion,
} from './companion-utils';
import { updateReturnStatus } from './flag-utils';
import { defaultBeforeCall } from './interceptor';
import {
  OakRequestEvent,
  OakResponseEvent,
  OakActionCompanion,
  OakEngineContext,
  OakCall,
  OakCallWrapper,
  OakServiceOperation,
  OakEventTransaction,
  OakFunctionCompanion,
  OakActionCallWrapper,
  OakAction,
  OakActionRequestEvent,
  OakActionEventTransaction,
  OakActionCall,
  OakBeforeCall,
  OakBusinessOperation,
  OakStatus,
} from './model';
import { measureTime } from './perf';
import {
  summarizeActionTransaction,
  summarizeServiceOpTransaction,
  summarizeServiceOpTransactionPerf,
} from './simulator-summarizer';
import { statusDict } from './status-data';

function cloneValue<A>(value: A): A {
  const jsonStr = JSON.stringify(value);
  const result: A = JSON.parse(jsonStr);
  return result;
}

export class OakSimulator {
  context: OakEngineContext;
  actionCompanion: OakActionCompanion;
  functionCompanion: OakFunctionCompanion;
  beforeCall: OakBeforeCall;

  constructor() {
    this.context = {
      transactions: [],
      actionTransactions: [],
      systemFlags: [],
      businessOperationFlags: {},
      actionFlags: {},
      functionFlags: {},
    };
    this.actionCompanion = {
      explicitCall: {},
      call: {},
      callServiceOperationDict: {},
    };
    this.functionCompanion = {
      explicitCall: {},
      call: {},
      actionDict: {},
    };
    this.beforeCall = defaultBeforeCall(statusDict);
  }

  getCall() {
    return this.actionCompanion.call;
  }
  getActionCall() {
    return this.functionCompanion.call;
  }

  reset() {
    this.context = {
      transactions: [],
      actionTransactions: [],
      systemFlags: [],
      businessOperationFlags: {},
      actionFlags: {},
      functionFlags: {},
    };
  }

  setBeforeCall(beforeCall: OakBeforeCall) {
    this.beforeCall = beforeCall;
  }

  _addTransaction(
    serviceOperation: OakServiceOperation,
    request: OakRequestEvent,
    response: OakResponseEvent,
    nanoSeconds: string
  ) {
    const transaction: OakEventTransaction = {
      id: this.context.transactions.length,
      serviceOperation,
      request,
      response,
      nanoSeconds,
    };
    this.context.transactions.push(cloneValue(transaction));
  }

  _addActionTransaction(
    action: OakAction,
    request: OakActionRequestEvent,
    response: OakResponseEvent
  ) {
    const transaction: OakActionEventTransaction = {
      id: this.context.actionTransactions.length,
      action,
      request,
      response,
    };
    this.context.actionTransactions.push(cloneValue(transaction));
  }

  registerActionCompanions(companions: OakActionCompanion[]) {
    const oneCompanion = mergeActionCompanions(companions);
    const wrapper: OakCallWrapper = (
      serviceOperation: OakServiceOperation,
      wrapped: OakCall
    ) => async (request: OakRequestEvent): Promise<OakResponseEvent> => {
      const thisContext = this.context;
      const reqEvent: OakRequestEvent = {
        ...request,
        systemFlags: [...request.systemFlags, ...thisContext.systemFlags],
      };
      const measuring = measureTime();
      const beforeIntercept = this.beforeCall(
        serviceOperation,
        thisContext,
        reqEvent
      );
      const respEvent = beforeIntercept.pass
        ? await wrapped(thisContext, reqEvent)
        : await beforeIntercept.call(thisContext, reqEvent);
      const nanoSeconds = measuring();
      this._addTransaction(serviceOperation, reqEvent, respEvent, nanoSeconds);
      return respEvent;
    };
    this.actionCompanion = transformActionCompanion(wrapper)(oneCompanion);
  }

  registerFunctionCompanions(companionBuilders: OakFunctionCompanionBuilder[]) {
    const companions = companionBuilders.map(builder =>
      builder(this.actionCompanion)
    );
    const oneCompanion = mergeFunctionCompanions(companions);
    const wrapper: OakActionCallWrapper = (
      action: OakAction,
      wrapped: OakActionCall
    ) => async (request: OakActionRequestEvent): Promise<OakResponseEvent> => {
      const thisContext = this.context;
      const reqEvent: OakActionRequestEvent = {
        ...request,
        systemFlags: [...request.systemFlags, ...thisContext.systemFlags],
      };
      const respEvent = await wrapped(
        thisContext,
        this.actionCompanion,
        reqEvent
      );
      this._addActionTransaction(action, reqEvent, respEvent);
      return respEvent;
    };
    this.functionCompanion = transformFunctionCompanion(wrapper)(oneCompanion);
  }

  setReturnStatusForBusinessOp(
    businessOperation: OakBusinessOperation,
    expectedStatus: OakStatus
  ) {
    const existingFlags =
      this.context.businessOperationFlags[businessOperation.name] || [];
    const newFlags = updateReturnStatus(expectedStatus, existingFlags);
    this.context.businessOperationFlags[businessOperation.name] = newFlags;
  }

  toFullInfo() {
    return JSON.stringify(this.context.transactions, null, 2);
  }

  toInfo() {
    return JSON.stringify(
      this.context.transactions.map(summarizeServiceOpTransaction),
      null,
      2
    );
  }

  toSimplifiedTx() {
    return JSON.stringify(
      {
        tx: this.context.transactions.map(summarizeServiceOpTransaction),
        actionTx: this.context.actionTransactions.map(
          summarizeActionTransaction
        ),
      },
      null,
      2
    );
  }

  toServiceOpPerf() {
    return this.context.transactions.map(summarizeServiceOpTransactionPerf);
  }
}
