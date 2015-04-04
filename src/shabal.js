define([
	'./var/undefined',
	'./var/hexCase'
],
function(
	undefined,
	hexCase
) {'use strict';

var shabal = (function () {
	var A, B, C, M, circ, shabal_f, ivA, ivB, ivC, z, hex, output_fn;
	circ = function (x, n) {
		return (x << n) + (x >>> (32 - n));
	};
	hex = function (n) {
		return ("00" + n.toString(16)).slice(-2);
	};
	output_fn = function (n) {
		return hex(n & 255) + hex(n >>> 8) + hex(n >>> 16) + hex(n >>> 24);
	};
	shabal_f = function (start, w0, w1) {
		var i, j, k;
		for (i = 0; i < 16; i += 1) {
			B[i] = circ(B[i] + M[start + i], 17);
		}
		A[0] ^= w0;
		A[1] ^= w1;
		for (j = 0; j < 3; j += 1) {
			for (i = 0; i < 16; i += 1) {
				k = (i + 16 * j) % 12;
				A[k] = 3 * (A[k] ^ 5 * circ(A[(k + 11) % 12], 15) ^ C[(24 - i) % 16]) ^
					B[(i + 13) % 16] ^ (B[(i + 9) % 16] & ~ B[(i + 6) % 16]) ^ M[start + i];
				B[i] = circ(B[i], 1) ^ ~ A[k];
			}
		}
		for (j = 0; j < 36; j += 1) {
			A[j % 12] += C[(j + 3) % 16];
		}
		for (i = 0; i < 16; i += 1) {
			C[i] -= M[start + i];
		}
		k = B; 
		B = C; 
		C = k;
	};
	B = []; 
	C = [];
	M = [];
	for (z = 0; z < 16; z += 1) {
		B[z] = C[z] = 0;
		M[z] = 256 + z;
		M[z + 16] = 272 + z;
	}
	A = B.slice(4);
	shabal_f(0, -1, -1);
	shabal_f(16, 0, 0);
	ivA = A;
	ivB = B;
	ivC = C;
	return function (msg) {
		var i, j = 0;
		// clone the IV.
		A = ivA.slice(0);
		B = ivB.slice(0);
		C = ivC.slice(0);
		// pad the message with a byte 0x80 and then bytes 0x00 until you have
		// an integer number of 512-bit blocks.
		msg += "\u0080";
		while (msg.length % 32) {
			msg += "\u0000";
		}
		// then push them into the M array as 
		M = [];
		for (i = 0; i < msg.length; i += 2) {
			M.push(msg.charCodeAt(i) + 65536 * msg.charCodeAt(i + 1));
		}
		for (i = 0; i < M.length; i += 16) {
			j += 1;
			shabal_f(i, j, 0);
		}
		i -= 16;
		shabal_f(i, j, 0);
		shabal_f(i, j, 0);
		shabal_f(i, j, 0);
		return hexCase(C.slice(8, 16).map(output_fn).join(""));
	};
}());

return shabal;
});