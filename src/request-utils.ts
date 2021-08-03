import {
  OakAction,
  OakActionRequestEvent,
  OakBusinessOperation,
  OakFunction,
  OakRequestEvent,
} from './model';

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

interface OakActionRequestEventSimpleParams<V, P> {
  comment: string;
  params: V;
  payload: P;
  callerFunction: OakFunction;
}

export function createActionRequestEvent<V extends object, P extends object>({
  comment,
  params,
  payload,
  callerFunction,
}: OakActionRequestEventSimpleParams<V, P>): OakActionRequestEvent {
  return {
    caller: callerFunction.name,
    comment,
    params,
    systemFlags: [],
    payload,
    flags: [],
  };
}
