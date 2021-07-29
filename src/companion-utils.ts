import { OakActionCompanion, OakCall, OakCallWrapper, OakServiceOpToCall } from './model';

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

export const buildActionCompanion = (mapping: OakServiceOpToCall[]): OakActionCompanion => {
  const call = Object.fromEntries(mapping.map( m => [m.so.functionName, m.call]))
  const callByServiceOp = Object.fromEntries(mapping.map( m => [m.so.name, m.call]))
  return {
    call,
    callByServiceOp
  }
}
