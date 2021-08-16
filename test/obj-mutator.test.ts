import {
  mutateObject,
  mutatorRules,
  transformFieldValue,
} from '../src/obj-mutator';

describe('Object Mutator', () => {
  describe('mutateObject', () => {
    it.skip('mutate an object with one rule', () => {
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
      expect(actual['name']).toHaveLength(100);
    });
  });
  describe.skip('transformFieldValue', () => {
    const asset = {
      name: 'value-of-name',
      child: {
        name: 'child name',
        sizes: [12, 15],
        siblings: [{ name: 'paul' }, { name: 'joe' }],
        game: {
          description: 'fencing',
        },
      },
    };

    const transfString = (value: string) => value + '_';

    it('transform field at the root', () => {
      const actual = transformFieldValue('name', transfString, asset);
      expect(actual).toHaveProperty('name', asset.name + '_');
    });
    it('transform field at the first child', () => {
      const actual = transformFieldValue('child.name', transfString, asset);
      expect(actual).toHaveProperty('child.name', asset.child.name + '_');
    });
    it('transform field with several levels', () => {
      const actual = transformFieldValue(
        'child.game.description',
        transfString,
        asset
      );
      expect(actual).toEqual(asset.child.game.description + '_');
    });
  });
});
