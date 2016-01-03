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

### Sort by property names
Javascript sorting relies heavily on passing discriminator functions that return -1, 0 or 1 for a pair of items. While this is very flexible, often you want to sort on the value of a simple property. As a convenience, thenBy.js builds the appropriate compare function for you if you pass in a property name (instead of a function). The example above would then look like this:
```javascript
// first by length of name, then by population, then by ID
data.sort(
    firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
    .thenBy("population")
    .thenBy("id")
);
```

If an element doesn't have the property defined, it will sort like the empty string (""). Typically, this will be at the top.

### Sort by unary functions
You can also pass a function that takes a single item and returns its sorting key.
```
// first by length of name, then by population, then by ID
data.sort(
    firstBy(function (v) { return v.name.length; })
    .thenBy(function (v) { return v.population; })
    .thenBy("id")
);
```

### Sort descending
thenBy.js allows you to pass in a second parameter for `direction`. If you pass in -1 (nothing else), the sorting will be reversed. So:
```javascript
// first by length of name descending, then by population descending, then by ID ascending
data.sort(
    firstBy(function (v1, v2) { return v1.name.length - v2.name.length; }, -1)
    .thenBy("population", -1)
    .thenBy("id")
);
```

### Install in your HTML
To include it into your page/project, just paste the minified code from https://raw.github.com/Teun/thenBy.js/master/thenBy.min.js into yours (364 characters). If you don't want the `firstBy` function in your global namespace, you can assign it to a local variable (see sample.htm).

### Install in node.js
```npm install thenby```

then in your app:

```var firstBy = require('thenby');```


Thanks a lot to https://github.com/bergus, https://github.com/hagabaka and https://github.com/infolyzer for their improvements.
