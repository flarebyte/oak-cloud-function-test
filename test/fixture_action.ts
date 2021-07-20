import { OakAction } from '../src/model';
import { serviceObj } from './fixture_service';
import { statusObj } from './fixture_status';

const writeLondonData: OakAction = {
  name: 'write-to-london',
  description: 'Write London data to storage',
  flags: [],
  service: serviceObj.awsS3,
  statusList: [statusObj.ok, statusObj.ko],
};

const writeParisData: OakAction = {
  name: 'write-to-paris',
  description: 'Write Paris data to storage',
  flags: [],
  service: serviceObj.awsS3,
  statusList: [statusObj.ok, statusObj.ko],
};

const writeNewYorkData: OakAction = {
  name: 'write-to-new-york',
  description: 'Write New York data to storage',
  flags: [],
  service: serviceObj.awsS3,
  statusList: [statusObj.ok, statusObj.ko],
};

const writeSummaryData: OakAction = {
  name: 'write-to-summary',
  description: 'Write Summary data to storage',
  flags: [],
  service: serviceObj.awsS3,
  statusList: [statusObj.ok, statusObj.ko],
};

const readLondonData: OakAction = {
  name: 'read-from-london',
  description: 'Read London data from storage',
  flags: [],
  service: serviceObj.awsS3,
  statusList: [statusObj.ok, statusObj.ko],
};

const readParisData: OakAction = {
  name: 'read-from-paris',
  description: 'Read Paris data from storage',
  flags: [],
  service: serviceObj.awsS3,
  statusList: [statusObj.ok, statusObj.ko],
};
const readNewYorkData: OakAction = {
  name: 'read-from-new-york',
  description: 'Read New York data from storage',
  flags: [],
  service: serviceObj.awsS3,
  statusList: [statusObj.ok, statusObj.ko],
};

const actionObj = {
  writeLondonData,
  writeParisData,
  writeNewYorkData,
  writeSummaryData,
  readLondonData,
  readParisData,
  readNewYorkData,
};

const actionList: OakAction[] = Object.values(actionObj);

export { actionObj, actionList };
