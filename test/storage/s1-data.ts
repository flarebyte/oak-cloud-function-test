import { OakService, OakServiceOperation, OakStatus } from '../../src/model';

const coS1Service: OakService = {
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

const coS1ReadOp: OakServiceOperation = {
  name: 'company:s1:read',
  service: coS1Service,
  description: 'Read from Company S1',
  flags: [],
  statusDict: {
    ok,
    ko,
    notFound,
  },
};

const coS1WriteOp: OakServiceOperation = {
  name: 'company:s1:write',
  service: coS1Service,
  description: 'Write to Company S1',
  flags: [],
  statusDict: {
    ok,
    ko,
  },
};

const coS1Status = {
  ok,
  ko,
  notFound,
};

export { coS1Service, coS1ReadOp, coS1WriteOp, coS1Status };
