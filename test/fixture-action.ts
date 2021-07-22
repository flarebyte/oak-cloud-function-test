import { OakAction } from '../src/model';
import { resourceObj } from './fixture-resource';
import { statusObj } from './fixture-status';
import { coS1ReadOp, coS1WriteOp } from './storage/s1-data';

const writeLondonData: OakAction = {
  name: 'write-to-london',
  description: 'Write London data to storage',
  flags: [],
  serviceOperation: coS1WriteOp,
  resource: resourceObj.s3London,
  statusDict: {
    ok: statusObj.ok,
    ko: statusObj.ko,
  },
};

const writeParisData: OakAction = {
  name: 'write-to-paris',
  description: 'Write Paris data to storage',
  flags: [],
  serviceOperation: coS1WriteOp,
  resource: resourceObj.s3Paris,
  statusDict: {
    ok: statusObj.ok,
    ko: statusObj.ko,
  },
};

const writeEuropeData: OakAction = {
  name: 'write-to-europe',
  description: 'Write Europe data to storage',
  flags: [],
  serviceOperation: coS1WriteOp,
  resource: resourceObj.s3Europe,
  statusDict: {
    ok: statusObj.ok,
    ko: statusObj.ko,
  },
};

const readLondonData: OakAction = {
  name: 'read-from-london',
  description: 'Read London data from storage',
  flags: [],
  serviceOperation: coS1ReadOp,
  resource: resourceObj.s3London,
  statusDict: {
    ok: statusObj.ok,
    ko: statusObj.ko,
  },
};

const readParisData: OakAction = {
  name: 'read-from-paris',
  description: 'Read Paris data from storage',
  flags: [],
  serviceOperation: coS1ReadOp,
  resource: resourceObj.s3Paris,
  statusDict: {
    ok: statusObj.ok,
    ko: statusObj.ko,
  },
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
