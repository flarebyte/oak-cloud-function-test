import { OakRequestEvent } from '../src/model';
import { simCaller } from '../src/simulator';
import { actionObj } from './fixture-action';

describe('Caller Simulator', () => {
  const mainSimCaller = simCaller([]);
  it('simulates function call', () => {
    const aa: OakRequestEvent = {
      action: actionObj.readLondonData,
      caller: 'test',
      serviceParams: {
        comment: 'some params',
        body: {
          path: 'city',
        },
      },
      payload: {
        comment: 'some info',
        body: {
          city: 'London',
        },
      },
    };
    mainSimCaller(aa);
    mainSimCaller(aa);
    mainSimCaller(aa);
  });
});
