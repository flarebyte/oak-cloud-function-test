export interface OakBase {
  name: string;
  description: string;
  flags: string[];
}

export interface OakStatus extends OakBase {}
/**
 * Ex: aws:s3
 */
export interface OakService extends OakBase {}

export interface OakServiceOperation extends OakBase {
  functionName: string;
  service: OakService;
  version: string;
  statusDict: {
    [name: string]: OakStatus;
  };
}

export interface OakResource extends OakBase {}

/**
 * Configuration of a service
 * @example read-from-s3
 */
export interface OakBusinessOperation extends OakBase {
  resource: OakResource;
}

export interface OakAction extends OakBase {
  functionName: string;
  version: string;
  statusDict: {
    [name: string]: OakStatus;
  };

  systemFlagsDict: {
    [name: string]: string;
  };
}

export interface OakEvent {
  comment: string;
  payload: object;
  flags: string[];
}

export interface OakRequestEvent extends OakEvent {
  businessOperation: OakBusinessOperation;
  caller: string;
  serviceParams: object;
  systemFlags: string[];
}

export interface OakResponseEvent extends OakEvent {
  status: OakStatus;
}

export interface OakActionRequestEvent extends OakEvent {
  caller: string;
  params: object;
  systemFlags: string[];
}

export interface OakEventTransaction {
  id: number;
  serviceOperation: OakServiceOperation;
  request: OakRequestEvent;
  response: OakResponseEvent;
}

export interface OakActionEventTransaction {
  id: number;
  action: OakAction;
  request: OakActionRequestEvent;
  response: OakResponseEvent;
}

export interface OakServiceData extends OakBase {
  service: OakService;
  version: string;
  serviceOpDict: {
    [name: string]: OakServiceOperation;
  };
  statusDict: {
    [name: string]: OakStatus;
  };
  systemFlagsDict: {
    [name: string]: string;
  };
}

export interface OakEngineContext {
  transactions: OakEventTransaction[];
  actionTransactions: OakActionEventTransaction[];
  systemFlags: string[];
}

export type OakCall = (
  context: OakEngineContext,
  request: OakRequestEvent
) => Promise<OakResponseEvent>;

export type OakCtxCall = (
  request: OakRequestEvent
) => Promise<OakResponseEvent>;

export interface OakActionCompanion {
  explicitCall: {
    [name: string]: OakCall;
  };
  call: {
    [name: string]: OakCtxCall;
  };
  callServiceOperationDict: {
    [name: string]: OakServiceOperation;
  };
}

export type OakActionCall = (
  context: OakEngineContext,
  companion: OakActionCompanion,
  request: OakActionRequestEvent
) => Promise<OakResponseEvent>;

export type OakActionCtxCall = (
  request: OakActionRequestEvent
) => Promise<OakResponseEvent>;

export interface OakFunctionCompanion {
  explicitCall: {
    [name: string]: OakActionCall;
  };
  call: {
    [name: string]: OakActionCtxCall;
  };
  actionDict: {
    [name: string]: OakAction;
  };
}

export type OakCallWrapper = (
  serviceOperation: OakServiceOperation,
  call: OakCall
) => OakCtxCall;

export type OakActionCallWrapper = (
  action: OakAction,
  call: OakActionCall
) => OakActionCtxCall;

export interface OakServiceOpToCall {
  so: OakServiceOperation;
  call: OakCall;
}

export interface OakActionToCall {
  action: OakAction;
  call: OakActionCall;
}
