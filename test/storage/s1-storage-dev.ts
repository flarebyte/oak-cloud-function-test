import {
  OakEventTransaction,
  OakRequestEvent,
  OakSimulatedCall,
} from '../../src/model';
import { isSameName, sortedTxByIdDesc } from '../../src/map-red';
import { coS1Status, coS1WriteOp } from './s1-data';

const write: OakSimulatedCall = (
  _a: OakEventTransaction[],
  _b: OakRequestEvent
) => {
  return {
    status: coS1Status.ok,
    comment: 'Success',
    payload: {
      message: 'Saved',
    },
    flags: [],
  };
};

const notFoundResponse = {
  status: coS1Status.notFound,
  comment: 'Not found',
  payload: {
    message: 'document is not found',
  },
  flags: [],
};
const read: OakSimulatedCall = (
  transactions: OakEventTransaction[],
  reqEvent: OakRequestEvent
) => {
  const s1Transactions = transactions
    .filter(t => isSameName(t.request.action, coS1WriteOp))
    .filter(t => isSameName(t.response.status, coS1Status.ok))
    .filter(t =>
      isSameName(t.request.action.resource, reqEvent.action.resource)
    )
    .sort(sortedTxByIdDesc);

  return s1Transactions.length === 0
    ? notFoundResponse
    : {
        status: coS1Status.ok,
        comment: 'Success',
        payload: s1Transactions[0].request.payload,
        flags: [],
      };
};

const s1DevHook = {
  write,
  read,
};

export { s1DevHook };
