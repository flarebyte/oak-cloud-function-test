import { OakAction, OakStatus } from '../../src/model';

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

const aggregateDataAction: OakAction = {
  name: 'alpha-aggregate-europe',
  description: 'Aggregate european data',
  flags: [],
  statusDict: {
    ok,
    ko,
  },
  systemFlagsDict: {
    circuitBreaking: 'circuit-breaking',
  },
};

export { aggregateDataAction };
