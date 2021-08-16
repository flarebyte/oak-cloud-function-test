import { findFieldValue, setFieldValue } from "../src/obj-path-utils";

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
  describe('setFieldValue', ()=> {
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
      const actual = setFieldValue(asset, 'name', 'new-name');
      expect(actual).toHaveProperty('name', 'new-name');
    });
    it('read field at the first child', () => {
      const actual = setFieldValue(asset, 'child.name', 'child-new-value');
      expect(actual).toHaveProperty('child.name', 'child-new-value');
    });
    it('read field with several levels', () => {
      const actual = setFieldValue(asset, 'child.game.description', 'new-description');
      expect(actual).toHaveProperty('child.game.description', 'new-description');
    });
    
  })
});
