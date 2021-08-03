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

const serviceStatusDict = {
  ok,
  internalServiceError,
  notFound,
  badRequest,
  circuitBreaking,
}

const systemFlagsDict = {
  circuitBreaking: 'circuit-breaking',
}


const read: OakServiceOperation = {
  name: 'company:s1:read',
  functionName: 'readS1',
  version,
  service,
  description: 'Read from Company S1',
  flags: [],
  statusDict: serviceStatusDict,
  systemFlagsDict
};

const write: OakServiceOperation = {
  name: 'company:s1:write',
  functionName: 'writeS1',
  version,
  service,
  description: 'Write to Company S1',
  flags: [],
  statusDict: serviceStatusDict,
  systemFlagsDict
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
  }
};

export { coS1 };
