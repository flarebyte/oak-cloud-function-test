import { OakRequestEvent } from '../../src/model';
import { actionObj } from '../fixture-action';
import { coS1Status } from './s1-data';
import { s1DevHook } from './s1-storage-dev';
import { createEmptyTx } from '../../src/factory';
import { createS1Params } from './s1-storage-factory';

const writeToLondonRequestTemplate: OakRequestEvent = {
  action: actionObj.writeLondonData,
  caller: 'test',
  comment: 'write to london',
  serviceParams: createS1Params('london/city/data'),
  payload: {
    data: [1, 2, 3],
  },
  flags: [],
};

describe('S1 Storage', () => {
  describe('Test write', () => {
    it('should support multiple write', () => {
      const tx = createEmptyTx();
      const req: OakRequestEvent = {
        ...writeToLondonRequestTemplate,
        payload: {
          data: [7, 8],
        },
      };
      const req2 = {
        ...writeToLondonRequestTemplate,
        payload: {
          data: [7, 8],
        },
      };
      const resp1 = s1DevHook.write(tx, req);
      const resp2 = s1DevHook.write(tx, req2);
      expect(resp1.status.name).toEqual(coS1Status.ok.name);
      expect(resp2.status.name).toEqual(coS1Status.ok.name);
    });

    it('should return bad request if parameters are incorrect', () => {
      const tx = createEmptyTx();
      const req: OakRequestEvent = {
        ...writeToLondonRequestTemplate,
        serviceParams: {},
      };

      const resp = s1DevHook.write(tx, req);
      expect(resp.status.name).toEqual(coS1Status.badRequest.name);
    });
  });

  describe('Test read', () => {
    it.todo('should read the latest value for path');
    it.todo('should return not found if the value is not present');
    it.todo('should read the value from the right bucket');
  });
});
