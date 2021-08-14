import {
  OakObjApplicableMutation,
  OakObjFieldMutation,
  OakObjFieldMutationRule,
} from './obj-tranf-model';

const unusualChar = '🤢';

const identityRule: OakObjFieldMutation = {
  name: 'identity',
  fieldKind: 'any',
  rule: (value: any) => value,
};

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

export const mutateObject = (rules: OakObjFieldMutation[]) => (
  mutation: OakObjApplicableMutation
) => (value: object): object => {
  const rule = (
    rules.find(r => r.name === mutation.mutationName) || identityRule
  ).rule;
  const fieldValue = findFieldValue(mutation.path, value);
  const newValue = rule(fieldValue);
  return newValue;
};


export const findFieldValue = (path: string, value: object): any => {
    const [first, ...rest] = path.split('.')
    const objValue: { [name: string]:any } = value
    const second = objValue[first]
    if (rest.length === 0 || typeof second !== 'object') {
        return second;
    } else {
        return findFieldValue(rest.join('.'), second)
    }
};

export const transformFieldValue = (path: string, rule: OakObjFieldMutationRule, value: object): any => {
    const [first, ...rest] = path.split('.')
    const objValue: { [name: string]:any } = value
    const second = objValue[first]
    if (rest.length === 0 || typeof second !== 'object') {
        return second;
    } else {
        return findFieldValue(rest.join('.'), second)
    }
};
