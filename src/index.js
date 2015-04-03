var requirejs = require('requirejs');
requirejs.config({
	nodeRequire : require
});
requirejs([
	'./var/undefined',
	'./var/shell',
	'./var/hash',
	'./var/cp',
	'./md5',
	'./rmd160',
	'./sha1',
	'./sha256',
	'./sha512'
],
function(
	undefined,
	shell,
	Hash,
	cp,
	md5,
	rmd160,
	sha1,
	sha256,
	sha512
) {'use strict';

shell.Hash = shell.Hash || Hash;
return cp(Hash, {
	md5    : md5,
	rmd160 : rmd160,
	sha1   : sha1,
	sha256 : sha256,
	sha512 : sha512
});

});