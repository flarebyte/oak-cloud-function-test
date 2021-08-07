import { OakEngineContext } from './model';

export const createEmptyContext = (): OakEngineContext => ({
  transactions: [],
  actionTransactions: [],
  systemFlags: [],
  businessOperationFlags: {},
  actionFlags: {},
  functionFlags: {},
});
