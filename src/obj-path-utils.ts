import { ObjectValue, AdvancedObject } from './obj-tranf-model';

export const findFieldValue = (path: string, value: AdvancedObject): ObjectValue => {
  const [first, ...rest] = path.split('.');
  const objValue: { [name: string]: ObjectValue } = value;
  const second = objValue[first];
  if (rest.length === 0 || typeof second !== 'object') {
    return second;
  } else {
    return findFieldValue(rest.join('.'), second);
  }
};

const getParentPath = (path: string): string => {
  const rest = path.split('.').reverse().slice(1);
  return rest ? rest.reverse().join('.') : '';
};

const getKeyOfPath = (path: string): string => {
  const last = path.split('.').reverse()[0];
  return last;
};

export const pathsOfSelfOrAncestors = (
  currentPath: string,
  found: string[] = []
): string[] =>
  currentPath.includes('.')
    ? pathsOfSelfOrAncestors(getParentPath(currentPath), [
        ...found,
        currentPath,
      ])
    : [...found, currentPath];

const copyObjField = (
  path: string,
  newValue: ObjectValue,
  content: { [key: string]: ObjectValue }
): { [key: string]: ObjectValue } => {
  const key = getKeyOfPath(path);
  return Object.fromEntries(
    Object.entries(content).map((keyValue) =>
      key === keyValue[0] ? [key, newValue] : keyValue
    )
  );
};

type TmpStackPath = { key: string; obj: AdvancedObject };

const splitAlongPath = (
  path: string,
  content: AdvancedObject
): TmpStackPath[] => {
  const paths = pathsOfSelfOrAncestors(path).reverse();
  return paths.map((p) => ({ key: p, obj: findFieldValue(p, content) }));
};

const mergeTwoPathStack = (a: TmpStackPath, b: TmpStackPath): TmpStackPath => ({
  key: b.key,
  obj: copyObjField(a.key, a.obj, b.obj),
});
const mergeAlongPath = (
  stack: { key: string; obj: AdvancedObject }[]
): { [key: string]: ObjectValue } => stack.reduce(mergeTwoPathStack);

export const setFieldValue = (
  content: AdvancedObject,
  path: string,
  value: ObjectValue
): AdvancedObject => {
  const rest = splitAlongPath(path, content).reverse().slice(1);
  const updated = [
    { key: path, obj: value },
    ...rest,
    { key: '', obj: content },
  ];
  const result = mergeAlongPath(updated);
  return result.obj;
};

export const transformFieldValue = (
  path: string,
  transformer: (value: ObjectValue) => ObjectValue,
  content: AdvancedObject
): AdvancedObject => {
  const updated = transformer(findFieldValue(path, content));
  return setFieldValue(content, path, updated);
};
