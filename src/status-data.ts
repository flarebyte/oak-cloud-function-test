import { OakStatus } from './model';

export const statusFlagDict = {
  success: 'success',
  failure: 'failure',
  invalid: 'invalid',
};

const ok: OakStatus = {
  name: 'ok',
  description: 'The request has succeeded',
  flags: [statusFlagDict.success],
};

const found: OakStatus = {
  name: 'found',
  description: 'The resource has been found',
  flags: [statusFlagDict.success],
};

const absent: OakStatus = {
  name: 'absent',
  description: 'The resource is not present',
  flags: [statusFlagDict.success],
};

const empty: OakStatus = {
  name: 'empty',
  description: 'The collection has been found but is empty',
  flags: [statusFlagDict.success],
};

const single: OakStatus = {
  name: 'single',
  description: 'A collection has been found with a single element',
  flags: [statusFlagDict.success],
};

const multiple: OakStatus = {
  name: 'multiple',
  description: 'A collection has been found with a multiple elements',
  flags: [statusFlagDict.success],
};

const created: OakStatus = {
  name: 'created',
  description:
    'The request resulted in the creation of one or more new resources',
  flags: [statusFlagDict.success],
};

const updated: OakStatus = {
  name: 'updated',
  description:
    'The request resulted in the update of one or more new resources',
  flags: [statusFlagDict.success],
};

const createdOrUpdated: OakStatus = {
  name: 'created-or-updated',
  description:
    'The request resulted in the creation or update of one or more resources',
  flags: [statusFlagDict.success],
};

const deleted: OakStatus = {
  name: 'deleted',
  description: 'The request resulted in the deletion of one or more resources',
  flags: [statusFlagDict.success],
};

const accepted: OakStatus = {
  name: 'accepted',
  description:
    'The request has been accepted for processing but has not yet completed',
  flags: [statusFlagDict.success],
};

const notFound: OakStatus = {
  name: 'not-found',
  description: 'The document was not found but was expected',
  flags: [statusFlagDict.invalid],
};

const badRequest: OakStatus = {
  name: 'bad-request',
  description: 'Malformed request syntax',
  flags: [statusFlagDict.invalid],
};

const unauthorized: OakStatus = {
  name: 'unauthorized',
  description: 'Invalid authentication credentials',
  flags: [statusFlagDict.invalid],
};

const forbidden: OakStatus = {
  name: 'forbidden',
  description: 'Insufficient access rights',
  flags: [statusFlagDict.invalid],
};

const payloadTooLarge: OakStatus = {
  name: 'payload-too-large',
  description: 'The request payload is too large',
  flags: [statusFlagDict.invalid],
};

const unsupportedMediaType: OakStatus = {
  name: 'unsupported-media-type',
  description: 'The payload is not in the right format',
  flags: [statusFlagDict.invalid],
};

const internalServiceError: OakStatus = {
  name: 'internal-service-error',
  description: 'Encountered an unexpected condition',
  flags: [statusFlagDict.failure],
};

const serviceUnavailable: OakStatus = {
  name: 'service-unavailable',
  description:
    'Unable to handle the request due to a temporary overload or scheduled maintenance',
  flags: [statusFlagDict.failure],
};

export const statusDict = {
  ok,
  found,
  absent,
  empty,
  single,
  multiple,
  created,
  updated,
  createdOrUpdated,
  accepted,
  deleted,
  notFound,
  badRequest,
  unauthorized,
  forbidden,
  payloadTooLarge,
  unsupportedMediaType,
  internalServiceError,
  serviceUnavailable,
};
