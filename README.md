# [sumi-hash](https://www.npmjs.com/package/sumi-hash)
A collection of hash algorithms. MD5, RIPEMD-160, SHA-1, SHA-2, SHA-3, RFC4122 UUID version 1, 3, 4, 5, bla bla etc. Stand alone mod, no dependencies.

Target environments
-------------------

- IE 6+
- Latest Stable: Firefox, Chrome, Safari, Opera
- [Node.js](https://nodejs.org/) & other non-browser environments or browser extensions

Features
--------

- RFC4122 UUID version 1, 2, 3, 4.
- MD5, RIPEMD-160.
- SHA-1, SHA2-256, SHA2-512, SHA3-256(Keccak).
- BLAKE, Blue Midnight Wish, CubeHash, Shabal, Skein, etc.
- It has no dependencies. The entire set of modules clocks in at ` 12kb ` minified and gzipped. 

Quick start
-----------

Four quick start options are available:

- [Download the latest release](https://github.com/rainersu/hash/archive/v1.0.0.zip)
- Clone the repo: `git clone https://github.com/rainersu/hash.git`
- Install with [Bower](http://bower.io): `bower install sumi-hash`
- Install with [npm](https://www.npmjs.com): `npm install sumi-hash`

Example use
-----------

Including in a browser:

```html
<script type='text/javascript' src='/path/to/sumi-hash-1.0.0.min.js'></script>
<script type='text/javascript'>
console.log(sumiHash.md5('abs', 'key'));
</script>
```

As a module that works with AMD(e.g., [RequireJS](http://requirejs.org/)):

```JavaScript
define(['/path/to/sumi-hash-1.0.0.min.js'], function(Hash) {
	console.log(Hash.sha3('admin@me.com'));
});
```

Including in a CommonJS environment(e.g., [Node.js](https://nodejs.org/)):

```JavaScript
var Hash = require('/path/to/sumi-hash');
console.log(Hash.uuid3('ns:DNS', 'php.net'));
```

Build from source
-----------------

First, you need to have [Node.js](https://nodejs.org/) and [Grunt](http://gruntjs.com/) installed.

```Shell
$ git clone git@github.com:rainersu/hash.git
$ npm install -g grunt-cli
$ cd hash
$ npm install
$ grunt
```

It provides compiled JS (`sumi-hash.*`), as well as compiled and minified JS (`sumi-hash.min.*`). JS [source maps](https://developers.google.com/chrome-developer-tools/docs/css-preprocessors) (`sumi-hash.*.map`) are available for use with certain browsers' developer tools.

Running demos for testing
-------------------------

```Shell
$ grunt test
```

Build & running documentation locally
-------------------------------------

```Shell
$ grunt help
```

Sorry, the documentation is currently offered only in the Chinese language. Do you have time to help me with some Chinese - English translations?

How to contact me
-----------------

- [rainersu@foxmail.com](mailto:rainersu@foxmail.com)
- [http://cn.linkedin.com/in/rainersu](http://cn.linkedin.com/in/rainersu)
- [http://site.douban.com/185696/](http://site.douban.com/185696/)
- [http://rainersu.github.io](http://rainersu.github.io)
- ``QQ: 2627001536``
