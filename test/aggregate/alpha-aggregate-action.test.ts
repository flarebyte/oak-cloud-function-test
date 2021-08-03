import {
  OakActionRequestEvent,
} from '../../src/model';
import { OakSimulator } from '../../src/simulator';
import { bizOperationObj } from '../fixture-business-operation';
import { s1DevCompanion } from '../storage/s1-storage-dev';
import { createS1Params } from '../storage/s1-storage-factory';
import { aggregateCompanion } from './alpha-aggregate-action';
import { AggregateTask, CityPayload } from './alpha-aggregate-model';
import { createRequestEvent } from '../../src/request-utils';
import { testAction } from '../fixture-action';
import { S1StorageParams } from '../storage/s1-storage-model';

const sumRequest: OakActionRequestEvent = {
  caller: 'test',
  comment: 'sum',
  flags: [],
  params: { task: AggregateTask.Sum },
  systemFlags: [],
  payload: {},
};

describe('Alpha Aggregate', () => {
  const simulator = new OakSimulator();
  simulator.registerActionCompanions([s1DevCompanion]);
  simulator.registerFunctionCompanions([aggregateCompanion]);
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
        callerAction: testAction,
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
        callerAction: testAction,
      })
    );
    const resp = await callAction.aggregateData(sumRequest);
    expect(resp.status.name).toEqual('ok');
    expect(simulator.toSimplifiedTx()).toMatchSnapshot();
  });
});
