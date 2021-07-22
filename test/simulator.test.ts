import {
  OakAction,
  OakEventTransaction,
  OakRequestEvent,
  OakSimulatedCall,
} from '../src/model';
import {
  OakSimulator,
  simulatedCall,
  sortedTxByIdDesc,
} from '../src/simulator';
import { actionObj } from './fixture-action';
import { serviceOperationObj } from './fixture-service-op';
import { statusObj } from './fixture-status';

const s3writeHook: OakSimulatedCall = (
  _a: OakEventTransaction[],
  _: OakRequestEvent
) => {
  return {
    status: statusObj.ok,
    payload: {
      comment: 'Success',
      body: {
        message: 'Saved',
      },
    },
  };
};

const notFoundResponse = {
  status: statusObj.notFound,
  payload: {
    comment: 'Not found',
    body: {
      message: 'document is not found',
    },
  },
};
const s3readHook: OakSimulatedCall = (
  transactions: OakEventTransaction[],
  reqEvent: OakRequestEvent
) => {
  const s3Transactions = transactions
    .filter(
      t =>
        t.request.action.serviceOperation.name ===
        serviceOperationObj.writeToS3.name
    )
    .filter(t => t.response.status.name === statusObj.ok.name)
    .filter(
      t => t.request.action.resource.name === reqEvent.action.resource.name
    )
    .sort(sortedTxByIdDesc);

  return s3Transactions.length === 0
    ? notFoundResponse
    : {
        status: statusObj.ok,
        payload: {
          comment: 'Success',
          body: s3Transactions[0].request.payload.body,
        },
      };
};

const callWriteStorage = (
  action: OakAction,
  city: string,
  population: number
): OakRequestEvent => ({
  action,
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
      city,
      population,
    },
  },
});

const callReadStorage = (action: OakAction): OakRequestEvent => ({
  action,
  caller: 'test',
  serviceParams: {
    comment: 'some params',
    body: {
      path: 'city',
    },
  },
  payload: {
    comment: 'some info',
    body: {}
  },
});

describe('Caller Simulator', () => {
  const simulator = new OakSimulator();
  simulator.registerServiceOpToCall(serviceOperationObj.writeToS3, s3writeHook);
  simulator.registerServiceOpToCall(serviceOperationObj.readFromS3, s3readHook);

  const mainSimCaller = simulatedCall(simulator);
  it('simulates function call', async () => {
    mainSimCaller(callWriteStorage(actionObj.writeLondonData, 'London', 8410));
    mainSimCaller(callWriteStorage(actionObj.writeLondonData, 'London', 8416));
    mainSimCaller(callWriteStorage(actionObj.writeParisData, 'Paris', 2240));
    mainSimCaller(callWriteStorage(actionObj.writeParisData, 'Paris', 2243));
    const londonContent = await mainSimCaller(
      callReadStorage(actionObj.readLondonData)
    );
    console.log(londonContent);
  });
});
