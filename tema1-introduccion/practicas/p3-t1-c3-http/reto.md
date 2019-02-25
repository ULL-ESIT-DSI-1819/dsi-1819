# Reto: Fixing a leak

For easy remote access to some files, I might get into the habit
of having the file server defined in this chapter running on my
machine, in the `/home/marijn/public` directory. Then, one day, I
find that someone has gained access to all the passwords I stored
in my browser.

## What happened?

If it isn’t clear to you yet, think back to the urlToPath function, defined like this:

```js
function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  return "." + decodeURIComponent(path);
}
```
Now consider the fact that paths passed to the `fs` functions can
be relative—they may contain `../` to go up a directory. What happens
when a client sends requests to URLs like the ones shown here?

```html
http://myhostname:8000/../.config/config/google-chrome/Default/Web%20Data
http://myhostname:8000/../.ssh/id_dsa
http://myhostname:8000/../../../etc/passwd
```

1. Change `urlToPath` to fix this problem. Take into account the fact
that Node on Windows allows both forward slashes and backslashes
to separate directories.
2. It is enough to strip out all occurrences of two dots that have a
slash, a backslash, or the end of the string on both sides. 
3.  Using the `replace` method with a regular expression is the easiest way to
do this. 
4. But since such instances may overlap (as in `/../../f`),
you may have to apply replace multiple times, until the string no
longer changes. 
5. Also make sure you do the replace after decoding
the string, or it would be possible to foil the check by encoding
a dot or a slash.

Another potentially worrying case is when paths start with a slash,
which are interpreted as absolute paths. 

But because `urlToPath` puts
a dot character in front of the path, it is impossible to create
requests that result in such a path. 

Multiple slashes in a row,
inside the path, are odd but will be treated as a single slash by
the file system.

Here is a [Solution](https://github.com/ULL-ESIT-MII-CA-1718/ejs-chapter20-node-js)
