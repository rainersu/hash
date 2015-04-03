define([
	'./hash'
],
function(
	Hash
) {'use strict';

function hexCase (s) {
	return Hash.hexCase ? s.toUpperCase() : s.toLowerCase();
}

return hexCase;
});