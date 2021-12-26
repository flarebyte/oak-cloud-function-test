export interface OakBase {
  name: string;
  description: string;
  flags: string[];
}

/**
 * Metadata about a status that a function or cloud service would return
 */
export type OakStatus = OakBase;

/**
 * Metadata about a cloud service
 * @example aws:s3
 */
export type OakService = OakBase;

/**
 * Metadata about an operation available on a cloud service
 */
export interface OakServiceOperation extends OakBase {
  functionName: string;
  service: OakService;
  version: string;
  systemFlagsDict: {
    [name: string]: string;
  };
}

export type Anything = string | number | boolean | object;

export type OakResource = OakBase;

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
  customStatusDict: {
    [name: string]: OakStatus;
  };
  systemFlagsDict: {
    [name: string]: string;
  };
}

export interface OakFunction extends OakBase {
  functionName: string;
  version: string;
  customStatusDict: {
    [name: string]: OakStatus;
  };

  systemFlagsDict: {
    [name: string]: string;
  };
}
/**
 * An event that represent a payload
 */
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

/**
 * An event representing a response from a service
 */
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
  nanoSeconds: string;
}

export interface OakActionEventTransaction {
  id: number;
  action: OakAction;
  request: OakActionRequestEvent;
  response: OakResponseEvent;
}

export interface OakActionAndRequest {
  action: OakAction;
  request: OakActionRequestEvent;
}

/**
 * Metadata about a service and the available operations
 */
export interface OakServiceData extends OakBase {
  service: OakService;
  version: string;
  serviceOpDict: {
    [name: string]: OakServiceOperation;
  };
  customStatusDict: {
    [name: string]: OakStatus;
  };
}
/**
 * A context object for the engine
 */
export interface OakEngineContext {
  transactions: OakEventTransaction[];
  actionTransactions: OakActionEventTransaction[];
  systemFlags: string[];
  businessOperationFlags: {
    [name: string]: string[];
  };
  actionFlags: {
    [name: string]: string[];
  };
  functionFlags: {
    [name: string]: string[];
  };
}

/**
 * A low level call to the cloud service that should be simulated 
 */
export type OakCall = (
  context: OakEngineContext,
  request: OakRequestEvent
) => Promise<OakResponseEvent>;

export type OakCtxCall = (
  request: OakRequestEvent
) => Promise<OakResponseEvent>;

export interface OakBeforeCallInterceptor {
  call: OakCall;
  pass: boolean;
}
export type OakBeforeCall = (
  serviceOperation: OakServiceOperation,
  context: OakEngineContext,
  request: OakRequestEvent
) => OakBeforeCallInterceptor;

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
