/**
* 使用 {@link Hash.md5|MD5} 算法生成一个符合 {@link http://www.ietf.org/rfc/rfc4122.txt|RFC4122,v3} 标准定义的 {@link http://zh.wikipedia.org/wiki/UUID|UUID} 。
* @see {@link Hash.md5}
* @see {@link Hash.uuid1}
* @see {@link Hash.uuid4}
* @see {@link Hash.uuid5}
* @see {@link https://github.com/rse/pure-uuid}
* @see {@link https://github.com/broofa/node-uuid}
* @access public
* @func Hash.uuid3
* @param {string} ns   - 命名空间的 UUID 。请见 {@link Hash.namespaces|namespaces} 。
* @param {string} data - 要编码的 URL 或其它文本。
* @returns {string}
* @example
* console.log(Hash.uuid3('ns:DNS', 'php.net'));   // 11a38b9a-b3da-360f-9353-a5a725514269
* console.log(Hash.uuid3('ns:DNS', 'php.net') === '11a38b9a-b3da-360f-9353-a5a725514269');   // true
*/