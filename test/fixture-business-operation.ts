import { OakBusinessOperation } from '../src/model';
import { resourceObj } from './fixture-resource';
import { coS1 } from './storage/s1-data';

const writeLondonData: OakBusinessOperation = {
  name: 'write-to-london',
  description: 'Write London data to storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.write,
  resource: resourceObj.s3London,
};

const writeParisData: OakBusinessOperation = {
  name: 'write-to-paris',
  description: 'Write Paris data to storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.write,
  resource: resourceObj.s3Paris,
};

const writeEuropeData: OakBusinessOperation = {
  name: 'write-to-europe',
  description: 'Write Europe data to storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.write,
  resource: resourceObj.s3Europe,
};

const readLondonData: OakBusinessOperation = {
  name: 'read-from-london',
  description: 'Read London data from storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.read,
  resource: resourceObj.s3London,
};

const readParisData: OakBusinessOperation = {
  name: 'read-from-paris',
  description: 'Read Paris data from storage',
  flags: [],
  serviceOperation: coS1.serviceOpDict.read,
  resource: resourceObj.s3Paris,
};

const bizOperationObj = {
  writeLondonData,
  writeParisData,
  writeEuropeData,
  readLondonData,
  readParisData,
};

const bizOperationList: OakBusinessOperation[] = Object.values(bizOperationObj);

export { bizOperationObj, bizOperationList };
