import { OakServiceOperation } from './model';

type OakServiceOpObj = { [name: string]: OakServiceOperation };

const mergeTwoServiceOpObj = (
  a: OakServiceOpObj,
  b: OakServiceOpObj
): OakServiceOpObj => ({ ...a, ...b });

export const mergeServiceOperationObjects = (serviceOps: OakServiceOpObj[]) =>
  serviceOps.reduce(mergeTwoServiceOpObj);
