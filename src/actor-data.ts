import { OakAction } from './model';
import { version } from './version';
import { OakFunction } from '../src/model';

const template = {
  version,
  flags: [],
  customStatusDict: {},
  systemFlagsDict: {},
};

export const beforeEachAction: OakAction = {
  ...template,
  name: 'oak-cloud-function-test/action/before-each',
  functionName: 'beforeEachAction',
  description: 'Runs a function before each of the tests is run',
};

export const beforeTestAction: OakAction = {
  ...template,
  name: 'oak-cloud-function-test/action/before-test',
  functionName: 'beforeTestAction',
  description: 'Runs a function before this test is run',
};

export const testAction: OakAction = {
  ...template,
  name: 'oak-cloud-function-test/action/test',
  functionName: 'testAction',
  description: 'Runs as part of the core test',
};

export const beforeEachFunc: OakFunction = {
  ...template,
  name: 'oak-cloud-function-test/func/before-each',
  functionName: 'beforeEachFunc',
  description: 'Runs a function before each of the tests is run',
};

export const beforeTestFunc: OakFunction = {
  ...template,
  name: 'oak-cloud-function-test/func/before-test',
  functionName: 'beforeTestFunc',
  description: 'Runs a function before this test is run',
};

export const testFunc: OakFunction = {
  ...template,
  name: 'oak-cloud-function-test/func/test',
  functionName: 'testFunc',
  description: 'Runs as part of the core test',
};

export const actorData = {
  actionDict: {
    beforeEach: beforeEachAction,
    beforeTest: beforeTestAction,
    test: testAction,
  },

  funcDict: {
    beforeEach: beforeEachFunc,
    beforeTest: beforeTestFunc,
    test: testFunc,
  },
};
