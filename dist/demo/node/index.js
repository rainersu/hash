
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

out = '\r\nUUID ver.1 :\r\n\r\n';
var l = 3;
for(; l--;) out+= sumiHash.uuid1() + '\r\n';
console.log(out);

out = '\r\nUUID ver.3 :\r\n\r\n';
var col = {
	'11a38b9a-b3da-360f-9353-a5a725514269' : 
	[ 'ns:DNS', 'php.net' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.uuid3.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nUUID ver.4 :\r\n\r\n';
var l = 3;
for(; l--;) out+= sumiHash.uuid4() + '\r\n';
console.log(out);

out = '\r\nUUID ver.5 :\r\n\r\n';
var col = {
	'c4a760a8-dbcf-5254-a0d9-6a4474bd1b62' : 
	[ 'ns:DNS', 'php.net' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.uuid5.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nSHA3-256 :\r\n\r\n';
var col = {
	'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470' : [ '' ],
	'01b7309a9ccaf2735408e880b54fbf9ef2ba42665aed183789711b3f8c496bc0' : [ 'abc' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.sha3.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);
console.log(sumiHash.sha3('苏昱'));
/* 
 *     keccak("");
 *         ""
 *     keccak("");
 *         ""
 *     keccak("\uC5B3\u4BE7\u9369\u253C\u1033\u566C\u4C3B\u02A2\uF238\uE6B6\uE875\u1E68\uA334\u8989\u8547\uADBD\u96E5\uD452\u3DA7\uA580\u5BC8\u54D4\u1EFD\uFD9F\u1CAD\u1538\u03F5\u9E8E\u32F4\uC5AA\uC4C3\u84FE\uC30C\uCF70\u5886\u600A\u7711\uBE8B\uF5DA\uA511\u561B\uA2D1\u68EB\u4A39\u99A2\u6DE2\uADA9\uA2A6\u9BF3\uAF9F\uFBF7\u57A4\u9B68\u1A9C\u7B57\u1E2A\u5F50\u75DF\uA0C7\u4BA6\uF81D\u3A1B\u6035\uBF01\uF40D\u2AE0\uC51F\u659F\u9D1C\u5E58\u22C6\uB24B\uC679\uBABE\u6629\u88E8\u682D\u6037\uB981\u4687\u7A8E\u1EED\u0EF9\u09BD\uE80A\u7925\uDC5C\uB4A1\u9AF0\u9C97\uFC8D\uA421\u8A8D\uCD53\u26BB\uDBC4\u7F54\u6EC0\u2FFE\u5098\uD2ED\u5A68\u6146\u49CB\uF111\uD465\u3EB6\u5BF2\uD087\u6DA9\uFF3D\uB06A\u8975\uAA99\u14D2\u7BD0\uF1D4\uA633\u4F73\u44DE\uE45F\u7174\u691B\u8FA9\u2B7E");
 *         "c6d86cc4ccef3bb70bf7bfddec6a9a04a0dd0a68fe1bf51c14648cf506a03e98"
 */