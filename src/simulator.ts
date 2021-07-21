import {
  OakAction,
  OakActionStatus,
  OakInnerRequestEvent,
  OakRequestEvent,
  OakResponseEvent,
} from './model';

const toResponseEvent = (
  _: OakAction,
  status: OakActionStatus
): OakResponseEvent => {
  return {
    status,
    payload: {
      schema: 'status',
      information: 'Success',
      body: {
        message: 'todo',
      },
    },
  };
};
const simCaller = (eventsLog: OakInnerRequestEvent[]) => async (
  reqEvent: OakRequestEvent
) => {
  const event = { id: eventsLog.length, ...reqEvent };
  eventsLog.push(event);
  console.log(eventsLog);
  return Promise.resolve(
    toResponseEvent(reqEvent.action, reqEvent.action.statusList[0])
  );
};

export { simCaller };
