export interface OakObjAbstracted {
  path: string;
  kind: string;
}

export type OakObjFieldMutationRule = (value: any) => any;

export interface OakObjFieldMutation {
  name: string;
  fieldKind: string;
  rule: OakObjFieldMutationRule;
}

export type OakObjAbstractionRule = (value: string) => string;

export interface OakObjApplicableMutation {
  path: string;
  kind: string;
  mutationName: string;
}
