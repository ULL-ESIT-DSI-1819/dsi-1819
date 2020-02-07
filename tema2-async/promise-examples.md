## Examples of Promises

### local/src/uai/uai2015/promise-ejemplo

* [A Gist with a very Simple Example of How to make and use a Promise](https://gist.github.com/crguezl/f5c52c8b72b4722e374a8af10e9d2b5d)

### apuntes/tema1-introduccion/practicas/p2-t1-c3-file-system/event-loop/promise-ejemplo/promise-job-queue.js

Promises that resolve before the current function ends 
will be executed right after the current function.

```js
[~/.../p2-t1-c3-file-system/event-loop/promise-ejemplo/(master)]$ cat promise-job-queue.js 
let promise = new Promise(function(resolve, reject) {
  resolve(1)
});

promise.then(function(resolve) {console.log(1)});

console.log('a');

promise.then(function(resolve) {console.log(2);});

setTimeout(function() {console.log('h')}, 0);

promise.then(function(resolve) {console.log(3)});

console.log('b');
```
