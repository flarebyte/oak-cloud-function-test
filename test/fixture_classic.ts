import { OakRequestEventType, OakUniverse } from '../src//model';
import { actionList, actionObj } from './fixture_action';
import { serviceList } from './fixture_service';
import { statusList } from './fixture_status';

const reqEventTypes: OakRequestEventType[] = [
  {
    name: 'write-to-s3',
    description: 'Write to storage',
    flags: [],
    action: actionObj.readLondonData,
    caller: 'action7/main/2',
  },
];
const myUniverse: OakUniverse = {
  services: serviceList,
  statusList,
  actions: actionList,
  reqEventTypes,
};

export { myUniverse };
