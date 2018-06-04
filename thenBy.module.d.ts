// Type definitions for thenBy
// Definitions by: Teun Duynstee
declare class opt{
    direction?:number
}
interface IThenBy<T> {
    (v1: T, v2: T) : number;
    thenBy(key: ((v1: T, v2?: T) => any) | keyof T, direction?: number | opt): IThenBy<T>;
}

declare function firstBy<T = any>(key: ((v1: T, v2?: T) => any) | keyof T, direction?: number | opt): IThenBy<T>;

export = firstBy;