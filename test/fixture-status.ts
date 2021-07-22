import { OakStatus } from '../src/model';

const ok: OakStatus = {
  name: 'ok',
  description: 'All good',
  flags: [],
};

const ko: OakStatus = {
  name: 'ko',
  description: 'Went south',
  flags: [],
};

const notFound: OakStatus = {
  name: 'not-found',
  description: 'NotFound',
  flags: [],
};

const green: OakStatus = {
  name: 'green',
  description: 'Green',
  flags: [],
};

const orange: OakStatus = {
  name: 'orange',
  description: 'Orange',
  flags: [],
};

const red: OakStatus = {
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

const statusList: OakStatus[] = Object.values(statusObj);

export { statusObj, statusList };
