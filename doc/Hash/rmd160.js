/**
* 使用 {@link http://en.wikipedia.org/wiki/RIPEMD-160|RIPEMD-160} 算法生成信息摘要。
* @see {@link http://en.wikipedia.org/wiki/RIPEMD-160}
* @see {@link http://pajhome.org.uk/crypt/md5/index.html}
* @access public
* @func Hash.rmd160
* @param {string} str - 文本。
* @param {string} [key] - 密钥。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.rmd160).join('\r\n'));
* 
* // 44d86b658a3e7cbc1a2010848b53e35c917720ca
* // cf402f47ae89744c54ee3d8333677b26aaf3d8e2
* // f7a092620b64c72073c09f57f04de8c1010ef3cd
* @example
* console.log(Hash.rmd160("abc")        === '8eb208f7e05d987a9b044a8e98c6b087f15a0bfc');   // true
* console.log(Hash.rmd160('abc', 'key') === '67fdce738ebfc7372bcd38f03c023b5746724d18');   // true
*/
