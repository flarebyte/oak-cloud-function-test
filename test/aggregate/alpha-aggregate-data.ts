import { OakAction } from '../../src/model';
import { statusDict } from '../../src/status-data';

const { ok, internalServiceError } = statusDict;

const aggregateDataAction: OakAction = {
  name: 'alpha-aggregate-europe',
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
