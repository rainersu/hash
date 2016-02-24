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
	'./ripemd-160',
	'./sha1',
	'./sha2-256',
	'./sha2-512',
	'./sha3-256',
	'./uuid1',
	'./uuid3',
	'./uuid4',
	'./uuid5',
	'./blake32',
	'./bmw',
	'./cubehash',
	'./halfskein',
	'./shabal',
	'./skein',
	'./keccak32'
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
	sha512,
	sha3,
	uuid1,
	uuid3,
	uuid4,
	uuid5,
	blake32,
	bmw,
	cubehash,
	halfskein,
	shabal,
	skein,
	keccak32
) {'use strict';

cp(Hash, {
	md5       : md5,
	rmd160    : rmd160,
	sha1      : sha1,
	sha256    : sha256,
	sha512    : sha512,
	sha3      : sha3,
	uuid1     : uuid1,
	uuid3     : uuid3,
	uuid4     : uuid4,
	uuid5     : uuid5,
	blake32   : blake32,
	bmw       : bmw,
	cubehash  : cubehash,
	halfskein : halfskein,
	shabal    : shabal,
	skein     : skein,
	keccak32  : keccak32,
	keccak    : sha3
});



return Hash;
});