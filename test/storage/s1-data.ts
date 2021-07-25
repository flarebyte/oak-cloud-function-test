import {
  OakService,
  OakServiceData,
  OakServiceOperation,
  OakStatus,
} from '../../src/model';

const service: OakService = {
  name: 'company:s1',
  description: 'Cloud storage',
  flags: [],
};

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

const badRequest: OakStatus = {
  name: 'bad-request',
  description: 'BadRequest',
  flags: [],
};

const circuitBreaking: OakStatus = {
  name: 'circuit-breaking',
  description: 'circuit-breaking',
  flags: [],
};

const read: OakServiceOperation = {
  name: 'company:s1:read',
  service,
  description: 'Read from Company S1',
  flags: [],
  statusDict: {
    ok,
    ko,
    notFound,
  },
};

const write: OakServiceOperation = {
  name: 'company:s1:write',
  service,
  description: 'Write to Company S1',
  flags: [],
  statusDict: {
    ok,
    ko,
  },
};

const coS1: OakServiceData = {
  name: 'coS1',
  description: 'Service to read and write to storage',
  flags: [],
  service,
  serviceOpDict: {
    read,
    write,
  },
  statusDict: {
    ok,
    ko,
    notFound,
    badRequest,
    circuitBreaking,
  },
  systemFlagsDict: {
    circuitBreaking: 'circuit-breaking',
  },
};

export { coS1 };
