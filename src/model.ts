export interface OakBase {
  name: string;
  description: string;
  flags: string[];
}

export interface OakActionStatus extends OakBase {}
/**
 * Ex: aws:s3
 */
export interface OakService extends OakBase {}

export interface OakServiceOperation extends OakBase {
  service: OakService;
}

export interface OakResource extends OakBase {}

/**
 * Configuration of a service
 * @example read-from-s3
 */
export interface OakAction extends OakBase {
  serviceOperation: OakServiceOperation;
  resource: OakResource;
  statusList: OakActionStatus[];
}

export interface OakServiceParams {
  comment: string;
  body: object;
}

export interface OakPayload {
  comment: string;
  body: object;
}

export interface OakRequestEvent {
  action: OakAction;
  caller: string;
  serviceParams: OakServiceParams;
  payload: OakPayload;
}

export interface OakResponseEvent {
  status: OakActionStatus;
  payload: OakPayload;
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
