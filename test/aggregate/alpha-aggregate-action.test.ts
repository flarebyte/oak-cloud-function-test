import {
  OakActionRequestEvent,
  OakBusinessOperation,
  OakRequestEvent,
} from '../../src/model';
import { OakSimulator, simulatedCall } from '../../src/simulator';
import { bizOperationObj } from '../fixture-business-operation';
import { coS1 } from '../storage/s1-data';
import { s1DevHook } from '../storage/s1-storage-dev';
import { createS1Params } from '../storage/s1-storage-factory';
import { aggregateAction } from './alpha-aggregate-action';
import { aggregateDataAction } from './alpha-aggregate-data';
import { AggregateTask, CityPayload } from './alpha-aggregate-model';
import { devAlphaCompanion } from './alpha-companion-dev';

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
  action: aggregateDataAction,
  caller: 'test',
  comment: 'sum',
  flags: [],
  params: { task: AggregateTask.Sum },
  systemFlags: [],
  payload: {},
};

describe('Alpha Aggregate', () => {
  const simulator = new OakSimulator();
  simulator.registerServiceOpToCall(coS1.serviceOpDict.write, s1DevHook.write);
  simulator.registerServiceOpToCall(coS1.serviceOpDict.read, s1DevHook.read);
  const simCall = simulatedCall(simulator);
  const alphaCompanion = devAlphaCompanion(simulator);
  it('should show a successful sum', async () => {
    simulator.reset();
    simCall(
      writeRequestTemplate('city/london', bizOperationObj.writeLondonData, {
        data: [2, 4, 8],
      })
    );
    simCall(
      writeRequestTemplate('city/paris', bizOperationObj.writeParisData, {
        data: [1, 3, 5],
      })
    );
    const resp = await aggregateAction(alphaCompanion, sumRequest);
    expect(resp.status.name).toEqual('ok');
  });
});
