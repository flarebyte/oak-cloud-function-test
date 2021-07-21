import {
  OakAction,
  OakActionStatus,
  OakInnerRequestEvent,
  OakRequestEvent,
  OakResponseEvent,
} from './model';

function cloneValue<A>(value: A): A {
  const jsonstr = JSON.stringify(value);
  const result: A = JSON.parse(jsonstr);
  return result;
}

class OakEventLog {
  reqEvents: OakInnerRequestEvent[];
  constructor() {
    this.reqEvents = [];
  }
  reset() {
    this.reqEvents = [];
  }

  addReqEvent(reqEvent: OakRequestEvent) {
    const event = { id: this.reqEvents.length, ...reqEvent };
    this.reqEvents.push(cloneValue(event));
  }

  toInfo() {
    return JSON.stringify(this.reqEvents, null, 2);
  }
}

const toResponseEvent = (
  _: OakAction,
  status: OakActionStatus
): OakResponseEvent => {
  return {
    status,
    payload: {
      comment: 'Success',
      body: {
        message: 'todo',
      },
    },
  };
};
const simCaller = (eventsLog: OakEventLog) => async (
  reqEvent: OakRequestEvent
) => {
  eventsLog.addReqEvent(reqEvent);
  return Promise.resolve(
    toResponseEvent(reqEvent.action, reqEvent.action.statusList[0])
  );
};

export { simCaller, OakEventLog };
