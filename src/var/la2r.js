define([
	'./fromCC'
],
function(
	fromCC
) 
{'use strict';

function la2r (i) {
	var o = '', 
		n = 0, 
		l = i.length * 32; 
	for(; n < l; n += 8) {
		o += fromCC((i[n >> 5] >>> (n % 32)) & 0xFF);
	}
	return o;
}

return la2r;

});