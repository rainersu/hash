define([
	'./b64'
],
function(
	b64
) {'use strict';

function r2b64 (u, b) {
	b = b || '';
	var l = u.length,
		x = l * 8,
		o = '',
		i = 0,
		j,
		t;
	for(; i < l; i+= 3) {
		t = (u.charCodeAt(i) << 16) | (i + 1 < l ? u.charCodeAt(i + 1) << 8 : 0) | (i + 2 < l ? u.charCodeAt(i + 2) : 0);
		for(j = 0; j < 4; j++) {
			o+= i * 8 + j * 6 > x ? b : b64.charAt((t >>> 6 * (3 - j)) & 0x3F);
		}
	}
	return o;
}

return r2b64;

});