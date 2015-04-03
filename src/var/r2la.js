define([
	'./dim'
],
function(
	dim
) {'use strict';

function r2la (i) {
	var l = i.length,
		o = dim(l >> 2, 0),
		n = 0;
	l*= 8;
	for(; n < l; n += 8) {
		o[n >> 5] |= (i.charCodeAt(n / 8) & 0xFF) << (n % 32);
	}
	return o;
}

return r2la;

});