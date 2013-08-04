thenBy.js
=========

thenBy is a javascript micro library that helps sorting arrays on multiple keys. It allows you to use the standard plain vanilla Array.sort() method of javascript, but pass in multiple functions to sort on using the firstBy().thenBy().thenBy() style.

Example:
```javascript
// first by length of name, then by population, then by ID
  data.sort(
              firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
              .thenBy(function (v1, v2) { return v1.population - v2.population; })
              .thenBy(function (v1, v2) { return v1.id - v2.id; });
    );

```
