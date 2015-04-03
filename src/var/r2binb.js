define([
	'./dim'
],
function(
	dim
) {'use strict';

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

return r2binb;

});