import { OakAction } from '../../src/model';
import { statusDict } from '../../src/status-data';
import { version } from './version';

const { ok, internalServiceError } = statusDict;

const aggregateDataAction: OakAction = {
  name: 'alpha-aggregate-europe',
  version,
  description: 'Aggregate european data',
  flags: [],
  statusDict: {
    ok,
    internalServiceError,
  },
  systemFlagsDict: {
    circuitBreaking: 'circuit-breaking',
  },
};

export { aggregateDataAction };
