define(function () {'use strict';
	
function rol (n, c) {
	return (n << c) | (n >>> (32 - c));
}

return rol;

});
