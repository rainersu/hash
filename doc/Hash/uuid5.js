/**
* 使用 {@link Hash.sha1|SHA1} 算法生成一个符合 {@link http://www.ietf.org/rfc/rfc4122.txt|RFC4122,v5} 标准定义的 {@link http://zh.wikipedia.org/wiki/UUID|UUID} 。
* @see {@link Hash.sha1}
* @see {@link Hash.uuid1}
* @see {@link Hash.uuid4}
* @see {@link Hash.uuid3}
* @see {@link https://github.com/rse/pure-uuid}
* @see {@link https://github.com/broofa/node-uuid}
* @access public
* @func Hash.uuid5
* @param {string} ns   - 命名空间的 UUID 。请见 {@link Hash.namespaces|namespaces} 。
* @param {string} data - 要编码的 URL 或其它文本。
* @returns {string}
* @example
* console.log(Hash.uuid5('ns:DNS', 'php.net'));   // c4a760a8-dbcf-5254-a0d9-6a4474bd1b62
* console.log(Hash.uuid5('ns:DNS', 'php.net') === 'c4a760a8-dbcf-5254-a0d9-6a4474bd1b62');   // true
*/