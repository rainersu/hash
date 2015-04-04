/**
* 全局性统一指定 {@link http://en.wikipedia.org/wiki/Hash_function|散列算法} 生成的十六进制信息摘要字符串以及 {@link http://zh.wikipedia.org/wiki/UUID|UUID} 的字母大小写。默认为使用小写字母。
* @var {boolean} [Hash.hexCase=false]
* @example
* Hash.hexCase = 0;
* console.log(Hash.md5(''));   // d41d8cd98f00b204e9800998ecf8427e
* console.log(Hash.uuid4());   // 7e0f38cd-b04c-4675-ad7c-ae9c77b89cc0
* 
* Hash.hexCase = 1;
* console.log(Hash.md5(''));   // D41D8CD98F00B204E9800998ECF8427E
* console.log(Hash.uuid4());   // 47DFCB6A-2DEC-4FF9-A8AC-05CCE2BB7EF6
*/
