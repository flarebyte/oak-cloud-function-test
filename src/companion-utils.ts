import { OakActionCompanion, OakCall, OakCallWrapper, OakServiceOperation, OakServiceOpToCall } from './model';

const mergeTwoActionCompanion = (
  a: OakActionCompanion,
  b: OakActionCompanion
): OakActionCompanion => ({
  call: { ...a.call, ...b.call },
  callServiceOperationDict: {...a.callServiceOperationDict, ...b.callServiceOperationDict}
});

export const mergeActionCompanions = (
  companions: OakActionCompanion[]
): OakActionCompanion => companions.reduce(mergeTwoActionCompanion);

type OakServiceOperationDict = {
  [name: string]: OakServiceOperation;
}

const wrapCall = (serviceOpDict: OakServiceOperationDict, wrapper: OakCallWrapper) => (keyCall: [string, OakCall]): [string, OakCall] => [keyCall[0], wrapper(serviceOpDict[keyCall[0]], keyCall[1])]

export const transformActionCompanion = (
  wrapper: OakCallWrapper
) => (companion: OakActionCompanion): OakActionCompanion => {
  const call = Object.fromEntries(Object.entries(companion.call).map(wrapCall(companion.callServiceOperationDict, wrapper)))

  return {
    call,
    callServiceOperationDict: companion.callServiceOperationDict
  }
};

export const buildActionCompanion = (mapping: OakServiceOpToCall[]): OakActionCompanion => {
  const call = Object.fromEntries(mapping.map( m => [m.so.functionName, m.call]))
  const callServiceOperationDict = Object.fromEntries(mapping.map( m => [m.so.functionName, m.so]))
  return {
    call,
    callServiceOperationDict
  }
}
