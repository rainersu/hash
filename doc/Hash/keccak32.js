/**
* 使用 32 位的 {@link http://en.wikipedia.org/wiki/SHA-3|Keccak} 算法生成信息摘要。
* @see {@link Hash.keccak}
* @see {@link http://keccak.noekeon.org/}
* @see {@link http://en.wikipedia.org/wiki/SHA-3}
* @see {@link https://github.com/drostie/sha3-js}
* @access public
* @func Hash.keccak32
* @param {string} str - 文本。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.keccak32).join('\r\n'));
* 
* // 2507dc4976767add735f22c1831fbf323cb9f94755c289a680b327adff881fcd
* // 8991b580f683473bc8f000389a06188ba865f8b9a8b3c7235fd797a898444f44
* // 6e845948b5bf6fdfb9709018f14384c1cdb53a3ee4e523aa051d821485f147d2
*/