
export interface OakAbstracted {
    path: string;
    kind: string;
}

export type OakAbstractionRule = (value: string) => string

const someUrl: OakAbstractionRule = (value: string) => value.startsWith('http://') || value.startsWith('https://') ? 'url': ''

export const abstractionRules = [
    someUrl,
]

const applyRulesToEntry =(prefix: string, rules: OakAbstractionRule[]) => (keyValue: [string, any]) : OakAbstracted => {
    const [childPath, value] = keyValue
    const path = `${prefix}${childPath}`
    const defaultValue = {path,  kind: typeof value}
    if (typeof value !== 'string') {
        return defaultValue;
    }
    const triggered = rules.map( rule => rule(value)).filter( v => v.length > 0)
    return triggered.length === 0 ?  defaultValue : { path, kind: triggered[0]};
}

export const isObjectEntry = (keyValue: [string, any]): boolean => typeof keyValue[1] === 'object'

const isBasicEntry = (keyValue: [string, any]): boolean => ! (typeof keyValue[1] ==='object')

export const abstractObject = (rules: OakAbstractionRule[], prefix: string = '') => (value: object): OakAbstracted[] => {
    const results =  Object.entries(value).filter(isBasicEntry).map(applyRulesToEntry(prefix, rules));
    const objResults = Object.entries(value).filter(isObjectEntry).flatMap(keyValue => abstractObject(rules, `${prefix}${keyValue[0]}.`)(keyValue[1]));
    return [...results, ...objResults]
}