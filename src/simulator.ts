import {
  OakActionStatus,
  OakEventTransaction,
  OakEventTransactionFilter,
  OakRequestEvent,
  OakResource,
  OakResponseEvent,
  OakServiceOperation,
  OakSimulatedCall,
} from './model';

function cloneValue<A>(value: A): A {
  const jsonstr = JSON.stringify(value);
  const result: A = JSON.parse(jsonstr);
  return result;
}
interface OakSimulatedServiceOpToCall {
  serviceOperation: OakServiceOperation;
  simulatedCall: OakSimulatedCall;
}

class OakSimulator {
  eventTransactions: OakEventTransaction[];
  serviceOpToCall: OakSimulatedServiceOpToCall[];

  constructor() {
    this.eventTransactions = [];
    this.serviceOpToCall = [];
  }
  reset() {
    this.eventTransactions = [];
  }

  addTransaction(request: OakRequestEvent, response: OakResponseEvent) {
    const transaction = {
      id: this.eventTransactions.length,
      request,
      response,
    };
    this.eventTransactions.push(cloneValue(transaction));
  }

  registerServiceOpToCall(
    serviceOperation: OakServiceOperation,
    simulatedCall: OakSimulatedCall
  ) {
    this.serviceOpToCall.push({ serviceOperation, simulatedCall });
  }

  toInfo() {
    return JSON.stringify(this.eventTransactions, null, 2);
  }

  serviceCall(serviceOperation: OakServiceOperation, request: OakRequestEvent) {
    const mapping = this.serviceOpToCall.find(
      m => m.serviceOperation.name === serviceOperation.name
    );
    if (!mapping)
      throw Error(`No hook for service operation:  ${serviceOperation.name}`);
    const result = mapping.simulatedCall(this.eventTransactions, request);
    return result;
  }

  filterTransactions(
    tFilter: OakEventTransactionFilter
  ): OakEventTransaction[] {
    return this.eventTransactions.filter(tFilter);
  }
}

export const byResource = (resource: OakResource) => (
  transaction: OakEventTransaction
) => transaction.request.action.resource.name === resource.name;
export const byStatus = (status: OakActionStatus) => (
  transaction: OakEventTransaction
) => transaction.response.status.name === status.name;

export const sortedTxByIdDesc = (
  a: OakEventTransaction,
  b: OakEventTransaction
): number => {
  if (a.id === b.id) return 0;
  if (a.id > b.id) return -1;
  return 1;
};

const simulatedCall = (simulator: OakSimulator) => async (
  reqEvent: OakRequestEvent
) => {
  const respEvent = simulator.serviceCall(
    reqEvent.action.serviceOperation,
    reqEvent
  );
  simulator.addTransaction(reqEvent, respEvent);
  return Promise.resolve(respEvent);
};

export { simulatedCall, OakSimulator };
