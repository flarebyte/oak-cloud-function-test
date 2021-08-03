import { OakRequestEvent } from '../../src/model';
import { bizOperationObj } from '../fixture-business-operation';
import { coS1 } from './s1-data';
import { s1DevCompanion } from './s1-storage-dev';
import { createS1Params } from './s1-storage-factory';
import { OakSimulator } from '../../src/simulator';
import { isSuccessfulStatus } from '../../src/status-utils';

const writeToLondonRequestTemplate = (
  path: string,
  value: number
): OakRequestEvent => ({
  businessOperation: bizOperationObj.writeLondonData,
  caller: 'test',
  comment: 'write to london',
  serviceParams: createS1Params(path),
  systemFlags: [],
  payload: {
    data: [1, 2, 3, value],
  },
  flags: [],
});

const writeToParisRequestTemplate = (
  path: string,
  value: number
): OakRequestEvent => ({
  businessOperation: bizOperationObj.writeParisData,
  caller: 'test',
  comment: 'write to Paris',
  serviceParams: createS1Params(path),
  systemFlags: [],
  payload: {
    data: [1, 2, 3, value],
  },
  flags: [],
});

const readFromLondonRequestTemplate = (path: string): OakRequestEvent => ({
  businessOperation: bizOperationObj.readLondonData,
  caller: 'test',
  comment: 'read to london',
  serviceParams: createS1Params(path),
  systemFlags: [],
  payload: {},
  flags: [],
});

describe('S1 Storage', () => {
  const simulator = new OakSimulator();
  simulator.registerActionCompanions([s1DevCompanion]);
  const call = simulator.getCall();

  beforeEach(() => {
    simulator.reset();
  });
  describe('Test write', () => {
    it('should support multiple write', async () => {
      const resp1 = await call.writeS1(
        writeToLondonRequestTemplate('london/city/data', 12)
      );

      const resp2 = await call.writeS1(
        writeToLondonRequestTemplate('london/city/data', 12)
      );
      expect(isSuccessfulStatus(resp1.status)).toBeTruthy();
      expect(isSuccessfulStatus(resp2.status)).toBeTruthy();
    });

    it('should return bad request if parameters are incorrect', async () => {
      const resp = await call.writeS1({
        ...writeToLondonRequestTemplate('london/city/data', 10),
        serviceParams: { unknownParam: 'some value' },
      });
      expect(resp.status.name).toEqual(coS1.statusDict.badRequest.name);
    });

    it('should return circuit-breaking if circuit-breaking', async () => {
      const resp = await call.writeS1({
        ...writeToLondonRequestTemplate('london/city/data', 11),
        systemFlags: [coS1.systemFlagsDict.circuitBreaking],
      });
      expect(resp.status.name).toEqual(coS1.statusDict.circuitBreaking.name);
    });
  });

  describe('Test read', () => {
    it('should read the latest value for path', async () => {
      await call.writeS1(writeToLondonRequestTemplate('london/city/data', 17));

      await call.writeS1(writeToLondonRequestTemplate('london/city/data', 19));
      const respRead = await call.readS1(
        readFromLondonRequestTemplate('london/city/data')
      );
      expect(isSuccessfulStatus(respRead.status)).toBeTruthy();
      expect(respRead.payload).toHaveProperty('data', [1, 2, 3, 19]);
      expect(simulator.toInfo()).toMatchSnapshot();
    });
    it('should return not found if the value is not present', async () => {
      const resp = await call.readS1(
        readFromLondonRequestTemplate('oxford/city/data')
      );
      expect(resp.status.name).toEqual(coS1.statusDict.notFound.name);
    });
    it('should read the value from the right bucket', async () => {
      await call.writeS1(writeToParisRequestTemplate('london/city/data', 17));

      const respRead = await call.readS1(
        readFromLondonRequestTemplate('london/city/data')
      );
      expect(respRead.status.name).toEqual(coS1.statusDict.notFound.name);
    });
  });
});
