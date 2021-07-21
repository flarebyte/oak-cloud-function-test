import { OakServiceOperation } from '../src/model';
import { serviceObj } from './fixture-service';

const readFromS3: OakServiceOperation = {
  name: 'aws:s3:read',
  service: serviceObj.awsS3,
  description: 'Read from AWS S3',
  flags: [],
};

const writeToS3: OakServiceOperation = {
  name: 'aws:s3:write',
  service: serviceObj.awsS3,
  description: 'Write to AWS S3',
  flags: [],
};

const serviceOperationObj = {
  readFromS3,
  writeToS3,
};

const serviceOperationList: OakServiceOperation[] = Object.values(
  serviceOperationObj
);

export { serviceOperationObj, serviceOperationList };
