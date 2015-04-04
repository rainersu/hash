define([
	'./var/undefined',
	'./var/hexCase'
],
function(
	undefined,
	hexCase
) {'use strict';

var blake32 = (function () {
	var iv; var g; var r; var block; var constants; var sigma; var circ; var state; var message; var output; var two32;
	two32 = 4 * (1 << 30);
	iv = [
		0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
		0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
	];
	constants = [
		0x243F6A88, 0x85A308D3, 0x13198A2E, 0x03707344, 
		0xA4093822, 0x299F31D0, 0x082EFA98, 0xEC4E6C89, 
		0x452821E6, 0x38D01377, 0xBE5466CF, 0x34E90C6C, 
		0xC0AC29B7, 0xC97C50DD, 0x3F84D5B5, 0xB5470917
	];
	output = function (i) {
		if (i < 0) {
			i += two32;
		}
		return ("00000000" + i.toString(16)).slice(-8);
	};
	/* The spec calls for the sigma values at 2i and 2i + 1 to be passed into 
	 * the g function simultaneously. This implementation uses a byte array to
	 * perform this task.
	 */
	sigma = [
		[16, 50, 84, 118, 152, 186, 220, 254], [174, 132, 249, 109, 193, 32, 123, 53], 
		[139, 12, 37, 223, 234, 99, 23, 73], [151, 19, 205, 235, 98, 165, 4, 143], 
		[9, 117, 66, 250, 30, 203, 134, 211], [194, 166, 176, 56, 212, 87, 239, 145], 
		[92, 241, 222, 164, 112, 54, 41, 184], [189, 231, 28, 147, 5, 79, 104, 162], 
		[246, 158, 59, 128, 44, 125, 65, 90], [42, 72, 103, 81, 191, 233, 195, 13]
	];
	circ = function (a, b, n) {
		var s = state[a] ^ state[b];
		state[a] = (s >>> n) | (s << (32 - n));
	};
	g = function (i, a, b, c, d) {
		var u = block + sigma[r][i] % 16, v = block + (sigma[r][i] >> 4);
		a %= 4;
		b = 4 + b % 4;
		c = 8 + c % 4;
		d = 12 + d % 4;
		state[a] += state[b] + (message[u] ^ constants[v % 16]);
		circ(d, a, 16);
		state[c] += state[d];
		circ(b, c, 12);
		state[a] += state[b] + (message[v] ^ constants[u % 16]);
		circ(d, a, 8);
		state[c] += state[d];
		circ(b, c, 7);
	};
	return function (msg, salt) {
		if (! (salt instanceof Array && salt.length === 4)) {
			salt = [0, 0, 0, 0];
		}
		var pad; var chain; var len; var L; var last_L; var last; var total; var i; 
		chain = iv.slice(0);
		pad = constants.slice(0, 8);
		for (r = 0; r < 4; r += 1) {
			pad[r] ^= salt[r];
		}
		// pre-padding bit length of the string.
		len = msg.length * 16;
		last_L = (len % 512 > 446 || len % 512 === 0) ? 0 : len;
		// padding step: append a 1, then a bunch of 0's until we're at 447 bits,
		// then another 1 (note: 448/16 = 28), then len as a 64-bit integer.
		if (len % 512 === 432) {
			msg += "\u8001";
		} else {
			msg += "\u8000";
			while (msg.length % 32 !== 27) {
				msg += "\u0000";
			}
			msg += "\u0001";
		}
		message = [];
		for (i = 0; i < msg.length; i += 2) {
			message.push(msg.charCodeAt(i) * 65536 + msg.charCodeAt(i + 1));
		}
		message.push(0);
		message.push(len);
		last = message.length - 16;
		total = 0;
		for (block = 0; block < message.length; block += 16) {
			total += 512;
			L = (block === last) ? last_L : Math.min(len, total);
			state = chain.concat(pad);
			state[12] ^= L;
			state[13] ^= L;
			for (r = 0; r < 10; r += 1) {
				for (i = 0; i < 8; i += 1) {
					if (i < 4) {
						g(i, i, i, i, i);
					} else {
						g(i, i, i + 1, i + 2, i + 3);
					}
				}
			}
			for (i = 0; i < 8; i += 1) {
				chain[i] ^= salt[i % 4] ^ state[i] ^ state[i + 8];
			}
		}
		return hexCase(chain.map(output).join(""));
	};
}());

return blake32;
});