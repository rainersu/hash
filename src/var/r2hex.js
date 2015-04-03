define([
	'./hex',
	'./hash'
],
function(
	hex,
	Hash
) {'use strict';

function r2hex (t) {
	var l = t.length,
		h = hex[~~Hash.hexCase],
		o = '',
		x,
		i = 0;
	for(; i < l; i++) {
		x = t.charCodeAt(i);
		o+= h.charAt((x >>> 4) & 0x0F) + h.charAt(x & 0x0F);
	}
	return o;
}

return r2hex;

});