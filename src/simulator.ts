import {
  mergeActionCompanions,
  transformActionCompanion,
} from './companion-utils';
import {
  OakRequestEvent,
  OakResponseEvent,
  OakActionCompanion,
  OakEngineContext,
  OakCall,
  OakCallWrapper,
  OakServiceOperation,
  OakEventTransaction,
} from './model';
import { summarizeServiceOpTransaction } from './simulator-summarizer';

function cloneValue<A>(value: A): A {
  const jsonStr = JSON.stringify(value);
  const result: A = JSON.parse(jsonStr);
  return result;
}

export class OakSimulator {
  context: OakEngineContext;
  actionCompanion: OakActionCompanion;

  constructor() {
    this.context = {
      transactions: [],
      systemFlags: [],
    };
    this.actionCompanion = {
      explicitCall: {},
      call: {},
      callServiceOperationDict: {},
    };
  }

  getCall(){
    return this.actionCompanion.call;
  }

  reset() {
    this.context.transactions = [];
  }

  _addTransaction(
    serviceOperation: OakServiceOperation,
    request: OakRequestEvent,
    response: OakResponseEvent
  ) {
    const transaction: OakEventTransaction = {
      id: this.context.transactions.length,
      serviceOperation,
      request,
      response,
    };
    this.context.transactions.push(cloneValue(transaction));
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
      const respEvent = await wrapped(thisContext, reqEvent);
      this._addTransaction(serviceOperation, reqEvent, respEvent);
      return respEvent;
    };
    this.actionCompanion = transformActionCompanion(wrapper)(oneCompanion);
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
}
