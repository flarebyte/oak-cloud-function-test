import {
  OakAction,
  OakActionCall,
  OakActionCallWrapper,
  OakActionCompanion,
  OakActionCtxCall,
  OakActionRequestEvent,
  OakActionToCall,
  OakCall,
  OakCallWrapper,
  OakCtxCall,
  OakEngineContext,
  OakFunctionCompanion,
  OakRequestEvent,
  OakServiceOperation,
  OakServiceOpToCall,
} from './model';

const mergeTwoActionCompanion = (
  a: OakActionCompanion,
  b: OakActionCompanion
): OakActionCompanion => ({
  explicitCall: { ...a.explicitCall, ...b.explicitCall },
  call: { ...a.call, ...b.call },
  callServiceOperationDict: {
    ...a.callServiceOperationDict,
    ...b.callServiceOperationDict,
  },
});

export const mergeActionCompanions = (
  companions: OakActionCompanion[]
): OakActionCompanion => companions.reduce(mergeTwoActionCompanion);

type OakServiceOperationDict = {
  [name: string]: OakServiceOperation;
};

const wrapCall =
  (serviceOpDict: OakServiceOperationDict, wrapper: OakCallWrapper) =>
  (keyCall: [string, OakCall]): [string, OakCtxCall] =>
    [keyCall[0], wrapper(serviceOpDict[keyCall[0]], keyCall[1])];

export const transformActionCompanion =
  (wrapper: OakCallWrapper) =>
  (companion: OakActionCompanion): OakActionCompanion => {
    const explicitCall = companion.explicitCall;
    const call = Object.fromEntries(
      Object.entries(explicitCall).map(
        wrapCall(companion.callServiceOperationDict, wrapper)
      )
    );

    return {
      explicitCall,
      call,
      callServiceOperationDict: companion.callServiceOperationDict,
    };
  };

export const buildActionCompanion = (
  mapping: OakServiceOpToCall[]
): OakActionCompanion => {
  const explicitCall = Object.fromEntries(
    mapping.map((m) => [m.so.functionName, m.call])
  );
  const tempCtx: OakEngineContext = {
    transactions: [],
    actionTransactions: [],
    systemFlags: [],
    businessOperationFlags: {},
    actionFlags: {},
    functionFlags: {},
  };
  const call = Object.fromEntries(
    mapping.map((m) => [
      m.so.functionName,
      (req: OakRequestEvent) => m.call(tempCtx, req),
    ])
  );
  const callServiceOperationDict = Object.fromEntries(
    mapping.map((m) => [m.so.functionName, m.so])
  );
  return {
    explicitCall,
    call,
    callServiceOperationDict,
  };
};

const mergeTwoFunctionCompanion = (
  a: OakFunctionCompanion,
  b: OakFunctionCompanion
): OakFunctionCompanion => ({
  explicitCall: { ...a.explicitCall, ...b.explicitCall },
  call: { ...a.call, ...b.call },
  actionDict: { ...a.actionDict, ...b.actionDict },
});

export const mergeFunctionCompanions = (
  companions: OakFunctionCompanion[]
): OakFunctionCompanion => companions.reduce(mergeTwoFunctionCompanion);

type OakActionDict = {
  [name: string]: OakAction;
};

const wrapActionCall =
  (actionDict: OakActionDict, wrapper: OakActionCallWrapper) =>
  (keyCall: [string, OakActionCall]): [string, OakActionCtxCall] =>
    [keyCall[0], wrapper(actionDict[keyCall[0]], keyCall[1])];

export const transformFunctionCompanion =
  (wrapper: OakActionCallWrapper) =>
  (companion: OakFunctionCompanion): OakFunctionCompanion => {
    const explicitCall = companion.explicitCall;
    const call = Object.fromEntries(
      Object.entries(explicitCall).map(
        wrapActionCall(companion.actionDict, wrapper)
      )
    );

    return {
      explicitCall,
      call,
      actionDict: companion.actionDict,
    };
  };

export const buildFunctionCompanion =
  (mapping: OakActionToCall[]) =>
  (actionCompanion: OakActionCompanion): OakFunctionCompanion => {
    const explicitCall = Object.fromEntries(
      mapping.map((m) => [m.action.functionName, m.call])
    );
    const tempCtx: OakEngineContext = {
      transactions: [],
      actionTransactions: [],
      systemFlags: [],
      businessOperationFlags: {},
      actionFlags: {},
      functionFlags: {},
    };
    const call = Object.fromEntries(
      mapping.map((m) => [
        m.action.functionName,
        (req: OakActionRequestEvent) => m.call(tempCtx, actionCompanion, req),
      ])
    );
    const actionDict = Object.fromEntries(
      mapping.map((m) => [m.action.functionName, m.action])
    );
    return {
      explicitCall,
      call,
      actionDict,
    };
  };

export type OakFunctionCompanionBuilder = (
  companion: OakActionCompanion
) => OakFunctionCompanion;
