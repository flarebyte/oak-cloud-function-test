export interface OakMeta {
  name: string;
  description: string;
  flags: string[];
}

export interface OakActionStatus extends OakMeta {}
/**
 * Ex: aws:s3
 */
export interface OakService extends OakMeta {}

/**
 * Configuration of a service
 * @example read-from-s3
 */
export interface OakAction extends OakMeta {
  service: OakService;
  statusList: OakActionStatus[];
}

export interface OakRequestEventType extends OakMeta {
    action: OakAction;
    caller: string;
  }

export interface OakRequestEvent {
  eventType: OakRequestEventType;
  information: string;
  body: object;
}

export interface OakInnerRequestEvent extends OakRequestEvent {
    id: number;
}

export interface OakResponseEvent {
    status: OakActionStatus;
    information: string;
    body: object;
  }

  export type doAction = (request: OakRequestEvent) =>  Promise<OakResponseEvent>

