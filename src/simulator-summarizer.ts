import { OakEventTransaction } from './model';
import { OakSimServiceOpTx } from './simulator-model';

export const summarizeServiceOpTransaction = (
  event: OakEventTransaction
): OakSimServiceOpTx => ({
  id: event.id,
  businessOperationName: event.request.businessOperation.name,
  serviceOperationName: event.serviceOperation.name,
  serviceName: event.serviceOperation.service.name,
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
