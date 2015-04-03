/*!
sumi-hash v1.0.0
https://github.com/rainersu/hash
A collection of hash algorithms. MD5, SHA1, SHA3, UUID ver.1, 2, 3, 4, etc.
(c) 2015 Rainer Su( rainersu@foxmail.com | http://cn.linkedin.com/in/rainersu | QQ: 2627001536 )
*/
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], function() {
            return factory();
        });
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root["sumiHash"] = factory();
    }
})(this, function() {
    var undefined = void 0;
    var NaN = 0 / 0;
    var object = Object;
    var hasOP = object.prototype.hasOwnProperty;
    function cp(d, o) {
        for (var m in o) if (hasOP.call(o, m)) d[m] = o[m];
        return d;
    }
    var undef = undefined + "";
    var shell = typeof window !== undef ? window : typeof global !== undef ? global : this || 1;
    var Hash = {
        namespaces: ns
    };
    var math = Math;
    var ceil = math.ceil;
    var log = math.log;
    var floor = math.floor;
    var array = Array;
    var string = String;
    var fromCC = string.fromCharCode;
    function add(x, y) {
        var l = (x & 65535) + (y & 65535), m = (x >> 16) + (y >> 16) + (l >> 16);
        return m << 16 | l & 65535;
    }
    function rol(n, c) {
        return n << c | n >>> 32 - c;
    }
    function dim(l, i) {
        l = l >>> 0;
        if (arguments.length < 2) i = "";
        for (var r = array(l); l--; ) {
            r[l] = i;
        }
        return r;
    }
    function utf16to8(t) {
        var l = t.length, o = "", i = -1, x, y;
        while (++i < l) {
            x = t.charCodeAt(i);
            y = i + 1 < l ? t.charCodeAt(i + 1) : 0;
            if (55296 <= x && x <= 56319 && 56320 <= y && y <= 57343) {
                x = 65536 + ((x & 1023) << 10) + (y & 1023);
                i++;
            }
            o += x <= 127 ? fromCC(x) : x <= 2047 ? fromCC(192 | x >>> 6 & 31, 128 | x & 63) : x <= 65535 ? fromCC(224 | x >>> 12 & 15, 128 | x >>> 6 & 63, 128 | x & 63) : x <= 2097151 ? fromCC(240 | x >>> 18 & 7, 128 | x >>> 12 & 63, 128 | x >>> 6 & 63, 128 | x & 63) : "";
        }
        return o;
    }
    function utf8to16BE(i) {
        var o = "", n = 0, l = i.length, x;
        for (;n < l; n++) {
            x = i.charCodeAt(n);
            o += fromCC(x >>> 8 & 255, x & 255);
        }
        return o;
    }
    function utf8to16LE(i) {
        var o = "", n = 0, l = i.length, x;
        for (;n < l; n++) {
            x = i.charCodeAt(n);
            o += fromCC(x & 255, x >>> 8 & 255);
        }
        return o;
    }
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var hex = [ "0123456789abcdef", "0123456789ABCDEF" ];
    function hexCase(s) {
        return Hash.hexCase ? s.toUpperCase() : s.toLowerCase();
    }
    function r2e(t, e) {
        var l = t.length, d = e.length, v = array(ceil(l / 2)), f = ceil(l * 8 / (log(d) / log(2))), r = array(f), i = 0, j = v.length, o = "", q, x, u;
        for (;i < j; i++) {
            v[i] = t.charCodeAt(i * 2) << 8 | t.charCodeAt(i * 2 + 1);
        }
        for (j = 0; j < f; j++) {
            u = [];
            x = 0;
            for (i = 0; i < v.length; i++) {
                x = (x << 16) + v[i];
                q = floor(x / d);
                x -= q * d;
                if (u.length > 0 || q > 0) u[u.length] = q;
            }
            r[j] = x;
            v = u;
        }
        for (i = r.length - 1; i >= 0; i--) {
            o += e.charAt(r[i]);
        }
        return o;
    }
    function r2b64(u, b) {
        b = b || "";
        var l = u.length, x = l * 8, o = "", i = 0, j, t;
        for (;i < l; i += 3) {
            t = u.charCodeAt(i) << 16 | (i + 1 < l ? u.charCodeAt(i + 1) << 8 : 0) | (i + 2 < l ? u.charCodeAt(i + 2) : 0);
            for (j = 0; j < 4; j++) {
                o += i * 8 + j * 6 > x ? b : b64.charAt(t >>> 6 * (3 - j) & 63);
            }
        }
        return o;
    }
    function r2hex(t) {
        var l = t.length, h = hex[~~Hash.hexCase], o = "", x, i = 0;
        for (;i < l; i++) {
            x = t.charCodeAt(i);
            o += h.charAt(x >>> 4 & 15) + h.charAt(x & 15);
        }
        return o;
    }
    function r2la(i) {
        var l = i.length, o = dim(l >> 2, 0), n = 0;
        l *= 8;
        for (;n < l; n += 8) {
            o[n >> 5] |= (i.charCodeAt(n / 8) & 255) << n % 32;
        }
        return o;
    }
    function la2r(i) {
        var o = "", n = 0, l = i.length * 32;
        for (;n < l; n += 8) {
            o += fromCC(i[n >> 5] >>> n % 32 & 255);
        }
        return o;
    }
    function b2hex(b) {
        var l = b.length * 4, h = hex[~~Hash.hexCase], s = "", i = 0;
        for (;i < l; i++) {
            s += h.charAt(b[i >> 2] >> (3 - i % 4) * 8 + 4 & 15) + h.charAt(b[i >> 2] >> (3 - i % 4) * 8 & 15);
        }
        return s;
    }
    function r2binb(t) {
        var l = t.length, o = dim(l >> 2, 0), i = 0;
        l *= 8;
        for (;i < l; i += 8) {
            o[i >> 5] |= (t.charCodeAt(i / 8) & 255) << 24 - i % 32;
        }
        return o;
    }
    function binb2r(t) {
        var l = t.length * 32, o = "", i = 0;
        for (;i < l; i += 8) {
            o += fromCC(t[i >> 5] >>> 24 - i % 32 & 255);
        }
        return o;
    }
    function rng() {
        var b = array(16), t = shell.crypto || shell.msCrypto, a = shell.Uint8Array, i = 0, r;
        t = t && t.getRandomValues;
        if (t && a) {
            b = new a(16);
            t(b);
        } else for (;i < 16; i++) {
            if ((i & 3) === 0) r = Math.random() * 4294967296;
            b[i] = r >>> ((i & 3) << 3) & 255;
        }
        return b;
    }
    function unparse(f) {
        var b = [], i = 256;
        for (;i--; ) {
            b[i] = (i + 256).toString(16).substr(1);
        }
        i = 0;
        return hexCase(b[f[i++]] + b[f[i++]] + b[f[i++]] + b[f[i++]] + "-" + b[f[i++]] + b[f[i++]] + "-" + b[f[i++]] + b[f[i++]] + "-" + b[f[i++]] + b[f[i++]] + "-" + b[f[i++]] + b[f[i++]] + b[f[i++]] + b[f[i++]] + b[f[i++]] + b[f[i++]]);
    }
    function uA(s, n, e, b, x) {
        for (var i = n; i <= e; i += 2) b[x++] = parseInt(s.substr(i, 2), 16);
    }
    function uH(b, n, e, s, x) {
        for (var i; n <= e; n++) {
            i = b[n].toString(16);
            s[x++] = "00".slice(i.length) + i;
        }
        return s;
    }
    function out(n, d, z, r) {
        n = ns[n] || n;
        var i = 16, u = dim(16, 0), t = "";
        uA(n, 0, 7, u, 0);
        uA(n, 9, 12, u, 4);
        uA(n, 14, 17, u, 6);
        uA(n, 19, 22, u, 8);
        uA(n, 24, 35, u, 10);
        for (;i--; ) t = fromCC(u[i]) + t;
        t += d;
        n = z(t, undefined, 2);
        for (i = 16; i--; ) u[i] = n.charCodeAt(i);
        u[6] &= 15;
        u[6] |= r << 4;
        u[8] &= 63;
        u[8] |= 2 << 6;
        n = array(32);
        uH(u, 0, 3, n, 0);
        n[8] = "-";
        uH(u, 4, 5, n, 9);
        n[13] = "-";
        uH(u, 6, 7, n, 14);
        n[18] = "-";
        uH(u, 8, 9, n, 19);
        n[23] = "-";
        uH(u, 10, 15, n, 24);
        return hexCase(n.join(""));
    }
    var ns = {
        nil: "00000000-0000-0000-0000-000000000000",
        "ns:DNS": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "ns:URL": "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
        "ns:OID": "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
        "ns:X500": "6ba7b814-9dad-11d1-80b4-00c04fd430c8"
    };
    function m(q, a, b, x, s, t) {
        return add(rol(add(add(a, q), add(x, t)), s), b);
    }
    function f(a, b, c, d, x, s, t) {
        return m(b & c | ~b & d, a, b, x, s, t);
    }
    function g(a, b, c, d, x, s, t) {
        return m(b & d | c & ~d, a, b, x, s, t);
    }
    function h(a, b, c, d, x, s, t) {
        return m(b ^ c ^ d, a, b, x, s, t);
    }
    function j(a, b, c, d, x, s, t) {
        return m(c ^ (b | ~d), a, b, x, s, t);
    }
    function rstr_md5(s) {
        return la2r(binl_md5(r2la(s), s.length * 8));
    }
    function rstr_hmac_md5(k, d) {
        var b = r2la(k), a = array(16), o = array(16), h, i;
        if (b.length > 16) b = binl_md5(b, k.length * 8);
        for (i = 0; i < 16; i++) {
            a[i] = b[i] ^ 909522486;
            o[i] = b[i] ^ 1549556828;
        }
        h = binl_md5(a.concat(r2la(d)), 512 + d.length * 8);
        return la2r(binl_md5(o.concat(h), 512 + 128));
    }
    function binl_md5(x, l) {
        var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, u, v, w, y, n, i;
        x[l >> 5] |= 128 << l % 32;
        x[(l + 64 >>> 9 << 4) + 14] = l;
        for (i = 0, n = x.length; i < n; i += 16) {
            u = a;
            v = b;
            w = c;
            y = d;
            a = f(a, b, c, d, x[i + 0], 7, -680876936);
            d = f(d, a, b, c, x[i + 1], 12, -389564586);
            c = f(c, d, a, b, x[i + 2], 17, 606105819);
            b = f(b, c, d, a, x[i + 3], 22, -1044525330);
            a = f(a, b, c, d, x[i + 4], 7, -176418897);
            d = f(d, a, b, c, x[i + 5], 12, 1200080426);
            c = f(c, d, a, b, x[i + 6], 17, -1473231341);
            b = f(b, c, d, a, x[i + 7], 22, -45705983);
            a = f(a, b, c, d, x[i + 8], 7, 1770035416);
            d = f(d, a, b, c, x[i + 9], 12, -1958414417);
            c = f(c, d, a, b, x[i + 10], 17, -42063);
            b = f(b, c, d, a, x[i + 11], 22, -1990404162);
            a = f(a, b, c, d, x[i + 12], 7, 1804603682);
            d = f(d, a, b, c, x[i + 13], 12, -40341101);
            c = f(c, d, a, b, x[i + 14], 17, -1502002290);
            b = f(b, c, d, a, x[i + 15], 22, 1236535329);
            a = g(a, b, c, d, x[i + 1], 5, -165796510);
            d = g(d, a, b, c, x[i + 6], 9, -1069501632);
            c = g(c, d, a, b, x[i + 11], 14, 643717713);
            b = g(b, c, d, a, x[i + 0], 20, -373897302);
            a = g(a, b, c, d, x[i + 5], 5, -701558691);
            d = g(d, a, b, c, x[i + 10], 9, 38016083);
            c = g(c, d, a, b, x[i + 15], 14, -660478335);
            b = g(b, c, d, a, x[i + 4], 20, -405537848);
            a = g(a, b, c, d, x[i + 9], 5, 568446438);
            d = g(d, a, b, c, x[i + 14], 9, -1019803690);
            c = g(c, d, a, b, x[i + 3], 14, -187363961);
            b = g(b, c, d, a, x[i + 8], 20, 1163531501);
            a = g(a, b, c, d, x[i + 13], 5, -1444681467);
            d = g(d, a, b, c, x[i + 2], 9, -51403784);
            c = g(c, d, a, b, x[i + 7], 14, 1735328473);
            b = g(b, c, d, a, x[i + 12], 20, -1926607734);
            a = h(a, b, c, d, x[i + 5], 4, -378558);
            d = h(d, a, b, c, x[i + 8], 11, -2022574463);
            c = h(c, d, a, b, x[i + 11], 16, 1839030562);
            b = h(b, c, d, a, x[i + 14], 23, -35309556);
            a = h(a, b, c, d, x[i + 1], 4, -1530992060);
            d = h(d, a, b, c, x[i + 4], 11, 1272893353);
            c = h(c, d, a, b, x[i + 7], 16, -155497632);
            b = h(b, c, d, a, x[i + 10], 23, -1094730640);
            a = h(a, b, c, d, x[i + 13], 4, 681279174);
            d = h(d, a, b, c, x[i + 0], 11, -358537222);
            c = h(c, d, a, b, x[i + 3], 16, -722521979);
            b = h(b, c, d, a, x[i + 6], 23, 76029189);
            a = h(a, b, c, d, x[i + 9], 4, -640364487);
            d = h(d, a, b, c, x[i + 12], 11, -421815835);
            c = h(c, d, a, b, x[i + 15], 16, 530742520);
            b = h(b, c, d, a, x[i + 2], 23, -995338651);
            a = j(a, b, c, d, x[i + 0], 6, -198630844);
            d = j(d, a, b, c, x[i + 7], 10, 1126891415);
            c = j(c, d, a, b, x[i + 14], 15, -1416354905);
            b = j(b, c, d, a, x[i + 5], 21, -57434055);
            a = j(a, b, c, d, x[i + 12], 6, 1700485571);
            d = j(d, a, b, c, x[i + 3], 10, -1894986606);
            c = j(c, d, a, b, x[i + 10], 15, -1051523);
            b = j(b, c, d, a, x[i + 1], 21, -2054922799);
            a = j(a, b, c, d, x[i + 8], 6, 1873313359);
            d = j(d, a, b, c, x[i + 15], 10, -30611744);
            c = j(c, d, a, b, x[i + 6], 15, -1560198380);
            b = j(b, c, d, a, x[i + 13], 21, 1309151649);
            a = j(a, b, c, d, x[i + 4], 6, -145523070);
            d = j(d, a, b, c, x[i + 11], 10, -1120210379);
            c = j(c, d, a, b, x[i + 2], 15, 718787259);
            b = j(b, c, d, a, x[i + 9], 21, -343485551);
            a = add(a, u);
            b = add(b, v);
            c = add(c, w);
            d = add(d, y);
        }
        return [ a, b, c, d ];
    }
    function md5(s, k, x, e) {
        k = k != undefined ? rstr_hmac_md5(utf16to8(k), s) : rstr_md5(s);
        return x > 1 ? e != undefined ? r2e(k, e) : k : x > 0 ? r2b64(k) : r2hex(k);
    }
    var rmd160_r1 = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ];
    var rmd160_r2 = [ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ];
    var rmd160_s1 = [ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ];
    var rmd160_s2 = [ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ];
    function rmd160_f(j, x, y, z) {
        return 0 <= j && j <= 15 ? x ^ y ^ z : 16 <= j && j <= 31 ? x & y | ~x & z : 32 <= j && j <= 47 ? (x | ~y) ^ z : 48 <= j && j <= 63 ? x & z | y & ~z : 64 <= j && j <= 79 ? x ^ (y | ~z) : NaN;
    }
    function rmd160_K1(j) {
        return 0 <= j && j <= 15 ? 0 : 16 <= j && j <= 31 ? 1518500249 : 32 <= j && j <= 47 ? 1859775393 : 48 <= j && j <= 63 ? 2400959708 : 64 <= j && j <= 79 ? 2840853838 : NaN;
    }
    function rmd160_K2(j) {
        return 0 <= j && j <= 15 ? 1352829926 : 16 <= j && j <= 31 ? 1548603684 : 32 <= j && j <= 47 ? 1836072691 : 48 <= j && j <= 63 ? 2053994217 : 64 <= j && j <= 79 ? 0 : NaN;
    }
    function binl_rmd160(x, len) {
        var h0 = 1732584193, h1 = 4023233417, h2 = 2562383102, h3 = 271733878, h4 = 3285377520, i = 0, T, A1, B1, C1, D1, E1, A2, B2, C2, D2, E2, j, l;
        x[len >> 5] |= 128 << len % 32;
        x[(len + 64 >>> 9 << 4) + 14] = len;
        for (l = x.length; i < l; i += 16) {
            A1 = h0;
            B1 = h1;
            C1 = h2;
            D1 = h3;
            E1 = h4;
            A2 = h0;
            B2 = h1;
            C2 = h2;
            D2 = h3;
            E2 = h4;
            for (j = 0; j <= 79; ++j) {
                T = add(A1, rmd160_f(j, B1, C1, D1));
                T = add(T, x[i + rmd160_r1[j]]);
                T = add(T, rmd160_K1(j));
                T = add(rol(T, rmd160_s1[j]), E1);
                A1 = E1;
                E1 = D1;
                D1 = rol(C1, 10);
                C1 = B1;
                B1 = T;
                T = add(A2, rmd160_f(79 - j, B2, C2, D2));
                T = add(T, x[i + rmd160_r2[j]]);
                T = add(T, rmd160_K2(j));
                T = add(rol(T, rmd160_s2[j]), E2);
                A2 = E2;
                E2 = D2;
                D2 = rol(C2, 10);
                C2 = B2;
                B2 = T;
            }
            T = add(h1, add(C1, D2));
            h1 = add(h2, add(D1, E2));
            h2 = add(h3, add(E1, A2));
            h3 = add(h4, add(A1, B2));
            h4 = add(h0, add(B1, C2));
            h0 = T;
        }
        return [ h0, h1, h2, h3, h4 ];
    }
    function rstr_rmd160(s) {
        return la2r(binl_rmd160(r2la(s), s.length * 8));
    }
    function rstr_hmac_rmd160(key, data) {
        var k = key, d = data, b = r2la(k), p = array(16), o = array(16), i = 0, x;
        if (b.length > 16) b = binl_rmd160(b, k.length * 8);
        for (;i < 16; i++) {
            x = b[i];
            p[i] = x ^ 909522486;
            o[i] = x ^ 1549556828;
        }
        return la2r(binl_rmd160(o.concat(binl_rmd160(p.concat(r2la(d)), 512 + d.length * 8)), 512 + 160));
    }
    function rmd160(s, k, x, e) {
        k = k != undefined ? rstr_hmac_rmd160(utf16to8(k), s) : rstr_rmd160(s);
        return x > 1 ? e != undefined ? r2e(k, e) : k : x > 0 ? r2b64(k) : r2hex(k);
    }
    var b64pad = "", chrsz = 8;
    function binb2str(b) {
        var c = chrsz, s = "", m = (1 << c) - 1, i = 0, l = b.length * 32;
        for (;i < l; i += c) {
            s += fromCC(b[i >> 5] >>> 32 - c - i % 32 & m);
        }
        return s;
    }
    function str2binb(s) {
        var b = [], c = chrsz, m = (1 << c) - 1, l = s.length * c, i = 0;
        for (;i < l; i += c) {
            b[i >> 5] |= (s.charCodeAt(i / c) & m) << 32 - c - i % 32;
        }
        return b;
    }
    function binb2b64(b) {
        var l = b.length, x = l * 4, y = l * 32, s = "", i = 0, j, t;
        for (;i < x; i += 3) {
            t = (b[i >> 2] >> 8 * (3 - i % 4) & 255) << 16 | (b[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4) & 255) << 8 | b[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4) & 255;
            for (j = 0; j < 4; j++) {
                s += i * 8 + j * 6 > y ? b64pad : b64.charAt(t >> 6 * (3 - j) & 63);
            }
        }
        return s;
    }
    function sha1_ft(t, b, c, d) {
        return t < 20 ? b & c | ~b & d : t < 40 ? b ^ c ^ d : t < 60 ? b & c | b & d | c & d : b ^ c ^ d;
    }
    function sha1_kt(t) {
        return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
    }
    function core_sha1(x, len) {
        var w = array(80), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776, l = len, i = 0, j, t, olda, oldb, oldc, oldd, olde;
        x[l >> 5] |= 128 << 24 - l % 32;
        x[(l + 64 >> 9 << 4) + 15] = l;
        for (;i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            olde = e;
            for (j = 0; j < 80; j++) {
                w[j] = j < 16 ? x[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                t = add(add(rol(a, 5), sha1_ft(j, b, c, d)), add(add(e, w[j]), sha1_kt(j)));
                e = d;
                d = c;
                c = rol(b, 30);
                b = a;
                a = t;
            }
            a = add(a, olda);
            b = add(b, oldb);
            c = add(c, oldc);
            d = add(d, oldd);
            e = add(e, olde);
        }
        return [ a, b, c, d, e ];
    }
    function core_hmac_sha1(k, d) {
        var b = str2binb(k), c = chrsz, f = core_sha1, p = [], o = [], i = 0, s;
        if (b.length > 16) {
            b = f(b, k.length * c);
        }
        for (;i < 16; i++) {
            s = b[i];
            p[i] = s ^ 909522486;
            o[i] = s ^ 1549556828;
        }
        return f(o.concat(f(p.concat(str2binb(d)), 512 + d.length * c)), 512 + 160);
    }
    function sha1(s, k, x) {
        k = k != undefined ? core_hmac_sha1(k, s) : core_sha1(str2binb(s), s.length * chrsz);
        return (x > 1 ? binb2str : x > 0 ? binb2b64 : b2hex)(k);
    }
    var sha256_K = [ 1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998 ];
    function sha256_S(X, n) {
        return X >>> n | X << 32 - n;
    }
    function sha256_R(X, n) {
        return X >>> n;
    }
    function sha256_Ch(x, y, z) {
        return x & y ^ ~x & z;
    }
    function sha256_Maj(x, y, z) {
        return x & y ^ x & z ^ y & z;
    }
    function sha256_Sigma0256(x) {
        return sha256_S(x, 2) ^ sha256_S(x, 13) ^ sha256_S(x, 22);
    }
    function sha256_Sigma1256(x) {
        return sha256_S(x, 6) ^ sha256_S(x, 11) ^ sha256_S(x, 25);
    }
    function sha256_Gamma0256(x) {
        return sha256_S(x, 7) ^ sha256_S(x, 18) ^ sha256_R(x, 3);
    }
    function sha256_Gamma1256(x) {
        return sha256_S(x, 17) ^ sha256_S(x, 19) ^ sha256_R(x, 10);
    }
    function sha256_Sigma0512(x) {
        return sha256_S(x, 28) ^ sha256_S(x, 34) ^ sha256_S(x, 39);
    }
    function sha256_Sigma1512(x) {
        return sha256_S(x, 14) ^ sha256_S(x, 18) ^ sha256_S(x, 41);
    }
    function sha256_Gamma0512(x) {
        return sha256_S(x, 1) ^ sha256_S(x, 8) ^ sha256_R(x, 7);
    }
    function sha256_Gamma1512(x) {
        return sha256_S(x, 19) ^ sha256_S(x, 61) ^ sha256_R(x, 6);
    }
    function binb_sha256(m, l) {
        var H = [ 1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225 ], W = array(64), a, b, c, d, e, f, g, h, i = 0, j, x, T1, T2;
        m[l >> 5] |= 128 << 24 - l % 32;
        m[(l + 64 >> 9 << 4) + 15] = l;
        for (x = m.length; i < x; i += 16) {
            a = H[0];
            b = H[1];
            c = H[2];
            d = H[3];
            e = H[4];
            f = H[5];
            g = H[6];
            h = H[7];
            for (j = 0; j < 64; j++) {
                W[j] = j < 16 ? m[j + i] : add(add(add(sha256_Gamma1256(W[j - 2]), W[j - 7]), sha256_Gamma0256(W[j - 15])), W[j - 16]);
                T1 = add(add(add(add(h, sha256_Sigma1256(e)), sha256_Ch(e, f, g)), sha256_K[j]), W[j]);
                T2 = add(sha256_Sigma0256(a), sha256_Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = add(d, T1);
                d = c;
                c = b;
                b = a;
                a = add(T1, T2);
            }
            H[0] = add(a, H[0]);
            H[1] = add(b, H[1]);
            H[2] = add(c, H[2]);
            H[3] = add(d, H[3]);
            H[4] = add(e, H[4]);
            H[5] = add(f, H[5]);
            H[6] = add(g, H[6]);
            H[7] = add(h, H[7]);
        }
        return H;
    }
    function rstr_sha256(s) {
        return binb2r(binb_sha256(r2binb(s), s.length * 8));
    }
    function rstr_hmac_sha256(k, a) {
        var b = r2binb(k), p = array(16), o = array(16), i = 0;
        if (b.length > 16) {
            b = binb_sha256(b, k.length * 8);
        }
        for (;i < 16; i++) {
            k = b[i];
            p[i] = k ^ 909522486;
            o[i] = k ^ 1549556828;
        }
        return binb2r(binb_sha256(o.concat(binb_sha256(p.concat(r2binb(a)), 512 + a.length * 8)), 512 + 256));
    }
    function sha256(s, k, x, e) {
        k = k != undefined ? rstr_hmac_sha256(utf16to8(k), s) : rstr_sha256(s);
        return x > 1 ? e != undefined ? r2e(k, e) : k : x > 0 ? r2b64(k) : r2hex(k);
    }
    var i64h = [ 1779033703, -205731576, -1150833019, -2067093701, 1013904242, -23791573, -1521486534, 1595750129, 1359893119, -1377402159, -1694144372, 725511199, 528734635, -79577749, 1541459225, 327033209 ], i64w = dim(80 * 2, 0), sha512_k = int64arr([], [ 1116352408, -685199838, 1899447441, 602891725, -1245643825, -330482897, -373957723, -2121671748, 961987163, -213338824, 1508970993, -1241133031, -1841331548, -1357295717, -1424204075, -630357736, -670586216, -1560083902, 310598401, 1164996542, 607225278, 1323610764, 1426881987, -704662302, 1925078388, -226784913, -2132889090, 991336113, -1680079193, 633803317, -1046744716, -815192428, -459576895, -1628353838, -272742522, 944711139, 264347078, -1953704523, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, -1119749164, 1996064986, -2096016459, -1740746414, -295247957, -1473132947, 766784016, -1341970488, -1728372417, -1084653625, -1091629340, -958395405, 1034457026, -710438585, -1828018395, 113926993, -536640913, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, -1651133473, 1695183700, -1951439906, 1986661051, 1014477480, -2117940946, 1206759142, -1838011259, 344077627, -1564481375, 1290863460, -1474664885, -1136513023, -1035236496, -789014639, -949202525, 106217008, -778901479, -688958952, -694614492, 1432725776, -200395387, 1467031594, 275423344, 851169720, 430227734, -1194143544, 506948616, 1363258195, 659060556, -544281703, 883997877, -509917016, 958139571, -976659869, 1322822218, -482243893, 1537002063, 2003034995, 1747873779, -692930397, 1955562222, 1575990012, 2024104815, 1125592928, -2067236844, -1578062990, -1933114872, 442776044, -1866530822, 593698344, -1538233109, -561857047, -1090935817, -1295615723, -965641998, -479046869, -903397682, -366583396, -779700025, 566280711, -354779690, -840897762, -176337025, -294727304, 116418474, 1914138554, 174292421, -1563912026, 289380356, -1090974290, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, -1676669620, 1288033470, -885112138, 1501505948, -60457430, 1607167915, 987167468, 1816402316, 1246189591 ]);
    function int64(h, l) {
        this.h = h;
        this.l = l;
    }
    function int64arr(d, a) {
        var n = 0, l = a.length;
        while (n < l) {
            d.push(new int64(a[n++], a[n++]));
        }
        return d;
    }
    function int64add(dst, x, y) {
        var w0 = (x.l & 65535) + (y.l & 65535), w1 = (x.l >>> 16) + (y.l >>> 16) + (w0 >>> 16), w2 = (x.h & 65535) + (y.h & 65535) + (w1 >>> 16), w3 = (x.h >>> 16) + (y.h >>> 16) + (w2 >>> 16);
        dst.l = w0 & 65535 | w1 << 16;
        dst.h = w2 & 65535 | w3 << 16;
    }
    function int64add4(dst, a, b, c, d) {
        var w0 = (a.l & 65535) + (b.l & 65535) + (c.l & 65535) + (d.l & 65535), w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (w0 >>> 16), w2 = (a.h & 65535) + (b.h & 65535) + (c.h & 65535) + (d.h & 65535) + (w1 >>> 16), w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (w2 >>> 16);
        dst.l = w0 & 65535 | w1 << 16;
        dst.h = w2 & 65535 | w3 << 16;
    }
    function int64add5(dst, a, b, c, d, e) {
        var w0 = (a.l & 65535) + (b.l & 65535) + (c.l & 65535) + (d.l & 65535) + (e.l & 65535), w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (w0 >>> 16), w2 = (a.h & 65535) + (b.h & 65535) + (c.h & 65535) + (d.h & 65535) + (e.h & 65535) + (w1 >>> 16), w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (w2 >>> 16);
        dst.l = w0 & 65535 | w1 << 16;
        dst.h = w2 & 65535 | w3 << 16;
    }
    function int64rrot(dst, x, shift) {
        dst.l = x.l >>> shift | x.h << 32 - shift;
        dst.h = x.h >>> shift | x.l << 32 - shift;
    }
    function int64revrrot(dst, x, shift) {
        dst.l = x.h >>> shift | x.l << 32 - shift;
        dst.h = x.l >>> shift | x.h << 32 - shift;
    }
    function int64shr(dst, x, shift) {
        dst.l = x.l >>> shift | x.h << 32 - shift;
        dst.h = x.h >>> shift;
    }
    function int64copy(dst, src) {
        dst.h = src.h;
        dst.l = src.l;
    }
    function binb_sha512(x, len) {
        var H = int64arr([], i64h), T1 = new int64(0, 0), T2 = new int64(0, 0), a = new int64(0, 0), b = new int64(0, 0), c = new int64(0, 0), d = new int64(0, 0), e = new int64(0, 0), f = new int64(0, 0), g = new int64(0, 0), h = new int64(0, 0), s0 = new int64(0, 0), s1 = new int64(0, 0), Ch = new int64(0, 0), Maj = new int64(0, 0), r1 = new int64(0, 0), r2 = new int64(0, 0), r3 = new int64(0, 0), j, i = 0, l, w, W = int64arr([], i64w), z = array(16);
        x[len >> 5] |= 128 << 24 - (len & 31);
        x[(len + 128 >> 10 << 5) + 31] = len;
        for (l = x.length; i < l; i += 32) {
            int64copy(a, H[0]);
            int64copy(b, H[1]);
            int64copy(c, H[2]);
            int64copy(d, H[3]);
            int64copy(e, H[4]);
            int64copy(f, H[5]);
            int64copy(g, H[6]);
            int64copy(h, H[7]);
            for (j = 0; j < 16; j++) {
                w = W[j];
                w.h = x[i + 2 * j];
                w.l = x[i + 2 * j + 1];
            }
            for (j = 16; j < 80; j++) {
                int64rrot(r1, W[j - 2], 19);
                int64revrrot(r2, W[j - 2], 29);
                int64shr(r3, W[j - 2], 6);
                s1.l = r1.l ^ r2.l ^ r3.l;
                s1.h = r1.h ^ r2.h ^ r3.h;
                int64rrot(r1, W[j - 15], 1);
                int64rrot(r2, W[j - 15], 8);
                int64shr(r3, W[j - 15], 7);
                s0.l = r1.l ^ r2.l ^ r3.l;
                s0.h = r1.h ^ r2.h ^ r3.h;
                int64add4(W[j], s1, W[j - 7], s0, W[j - 16]);
            }
            for (j = 0; j < 80; j++) {
                Ch.l = e.l & f.l ^ ~e.l & g.l;
                Ch.h = e.h & f.h ^ ~e.h & g.h;
                int64rrot(r1, e, 14);
                int64rrot(r2, e, 18);
                int64revrrot(r3, e, 9);
                s1.l = r1.l ^ r2.l ^ r3.l;
                s1.h = r1.h ^ r2.h ^ r3.h;
                int64rrot(r1, a, 28);
                int64revrrot(r2, a, 2);
                int64revrrot(r3, a, 7);
                s0.l = r1.l ^ r2.l ^ r3.l;
                s0.h = r1.h ^ r2.h ^ r3.h;
                Maj.l = a.l & b.l ^ a.l & c.l ^ b.l & c.l;
                Maj.h = a.h & b.h ^ a.h & c.h ^ b.h & c.h;
                int64add5(T1, h, s1, Ch, sha512_k[j], W[j]);
                int64add(T2, s0, Maj);
                int64copy(h, g);
                int64copy(g, f);
                int64copy(f, e);
                int64add(e, d, T1);
                int64copy(d, c);
                int64copy(c, b);
                int64copy(b, a);
                int64add(a, T1, T2);
            }
            int64add(H[0], H[0], a);
            int64add(H[1], H[1], b);
            int64add(H[2], H[2], c);
            int64add(H[3], H[3], d);
            int64add(H[4], H[4], e);
            int64add(H[5], H[5], f);
            int64add(H[6], H[6], g);
            int64add(H[7], H[7], h);
        }
        for (i = 0; i < 8; i++) {
            j = 2 * i;
            z[j] = H[i].h;
            z[j + 1] = H[i].l;
        }
        return z;
    }
    function rstr_sha512(s) {
        return binb2r(binb_sha512(r2binb(s), s.length * 8));
    }
    function rstr_hmac_sha512(k, a) {
        var b = r2binb(k), p = array(32), o = array(32), i = 0;
        if (b.length > 32) {
            b = binb_sha512(b, k.length * 8);
        }
        for (;i < 32; i++) {
            p[i] = b[i] ^ 909522486;
            o[i] = b[i] ^ 1549556828;
        }
        return binb2r(binb_sha512(o.concat(binb_sha512(p.concat(r2binb(a)), 1024 + a.length * 8)), 1024 + 512));
    }
    function sha512(s, k, x, e) {
        k = k != undefined ? rstr_hmac_sha512(utf16to8(k), s) : rstr_sha512(s);
        return x > 1 ? e != undefined ? r2e(k, e) : k : x > 0 ? r2b64(k) : r2hex(k);
    }
    function uuid1(o, c, m, n) {
        var s = rng(), e = [ s[0] | 1, s[1], s[2], s[3], s[4], s[5] ], k = (s[6] << 8 | s[7]) & 16383, x = 0, y = 0, i = 0, z = 6, b = [], t, h, d;
        o = o || e;
        c = c != undefined ? c : k;
        m = m != undefined ? m : new Date().getTime();
        n = n != undefined ? n : y + 1;
        d = m - x + (n - y) / 1e4;
        if (d < 0 && c == undefined) {
            c = c + 1 & 16383;
        }
        if ((d < 0 || m > x) && n == undefined) {
            n = 0;
        }
        if (n >= 1e4) throw new Error();
        x = m;
        y = n;
        k = c;
        m += 122192928e5;
        t = ((m & 268435455) * 1e4 + n) % 4294967296;
        b[i++] = t >>> 24 & 255;
        b[i++] = t >>> 16 & 255;
        b[i++] = t >>> 8 & 255;
        b[i++] = t & 255;
        h = m / 4294967296 * 1e4 & 268435455;
        b[i++] = h >>> 8 & 255;
        b[i++] = h & 255;
        b[i++] = h >>> 24 & 15 | 16;
        b[i++] = h >>> 16 & 255;
        b[i++] = c >>> 8 | 128;
        b[i++] = c & 255;
        for (;z--; ) {
            b[i + z] = o[z];
        }
        return unparse(b);
    }
    function uuid3(n, d) {
        return out(n, d, md5, 3);
    }
    function uuid4(m, g) {
        var r = m || (g || rng)();
        r[6] = r[6] & 15 | 64;
        r[8] = r[8] & 63 | 128;
        return unparse(r);
    }
    function uuid5(n, d) {
        return out(n, d, sha1, 5);
    }
    shell.Hash = shell.Hash || Hash;
    return cp(Hash, {
        md5: md5,
        rmd160: rmd160,
        sha1: sha1,
        sha256: sha256,
        sha512: sha512,
        uuid1: uuid1,
        uuid3: uuid3,
        uuid4: uuid4,
        uuid5: uuid5
    });
});