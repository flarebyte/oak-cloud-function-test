import { mergeActionCompanions } from './companion-utils';
import {
  OakRequestEvent,
  OakResponseEvent,
  OakActionCompanion,
  OakEngineContext,
  OakCall,
} from './model';
import { summarizeServiceOpTransaction } from './simulator-summarizer';

function cloneValue<A>(value: A): A {
  const jsonstr = JSON.stringify(value);
  const result: A = JSON.parse(jsonstr);
  return result;
}

class OakSimulator {
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
    this.actionCompanion = mergeActionCompanions(companions);
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

const simulatedCall = (simulator: OakSimulator, wrapped: OakCall) => async (
  context: OakEngineContext,
  request: OakRequestEvent
): Promise<OakResponseEvent> => {
  const respEvent = await wrapped(context, request);
  simulator.addTransaction(request, respEvent);
  return respEvent;
};

const toSimulatedActionCompanion = (
  companion: OakActionCompanion
): OakActionCompanion => ({
  call: companion.call,
  callByServiceOp: companion.callByServiceOp,
});
