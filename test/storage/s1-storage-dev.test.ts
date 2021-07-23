import { OakRequestEvent } from '../../src/model';
import { actionObj } from '../fixture-action';
import { coS1Status } from './s1-data';
import { s1DevHook } from './s1-storage-dev';
import { createEmptyTx } from '../../src/factory';

describe('S1 Storage', () => {
  describe('Test write', () => {
    it('should support multiple write', () => {
      const tx = createEmptyTx();
      const req: OakRequestEvent = {
        action: actionObj.writeLondonData,
        caller: 'test',
        comment: 'write to london',
        serviceParams: {},
        payload: {},
        flags: [],
      };
      const resp = s1DevHook.write(tx, req);
      expect(resp.status.name).toEqual(coS1Status.ok.name);
    });
  });

  describe('Test read', () => {
    it.todo('should read the latest value for path');
    it.todo('should return not found if the value is not present');
    it.todo('should read the value from the right bucket');
  });
});
