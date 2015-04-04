/**
* 使用 {@link http://en.wikipedia.org/wiki/SHA-2|SHA2-256} 算法生成信息摘要。
* @see {@link http://en.wikipedia.org/wiki/SHA-2}
* @see {@link http://pajhome.org.uk/crypt/md5/index.html}
* @access public
* @func Hash.sha256
* @param {string} str - 文本。
* @param {string} [key] - 密钥。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.sha256).join('\r\n'));
* 
* // b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad
* // fd7adb152c05ef80dccf50a1fa4c05d5a3ec6da95575fc312ae7c5d091836351
* // b3c245a58904e04bb35d5c802ff7bf30518bb70a45f2b854dfd6fa58ef6e132a
* @example
* console.log(Hash.sha256("abc") === 
* 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');   // true
* 
* console.log(Hash.sha256('abc', 'key') ===       
* '9c196e32dc0175f86f4b1cb89289d6619de6bee699e4c378e68309ed97a1a6ab');   // true 
*/