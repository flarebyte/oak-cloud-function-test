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
      callByServiceOp: {},
    };
  }
  reset() {
    this.context.transactions = [];
  }

  addTransaction(request: OakRequestEvent, response: OakResponseEvent) {
    const transaction = {
      id: this.context.transactions.length,
      request,
      response,
    };
    this.context.transactions.push(cloneValue(transaction));
  }

  registerActionCompanions(companions: OakActionCompanion[]) {
    const oneCompanion = mergeActionCompanions(companions);
    const wrapper: OakCallWrapper = (wrapped: OakCall) => async (
      context: OakEngineContext,
      request: OakRequestEvent
    ): Promise<OakResponseEvent> => {
      const respEvent = await wrapped(context, request);
      this.addTransaction(request, respEvent);
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
