/**
* 使用 {@link http://en.wikipedia.org/wiki/MD5|MD5} 算法生成信息摘要。
* @see {@link Hash.uuid3}
* @see {@link http://en.wikipedia.org/wiki/MD5}
* @see {@link http://pajhome.org.uk/crypt/md5/index.html}
* @access public
* @func Hash.md5
* @param {string} str - 文本。
* @param {string} [key] - 密钥。
* @returns {string}
* @example
* console.log(Hash.md5('value')        === '2063c1608d6e0baf80249c42e2be5804');   // true
* console.log(Hash.md5('value', 'key') === '01433efd5f16327ea4b31144572c67f6');   // true
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.md5).join('\r\n'));
* 
* // 74e6f7298a9c2d168935f58c001bad88
* // dd2701993d29fdd0b032c233cec63403
* // 44509f10c6bf5fb3e4aaad53119185e4
*/