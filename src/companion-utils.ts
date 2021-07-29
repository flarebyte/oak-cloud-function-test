import { OakActionCompanion, OakCall } from './model';

const mergeTwoActionCompanion = (
  a: OakActionCompanion,
  b: OakActionCompanion
): OakActionCompanion => ({
  call: { ...a.call, ...b.call },
  callByServiceOp: { ...a.call, ...b.callByServiceOp },
});

export const mergeActionCompanions = (
  companions: OakActionCompanion[]
): OakActionCompanion => companions.reduce(mergeTwoActionCompanion);

export type OakCallWrapper = (
  call: OakCall
) => OakCall;

const wrapCall = (wrapper: OakCallWrapper) => (keyCall: [string, OakCall]): [string, OakCall] => [keyCall[0], wrapper(keyCall[1])]

export const transformActionCompanion = (
  wrapper: OakCallWrapper
) => (companion: OakActionCompanion): OakActionCompanion => {
  const call = Object.fromEntries(Object.entries(companion.call).map(wrapCall(wrapper)))
  const callByServiceOp = Object.fromEntries(Object.entries(companion.callByServiceOp).map(wrapCall(wrapper)))

  return {
    call,
    callByServiceOp
  }
};
