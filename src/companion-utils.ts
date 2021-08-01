import { OakActionCompanion, OakCall, OakCallWrapper, OakCtxCall, OakEngineContext, OakRequestEvent, OakServiceOperation, OakServiceOpToCall } from './model';

const mergeTwoActionCompanion = (
  a: OakActionCompanion,
  b: OakActionCompanion
): OakActionCompanion => ({
  explicitCall: {...a.explicitCall, ...b.explicitCall},
  call: { ...a.call, ...b.call },
  callServiceOperationDict: {...a.callServiceOperationDict, ...b.callServiceOperationDict}
});

export const mergeActionCompanions = (
  companions: OakActionCompanion[]
): OakActionCompanion => companions.reduce(mergeTwoActionCompanion);

type OakServiceOperationDict = {
  [name: string]: OakServiceOperation;
}

const wrapCall = (serviceOpDict: OakServiceOperationDict, wrapper: OakCallWrapper) => (keyCall: [string, OakCall]): [string, OakCtxCall] => [keyCall[0], wrapper(serviceOpDict[keyCall[0]], keyCall[1])]

export const transformActionCompanion = (
  wrapper: OakCallWrapper
) => (companion: OakActionCompanion): OakActionCompanion => {
  const explicitCall = companion.explicitCall
  const call = Object.fromEntries(Object.entries(explicitCall).map(wrapCall(companion.callServiceOperationDict, wrapper)))

  return {
    explicitCall,
    call,
    callServiceOperationDict: companion.callServiceOperationDict
  }
};

export const buildActionCompanion = (mapping: OakServiceOpToCall[]): OakActionCompanion => {
  const explicitCall = Object.fromEntries(mapping.map( m => [m.so.functionName, m.call]))
  const tempCtx: OakEngineContext = {
    transactions: [],
    systemFlags: []
  }
  const call = Object.fromEntries(mapping.map( m => [m.so.functionName, (req: OakRequestEvent) => m.call(tempCtx, req)]))
  const callServiceOperationDict = Object.fromEntries(mapping.map( m => [m.so.functionName, m.so]))
  return {
    explicitCall,
    call,
    callServiceOperationDict
  }
}
