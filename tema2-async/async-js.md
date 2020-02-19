# The Async Module

[Async](https://caolan.github.io/async/v3/) is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. Although originally designed for use with Node.js and installable via 

```
npm install async
```

it can also be used directly in the browser.

## Map

```js
async.map(['file1','file2','file3'], fs.stat,  function(err, results)  {
      // results is now an array of stats for each file
}); 
```

* [Documentation of Map](https://caolan.github.io/async/v3/docs.html#map)

```js
map(
     coll, 
     (item, cb) => iteratee(item,cb), 
     (err, results) => maincallback(err, results)
   )
```

```js
    import map from 'async/map'; 
    // En Node.js
    const { map } = require('async')
```

1. Produces a new collection of values by mapping each value in `coll` through the `iteratee` function. 
2. The `iteratee` is called with an `item` from `coll` and a callback `cb` for when it has finished processing. 
3. Each of these callbacks `cb` take 2 arguments: an `error`, and the result of  `iteratee(item)`. 
4. If `iteratee` passes an error to its callback `cb`, the `maincallback` (for the `map` function) is immediately called with the error.
5. Note, that since this function applies the `iteratee` to each item in parallel, there is no guarantee that the `iteratee` functions will complete in order. However, **the `results` array will be in the same order as the original `coll`**.

## Filter

```js
async.filter(
    ['file1','file2','file3'],
    (filePath, callback) => {
      fs.access(filePath,  err => callback(null,  !err));  // Tests a user's permissions for file
    },  
    function(err, results)  {
      // results now equals an array of the existing files
   }
); 
```

* [Documentation of filter](https://caolan.github.io/async/v3/docs.html#filter)

```js
import filter from 'async/filter';

filter(coll, iteratee, callbackopt)
```

1. Returns a new array of all the values in `coll` which pass an async truth test. 
2. This operation is performed in parallel, but the results array will be in the same order as the original.
3. `iteratee` is a truth test to apply to each item in `coll`. 
   * The `iteratee` is invoked with `(item, callback)`
   * It is passed a `callback(err, truthValue)`, **which must be called with a boolean argument once it has completed**


## Parallel

```js
async.parallel(
   [
     (callback) => {
        setTimeout(() => { callback(null, 'one'); }, 200);
     },
     (callback) => {
        setTimeout(() => { callback(null, 'two'); }, 100);
     }
  ],
  // optional callback
  (err, results) => {
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});
```

* [Documentation of Parallel](https://caolan.github.io/async/v3/docs.html#parallel)

```js
    import parallel from 'async/parallel';

    parallel(tasks, callbackopt)
```

1. Run the `tasks` collection of functions in parallel, without waiting until the previous function has completed. 
2. If any of the functions pass an error to its callback, the main `callback` is immediately called with the value of the error. 
3. Once the `tasks` have completed, the results are passed to the final `callback` as an array.

**Hint:** Use [`reflect`](https://caolan.github.io/async/v3/docs.html#reflect) to continue the execution of other tasks when a task fails.

### It is also possible to use an object instead of an array

Each property will be run as a function and the results will be passed to the final `callback` as an object instead of an array.

This can be a more readable way of handling results from `async.parallel`

```js

// an example using an object instead of an array
async.parallel({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback) {
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equals to: {one: 1, two: 2}
});
```

## Series

```js
async.series([
    function(callback) {
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
});
```

* Documentation of [series](https://caolan.github.io/async/v3/docs.html#series)

**`series(tasks, callbackopt)`**

```js
import series from 'async/series';
```

1. Run the functions in the `tasks` collection in series, **each one running once the previous function has completed**. 
2. If any functions in the series pass an error to its callback, no more functions are run, and `callback` is immediately called with the value of the error. 
3. Otherwise, `callback` receives an array of results when `tasks` have completed.

### It is also possible to use an object instead of an array

```js
async.series({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equal to: {one: 1, two: 2}
});
```

Each property will be run as a function, and the results will be passed to the final `callback` as an object instead of an array. 

This can be a more readable way of handling results from `async.series`.

**Note** that while many implementations preserve the order of object properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6) explicitly states that

> The mechanics and order of enumerating the properties is not specified.

So if you rely on the order in which your series of functions are executed, and want this to work on all platforms, consider using an array.