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

/**
 * Configuration of a service
 * @example read-from-s3
 */
export interface OakAction extends OakBase {
  service: OakService;
  statusList: OakActionStatus[];
}

export interface OakPayload {
  information: string;
  schema: string;
  body: object;
}

export interface OakRequestEvent {
  action: OakAction;
  caller: string;
  payload: OakPayload;
}

export interface OakInnerRequestEvent extends OakRequestEvent {
  id: number;
}

export interface OakResponseEvent {
  status: OakActionStatus;
  payload: OakPayload;
}
export type OakCall = (request: OakRequestEvent) => Promise<OakResponseEvent>;

export type OakFunction = (
  call: OakCall,
  request: OakRequestEvent
) => Promise<OakResponseEvent>;
