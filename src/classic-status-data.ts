import { OakStatus } from './model';

const status_flags = {
  success: 'success',
  failure: 'failure',
  invalid: 'invalid'
}

const ok: OakStatus = {
  name: 'ok',
  description: 'The request has succeeded',
  flags: [status_flags.success],
};

const created: OakStatus = {
  name: 'created',
  description: 'The request has been fulfilled and has resulted in one or more new resources being created',
  flags: [status_flags.success],
};

const accepted: OakStatus = {
  name: 'accepted',
  description: 'The request has been accepted for processing but has not yet completed',
  flags: [status_flags.success],
};

const notFound: OakStatus = {
  name: 'not-found',
  description: 'The document was not found',
  flags: [status_flags.invalid],
};
const badRequest: OakStatus = {
  name: 'bad-request',
  description: 'Malformed request syntax',
  flags: [status_flags.invalid],
};

const unauthorized: OakStatus = {
  name: 'unauthorized',
  description: 'Invalid authentication credentials',
  flags: [status_flags.invalid],
};

const forbidden: OakStatus = {
  name: 'forbidden',
  description: 'Insufficient access rights',
  flags: [status_flags.invalid],
};

const payloadTooLarge: OakStatus = {
  name: 'payload-too-large',
  description: 'The request payload is too large',
  flags: [status_flags.invalid],
};

const unsupportedMediaType: OakStatus = {
  name: 'unsupported-media-type',
  description: 'The payload is not in the right format',
  flags: [status_flags.invalid],
};

const internalServiceError: OakStatus = {
  name: 'internal-service-error',
  description: 'Encountered an unexpected condition',
  flags: [status_flags.failure],
};

const serviceUnavailable: OakStatus = {
  name: 'service-unavailable',
  description: 'Unable to handle the request due to a temporary overload or scheduled maintenance',
  flags: [status_flags.failure],
};

const classicStatusDict = {
  ok,
  created,
  accepted,
  notFound,
  badRequest,
  unauthorized,
  forbidden,
  payloadTooLarge,
  unsupportedMediaType,
  internalServiceError,
  serviceUnavailable

}

const classicStatusList: OakStatus[] = Object.values(classicStatusDict);

export { classicStatusDict, classicStatusList };
