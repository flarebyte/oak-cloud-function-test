import { OakService } from '../src/model';

const awsS3: OakService = {
  name: 'aws:s3',
  description: 'Cloud storage',
  flags: [],
};
const awsSQS: OakService = {
  name: 'aws:sqs',
  description: 'Cloud Queue Service',
  flags: [],
};
const awsSNS: OakService = {
  name: 'aws:sns',
  description: 'Cloud Notification Service',
  flags: [],
};

const serviceObj = {
  awsS3,
  awsSQS,
  awsSNS,
};
const serviceList: OakService[] = Object.values(serviceObj);

export { serviceObj, serviceList };
