import { shouldReturnStatus } from './flag-utils';
import {
  OakBeforeCallInterceptor,
  OakEngineContext,
  OakRequestEvent,
  OakResponseEvent,
  OakServiceOperation,
  OakStatus,
} from './model';
import { statusDict } from './status-data';
const { internalServiceError } = statusDict;

const neverResponse: OakResponseEvent = {
  comment: 'This should never be called',
  status: internalServiceError,
  payload: {},
  flags: [],
};
const neverCall = (): Promise<OakResponseEvent> =>
  Promise.resolve(neverResponse);

const shortcutWithStatus =
  (status: OakStatus) => (): Promise<OakResponseEvent> =>
    Promise.resolve({
      comment: 'shortcut by simulator',
      status,
      payload: {},
      flags: [],
    });

export const defaultBeforeCall =
  (refStatusDict: { [name: string]: OakStatus }) =>
  (
    _serviceOperation: OakServiceOperation,
    context: OakEngineContext,
    request: OakRequestEvent
  ): OakBeforeCallInterceptor => {
    const boFlags =
      context.businessOperationFlags[request.businessOperation.name] || [];
    const status = shouldReturnStatus(refStatusDict, boFlags);
    if (!status) {
      return {
        pass: true,
        call: neverCall,
      };
    }
    return {
      pass: false,
      call: shortcutWithStatus(status),
    };
  };
