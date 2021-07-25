import { OakRequestEvent } from '../../src/model';
import { actionObj } from '../fixture-action';
import { coS1 } from './s1-data';
import { s1DevHook } from './s1-storage-dev';
import { createEmptyTx } from '../../src/factory';
import { createS1Params } from './s1-storage-factory';
import { OakSimulator, simulatedCall } from '../../src/simulator';

const writeToLondonRequestTemplate = (
  path: string,
  value: number
): OakRequestEvent => ({
  action: actionObj.writeLondonData,
  caller: 'test',
  comment: 'write to london',
  serviceParams: createS1Params(path),
  systemFlags: [],
  payload: {
    data: [1, 2, 3, value],
  },
  flags: [],
});

const readFromLondonRequestTemplate = (path: string): OakRequestEvent => ({
  action: actionObj.readLondonData,
  caller: 'test',
  comment: 'read to london',
  serviceParams: createS1Params(path),
  systemFlags: [],
  payload: {},
  flags: [],
});

describe('S1 Storage', () => {
  describe('Test write', () => {
    it('should support multiple write', () => {
      const tx = createEmptyTx();
      const req = writeToLondonRequestTemplate('london/city/data', 11);
      const req2 = writeToLondonRequestTemplate('london/city/data', 12);
      const resp1 = s1DevHook.write(tx, req);
      const resp2 = s1DevHook.write(tx, req2);
      expect(resp1.status.name).toEqual(coS1.statusDict.ok.name);
      expect(resp2.status.name).toEqual(coS1.statusDict.ok.name);
    });

    it('should return bad request if parameters are incorrect', () => {
      const tx = createEmptyTx();
      const req: OakRequestEvent = {
        ...writeToLondonRequestTemplate('london/city/data', 10),
        serviceParams: {},
      };

      const resp = s1DevHook.write(tx, req);
      expect(resp.status.name).toEqual(coS1.statusDict.badRequest.name);
    });
    it('should return circuit-breaking if circuit-breaking', () => {
      const tx = createEmptyTx();
      const req: OakRequestEvent = {
        ...writeToLondonRequestTemplate('london/city/data', 11),
        systemFlags: [coS1.systemFlagsDict.circuitBreaking],
      };

      const resp = s1DevHook.write(tx, req);
      expect(resp.status.name).toEqual(coS1.statusDict.circuitBreaking.name);
    });
  });

  describe('Test read', () => {
    it('should read the latest value for path', async () => {
      const simulator = new OakSimulator();
      simulator.registerServiceOpToCall(
        coS1.serviceOpDict.write,
        s1DevHook.write
      );
      simulator.registerServiceOpToCall(
        coS1.serviceOpDict.read,
        s1DevHook.read
      );
      const simCall = simulatedCall(simulator);

      simCall(writeToLondonRequestTemplate('london/city/data', 17));
      simCall(writeToLondonRequestTemplate('london/city/data', 19));
      const respRead = await simCall(
        readFromLondonRequestTemplate('london/city/data')
      );
      expect(respRead.status.name).toEqual(coS1.statusDict.ok.name);
      expect(respRead.payload).toHaveProperty('data');
    });
    it.todo('should return not found if the value is not present');
    it.todo('should read the value from the right bucket');
  });
});