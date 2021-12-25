import { Anything } from './model';
import { ObjectWithKeys } from './obj-tranf-model';

export const findFieldValue = (path: string, value: object): Anything => {
  const [first, ...rest] = path.split('.');
  const objValue: { [name: string]: Anything } = value;
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
  newValue: Anything,
  content: { [key: string]: Anything }
): { [key: string]: Anything } => {
  const key = getKeyOfPath(path);
  return Object.fromEntries(
    Object.entries(content).map((keyValue) =>
      key === keyValue[0] ? [key, newValue] : keyValue
    )
  );
};

type TmpStackPath = { key: string; obj: ObjectWithKeys };

const splitAlongPath = (
  path: string,
  content: ObjectWithKeys
): TmpStackPath[] => {
  const paths = pathsOfSelfOrAncestors(path).reverse();
  return paths.map((p) => ({ key: p, obj: findFieldValue(p, content) }));
};

const mergeTwoPathStack = (a: TmpStackPath, b: TmpStackPath): TmpStackPath => ({
  key: b.key,
  obj: copyObjField(a.key, a.obj, b.obj),
});
const mergeAlongPath = (
  stack: { key: string; obj: ObjectWithKeys }[]
): { [key: string]: Anything } => stack.reduce(mergeTwoPathStack);

export const setFieldValue = (
  content: ObjectWithKeys,
  path: string,
  value: Anything
): ObjectWithKeys => {
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
  transformer: (value: Anything) => Anything,
  content: { [key: string]: Anything }
): { [key: string]: Anything } => {
  const updated = transformer(findFieldValue(path, content));
  return setFieldValue(content, path, updated);
};
