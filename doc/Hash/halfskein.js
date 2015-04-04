/**
* 使用 32 位的 {@link http://en.wikipedia.org/wiki/SHA-3|Skein} 算法生成信息摘要。
* @see {@link Hash.skein}
* @see {@link http://www.skein-hash.info/}
* @see {@link https://github.com/drostie/sha3-js}
* @access public
* @func Hash.halfskein
* @param {string} str - 文本。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.halfskein).join('\r\n'));
* 
* // 9bce0ce2a5ad0cdbcbf10fbc1cc00ed91a619a6a84ea15f109c6eb38891662ab
* // 55a64d706859cb4dcaa688812a7a84229664e7fc8b3cc6a767d2964e435858a7
* // b469af58c519b6aab5af612dc00c1c7f49dd827fdf9ccad29f73f4cfdea7bea5
*/