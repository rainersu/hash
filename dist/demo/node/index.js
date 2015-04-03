
var sumiHash = require('../../sumi-hash.js');

var out = '\r\nMD5 :\r\n\r\n';
var col = {
	'dfd8c10c1b9b58c8bf102225ae3be9eb' : [ '12081977' ],
	'd0763edaa9d9bd2a9516280e9044d885' : [ 'monkey'   ],
	'78e731027d8fd50ed642340b7c9a63b3' : [ 'message'  ],
	'2063c1608d6e0baf80249c42e2be5804' : [ 'value'    ],
	'01433efd5f16327ea4b31144572c67f6' : [ 'value', 'key' ]	
};
var i, n;
var s = Array(15).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.md5.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nRIPEMD-160 :\r\n\r\n';
var col = {
	'8eb208f7e05d987a9b044a8e98c6b087f15a0bfc' : [ 'abc'    ],
	'67fdce738ebfc7372bcd38f03c023b5746724d18' : [ 'abc', 'key' ]	
};
var i, n;
var s = Array(15).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.rmd160.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nSHA-1 :\r\n\r\n';
var col = {
	'a9993e364706816aba3e25717850c26c9cd0d89d' : [ 'abc'    ],
	'4fd0b215276ef12f2b3e4c8ecac2811498b656fc' : [ 'abc', 'key' ]	
};
var i, n;
var s = Array(15).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.sha1.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nSHA-256 :\r\n\r\n';
var col = {
	'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad' : [ 'abc'    ],
	'9c196e32dc0175f86f4b1cb89289d6619de6bee699e4c378e68309ed97a1a6ab' : [ 'abc', 'key' ]	
};
var i, n;
var s = Array(15).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.sha256.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nSHA-256 :\r\n\r\n';
var col = {
	'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f' : 
	[ 'abc'    ],
	'3926a207c8c42b0c41792cbd3e1a1aaaf5f7a25704f62dfc939c4987dd7ce060009c5bb1c2447355b3216f10b537e9afa7b64a4e5391b0d631172d07939e087a' : 
	[ 'abc', 'key' ]	
};
var i, n;
var s = Array(15).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '\r\n// ' + (sumiHash.sha512.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

 