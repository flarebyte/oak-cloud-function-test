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

    it('mutate an object with two rules with one level', () => {
      const mutation = {
        path: 'painter.name',
        kind: 'string',
        mutationName: 'string => large',
      };
      const mutation2 = {
        path: 'painter.firstName',
        kind: 'string',
        mutationName: 'string => empty',
      };
      const mutate1 = mutateObject(mutatorRules)(mutation);
      const mutate2 = mutateObject(mutatorRules)(mutation2);
      const actual: { [index: string]: any } = mutate2(
        mutate1({
          painter: {
            name: 'Picasso',
            firstName: 'Pablo',
          },
        })
      );
      expect(actual).toHaveProperty('painter.name');
      expect(actual['painter']['name']).toHaveLength(35000);
      expect(actual).toHaveProperty('painter.firstName', '');
    });
  });
});
