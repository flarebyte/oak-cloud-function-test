import { OakActionEventTransaction, OakEventTransaction } from './model';
import {
  OakActionTx,
  OakSimServiceOpTx,
  OakSimServiceOpTxPerf,
} from './simulator-model';

export const summarizeServiceOpTransaction = (
  event: OakEventTransaction
): OakSimServiceOpTx => ({
  id: event.id,
  businessOperationName: event.request.businessOperation.name,
  serviceOperationName: event.serviceOperation.name,
  serviceName: event.serviceOperation.service.name,
  resourceName: event.request.businessOperation.resource.name,
  caller: event.request.caller,
  serviceParams: event.request.serviceParams,
  systemFlags: event.request.systemFlags.join(' '),
  reqComment: event.request.comment,
  reqPayload: event.request.payload,
  reqFlags: event.request.flags.join(' '),
  statusName: event.response.status.name,
  respComment: event.response.comment,
  respPayload: event.response.payload,
  respFlags: event.response.flags.join(' '),
});

export const summarizeActionTransaction = (
  event: OakActionEventTransaction
): OakActionTx => ({
  id: event.id,
  actionName: event.action.name,
  caller: event.request.caller,
  params: event.request.params,
  systemFlags: event.request.systemFlags.join(' '),
  reqComment: event.request.comment,
  reqPayload: event.request.payload,
  reqFlags: event.request.flags.join(' '),
  statusName: event.response.status.name,
  respComment: event.response.comment,
  respPayload: event.response.payload,
  respFlags: event.response.flags.join(' '),
});

export const summarizeServiceOpTransactionPerf = (
  event: OakEventTransaction
): OakSimServiceOpTxPerf => ({
  id: event.id,
  businessOperationName: event.request.businessOperation.name,
  serviceOperationName: event.serviceOperation.name,
  serviceName: event.serviceOperation.service.name,
  resourceName: event.request.businessOperation.resource.name,
  caller: event.request.caller,
  statusName: event.response.status.name,
  nanoSeconds: event.nanoSeconds,
});
