import { abstractionRules, abstractObject } from '../src/obj-abstractor';

describe('Object Abstractor', () => {
  describe('abstractObject', () => {
    const abstractor = abstractObject(abstractionRules);
    it('ignore empty object', () => {
      const actual = abstractor({});
      expect(actual).toHaveLength(0);
    });
    it('recognizes basic types', () => {
      const actual = abstractor({
        text: 'some text',
        digital: 14,
        onOff: true,
        biggerInt: BigInt(9007199254740991),
        symbolic: Symbol('symbolic'),
        myFunction: (x: number) => x + 10,
      });
      expect(actual).toMatchInlineSnapshot(`
        Array [
          Object {
            "kind": "string",
            "path": "text",
          },
          Object {
            "kind": "number",
            "path": "digital",
          },
          Object {
            "kind": "boolean",
            "path": "onOff",
          },
          Object {
            "kind": "bigint",
            "path": "biggerInt",
          },
          Object {
            "kind": "symbol",
            "path": "symbolic",
          },
          Object {
            "kind": "function",
            "path": "myFunction",
          },
        ]
      `);
    });
    it('recognizes advanced types', () => {
      const actual = abstractor({
        website: 'http://wikipedia.com',
        bankSite: 'https://bank.com',
      });
      expect(actual).toMatchInlineSnapshot(`
        Array [
          Object {
            "kind": "url",
            "path": "website",
          },
          Object {
            "kind": "url",
            "path": "bankSite",
          },
        ]
      `);
    });
    it('recognize nested objects', () => {
      const actual = abstractor({
        name: 'Louis XIV',
        child: {
          name: 'Louis XV',
          id: 15,
          descendant: {
            name: 'Louis XVI',
          },
        },
      });
      expect(actual).toMatchInlineSnapshot(`
        Array [
          Object {
            "kind": "string",
            "path": "name",
          },
          Object {
            "kind": "string",
            "path": "child.name",
          },
          Object {
            "kind": "number",
            "path": "child.id",
          },
          Object {
            "kind": "string",
            "path": "child.descendant.name",
          },
        ]
      `);
    });
    it('recognize arrays', () => {
      const actual = abstractor({
        name: 'Alpha',
        listOfStrings: ['alpha', 'bravo'],
        listOfNumbers: [12, 15, 17],
        listOfObjects: [{ a: 1 }],
        emptyList: [],
      });
      expect(actual).toMatchInlineSnapshot(`
        Array [
          Object {
            "kind": "string",
            "path": "name",
          },
          Object {
            "kind": "string",
            "path": "listOfStrings.0",
          },
          Object {
            "kind": "string",
            "path": "listOfStrings.1",
          },
          Object {
            "kind": "number",
            "path": "listOfNumbers.0",
          },
          Object {
            "kind": "number",
            "path": "listOfNumbers.1",
          },
          Object {
            "kind": "number",
            "path": "listOfNumbers.2",
          },
          Object {
            "kind": "number",
            "path": "listOfObjects.0.a",
          },
        ]
      `);
    });
  });
});
