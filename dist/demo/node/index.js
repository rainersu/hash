
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

out = '\r\nblake32 :\r\n\r\n';
var col = {
	'73be7e1e0a7d0a2f0035edae62d4412ec43c0308145b5046849a53756bcda44b' : [ '' ],
	'09b28c529f760838212d1c0935b772e4c0e2db0e21638d1c66233221ada4957d' : [ 'abc' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.blake32.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nbmw :\r\n\r\n';
var col = {
	'82cac4bf6f4c2b41fbcc0e0984e9d8b76d7662f8e1789cdfbd85682acc55577a' : [ '' ],
	'3a3c61cbd8093169b87dcd11ff3584ba45850b42acf2699fb23d92ca259cc3e6' : [ 'abc' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.bmw.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\ncubehash :\r\n\r\n';
var col = {
	'44c6de3ac6c73c391bf0906cb7482600ec06b216c7c54a2a8688a6a42676577d' : [ '' ],
	'89fc985e6a0031cb9bd5475044f111914617e58e640adad350ac718580bb9854' : [ 'abc' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.cubehash.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nhalfskein :\r\n\r\n';
var col = {
	'9bce0ce2a5ad0cdbcbf10fbc1cc00ed91a619a6a84ea15f109c6eb38891662ab' : [ '' ],
	'55a64d706859cb4dcaa688812a7a84229664e7fc8b3cc6a767d2964e435858a7' : [ 'abc' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.halfskein.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nshabal :\r\n\r\n';
var col = {
	'aec750d11feee9f16271922fbaf5a9be142f62019ef8d720f858940070889014' : [ '' ],
	'f4b8cdf199ab24366ea87d30702280201d88977227d16bde11b87f4405e66cec' : [ 'abc' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.shabal.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nskein :\r\n\r\n';
var col = {
	'bc5b4c50925519c290cc634277ae3d6257212395cba733bbad37a4af0fa06af41fca7903d06564fea7a2d3730dbdb80c1f85562dfcc070334ea4d1d9e72cba7a' : 
	[ '' ],
	'1c0bd9e7f0189fc05f4f3972e221036c8bbee97813fc9aa3f834fb092248fd4ab71fb3549213594f6dc93c4ecae0e1d83aee5a496897c5bac27e32d17c11cbd7' : 
	[ 'abc' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.skein.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);

out = '\r\nkeccak32 :\r\n\r\n';
var col = {
	'2507dc4976767add735f22c1831fbf323cb9f94755c289a680b327adff881fcd' : [ '' ],
	'8991b580f683473bc8f000389a06188ba865f8b9a8b3c7235fd797a898444f44' : [ 'abc' ]	
};
var i, n;
var s = Array(18).join(' ');
for(i in col) if (col.hasOwnProperty(i)) {
	n = col[i].join(' , ');
	out+= n + s.slice(n.length) + ' === ' + i + '   // ' + (sumiHash.keccak32.apply(null, col[i]) === i) + '\r\n';
}
console.log(out);
