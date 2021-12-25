import { OakSimulator } from '../../src/simulator';
import { bizOperationObj } from '../fixture-business-operation';
import { s1DevCompanion } from '../storage/s1-storage-dev';
import { createS1Params } from '../storage/s1-storage-factory';
import { aggregateCompanion } from './alpha-aggregate-action';
import { AggregateTask, CityPayload } from './alpha-aggregate-model';
import {
  createActionRequestEvent,
  createRequestEvent,
} from '../../src/request-utils';
import { S1StorageParams } from '../storage/s1-storage-model';

import { actorData } from '../../src/actor-data';
const { actionDict } = actorData;

describe('Alpha Aggregate', () => {
  const simulator = new OakSimulator();
  simulator.registerCompanions([s1DevCompanion], [aggregateCompanion]);
  const call = simulator.getCall();
  const callAction = simulator.getActionCall();

  beforeEach(() => {
    simulator.reset();
  });
  it('should show a successful sum', async () => {
    await call.writeS1(
      createRequestEvent<S1StorageParams, CityPayload>({
        businessOperation: bizOperationObj.writeLondonData,
        comment: 'write to city/london',
        serviceParams: createS1Params('city/london'),
        payload: {
          data: [2, 4, 8],
        },
        callerAction: actionDict.beforeTest,
      })
    );
    await call.writeS1(
      createRequestEvent<S1StorageParams, CityPayload>({
        businessOperation: bizOperationObj.writeParisData,
        comment: 'write to city/paris',
        serviceParams: createS1Params('city/paris'),
        payload: {
          data: [1, 3, 5],
        },
        callerAction: actionDict.beforeTest,
      })
    );
    const resp = await callAction.aggregateData(
      createActionRequestEvent({
        comment: 'sum',
        params: { task: AggregateTask.Sum },
        payload: {},
        callerFunction: actionDict.test,
      })
    );
    expect(resp.status.name).toEqual('ok');
    expect(simulator.toSimplifiedTx()).toMatchSnapshot();
  });
});
