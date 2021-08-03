import { OakAction, OakBusinessOperation, OakRequestEvent } from './model';

interface OakRequestEventSimpleParams<V, P> {
  businessOperation: OakBusinessOperation;
  comment: string;
  serviceParams: V;
  payload: P;
  callerAction: OakAction;
}

export function createRequestEvent<V extends object, P extends object>({
  businessOperation,
  comment,
  serviceParams,
  payload,
  callerAction,
}: OakRequestEventSimpleParams<V, P>): OakRequestEvent {
  return {
    businessOperation,
    caller: callerAction.name,
    comment,
    serviceParams,
    systemFlags: [],
    payload,
    flags: [],
  };
}
