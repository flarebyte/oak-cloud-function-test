import {
  OakObjApplicableMutation,
  OakObjFieldMutation,
} from './obj-tranf-model';

const unusualChar = '🤢';

export const mutatorRules: OakObjFieldMutation[] = [
  {
    name: 'string => empty',
    fieldKind: 'string',
    rule: (_: string) => '',
  },
  {
    name: 'string => large',
    fieldKind: 'string',
    rule: (value: string) =>
      value.length === 0 ? 'z'.repeat(10000) : value.repeat(5000),
  },
  {
    name: 'string => unusual char',
    fieldKind: 'string',
    rule: (value: string) => `${value}${unusualChar}`,
  },
  {
    name: 'boolean => flip',
    fieldKind: 'boolean',
    rule: (value: boolean) => !value,
  },
  {
    name: 'number => zero',
    fieldKind: 'number',
    rule: (_: number) => 0,
  },
  {
    name: 'number => big',
    fieldKind: 'number',
    rule: (_: number) => 1007199254740991,
  },
  {
    name: 'number => negative',
    fieldKind: 'number',
    rule: (_: number) => -10,
  },
  {
    name: 'url => empty',
    fieldKind: 'url',
    rule: (_: string) => '',
  },
  {
    name: 'url => large',
    fieldKind: 'url',
    rule: (value: string) => `${value}/${'/abc'.repeat(500)}`,
  },
  {
    name: 'url => unusual char',
    fieldKind: 'url',
    rule: (value: string) => `${value}/${unusualChar}`,
  },
];

export const mutateObject = (_rules: OakObjFieldMutation[]) => (
  _mutation: OakObjApplicableMutation
) => (value: object): object => {
  return value;
};
