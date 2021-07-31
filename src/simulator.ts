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
      call: {},
      callServiceOperationDict: {},
    };
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
    ) => async (
      context: OakEngineContext,
      request: OakRequestEvent
    ): Promise<OakResponseEvent> => {
      const respEvent = await wrapped(context, request);
      this._addTransaction(serviceOperation, request, respEvent);
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
