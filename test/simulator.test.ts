import { OakAction, OakRequestEvent } from '../src/model';
import { OakSimulator, simulatedCall } from '../src/simulator';
import { actionObj } from './fixture-action';
import { coS1ReadOp, coS1WriteOp } from './storage/s1-data';
import { s1DevHook } from './storage/s1-storage-dev';

const callWriteStorage = (
  action: OakAction,
  city: string,
  population: number
): OakRequestEvent => ({
  action,
  caller: 'test',
  comment: 'writing to city',
  flags: [],
  serviceParams: {
    path: 'city',
  },
  payload: {
    city,
    population,
  },
});

const callReadStorage = (action: OakAction): OakRequestEvent => ({
  action,
  caller: 'test',
  comment: 'read from city',
  flags: [],
  serviceParams: {
    path: 'city',
  },
  payload: {},
});

describe('Caller Simulator', () => {
  const simulator = new OakSimulator();
  simulator.registerServiceOpToCall(coS1WriteOp, s1DevHook.write);
  simulator.registerServiceOpToCall(coS1ReadOp, s1DevHook.read);

  const mainSimCaller = simulatedCall(simulator);
  it('simulates function call', async () => {
    mainSimCaller(callWriteStorage(actionObj.writeLondonData, 'London', 8410));
    mainSimCaller(callWriteStorage(actionObj.writeLondonData, 'London', 8416));
    mainSimCaller(callWriteStorage(actionObj.writeParisData, 'Paris', 2240));
    mainSimCaller(callWriteStorage(actionObj.writeParisData, 'Paris', 2243));
    const londonContent = await mainSimCaller(
      callReadStorage(actionObj.readLondonData)
    );
    expect(londonContent).toBeDefined();
  });
});
