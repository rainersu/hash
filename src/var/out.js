define([
	'./undefined',
	'./fromCC',
	'./array',
	'./dim',
	'./ns',
	'./hexCase'
],
function(
	undefined,
	fromCC,
	array,
	dim,
	ns,
	hexCase
) {'use strict';

function uA (s, n, e, b, x) {
	for (var i = n; i <= e; i += 2) b[x++] = parseInt(s.substr(i, 2), 16);
}
function uH (b, n, e, s, x) {
	for (var i; n <= e; n++) {
		i = b[n].toString(16);
		s[x++] = '00'.slice(i.length) + i;
	}
	return s;
}

function out (n, d, z, r) {
	n = ns[n] || n;
	var i = 16,
		u = dim(16, 0x00),
		t = '';
    uA(n,  0,  7, u,  0);
    uA(n,  9, 12, u,  4);
    uA(n, 14, 17, u,  6);
    uA(n, 19, 22, u,  8);
    uA(n, 24, 35, u, 10);
	for(; i--;) t = fromCC(u[i]) + t;
	t+= d;
	n = z(t, undefined, 2);
	for(i = 16; i--;) u[i] = n.charCodeAt(i);
	u[6] &= 0x0F;
	u[6] |= (r << 4); 
	u[8] &= 0x3F;
	u[8] |= (0x02 << 6);
	n = array(32);
	uH(u,  0,  3, n,  0);
	n[ 8] = "-";
	uH(u,  4,  5, n,  9);
	n[13] = "-";
	uH(u,  6,  7, n, 14);
	n[18] = "-";
	uH(u,  8,  9, n, 19);
	n[23] = "-";
	uH(u, 10, 15, n, 24);
	return hexCase(n.join(''));
}

return out;
});