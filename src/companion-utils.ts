import { OakActionCompanion } from './model';

const mergeTwoActionCompanion = (
  a: OakActionCompanion,
  b: OakActionCompanion
): OakActionCompanion => ({
  call: { ...a.call, ...b.call },
});

export const mergeActionCompanions = (
  companions: OakActionCompanion[]
): OakActionCompanion => companions.reduce(mergeTwoActionCompanion);
