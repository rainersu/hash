/**
* 生成一个符合 {@link http://www.ietf.org/rfc/rfc4122.txt RFC4122,v4} 标准定义的 {@link http://zh.wikipedia.org/wiki/UUID UUID} 。
* @see {@link Hash.uuid3}
* @see {@link Hash.uuid1}
* @see {@link Hash.uuid5}
* @see {@link https://github.com/rse/pure-uuid}
* @see {@link https://github.com/broofa/node-uuid}
* @access public
* @func Hash.uuid4
* @param {array} [random] - 用于生成结果的随机数。包含十六个十六进制数字的数组。
* @param {function} [rng] - 用于替换默认的随机数发生器。
* @returns {string}
* @example
* console.log(Hash.uuid4());   // 9ccd25a1-b520-4518-bbeb-20cacc20f37f
* @example 
* console.log(Hash.uuid4([
*     0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
*     0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
* ]) === '109156be-c4fb-41ea-b1b4-efe1671c5836');   // true 
*/