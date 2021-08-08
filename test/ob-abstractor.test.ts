import {
  abstractionRules,
  abstractObject,
  anyOfString,
} from '../src/obj-abstractor';

describe('Object Abstractor', () => {
  describe('abstractObject', () => {
    const abstractor = abstractObject([
      ...abstractionRules,
      anyOfString('color', ['blue', 'red', 'yellow']),
    ]);
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
        style: 'yellow',
        child: {
          name: 'Louis XV',
          style: 'blue',
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
            "kind": "color",
            "path": "style",
          },
          Object {
            "kind": "string",
            "path": "child.name",
          },
          Object {
            "kind": "color",
            "path": "child.style",
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
        listOfUrls: ['http://website.com', 'http://website2.com'],
        emptyList: [],
      });
      expect(actual).toMatchInlineSnapshot(`
        Array [
          Object {
            "kind": "string",
            "path": "name",
          },
          Object {
            "kind": "array/string",
            "path": "listOfStrings",
          },
          Object {
            "kind": "array/number",
            "path": "listOfNumbers",
          },
          Object {
            "kind": "array/object",
            "path": "listOfObjects",
          },
          Object {
            "kind": "array/url",
            "path": "listOfUrls",
          },
          Object {
            "kind": "array/empty",
            "path": "emptyList",
          },
        ]
      `);
    });
  });
});
