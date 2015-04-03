define([
	'./fromCC'
],
function(
	fromCC
) {'use strict';

function binb2r (t) {
	var l = t.length * 32,
		o = '',
		i = 0;
	for(; i < l; i+= 8) {
		o+= fromCC((t[i >> 5] >>> (24 - i % 32)) & 0xFF);
	}
	return o;
}

return binb2r;

});