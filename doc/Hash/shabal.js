/**
* 使用 {@link http://www.shabal.com/|Shabal} 算法生成信息摘要。
* @see {@link http://www.shabal.com/}
* @see {@link https://github.com/drostie/sha3-js}
* @access public
* @func Hash.shabal
* @param {string} str - 文本。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.shabal).join('\r\n'));
* 
* // aec750d11feee9f16271922fbaf5a9be142f62019ef8d720f858940070889014
* // f4b8cdf199ab24366ea87d30702280201d88977227d16bde11b87f4405e66cec
* // 13e33c7f93a52f24bee2c62c5b9876ae32db21275b0eb69310df395e08d6d323
*/