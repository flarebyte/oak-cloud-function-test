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
  });
});
