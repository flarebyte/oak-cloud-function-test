import {
  OakAction,
  OakActionCall,
  OakActionCompanion,
  OakActionRequestEvent,
  OakEngineContext,
  OakRequestEvent,
} from '../../src/model';
import { bizOperationObj } from '../fixture-business-operation';
import { createS1Params } from '../storage/s1-storage-factory';
import {
  AggregateTask,
  AlphaAggregateParams,
  CityPayload,
} from './alpha-aggregate-model';
import { aggregateDataAction } from './alpha-aggregate-data';
import { buildFunctionCompanion } from '../../src/companion-utils';
const readFromLondon = (action: OakAction): OakRequestEvent => ({
  businessOperation: bizOperationObj.readLondonData,
  caller: `action/${action.name}`,
  comment: 'read from London',
  serviceParams: createS1Params('city/london'),
  systemFlags: [],
  payload: {},
  flags: [],
});

const readFromParis = (action: OakAction): OakRequestEvent => ({
  businessOperation: bizOperationObj.readParisData,
  caller: `action/${action.name}`,
  comment: 'read from Paris',
  serviceParams: createS1Params('city/paris'),
  systemFlags: [],
  payload: {},
  flags: [],
});

const writeToEurope = (
  action: OakAction,
  cityPayload: CityPayload
): OakRequestEvent => ({
  businessOperation: bizOperationObj.writeEuropeData,
  caller: `action/${action.name}`,
  comment: 'write to europe',
  serviceParams: createS1Params('city/europe'),
  systemFlags: [],
  payload: cityPayload,
  flags: [],
});

const mergeCityPayload = (a: CityPayload, b: CityPayload): CityPayload => ({
  data: [...a.data, ...b.data],
});

const sumCityPayload = (a: CityPayload, b: CityPayload): CityPayload => ({
  data: [a.data.reduce((x, y) => x + y), b.data.reduce((x, y) => x + y)],
});

const koResponse = {
  status: aggregateDataAction.statusDict.ko,
  comment: 'Failure',
  payload: {
    message: 'Failure',
  },
  flags: [],
};

export const aggregateData: OakActionCall = async (
  _ctx: OakEngineContext,
  companion: OakActionCompanion,
  request: OakActionRequestEvent
) => {
  const londonData = await companion.call.readS1(
    readFromLondon(aggregateDataAction)
  );
  const parisData = await companion.call.readS1(
    readFromParis(aggregateDataAction)
  );
  if (londonData.status.name !== 'ok' || parisData.status.name !== 'ok') {
    return Promise.resolve(koResponse);
  }
  const task: AggregateTask = (request.params as AlphaAggregateParams).task;
  const aggregated: CityPayload =
    task === AggregateTask.Merge
      ? mergeCityPayload(
          londonData.payload as CityPayload,
          parisData.payload as CityPayload
        )
      : sumCityPayload(
          londonData.payload as CityPayload,
          parisData.payload as CityPayload
        );
  const resp = await companion.call.writeS1(
    writeToEurope(aggregateDataAction, aggregated)
  );
  return resp;
};

export const aggregateCompanion = buildFunctionCompanion([
  {
    action: aggregateDataAction,
    call: aggregateData,
  },
]);
