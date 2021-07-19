import {
  OakAction,
  OakActionStatus,
  OakRequestEventType,
  OakService,
  OakUniverse,
} from '../src//model';

const services: OakService[] = [
  {
    name: 'aws:s3',
    description: 'Cloud storage',
    flags: [],
  },
  {
    name: 'aws:sqs',
    description: 'Cloud Queue Service',
    flags: [],
  },
];
const statusOk = {
  name: 'ok',
  description: 'All good',
  flags: [],
};

const statusKo = {
  name: 'ko',
  description: 'Went south',
  flags: [],
};
const statusList: OakActionStatus[] = [statusOk, statusKo];
const writeToS3 = {
  name: 'write-to-s3',
  description: 'Write to storage',
  flags: [],
  service: services[0],
  statusList: [statusOk, statusKo],
};
const actions: OakAction[] = [writeToS3];

const reqEventTypes: OakRequestEventType[] = [
  {
    name: 'write-to-s3',
    description: 'Write to storage',
    flags: [],
    action: writeToS3,
    caller: 'action7/main/2',
  },
];
const myUniverse: OakUniverse = {
  services,
  statusList,
  actions,
  reqEventTypes,
};

export { myUniverse };
