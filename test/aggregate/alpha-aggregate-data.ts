import { OakAction } from '../../src/model';
import { statusDict } from '../../src/status-data';
import { version } from './version';

const { ok, internalServiceError, unauthorized } = statusDict;

const aggregateDataAction: OakAction = {
  name: 'alpha-aggregate-europe',
  functionName: 'aggregateData',
  version,
  description: 'Aggregate european data',
  flags: [],
  statusDict: {
    ok,
    internalServiceError,
    unauthorized
  },
  systemFlagsDict: {
    circuitBreaking: 'circuit-breaking',
  },
};

export { aggregateDataAction };
