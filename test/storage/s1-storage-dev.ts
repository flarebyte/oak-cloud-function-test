import {
  OakActionCompanion,
  OakCall,
  OakEngineContext,
  OakRequestEvent,
  OakResponseEvent,
} from '../../src/model';
import { isSameName, sortedTxByIdDesc } from '../../src/map-red';
import { coS1 } from './s1-data';
import { validateParams } from './s1-storage-validator';
import { buildActionCompanion } from '../../src/companion-utils';
import { statusDict } from '../../src/status-data';
const { ok, badRequest, notFound } = statusDict;

const writeSuccess: OakResponseEvent = {
  status: ok,
  comment: 'Success',
  payload: {
    message: 'Saved',
  },
  flags: [],
};
const writeBadRequest: OakResponseEvent = {
  status: badRequest,
  comment: 'Bad request',
  payload: {
    message: 'Not Saved',
  },
  flags: [],
};

const write: OakCall = (_c: OakEngineContext, req: OakRequestEvent) => {
  const validErrs = validateParams(req.serviceParams);
  return validErrs.length === 0
    ? Promise.resolve(writeSuccess)
    : Promise.resolve(writeBadRequest);
};

const notFoundResponse = {
  status: notFound,
  comment: 'Not found',
  payload: {
    message: 'document is not found',
  },
  flags: [],
};
const read: OakCall = (ctx: OakEngineContext, reqEvent: OakRequestEvent) => {
  const s1Transactions = ctx.transactions
    .filter(t => isSameName(t.serviceOperation, coS1.serviceOpDict.write))
    .filter(t => isSameName(t.response.status, ok))
    .filter(t =>
      isSameName(
        t.request.businessOperation.resource,
        reqEvent.businessOperation.resource
      )
    )
    .sort(sortedTxByIdDesc);

  return s1Transactions.length === 0
    ? Promise.resolve(notFoundResponse)
    : Promise.resolve({
        status: ok,
        comment: 'Success',
        payload: s1Transactions[0].request.payload,
        flags: [],
      });
};

const s1DevCompanion: OakActionCompanion = buildActionCompanion([
  {
    so: coS1.serviceOpDict.read,
    call: read,
  },
  {
    so: coS1.serviceOpDict.write,
    call: write,
  },
]);

export { s1DevCompanion };
