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
        ]
      `);
    });
  });
});
