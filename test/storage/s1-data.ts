import {
  OakService,
  OakServiceData,
  OakServiceOperation,
  OakStatus,
} from '../../src/model';

import { statusDict } from '../../src/status-data';
import { version } from './version';

const { ok, notFound, badRequest, internalServiceError } = statusDict;

const service: OakService = {
  name: 'company:s1',
  description: 'Cloud storage',
  flags: [],
};

const circuitBreaking: OakStatus = {
  name: 'circuit-breaking',
  description: 'circuit-breaking',
  flags: [],
};

const read: OakServiceOperation = {
  name: 'company:s1:read',
  version,
  service,
  description: 'Read from Company S1',
  flags: [],
  statusDict: {
    ok,
    notFound,
  },
};

const write: OakServiceOperation = {
  name: 'company:s1:write',
  version,
  service,
  description: 'Write to Company S1',
  flags: [],
  statusDict: {
    ok,
    internalServiceError,
  },
};

const coS1: OakServiceData = {
  name: 'coS1',
  version,
  description: 'Service to read and write to storage',
  flags: [],
  service,
  serviceOpDict: {
    read,
    write,
  },
  statusDict: {
    ok,
    internalServiceError,
    notFound,
    badRequest,
    circuitBreaking,
  },
  systemFlagsDict: {
    circuitBreaking: 'circuit-breaking',
  },
};

export { coS1 };
