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
  serviceOperation: OakServiceOperation;
  resource: OakResource;
}

export interface OakAction extends OakBase {
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
  action: OakAction;
  caller: string;
  params: object;
  systemFlags: string[];
}

export interface OakEventTransaction {
  id: number;
  request: OakRequestEvent;
  response: OakResponseEvent;
}

export interface OakActionEventTransaction {
  id: number;
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
  systemFlags: string[];
}

export type OakCall = (
  context: OakEngineContext,
  request: OakRequestEvent
) => Promise<OakResponseEvent>;

export interface OakActionCompanion {
  call: {
    [name: string]: OakCall;
  };

  callByServiceOp: {
    [name: string]: OakCall;
  };
}

export type OakActionCall = (
  context: OakEngineContext,
  companion: OakActionCompanion,
  request: OakActionRequestEvent
) => Promise<OakResponseEvent>;

export interface OakFunctionCompanion {
  actionCompanion: OakActionCompanion;
  call: {
    [name: string]: OakActionCall;
  };
  callByAction: {
    [name: string]: OakActionCall;
  };
}

export type OakCallWrapper = (call: OakCall) => OakCall;

export type OakEventTransactionFilter = (
  transaction: OakEventTransaction
) => boolean;

export interface OakServiceOpToCall {
  so: OakServiceOperation;
  call: OakCall;
}
