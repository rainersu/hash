define([
	'./undefined'
],
function(
	undefined
) {'use strict';

var undef = undefined + '';
var shell = typeof window !== undef ? window : typeof global !== undef ? global : this || 1;

return shell;

});