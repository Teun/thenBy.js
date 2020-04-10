// Type definitions for thenBy
// Definitions by: Teun Duynstee
type upDown = -1 | 1;
declare class opt{
    direction?:upDown;
    ignoreCase?:boolean;
}
interface IThenBy<T> {
    (v1: T, v2: T) : number;
    /** 
     * Full format to compare two elements and determine which sorts first.
     * @param compare function that receives two values from the sorted array and returns a number indicating which comes first: < 0: first comes first, 0: doesn't matter, > 0: second comes first.
     * @param direction can be used to reverse the sorting by passing -1
    **/
   thenBy<T = any>(compare: ((v1: T, v2: T) => number), direction?: upDown | opt): IThenBy<T>;
    /** 
     * Shorthand for selecting a value to sort on from the sorted element.
     * @param select function that receives a value from the sorted array and selects the thing to sort on
     * @param direction reverse by passing -1. opt for other options
    **/
   thenBy<T = any>(select: ((v: T) => any), direction?: upDown | opt): IThenBy<T>;
    /** 
     * Shorthand for sorting on a simple property.
     * @param byPropertyName is the name of the property to sort on as a string
     * @param direction reverse by passing -1. opt for other options
    **/
    thenBy<T = any>(byPropertyName: (keyof T), direction?: upDown | opt): IThenBy<T>;
}
declare module "thenby" {
    /** 
     * Full format to compare two elements and determine which sorts first.
     * @param compare function that receives two values from the sorted array and returns a number indicating which comes first: < 0: first comes first, 0: doesn't matter, > 0: second comes first.
     * @param direction can be used to reverse the sorting by passing -1
    **/
    export function firstBy<T = any>(compare: ((v1: T, v2: T) => number), direction?: upDown | opt): IThenBy<T>;
    /** 
     * Shorthand for selecting a value to sort on from the sorted element.
     * @param select function that receives a value from the sorted array and selects the thing to sort on
     * @param direction reverse by passing -1. opt for other options
    **/
    export function firstBy<T = any>(select: ((v: T) => any), direction?: upDown | opt): IThenBy<T>;
    /** 
     * Shorthand for sorting on a simple property.
     * @param byPropertyName is the name of the property to sort on as a string
     * @param direction reverse by passing -1. opt for other options
    **/
    export function firstBy<T = any>(byPropertyName: (keyof T), direction?: upDown | opt): IThenBy<T>;
  }
