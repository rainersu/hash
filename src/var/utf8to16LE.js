define([
	'./fromCC'
],
function (
	fromCC
) {'use strict';

function utf8to16LE (i) {
	var o = '',
		n = 0,
		l = i.length,
		x;
	for(; n < l; n++) {
		x = i.charCodeAt(n);
		o+= fromCC(x & 0xFF, (x >>> 8) & 0xFF);
	}
	return o;
}

return utf8to16LE;

});