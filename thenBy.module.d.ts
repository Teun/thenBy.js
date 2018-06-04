// Type definitions for thenBy
// Definitions by: Teun Duynstee

interface IThenBy<T> {
    (v1: T, v2: T) : number;
    thenBy(key: ((v1: T, v2?: T) => any) | keyof T, direction?: number): IThenBy<T>;
}

declare function firstBy<T2>(key: ((v1: T2, v2?: T2) => any) | keyof T2, direction?: number): IThenBy<T2>;

export = firstBy;