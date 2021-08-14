import { findFieldValue, mutateObject, mutatorRules, transformFieldValue } from '../src/obj-mutator';

describe('Object Mutator', () => {
  describe('mutateObject', () => {
    it.skip('mutate an object with one rule', () => {
      const mutation = {
        path: 'name',
        kind: 'string',
        mutationName: 'string => large',
      };
      const actual: {[index: string]:any} = mutateObject(mutatorRules)(mutation)({
        name: 'Picasso',
        firstName: 'Pablo',
      });
      expect(actual).toHaveProperty('name');
      expect(actual).toHaveProperty('firstName');
      expect(actual['name']).toHaveLength(100);
    });
  });
  describe('findFieldValue', () => {
    const asset = {
        name: 'value-of-name',
        child: {
            name: 'child name',
            sizes: [12, 15],
            siblings: [
                { name: 'paul'}, 
                { name: 'joe'},
            ],
            game: {
                description: 'fencing'
            }
        }
    };

      it('read field at the root', ()=> {
        const actual = findFieldValue('name', asset)
        expect(actual).toEqual(asset.name)
      });
      it('read field at the first child', ()=> {
        const actual = findFieldValue('child.name', asset)
        expect(actual).toEqual(asset.child.name)
      });
      it('read field with several levels', ()=> {
        const actual = findFieldValue('child.game.description', asset)
        expect(actual).toEqual(asset.child.game.description)
      });
      it('read field with array of integer', ()=> {
        const actual = findFieldValue('child.sizes', asset)
        expect(actual).toEqual(asset.child.sizes)
      });
      it('read field with array of obj', ()=> {
        const actual = findFieldValue('child.siblings', asset)
        expect(actual).toEqual(asset.child.siblings)
      });
      it('read first number element of array', ()=> {
        const actual = findFieldValue('child.sizes.0', asset)
        expect(actual).toEqual(asset.child.sizes[0])
      });
      it('read first object of array', ()=> {
        const actual = findFieldValue('child.siblings.0', asset)
        expect(actual).toEqual(asset.child.siblings[0])
      });
  });
  describe('transformFieldValue', () => {
    const asset = {
        name: 'value-of-name',
        child: {
            name: 'child name',
            sizes: [12, 15],
            siblings: [
                { name: 'paul'}, 
                { name: 'joe'},
            ],
            game: {
                description: 'fencing'
            }
        }
    };

    const transfString = (value: string) => value + '_'

      it('transform field at the root', ()=> {
        const actual = transformFieldValue('name', transfString, asset)
        expect(actual).toEqual(asset.name + '_')
      });
      it('transform field at the first child', ()=> {
        const actual = transformFieldValue('child.name',transfString, asset)
        expect(actual).toEqual(asset.child.name+ '_')
      });
      it('transform field with several levels', ()=> {
        const actual = transformFieldValue('child.game.description', transfString, asset)
        expect(actual).toEqual(asset.child.game.description+ '_')
      });

  });
});
