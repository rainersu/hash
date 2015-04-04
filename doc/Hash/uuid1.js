/**
* 生成一个符合 {@link http://www.ietf.org/rfc/rfc4122.txt RFC4122,v1} 标准定义的 {@link http://zh.wikipedia.org/wiki/UUID UUID} 。
* @see {@link Hash.uuid3}
* @see {@link Hash.uuid4}
* @see {@link Hash.uuid5}
* @see {@link https://github.com/rse/pure-uuid}
* @see {@link https://github.com/broofa/node-uuid}
* @access public
* @func Hash.uuid1
* @param {array}  [node] - 作为 6 个字节数组的 Node Id。默认随机产生。
* @param {number} [clockseq] - 取值范围为 0 - 0x3fff 的 RFC clock sequence 。
* @param {number|date} [msecs] - 自 unix Epoch 开始累计的时间，单位为毫秒。默认为当前时间。
* @param {number} [nsecs] - 取值范围为 0-9999 的附加时间, 单位为 100-nanosecond 。如果 msecs 未指定则被忽略。
* @returns {string}
* @example
console.log(Hash.uuid1());   // b081f471-b1f8-11e4-923b-2deba33cb418
* @example
* console.log(Hash.uuid1(
*     [ 0x01, 0x23, 0x45, 0x67, 0x89, 0xab ],
*     0x1234,
*     new Date('2011-11-01').getTime(),
*     5678
* ) === '710b962e-041c-11e1-9234-0123456789ab');   // true
*/