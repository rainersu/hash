define([
	'./var/undefined',
	'./var/rng',
	'./var/unparse'
],
function(
	undefined,
	rng, 
	unparse
) {'use strict';
	
function uuid1 (o, c, m, n) {
	var s = rng(),
		e = [ s[0] | 0x01, s[1], s[2], s[3], s[4], s[5]],
		k = ( s[6] << 8 |  s[7] ) & 0x3fff,
		x = 0, 
		y = 0,
		i = 0,
		z = 6,
		b = [],
		t,
		h,
		d;
	o = o || e;
	c = c != undefined ? c : k;
	m = m != undefined ? m : new Date().getTime();
	n = n != undefined ? n : y + 1;
	d = (m - x) + (n - y) / 10000;	
	if (d < 0 && c == undefined) {
		c = c + 1 & 0x3fff;
	}
	if ((d < 0 || m > x) && n == undefined) {
		n = 0;
	}
	if (n >= 10000) throw new Error();
	x = m;
	y = n;
	k = c;
	m+= 12219292800000;
	t = ((m & 0xfffffff) * 10000 + n) % 0x100000000;
	b[i++] = t >>> 24 & 0xff;
	b[i++] = t >>> 16 & 0xff;
	b[i++] = t >>> 8 & 0xff;
	b[i++] = t & 0xff;
	h = (m / 0x100000000 * 10000) & 0xfffffff;
	b[i++] = h >>> 8 & 0xff;
	b[i++] = h & 0xff;
	b[i++] = h >>> 24 & 0xf | 0x10;
	b[i++] = h >>> 16 & 0xff;
	b[i++] = c >>> 8 | 0x80;
	b[i++] = c & 0xff;
	for(; z--;) {
		b[i + z] = o[z];
	}
	return unparse(b);
}

return uuid1;
});