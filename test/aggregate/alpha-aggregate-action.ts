import {
  OakActionCall,
  OakActionCompanion,
  OakActionRequestEvent,
  OakEngineContext,
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
import { createRequestEvent } from '../../src/request-utils';

const mergeCityPayload = (a: CityPayload, b: CityPayload): CityPayload => ({
  data: [...a.data, ...b.data],
});

const sumCityPayload = (a: CityPayload, b: CityPayload): CityPayload => ({
  data: [a.data.reduce((x, y) => x + y), b.data.reduce((x, y) => x + y)],
});

const koResponse = {
  status: aggregateDataAction.statusDict.internalServiceError,
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
    createRequestEvent({
      businessOperation: bizOperationObj.readLondonData,
      comment: 'read from London',
      serviceParams: createS1Params('city/london'),
      payload: {},
      callerAction: aggregateDataAction,
    })
  );
  const parisData = await companion.call.readS1(
    createRequestEvent({
      businessOperation: bizOperationObj.readParisData,
      comment: 'read from Paris',
      serviceParams: createS1Params('city/paris'),
      payload: {},
      callerAction: aggregateDataAction,
    })
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
    createRequestEvent({
      businessOperation: bizOperationObj.writeEuropeData,
      comment: 'write to Europe',
      serviceParams: createS1Params('city/europe'),
      payload: aggregated,
      callerAction: aggregateDataAction,
    })
  );
  return resp;
};

export const aggregateCompanion = buildFunctionCompanion([
  {
    action: aggregateDataAction,
    call: aggregateData,
  },
]);
