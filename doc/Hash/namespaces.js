/**
* 供 {@link Hash.uuid3|uuid3} 和 {@link Hash.uuid5|uuid5} 方法使用的 {@link http://www.ietf.org/rfc/rfc4122.txt|RFC 4122} 预定义的命名空间  {@link http://zh.wikipedia.org/wiki/UUID|UUID} 的集合。
* @namespace Hash.namespaces
* @see {@link Hash.uuid3}
* @see {@link Hash.uuid5}
* @see {@link http://www.ietf.org/rfc/rfc4122.txt|RFC 4122}
* @see {@link http://zh.wikipedia.org/wiki/UUID}
* @example
* var s = Array(15).join(' ');
* for(var i in Hash.namespaces) if (Hash.namespaces.hasOwnProperty(i)) {
*     console.log(i + s.slice(i.length) + ' :  ' + Hash.namespaces[i]);
* }
* 
* // nil            :  00000000-0000-0000-0000-000000000000
* // ns:DNS         :  6ba7b810-9dad-11d1-80b4-00c04fd430c8
* // ns:URL         :  6ba7b811-9dad-11d1-80b4-00c04fd430c8
* // ns:OID         :  6ba7b812-9dad-11d1-80b4-00c04fd430c8
* // ns:X500        :  6ba7b814-9dad-11d1-80b4-00c04fd430c8
*/
