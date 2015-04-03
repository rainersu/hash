define([
	'./array',
	'./ceil',
	'./log',
	'./floor'
],
function (
	array,
	ceil,
	log,
	floor
) {'use strict';

function r2e (t, e) {
	var l = t.length,
		d = e.length, 
		v = array(ceil(l / 2)),
		f = ceil(l * 8 / (log(d) / log(2))),
		r = array(f),		
		i = 0, 
		j = v.length, 
		o = '',
		q, 
		x, 
		u;
	for(; i < j; i++) {
		v[i] = (t.charCodeAt(i * 2) << 8) | t.charCodeAt(i * 2 + 1);
	}
	for(j = 0; j < f; j++) {
		u = [];
		x = 0;
		for(i = 0; i < v.length; i++) {
			x = (x << 16) + v[i];
			q = floor(x / d);
			x-= q * d;
			if(u.length > 0 || q > 0) u[u.length] = q;
		}
		r[j] = x;
		v = u;
	}
	for(i = r.length - 1; i >= 0; i--) {
		o+= e.charAt(r[i]);
	}
	return o;
}

return r2e;

});