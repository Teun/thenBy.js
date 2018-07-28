// Type definitions for thenBy
// Definitions by: Teun Duynstee
declare class opt{
    direction?:number;
    ignoreCase?:boolean;
    cmp?: (v1: any, v2: any) => number;

}
interface IThenBy<T> {
    (v1: T, v2: T) : number;
    thenBy(key: ((v1: T, v2?: T) => any) | keyof T, direction?: number | opt): IThenBy<T>;
}
declare module "thenby" {
    export function firstBy<T = any>(key: ((v1: T, v2?: T) => any) | keyof T, direction?: number | opt): IThenBy<T>;
}
