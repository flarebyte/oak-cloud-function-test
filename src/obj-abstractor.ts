
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

const applyRulesToEntry =(prefix: string, rules: OakAbstractionRule[]) => (keyValue: [string, any]) : OakAbstracted => {
    const [childPath, value] = keyValue
    const path = `${prefix}${childPath}`
    const triggered = rules.map( rule => rule(value)).filter( v => v.length > 0)
    return triggered.length === 0 ? {path,  kind: unknown} : { path, kind: triggered[0]};
}

export const isObjectEntry = (keyValue: [string, any]): boolean => typeof keyValue[1] === 'object'

const isBasicEntry = (keyValue: [string, any]): boolean => ! (typeof keyValue[1] ==='object')

export const abstractObject = (rules: OakAbstractionRule[], prefix: string = '') => (value: object): OakAbstracted[] => {
    const results =  Object.entries(value).filter(isBasicEntry).map(applyRulesToEntry(prefix, rules));
    const objResults = Object.entries(value).filter(isObjectEntry).flatMap(keyValue => abstractObject(rules, `${keyValue[0]}.`)(keyValue[1]));
    return [...results, ...objResults]
}