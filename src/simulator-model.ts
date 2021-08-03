export interface OakSimServiceOpTx {
  id: number;
  businessOperationName: string;
  serviceOperationName: string;
  serviceName: string;
  caller: string;
  serviceParams: object;
  systemFlags: string;
  reqComment: string;
  reqPayload: object;
  reqFlags: string;
  statusName: string;
  respComment: string;
  respPayload: object;
  respFlags: string;
}

export interface OakActionTx {
  id: number;
  actionName: string;
  caller: string;
  params: object;
  systemFlags: string;
  reqComment: string;
  reqPayload: object;
  reqFlags: string;
  statusName: string;
  respComment: string;
  respPayload: object;
  respFlags: string;
}
