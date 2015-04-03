define([
	'./array'
],
function(
	array
) {'use strict';

function dim (l, i) {
	l = l >>> 0;
	if (arguments.length < 2) i = '';
	for(var r = array(l); l--;) {
		r[l] = i;
	}
	return r;
}

return dim;

});