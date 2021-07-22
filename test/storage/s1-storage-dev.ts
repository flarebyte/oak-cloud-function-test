import {
  OakEventTransaction,
  OakRequestEvent,
  OakSimulatedCall,
} from '../../src/model';
import { isSameName, sortedTxByIdDesc } from '../../src/map-red';
import { coS1Status, coS1WriteOp } from './s1-data';

const s1write: OakSimulatedCall = (
  _a: OakEventTransaction[],
  _b: OakRequestEvent
) => {
  return {
    status: coS1Status.ok,
    payload: {
      comment: 'Success',
      body: {
        message: 'Saved',
      },
    },
  };
};

const notFoundResponse = {
  status: coS1Status.notFound,
  payload: {
    comment: 'Not found',
    body: {
      message: 'document is not found',
    },
  },
};
const s1read: OakSimulatedCall = (
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
        payload: {
          comment: 'Success',
          body: s1Transactions[0].request.payload.body,
        },
      };
};

const s1DevHook = {
  s1write,
  s1read,
};

export { s1DevHook };
