import { findFieldValue } from '../src/obj-mutator';

describe('Object Mutator', () => {
  describe('findFieldValue', () => {
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

    it('read field at the root', () => {
      const actual = findFieldValue('name', asset);
      expect(actual).toEqual(asset.name);
    });
    it('read field at the first child', () => {
      const actual = findFieldValue('child.name', asset);
      expect(actual).toEqual(asset.child.name);
    });
    it('read field with several levels', () => {
      const actual = findFieldValue('child.game.description', asset);
      expect(actual).toEqual(asset.child.game.description);
    });
    it('read field with array of integer', () => {
      const actual = findFieldValue('child.sizes', asset);
      expect(actual).toEqual(asset.child.sizes);
    });
    it('read field with array of obj', () => {
      const actual = findFieldValue('child.siblings', asset);
      expect(actual).toEqual(asset.child.siblings);
    });
    it('read first number element of array', () => {
      const actual = findFieldValue('child.sizes.0', asset);
      expect(actual).toEqual(asset.child.sizes[0]);
    });
    it('read first object of array', () => {
      const actual = findFieldValue('child.siblings.0', asset);
      expect(actual).toEqual(asset.child.siblings[0]);
    });
  });
});
