define([
	'./var/undefined',
	'./var/NaN',
	'./var/array',
	'./var/add',
	'./var/rol',
	'./var/utf16to8',
	'./var/utf8to16LE',
	'./var/utf8to16BE',
	'./var/r2e',
	'./var/r2b64',
	'./var/r2hex',
	'./var/r2la',
	'./var/la2r'
],
function(
	undefined,
	NaN,
	array,
	add, 
	rol, 
	utf16to8, 
	utf8to16LE, 
	utf8to16BE, 
	r2e,
	r2b64,
	r2hex,
	r2la,
	la2r
) {'use strict';

function m (q, a, b, x, s, t) {
	return add(rol(add(add(a, q), add(x, t)), s),b);
}
function f (a, b, c, d, x, s, t) {
	return m((b & c) | ((~b) & d), a, b, x, s, t);
}
function g (a, b, c, d, x, s, t) {
	return m((b & d) | (c & (~d)), a, b, x, s, t);
}
function h (a, b, c, d, x, s, t) {
	return m(b ^ c ^ d, a, b, x, s, t);
}
function j (a, b, c, d, x, s, t) {
	return m(c ^ (b | (~d)), a, b, x, s, t);
}
function rstr_md5 (s) {
	return la2r(binl_md5(r2la(s), s.length * 8));
}
function rstr_hmac_md5 (k, d) {
	var b = r2la(k),
		a = array(16), 
		o = array(16),
		h,
		i;
	if(b.length > 16) b = binl_md5(b, k.length * 8);
	for(i = 0; i < 16; i++) {
		a[i] = b[i] ^ 0x36363636;
		o[i] = b[i] ^ 0x5C5C5C5C;
	}
	h = binl_md5(a.concat(r2la(d)), 512 + d.length * 8);
	return la2r(binl_md5(o.concat(h),  512 + 128));
}
function binl_md5 (x, l) {
	var a =  1732584193,
		b = -271733879,
		c = -1732584194,
		d =  271733878,
		u,
		v,
		w,
		y,
		n,
		i;
	x[l >> 5] |= 0x80 << ((l) % 32);
	x[(((l + 64) >>> 9) << 4) + 14] = l;
	for (i = 0, n = x.length; i < n; i += 16) {
		u = a;
		v = b;
		w = c;
		y = d;
		a = f(a, b, c, d, x[i +  0], 7 , -680876936 );
		d = f(d, a, b, c, x[i +  1], 12, -389564586 );
		c = f(c, d, a, b, x[i +  2], 17,  606105819 );
		b = f(b, c, d, a, x[i +  3], 22, -1044525330);
		a = f(a, b, c, d, x[i +  4], 7 , -176418897 );
		d = f(d, a, b, c, x[i +  5], 12,  1200080426);
		c = f(c, d, a, b, x[i +  6], 17, -1473231341);
		b = f(b, c, d, a, x[i +  7], 22, -45705983  );
		a = f(a, b, c, d, x[i +  8], 7 ,  1770035416);
		d = f(d, a, b, c, x[i +  9], 12, -1958414417);
		c = f(c, d, a, b, x[i + 10], 17, -42063     );
		b = f(b, c, d, a, x[i + 11], 22, -1990404162);
		a = f(a, b, c, d, x[i + 12], 7 ,  1804603682);
		d = f(d, a, b, c, x[i + 13], 12, -40341101  );
		c = f(c, d, a, b, x[i + 14], 17, -1502002290);
		b = f(b, c, d, a, x[i + 15], 22,  1236535329);
		a = g(a, b, c, d, x[i +  1], 5 , -165796510 );
		d = g(d, a, b, c, x[i +  6], 9 , -1069501632);
		c = g(c, d, a, b, x[i + 11], 14,  643717713 );
		b = g(b, c, d, a, x[i +  0], 20, -373897302 );
		a = g(a, b, c, d, x[i +  5], 5 , -701558691 );
		d = g(d, a, b, c, x[i + 10], 9 ,  38016083  );
		c = g(c, d, a, b, x[i + 15], 14, -660478335 );
		b = g(b, c, d, a, x[i +  4], 20, -405537848 );
		a = g(a, b, c, d, x[i +  9], 5 ,  568446438 );
		d = g(d, a, b, c, x[i + 14], 9 , -1019803690);
		c = g(c, d, a, b, x[i +  3], 14, -187363961 );
		b = g(b, c, d, a, x[i +  8], 20,  1163531501);
		a = g(a, b, c, d, x[i + 13], 5 , -1444681467);
		d = g(d, a, b, c, x[i +  2], 9 , -51403784  );
		c = g(c, d, a, b, x[i +  7], 14,  1735328473);
		b = g(b, c, d, a, x[i + 12], 20, -1926607734);
		a = h(a, b, c, d, x[i +  5], 4 , -378558    );
		d = h(d, a, b, c, x[i +  8], 11, -2022574463);
		c = h(c, d, a, b, x[i + 11], 16,  1839030562);
		b = h(b, c, d, a, x[i + 14], 23, -35309556  );
		a = h(a, b, c, d, x[i +  1], 4 , -1530992060);
		d = h(d, a, b, c, x[i +  4], 11,  1272893353);
		c = h(c, d, a, b, x[i +  7], 16, -155497632 );
		b = h(b, c, d, a, x[i + 10], 23, -1094730640);
		a = h(a, b, c, d, x[i + 13], 4 ,  681279174 );
		d = h(d, a, b, c, x[i +  0], 11, -358537222 );
		c = h(c, d, a, b, x[i +  3], 16, -722521979 );
		b = h(b, c, d, a, x[i +  6], 23,  76029189  );
		a = h(a, b, c, d, x[i +  9], 4 , -640364487 );
		d = h(d, a, b, c, x[i + 12], 11, -421815835 );
		c = h(c, d, a, b, x[i + 15], 16,  530742520 );
		b = h(b, c, d, a, x[i +  2], 23, -995338651 );
		a = j(a, b, c, d, x[i +  0], 6 , -198630844 );
		d = j(d, a, b, c, x[i +  7], 10,  1126891415);
		c = j(c, d, a, b, x[i + 14], 15, -1416354905);
		b = j(b, c, d, a, x[i +  5], 21, -57434055  );
		a = j(a, b, c, d, x[i + 12], 6 ,  1700485571);
		d = j(d, a, b, c, x[i +  3], 10, -1894986606);
		c = j(c, d, a, b, x[i + 10], 15, -1051523   );
		b = j(b, c, d, a, x[i +  1], 21, -2054922799);
		a = j(a, b, c, d, x[i +  8], 6 ,  1873313359);
		d = j(d, a, b, c, x[i + 15], 10, -30611744  );
		c = j(c, d, a, b, x[i +  6], 15, -1560198380);
		b = j(b, c, d, a, x[i + 13], 21,  1309151649);
		a = j(a, b, c, d, x[i +  4], 6 , -145523070 );
		d = j(d, a, b, c, x[i + 11], 10, -1120210379);
		c = j(c, d, a, b, x[i +  2], 15,  718787259 );
		b = j(b, c, d, a, x[i +  9], 21, -343485551 );
		a = add(a, u);
		b = add(b, v);
		c = add(c, w);
		d = add(d, y);
	}
	return [ a, b, c, d ];
}

function md5 (s, k, x, e) {
	k = k != undefined ? rstr_hmac_md5(utf16to8(k), s) : rstr_md5(s);
	return x > 1 ? (e != undefined ? r2e(k, e) : k) : x > 0 ? r2b64(k) : r2hex(k);
};

return md5;
});