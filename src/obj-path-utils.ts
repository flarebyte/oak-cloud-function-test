import { ObjectWithKeys } from './obj-tranf-model';

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
  return rest ? rest.reverse().join('.') : '';
};

const getKeyOfPath = (path: string): string => {
  const [last, ..._rest] = path.split('.').reverse();
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
  newValue: any,
  content: { [key: string]: any }
): { [key: string]: any } => {
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
): { [key: string]: any } => stack.reduce(mergeTwoPathStack);

export const setFieldValue = (
  content: ObjectWithKeys,
  path: string,
  value: any
): ObjectWithKeys => {
  const [_first, ...rest] = splitAlongPath(path, content).reverse();
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
  transformer: (value: any) => any,
  content: { [key: string]: any }
): { [key: string]: any } => {
  const updated = transformer(findFieldValue(path, content));
  return setFieldValue(content, path, updated);
};
