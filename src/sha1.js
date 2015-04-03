define([
	'./var/undefined',
	'./var/NaN',
	'./var/array',
	'./var/add',
	'./var/fromCC',
	'./var/rol',
	'./var/b64',
	'./var/b2hex'
],
function(
	undefined,
	NaN,
	array,
	add,
	fromCC, 
	rol,
	b64,
	b2hex
) {'use strict';

var b64pad  = '',     /* 指定 base-64 编码格式填充字符 */
	chrsz   = 8;      /* 为 8 则认定为 ASCII 字符集。为 16 则认定为 Unicode 字符集 */

function binb2str (b) {
	var c = chrsz,
		s = "",
		m = (1 << c) - 1,
		i = 0,
		l = b.length * 32;
	for(; i < l; i += c) {
		s+= fromCC((b[i >> 5] >>> (32 - c - i % 32)) & m);
	}
	return s;
}
function str2binb (s) {
	var b = [],
		c = chrsz,
		m = (1 << c) - 1,
		l = s.length * c,
		i = 0;
	for(; i < l; i += c) {
		b[i >> 5]|= (s.charCodeAt(i / c) & m) << (32 - c - i % 32);
	}
	return b;
}
function binb2b64 (b) {
	var l = b.length,
		x = l *  4,
		y = l * 32,
		s = '',
		i = 0,
		j,
		t;
	for(; i < x; i+= 3) {
		t = (((b[i >> 2]     >> 8 * (3 -  i % 4)) & 0xFF)          << 16) | 
			(((b[i + 1 >> 2] >> 8 * (3 - (i + 1)  %    4)) & 0xFF) <<  8) |
			(( b[i + 2 >> 2] >> 8 * (3 - (i + 2)  %    4)) & 0xFF);
		for(j = 0; j < 4; j++) {
			s+= i * 8 + j * 6 > y ? b64pad : b64.charAt((t >> 6 * (3 - j)) & 0x3F);
		}
	}
	return s;
}
function sha1_ft (t, b, c, d) {
	return t < 20 ? (b & c) | ((~b) & d) :
		   t < 40 ?  b ^ c ^ d :
		   t < 60 ? (b & c) | (b & d) | (c & d) : b ^ c ^ d;
}
function sha1_kt (t) {
	return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
}
function core_sha1 (x, len) {
	var w = array(80),
		a =  1732584193,
		b = -271733879,
		c = -1732584194,
		d =  271733878,
		e = -1009589776,
		l = len,
		i = 0,
		j,
		t,
		olda,
		oldb,
		oldc,
		oldd,
		olde;
	x[l >> 5]|= 0x80 << (24 - l % 32);
	x[((l + 64 >> 9) << 4) + 15]  = l;
	for(; i < x.length; i+= 16) {
		olda = a;
		oldb = b;
		oldc = c;
		oldd = d;
		olde = e;
		for(j = 0; j < 80; j++) {
			w[j] = j < 16 ? x[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
			t = add(add(rol(a, 5), sha1_ft(j, b, c, d)), add(add(e, w[j]), sha1_kt(j)));
			e = d;
			d = c;
			c = rol(b, 30);
			b = a;
			a = t;
		}
		a = add(a, olda);
		b = add(b, oldb);
		c = add(c, oldc);
		d = add(d, oldd);
		e = add(e, olde);
	}
	return [ a, b, c, d, e ];
}
function core_hmac_sha1 (k, d) {
	var b = str2binb(k),
		c = chrsz,
		f = core_sha1,
		p = [], 
		o = [],
		i = 0,
		s;
	if (b.length > 16) {
		b = f(b, k.length * c);
	}
	for(; i < 16; i++) {
		s = b[i];
		p[i] = s ^ 0x36363636;
		o[i] = s ^ 0x5C5C5C5C;
	}
	return f(o.concat(f(p.concat(str2binb(d)), 512 + d.length * c)), 512 + 160);
}

function sha1 (s, k, x) {
	k = k != undefined ? core_hmac_sha1(k, s) : core_sha1(str2binb(s), s.length * chrsz);
	return (x > 1 ? binb2str : x > 0 ? binb2b64 : b2hex)(k);
}

return sha1;
});