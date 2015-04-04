define([
	'./var/undefined',
	'./var/hexCase'
],
function(
	undefined,
	hexCase
) {'use strict';

var skein = (function () {
	var even, odd, charcode, zero, pad, rot, ubi, initial, state, mix, subkey_inject, L;
	L = function (lo, hi) {
		this.lo = lo ? lo : 0;
		this.hi = hi ? hi : 0;
	};
	L.clone = function (a) {
		return new L(a.lo, a.hi);
	};
	L.prototype = {
		xor: function (that) {
			this.lo ^= that.lo;
			this.hi ^= that.hi;
			return this;
		},
		plus: (function () {
			var two32, s;
			two32 = 4 * (1 << 30);
			s = function (x, y) {
				var t = x + y;
				if (x < 0) {
					t += two32;
				}
				if (y < 0) {
					t += two32;
				}
				return t;
			};
			return function (that) {
				this.lo = s(this.lo, that.lo);
				this.hi = (s(this.hi, that.hi) + (this.lo >= two32 ? 1 : 0)) % two32;
				this.lo = this.lo % two32;
				return this;
			};
		}()),
		circ: function (n) {
			var tmp, m;
			if (n >= 32) {
				tmp = this.lo;
				this.lo = this.hi;
				this.hi = tmp;
				n -= 32;
			} 
			m = 32 - n;
			tmp = (this.hi << n) + (this.lo >>> m);
			this.lo = (this.lo << n) + (this.hi >>> m);
			this.hi = tmp;
			return this;
		},
		toString: (function () {
			var hex, o;
			hex = function (n) {
				return ("00" + n.toString(16)).slice(-2);
			};
			o = function (n) {
				return hex(n & 255) + hex(n >>> 8) + hex(n >>> 16) + hex(n >>> 24);
			};
			return function () {
				return o(this.lo) + o(this.hi);
			};
		}())
	};
	//permutation constants
	even = [0, 2, 4, 6, 2, 4, 6, 0, 4, 6, 0, 2, 6, 0, 2, 4];
	odd = [1, 3, 5, 7, 1, 7, 5, 3, 1, 3, 5, 7, 1, 7, 5, 3];
	charcode = String.fromCharCode;
	zero = charcode(0);
	// padding string: 32 zero-characters
	pad = zero + zero + zero + zero;
	pad += pad + pad + pad;
	pad += pad;
	// rotation constants..
	rot = [
		[46, 36, 19, 37, 33, 27, 14, 42, 17, 49, 36, 39, 44, 9, 54, 56], 
		[39, 30, 34, 24, 13, 50, 10, 17, 25, 29, 39, 43, 8, 35, 56, 22]
	];
	subkey_inject = function (key, tweak, round) {
		for (var i = 0; i < 8; i += 1) {
			state[i].plus(key[(round + i) % 9]);
		}
		state[5].plus(tweak[round % 3]);
		state[6].plus(tweak[(round + 1) % 3]);
		state[7].plus(new L(round));
	};
	mix = function (r) {
		// input: one of the two arrays of round constants.
		var a, b, i;
		for (i = 0; i < 16; i += 1) {
			a = even[i];
			b = odd[i];
			state[a].plus(state[b]);
			state[b].circ(r[i]).xor(state[a]);
		}
	};
	// UBI calls on the chaining state c have a type number T (0-63), and some
	// data string D, while c is itself used as a Threefish32 key schedule.
	ubi = function (type, message) {
		var key, data, i, j, block, round, first, last, tweak, original_length;
		// the message is padded with zeroes and turned into 32-bit ints.
		// first we store the original length
		original_length = message.length;
		if (original_length % 32) {
			message += pad.slice(original_length % 32);
		} else if (original_length === 0) {
			message = pad;
		}
		// then we construct the data array.
		data = [];
		j = 0;
		for (i = 0; i < message.length; i += 4) {
			data[j] = new L(
				message.charCodeAt(i) + message.charCodeAt(i + 1) * 0x10000,
				message.charCodeAt(i + 2) + message.charCodeAt(i + 3) * 0x10000
			);
			j += 1;
		}
		// we want a pointer last block, and tweak flags for first and type.
		first = 1 << 30;
		type <<= 24;
		last = data.length - 8;
		for (block = 0; block <= last; block += 8) {
			// tweak field. we're processing ints (block -> block + 8),
			// which each take up four bytes. On the last block we don't count
			// the padding 0's and we raise a "last" flag.
			tweak = (block === last) ? 
				[new L(2 * original_length), new L(0, first + type + (1 << 31))] :
				[new L(8 * block + 64), new L(0, first + type)];
			// extended tweak field.
			tweak[2] = new L().xor(tweak[0]).xor(tweak[1]);
			
			// the key for threefish encryption is extended from the chaining state
			// with one extra value.
			key = state;
			key[8] = new L(0xa9fc1a22, 0x1bd11bda);
			for (i = 0; i < 8; i += 1) {
				key[8].xor(key[i]);
			}
			// and the state now gets the plaintext for this UBI iteration.
			state = data.slice(block, block + 8).map(L.clone);
			
			// Each "mix" is four "rounds" of threefish32, so the 18 here 
			// is essentially 4*18 = 72 in the spec.
			for (round = 0; round < 18; round += 1) {
				subkey_inject(key, tweak, round);
				mix(rot[round % 2]);
			}
			// there is then one final subkey addition in Threefish32:
			subkey_inject(key, tweak, round);
			// now we pass on to Matyas-Meyer-Oseas, XORing the source data
			// into the current state vector.
			for (i = 0; i < 8; i += 1) {
				state[i].xor(data[block + i]);
			}
			first = 0;
		}
	};
	state = [new L(), new L(), new L(), new L(), new L(), new L(), new L(), new L()];
	
	// ubi(0, "key string")
	ubi(4, charcode(0x4853, 0x3341, 1, 0, 512) + pad.slice(5, 16));
	// ubi(8, "personalization as UTF-16, against the standard.");
	// ubi(12, "public key string, if such exists.");
	// ubi(16, "key identifier");
	// ubi(20, "nonce input");
	initial = state;
	return function (m) {
		state = initial.map(L.clone);
		ubi(48, m);
		ubi(63, zero + zero + zero + zero);
		return hexCase(state.join(""));
	};
}());

return skein;
});