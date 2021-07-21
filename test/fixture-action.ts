import { OakAction } from '../src/model';
import { serviceObj } from './fixture-service';
import { statusObj } from './fixture-status';

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

const writeEuropeData: OakAction = {
  name: 'write-to-europe',
  description: 'Write Europe data to storage',
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

const actionObj = {
  writeLondonData,
  writeParisData,
  writeEuropeData,
  readLondonData,
  readParisData,
};

const actionList: OakAction[] = Object.values(actionObj);

export { actionObj, actionList };
