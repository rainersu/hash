/**
* 使用 {@link http://en.wikipedia.org/wiki/SHA-2|SHA2-512} 算法生成信息摘要。
* @see {@link http://en.wikipedia.org/wiki/SHA-2}
* @see {@link http://pajhome.org.uk/crypt/md5/index.html}
* @access public
* @func Hash.sha512
* @param {string} str - 文本。
* @param {string} [key] - 密钥。
* @returns {string}
* @example
* console.log([ '', 'abc', '\u82CF\u6631' ].map(Hash.sha512).join('\r\n'));
* 
* // b936cee86c9f87aa5d3c6f2e84cb5a4239a5fe50480a6ec66b70ab5b1f4ac6730c6c515421b327ec1d69402e53dfb49ad7381eb067b338fd7b0cb22247225d47
* // 29689f6b79a8dd686068c2eeae97fd8769ad3ba65cb5381f838358a8045a358ee3ba1739c689c7805e31734fb6072f87261d1256995370d55725cba00d10bdd0
* // a1d65f2a3ce698f547d1e6928ccc4d617c23c99a757682f62ea94dd3ff7f0841aa44ab7138434173df0dc2bd2bbf964e5b0df23f0163877fd04d2af3aac587da
* @example
* console.log(Hash.sha512("abc") ===
* 'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f');
* // true
* 
* console.log(Hash.sha512('abc', 'key') ===
* '3926a207c8c42b0c41792cbd3e1a1aaaf5f7a25704f62dfc939c4987dd7ce060009c5bb1c2447355b3216f10b537e9afa7b64a4e5391b0d631172d07939e087a');
* // true 
*/