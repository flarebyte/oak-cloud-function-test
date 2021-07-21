import { OakAction } from '../src/model';
import { resourceObj } from './fixture-resource';
import { serviceOperationObj } from './fixture-service-op';
import { statusObj } from './fixture-status';

const writeLondonData: OakAction = {
  name: 'write-to-london',
  description: 'Write London data to storage',
  flags: [],
  serviceOperation: serviceOperationObj.writeToS3,
  resource: resourceObj.s3London,
  statusList: [statusObj.ok, statusObj.ko],
};

const writeParisData: OakAction = {
  name: 'write-to-paris',
  description: 'Write Paris data to storage',
  flags: [],
  serviceOperation: serviceOperationObj.writeToS3,
  resource: resourceObj.s3Paris,
  statusList: [statusObj.ok, statusObj.ko],
};

const writeEuropeData: OakAction = {
  name: 'write-to-europe',
  description: 'Write Europe data to storage',
  flags: [],
  serviceOperation: serviceOperationObj.writeToS3,
  resource: resourceObj.s3Europe,
  statusList: [statusObj.ok, statusObj.ko],
};

const readLondonData: OakAction = {
  name: 'read-from-london',
  description: 'Read London data from storage',
  flags: [],
  serviceOperation: serviceOperationObj.readFromS3,
  resource: resourceObj.s3London,
  statusList: [statusObj.ok, statusObj.ko],
};

const readParisData: OakAction = {
  name: 'read-from-paris',
  description: 'Read Paris data from storage',
  flags: [],
  serviceOperation: serviceOperationObj.readFromS3,
  resource: resourceObj.s3Paris,
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
