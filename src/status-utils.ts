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

export const findStatusByName = (
  name: string,
  statusList: OakStatus[]
): OakStatus | false =>
  statusList.find((status) => status.name === name) || false;

export const findStatusByNameInDict = (
  name: string,
  refStatusDict: { [key: string]: OakStatus }
): OakStatus | false => findStatusByName(name, Object.values(refStatusDict));
