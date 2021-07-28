import { OakCall, OakRequestEvent, OakResponseEvent } from '../../src/model';

import { statusDict } from '../../src/status-data';

const { badRequest } = statusDict;

const version = 'v1.2.1';

const badResponse = {
  status: badRequest,
  comment: 'Bad request',
  payload: {
    message: 'Bad request',
    version,
  },
  flags: [],
};

export const dataStorageValidator = (wrapped: OakCall) => async (
  request: OakRequestEvent
): Promise<OakResponseEvent> => {
  if (Object(request.payload).hasOwnProperty('data')) {
    return await wrapped(request);
  } else {
    return Promise.resolve(badResponse);
  }
};
