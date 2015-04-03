define([
	'./hexCase'
],
function(
	hexCase
) {'use strict';

function unparse (f) {
	var b = [ ],
		i = 256;
	for (; i--;) {
		b[i] = (i + 0x100).toString(16).substr(1);
	}
	i = 0;
	return hexCase(
		b[f[i++]] + b[f[i++]] + b[f[i++]] + b[f[i++]] + '-' +
		b[f[i++]] + b[f[i++]] + '-' +
		b[f[i++]] + b[f[i++]] + '-' +
		b[f[i++]] + b[f[i++]] + '-' +
		b[f[i++]] + b[f[i++]] + b[f[i++]] + b[f[i++]] + b[f[i++]] + b[f[i++]]
	);
}

return unparse;

});