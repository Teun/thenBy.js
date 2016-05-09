thenBy.js
=========

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]

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
`thenBy` also offers some nice shortcuts that make the most commons ways of sorting even easier and more readable:

```javascript
// first by length of name, then by population, then by ID
data.sort(
    firstBy(function (v) { return v.name.length; })
    .thenBy("population")
    .thenBy("id")
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

### Case insensitive sorting
(as of v1.2.0) All of the shortcut methods allow you to sort case insensitive as well. The second parameter expects an options object (if it is a number, it is interpreted as `direction` as above). The ignoreCase property can be set to true, like this:
```javascript
// first by name, case insensitive, then by population
data.sort(
    firstBy("name", {ignoreCase:true})
    .thenBy("population")
);
```
If you want to use both descending and ignoreCase, you have to use the options syntax for direction as well:
```javascript
// sort by name, case insensitive and descending
data.sort(firstBy("name", {ignoreCase:true, direction:-1}));
```

### A word on performance
thenBy constructs a comparer function for you. It does this by combining the functions you pass in with a number of small utility functions that perform tasks like "reverting", "combining the current sort order with the previous one", etc. Also, these operations try to work correctly, no matter what content is in the sorted array. There are two steps here that cost time: constructing the über-function and running it. The construction time should always be negligible. The run time however can be slower than when you carefully handcraft the compare function. Still, *normally you shouldn't worry about this*, but if you're sorting very large sets, it could matter. For example, there is some overhead in making several small functions call each other instead of creating one piece of code. Also, if you know your data well, and know that a specific field is *alwways present* and is *always a number*, you could code a significantly faster compare function then thenBy's results. The unit tests contain an extreme example.

If you use thenBy to combine multiple compare functions into one (where each function expects two parameters), the difference is small. Using unary functions adds some overhead, using direction:-1 adds some, using only a property name adds a little, but will check for missing values, which could be optimized. Ignoring case will slow down, but not more so than when handcoded.   

### Install in your HTML
To include it into your page/project, just paste the minified code from https://raw.github.com/Teun/thenBy.js/master/thenBy.min.js into yours (525 characters). If you don't want the `firstBy` function in your global namespace, you can assign it to a local variable (see sample.htm).

### Install in node.js
```npm install thenby```

then in your app:

```var firstBy = require('thenby');```

### Install via Bower
```bower install --save thenby```


Thanks a lot to https://github.com/bergus, https://github.com/hagabaka, https://github.com/infolyzer and https://github.com/Foxhoundn for their improvements.


[npm-image]: https://img.shields.io/npm/v/thenby.svg
[npm-url]: https://npmjs.org/package/thenby
[downloads-image]: https://img.shields.io/npm/dm/thenby.svg
[downloads-url]: https://npmjs.org/package/thenby
