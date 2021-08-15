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
  const [first, ...rest] = path.split('.');
  const objValue: { [name: string]: any } = value;
  const second = objValue[first];
  if (rest.length === 0 || typeof second !== 'object') {
    return second;
  } else {
    return findFieldValue(rest.join('.'), second);
  }
};

const getParentPath = (path: string): string => {
  const [_last, ...rest] = path.split('.').reverse();
  return rest ? rest.join('.') : '';
};

const getKeyOfPath = (path: string): string => {
  const [last, ..._rest] = path.split('.').reverse();
  return last;
};

const getPathAndParents = (
  currentPath: string,
  found: string[] = []
): string[] =>
  currentPath.includes('.')
    ? getPathAndParents(getParentPath(currentPath), [currentPath, ...found])
    : [currentPath, ...found];

const copyObjField = (
  path: string,
  newValue: any,
  content: { [key: string]: any }
): { [key: string]: any } => {
  const key = getKeyOfPath(path);
  return Object.fromEntries(
    Object.entries(content).map(keyValue =>
      key === keyValue[0] ? [key, newValue] : keyValue
    )
  );
};

type TmpStackPath = { key: string; obj: { [key: string]: any } };

const splitAlongPath = (
  path: string,
  content: { [key: string]: any }
): TmpStackPath[] => {
  const paths = getPathAndParents(path);
  return paths.map(p => ({ key: p, obj: findFieldValue(p, content) }));
};

const mergeTwoPathStack = (a: TmpStackPath, b: TmpStackPath): TmpStackPath => ({
  key: b.key,
  obj: copyObjField(a.key, a.obj, b.obj),
});
const mergeAlongPath = (
  stack: { key: string; obj: { [key: string]: any } }[]
): { [key: string]: any } => stack.reduce(mergeTwoPathStack);

export const transformFieldValue = (
  path: string,
  rule: OakObjFieldMutationRule,
  content: { [key: string]: any }
): { [key: string]: any } => {
  const [first, ...rest] = splitAlongPath(path, content);
  const updatedStack = [{ key: first.key, obj: rule(first.obj) }, ...rest];
  const result = mergeAlongPath(updatedStack);
  return result;
};
