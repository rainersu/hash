define([
	'./var/undefined',
	'./var/rng',
	'./var/unparse'
],
function(
	undefined,
	rng, 
	unparse
) {'use strict';

function uuid4 (m, g) {
	var r = m || (g || rng)();
	r[6] = (r[6] & 0x0f) | 0x40;
	r[8] = (r[8] & 0x3f) | 0x80;
	return unparse(r);
}

return uuid4;
});