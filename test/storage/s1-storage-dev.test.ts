import { OakRequestEvent } from '../../src/model';
import { bizOperationObj } from '../fixture-business-operation';
import { coS1 } from './s1-data';
import { s1DevCompanion } from './s1-storage-dev';
import { createS1Params } from './s1-storage-factory';
import { OakSimulator } from '../../src/simulator';

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
  // describe('Test write', () => {
  //   it('should support multiple write', () => {
  //     const tx = createEmptyTx();
  //     const req = writeToLondonRequestTemplate('london/city/data', 11);
  //     const req2 = writeToLondonRequestTemplate('london/city/data', 12);
  //     const resp1 = s1DevHook.write(tx, req);
  //     const resp2 = s1DevHook.write(tx, req2);
  //     expect(resp1.status.name).toEqual(coS1.statusDict.ok.name);
  //     expect(resp2.status.name).toEqual(coS1.statusDict.ok.name);
  //   });

  //   it('should return bad request if parameters are incorrect', () => {
  //     const tx = createEmptyTx();
  //     const req: OakRequestEvent = {
  //       ...writeToLondonRequestTemplate('london/city/data', 10),
  //       serviceParams: {},
  //     };

  //     const resp = s1DevHook.write(tx, req);
  //     expect(resp.status.name).toEqual(coS1.statusDict.badRequest.name);
  //   });
  //   it('should return circuit-breaking if circuit-breaking', () => {
  //     const tx = createEmptyTx();
  //     const req: OakRequestEvent = {
  //       ...writeToLondonRequestTemplate('london/city/data', 11),
  //       systemFlags: [coS1.systemFlagsDict.circuitBreaking],
  //     };

  //     const resp = s1DevHook.write(tx, req);
  //     expect(resp.status.name).toEqual(coS1.statusDict.circuitBreaking.name);
  //   });
  // });

  describe('Test read', () => {
    it('should read the latest value for path', async () => {
      const simulator = new OakSimulator();
      simulator.registerActionCompanions([s1DevCompanion]);
      const call = simulator.getCall();

      await call.writeS1(writeToLondonRequestTemplate('london/city/data', 17));

      await call.writeS1(writeToLondonRequestTemplate('london/city/data', 19));
      const respRead = await call.readS1(
        readFromLondonRequestTemplate('london/city/data')
      );
      expect(respRead.status.name).toEqual(coS1.statusDict.ok.name);
      expect(respRead.payload).toHaveProperty('data');
    });
    it.todo('should return not found if the value is not present');
    it.todo('should read the value from the right bucket');
  });
});
