import { OakActionCompanion, OakRequestEvent } from '../../src/model';
import { OakSimulator, simulatedCall } from '../../src/simulator';

export const devAlphaCompanion = (
  simulator: OakSimulator
): OakActionCompanion => {
  const simulated = (request: OakRequestEvent) =>
    simulatedCall(simulator)(request);
  return {
    call: {
      readS1: simulated,
      writeS1: simulated,
    },
  };
};
