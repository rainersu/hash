/**
* 使用 {@link http://en.wikipedia.org/wiki/SHA-3|Skein} 算法生成信息摘要。
* @see {@link Hash.halfskein}
* @see {@link http://www.skein-hash.info/}
* @see {@link https://github.com/drostie/sha3-js}
* @access public
* @func Hash.skein
* @param {string} str - 文本。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.skein).join('\r\n'));
* 
* // bc5b4c50925519c290cc634277ae3d6257212395cba733bbad37a4af0fa06af41fca7903d06564fea7a2d3730dbdb80c1f85562dfcc070334ea4d1d9e72cba7a
* // 1c0bd9e7f0189fc05f4f3972e221036c8bbee97813fc9aa3f834fb092248fd4ab71fb3549213594f6dc93c4ecae0e1d83aee5a496897c5bac27e32d17c11cbd7
* // 292fb87182543350c10f82c58740e4137b8779ddedf1b864449a42978863bfd901cf2b78859f62de9e5910fb59d98174cf81c12c695535d1aa714705953fbf18
*/