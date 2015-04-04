/**
* 使用 {@link http://cubehash.cr.yp.to/|CubeHash} 算法生成信息摘要。
* @see {@link http://cubehash.cr.yp.to/}
* @see {@link https://github.com/drostie/sha3-js}
* @access public
* @func Hash.cubehash
* @param {string} str - 文本。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.cubehash).join('\r\n'));
* 
* // 44c6de3ac6c73c391bf0906cb7482600ec06b216c7c54a2a8688a6a42676577d
* // 89fc985e6a0031cb9bd5475044f111914617e58e640adad350ac718580bb9854
* // 8ba5b74fd52fdf7ea73fde854048dac387e056c949017e4b56133ea74ab0de2c
*/