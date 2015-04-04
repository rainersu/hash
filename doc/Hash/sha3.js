/**
* 使用 {@link http://en.wikipedia.org/wiki/SHA-3|SHA3-256(Keccak)} 算法生成信息摘要。
* @see {@link Hash.keccak32}
* @see {@link http://keccak.noekeon.org/}
* @see {@link http://en.wikipedia.org/wiki/SHA-3}
* @see {@link https://github.com/drostie/sha3-js}
* @access public
* @func Hash.sha3
* @param {string} str - 文本。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.sha3).join('\r\n'));
* 
* // c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
* // 01b7309a9ccaf2735408e880b54fbf9ef2ba42665aed183789711b3f8c496bc0
* // b4d00ea0a1c62d2d733a97963a963fd9bbd5ed98b1c6bfcbc60150db73d5fd8b
*/