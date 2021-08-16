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

type ObjectWithKeys = { [key: string]: any };
type TmpStackPath = { key: string; obj: ObjectWithKeys };

const splitAlongPath = (
  path: string,
  content: ObjectWithKeys
): TmpStackPath[] => {
  const paths = getPathAndParents(path).reverse();
  return paths.map(p => ({ key: p, obj: findFieldValue(p, content) }));
};

const mergeTwoPathStack = (a: TmpStackPath, b: TmpStackPath): TmpStackPath => ({
  key: b.key,
  obj: copyObjField(b.key, a.obj, b.obj),
});
const mergeAlongPath = (
  stack: { key: string; obj: ObjectWithKeys }[]
): { [key: string]: any } => stack.reduce(mergeTwoPathStack);

export const setFieldValue = (
  content: ObjectWithKeys,
  path: string,
  value: any
): ObjectWithKeys => {
  const [_first, ...rest] = splitAlongPath(path, content);
  const updated = [{key: path, obj: value}, ...rest];
  const result = mergeAlongPath(updated)
  return result.obj;
};
