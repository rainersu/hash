define([
	'./undefined',
	'./shell',
	'./array'
],
function(
	undefined,
	shell, 
	array
) {'use strict';

function rng () {
	var b = array(16),
		t = shell.crypto || shell.msCrypto,
		a = shell.Uint8Array,
		i = 0,
		r;
	if (t && t.getRandomValues && a) {
		b = new a(16);
		t.getRandomValues(b);
	}
	else for (; i < 16; i++) {
		if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
		b[i] = r >>> ((i & 0x03) << 3) & 0xff;
	}
	return b;
}
	
return rng;
});