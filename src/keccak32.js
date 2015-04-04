define([
	'./var/undefined',
	'./var/hexCase'
],
function(
	undefined,
	hexCase
) {'use strict';

var keccak32 = (function () {
	var permute, RC, r, circ, hex, output_fn;
	permute = [0, 10, 20, 5, 15, 16, 1, 11, 21, 6, 7, 17, 2, 12, 22, 23, 8, 18, 3, 13, 14, 24, 9, 19, 4];
	RC = "1,8082,808a,80008000,808b,80000001,80008081,8009,8a,88,80008009,8000000a,8000808b,8b,8089,8003,8002,80,800a,8000000a,80008081,8080"
		.split(",").map(function (i) { 
			return parseInt(i, 16); 
		});
	r = [0, 1, 30, 28, 27, 4, 12, 6, 23, 20, 3, 10, 11, 25, 7, 9, 13, 15, 21, 8, 18, 2, 29, 24, 14];
	circ = function (s, n) {
		return (s << n) | (s >>> (32 - n));
	};
	hex = function (n) {
		return ("00" + n.toString(16)).slice(-2);
	};
	output_fn = function (n) {
		return hex(n & 255) + hex(n >>> 8) + hex(n >>> 16) + hex(n >>> 24);
	};
	return function (m) {
		var i, b, k, x, y, C, D, round, next, state;
		state = [];
		for (i = 0; i < 25; i += 1) {
			state[i] = 0;
		}
		C = [];
		D = [];
		next = [];
		if (m.length % 16 === 15) {
			m+="\u8001";
		} else {
			m += "\x01";
			while (m.length % 16 !== 15) {
				m += "\0";
			}
			m+="\u8000";
		}
		for (b = 0; b < m.length; b += 16) {
			for (k = 0; k < 16; k += 2) {
				state[k / 2] ^= m.charCodeAt(b + k) + m.charCodeAt(b + k + 1) * 65536;
			}
			for (round = 0; round < 22; round += 1) {
				for (x = 0; x < 5; x += 1) {
					C[x] = state[x] ^ state[x + 5] ^ state[x + 10] ^ state[x + 15] ^ state[x + 20]; 
				}
				for (x = 0; x < 5; x += 1) {
					D[x] = C[(x + 4) % 5] ^ circ(C[(x + 1) % 5], 1);
				}
				for (i = 0; i < 25; i += 1) {
					next[permute[i]] = circ(state[i] ^ D[i % 5], r[i]);
				}
				for (x = 0; x < 5; x += 1) {
					for (y = 0; y < 25; y += 5) {
						state[y + x] = next[y + x] ^ ((~ next[y + (x + 1) % 5]) & (next[y + (x + 2) % 5]));
					}
				}
				state[0] ^= RC[round];
			}
		}
		return hexCase(state.slice(0, 8).map(output_fn).join(""));
	};
}());

return keccak32;
});