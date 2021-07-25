import {
  OakEventTransaction,
  OakRequestEvent,
  OakSimulatedCall,
} from '../../src/model';
import { isSameName, sortedTxByIdDesc } from '../../src/map-red';
import { coS1 } from './s1-data';
import { validateParams } from './s1-storage-validator';

const version = 'v1.1.1';
const circuitBreakingResponse = {
  status: coS1.statusDict.circuitBreaking,
  comment: 'Circuit breaking',
  payload: {
    message: 'Circuit breaking',
    version,
  },
  flags: [],
};

const write: OakSimulatedCall = (
  _a: OakEventTransaction[],
  req: OakRequestEvent
) => {
  if (req.systemFlags.includes(coS1.systemFlagsDict.circuitBreaking)) {
    return circuitBreakingResponse;
  }
  const validErrs = validateParams(req.serviceParams);
  return validErrs.length === 0
    ? {
        status: coS1.statusDict.ok,
        comment: 'Success',
        payload: {
          message: 'Saved',
          version,
        },
        flags: [],
      }
    : {
        status: coS1.statusDict.badRequest,
        comment: 'Bad request',
        payload: {
          message: 'Not Saved',
          version,
        },
        flags: [],
      };
};

const notFoundResponse = {
  status: coS1.statusDict.notFound,
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
    .filter(t =>
      isSameName(t.request.action.serviceOperation, coS1.serviceOpDict.write)
    )
    .filter(t => isSameName(t.response.status, coS1.statusDict.ok))
    .filter(t =>
      isSameName(t.request.action.resource, reqEvent.action.resource)
    )
    .sort(sortedTxByIdDesc);

  return s1Transactions.length === 0
    ? notFoundResponse
    : {
        status: coS1.statusDict.ok,
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
