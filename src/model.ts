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

export interface OakRequestEventType extends OakBase {
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

export interface OakUniverse {
  services: OakService[];
  statusList: OakActionStatus[];
  reqEventTypes: OakRequestEventType[];
  actions: OakAction[];
}

export type DoAction = (
  universe: OakUniverse,
  request: OakRequestEvent
) => Promise<OakResponseEvent>;
