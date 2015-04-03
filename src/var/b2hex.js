define([
	'./hex',
	'./hash'
],
function(
	hex,
	Hash
) {'use strict';

function b2hex (b) {
	var l = b.length * 4,
		h = hex[~~Hash.hexCase],
		s = "",
		i = 0;
	for(; i < l; i++) {
		s+= h.charAt((b[i >>2 ] >> ((3 - i % 4) * 8 + 4)) & 0xF) + h.charAt((b[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
	}
	return s;
}

return b2hex;

});