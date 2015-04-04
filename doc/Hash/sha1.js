/**
* 使用 {@link http://en.wikipedia.org/wiki/SHA-1|SHA-1} 算法生成信息摘要。
* @see {@link Hash.uuid5}
* @see {@link http://en.wikipedia.org/wiki/SHA-1}
* @see {@link http://pajhome.org.uk/crypt/md5/index.html}
* @access public
* @func Hash.sha1
* @param {string} str - 文本。
* @param {string} [key] - 密钥。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.sha1).join('\r\n'));
* 
* // fbdb1d1b18aa6c08324b7d64b71fb76370690e1d
* // 9b4a918f398d74d3e367970aba3cbe54e4d2b5d9
* // 931f110bbead22d6ff59f26d7d77a7d5a0c92291
* @example
* console.log(Hash.sha1('abc')        === 'a9993e364706816aba3e25717850c26c9cd0d89d');   // true
* console.log(Hash.sha1('abc', 'key') === '4fd0b215276ef12f2b3e4c8ecac2811498b656fc');   // true
*/