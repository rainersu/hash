/**
* 使用 {@link http://www.q2s.ntnu.no/sha3_nist_competition/start|Blue Midnight Wish} 算法生成信息摘要。
* @see {@link http://www.q2s.ntnu.no/sha3_nist_competition/start}
* @see {@link https://github.com/drostie/sha3-js}
* @access public
* @func Hash.bmw
* @param {string} str - 文本。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.bmw).join('\r\n'));
* 
* // 82cac4bf6f4c2b41fbcc0e0984e9d8b76d7662f8e1789cdfbd85682acc55577a
* // 3a3c61cbd8093169b87dcd11ff3584ba45850b42acf2699fb23d92ca259cc3e6
* // d0e5309867e45c678d715d286f5c2786e8cb1dec3cf6986f7e66ca806f4926e4
*/