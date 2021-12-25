import { OakResource } from '../src/model';

const s3London: OakResource = {
  name: 's3:london',
  description: 'Bucket for London',
  flags: [],
};

const s3Paris: OakResource = {
  name: 's3:paris',
  description: 'Bucket for Paris',
  flags: [],
};

const s3Europe: OakResource = {
  name: 's3:europe',
  description: 'Bucket for Europe',
  flags: [],
};

const resourceObj = {
  s3London,
  s3Paris,
  s3Europe,
};

const resourceList = Object.values(resourceObj);

export { resourceObj, resourceList };
