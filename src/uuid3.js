define([
	'./var/out',
	'./md5'
],
function(
	out,
	md5
) {'use strict';

function uuid3 (n, d) {
	return out(n, d, md5, 3);
}

return uuid3;
});