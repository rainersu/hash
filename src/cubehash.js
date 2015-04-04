define([
	'./var/undefined',
	'./var/hexCase'
],
function(
	undefined,
	hexCase
) {'use strict';

var cubehash = (function () {
	var state, round, input, initial_state, out_length, tmp, i, j, r, plus_rotate, swap_xor_swap, hex, output_fn;
	out_length = 256;
	state = [
		out_length / 8, 32, 16, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0
	];
	
	plus_rotate = function (r, s) {
		for (i = 0; i < 16; i += 1) {
			state[16 + i] += state[i];
			state[i] = (state[i] << r) ^ (state[i] >>> s);
		}
	};

		// swap, xor, and swap steps.
	swap_xor_swap = function (mask1, mask2) {
		for (i = 0; i < 16; i += 1) {
			if (i & mask1) {
				j = i ^ mask1;
				tmp = state[i] ^ state[j + 16];
				state[i] = state[j] ^ state[i + 16];
				state[j] = tmp;
			}
		}
		for (i = 16; i < 32; i += 1) {
			if (i & mask2) {
				j = i ^ mask2;
				tmp = state[i];
				state[i] = state[j];
				state[j] = tmp;
			}
		}
	};
	round = function (n) {
		n *= 16;
		for (r = 0; r < n; r += 1) {
			plus_rotate(7, 25);
			swap_xor_swap(8, 2);
			plus_rotate(11, 21);
			swap_xor_swap(4, 1);
		}
	};
	// we initialize the state and save it.
	round(10);
	initial_state = state.slice(0);
	
	// output formatting function, giving the little-endian hex display of a number.
	hex = function (n) {
		return ("00" + n.toString(16)).slice(-2);
	};
	output_fn = function (n) {
		return hex(n & 255) + hex(n >>> 8) + hex(n >>> 16) + hex(n >>> 24);
	};
	
	return function (str) {
		var block, i;
		state = initial_state.slice(0);
		str += "\u0080";
		while (str.length % 16 > 0) {
			str += "\u0000";
		}
		input = [];
		for (i = 0; i < str.length; i += 2) {
			input.push(str.charCodeAt(i) + str.charCodeAt(i + 1) * 0x10000);
		}
		for (block = 0; block < input.length; block += 8) {
			for (i = 0; i < 8; i += 1) {
				state[i] ^= input[block + i];
			}
			round(1);
		}
		state[31] ^= 1;
		round(10);
		return hexCase(state.map(output_fn).join("").substring(0, out_length / 4));
	};
}());

return cubehash;
});