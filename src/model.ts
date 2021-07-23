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
  service: OakService;
  statusDict: {
    [name: string]: OakStatus;
  };
}

export interface OakResource extends OakBase {}

/**
 * Configuration of a service
 * @example read-from-s3
 */
export interface OakAction extends OakBase {
  serviceOperation: OakServiceOperation;
  resource: OakResource;
  statusDict: {
    [name: string]: OakStatus;
  };
}

export interface OakEvent {
  comment: string;
  payload: object;
  flags: string[];
}

export interface OakRequestEvent extends OakEvent {
  action: OakAction;
  caller: string;
  serviceParams: object;
}

export interface OakResponseEvent {
  status: OakStatus;
}

export interface OakEventTransaction {
  id: number;
  request: OakRequestEvent;
  response: OakResponseEvent;
}

export type OakCall = (request: OakRequestEvent) => Promise<OakResponseEvent>;

export type OakSimulatedCall = (
  transactions: OakEventTransaction[],
  request: OakRequestEvent
) => OakResponseEvent;

export type OakFunction = (
  call: OakCall,
  request: OakRequestEvent
) => Promise<OakResponseEvent>;

export type OakEventTransactionFilter = (
  transaction: OakEventTransaction
) => boolean;
