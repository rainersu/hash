define([
	'./var/out',
	'./sha1'
],
function(
	out,
	sha1
) {'use strict';

function uuid5 (n, d) {
	return out(n, d, sha1, 5);
}

return uuid5;
});