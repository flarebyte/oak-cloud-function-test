import { Anything } from './model';
import { transformFieldValue } from './obj-path-utils';
import {
  OakObjApplicableMutation,
  OakObjFieldMutation,
  ObjectWithKeys,
} from './obj-tranf-model';

const unusualChar = '🤢';

const identityRule: OakObjFieldMutation = {
  name: 'identity',
  fieldKind: 'any',
  rule: (value: Anything) => value,
};

export const mutatorRules: OakObjFieldMutation[] = [
  {
    name: 'string => empty',
    fieldKind: 'string',
    rule: () => '',
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
    rule: () => 0,
  },
  {
    name: 'number => big',
    fieldKind: 'number',
    rule: () => 1007199254740991,
  },
  {
    name: 'number => negative',
    fieldKind: 'number',
    rule: () => -10,
  },
  {
    name: 'url => empty',
    fieldKind: 'url',
    rule: () => '',
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

export const mutateObject =
  (rules: OakObjFieldMutation[]) =>
  (mutation: OakObjApplicableMutation) =>
  (content: ObjectWithKeys): ObjectWithKeys => {
    const rule = (
      rules.find((r) => r.name === mutation.mutationName) || identityRule
    ).rule;
    return transformFieldValue(mutation.path, rule, content);
  };
