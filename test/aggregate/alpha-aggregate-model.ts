export enum AggregateTask {
  Sum,
  Merge,
}
export interface AlphaAggregateParams {
  task: AggregateTask;
}

export interface CityPayload {
  data: number[];
}
