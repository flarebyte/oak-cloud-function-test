import { mutateObject, mutatorRules } from '../src/obj-mutator';

describe('Object Mutator', () => {
  describe('mutateObject', () => {
    it('mutate an object with one rule', () => {
      const mutation = {
        path: 'name',
        kind: 'string',
        mutationName: 'string => large',
      };
      const actual: { [index: string]: any } = mutateObject(mutatorRules)(
        mutation
      )({
        name: 'Picasso',
        firstName: 'Pablo',
      });
      expect(actual).toHaveProperty('name');
      expect(actual).toHaveProperty('firstName');
      expect(actual['name']).toHaveLength(35000);
    });
  });
});
