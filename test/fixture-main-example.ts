import { OakCall, OakRequestEvent, OakResponseEvent } from '../src/model';
import { actionObj } from './fixture-action';
import { statusObj } from './fixture-status';

const okResponse: OakResponseEvent = {
  status: statusObj.ok,
  payload: {
    comment: 'Success',
    body: {
      message: 'Ok',
    },
  },
};

const writeLondonDao: OakCall = async (_b: OakRequestEvent) => {
  return Promise.resolve(okResponse);
};

const writeParisDao: OakCall = async (_b: OakRequestEvent) => {
  return Promise.resolve(okResponse);
};

const writeEuropeDao: OakCall = async (_b: OakRequestEvent) => {
  return Promise.resolve(okResponse);
};

const readLondonDao: OakCall = async (_b: OakRequestEvent) => {
  return Promise.resolve(okResponse);
};

const readParisDao: OakCall = async (_b: OakRequestEvent) => {
  return Promise.resolve(okResponse);
};

const doNothingDao: OakCall = async (_b: OakRequestEvent) => {
  return Promise.resolve(okResponse);
};

interface CityReqPayload {
  datetime: string;
}

interface CityPayload {
  city: string;
  datetime: string;
  values: number[];
}

const londonService = async (call: OakCall, request: OakRequestEvent) => {
  const cityReqPayload: CityReqPayload = request.payload.body as CityReqPayload;
  const writeLondonDataReq: OakRequestEvent = {
    action: actionObj.writeLondonData,
    caller: `action:${request.action.name}`,
    serviceParams: {
      comment: 'london params',
      body: {
        path: 'city',
      },
    },
    payload: {
      comment: 'Saving data for London',
      body: {
        city: 'London',
        datetime: cityReqPayload.datetime,
        values: [1, 7, 13],
      },
    },
  };
  await call(writeLondonDataReq);
  return Promise.resolve(statusObj.ok);
};

const parisService = async (call: OakCall, request: OakRequestEvent) => {
  const cityReqPayload: CityReqPayload = request.payload.body as CityReqPayload;
  const writeParisDataReq: OakRequestEvent = {
    action: actionObj.writeLondonData,
    caller: `action:${request.action.name}`,
    serviceParams: {
      comment: 'paris params',
      body: {
        path: 'city',
      },
    },
    payload: {
      comment: 'Saving data for Paris',
      body: {
        city: 'Paris',
        datetime: cityReqPayload.datetime,
        values: [3, 4, 12],
      },
    },
  };
  await call(writeParisDataReq);
  return Promise.resolve(statusObj.ok);
};

const europeService = async (call: OakCall, request: OakRequestEvent) => {
  const cityReqPayload: CityReqPayload = request.payload.body as CityReqPayload;
  const readLondonDataReq: OakRequestEvent = {
    action: actionObj.writeLondonData,
    caller: `action:${request.action.name}`,
    serviceParams: {
      comment: 'europe params',
      body: {
        path: 'city',
      },
    },
    payload: {
      comment: 'Reading data for London',
      body: {
        datetime: cityReqPayload.datetime,
      },
    },
  };
  const london = await call(readLondonDataReq);
  const londonPayload = london.payload.body as CityPayload;

  const readParisDataReq: OakRequestEvent = {
    action: actionObj.writeParisData,
    caller: `action:${request.action.name}`,
    serviceParams: {
      comment: 'paris params',
      body: {
        path: 'city',
      },
    },
    payload: {
      comment: 'Reading data for Paris',
      body: {
        datetime: cityReqPayload.datetime,
      },
    },
  };
  const paris = await call(readParisDataReq);
  const parisPayload = paris.payload.body as CityPayload;

  const writeEuropeDataReq: OakRequestEvent = {
    action: actionObj.writeEuropeData,
    caller: `action:${request.action.name}`,
    serviceParams: {
      comment: 'paris params',
      body: {
        path: 'city',
      },
    },
    payload: {
      comment: 'Reading data for Paris',
      body: {
        results: [parisPayload, londonPayload],
      },
    },
  };
  await call(writeEuropeDataReq);
  return Promise.resolve(statusObj.ok);
};

interface keyCall {
  key: string;
  call: OakCall;
}

const daoObj: keyCall[] = [
  { key: actionObj.readLondonData.name, call: readLondonDao },
  { key: actionObj.readParisData.name, call: readParisDao },
  { key: actionObj.writeLondonData.name, call: writeLondonDao },
  { key: actionObj.writeParisData.name, call: writeParisDao },
  { key: actionObj.writeEuropeData.name, call: writeEuropeDao },
];

const superCaller: OakCall = async (reqEvent: OakRequestEvent) => {
  const keyCall: keyCall = daoObj.find(
    dao => dao.key === reqEvent.action.name
  ) || { key: '', call: doNothingDao };
  return await keyCall.call(reqEvent);
};

const doActionObj = {
  londonService,
  parisService,
  europeService,
};

export { doActionObj, superCaller };
