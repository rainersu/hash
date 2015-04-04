define([
	'./var/undefined',
	'./var/hexCase'
],
function(
	undefined,
	hexCase
) {'use strict';

var bmw = (function () {
	var iv, final, u, add_const, sc, fc, ec_s, ec_n, ec2_rot, hex, output_fn, compress, rot, s, fold;
	// output formatting function, giving the little-endian hex display of a number.
	hex = function (n) {
		return ("00" + n.toString(16)).slice(-2);
	};
	output_fn = function (n) {
		return hex(n & 255) + hex(n >>> 8) + hex(n >>> 16) + hex(n >>> 24);
	};
	// initial constants.
	iv = [];
	final = [];
	add_const = [];
	for (u = 0; u < 16; u += 1) {
		final[u] = 0xaaaaaaa0 + u;
		iv[u] = 0x40414243 + u * 0x04040404;
		add_const[u] = (u + 16) * 0x5555555;
	}
	rot = function (x, n) {
		return (x << n) + (x >>> (32 - n));
	};
	sc = [19, 23, 25, 29, 4, 8, 12, 15, 3, 2, 1, 2, 1, 1, 2, 2];

	// The BMW spec defines a suite of s_n(x) functions. I implement this as
	// one function s(x, n), with the constants sc[n]. 
	s = function (x, n) {
		return (n < 4) ? 
			rot(x, sc[n]) ^ rot(x, sc[n + 4]) ^ (x << sc[n + 8]) ^ (x >>> sc[n + 12]) :
			x ^ (x >>> n - 3); 
	};
	// In the "folding" step there is a set of erratic, irregular expressions,
	// which can mostly be reduced to a suite of 24 constants:
	fc = [21, 7, 5, 1, 3, 22, 4, 11, 24, 6, 22, 20, 3, 4, 7, 2, 5, 24, 21, 21, 16, 6, 22, 18];
	fold = function (x, n) {
		n = fc[n];
		return (n < 16) ? x >>> n : x << (n - 16);
	};
	// There are also some erratic expansion constants, which are defined here:
	ec_s = [29, 13, 27, 13, 25, 21, 18, 4, 5, 11, 17, 24, 19, 31, 5, 24];
	ec_n = [5, 7, 10, 13, 14];
	ec2_rot = [0, 3, 7, 13, 16, 19, 23, 27];

	// This is the BMW compression function: given a message block m and a  
	// chaining state H, it "expands" the two into the "quad-pipe" Q, and
	// then "folds" the result back into H. 
	compress = function (m, H) {
		var lo, hi, i, j, k, a, b, Q;
		Q = [];
		// first expansion phase: here `a` is W_i as mentioned in the spec.
		for (i = 0; i < 16; i += 1) {
			a = 0; 
			for (j = 0; j < 5; j += 1) {
				k = (i + ec_n[j]) % 16;
				b = H[k] ^ m[k];
				a += (ec_s[i] >> j) % 2 ? b : -b;
			}
			Q[i] = H[(i + 1) % 16] + s(a, i % 5);
		}
		// second expansion phase: two expand1 rounds and 14 expand2 rounds
		for (i = 0; i < 16; i += 1) {
			// both expand1 and expand2 start from this value for Q:
			a = (i + 3) % 16;
			b = (i + 10) % 16;
			Q[i + 16] = H[(i + 7) % 16] ^ (add_const[i] +
				rot(m[i], 1 + i) + 
				rot(m[a], 1 + a) -
				rot(m[b], 1 + b));
			// then they both add in f(Q[i]) for the 16 previous i's. 
			// we start k at 1 to make the indices for both functions go
			// like [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].
			for (k = 1; k < 17; k += 1) {
				// here `a` is the Q[i] to be transformed. We apply either the
				// expand1 functions:
				// [s1, s2, s3, s0, s1, s2, s3, s0, s1, s2, s3, s0, s1, s2, s3, s0]
				// or the expand2 functions:
				// [r0, r3, r0, r7, r0, r13, r0, r16, r0, r19, r0, r23, r0, r27, s4, s5]
				a = Q[i + k - 1];
				Q[i + 16] += (i < 2) ? s(a, k % 4) : // expand1
					(k > 14) ? s(a, k - 11) :        // expand2 s4 and s5
					(k % 2) ? a :                    // expand2 r0
					rot(a, ec2_rot[k / 2]);          // expand2 r**.
			}
		}
		
		// folding phase. We initialize the lo and hi diffusion variables.
		lo = hi = 0;
		for (i = 16; i < 24; i += 1) {
			lo ^= Q[i];
			hi ^= Q[i + 8];
		}
		hi ^= lo;
		// then we "fold" Q into H.
		for (i = 0; i < 16; i += 1) {
			H[i] = (i < 8) ? 
				(lo ^ Q[i] ^ Q[i + 24]) + (m[i] ^ fold(hi, i) ^ fold(Q[i + 16], i + 16)) : 
				(hi ^ m[i] ^ Q[i + 16]) + (Q[i] ^ fold(lo, i) ^ Q[16 + (i - 1) % 8]) + 
					rot(H[(i - 4) % 8], i + 1);
		}
		return H;
	};
	
	// The bmw() function.
	return function (msg) {
		var len, i, data, H;
		len = 16 * msg.length;
		msg += "\u0080";
		while (msg.length % 32 !== 28) {
			msg += "\u0000";
		}
		data = [];
		for (i = 0; i < msg.length; i += 2) {
			data.push(msg.charCodeAt(i) + 65536 * msg.charCodeAt(i + 1));
		}
		data.push(len);
		data.push(0);
		H = iv.slice(0);
		for (i = 0; i < data.length; i += 16) {
			compress(data.slice(i, i + 16), H);
		}
		return hexCase(compress(H, final.slice(0)).slice(8, 16).map(output_fn).join(""));
	};
}());

return bmw;
});