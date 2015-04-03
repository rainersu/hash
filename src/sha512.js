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

var i64h = 
	[
		 0x6a09e667, -205731576,
		-1150833019, -2067093701,
		 0x3c6ef372, -23791573,
		-1521486534,  0x5f1d36f1,
		 0x510e527f, -1377402159,
		-1694144372,  0x2b3e6c1f,
		 0x1f83d9ab, -79577749,
		 0x5be0cd19,  0x137e2179
	],
	i64w = dim(80 * 2, 0),
	sha512_k = int64arr([], [
		 0x428a2f98, -685199838,   0x71374491,  0x23ef65cd,
		-1245643825, -330482897,  -373957723,  -2121671748,
		 0x3956c25b, -213338824,   0x59f111f1, -1241133031,
		-1841331548, -1357295717, -1424204075, -630357736,
		-670586216,  -1560083902,  0x12835b01,  0x45706fbe,
		 0x243185be,  0x4ee4b28c,  0x550c7dc3, -704662302,
		 0x72be5d74, -226784913,  -2132889090,  0x3b1696b1,
		-1680079193,  0x25c71235, -1046744716, -815192428,
		-459576895,  -1628353838, -272742522,   0x384f25e3,
		 0xfc19dc6,  -1953704523,  0x240ca1cc,  0x77ac9c65,
		 0x2de92c6f,  0x592b0275,  0x4a7484aa,  0x6ea6e483,
		 0x5cb0a9dc, -1119749164,  0x76f988da, -2096016459,
		-1740746414, -295247957,  -1473132947,  0x2db43210,
		-1341970488, -1728372417, -1084653625, -1091629340,
		-958395405,   0x3da88fc2, -710438585,  -1828018395,
		 0x6ca6351,  -536640913,   0x14292967,  0xa0e6e70,
		 0x27b70a85,  0x46d22ffc,  0x2e1b2138,  0x5c26c926,
		 0x4d2c6dfc,  0x5ac42aed,  0x53380d13, -1651133473,
		 0x650a7354, -1951439906,  0x766a0abb,  0x3c77b2a8,
		-2117940946,  0x47edaee6, -1838011259,  0x1482353b,
		-1564481375,  0x4cf10364, -1474664885, -1136513023,
		-1035236496, -789014639,  -949202525,   0x654be30,
		-778901479,  -688958952,  -694614492,   0x5565a910,
		-200395387,   0x5771202a,  0x106aa070,  0x32bbd1b8,
		 0x19a4c116, -1194143544,  0x1e376c08,  0x5141ab53,
		 0x2748774c, -544281703,   0x34b0bcb5, -509917016,
		 0x391c0cb3, -976659869,   0x4ed8aa4a, -482243893,
		 0x5b9cca4f,  0x7763e373,  0x682e6ff3, -692930397,
		 0x748f82ee,  0x5defb2fc,  0x78a5636f,  0x43172f60,
		-2067236844, -1578062990, -1933114872,  0x1a6439ec,
		-1866530822,  0x23631e28, -1538233109, -561857047,
		-1090935817, -1295615723, -965641998,  -479046869,
		-903397682,  -366583396,  -779700025,   0x21c0c207,
		-354779690,  -840897762,  -176337025,  -294727304,
		 0x6f067aa,   0x72176fba,  0xa637dc5,  -1563912026,
		 0x113f9804, -1090974290,  0x1b710b35,  0x131c471b,
		 0x28db77f5,  0x23047d84,  0x32caab7b,  0x40c72493,
		 0x3c9ebe0a,  0x15c9bebc,  0x431d67c4, -1676669620,
		 0x4cc5d4be, -885112138,   0x597f299c, -60457430,
		 0x5fcb6fab,  0x3ad6faec,  0x6c44198c,  0x4a475817
	]);

