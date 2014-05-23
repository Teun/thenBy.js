thenBy.js
=========

`thenBy` is a javascript micro library that helps sorting arrays on multiple keys. It allows you to use the [native Array::sort() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) of javascript, but pass in multiple functions to sort that are composed with `firstBy().thenBy().thenBy()` style.

Example:
```javascript
// first by length of name, then by population, then by ID
data.sort(
    firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
    .thenBy(function (v1, v2) { return v1.population - v2.population; })
    .thenBy(function (v1, v2) { return v1.id - v2.id; })
);

```

To include it into your page/project, just paste the minified code from https://raw.github.com/Teun/thenBy.js/master/thenBy.min.js into yours (137 characters). 

Thanks a lot to https://github.com/bergus for his improvements.
