define([
	'./var/undefined',
	'./var/NaN',
	'./var/array',
	'./var/add',
	'./var/dim',
	'./var/fromCC',
	'./var/utf16to8',
	'./var/utf8to16LE',
	'./var/utf8to16BE',
	'./var/r2e',
	'./var/r2b64',
	'./var/r2hex',
	'./var/r2binb',
	'./var/binb2r'
],
function(
	undefined,
	NaN,
	array,
	add,	
	dim,
	fromCC, 
	utf16to8,
	utf8to16LE,
	utf8to16BE,
	r2e,
	r2b64,
	r2hex,
	r2binb,
	binb2r
) {'use strict';

var sha256_K = [
	 1116352408,  1899447441, -1245643825, -373957723,   961987163,   1508970993,
	-1841331548, -1424204075, -670586216,   310598401,   607225278,   1426881987,
	 1925078388, -2132889090, -1680079193, -1046744716, -459576895,  -272742522,
	 264347078,   604807628,   770255983,   1249150122,  1555081692,  1996064986,
	-1740746414, -1473132947, -1341970488, -1084653625, -958395405,  -710438585,
	 113926993,   338241895,   666307205,   773529912,   1294757372,  1396182291,
	 1695183700,  1986661051, -2117940946, -1838011259, -1564481375, -1474664885,
	-1035236496, -949202525,  -778901479,  -694614492,  -200395387,   275423344,
	 430227734,   506948616,   659060556,   883997877,   958139571,   1322822218,
	 1537002063,  1747873779,  1955562222,  2024104815, -2067236844, -1933114872,
	-1866530822, -1538233109, -1090935817, -965641998
];

function r2binb (input) {
	var t = input,
		l = t.length,
		o = dim(l >> 2, 0),
		i = 0;
	for(l*= 8; i < l; i+= 8) {
		o[i >> 5]|= (t.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
	}
	return o;
}
function r2binb (t) {
	var l = t.length,
		o = dim(l >> 2, 0),
		i = 0;
	l*= 8;
	for(; i < l; i+= 8) {
		o[i >> 5] |= (t.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
	}
	return o;
}
function binb2r (input) {
	var t = input,
		l = t.length * 32,
		o = '',
		i = 0;
	for(; i < l; i+= 8) {
		o+= fromCC((t[i >> 5] >>> (24 - i % 32)) & 0xFF);
	}
	return o;
}
function binb2r (t) {
	var l = t.length * 32,
		o = '',
		i = 0;
	for(; i < l; i+= 8) {
		o+= fromCC((t[i >> 5] >>> (24 - i % 32)) & 0xFF);
	}
	return o;
}

function sha256_S (X, n) {
	return ( X >>> n ) | (X << (32 - n));
}
function sha256_R (X, n) {
	return ( X >>> n );
}
function sha256_Ch (x, y, z) {
	return ((x & y) ^ ((~x) & z));
}
function sha256_Maj (x, y, z) {
	return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0256 (x) {
	return (sha256_S(x, 2) ^ sha256_S(x, 13) ^ sha256_S(x, 22));
}
function sha256_Sigma1256 (x) {
	return (sha256_S(x, 6) ^ sha256_S(x, 11) ^ sha256_S(x, 25));
}
function sha256_Gamma0256 (x) {
	return (sha256_S(x, 7) ^ sha256_S(x, 18) ^ sha256_R(x, 3));
}
function sha256_Gamma1256 (x) {
	return (sha256_S(x, 17) ^ sha256_S(x, 19) ^ sha256_R(x, 10));
}
function sha256_Sigma0512 (x) {
	return (sha256_S(x, 28) ^ sha256_S(x, 34) ^ sha256_S(x, 39));
}
function sha256_Sigma1512 (x) {
	return (sha256_S(x, 14) ^ sha256_S(x, 18) ^ sha256_S(x, 41));
}
function sha256_Gamma0512 (x) {
	return (sha256_S(x, 1)  ^ sha256_S(x, 8) ^ sha256_R(x, 7));
}
function sha256_Gamma1512 (x) {
	return (sha256_S(x, 19) ^ sha256_S(x, 61) ^ sha256_R(x, 6));
}
function binb_sha256 (m, l) {
	var H = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225],
		W = array(64),
		a, 
		b, 
		c, 
		d, 
		e, 
		f, 
		g, 
		h,
		i = 0,  
		j,
		x,
		T1, 
		T2;
	m[l >> 5]|= 0x80 << (24 - l % 32);
	m[((l + 64 >> 9) << 4) + 15]  = l;
	for(x =m.length; i < x; i+= 16) {
		a = H[0];
		b = H[1];
		c = H[2];
		d = H[3];
		e = H[4];
		f = H[5];
		g = H[6];
		h = H[7];
		for(j = 0; j < 64; j++) {
			W[j] = j < 16 ? m[j + i] : add(add(add(sha256_Gamma1256(W[j - 2]), W[j - 7]), sha256_Gamma0256(W[j - 15])), W[j - 16]);
			T1 = add(add(add(add(h, sha256_Sigma1256(e)), sha256_Ch(e, f, g)), sha256_K[j]), W[j]);
			T2 = add(sha256_Sigma0256(a), sha256_Maj(a, b, c));
			h = g;
			g = f;
			f = e;
			e = add( d, T1);
			d = c;
			c = b;
			b = a;
			a = add(T1, T2);
		}
		H[0] = add(a, H[0]);
		H[1] = add(b, H[1]);
		H[2] = add(c, H[2]);
		H[3] = add(d, H[3]);
		H[4] = add(e, H[4]);
		H[5] = add(f, H[5]);
		H[6] = add(g, H[6]);
		H[7] = add(h, H[7]);
	}
	return H;
}
function rstr_sha256 (s) {
	return binb2r(binb_sha256(r2binb(s), s.length * 8));
}
function rstr_hmac_sha256 (k, a) {
	var b = r2binb(k),
		p = array(16),
		o = array(16),
		i = 0;
	if (b.length > 16) {
		b = binb_sha256(b, k.length * 8);
	}
	for(; i < 16; i++) {
		k = b[i];
		p[i] = k ^ 0x36363636;
		o[i] = k ^ 0x5C5C5C5C;
	}
	return binb2r(binb_sha256(o.concat(binb_sha256(p.concat(r2binb(a)), 512 + a.length * 8)), 512 + 256));
}

function sha256 (s, k, x, e) {
	k = k != undefined ? rstr_hmac_sha256(utf16to8(k), s) : rstr_sha256(s);
	return x > 1 ? (e != undefined ? r2e(k, e) : k) : x > 0 ? r2b64(k) : r2hex(k);
}

return sha256;
});