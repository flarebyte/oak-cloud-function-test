import { OakActionStatus } from '../src/model';

const ok: OakActionStatus = {
  name: 'ok',
  description: 'All good',
  flags: [],
};

const ko: OakActionStatus = {
  name: 'ko',
  description: 'Went south',
  flags: [],
};

const notFound: OakActionStatus = {
  name: 'not-found',
  description: 'NotFound',
  flags: [],
};

const green: OakActionStatus = {
  name: 'green',
  description: 'Green',
  flags: [],
};

const orange: OakActionStatus = {
  name: 'orange',
  description: 'Orange',
  flags: [],
};

const red: OakActionStatus = {
  name: 'red',
  description: 'Red',
  flags: [],
};

const statusObj = {
  ok,
  ko,
  green,
  orange,
  red,
  notFound,
};

const statusList: OakActionStatus[] = Object.values(statusObj);

export { statusObj, statusList };
