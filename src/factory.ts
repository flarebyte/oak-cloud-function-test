import {
  OakEventTransaction,
  OakRequestEvent,
  OakResponseEvent,
} from './model';

export const createEmptyTx = (): OakEventTransaction[] => [];

export const createEmptyFlags = (): string[] => [];

export const createTransaction = (
  id: number,
  request: OakRequestEvent,
  response: OakResponseEvent
): OakEventTransaction => ({
  id,
  request,
  response,
});
