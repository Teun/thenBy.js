// Type-checking tests for thenBy declarations.
// This file is never executed — it is only compiled with tsc --noEmit.
// Any regression in the .d.ts will cause a compile error here.

import { firstBy } from '..';

interface City {
    name: string;
    population: number;
    id: number;
    country: string;
}

const data: City[] = [];

// Binary compare function without explicit type annotation.
// T cannot be inferred from the callback, so the property-name chain
// must still compile via the string fallback overload.
data.sort(
    firstBy(function (v1, v2) { return (v1 as any).name.length - (v2 as any).name.length; })
        .thenBy("population")
        .thenBy("id")
);

// Explicit type parameter — fully typed, keyof T enforced on thenBy.
data.sort(
    firstBy<City>(function (v1, v2) { return v1.name.length - v2.name.length; })
        .thenBy("population")
        .thenBy("id")
);

// Unary function — T inferred from argument, chain fully typed.
data.sort(
    firstBy((v: City) => v.name.length)
        .thenBy("population")
        .thenBy("id")
);

// Property name as first sort key.
data.sort(
    firstBy<City>("country")
        .thenBy("population")
        .thenBy("id")
);

// Direction options.
data.sort(firstBy<City>("name", -1).thenBy("population", { direction: "desc" }));

// Custom comparator option.
data.sort(
    firstBy((v: City) => v.name, {
        ignoreCase: true,
        cmp: (a, b) => a.localeCompare(b),
    })
);

// default export works too.
import firstByDefault from '..';
const _sorter = firstByDefault((v: City) => v.population);
