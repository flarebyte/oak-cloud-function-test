
const unknown = 'unknown'

export interface OakAbstracted {
    path: string;
    kind: string;
}

export type OakAbstractionRule = (value: any) => string

const someString: OakAbstractionRule = (value: any) => typeof value === 'string' ? 'string' : ''
const someNumber: OakAbstractionRule = (value: any) => typeof value === 'number' ? 'number' : ''
const someBoolean: OakAbstractionRule = (value: any) => typeof value === 'boolean' ? 'boolean' : ''

export const abstractionRules = [
    someString,
    someNumber,
    someBoolean
]

const applyRulesToEntry =(rules: OakAbstractionRule[]) => (keyValue: [string, any]) : OakAbstracted => {
    const [path, value] = keyValue
    const triggered = rules.map( rule => rule(value)).filter( v => v.length > 0)
    return triggered.length === 0 ? {path,  kind: unknown} : { path, kind: triggered[0]};
}

export const abstractObject = (rules: OakAbstractionRule[]) => (value: object): OakAbstracted[] => {
    const results =  Object.entries(value).map(applyRulesToEntry(rules));
    return results
}