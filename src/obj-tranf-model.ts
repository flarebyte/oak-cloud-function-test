export type FieldPrimitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint
  | Function;

export type AdvancedObject = { [Key in string]?: ObjectValue };

export type ObjectArray = ObjectValue[];

export type ObjectValue = FieldPrimitive | AdvancedObject | ObjectArray;
export interface OakObjAbstracted {
  path: string;
  kind: string;
}

export type OakObjFieldMutationRule = (value: ObjectValue) => ObjectValue;

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