function int64 (h, l) {
	this.h = h;
	this.l = l;
}
function int64arr (d, a) {
	var n = 0,
		l = a.length;
	while (n < l) {
		d.push(new int64(a[n++], a[n++]));
	}
	return d;
}	
function int64add  (dst, x, y) {
	var w0 = (x.l & 0xffff) + (y.l & 0xffff),
		w1 = (x.l >>> 16) + (y.l >>> 16) + (w0 >>> 16),
		w2 = (x.h & 0xffff) + (y.h & 0xffff) + (w1 >>> 16),
		w3 = (x.h >>> 16) + (y.h >>> 16) + (w2 >>> 16);
	dst.l = (w0 & 0xffff) | (w1 << 16);
	dst.h = (w2 & 0xffff) | (w3 << 16);
}
function int64add4 (dst, a, b, c, d) {
	var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff),
		w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (w0 >>> 16),
		w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (w1 >>> 16),
		w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (w2 >>> 16);
	dst.l = (w0 & 0xffff) | (w1 << 16);
	dst.h = (w2 & 0xffff) | (w3 << 16);
}
function int64add5 (dst, a, b, c, d, e) {
	var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff) + (e.l & 0xffff),
		w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (w0 >>> 16),
		w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (e.h & 0xffff) + (w1 >>> 16),
		w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (w2 >>> 16);
	dst.l = (w0 & 0xffff) | (w1 << 16);
	dst.h = (w2 & 0xffff) | (w3 << 16);
}
function int64rrot (dst, x, shift) {
	dst.l = (x.l >>> shift) | (x.h << (32 - shift));
	dst.h = (x.h >>> shift) | (x.l << (32 - shift));
}
function int64revrrot (dst, x, shift) {
    dst.l = (x.h >>> shift) | (x.l << (32 - shift));
    dst.h = (x.l >>> shift) | (x.h << (32 - shift));
}
function int64shr (dst, x, shift) {
    dst.l = (x.l >>> shift) | (x.h << (32 - shift));
    dst.h = (x.h >>> shift);
}
function int64copy (dst, src) {
	dst.h = src.h;
	dst.l = src.l;
}
function binb_sha512 (x, len) {
	var H   = int64arr([], i64h),
		T1  = new int64(0, 0),
		T2  = new int64(0, 0),
		a   = new int64(0, 0),
		b   = new int64(0, 0),
		c   = new int64(0, 0),
		d   = new int64(0, 0),
		e   = new int64(0, 0),
		f   = new int64(0, 0),
		g   = new int64(0, 0),
		h   = new int64(0, 0),
		s0  = new int64(0, 0),
		s1  = new int64(0, 0),
		Ch  = new int64(0, 0),
		Maj = new int64(0, 0),
		r1  = new int64(0, 0),
		r2  = new int64(0, 0),
		r3  = new int64(0, 0),
		j, 
		i = 0,
		l,
		w,
		W = int64arr([], i64w),
		z = array(16);
	x[len >> 5]|= 0x80 << (24 - (len & 0x1f));
	x[((len + 128 >> 10)<< 5) + 31] = len;
	for(l = x.length; i < l; i+= 32) {
		int64copy(a, H[0]);
		int64copy(b, H[1]);
		int64copy(c, H[2]);
		int64copy(d, H[3]);
		int64copy(e, H[4]);
		int64copy(f, H[5]);
		int64copy(g, H[6]);
		int64copy(h, H[7]);
		for(j =  0; j < 16; j++) {
			w = W[j];
			w.h = x[i + 2 * j];
			w.l = x[i + 2 * j + 1];
		}
		for(j = 16; j < 80; j++) {
			int64rrot   (r1, W[j -  2], 19);
			int64revrrot(r2, W[j -  2], 29);
			int64shr    (r3, W[j -  2],  6);
			s1.l = r1.l ^ r2.l ^ r3.l;
			s1.h = r1.h ^ r2.h ^ r3.h;
			int64rrot   (r1, W[j - 15],  1);
			int64rrot   (r2, W[j - 15],  8);
			int64shr    (r3, W[j - 15],  7);
			s0.l = r1.l ^ r2.l ^ r3.l;
			s0.h = r1.h ^ r2.h ^ r3.h;
			int64add4(W[j], s1, W[j-7], s0, W[j-16]);
		}
		for(j =  0; j < 80; j++) {
			Ch.l = (e.l & f.l) ^ (~e.l & g.l);
			Ch.h = (e.h & f.h) ^ (~e.h & g.h);
			int64rrot(r1, e, 14);
			int64rrot(r2, e, 18);
			int64revrrot(r3, e, 9);
			s1.l = r1.l ^ r2.l ^ r3.l;
			s1.h = r1.h ^ r2.h ^ r3.h;
			int64rrot(r1, a, 28);
			int64revrrot(r2, a, 2);
			int64revrrot(r3, a, 7);
			s0.l = r1.l ^ r2.l ^ r3.l;
			s0.h = r1.h ^ r2.h ^ r3.h;
			Maj.l = (a.l & b.l) ^ (a.l & c.l) ^ (b.l & c.l);
			Maj.h = (a.h & b.h) ^ (a.h & c.h) ^ (b.h & c.h);
			int64add5(T1, h, s1, Ch, sha512_k[j], W[j]);
			int64add(T2, s0, Maj);
			int64copy(h, g);
			int64copy(g, f);
			int64copy(f, e);
			int64add(e, d, T1);
			int64copy(d, c);
			int64copy(c, b);
			int64copy(b, a);
			int64add(a, T1, T2);
		}
		int64add(H[0], H[0], a);
		int64add(H[1], H[1], b);
		int64add(H[2], H[2], c);
		int64add(H[3], H[3], d);
		int64add(H[4], H[4], e);
		int64add(H[5], H[5], f);
		int64add(H[6], H[6], g);
		int64add(H[7], H[7], h);
	}
	for(i = 0; i < 8; i++) {
		j = 2 * i;
		z[j] = H[i].h;
		z[j + 1] = H[i].l;
	}
	return z;
}
function rstr_sha512 (s) {
	return binb2r(binb_sha512(r2binb(s), s.length * 8));
}
function rstr_hmac_sha512 (k, a) {
	var b = r2binb(k),
		p = array(32),
		o = array(32),
		i = 0;
	if(b.length > 32) {
		b = binb_sha512(b, k.length * 8);
	}
	for(; i < 32; i++) {
		p[i] = b[i] ^ 0x36363636;
		o[i] = b[i] ^ 0x5C5C5C5C;
	}
	return binb2r(binb_sha512(o.concat(binb_sha512(p.concat(r2binb(a)), 1024 + a.length * 8)), 1024 + 512));
}

function sha512 (s, k, x, e) {
	k = k != undefined ? rstr_hmac_sha512(utf16to8(k), s) : rstr_sha512(s);
	return x > 1 ? (e != undefined ? r2e(k, e) : k) : x > 0 ? r2b64(k) : r2hex(k);
}

return sha512;
});