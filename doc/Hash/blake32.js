/**
* 使用 {@link http://131002.net/blake/|BLAKE} 算法生成信息摘要。
* @see {@link http://131002.net/blake/}
* @see {@link https://github.com/drostie/sha3-js}
* @access public
* @func Hash.blake32
* @param {string} str - 文本。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.blake32).join('\r\n'));
* 
* // 73be7e1e0a7d0a2f0035edae62d4412ec43c0308145b5046849a53756bcda44b
* // 09b28c529f760838212d1c0935b772e4c0e2db0e21638d1c66233221ada4957d
* // 9ef9b95a8c7f4739d0c307deb04406c3dec0dce2dba018acd02092ba7b1bb389
*/