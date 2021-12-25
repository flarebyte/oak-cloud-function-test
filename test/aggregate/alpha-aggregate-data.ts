import { OakAction } from '../../src/model';
import { version } from './version';

const aggregateDataAction: OakAction = {
  name: 'alpha-aggregate-europe',
  functionName: 'aggregateData',
  version,
  description: 'Aggregate european data',
  flags: [],
  customStatusDict: {},
  systemFlagsDict: {
    circuitBreaking: 'circuit-breaking',
  },
};

export { aggregateDataAction };
