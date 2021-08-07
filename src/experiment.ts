import { OakActionAndRequest } from './model';
import { OakSimulator } from './simulator';
import { OakActionExperiment } from './simulator-model';

export class OakExperiment {
  simulator: OakSimulator;
  actionAndrequests: OakActionAndRequest[];
  actionExperiment: OakActionExperiment[];

  constructor() {
    this.simulator = new OakSimulator();
    this.actionExperiment = [];
    this.actionAndrequests = [];
  }
}
