import { OakStatus } from './model';
import { statusFlagDict } from './status-data';
import { findStatusByNameInDict } from './status-utils';

const responseStatusFlag = 'response:status=';

const flagStartsWith = (text: string) => (flag: string) =>
  flag.startsWith(text);

const createFailedStatus = (name: string): OakStatus => ({
  name,
  description: `Status for ${name}`,
  flags: [statusFlagDict.failure],
});

export const shouldReturnStatus = (
  statusObj: {
    [name: string]: OakStatus;
  },
  flags: string[]
): OakStatus | false => {
  const name = (flags.find(flagStartsWith(responseStatusFlag)) || '')
    .replace(responseStatusFlag, '')
    .trim();
  return name
    ? findStatusByNameInDict(name, statusObj) || createFailedStatus(name)
    : false;
};

export const updateReturnStatus = (
  status: OakStatus,
  existingFlags: string[]
): string[] => {
  const removedPrevious = existingFlags.filter(
    (flag) => !flag.startsWith(responseStatusFlag)
  );
  const newFlag = `${responseStatusFlag}${status.name}`;
  return [...removedPrevious, newFlag];
};
