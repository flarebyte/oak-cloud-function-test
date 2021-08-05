import { OakStatus } from './model';
import { statusFlagDict } from './status-data';
import { findStatusByNameInDict } from './status-utils';

const returnStatusFlag = 'return:status=';

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
  const name = (flags.find(flagStartsWith(returnStatusFlag)) || '')
    .replace(returnStatusFlag, '')
    .trim();
  return name
    ? findStatusByNameInDict(name, statusObj) || createFailedStatus(name)
    : false;
};
