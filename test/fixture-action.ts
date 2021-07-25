import { OakAction } from '../src/model';
import { resourceObj } from './fixture-resource';
import { coS1 } from './storage/s1-data';

const writeLondonData: OakAction = {
  name: 'write-to-london',
  description: 'Write London data to storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.write,
  resource: resourceObj.s3London,
};

const writeParisData: OakAction = {
  name: 'write-to-paris',
  description: 'Write Paris data to storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.write,
  resource: resourceObj.s3Paris,
};

const writeEuropeData: OakAction = {
  name: 'write-to-europe',
  description: 'Write Europe data to storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.write,
  resource: resourceObj.s3Europe,
};

const readLondonData: OakAction = {
  name: 'read-from-london',
  description: 'Read London data from storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.read,
  resource: resourceObj.s3London,
};

const readParisData: OakAction = {
  name: 'read-from-paris',
  description: 'Read Paris data from storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.read,
  resource: resourceObj.s3Paris,
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
