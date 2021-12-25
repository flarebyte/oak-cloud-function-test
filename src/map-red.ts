import { OakBase, OakEventTransaction } from './model';

export const isSameName = (a: OakBase, b: OakBase) => a.name === b.name;

export const sortedTxByIdDesc = (
  a: OakEventTransaction,
  b: OakEventTransaction
): number => {
  if (a.id === b.id) return 0;
  if (a.id > b.id) return -1;
  return 1;
};
