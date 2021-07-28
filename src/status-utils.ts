import { OakStatus } from './model';
import { statusFlagDict } from './status-data';

export const isStatusEqual = (
  expected: OakStatus,
  actual: OakStatus
): boolean => actual.name === expected.name;

export const isSuccessfulStatus = (actual: OakStatus): boolean =>
  actual.flags.includes(statusFlagDict.success);

export const isInvalidStatus = (actual: OakStatus): boolean =>
  actual.flags.includes(statusFlagDict.invalid);

export const isFailureStatus = (actual: OakStatus): boolean =>
  actual.flags.includes(statusFlagDict.failure);
