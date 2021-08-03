import {
  OakActionRequestEvent,
  OakBusinessOperation,
  OakRequestEvent,
} from '../../src/model';
import { OakSimulator } from '../../src/simulator';
import { bizOperationObj } from '../fixture-business-operation';
import { s1DevCompanion } from '../storage/s1-storage-dev';
import { createS1Params } from '../storage/s1-storage-factory';
import { aggregateCompanion } from './alpha-aggregate-action';
import { AggregateTask, CityPayload } from './alpha-aggregate-model';

const writeRequestTemplate = (
  path: string,
  businessOperation: OakBusinessOperation,
  payload: CityPayload
): OakRequestEvent => ({
  businessOperation,
  caller: 'test',
  comment: `write to ${path}`,
  serviceParams: createS1Params(path),
  systemFlags: [],
  payload,
  flags: [],
});

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
      writeRequestTemplate('city/london', bizOperationObj.writeLondonData, {
        data: [2, 4, 8],
      })
    );
    await call.writeS1(
      writeRequestTemplate('city/paris', bizOperationObj.writeParisData, {
        data: [1, 3, 5],
      })
    );
    const resp = await callAction.aggregateData(sumRequest);
    expect(resp.status.name).toEqual('ok');
    expect(simulator.toSimplifiedTx()).toMatchSnapshot();
    
  });
});
