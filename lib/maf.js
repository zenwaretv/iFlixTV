// Copyright 2005-2015 Metrological
// All Rights Reserved.
(function (m, R, r) {
    function X() {
    }

    function kb(a) {
        return R.body.retrieve(a)
    }

    function Y(a) {
        return a !== r
    }

    function ba(a) {
        return a === r
    }

    function Oa(a) {
        return C.slice.call(a || [])
    }

    function Ba(a, b) {
        return pb.hasOwnProperty.call(a, b)
    }

    function ma(a, b) {
        return parseInt(a, b || 10)
    }

    function Pc(a, b) {
        a !== r && (ra[a] = b)
    }

    function w(a) {
        return ra[a] !== r ? ra[a] : p[a]
    }

    function Qb(a) {
        return x.floor(x.random() * (a || 1E3))
    }

    function z(a) {
        if (ba(a))return "undefined";
        if (null === a)return "null";
        if (Y(a.constructor))switch (a.constructor) {
            case q:
                if ("number" === typeof a.length) {
                    if (a.callee)return "arguments";
                    if (a.item)return "collection"
                }
                return "object";
            case V:
                return "array";
            case wb:
                return isFinite(a) ? "number" : !1;
            case ka:
                return "date";
            default:
                if (a && Y(a._classID))return "instance";
                if (a && Y(a.nodeName))return "element";
                if (a && Y(a.helpers))return "class"
        }
        return typeof a
    }

    function Rb(a, b) {
        b = b || {};
        for (var d in b)Y(b[d]) && Ba(b, d) && (a[d] = b[d]);
        return a
    }

    function ua(a) {
        var b;
        switch (z(a)) {
            case "object":
                b = {};
                for (var d in a)Y(a[d]) && (b[d] = ua(a[d]) || a[d]);
                break;
            case "array":
                b =
                    [];
                d = 0;
                for (var c = a.length; d < c; d++)b[d] = ua(a[d]);
                break;
            default:
                return a
        }
        return b
    }

    function Yb(a) {
        if (ba(a) || null === a)return !0;
        var b = z(a);
        switch (b) {
            case "array":
            case "string":
                return 0 < a.length ? !1 : !0;
            case "number":
                return !1;
            default:
                return b ? !1 : !0
        }
    }

    function Ga() {
        for (var a = {}, b = 0, d = arguments.length; b < d; b++) {
            var c = arguments[b];
            if ("object" === z(c))for (var f in c)if (Y(c[f]) && Ba(c, f)) {
                var e = c[f], k = a[f];
                a[f] = "object" === z(e) && "object" === z(k) ? Ga(k, e) : ua(e)
            }
        }
        return a
    }

    function Qc(a, b, d) {
        var c = {};
        if (!a)return c;
        ba(d) &&
        (d = function (c) {
            return c
        });
        for (var f; f = b.exec(a);)c[f[1]] = d(f[2]);
        return c
    }

    function qb(a) {
        return a && Qc(a, /([^&=]*)=([^&]*)/g)
    }

    function Rc(a) {
        return a.replace(/\\u([0-9a-fA-F]{4})/g, function (a, d) {
            return Va(ma(d, 16))
        })
    }

    function za(a) {
        return a && a.toLowerCase() || ""
    }

    function Pa(a) {
        return a && a.toUpperCase() || ""
    }

    function Sc(a, b, d) {
        switch (z(b)) {
            case "object":
                return q.contains(a, b, d || !1);
            case "array":
            case "string":
                return -1 < b.indexOf(a)
        }
        return !0
    }

    function Tc(a) {
        var b = z(a);
        return b ? -1 === ["array", "arguments"].indexOf(b) ?
            [a] : a : []
    }

    function Uc(a, b, d, c, f) {
        a = a || 0;
        d = d || {};
        f = f || !1;
        c = "array" !== z(c) ? [c] : c;
        var e = "string" === z(b) ? d[b] : b, k;
        b = function () {
            e.apply(d, c)
        };
        k = f ? Mb(b, a) : Eb(b, a);
        return {
            interval: f ? a : 0, cancel: function () {
                this.interval ? Sb(k) : db(k)
            }
        }
    }

    function xb(a) {
        return (!0 !== w("jsdelivr") ? "//" + fa[1] + "." + ca + ".com/jsdelivr/" : "//cdn.jsdelivr.net/") + a
    }

    function Zb(a, b, d) {
        return p.version ? (d ? "http:" : "") + "//" + fa[1] + "." + ca + ".com/storage/r/" + p.version + "/" + b + "/" + a : p.versions && p.versions[b] && "maf" === b ? (d ? "http:" : "") + "//" + fa[1] + "." +
        ca + ".com/s/lib/" + p.versions[b] + "/" + a : p.versions && p.versions[b] ? (d ? "http:" : "") + "//" + fa[1] + "." + ca + ".com/s/" + b + "/" + p.versions[b] + "/" + a : p.versions && b ? (d ? "http:" : "") + "//" + fa[1] + "." + ca + ".com/s/" + b + "/" + a : "" + b + "/" + a
    }

    function $b(a, b, d) {
        b = b || p.direct;
        var c = "";
        !0 === d && (c += "&ct=ig");
        return "//" + fa[!0 === b ? 3 : 1] + "." + ca + ".com/" + (!0 !== b ? fa[3] : "") + "?url=" + encodeURIComponent(a) + c
    }

    function Vc() {
        var a = arguments, b = 0, d = function (a, c, b, d) {
            b || (b = " ");
            c = a.length >= c ? "" : V(1 + c - a.length >>> 0).join(b);
            return d ? a + c : c + a
        }, c = function (a,
                         c, b, f, Db, l) {
            var D = f - a.length;
            0 < D && (a = b || !Db ? d(a, f, l, b) : a.slice(0, c.length) + d("", D, "0", !0) + a.slice(c.length));
            return a
        }, f = function (a, b, f, Db, y, l, D) {
            a >>>= 0;
            f = f && a && {2: "0b", 8: "0", 16: "0x"}[b] || "";
            a = f + d(a.toString(b), l || 0, "0", !1);
            return c(a, f, Db, y, D)
        };
        return a[b++].replace(/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g, function (e, k, g, L, y, l, D) {
            var n, ia;
            if ("%%" === e)return "%";
            var h = !1;
            ia = "";
            var Da = y = !1;
            n = " ";
            for (var m = g.length, T = 0; g && T < m; T++)switch (g.charAt(T)) {
                case " ":
                    ia =
                        " ";
                    break;
                case "+":
                    ia = "+";
                    break;
                case "-":
                    h = !0;
                    break;
                case "'":
                    n = g.charAt(T + 1);
                    break;
                case "0":
                    y = !0;
                    break;
                case "#":
                    Da = !0
            }
            L = L ? "*" === L ? +a[b++] : "*" === L.charAt(0) ? +a[L.slice(1, -1)] : +L : 0;
            0 > L && (L = -L, h = !0);
            if (!isFinite(L))throw Qa("Minimum width must be finite");
            l = l ? "*" === l ? +a[b++] : "*" === l.charAt(0) ? +a[l.slice(1, -1)] : +l : -1 < "fFeE".indexOf(D) ? 6 : "d" === D ? 0 : r;
            k = k ? a[k.slice(0, -1)] : a[b++];
            switch (D) {
                case "s":
                    return D = M(k), l && (D = D.slice(0, l)), c(D, "", h, L, y, n);
                case "c":
                    return D = Va(+k), l && (D = D.slice(0, l)), c(D, "", h, L, y,
                        void 0);
                case "b":
                    return f(k, 2, Da, h, L, l, y);
                case "o":
                    return f(k, 8, Da, h, L, l, y);
                case "x":
                    return f(k, 16, Da, h, L, l, y);
                case "X":
                    return Pa(f(k, 16, Da, h, L, l, y));
                case "u":
                    return f(k, 10, Da, h, L, l, y);
                case "i":
                case "d":
                    return n = +k || 0, n = x.round(n - n % 1), e = 0 > n ? "-" : ia, k = e + d(M(x.abs(n)), l, "0", !1), c(k, e, h, L, y);
                case "e":
                case "E":
                case "f":
                case "F":
                case "g":
                case "G":
                    return n = +k, e = 0 > n ? "-" : ia, ia = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(za(D))], D = ["toString", "toUpperCase"]["eEfFgG".indexOf(D) % 2], k = e + x.abs(n)[ia](l),
                        c(k, e, h, L, y)[D]();
                default:
                    return e
            }
        })
    }

    function zc(a, b, d) {
        a = a.split(".");
        var c = b;
        for (b = 0; b < a.length; b++)ba(c[a[b]]) && (c[a[b]] = d && b === a.length - 1 ? d() : {}), c = c[a[b]];
        return a[0]
    }

    function a(a, b, d) {
        a && a.__defineGetter__(b, d)
    }

    function N(a, b, d) {
        a && a.__defineSetter__(b, d)
    }

    function Ac() {
        return R.createDocumentFragment()
    }

    function La(a) {
        return R.createElement(a || "div")
    }

    function Wc(a) {
        var b = La("iframe").addClass("iframe");
        a && (rb.original ? rb.original.call(b, "id", a) : b.setAttribute("id", a));
        b.frozen = !0;
        b.wantsFocus = !0;
        return b
    }

    function Bc(a) {
        var b = La().addClass("window");
        a && (rb.original ? rb.original.call(b, "id", a) : b.setAttribute("id", a));
        b.store("type", "window");
        b.frozen = !0;
        b.wantsFocus = !0;
        return b
    }

    function jc(a, b) {
        return m.getComputedStyle(a, b || null)
    }

    function yb(a, b) {
        return jc(a).getPropertyValue(b)
    }

    function lb(a, b) {
        if (!ba(b) && a) {
            b = b.hyphenate();
            var d = yb(a, b);
            if (d && "auto" !== d && "inherit" !== d)return d;
            d = a.style[b];
            switch (d) {
                case "inherit":
                    if (d = a.parentNode) {
                        for (; d && (!d.style || !d.style[b]);) {
                            if (d === Ha)return;
                            d =
                                d.parentNode
                        }
                        return d && d.style && d.style[b]
                    }
                    return;
                case "auto":
                    if ("width" === b || "height" === b)if (d = yb(a, "min-" + b))break;
                    return
            }
            return d
        }
    }

    function rb(a, b, d) {
        a.setAttribute(b, d)
    }

    function ac(a, b) {
        a = a || "";
        b = b || kc;
        var d;
        Fb.test(a) ? (d = La("link"), d.setAttribute("type", "text/css"), d.setAttribute("charset", "utf-8"), d.setAttribute("rel", "stylesheet"), d.setAttribute("href", a)) : (d = La("style"), d.setAttribute("type", "text/css"), d.setAttribute("charset", "utf-8"), d.setAttribute("rel", "stylesheet"), d.styleSheet ? d.styleSheet.cssText =
            a : d.appendChild(R.createTextNode(a || "")));
        b.appendChild(d);
        return d
    }

    function sb(a, b, d) {
        var c = La("script");
        c.setAttribute("type", "text/javascript");
        c.setAttribute("charset", "utf-8");
        c.src = a;
        b && b.call && (c.onreadystatechange = function () {
            "complete" === this.readyState && b()
        }, c.onload = b);
        d && d.call && (c.onerror = d);
        return kc.appendChild(c)
    }

    function Xc(a, b) {
        a = a || "";
        return eb(b ? "<" + a + "(?!\\w)[^>]*>([\\s\\S]*?)</" + a + "(?!\\w)>" : "</?" + a + "([^>]+)?>", "gi")
    }

    function Ia(a, b, d, c) {
        return new Nb(a, {
            detail: b || null, bubbles: !0 ===
            d, cancelable: !0 === c
        })
    }

    function Cc(a) {
        a = (a || "leftTop").dasherize().split("-") || [];
        1 <= a.length && (1 === a.length ? "justify" === a[0] ? a[1] = null : "center" === a[0] && (a[1] = "middle") : "center" === a[1] ? a[1] = "middle" : "left" === a[1] && (a[1] = null), "top" === a[0] && (a[0] = null));
        return a
    }

    function Dc(a) {
        return isNaN(a) ? a.indexOf("em") ? 24 * parseFloat(a) : parseFloat(a) : a || 0
    }

    function Ec(a, b) {
        var d = {width: 0, height: 0}, c = R.getElementById("textrenderer");
        if (!b && (a.clientWidth && a.clientHeight || a.scrollWidth && a.scrollHeight))d.width = a.clientWidth ||
            a.scrollWidth, d.height = a.clientHeight || a.scrollHeight; else if (c) {
            var f = a.parentNode, e = f && f.wrap || !1, k = f && !b && ma(lb(f, "width")) || 0, g = f && f.style || {};
            if (!b && e && (!k || isNaN(k)))return d;
            c.setStyles({
                minHeight: g.minHeight || null,
                whiteSpace: !b && e ? "normal" : "nowrap",
                wordWrap: !b && e ? "break-word" : "normal",
                fontSize: g.fontSize || null,
                fontWeight: g.fontWeight || null
            });
            c.html = f.data;
            d.width = !b && e && k && c.clientWidth > k ? c.style.width = k : c.clientWidth;
            d.height = c.clientHeight;
            c.html = "";
            c.width = null;
            c.removeAttribute("style")
        }
        return d
    }

    function Yc(a) {
        var b = a.parentNode, d = b && b.height || 0, c;
        c = a.html = a.html.stripTags().trim();
        b = d / (b && b.textHeight || 0);
        0 < b && 1 > b && (b = x.ceil(c.length * b), a.html = c.truncate(b))
    }

    function bc() {
        if (Z.hash)return Z.hash;
        var a = Z.href.split("#");
        a.shift();
        return "#" + a.join("#")
    }

    function Zc() {
        Z.reload()
    }

    function mb(a) {
        a = a || 0;
        a = !isNaN(a) && 0 < a ? ka.now() - a : 0;
        return !isNaN(a) && 0 < a && 1728E5 > a ? x.floor(a / 1E3) : 0
    }

    function $c(a) {
        return ad[a]
    }

    function lc(Db) {
        a(Db, "key", function () {
            var a = this.keyCode || this.which, d = this.altKey || !1,
                c = this.ctrlKey || !1, f = this.shiftKey || !1, d = d && f ? fb.altshift[a] : c ? fb.ctrl[a] : f ? fb.shift[a] : d ? fb.alt[a] : fb.normal[a];
            d || !this.isChar && !this.isNumeric || (d = Va(a) || a) && (d = f ? Pa(d) : za(d));
            !this.isChar && d && 1 === d.length && (isNaN(d) ? this.isExtendedChar = !0 : this.isExtendedNumeric = !0);
            return d
        });
        a(Db, "isChar", function () {
            var a = this.keyCode || this.which;
            return 65 <= a && 90 >= a || 97 <= a && 122 >= a || !1
        });
        a(Db, "isNumeric", function () {
            var a = this.keyCode || this.which;
            return 48 <= a && 57 >= a || !1
        })
    }

    var tb = +new Date, Gb = R.getElementsByTagName("html")[0],
        kc = R.head || R.getElementsByTagName("head")[0], Ha, nb = R.implementation, Z = m.location, mc = m.navigator, Za = m.history, Ma = m.console, nc = m.WebSocket, Aa = m.md5, q = Object, V = Array, ub = Function, wb = Number, oc = Boolean, ka = Date, M = String, x = Math, eb = RegExp, Qa = Error, pc = m.btoa, Fc = m.atob, C = V.prototype, xa = ub.prototype, la = M.prototype, pb = q.prototype, bd = ka.prototype, Gc = wb.prototype, Hc = pb.toString, gb = new TypeError, qc = ub("return delete this"), Eb = m.setTimeout, db = m.clearTimeout, Mb = m.setInterval, Sb = m.clearInterval, Va = M.fromCharCode, $a =
            m.XMLHttpRequest || m.ActiveXObject && m.ActiveXObject("Microsoft.XMLHTTP"), ga = m.JSON, ob = 0, hb = 0, cc = 0, Nb = m.CustomEvent, Ic = {
            parse: function (a) {
                if ("string" === typeof a) {
                    if (m.DOMParser)return (new m.DOMParser).parseFromString(a, "text/xml");
                    if (m.ActiveXObject) {
                        var b = new m.ActiveXObject("Microsoft.XMLDOM");
                        b.async = !1;
                        return b.loadXML(a)
                    }
                    throw Qa("DOMParser not supported");
                }
                return a || r
            }
        }, fa = "jsonip cdn image proxy jslint stats mms payment apps".split(" "), ca = M("metrological"), Jc = {
            nl: "Nederlands", en: "English", fr: "Fran\u00e7ais",
            de: "Deutsch", it: "Italiano", pl: "Polszczyzna", hu: "Magyar"
        }, Fb = eb("^(https?:)?//"), Tb = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:[\s]+\/\/(?:.*)$)/gm, rc = /[^.]\s*include\s*\(\s*["']([^'"\s]+)["']\s*\)/g, Ob = M('html,body{height:100%}.view::-webkit-scrollbar{display:none;}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure, figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark{margin:0;padding:0;border:0;vertical-align: baseline;}body{overflow:hidden;margin:0;padding:0;color:white;font:24px/1 "Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif;background-color:transparent;line-height:1}[tabindex]{outline:0;}img:not([src]),img[src=""],video:not([src]),video[src=""]{display:none}.frame,.text,.view,.dialog,.window,.canvas,.iframe{position:absolute;overflow:hidden;}.frame,.view,.dialog,.window,.canvas,.iframe{top:0;left:0}.window{width:1920px;height:1080px}.iframe{width:inherit;height:inherit}.upscale720{width:1280px;height:720px;-webkit-transform:scale(1.5);-webkit-transform-origin:0 0}.list{margin:0;padding:0;list-style:none;overflow:hidden}.item{display:inline-block;position:relative;overflow:hidden}.image{position:absolute}.frame,.text,.list,.item,.image{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.text{white-space:nowrap;line-height:130%;min-height:1.3em}.text:before{content:"";display:inline-block;height:100%;vertical-align:middle}.innerText{display:inline-block;width:inherit;vertical-align:top;cursor:default}.innerText *{max-width:100%}.frozen,audio{display:none}.frozenText{clip:rect(0px,0px,0px,0px)}.skin{width:100%;height:100%}.scrollText{-webkit-marquee:left medium infinite scroll normal;overflow-x: -webkit-marquee;}.scrollText .innerText{overflow:visible !important;text-overflow:clip !important;}.innerText[contenteditable="true"]{cursor:auto}#textrenderer{display:block;left:0;top:0;visibility:hidden;overflow:visible}#textrenderer *{max-width:100%}a{color:inherit}a:link{text-decoration:none}p{margin:0 0 1em 0;white-space:inherit;word-wrap:inherit;font-size:inherit}.noBorderBox{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.fa-half{font-size:50%}.fa-middle{vertical-align:middle}.sd .innerText{font-size:115%}'),
        Kc = M("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), cd = M("data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs="), dd = M("data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), ed = M("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAGUlEQVQoz2NQacCEDNjAqEI6KxwNiUGqEAAeh4AhmRJYkwAAAABJRU5ErkJggg=="), fb = {
            normal: {
                38: "up",
                40: "down",
                37: "left",
                39: "right",
                13: "enter",
                8: "back",
                32: "space",
                16: "shift",
                33: "channel-up",
                34: "channel-down",
                9: "tab",
                59: ";",
                190: ".",
                188: ",",
                189: "-",
                187: "=",
                219: "[",
                173: "-",
                221: "]",
                186: ";",
                222: "'",
                191: "/",
                192: "`",
                163: "\u00a3",
                167: "\u00a7",
                8364: "\u20ac",
                232: "\u00e8",
                251: "\u00fb",
                244: "\u00f4",
                224: "\u00e0",
                233: "\u00e9",
                234: "\u00ea",
                252: "\u00fc",
                246: "\u00f6",
                228: "\u00e4",
                946: "\u00df",
                231: "\u00e7",
                220: "\\",
                214: "\u00d6",
                196: "\u00c4",
                200: "\u00c8",
                212: "\u00d4",
                201: "\u00c9",
                202: "\u00ca",
                223: "\u00df",
                168: "\u00a8",
                199: "\u00c7",
                112: "red",
                113: "green",
                114: "blue",
                115: "yellow",
                20: "capslock",
                46: "delete",
                27: "home"
            },
            alt: {
                70: "\u00e8",
                53: "\u20ac",
                71: "\u00fb",
                72: "\u00f4",
                74: "\u00e0",
                83: "\u00df",
                75: "\u00ea",
                89: "\u00fc",
                80: "\u00f6",
                81: "\u00e4",
                69: "\u00e9",
                188: "\u00e7",
                50: "\u20ac",
                67: "\u00e7",
                73: "\u00ee",
                77: "mute",
                221: "reload"
            },
            shift: {
                16: "shift",
                8: "backspace",
                13: "enter",
                32: "space",
                37: "rewind",
                39: "forward",
                38: "playpause",
                40: "stop",
                48: ")",
                49: "!",
                50: "@",
                51: "#",
                52: "$",
                53: "%",
                54: "^",
                55: "&",
                56: "*",
                57: "(",
                186: ":",
                222: '"',
                220: "|",
                219: "{",
                221: "}",
                191: "?",
                190: ">",
                188: "<",
                189: "_",
                187: "+",
                192: "~",
                61: "+",
                173: "_",
                59: ":",
                27: "menu"
            },
            altshift: {
                70: "\u00c8",
                71: "\u00db",
                79: "\u00d4",
                74: "\u00c0",
                75: "\u00ca",
                52: "\u00a3",
                83: "\u00a7",
                89: "\u00dc",
                80: "\u00d6",
                81: "\u00c4",
                72: "\u00d4",
                69: "\u00c9",
                222: "\u00a8",
                188: "\u00c7"
            },
            ctrl: {}
        }, p = m.MAE || {}, ra = p.settings || {}, sc = ra.metadata || {}, Ub = p.search ? p.search.blacklist || [] : ra.blacklist || [], vb = p.hacks || ra.hacks || {}, ib = [], zb = M("en-EU"), ab = !1, Ab = "transform", Lc = "transform-origin", Ea = 1, Ja = 1, Hb = "mousemove", Pb = "mouseout", na, Ua, dc;
    if (p.ipv6)fa[1] += "-ipv6"; else if (p.cdn || ra.cdn)fa[1] = (p.cdn || ra.cdn) + "." + fa[1];
    if (p.background ||
        ra.background)Ob += "body{background-color:" + (p.background || ra.background || "black") + "}";
    var Ka = bc().split("?"), ad = 2 === Ka.length && qb(Ka[1]) || {}, ec, Ib = X, fc = X, gc = X;
    if (!function () {
            var a = Z.href.split("#")[0];
            if (a && -1 !== Z.href.indexOf("#/")) {
                if ("metrological" === w("middleware"))return !1;
                Z.href = a.split("?")[0] + "#boot" + (1 < Ka.length ? "?" + Ka[1] : "");
                Eb(Zc, 1E3);
                return !0
            }
            return a && -1 !== a.indexOf("?") && -1 === a.indexOf("direct=") ? (Z.href = a.split("?")[0] + (Ka[0] || "#") + (1 < Ka.length ? "?" + Ka[1] : ""), !0) : !1
        }()) {
        (function () {
            if (!Y(m.MAF)) {
                m.MAF =
                {name: "Metrological Application Framework", version: "3.7.12"};
                ac(Ob);
                Ob = r;
                w("pingdom") && (m._prum = [["id", w("pingdom")], ["mark", "firstbyte", ka.now()]], sb("//rum-static.pingdom.net/prum.min.js"));
                if (!0 === w("runtime")) {
                    var a = "concat" === w("console");
                    Ib = function () {
                        var c = a ? [Oa(arguments).join(" ")] : arguments;
                        Ma.log.apply(Ma, c)
                    };
                    fc = function () {
                        var c = a ? [Oa(arguments).join(" ")] : arguments;
                        Ma.warn.apply(Ma, c)
                    };
                    gc = function () {
                        var c = a ? [Oa(arguments).join(" ")] : arguments;
                        Ma.error.apply(Ma, c)
                    }
                }
                ac(xb("fontawesome/4.1.0/css/font-awesome.min.css"));
                var b = w("plugins") || {}, d = za("object" === typeof p.ui ? p.ui.identifier : p.ui);
                (-1 < d.indexOf("horizon") || -1 < d.indexOf("d4a") || -1 < d.indexOf("mldemo") || -1 < d.indexOf("pixidemo") || b["lgi-guide-sdk"]) && sb("//" + fa[1] + "." + ca + ".com/l/" + ("lgi-guide-sdk/" + (b["lgi-guide-sdk"] || "0.4.8") + "/lgi-guide-sdk.min.js"));
                !1 !== b.tinycolor && sb(xb("tinycolor/" + (b.tinycolor || "0.9.16") + "/tinycolor-min.js"));
                !0 === b.kbevent && sb(Zb("kbevent.min.js", "lib"));
                !0 === b.pixi && (sb("//" + fa[1] + "." + ca + ".com/pixi/pixi.js"), sb("//" + fa[1] + "." + ca +
                    ".com/pixi/tween.min.js"));
                !1 !== b.moment && sb(xb("momentjs/" + (b.moment || "2.5.1") + "/moment.min.js"), function () {
                    (function () {
                        function a(c) {
                            return 1 < c && 5 > c && 1 !== ~~(c / 10)
                        }

                        function b(d, f, e, l) {
                            var k = d + " ";
                            switch (e) {
                                case "s":
                                    return f || l ? "p\u00e1r vte\u0159in" : "p\u00e1r vte\u0159inami";
                                case "m":
                                    return f ? "minuta" : l ? "minutu" : "minutou";
                                case "mm":
                                    return f || l ? k + (a(d) ? "minuty" : "minut") : k + "minutami";
                                case "h":
                                    return f ? "hodina" : l ? "hodinu" : "hodinou";
                                case "hh":
                                    return f || l ? k + (a(d) ? "hodiny" : "hodin") : k + "hodinami";
                                case "d":
                                    return f ||
                                    l ? "den" : "dnem";
                                case "dd":
                                    return f || l ? k + (a(d) ? "dny" : "dn\u00ed") : k + "dny";
                                case "M":
                                    return f || l ? "m\u011bs\u00edc" : "m\u011bs\u00edcem";
                                case "MM":
                                    return f || l ? k + (a(d) ? "m\u011bs\u00edce" : "m\u011bs\u00edc\u016f") : k + "m\u011bs\u00edci";
                                case "y":
                                    return f || l ? "rok" : "rokem";
                                case "yy":
                                    return f || l ? k + (a(d) ? "roky" : "let") : k + "lety"
                            }
                        }

                        var d = "leden \u00fanor b\u0159ezen duben kv\u011bten \u010derven \u010dervenec srpen z\u00e1\u0159\u00ed \u0159\u00edjen listopad prosinec".split(" "), k = "led \u00fano b\u0159e dub kv\u011b \u010dvn \u010dvc srp z\u00e1\u0159 \u0159\u00edj lis pro".split(" ");
                        return moment.lang("cz", {
                            months: d,
                            monthsShort: k,
                            monthsParse: function (a, c) {
                                var b, d = [];
                                for (b = 0; 12 > b; b++)d[b] = new RegExp("^" + a[b] + "$|^" + c[b] + "$", "i");
                                return d
                            }(d, k),
                            weekdays: "ned\u011ble pond\u011bl\u00ed \u00fater\u00fd st\u0159eda \u010dtvrtek p\u00e1tek sobota".split(" "),
                            weekdaysShort: "ne po \u00fat st \u010dt p\u00e1 so".split(" "),
                            weekdaysMin: "ne po \u00fat st \u010dt p\u00e1 so".split(" "),
                            longDateFormat: {
                                LT: "H:mm",
                                L: "DD.MM.YYYY",
                                LL: "D. MMMM YYYY",
                                LLL: "D. MMMM YYYY LT",
                                LLLL: "dddd D. MMMM YYYY LT"
                            },
                            calendar: {
                                sameDay: "[dnes v] LT", nextDay: "[z\u00edtra v] LT", nextWeek: function () {
                                    switch (this.day()) {
                                        case 0:
                                            return "[v ned\u011bli v] LT";
                                        case 1:
                                        case 2:
                                            return "[v] dddd [v] LT";
                                        case 3:
                                            return "[ve st\u0159edu v] LT";
                                        case 4:
                                            return "[ve \u010dtvrtek v] LT";
                                        case 5:
                                            return "[v p\u00e1tek v] LT";
                                        case 6:
                                            return "[v sobotu v] LT"
                                    }
                                }, lastDay: "[v\u010dera v] LT", lastWeek: function () {
                                    switch (this.day()) {
                                        case 0:
                                            return "[minulou ned\u011bli v] LT";
                                        case 1:
                                        case 2:
                                            return "[minul\u00e9] dddd [v] LT";
                                        case 3:
                                            return "[minulou st\u0159edu v] LT";
                                        case 4:
                                        case 5:
                                            return "[minul\u00fd] dddd [v] LT";
                                        case 6:
                                            return "[minulou sobotu v] LT"
                                    }
                                }, sameElse: "L"
                            },
                            relativeTime: {
                                future: "za %s",
                                past: "p\u0159ed %s",
                                s: b,
                                m: b,
                                mm: b,
                                h: b,
                                hh: b,
                                d: b,
                                dd: b,
                                M: b,
                                MM: b,
                                y: b,
                                yy: b
                            },
                            ordinal: "%d.",
                            week: {dow: 1, doy: 4}
                        })
                    })();
                    moment.lang("it", {
                        months: "Gennaio Febbraio Marzo Aprile Maggio Giugno Luglio Agosto Settembre Ottobre Novembre Dicembre".split(" "),
                        monthsShort: "Gen Feb Mar Apr Mag Giu Lug Ago Set Ott Nov Dic".split(" "),
                        weekdays: "Domenica Luned\u00ec Marted\u00ec Mercoled\u00ec Gioved\u00ec Venerd\u00ec Sabato".split(" "),
                        weekdaysShort: "Dom Lun Mar Mer Gio Ven Sab".split(" "),
                        weekdaysMin: "D L Ma Me G V S".split(" "),
                        longDateFormat: {
                            LT: "HH:mm",
                            L: "DD/MM/YYYY",
                            LL: "D MMMM YYYY",
                            LLL: "D MMMM YYYY LT",
                            LLLL: "dddd, D MMMM YYYY LT"
                        },
                        calendar: {
                            sameDay: "[Oggi alle] LT",
                            nextDay: "[Domani alle] LT",
                            nextWeek: "dddd [alle] LT",
                            lastDay: "[Ieri alle] LT",
                            lastWeek: "[lo scorso] dddd [alle] LT",
                            sameElse: "L"
                        },
                        relativeTime: {
                            future: function (a) {
                                return (/^[0-9].+$/.test(a) ? "tra" : "in") + " " + a
                            },
                            past: "%s fa",
                            s: "alcuni secondi",
                            m: "un minuto",
                            mm: "%d minuti",
                            h: "un'ora",
                            hh: "%d ore",
                            d: "un giorno",
                            dd: "%d giorni",
                            M: "un mese",
                            MM: "%d mesi",
                            y: "un anno",
                            yy: "%d anni"
                        },
                        ordinal: "%d\u00ba",
                        week: {dow: 1, doy: 4}
                    });
                    moment.lang("fr", {
                        months: "janvier f\u00e9vrier mars avril mai juin juillet ao\u00fbt septembre octobre novembre d\u00e9cembre".split(" "),
                        monthsShort: "janv. f\u00e9vr. mars avr. mai juin juil. ao\u00fbt sept. oct. nov. d\u00e9c.".split(" "),
                        weekdays: "dimanche lundi mardi mercredi jeudi vendredi samedi".split(" "),
                        weekdaysShort: "dim. lun. mar. mer. jeu. ven. sam.".split(" "),
                        weekdaysMin: "Di Lu Ma Me Je Ve Sa".split(" "),
                        longDateFormat: {
                            LT: "HH:mm",
                            L: "DD/MM/YYYY",
                            LL: "D MMMM YYYY",
                            LLL: "D MMMM YYYY LT",
                            LLLL: "dddd D MMMM YYYY LT"
                        },
                        calendar: {
                            sameDay: "[Aujourd'hui \u00e0] LT",
                            nextDay: "[Demain \u00e0] LT",
                            nextWeek: "dddd [\u00e0] LT",
                            lastDay: "[Hier \u00e0] LT",
                            lastWeek: "dddd [dernier \u00e0] LT",
                            sameElse: "L"
                        },
                        relativeTime: {
                            future: "dans %s",
                            past: "il y a %s",
                            s: "quelques secondes",
                            m: "une minute",
                            mm: "%d minutes",
                            h: "une heure",
                            hh: "%d heures",
                            d: "un jour",
                            dd: "%d jours",
                            M: "un mois",
                            MM: "%d mois",
                            y: "un an",
                            yy: "%d ans"
                        },
                        ordinal: function (a) {
                            return a + (1 === a ? "er" : "")
                        },
                        week: {dow: 1, doy: 4}
                    });
                    moment.lang("nl", {
                        months: "januari februari maart april mei juni juli augustus september oktober november december".split(" "),
                        monthsShort: "jan feb mrt apr mei jun jul aug sep okt nov dec".split(" "),
                        weekdays: "zondag maandag dinsdag woensdag donderdag vrijdag zaterdag".split(" "),
                        weekdaysShort: "zo. ma. di. wo. do. vr. za.".split(" "),
                        weekdaysMin: "Zo Ma Di Wo Do Vr Za".split(" "),
                        longDateFormat: {
                            LT: "HH:mm", L: "DD-MM-YYYY",
                            LL: "D MMMM YYYY", LLL: "D MMMM YYYY LT", LLLL: "dddd D MMMM YYYY LT"
                        },
                        calendar: {
                            sameDay: "[vandaag om] LT",
                            nextDay: "[morgen om] LT",
                            nextWeek: "dddd [om] LT",
                            lastDay: "[gisteren om] LT",
                            lastWeek: "[afgelopen] dddd [om] LT",
                            sameElse: "L"
                        },
                        relativeTime: {
                            future: "over %s",
                            past: "%s geleden",
                            s: "een paar seconden",
                            m: "\u00e9\u00e9n minuut",
                            mm: "%d minuten",
                            h: "\u00e9\u00e9n uur",
                            hh: "%d uur",
                            d: "\u00e9\u00e9n dag",
                            dd: "%d dagen",
                            M: "\u00e9\u00e9n maand",
                            MM: "%d maanden",
                            y: "\u00e9\u00e9n jaar",
                            yy: "%d jaar"
                        },
                        ordinal: function (a) {
                            return a +
                                (1 === a || 8 === a || 20 <= a ? "ste" : "de")
                        },
                        week: {dow: 1, doy: 4}
                    });
                    (function () {
                        function a(c, b, d, g) {
                            c = {
                                m: ["eine Minute", "einer Minute"],
                                h: ["eine Stunde", "einer Stunde"],
                                d: ["ein Tag", "einem Tag"],
                                dd: [c + " Tage", c + " Tagen"],
                                M: ["ein Monat", "einem Monat"],
                                MM: [c + " Monate", c + " Monaten"],
                                y: ["ein Jahr", "einem Jahr"],
                                yy: [c + " Jahre", c + " Jahren"]
                            };
                            return b ? c[d][0] : c[d][1]
                        }

                        return moment.lang("de", {
                            months: "Januar Februar M\u00e4rz April Mai Juni Juli August September Oktober November Dezember".split(" "),
                            monthsShort: "Jan. Febr. Mrz. Apr. Mai Jun. Jul. Aug. Sept. Okt. Nov. Dez.".split(" "),
                            weekdays: "Sonntag Montag Dienstag Mittwoch Donnerstag Freitag Samstag".split(" "),
                            weekdaysShort: "So. Mo. Di. Mi. Do. Fr. Sa.".split(" "),
                            weekdaysMin: "So Mo Di Mi Do Fr Sa".split(" "),
                            longDateFormat: {
                                LT: "H:mm [Uhr]",
                                L: "DD.MM.YYYY",
                                LL: "D. MMMM YYYY",
                                LLL: "D. MMMM YYYY LT",
                                LLLL: "dddd, D. MMMM YYYY LT"
                            },
                            calendar: {
                                sameDay: "[Heute um] LT",
                                sameElse: "L",
                                nextDay: "[Morgen um] LT",
                                nextWeek: "dddd [um] LT",
                                lastDay: "[Gestern um] LT",
                                lastWeek: "[letzten] dddd [um] LT"
                            },
                            relativeTime: {
                                future: "in %s", past: "vor %s", s: "ein paar Sekunden",
                                m: a, mm: "%d Minuten", h: a, hh: "%d Stunden", d: a, dd: a, M: a, MM: a, y: a, yy: a
                            },
                            ordinal: "%d.",
                            week: {dow: 1, doy: 4}
                        })
                    })();
                    (function () {
                        function a(c, b, d, f) {
                            switch (d) {
                                case "s":
                                    return f || b ? "n\u00e9h\u00e1ny m\u00e1sodperc" : "n\u00e9h\u00e1ny m\u00e1sodperce";
                                case "m":
                                    return "egy" + (f || b ? " perc" : " perce");
                                case "mm":
                                    return c + (f || b ? " perc" : " perce");
                                case "h":
                                    return "egy" + (f || b ? " \u00f3ra" : " \u00f3r\u00e1ja");
                                case "hh":
                                    return c + (f || b ? " \u00f3ra" : " \u00f3r\u00e1ja");
                                case "d":
                                    return "egy" + (f || b ? " nap" : " napja");
                                case "dd":
                                    return c +
                                        (f || b ? " nap" : " napja");
                                case "M":
                                    return "egy" + (f || b ? " h\u00f3nap" : " h\u00f3napja");
                                case "MM":
                                    return c + (f || b ? " h\u00f3nap" : " h\u00f3napja");
                                case "y":
                                    return "egy" + (f || b ? " \u00e9v" : " \u00e9ve");
                                case "yy":
                                    return c + (f || b ? " \u00e9v" : " \u00e9ve")
                            }
                            return ""
                        }

                        var b = "vas\u00e1rnap h\u00e9tf\u0151n kedden szerd\u00e1n cs\u00fct\u00f6rt\u00f6k\u00f6n p\u00e9nteken szombaton".split(" ");
                        return moment.lang("hu", {
                            months: "janu\u00e1r febru\u00e1r m\u00e1rcius \u00e1prilis m\u00e1jus j\u00fanius j\u00falius augusztus szeptember okt\u00f3ber november december".split(" "),
                            monthsShort: "jan feb m\u00e1rc \u00e1pr m\u00e1j j\u00fan j\u00fal aug szept okt nov dec".split(" "),
                            weekdays: "vas\u00e1rnap h\u00e9tf\u0151 kedd szerda cs\u00fct\u00f6rt\u00f6k p\u00e9ntek szombat".split(" "),
                            weekdaysShort: "vas h\u00e9t kedd sze cs\u00fct p\u00e9n szo".split(" "),
                            weekdaysMin: "v h k sze cs p szo".split(" "),
                            longDateFormat: {
                                LT: "H:mm",
                                L: "YYYY.MM.DD.",
                                LL: "YYYY. MMMM D.",
                                LLL: "YYYY. MMMM D., LT",
                                LLLL: "YYYY. MMMM D., dddd LT"
                            },
                            calendar: {
                                sameDay: "[ma] LT[-kor]", nextDay: "[holnap] LT[-kor]",
                                nextWeek: function () {
                                    return "[" + b[this.day()] + "] LT[-kor]"
                                }, lastDay: "[tegnap] LT[-kor]", lastWeek: function () {
                                    return "[m\u00falt] [" + b[this.day()] + "] LT[-kor]"
                                }, sameElse: "L"
                            },
                            relativeTime: {
                                future: "%s m\u00falva",
                                past: "%s",
                                s: a,
                                m: a,
                                mm: a,
                                h: a,
                                hh: a,
                                d: a,
                                dd: a,
                                M: a,
                                MM: a,
                                y: a,
                                yy: a
                            },
                            ordinal: "%d.",
                            week: {dow: 1, doy: 7}
                        })
                    })();
                    (function () {
                        function a(c) {
                            return 5 > c % 10 && 1 < c % 10 && 1 !== ~~(c / 10) % 10
                        }

                        function b(d, f, e) {
                            var l = d + " ";
                            switch (e) {
                                case "m":
                                    return f ? "minuta" : "minut\u0119";
                                case "mm":
                                    return l + (a(d) ? "minuty" : "minut");
                                case "h":
                                    return f ?
                                        "godzina" : "godzin\u0119";
                                case "hh":
                                    return l + (a(d) ? "godziny" : "godzin");
                                case "MM":
                                    return l + (a(d) ? "miesi\u0105ce" : "miesi\u0119cy");
                                case "yy":
                                    return l + (a(d) ? "lata" : "lat")
                            }
                        }

                        var d = "stycze\u0144 luty marzec kwiecie\u0144 maj czerwiec lipiec sierpie\u0144 wrzesie\u0144 pa\u017adziernik listopad grudzie\u0144".split(" "), k = "stycznia lutego marca kwietnia maja czerwca lipca sierpnia wrze\u015bnia pa\u017adziernika listopada grudnia".split(" ");
                        return moment.lang("pl", {
                            months: function (a, c) {
                                return /D MMMM/.test(c) ?
                                    k[a.month()] : d[a.month()]
                            },
                            monthsShort: "sty lut mar kwi maj cze lip sie wrz pa\u017a lis gru".split(" "),
                            weekdays: "niedziela poniedzia\u0142ek wtorek \u015broda czwartek pi\u0105tek sobota".split(" "),
                            weekdaysShort: "nie pon wt \u015br czw pt sb".split(" "),
                            weekdaysMin: "N Pn Wt \u015ar Cz Pt So".split(" "),
                            longDateFormat: {
                                LT: "HH:mm",
                                L: "DD.MM.YYYY",
                                LL: "D MMMM YYYY",
                                LLL: "D MMMM YYYY LT",
                                LLLL: "dddd, D MMMM YYYY LT"
                            },
                            calendar: {
                                sameDay: "[Dzi\u015b o] LT", nextDay: "[Jutro o] LT", nextWeek: "[W] dddd [o] LT",
                                lastDay: "[Wczoraj o] LT", lastWeek: function () {
                                    switch (this.day()) {
                                        case 0:
                                            return "[W zesz\u0142\u0105 niedziel\u0119 o] LT";
                                        case 3:
                                            return "[W zesz\u0142\u0105 \u015brod\u0119 o] LT";
                                        case 6:
                                            return "[W zesz\u0142\u0105 sobot\u0119 o] LT";
                                        default:
                                            return "[W zesz\u0142y] dddd [o] LT"
                                    }
                                }, sameElse: "L"
                            },
                            relativeTime: {
                                future: "za %s",
                                past: "%s temu",
                                s: "kilka sekund",
                                m: b,
                                mm: b,
                                h: b,
                                hh: b,
                                d: "1 dzie\u0144",
                                dd: "%d dni",
                                M: "miesi\u0105c",
                                MM: b,
                                y: "rok",
                                yy: b
                            },
                            ordinal: "%d.",
                            week: {dow: 1, doy: 4}
                        })
                    })()
                });

            }
        })();
        (function () {
            function r() {
                if (!0 !== q.defineProperty({},
                        "x", {
                            get: function () {
                                return !0
                            }
                        }).x)throw gb;
                return !0
            }

            try {
                r() && !pb.__defineGetter__ && (q.defineProperty(pb, "__defineGetter__", {
                    enumerable: !1,
                    configurable: !0,
                    value: function (a, c) {
                        q.defineProperty(this, a, {get: c, enumerable: !0, configurable: !0})
                    }
                }), q.defineProperty(pb, "__defineSetter__", {
                    enumerable: !1, configurable: !0, value: function (a, c) {
                        q.defineProperty(this, a, {set: c, enumerable: !0, configurable: !0})
                    }
                }))
            } catch (b) {
                if (pb.__defineGetter__)q.defineProperty = function (c, b, d) {
                    "value"in d ? c[b] = d.value : ("get"in d && a(c,
                        b, d.get), "set"in d && N(c, b, d.set))
                }; else throw Qa("Object.defineProperty is minimum required");
            }
            try {
                nb && nb.hasFeature.call && nb.hasFeature("Events.MouseEnter", "3.0") && (Hb = "mouseenter"), nb && nb.hasFeature.call && nb.hasFeature("Events.MouseLeave", "3.0") && (Pb = "mouseleave")
            } catch (d) {
            }
            ba(m.getComputedStyle) && (m.getComputedStyle = function (a, c) {
                this.el = a;
                this.getPropertyValue = function (c) {
                    var b = /(\-([a-z]){1})/g;
                    "float" == c && (c = "styleFloat");
                    b.test(c) && (c = c.replace(b, function (a, c, b) {
                        return Pa(b)
                    }));
                    return a.currentStyle &&
                    a.currentStyle[c] ? a.currentStyle[c] : null
                };
                return this
            });
            if (ba($a))throw Qa("XMLHttpRequest not supported");
            if (!1 === "1" >= 0)throw Qa('Type check is not correctly implemented ("1" >= 0)');
            if (ba(Ic.parse('<?xml version="1.0" encoding="UTF-8"?><root></root>')))throw Qa("DOMParser is not working correctly");
            if (ba(Ma)) {
                Ma = m.console = {};
                var c = m.alert || X;
                Ma.log = Ma.warn = Ma.debug = Ma.error = Ma.info = function () {
                    try {
                        c(Oa(arguments).join(" "))
                    } catch (a) {
                    }
                };
                Ma.assert = Ma.dir = X
            }
        })();
        var Jb = m.WebKitCSSMatrix || m.MSCSSMatrix ||
                m.CSSMatrix || function () {
                    function a(c) {
                        this.m11 = this.m22 = this.m33 = this.m44 = 1;
                        this.m12 = this.m13 = this.m14 = this.m21 = this.m23 = this.m24 = this.m31 = this.m32 = this.m34 = this.m41 = this.m42 = this.m43 = 0;
                        "string" == typeof c && this.setMatrixValue(c)
                    }

                    function b(a, b, d, k, g, L, y, l, D) {
                        return a * (g * D - L * l) - k * (b * D - d * l) + y * (b * L - d * g)
                    }

                    a.displayName = "CSSMatrix";
                    var d = a.prototype;
                    [["m11", "a"], ["m12", "b"], ["m21", "c"], ["m22", "d"], ["m41", "e"], ["m42", "f"]].forEach(function (a) {
                        var b = a[0];
                        q.defineProperty(d, a[1], {
                            set: function (a) {
                                this[b] = a
                            },
                            get: function () {
                                return this[b]
                            }
                        })
                    });
                    d.isAffine = function () {
                        return 0 === this.m13 && 0 === this.m14 && 0 === this.m23 && 0 === this.m24 && 0 === this.m31 && 0 === this.m32 && 1 === this.m33 && 0 === this.m34 && 0 === this.m43 && 1 === this.m44
                    };
                    d.multiply = function (c) {
                        var b = new a;
                        b.m11 = c.m11 * this.m11 + c.m12 * this.m21 + c.m13 * this.m31 + c.m14 * this.m41;
                        b.m12 = c.m11 * this.m12 + c.m12 * this.m22 + c.m13 * this.m32 + c.m14 * this.m42;
                        b.m13 = c.m11 * this.m13 + c.m12 * this.m23 + c.m13 * this.m33 + c.m14 * this.m43;
                        b.m14 = c.m11 * this.m14 + c.m12 * this.m24 + c.m13 * this.m34 + c.m14 * this.m44;
                        b.m21 = c.m21 * this.m11 + c.m22 * this.m21 + c.m23 * this.m31 + c.m24 * this.m41;
                        b.m22 = c.m21 * this.m12 + c.m22 * this.m22 + c.m23 * this.m32 + c.m24 * this.m42;
                        b.m23 = c.m21 * this.m13 + c.m22 * this.m23 + c.m23 * this.m33 + c.m24 * this.m43;
                        b.m24 = c.m21 * this.m14 + c.m22 * this.m24 + c.m23 * this.m34 + c.m24 * this.m44;
                        b.m31 = c.m31 * this.m11 + c.m32 * this.m21 + c.m33 * this.m31 + c.m34 * this.m41;
                        b.m32 = c.m31 * this.m12 + c.m32 * this.m22 + c.m33 * this.m32 + c.m34 * this.m42;
                        b.m33 = c.m31 * this.m13 + c.m32 * this.m23 + c.m33 * this.m33 + c.m34 * this.m43;
                        b.m34 = c.m31 * this.m14 + c.m32 * this.m24 + c.m33 *
                            this.m34 + c.m34 * this.m44;
                        b.m41 = c.m41 * this.m11 + c.m42 * this.m21 + c.m43 * this.m31 + c.m44 * this.m41;
                        b.m42 = c.m41 * this.m12 + c.m42 * this.m22 + c.m43 * this.m32 + c.m44 * this.m42;
                        b.m43 = c.m41 * this.m13 + c.m42 * this.m23 + c.m43 * this.m33 + c.m44 * this.m43;
                        b.m44 = c.m41 * this.m14 + c.m42 * this.m24 + c.m43 * this.m34 + c.m44 * this.m44;
                        return b
                    };
                    d.isIdentityOrTranslation = function () {
                        return 1 === this.m11 && 0 === this.m12 && 0 === this.m13 && 0 === this.m14 && 0 === this.m21 && 1 === this.m22 && 0 === this.m23 && 0 === this.m24 && 0 === this.m31 && 0 === this.m31 && 1 === this.m33 && 0 === this.m34 &&
                            1 === this.m44
                    };
                    d.adjoint = function () {
                        var c = new a, d = this.m11, e = this.m12, k = this.m13, g = this.m14, L = this.m21, y = this.m22, l = this.m23, D = this.m24, n = this.m31, ia = this.m32, h = this.m33, Da = this.m34, m = this.m41, T = this.m42, I = this.m43, r = this.m44;
                        c.m11 = b(y, ia, T, l, h, I, D, Da, r);
                        c.m21 = -b(L, n, m, l, h, I, D, Da, r);
                        c.m31 = b(L, n, m, y, ia, T, D, Da, r);
                        c.m41 = -b(L, n, m, y, ia, T, l, h, I);
                        c.m12 = -b(e, ia, T, k, h, I, g, Da, r);
                        c.m22 = b(d, n, m, k, h, I, g, Da, r);
                        c.m32 = -b(d, n, m, e, ia, T, g, Da, r);
                        c.m42 = b(d, n, m, e, ia, T, k, h, I);
                        c.m13 = b(e, y, T, k, l, I, g, D, r);
                        c.m23 = -b(d, L, m, k,
                            l, I, g, D, r);
                        c.m33 = b(d, L, m, e, y, T, g, D, r);
                        c.m43 = -b(d, L, m, e, y, T, k, l, I);
                        c.m14 = -b(e, y, ia, k, l, h, g, D, Da);
                        c.m24 = b(d, L, n, k, l, h, g, D, Da);
                        c.m34 = -b(d, L, n, e, y, ia, g, D, Da);
                        c.m44 = b(d, L, n, e, y, ia, k, l, h);
                        return c
                    };
                    d.inverse = function () {
                        var c, d, e, k;
                        if (this.isIdentityOrTranslation()) {
                            c = new a;
                            if (0 !== this.m41 || 0 !== this.m42 || 0 !== this.m43)c.m41 = -this.m41, c.m42 = -this.m42, c.m43 = -this.m43;
                            return c
                        }
                        c = this.adjoint();
                        d = this.m21;
                        e = this.m31;
                        k = this.m41;
                        var g = this.m12, L = this.m22, y = this.m32, l = this.m42, D = this.m13, n = this.m23, ia = this.m33,
                            h = this.m43, Da = this.m14, m = this.m24, T = this.m34, I = this.m44;
                        d = this.m11 * b(L, n, m, y, ia, T, l, h, I) - d * b(g, D, Da, y, ia, T, l, h, I) + e * b(g, D, Da, L, n, m, l, h, I) - k * b(g, D, Da, L, n, m, y, ia, T);
                        if (1E-8 > x.abs(d))return null;
                        for (e = 1; 5 > e; e++)for (k = 1; 5 > k; k++)c["m" + e + k] /= d;
                        return c
                    };
                    d.rotate = function (c, b, d) {
                        if ("number" != typeof c || isNaN(c))c = 0;
                        "number" == typeof b && !isNaN(b) || "number" == typeof d && !isNaN(d) || (d = c, b = c = 0);
                        if ("number" != typeof b || isNaN(b))b = 0;
                        if ("number" != typeof d || isNaN(d))d = 0;
                        c = c * x.PI / 180;
                        b = b * x.PI / 180;
                        d = d * x.PI / 180;
                        var k = new a,
                            g = new a, m = new a, y;
                        d /= 2;
                        y = x.sin(d);
                        d = x.cos(d);
                        m.m11 = m.m22 = 1 - 2 * y * y;
                        m.m12 = m.m21 = 2 * y * d;
                        m.m21 *= -1;
                        b /= 2;
                        y = x.sin(b);
                        d = x.cos(b);
                        g.m11 = g.m33 = 1 - 2 * y * y;
                        g.m13 = g.m31 = 2 * y * d;
                        g.m13 *= -1;
                        c /= 2;
                        y = x.sin(c);
                        d = x.cos(c);
                        k.m22 = k.m33 = 1 - 2 * y * y;
                        k.m23 = k.m32 = 2 * y * d;
                        k.m32 *= -1;
                        return m.multiply(g).multiply(k).multiply(this)
                    };
                    d.rotateAxisAngle = function (b, d, e, k) {
                        if ("number" != typeof b || isNaN(b))b = 0;
                        if ("number" != typeof d || isNaN(d))d = 0;
                        if ("number" != typeof e || isNaN(e))e = 0;
                        if ("number" != typeof k || isNaN(k))k = 0;
                        0 === b && 0 === d && 0 === e && (e = 1);
                        var g =
                            new a, m = x.sqrt(b * b + d * d + e * e), y, l, D;
                        k = (k * x.PI / 180 || 0) / 2;
                        y = x.cos(k);
                        l = x.sin(k);
                        k = l * l;
                        0 === m ? (d = b = 0, e = 1) : 1 !== m && (b /= m, d /= m, e /= m);
                        1 === b && 0 === d && 0 === e ? (g.m22 = g.m33 = 1 - 2 * k, g.m23 = g.m32 = 2 * y * l, g.m32 *= -1) : 0 === b && 1 === d && 0 === e ? (g.m11 = g.m33 = 1 - 2 * k, g.m13 = g.m31 = 2 * y * l, g.m13 *= -1) : 0 === b && 0 === d && 1 === e ? (g.m11 = g.m22 = 1 - 2 * k, g.m12 = g.m21 = 2 * y * l, g.m21 *= -1) : (m = l * y, y = b * b, l = d * d, D = e * e, g.m11 = 1 - 2 * (l + D) * k, g.m12 = 2 * (b * d * k + e * m), g.m13 = 2 * (b * e * k - d * m), g.m21 = 2 * (d * b * k - e * m), g.m22 = 1 - 2 * (D + y) * k, g.m23 = 2 * (d * e * k + b * m), g.m31 = 2 * (e * b * k + d * m), g.m32 = 2 * (e * d *
                            k - b * m), g.m33 = 1 - 2 * (y + l) * k);
                        return this.multiply(g)
                    };
                    d.scale = function (b, d, e) {
                        var k = new a;
                        if ("number" != typeof b || isNaN(b))b = 1;
                        if ("number" != typeof d || isNaN(d))d = b;
                        if ("number" != typeof e || isNaN(e))e = 1;
                        k.m11 = b;
                        k.m22 = d;
                        k.m33 = e;
                        return this.multiply(k)
                    };
                    d.translate = function (b, d, e) {
                        var k = new a;
                        if ("number" != typeof b || isNaN(b))b = 0;
                        if ("number" != typeof d || isNaN(d))d = 0;
                        if ("number" != typeof e || isNaN(e))e = 0;
                        k.m41 = b;
                        k.m42 = d;
                        k.m43 = e;
                        return this.multiply(k)
                    };
                    d.setMatrixValue = function (a) {
                        a = a && a.trim() || "";
                        var b = a.match(/^matrix(3d)?\(\s*(.+)\s*\)$/),
                            d, k, g, m;
                        if (b && (a = !!b[1], b = b[2].split(/\s*,\s*/), d = b.length, k = V(d), !(a && 16 !== d || !a && 6 !== d))) {
                            for (g = 0; g < d; g++)if (m = b[g], m.match(/^-?\d+(\.\d+)?$/))k[g] = parseFloat(m); else return;
                            for (g = 0; g < d; g++)point = a ? "m" + (x.floor(g / 4) + 1) + (g % 4 + 1) : Va(g + 97), this[point] = k[g]
                        }
                    };
                    d.toString = function () {
                        var a = this, b, d;
                        this.isAffine() ? (d = "matrix(", b = "abcdef".split("")) : (d = "matrix3d(", b = "m11 m12 m13 m14 m21 m22 m23 m24 m31 m32 m33 m34 m41 m42 m43 m44".split(" "));
                        return d + b.map(function (b) {
                                return a[b].toFixed(6)
                            }).join(", ") +
                            ")"
                    };
                    return a
                }(), tc = function () {
                var a;
                return {
                    log: function (b) {
                        if (null === b)a.destroy(), a = r; else {
                            var d = ba(a) && sa("viewport");
                            d && (a = La("pre"), a.style.width = "100%", a.style.height = w("screenDebugHeight") || 110, a.setStyles({
                                position: "absolute",
                                overflowY: "scroll",
                                overflowWrap: "normal",
                                backgroundColor: "rgba(0,0,0,.7)",
                                color: "#00ff00",
                                bottom: 0,
                                padding: "5px",
                                fontWeight: "bold",
                                zOrder: hc.ZORDER
                            }).inject(d));
                            a && (a.innerHTML += b + "\n", a.style.height = w("screenDebugHeight") || 110, a.scrollTop = (a.scrollTop || 0) + 25)
                        }
                    }
                }
            }(),
            U = function (a) {
                try {
                    Ib(a), !0 !== w("screenDebug") || tc.log("string" === typeof a ? a : ga.stringify(a))
                } catch (b) {
                }
            };
        (function () {
            var a = Kc + "+/=";
            ba(pc) && (m.btoa = pc = function (b) {
                for (var d, c, f, e, k, g, m = 0, y = b.length, l = x.max, D = ""; m < y;) {
                    d = b.charCodeAt(m++) || 0;
                    c = b.charCodeAt(m++) || 0;
                    g = b.charCodeAt(m++) || 0;
                    if (255 < l(d, c, g))throw Qa("Invalid character");
                    f = d >> 2 & 63;
                    d = (d & 3) << 4 | c >> 4 & 15;
                    e = (c & 15) << 2 | g >> 6 & 3;
                    k = g & 63;
                    c ? g || (k = 64) : e = k = 64;
                    D += a.charAt(f) + a.charAt(d) + a.charAt(e) + a.charAt(k)
                }
                return D
            });
            ba(Fc) && (m.atob = Fc = function (b) {
                b =
                    b.replace(/=+$/, "");
                var d, c, f, e, k = 0, g = b.length, m = [];
                if (1 === g % 4)throw Qa("Invalid character");
                for (; k < g;)d = a.indexOf(b.charAt(k++)), c = a.indexOf(b.charAt(k++)), f = a.indexOf(b.charAt(k++)), e = a.indexOf(b.charAt(k++)), d = (d & 63) << 2 | c >> 4 & 3, c = (c & 15) << 4 | f >> 2 & 15, f = (f & 3) << 6 | e & 63, m.push(Va(d)), c && m.push(Va(c)), f && m.push(Va(f));
                return m.join("")
            })
        })();
        (function () {
            if (ba(Aa)) {
                var a = function (a, b) {
                    return a + b & 4294967295
                }, b = function (b, c, d, f, k, h) {
                    c = a(a(c, b), a(f, h));
                    return a(c << k | c >>> 32 - k, d)
                }, d = function (a, c, d, f, k, h, e) {
                    return b(c &
                        d | ~c & f, a, c, k, h, e)
                }, c = function (a, c, d, f, k, h, e) {
                    return b(c & f | d & ~f, a, c, k, h, e)
                }, f = function (a, c, d, f, k, h, e) {
                    return b(d ^ (c | ~f), a, c, k, h, e)
                }, e = function (k, l) {
                    var e = k[0], n = k[1], g = k[2], h = k[3], e = d(e, n, g, h, l[0], 7, -680876936), h = d(h, e, n, g, l[1], 12, -389564586), g = d(g, h, e, n, l[2], 17, 606105819), n = d(n, g, h, e, l[3], 22, -1044525330), e = d(e, n, g, h, l[4], 7, -176418897), h = d(h, e, n, g, l[5], 12, 1200080426), g = d(g, h, e, n, l[6], 17, -1473231341), n = d(n, g, h, e, l[7], 22, -45705983), e = d(e, n, g, h, l[8], 7, 1770035416), h = d(h, e, n, g, l[9], 12, -1958414417), g = d(g,
                            h, e, n, l[10], 17, -42063), n = d(n, g, h, e, l[11], 22, -1990404162), e = d(e, n, g, h, l[12], 7, 1804603682), h = d(h, e, n, g, l[13], 12, -40341101), g = d(g, h, e, n, l[14], 17, -1502002290), n = d(n, g, h, e, l[15], 22, 1236535329), e = c(e, n, g, h, l[1], 5, -165796510), h = c(h, e, n, g, l[6], 9, -1069501632), g = c(g, h, e, n, l[11], 14, 643717713), n = c(n, g, h, e, l[0], 20, -373897302), e = c(e, n, g, h, l[5], 5, -701558691), h = c(h, e, n, g, l[10], 9, 38016083), g = c(g, h, e, n, l[15], 14, -660478335), n = c(n, g, h, e, l[4], 20, -405537848), e = c(e, n, g, h, l[9], 5, 568446438), h = c(h, e, n, g, l[14], 9, -1019803690),
                        g = c(g, h, e, n, l[3], 14, -187363961), n = c(n, g, h, e, l[8], 20, 1163531501), e = c(e, n, g, h, l[13], 5, -1444681467), h = c(h, e, n, g, l[2], 9, -51403784), g = c(g, h, e, n, l[7], 14, 1735328473), n = c(n, g, h, e, l[12], 20, -1926607734), e = b(n ^ g ^ h, e, n, l[5], 4, -378558), h = b(e ^ n ^ g, h, e, l[8], 11, -2022574463), g = b(h ^ e ^ n, g, h, l[11], 16, 1839030562), n = b(g ^ h ^ e, n, g, l[14], 23, -35309556), e = b(n ^ g ^ h, e, n, l[1], 4, -1530992060), h = b(e ^ n ^ g, h, e, l[4], 11, 1272893353), g = b(h ^ e ^ n, g, h, l[7], 16, -155497632), n = b(g ^ h ^ e, n, g, l[10], 23, -1094730640), e = b(n ^ g ^ h, e, n, l[13], 4, 681279174), h = b(e ^
                            n ^ g, h, e, l[0], 11, -358537222), g = b(h ^ e ^ n, g, h, l[3], 16, -722521979), n = b(g ^ h ^ e, n, g, l[6], 23, 76029189), e = b(n ^ g ^ h, e, n, l[9], 4, -640364487), h = b(e ^ n ^ g, h, e, l[12], 11, -421815835), g = b(h ^ e ^ n, g, h, l[15], 16, 530742520), n = b(g ^ h ^ e, n, g, l[2], 23, -995338651), e = f(e, n, g, h, l[0], 6, -198630844), h = f(h, e, n, g, l[7], 10, 1126891415), g = f(g, h, e, n, l[14], 15, -1416354905), n = f(n, g, h, e, l[5], 21, -57434055), e = f(e, n, g, h, l[12], 6, 1700485571), h = f(h, e, n, g, l[3], 10, -1894986606), g = f(g, h, e, n, l[10], 15, -1051523), n = f(n, g, h, e, l[1], 21, -2054922799), e = f(e, n, g, h, l[8],
                            6, 1873313359), h = f(h, e, n, g, l[15], 10, -30611744), g = f(g, h, e, n, l[6], 15, -1560198380), n = f(n, g, h, e, l[13], 21, 1309151649), e = f(e, n, g, h, l[4], 6, -145523070), h = f(h, e, n, g, l[11], 10, -1120210379), g = f(g, h, e, n, l[2], 15, 718787259), n = f(n, g, h, e, l[9], 21, -343485551);
                    k[0] = a(e, k[0]);
                    k[1] = a(n, k[1]);
                    k[2] = a(g, k[2]);
                    k[3] = a(h, k[3])
                }, k = function (a) {
                    var b = a.length, c = [1732584193, -271733879, -1732584194, 271733878], d, g, h;
                    for (d = 64; d <= b; d += 64) {
                        h = a.substring(d - 64, d);
                        g = [];
                        for (var f = void 0, f = 0; 64 > f; f += 4)g[f >> 2] = h.charCodeAt(f) + (h.charCodeAt(f +
                                1) << 8) + (h.charCodeAt(f + 2) << 16) + (h.charCodeAt(f + 3) << 24);
                        e(c, g)
                    }
                    a = a.substring(d - 64);
                    g = a.length;
                    h = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (d = 0; d < g; d += 1)h[d >> 2] |= a.charCodeAt(d) << (d % 4 << 3);
                    h[d >> 2] |= 128 << (d % 4 << 3);
                    if (55 < d)for (e(c, h), d = 0; 16 > d; d += 1)h[d] = 0;
                    b = (8 * b).toString(16).match(/(.*?)(.{0,8})$/);
                    a = ma(b[2], 16);
                    b = ma(b[1], 16) || 0;
                    h[14] = a;
                    h[15] = b;
                    e(c, h);
                    return c
                }, g = "0123456789abcdef".split(""), m = function (a) {
                    var b;
                    for (b = 0; b < a.length; b += 1) {
                        for (var c = b, d = a[b], e = "", h = void 0, h = 0; 4 > h; h += 1)e += g[d >> 8 * h + 4 & 15] + g[d >> 8 * h &
                            15];
                        a[c] = e
                    }
                    return a.join("")
                };
                "b48ce274efe63bc264a6e101f867da83" !== m(k(ca)) && (a = function (a, b) {
                    var c = (a & 65535) + (b & 65535);
                    return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
                });
                Aa = function (a) {
                    return m(k(a))
                }
            }
        })();
        var hc = function () {
            function a(b) {
                return "-moz-" !== ab ? b.toString() : "matrix(" + "abcdef".split("").map(function (a, c) {
                    var d = b[a].toFixed(6);
                    3 < c && (d += "px");
                    return d
                }).join(", ") + ")"
            }

            function b(a, b) {
                var c;
                switch (a) {
                    case "rad":
                        return b;
                    case "deg":
                        c = x.PI / 180;
                        break;
                    case "grad":
                        c = x.PI / 200;
                        break;
                    case "turn":
                        c = 2 * x.PI
                }
                return c *
                    b
            }

            function d(a) {
                return a ? a instanceof V ? a : [a.x, a.y, a.z] : null
            }

            function c(a, b) {
                return function (c) {
                    var d, e;
                    if ("number" == typeof c)return [b, c];
                    if ("string" != typeof c)return null;
                    e = (c.match(D) || [""])[0];
                    return (d = e.length === c.length ? b : a.filter(function (a) {
                        return c.substr(e.length) === a
                    })[0]) && e ? [d, parseFloat(e)] : null
                }
            }

            function f(a, b) {
                this.ctm = a || new Jb;
                this.centre = d(b) || ["50%", "50%", 0]
            }

            function e() {
                this.properties = ["all"];
                this.duration = ["ms", 0];
                this.delay = ["ms", 0];
                this.timingFunction = "ease"
            }

            function k(a, b) {
                var c;
                "function" == typeof a.callback && (this.callback = a.callback);
                delete a.callback;
                c = e.parse(a, b);
                this.transition = c.result;
                c = f.parse(c.remainder, b);
                this.transform = c.result;
                this.style = c.remainder
            }

            function g(a) {
                this.element = a;
                this.operations = [];
                this.callback = null
            }

            function m() {
                var a = this.callback;
                if ("function" === typeof a)try {
                    a.call(this.element, this)
                } catch (b) {
                }
            }

            function r(a) {
                this.operations.push(a);
                this.lastAnimation = a;
                this.fired && (this.fired = !1, this.run());
                return this
            }

            var l = {ZORDER: 99999}, D = /^-?\d+(\.\d+)?/,
                n = c(["deg", "grad", "rad", "turn"], "deg"), p = c(["s", "ms"], "s");
            f.methods = "translate translate3d translateX translateY translateZ scale scale3d scaleX scaleY scaleZ rotate rotate3d rotateX rotateY rotateZ skew skewX skewY matrix matrix3d".split(" ");
            f.parse = function (a, b) {
                var c = f.methods, d = {}, e = null, g, k;
                "object" === typeof b && b.transform && (g = b.transform.ctm, k = b.transform.centre, e = new f(g, k));
                q.forEach(a, function (b) {
                    -1 !== c.indexOf(b) ? (e = e || new f, e[b](a[b])) : "origin" === b ? (e = e || new f, e[b](a[b])) : d[b] = a[b]
                });
                return {result: e, remainder: d}
            };
            f.prototype.build = function (b) {
                var c = this.centre;
                "-o-" === ab && (c = c.slice(0, 2));
                b = b || {};
                b.transform = a(this.ctm);
                b.transformOrigin = c.join(" ");
                return b
            };
            f.prototype.matrix = f.prototype.matrix3d = function (a) {
                var b = new Jb;
                6 === a.length ? (b.a = a[0], b.b = a[1], b.c = a[2], b.d = a[3], b.e = a[4], b.f = a[5]) : (b.m11 = a[0], b.m12 = a[1], b.m13 = a[2], b.m14 = a[3], b.m21 = a[4], b.m22 = a[5], b.m23 = a[6], b.m24 = a[7], b.m31 = a[8], b.m32 = a[9], b.m33 = a[10], b.m34 = a[11], b.m41 = a[12], b.m42 = a[13], b.m43 = a[14], b.m44 = a[15]);
                this.ctm =
                    this.ctm.multiply(b)
            };
            f.prototype.translate = f.prototype.translate3d = function (a) {
                var b, c;
                "number" == typeof a || "string" == typeof a ? (a = c = ma(a) || 0, b = 0) : (b = d(a), a = b[0], c = b[1], b = b[2], "number" != typeof a && (a = ma(a) || 0), "number" != typeof c && (c = ma(c) || 0), "number" != typeof b && (b = ma(b) || 0));
                this.ctm = this.ctm.translate(a, c, b)
            };
            f.prototype.translateX = function (a) {
                this.translate([a, 0])
            };
            f.prototype.translateY = function (a) {
                this.translate([0, a])
            };
            f.prototype.translateZ = function (a) {
                this.translate3d([0, 0, a])
            };
            f.prototype.scale =
                f.prototype.scale3d = function (a) {
                    var b, c;
                    "number" == typeof a ? (a = c = a, b = 1) : (b = d(a), a = b[0], c = b[1], b = b[2]);
                    this.ctm = this.ctm.scale(a, c, b)
                };
            f.prototype.scaleX = function (a) {
                this.scale3d([a, 1, 1])
            };
            f.prototype.scaleY = function (a) {
                this.scale3d([1, a, 1])
            };
            f.prototype.scaleZ = function (a) {
                this.scale3d([1, 1, a])
            };
            f.prototype.skew = function (a) {
                var c;
                "number" == typeof a || "string" == typeof a ? c = a = b.apply(null, n(a)) || 0 : (a = d(a), c = b.apply(null, n(a[0])) || 0, a = b.apply(null, n(a[1])) || 0);
                this.matrix([1, x.tan(a), x.tan(c), 1, 0, 0])
            };
            f.prototype.skewX =
                function (a) {
                    this.skew([a, 0])
                };
            f.prototype.skewY = function (a) {
                this.skew([0, a])
            };
            f.prototype.rotate = function (a) {
                a = b.apply(null, n(a)) * (180 / x.PI);
                this.ctm = this.ctm.rotate(0, 0, a)
            };
            f.prototype.rotate3d = function (a) {
                var c = a.x, d = a.y, e = a.z;
                a = a.angle;
                "number" != typeof c && (c = 0);
                "number" != typeof d && (d = 0);
                "number" != typeof e && (e = 0);
                a = b.apply(null, n(a)) * (180 / x.PI);
                this.ctm = this.ctm.rotateAxisAngle(c, d, e, a)
            };
            f.prototype.rotateX = function (a) {
                this.rotate3d({x: 1, angle: a})
            };
            f.prototype.rotateY = function (a) {
                this.rotate3d({
                    y: 1,
                    angle: a
                })
            };
            f.prototype.rotateZ = function (a) {
                this.rotate3d({z: 1, angle: a})
            };
            f.prototype.origin = function (a) {
                a = d(a);
                var b;
                if (b = a[0])this.centre[0] = b;
                if (b = a[1])this.centre[1] = b;
                if (a = a[2])this.centre[2] = a
            };
            e.methods = ["properties", "timingFunction", "duration", "delay"];
            e.parse = function (a, b) {
                var c = e.methods, d = {}, g = new e, f, k;
                q.forEach(a, function (b) {
                    -1 !== c.indexOf(b) ? "properties" === b && "string" == typeof b ? g[b] = [a[b]] : "timingFunction" === b && "string" !== typeof a[b] ? g[b] = "cubic-bezier(" + a[b].join(",") + ")" : "duration" ===
                    b ? (f = p(a[b])) && (g[b] = f) : "delay" === b ? (k = p(a[b])) && (g[b] = k) : g[b] = a[b] : d[b] = a[b]
                });
                return {result: g, remainder: d}
            };
            e.prototype.hasDuration = function () {
                return 0 !== this.duration[1]
            };
            e.prototype.getDuration = function () {
                var a = this.duration;
                return "s" === a[0] ? 1E3 * a[1] : a[1]
            };
            e.prototype.hasDelay = function () {
                return 0 !== this.delay[1]
            };
            e.prototype.getDelay = function () {
                var a = this.delay;
                return "s" === a[0] ? 1E3 * a[1] : a[1]
            };
            e.prototype.build = function (a) {
                a = a || {};
                a.transitionProperty = "string" == typeof this.properties ? this.properties :
                    this.properties.join(", ");
                a.transitionDuration = this.duration[1] + this.duration[0];
                a.transitionDelay = this.delay[1] + this.delay[0];
                this.timingFunction && (a.transitionTimingFunction = this.timingFunction);
                return a
            };
            k.prototype.hasDuration = function () {
                return this.transition && this.transition.hasDuration()
            };
            k.prototype.getTotalDuration = function () {
                return this.transition ? this.transition.getDuration() + this.transition.getDelay() : 0
            };
            k.prototype.exec = function (a) {
                var b = this.style;
                !1 !== w("animation") && this.transition &&
                (b = this.transition.build(b));
                this.transform && (b = this.transform.build(b));
                a.setStyles(b)
            };
            g.prototype.run = function () {
                var a = this, b = a.operations.shift();
                if (!b)return a.fired = !0, a;
                var c = !1 === w("animation") ? 10 : b.getTotalDuration() || 10;
                Eb(function () {
                    b.exec(a.element)
                }, 10);
                a.internalTimeout = Eb(function () {
                    delete a.internalTimeout;
                    m.call(a);
                    a.run()
                }, c);
                a.callback = b.callback;
                return a
            };
            g.prototype.pause = function () {
                this.element && this.element.setStyle("animationPlayState", "paused")
            };
            g.prototype.resume = function () {
                this.element &&
                this.element.setStyle("animationPlayState", null)
            };
            g.prototype.reset = function () {
                this.callback = null;
                this.internalTimeout && (db(this.internalTimeout), delete this.internalTimeout);
                this.element && this.element.setStyle("transition", null)
            };
            g.prototype.animate = function (a, b) {
                !a.callback && b && (a.callback = b);
                return !0 === a.relative && this.lastAnimation ? r.call(this, new k(a, this.lastAnimation)) : r.call(this, new k(a))
            };
            l.animate = function (a, b, c) {
                var d = new g(a);
                if (!0 === b.relative) {
                    var e = new k({}), l = new f, m = new Jb;
                    m.setMatrixValue(a.style[Ab]);
                    l.ctm = m;
                    e.transform = l;
                    d.lastAnimation = e
                }
                d.animate(b, c);
                return d.run()
            };
            f.methods.forEach(function (a) {
                l[a] = function (b, c, d, e) {
                    var g = {};
                    g[a] = c;
                    return l.animate(b, g, d, e)
                };
                g.prototype[a] = function (b, c, d) {
                    var e = {};
                    e[a] = b;
                    return this.animate(e, c, d)
                }
            });
            return l
        }();
        (function () {
            try {
                Ia(ca)
            } catch (a) {
                Nb = r
            }
            ba(Nb) && (Nb = function (a, b) {
                var f;
                try {
                    f = R.createEvent("CustomEvent")
                } catch (e) {
                }
                if (!f)try {
                    f = R.createEvent("Event")
                } catch (k) {
                }
                if (!f)try {
                    f = R.createEvent("HTMLEvent")
                } catch (g) {
                }
                b = b || {};
                b.detail = b.detail || null;
                b.bubbles =
                    !0 === b.bubbles;
                b.catchable = !0 === b.catchable;
                if (f && f.initCustomEvent)f.initCustomEvent(a, b.bubbles, b.catchable, b.detail); else if (f && f.initEvent)f.initEvent(a, b.bubbles, b.catchable), f.detail = b.detail; else throw Qa("No CustomEvent support");
                return f
            });
            var b = function (a) {
                "object" !== z(a.detail) && fc("Event implementation is incorrect");
                m.removeEventListener(ca, b)
            };
            m.addEventListener(ca, b);
            R.dispatchEvent(Ia(ca, {}, !0))
        })();
        (function () {
            function a(b) {
                return 10 > b ? "0" + b : b
            }

            function b(a) {
                f.lastIndex = 0;
                return f.test(a) ?
                '"' + a.replace(f, function (a) {
                    var b = r[a];
                    return "string" === z(b) ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + a + '"'
            }

            function d(a, c) {
                var f, m, h, r, q = e, T, I = c[a];
                I && "object" === z(I) && "function" === z(I.toJSON) && (I = I.toJSON(a));
                "function" === z(g) && (I = g.call(c, a, I));
                switch (typeof I) {
                    case "string":
                        return b(I);
                    case "number":
                        return isFinite(I) ? M(I) : "null";
                    case "boolean":
                    case "null":
                        return M(I);
                    case "object":
                        if (!I)return "null";
                        e += k;
                        T = [];
                        if ("[object Array]" === Hc.call(I)) {
                            r = I.length;
                            for (f = 0; f < r; f +=
                                1)T[f] = d(f, I) || "null";
                            h = 0 === T.length ? "[]" : e ? "[\n" + e + T.join(",\n" + e) + "\n" + q + "]" : "[" + T.join(",") + "]";
                            e = q;
                            return h
                        }
                        if (g && "object" === typeof g)for (r = g.length, f = 0; f < r; f += 1)"string" === typeof g[f] && (m = g[f], (h = d(m, I)) && T.push(b(m) + (e ? ": " : ":") + h)); else for (m in I)Ba(I, m) && (h = d(m, I)) && T.push(b(m) + (e ? ": " : ":") + h);
                        h = 0 === T.length ? "{}" : e ? "{\n" + e + T.join(",\n" + e) + "\n" + q + "}" : "{" + T.join(",") + "}";
                        e = q;
                        return h
                }
            }

            ba(ga) && (ga = m.JSON = {});
            "function" !== z(bd.toJSON) && (dataProto.toJSON = function () {
                return isFinite(this.valueOf()) ?
                this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
            }, la.toJSON = wb.prototype.toJSON = oc.prototype.toJSON = function () {
                return this.valueOf()
            });
            var c = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, k, g, r = {
                "\b": "\\b",
                "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"
            };
            "function" !== z(ga.stringify) && (ga.stringify = function (a, b, c) {
                var f;
                k = e = "";
                if ("number" === z(c))for (f = 0; f < c; f += 1)k += " "; else"string" === z(c) && (k = c);
                if ((g = b) && "function" !== z(b) && ("object" !== z(b) || "number" !== z(b.length)))throw Qa("JSON.stringify");
                return d("", {"": a})
            });
            "function" !== z(ga.parse) && (ga.parse = function (a, b) {
                function d(a, c) {
                    var e, f = a[c];
                    f && "object" === z(f) && Ba(f, void 0) && (e = d(f, void 0), Y(e) ? f[void 0] = e : delete f[void 0]);
                    return b.call(a,
                        c, f)
                }

                var e;
                a = M(a);
                c.lastIndex = 0;
                c.test(a) && (a = a.replace(c, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }));
                if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return e = ub("return (" + a + ")").call(null), "function" === z(b) ? d({"": e}, "") : e;
                throw Qa("JSON.parse");
            });
            if ("function" !== z(ga.fromXML))var q = ga.fromXML = function (a) {
                var b = {};
                if (1 == a.nodeType) {
                    if (0 <
                        a.attributes.length) {
                        b["@attributes"] = {};
                        for (var c = 0; c < a.attributes.length; c++) {
                            var d = a.attributes.item(c);
                            b["@attributes"][d.nodeName] = d.nodeValue
                        }
                    }
                } else 3 == a.nodeType && (b = a.nodeValue);
                if (a.hasChildNodes())for (c = 0; c < a.childNodes.length; c++) {
                    var d = a.childNodes.item(c), e = d.nodeName;
                    if ("undefined" == typeof b[e])b[e] = q(d); else {
                        if ("undefined" == typeof b[e].push) {
                            var f = b[e];
                            b[e] = [];
                            b[e].push(f)
                        }
                        b[e].push(q(d))
                    }
                }
                return b
            }
        })();
        (function () {
            C.forEach || (C.forEach = function (a, d) {
                var c = 0;
                if (ba(this))throw gb;
                for (var f =
                    q(this), e = f.length >>> 0; c < e;)c in f && Ba(f, c) && a.call(d, f[c], c, f), c++
            });
            C.each || q.defineProperty(C, "each", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function (a, d) {
                    var c = 0;
                    if (ba(this))throw gb;
                    for (var f = q(this), e = f.length >>> 0; c < e && !(c in f && Ba(f, c) && !1 === a.call(d, f[c], c, f));)c++
                }
            });
            C.lastIndexOf || q.defineProperty(C, "lastIndexOf", {
                enumerable: !1, configurable: !1, writable: !1, value: function (a) {
                    if (ba(this))throw gb;
                    var d, c = q(this), f = c.length >>> 0;
                    if (0 === f)return -1;
                    d = f - 1;
                    1 < arguments.length && (d = wb(arguments[1]),
                        d != d ? d = 0 : 0 !== d && d != 1 / 0 && d != -(1 / 0) && (d = (0 < d || -1) * x.floor(x.abs(d))));
                    for (d = 0 <= d ? x.min(d, f - 1) : f - x.abs(d); 0 <= d; d--)if (d in c && c[d] === a)return d;
                    return -1
                }
            });
            C.unique || q.defineProperty(C, "unique", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function () {
                    return this.filter(function (a, d, c) {
                        return c.indexOf(a) === d
                    })
                }
            });
            C.merge || q.defineProperty(C, "merge", {
                enumerable: !1, configurable: !1, writable: !1, value: function () {
                    for (var a = 0; a < arguments.length; a++)for (var d = arguments[a], c = 0; c < d.length; c++)-1 === this.indexOf(d[c]) &&
                    this.push(d[c]);
                    return this
                }
            });
            C.erase || q.defineProperty(C, "erase", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function () {
                    this.length = 0;
                    return this
                }
            });
            C.contains || q.defineProperty(C, "contains", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function (a) {
                    return -1 < this.indexOf(a)
                }
            });
            C.shuffle || q.defineProperty(C, "shuffle", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function (a) {
                    for (var d, c = this.length, f = a ? this : this.concat(); --c;)a = x.floor(x.random() * c), d = f[a], f[a] = f[c], f[c] = d;
                    return f
                }
            });
            C.indexOf ||
            (C.indexOf = function (a) {
                for (var d = 0; d < this.length; d++)if (this[d] === a)return d;
                return -1
            });
            C.map || q.defineProperty(C, "map", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function (a, d) {
                    if (ba(this))throw gb;
                    for (var c = this.length >>> 0, f = V(c), e = 0; e < c; e++)e in this && Ba(this, e) && (f[e] = a.call(d, this[e], e, this));
                    return f
                }
            });
            C.pluck || q.defineProperty(C, "pluck", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function (a) {
                    return this.map(function (d) {
                        return d[a]
                    })
                }
            });
            C.filter || q.defineProperty(C, "filter", {
                enumerable: !1,
                configurable: !1, writable: !1, value: function (a, d) {
                    if (ba(this))throw gb;
                    for (var c = q(this), f = c.length >>> 0, e = [], k = 0; k < f; k++)if (k in c && Ba(c, k)) {
                        var g = c[k];
                        a.call(d, g, k, c) && e.push(g)
                    }
                    return e
                }
            });
            C.every || q.defineProperty(C, "every", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function (a, d) {
                    if (ba(this))throw gb;
                    for (var c = q(this), f = c.length >>> 0, e = 0; e < f; e++)if (e in c && Ba(c, e) && !a.call(d, c[e], e, c))return !1;
                    return !0
                }
            });
            C.some || q.defineProperty(C, "some", {
                enumerable: !1, configurable: !1, writable: !1, value: function (a,
                                                                                 d) {
                    if (ba(this))throw gb;
                    for (var c = q(this), f = c.length >>> 0, e = 0; e < f; e++)if (e in c && Ba(c, e) && a.call(d, c[e], e, c))return !0;
                    return !1
                }
            });
            C.clean || q.defineProperty(C, "clean", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function (a) {
                    return this.filter(function (d) {
                        return null !== d && Y(d) && !1 === a && "" !== d
                    })
                }
            });
            C.diff || q.defineProperty(C, "diff", {
                enumerable: !1, configurable: !1, writable: !1, value: function (a) {
                    return this.filter(function (d) {
                        return -1 === a.indexOf(d)
                    })
                }
            });
            C.clone || q.defineProperty(C, "clone", {
                enumerable: !1,
                configurable: !1, writable: !1, value: function () {
                    return ua(this)
                }
            });
            C.keySort || function () {
                q.defineProperty(C, "keySort", {
                    enumerable: !1, configurable: !1, writable: !1, value: function (a) {
                        a = a || {};
                        var d = "object" === z(a) ? q.keys(a) : [], c = d.length;
                        if (!c)return this.sort(a);
                        q.forEach(a, function (a, b) {
                            this[a] = "desc" === b || -1 === b ? -1 : "skip" === b || 0 === b ? 0 : 1
                        }, a);
                        this.sort(function (f, e) {
                            for (var k = 0, g = 0; 0 === k && g < c;) {
                                var m = d[g];
                                if (m) {
                                    var k = f[m], r = e[m], m = a[m], m = null !== m ? m : 1, k = k == r ? 0 : k > r ? 1 * m : -1 * m;
                                    g++
                                }
                            }
                            return k
                        });
                        return this
                    }
                })
            }();
            V.forEach || (V.forEach = function (a, d, c) {
                C.forEach.call(a, d, c)
            });
            V.each || (V.each = function (a, d, c) {
                C.each.call(a, d, c)
            });
            V.slice || (V.slice = function (a, d, c) {
                return C.slice.call(a, d, c)
            });
            V.from || (V.from = function (a) {
                return "object" === z(a) ? [a] : Oa(a)
            });
            V.of || (V.of = function () {
                return Oa(arguments)
            });
            V.pluck || (V.pluck = function (a, d) {
                return a && C.pluck.call(a, d) || []
            });
            V.push || (V.push = function (a, d) {
                return a && C.push.call(a, d) || []
            });
            V.join || (V.join = function (a, d) {
                return a && C.join.call(a, d) || []
            });
            xa.bind || (xa.bind = function (a) {
                var d =
                    C.slice.call(arguments, 1), c = this, f = function () {
                }, e = function () {
                    return c.apply(this instanceof f && a ? this : a, d.concat(Oa(arguments)))
                };
                f.prototype = this.prototype;
                e.prototype = new f;
                return e
            });
            xa.bindTo || (xa.bindTo = xa.bind);
            xa.pass || (xa.pass = function (a, d) {
                a = a || [];
                a = [].concat(a);
                var c = this;
                return function () {
                    return c.apply(d, a.concat(Oa(arguments)))
                }
            });
            xa.delay || (xa.delay = function (a, d, c) {
                return Eb(this.pass(c, d), a)
            });
            xa.defer || (xa.defer = xa.delay);
            xa.periodical || (xa.periodical = function (a, d, c) {
                return Mb(this.pass(c,
                    d), a)
            });
            q.merge || (q.merge = Ga);
            q.forEach || (q.forEach = function (a, d, c) {
                for (var f in a)f in a && Ba(a, f) && d.call(c || a, f, a[f], a)
            });
            q.sort || (q.sort = function (a) {
                var d = {};
                q.keys(a).sort().forEach(function (c) {
                    d[c] = a[c]
                });
                return d
            });
            q.each || (q.each = function (a, d, c) {
                for (var f in a)if (f in a && Ba(a, f) && !1 === d.call(c || a, f, a[f], a))break
            });
            q.keyOf || (q.keyOf = function (a, d) {
                for (var c in a)if (c === d)return c;
                return r
            });
            q.indexOf || (q.indexOf = function (a, d) {
                for (var c in a)if (a[c] === d)return c;
                return r
            });
            q.flip || (q.flip = function (a) {
                var d =
                {}, c;
                for (c in a)c in a && Ba(a, c) && (d[a[c]] = c);
                return d
            });
            q.keys || (q.keys = function (a) {
                var d = [], c;
                for (c in a)c in a && Ba(a, c) && d.push(c);
                return d
            });
            q.values || (q.values = function (a) {
                var d = [], c;
                for (c in a)c in a && Ba(a, c) && d.push(a[c]);
                return d
            });
            q.contains || (q.contains = function (a, d, c) {
                var f, e = !1, k;
                for (k in a)if (k in a && Ba(a, k) && (f = c ? k : a[k], f === d)) {
                    e = k;
                    break
                }
                return e
            });
            q.clone || (q.clone = function (a) {
                return ua(a)
            });
            q.create || (q.create = function () {
                var a = function () {
                };
                return function (d) {
                    if (1 < arguments.length)throw Qa("Second argument not supported");
                    if ("object" != typeof d)throw gb("Argument must be an object");
                    a.prototype = d;
                    var c = new a;
                    a.prototype = null;
                    return c
                }
            }());
            if (!q.toQueryString) {
                var a = function (a) {
                    return "%" + a.charCodeAt(0).toString(16)
                };
                q.toQueryString = function (b) {
                    var d = [], c = function (b, e) {
                        e || (e = "");
                        for (var k in b) {
                            var g = b[k];
                            g && ("" !== e && (k = e + "[" + k + "]"), "object" === z(g) ? c(g, k) : d.push(encodeURIComponent(k) + "=" + encodeURIComponent(g).replace(/[!*()']/g, a)))
                        }
                    };
                    c(b);
                    return d.join("&")
                }
            }
            q.getFromPath || (q.getFromPath = function (a, d) {
                "string" === typeof d &&
                (d = d.split("."));
                for (var c = 0, f = d.length; c < f; c++)if (Ba(a, d[c]))a = a[d[c]]; else return null;
                return a
            });
            ka.now || (ka.now = function () {
                return +new Date
            });
            M.sprintf || (M.sprintf = Vc);
            M.htmlDecode || (M.htmlDecode = function (a) {
                var d = La("a");
                d.innerHTML = a;
                return d.textContent
            });
            M.vsprintf || (M.vsprintf = function (a, d) {
                return M.sprintf.apply(this, [a].concat(d))
            });
            M.parseQueryString || (M.parseQueryString = function (a) {
                return qb(a)
            });
            la.trim || (la.trim = function () {
                return M(this).replace(/^\s+|\s+$/g, "")
            });
            la.truncate || (la.truncate =
                function (a) {
                    return this.length > a ? this.substr(0, a).replace(/\W*\s(\S)*$/, "&hellip;") : this
                });
            la.stripTags || (la.stripTags = function (a, d) {
                return M(this).replace(Xc(a, d), "")
            });
            la.htmlEscape || (la.htmlEscape = function () {
                return M(this).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            });
            la.clean || (la.clean = function () {
                return M(this).replace(/\s+/g, " ").trim()
            });
            la.repeat || (la.repeat = function (a, d) {
                a = Yb(a) ? 1 : a;
                for (var c = [], f = a; f--;)c.push(M(this));
                return c.join(d ||
                    "")
            });
            la.reverse || (la.reverse = function () {
                return Oa(this).reverse().join("")
            });
            la.camelize || (la.camelize = function () {
                return M(this).replace(/-\D/g, function (a) {
                    return Pa(a.charAt(1))
                })
            });
            la.capitalize || (la.capitalize = function () {
                return M(this).replace(/\b[a-z]/g, function (a) {
                    return Pa(a)
                })
            });
            la.hyphenate || (la.hyphenate = function () {
                return M(this).replace(/[A-Z]/g, function (a) {
                    return "-" + za(a.charAt(0))
                })
            });
            la.contains || (la.contains = function (a) {
                return -1 < M(this).indexOf(a)
            });
            la.dasherize || (la.dasherize = function () {
                var a =
                    M(this);
                return -1 === a.indexOf("_") ? za(a.replace(/[A-Z]/g, "-$&")) : a.replace(/_/g, "-")
            });
            Gc.toFixed || (Gc.toFixed = function (a) {
                a = x.pow(10, a || 0);
                return M(x.round(this * a) / a)
            });
            wb.random || (wb.random = function (a, d) {
                return x.floor(x.random() * (d - a + 1) + a)
            })
        })();
        var fd = function () {
            function a(b) {
                return m(k(q(b)))
            }

            function b(a) {
                return r(k(q(a)))
            }

            function d(a, b) {
                return l(k(q(a)), b)
            }

            function c(a, b) {
                return m(g(q(a), q(b)))
            }

            function f(a, b) {
                return r(g(q(a), q(b)))
            }

            function e(a, b, c) {
                return l(g(q(a), q(b)), c)
            }

            function k(a) {
                return w(h(n(a),
                    8 * a.length))
            }

            function g(a, b) {
                var c = n(a);
                16 < c.length && (c = h(c, 8 * a.length));
                for (var d = V(16), e = V(16), f = 0; 16 > f; f++)d[f] = c[f] ^ 909522486, e[f] = c[f] ^ 1549556828;
                c = h(d.concat(n(b)), 512 + 8 * b.length);
                return w(h(e.concat(c), 672))
            }

            function m(a) {
                for (var b = "", c, d = 0; d < a.length; d++)c = a.charCodeAt(d), b += "0123456789abcdef".charAt(c >>> 4 & 15) + "0123456789abcdef".charAt(c & 15);
                return b
            }

            function r(a) {
                for (var b = Kc + "+/", c = "", d = a.length, e = 0; e < d; e += 3)for (var f = a.charCodeAt(e) << 16 | (e + 1 < d ? a.charCodeAt(e + 1) << 8 : 0) | (e + 2 < d ? a.charCodeAt(e +
                        2) : 0), g = 0; 4 > g; g++)c = 8 * e + 6 * g > 8 * a.length ? c + "=" : c + b.charAt(f >>> 6 * (3 - g) & 63);
                return c
            }

            function l(a, b) {
                var c = b.length, d = [], e, f, g, k, h = V(x.ceil(a.length / 2));
                for (e = 0; e < h.length; e++)h[e] = a.charCodeAt(2 * e) << 8 | a.charCodeAt(2 * e + 1);
                for (; 0 < h.length;) {
                    k = [];
                    for (e = g = 0; e < h.length; e++)if (g = (g << 16) + h[e], f = x.floor(g / c), g -= f * c, 0 < k.length || 0 < f)k[k.length] = f;
                    d[d.length] = g;
                    h = k
                }
                c = "";
                for (e = d.length - 1; 0 <= e; e--)c += b.charAt(d[e]);
                d = x.ceil(8 * a.length / (x.log(b.length) / x.log(2)));
                for (e = c.length; e < d; e++)c = b[0] + c;
                return c
            }

            function q(a) {
                for (var b =
                    "", c = -1, d, e; ++c < a.length;)d = a.charCodeAt(c), e = c + 1 < a.length ? a.charCodeAt(c + 1) : 0, 55296 <= d && 56319 >= d && 56320 <= e && 57343 >= e && (d = 65536 + ((d & 1023) << 10) + (e & 1023), c++), 127 >= d ? b += Va(d) : 2047 >= d ? b += Va(192 | d >>> 6 & 31, 128 | d & 63) : 65535 >= d ? b += Va(224 | d >>> 12 & 15, 128 | d >>> 6 & 63, 128 | d & 63) : 2097151 >= d && (b += Va(240 | d >>> 18 & 7, 128 | d >>> 12 & 63, 128 | d >>> 6 & 63, 128 | d & 63));
                return b
            }

            function n(a) {
                for (var b = V(a.length >> 2), c = 0, c = 0; c < b.length; c++)b[c] = 0;
                for (c = 0; c < 8 * a.length; c += 8)b[c >> 5] |= (a.charCodeAt(c / 8) & 255) << 24 - c % 32;
                return b
            }

            function w(a) {
                for (var b =
                    "", c = 0; c < 32 * a.length; c += 8)b += Va(a[c >> 5] >>> 24 - c % 32 & 255);
                return b
            }

            function h(a, b) {
                a[b >> 5] |= 128 << 24 - b % 32;
                a[(b + 64 >> 9 << 4) + 15] = b;
                for (var c = V(80), d = 1732584193, e = -271733879, f = -1732584194, g = 271733878, k = -1009589776, h = 0; h < a.length; h += 16) {
                    for (var m = d, l = e, r = f, n = g, q = k, H = 0; 80 > H; H++) {
                        if (16 > H)c[H] = a[h + H]; else {
                            var P = c[H - 3] ^ c[H - 8] ^ c[H - 14] ^ c[H - 16];
                            c[H] = P << 1 | P >>> 31
                        }
                        var P = d << 5 | d >>> 27, Na;
                        Na = 20 > H ? e & f | ~e & g : 40 > H ? e ^ f ^ g : 60 > H ? e & f | e & g | f & g : e ^ f ^ g;
                        P = p(p(P, Na), p(p(k, c[H]), 20 > H ? 1518500249 : 40 > H ? 1859775393 : 60 > H ? -1894007588 : -899497514));
                        k = g;
                        g = f;
                        f = e << 30 | e >>> 2;
                        e = d;
                        d = P
                    }
                    d = p(d, m);
                    e = p(e, l);
                    f = p(f, r);
                    g = p(g, n);
                    k = p(k, q)
                }
                return V(d, e, f, g, k)
            }

            function p(a, b) {
                var c = (a & 65535) + (b & 65535);
                return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
            }

            function z() {
            }

            z.prototype = {
                constructor: z, hex: function (b, d) {
                    return (d ? c : a)(b, d)
                }, b64: function (a, c) {
                    return (c ? f : b)(a, c)
                }, any: function (a, b, c) {
                    return (c ? e : d)(a, b, c)
                }
            };
            return new z
        }(), ta = function (a, b) {
            a = a && za(a);
            b = b && za(b);
            var d = /(nativexrebrowser|nativexrereceiver|tnt browser|netfront|nds|nsn|webshell|belgacom|airties|ekioh|hawaii|cisco|espial)/.exec(a) ||
                /(webkit|firefox)[ \/]([\w.]+)/.exec(a) || /(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(trident)(?:.*rv:([\w.]+))/.exec(a) || /(msie|) ([\w.]+)/.exec(a) || [], c = d[1] || "unknown", f = /mobile|midp/.test(a), e = b && "activevideo" === b && b, d = parseFloat(d[2] || 0);
            switch (c) {
                case "trident":
                    c = "msie";
                    break;
                case "msie":
                    d = R.documentMode || d;
                    break;
                case "ipod":
                case "ipad":
                case "iphone":
                case "safari":
                case "chrome":
                case "netfront":
                    c = "webkit";
                    break;
                case "nativexrebrowser":
                case "nativexrereceiver":
                    e = "rdk";
                    c = "webkit";
                    break;
                case "tnt browser":
                    e = "naf";
                    c = "webkit";
                    break;
                case "hawaii":
                case "cisco":
                    ra.scale = 720;
                    e = "cisco";
                    c = "webkit";
                    break;
                case "ekioh":
                    e = "opentv";
                    c = "webkit";
                    break;
                case "webshell":
                    e = "cubiware";
                    c = "webkit";
                    break;
                case "belgacom":
                    e = "wyplay";
                    c = "webkit";
                    break;
                case "nsn":
                    e = "accenture";
                    c = "webkit";
                    break;
                case "nds":
                    e = c;
                    c = "webkit";
                    break;
                case "airties":
                    e = c;
                    c = "opera";
                    break;
                case "espial":
                    e = c;
                    c = "webkit";
                    break;
                case "opera":
                case "firefox":
                case "webkit":
                    break;
                default:
                    c = "unkown"
            }
            f = {name: c, version: d, mobile: f};
            if (e = e || w("middleware"))f.middleware =
                e, f[e] = !0;
            f[c] = !0;
            return f
        }(mc.userAgent, mc.vendor), gd = function () {
            function a() {
                this.clear()
            }

            a.uid = 0;
            a.prototype = {
                constructor: a, get: function (a) {
                    return (a = this._data[this.hash(a)]) && a[1]
                }, set: function (a, d) {
                    this._data[this.hash(a)] = [a, d]
                }, has: function (a) {
                    return this.hash(a)in this._data
                }, remove: function (a) {
                    delete this._data[this.hash(a)]
                }, type: function (a) {
                    var d = pb.toString.call(a), d = za(d.slice(8, -1));
                    return "domwindow" !== d || a ? d : a + ""
                }, count: function () {
                    var a = 0, d;
                    for (d in this._data)a++;
                    return a
                }, clear: function () {
                    delete this._data;
                    this._data = {}
                }, hash: function (b) {
                    switch (this.type(b)) {
                        case "undefined":
                        case "null":
                        case "boolean":
                        case "number":
                        case "regexp":
                            return b + "";
                        case "date":
                            return ":" + b.getTime();
                        case "string":
                            return '"' + b;
                        case "array":
                            for (var d = [], c = 0; c < b.length; c++)d[c] = this.hash(b[c]);
                            return "[" + d.join("|");
                        default:
                            return b._hmuid_ || (b._hmuid_ = ++a.uid, q.defineProperty && q.defineProperty(b, "_hmuid_", {enumerable: !1})), "{" + b._hmuid_
                    }
                }, forEach: function (a, d) {
                    d = d || this;
                    for (var c in this._data) {
                        var f = this._data[c];
                        a.apply(d, [f[1],
                            f[0]])
                    }
                }
            };
            return a
        }(), sa = function () {
            function q(a, b) {
                return ma(x.sqrt(x.pow(b[0] - a[0], 2) + x.pow(b[1] - a[1], 2)))
            }

            function b(a) {
                a && ba(a._elementID) && (a._elementID = ++Aa);
                return a._elementID
            }

            function d(a, b) {
                if (a && a.retrieve)return a.retrieve(b)
            }

            function c(a, b, c) {
                a && a.store && (ba(c) ? a.eliminate(b) : a.store(b, c));
                return a
            }

            function f(a) {
                return d(a, "type")
            }

            function e(a, b) {
                return d(a, "type") === b
            }

            function k(a, b) {
                if (d(a, "recalc") || b)c(a, "recalc"), "center" === a.hAlign && (a.hOffset = a.hOffset), "center" === a.vAlign && (a.vOffset =
                    a.vOffset)
            }

            function g(a) {
                var b = a && a.target || this;
                if (b && b !== R.activeElement && (a.type !== Hb || b.allowNavigation)) {
                    for (var c = f(b); b && "window" !== c && "view" !== c && "dialog" !== c;) {
                        if (b === R.activeElement)return;
                        if (!b.hasFocus && b.focusable && !b.disabled) {
                            switch (a.type) {
                                case Hb:
                                    b.focus && b.focus();
                                    break;
                                case Pb:
                                    b.removeClass("focused")
                            }
                            return
                        }
                        b = b.parentNode;
                        c = f(b)
                    }
                    a.stopPropagation();
                    a.preventDefault()
                }
            }

            function p(a) {
                if (!a.defaultPrevented)switch (a.type) {
                    case "focus":
                        this.addClass("focused");
                        break;
                    case "blur":
                        this.removeClass("focused")
                }
            }

            function y(a) {
                (a && a.target || this).dispatchEvent(Ia("layoutchange"))
            }

            function l(a) {
                return e(a, "text") ? a.lastChild : r
            }

            function D(a) {
                return "string" === z(a) ? a.stripTags("video").stripTags("script").stripTags("object").stripTags("iframe").replace(/\r\n/g, " ").replace(/\n/g, " ").replace(/\r/g, " ") : Yb(a) ? "" : M(a)
            }

            function n() {
                var a = l(this), b;
                a && this.allowChangeEvents && (c(this, "textBounds"), c(this, "totalLines"), a.height = null, this.textPaging && (b = this.height, a.height = x.ceil(ma(yb(a, "height")) / b) * b), y.delay(300,
                    this))
            }

            function C(a, b) {
                Ua && !Ua.frozen && Ua.src && (Ua.contentWindow.postMessage(ga.stringify({
                    type: "key",
                    message: {
                        type: a || "down",
                        keyCode: b.keyCode,
                        key: b.key,
                        shiftKey: b.shiftKey,
                        altKey: b.altKey,
                        ctrlKey: b.ctrlKey
                    }
                }), "*"), b.preventDefault())
            }

            var h = m.Element && m.Element.prototype, V = m.HTMLElement && m.HTMLElement.prototype, X = m.HTMLImageElement && m.HTMLImageElement.prototype || V, T = m.Event && m.Event.prototype, I = m.KeyboardEvent && m.KeyboardEvent.prototype, ca = "hOffset vOffset hAlign vAlign width height rotate zOrder opacity visible anchorStyle wrap truncation".split(" "),
                fa = {}, Aa = 0, la, ua;
            if (ba(h))throw Qa("Element needs to exist");
            (function () {
                var a = {};
                (function (c) {
                    V.addEventListener = function (d, e, f) {
                        f = !0 === f;
                        a[d] || (a[d] = []);
                        var g = this._elementID || b(this);
                        a[d].push({id: g, type: d, fn: e, capture: f});
                        return c.apply(this, [d, e, f])
                    }
                })(V.addEventListener);
                (function (b) {
                    V.removeEventListener = function (c, d, e) {
                        var f = this, g = [];
                        if (!d && f) {
                            e = [];
                            if ("string" === typeof c)e = [c]; else for (var k in a)e.push(k);
                            if (0 === e.length)return;
                            e.forEach(function (b) {
                                g = a[b] ? g.concat(a[b].filter(function (a) {
                                    return a.id ===
                                        f._elementID
                                })) : g
                            })
                        } else if (f && c)g = a[c] ? g.concat(a[c].filter(function (a) {
                            return a.id === f._elementID && a.fn === d
                        })) : g; else return;
                        0 !== g.length && g.forEach(function (c) {
                            var d = a[c.type], e = d && d.indexOf(c);
                            Y(e) && -1 < e && d.splice(e, 1);
                            d && 0 === d.length && delete a[c.type];
                            b.apply(f, [c.type, c.fn, c.capture])
                        })
                    }
                })(V.removeEventListener)
            })();
            h.getBoundingClientRect || (h.getBoundingClientRect = function () {
                for (var a = this, b = a.offsetWidth, c = a.offsetHeight, b = {
                    left: 0,
                    top: 0,
                    right: b,
                    bottom: c,
                    width: b,
                    height: c
                }; a && a !== Ha;) {
                    var c =
                        a.offsetLeft, d = a.offsetTop;
                    b.left += c;
                    b.top += d;
                    b.right += c;
                    b.bottom += d;
                    a = a.offsetParent
                }
                return b
            });
            var Q = "top bottom left right width height".split(" ");
            Rb(h, {
                getBounds: function () {
                    var a = this.getBoundingClientRect();
                    return {
                        top: x.round(a.top / Ja),
                        bottom: x.round((a.bottom || a.top + a.height) / Ja),
                        left: x.round(a.left / Ea),
                        right: x.round(a.right / Ea),
                        width: x.round((a.width || a.right - a.left) / Ea),
                        height: x.round((a.height || a.bottom - a.top) / Ja)
                    }
                }, addClass: function (a) {
                    var b = this.className;
                    if (!this.hasClass(a))return "" !==
                    b && (a = " " + a), this.className = b + a, this
                }, hasClass: function (a) {
                    return eb("\\s?\\b" + a + "\\b", "g").test(this.className)
                }, removeClass: function (a) {
                    var b = this.className;
                    a = eb("\\s?\\b" + a + "\\b", "g");
                    this.className = b = b.replace(a, "")
                }, setStyles: function (a) {
                    for (var b in a || {})this.setStyle(b, a[b]);
                    return this
                }, getStyle: function (a) {
                    var b;
                    b = -1 === ca.indexOf(a) ? lb(this, a) : this[a];
                    !ba(b) && "auto" !== b && "inherit" !== b || -1 === Q.indexOf(a) || (b = this.getBounds()[a]);
                    return b
                }, setStyle: function (a, b) {
                    a = -1 !== a.indexOf("-") ? a.camelize() :
                        a;
                    if (-1 !== ca.indexOf(a))return this[a] = b, this;
                    switch (a) {
                        case "boxShadow":
                            if (ta.nds || !1 === w("animation") || !1 === w("gpu"))return;
                            break;
                        case "textShadow":
                            if (!1 === w("animation") || !1 === w("gpu"))return;
                            break;
                        case "borderTopLeftRadius":
                        case "borderBottomLeftRadius":
                        case "borderTopRightRadius":
                        case "borderBottomRightRadius":
                        case "borderRadius":
                            isNaN(b) || (b += "px");
                            break;
                        case "textDecoration":
                            e(this, "text") && (l(this).style[a] = b);
                            break;
                        case "fontSize":
                            b && (!isNaN(b) || -1 < b.indexOf("px")) && (b = (ma(b) / 24).toFixed(3) +
                                "em");
                            break;
                        case "display":
                            ta.firefox || "box" !== b && "flex" !== b || (b = ab + b);
                            break;
                        case "transform":
                            if (!1 === w("gpu") && "translateZ(0)" === b)return this;
                            !0 === w("3d") && "translateZ(0)" === b && (b = "translate3d(0,0,0)");
                            a = (ab + a.hyphenate()).camelize();
                            break;
                        case "columnCount":
                        case "columnGap":
                        case "boxSizing":
                        case "boxOrient":
                        case "boxOrdinalGroup":
                        case "animationPlayState":
                        case "perspective":
                        case "mask":
                        case "maskClip":
                        case "maskOrigin":
                        case "maskAttachment":
                        case "maskComposite":
                        case "maskRepeat":
                        case "maskRepeat":
                        case "transformOrigin":
                        case "transformStyle":
                            a =
                                (ab + a.hyphenate()).camelize();
                            break;
                        case "transition":
                        case "transitionProperty":
                        case "transitionDuration":
                        case "transitionDelay":
                        case "transitionTimingFunction":
                            if (!1 === w("animation"))return this;
                            a = (ab + a.hyphenate()).camelize();
                            break;
                        case "flex":
                        case "flexWrap":
                        case "order":
                            ta.firefox || (a = (ab + a.hyphenate()).camelize());
                            break;
                        case "maskImage":
                        case "maskBoxImage":
                            if (ta.nds)return;
                            a = (ab + a.hyphenate()).camelize();
                            "none" === b && (b = null);
                            b && 0 !== b.indexOf("url(") && (b = "url(" + b + ")");
                            break;
                        case "backgroundImage":
                            "none" ===
                            b && (b = null), b && 0 !== b.indexOf("url(") && (b = "url(" + b + ")")
                    }
                    this.style[a] = b;
                    return this
                }, getTextBounds: function (a) {
                    var b = !a && d(this, "textBounds");
                    !e(this, "text") || !a && b || (b = Ec(l(this), !0 === a), !a && 0 < b.width && 0 < b.height && c(this, "textBounds", b));
                    return b || {width: 0, height: 0}
                }, animate: function (a, b) {
                    return hc.animate(this, a || {}, b)
                }, store: function (a, c) {
                    var d = this._elementID || b(this);
                    ba(fa[d]) && (fa[d] = {});
                    fa[d] && (fa[d][a] = c)
                }, retrieve: function (a) {
                    var c = this._elementID || b(this);
                    return fa && fa[c] && fa[c][a]
                }, eliminate: function (a) {
                    var b =
                        this._elementID;
                    b && fa[b] && delete fa[b][a]
                }, appendTo: function (a) {
                    return this.inject(a)
                }, inject: function (a, b) {
                    if ("top" === b && a) {
                        var c = a.firstChild || r;
                        c ? a.insertBefore(this, c) : b = r
                    }
                    b && "bottom" !== b || !a || a.appendChild(this);
                    k(this);
                    return this
                }, detach: function () {
                    this.parentNode && this.parentNode.removeChild && this.parentNode.removeChild(this);
                    return this
                }, empty: function (a) {
                    var b;
                    if (!this.firstChild || 1 !== this.firstChild.nodeType)return this;
                    for (; b = this.lastChild;) {
                        var c = b.owner;
                        b.destroy && b.destroy.call ? b.destroy() :
                        b && b.parentNode && b.parentNode.removeChild(b);
                        b && c && (delete b.owner, a || c.suicide())
                    }
                    return this
                }, destroy: function (a) {
                    var b = this.detach(), c = M(b._elementID);
                    b.owner && delete b.owner;
                    b.removeEventListeners && b.removeEventListeners();
                    "image" === f(b) && b.removeAttribute("src");
                    b.removeAttribute("style");
                    b.removeAttribute("class");
                    b.removeAttribute("id");
                    fa[c] && delete fa[c];
                    delete b._elementID;
                    b.empty(a);
                    return qc.call(b)
                }, removeFromParentNode: function () {
                    return this.destroy()
                }, createImage: function () {
                    return La("img").addClass("image")
                },
                select: function () {
                    this.focusable && !this.disabled && (kb("app") || this.dispatchEvent(Ia("select", r, !0, !0)));
                    return this
                }, back: function () {
                    return this.dispatchEvent(Ia("back", r, !0, !0))
                }, navigate: function (a, b, c) {
                    ka.now();
                    var d;
                    a:if (e(this, "view"))d = this; else for (var g = (d = this.parentNode) && f(d); d && g && "view" !== g && "dialog" !== g && !d.innerNavigation;) {
                        if ("window" === g) {
                            d = !1;
                            break a
                        }
                        g = (d = d.parentNode) && f(d)
                    }
                    var k = d || this;
                    d = this.getBounds() || {};
                    var g = d.width - (this.scrollLeft || 0), h = d.height - (this.scrollTop || 0), m =
                        [], l = "array" === z(b);
                    if (k && !kb("app")) {
                        k = Y(k.querySelectorAll) ? k.querySelectorAll("[tabindex]:not([class*=disabled])") || [] : k.getElementsByTagName("*") || [];
                        l || ("left" === a || "right" === a ? b = [d[a], d.top + h / 2] : "up" === a ? b = [d.left + g / 2, d.top] : "down" === a && (b = [d.left + g / 2, d.bottom]));
                        for (var n = 0; n < k.length; n++) {
                            var u = k[n], p = f(u);
                            if (u.focusable && !u.disabled && "window" !== p && u !== this && u.allowNavigation && (l || "view" !== p) && "hidden" !== (jc(u, null) || {}).visibility) {
                                var p = ("innerText" === p ? u.parentNode : u).getBounds() || {}, w,
                                    t;
                                if ("left" === a || "right" === a) {
                                    w = p["left" === a ? "right" : "left"];
                                    t = p.top + p.height / 2;
                                    x.abs(t - b[1]) >= x.abs(p.bottom - b[1]) && (t = p.bottom - p.height / 2);
                                    if (p.top < d.top || p.top > d.top + h)continue;
                                    if ("right" === a && b[0] - g / 2 >= w)continue; else if ("left" === a && b[0] + g / 2 <= w)continue
                                } else if ("up" === a || "down" === a)if (w = p.left + p.width / 2, t = p["up" === a ? "bottom" : "top"], x.abs(w - b[0]) >= x.abs(p.right - b[0]) && (w = p.right - p.width / 2), "up" === a && (b[1] + h / 2 <= t || p.top >= d.top))continue; else if ("down" === a && (b[1] - h / 2 >= t || p.top < d.top))continue;
                                m.push({
                                    distance: q(b,
                                        [w, t]),
                                    x: p.left,
                                    y: "left" === a || "right" === a ? x.abs(p.top - d.top) : p.top,
                                    el: u
                                })
                            }
                        }
                        return 0 < m.length ? ("left" === a || "right" === a ? m.keySort({
                            x: "left" === a ? "desc" : "asc",
                            y: "asc",
                            distance: "asc"
                        }) : m.keySort({
                            y: "up" === a ? "desc" : "asc",
                            distance: "asc"
                        }), b = m[0].el, !c && b && (ua = b, b.focus(), ua = r, la = a), b || !1) : !1
                    }
                }
            });
            a(h, "focusedView", function () {
                var a = R.activeElement, b = a.window, c = this.window, d = f(a);
                if ("window" === d || a === Ha || b === a || !c)return !1;
                if (b && "dialog" === f(b))return b;
                if ("view" === d)return a == c ? a : !1;
                for (a = a.parentNode; a;) {
                    if (a ===
                        c)return a;
                    a = a.parentNode
                }
                return !1
            });
            a(h, "window", function () {
                if (e(this, "view"))return this;
                for (var a = this.parentNode, b = a && f(a); a && b && "view" !== b && "dialog" !== b;) {
                    if ("window" === b)return !1;
                    a = a.parentNode;
                    b = f(a)
                }
                return a
            });
            a(h, "visible", function () {
                return "hidden" !== this.style.visibility
            });
            N(h, "visible", function (a) {
                this.style.visibility = !1 === a ? "hidden" : null
            });
            a(h, "focusable", function () {
                return this.wantsFocus
            });
            a(h, "hasFocus", function () {
                return this === R.activeElement
            });
            var O = ["focus", "blur"], oa = !0 === w("mouse");
            a(h, "wantsFocus", function () {
                return this.hasAttribute("tabindex")
            });
            N(h, "wantsFocus", function (a) {
                var b = f(this);
                !0 === a ? (this.setAttribute("tabindex", -1), O.forEach(function (a) {
                    this.addEventListener(a, p)
                }, this), oa && "window" !== b && "view" !== b && "dialog" !== b && (this.addEventListener(Hb, g), this.addEventListener(Pb, g))) : (oa && "window" !== b && "view" !== b && "dialog" !== b && (this.removeEventListener(Hb, g), this.removeEventListener(Pb, g)), O.forEach(function (a) {
                    this.removeEventListener(a, p)
                }, this), this.removeAttribute("tabindex"))
            });
            a(h, "frozen", function () {
                return this.hasClass("frozen")
            });
            N(h, "frozen", function (a) {
                var b = f(this);
                !0 === a ? this.addClass("text" === b ? "frozenText" : "frozen") : (this.removeClass("text" === b ? "frozenText" : "frozen"), k(this))
            });
            a(h, "updatesEnabled", function () {
                return !this.frozen
            });
            N(h, "updatesEnabled", function (a) {
                this.frozen = !1 === a
            });
            a(h, "zOrder", function () {
                return this.style.zIndex
            });
            N(h, "zOrder", function (a) {
                this.style.zIndex = a
            });
            a(h, "opacity", function () {
                return parseFloat(this.style.opacity || 1)
            });
            N(h, "opacity",
                function (a) {
                    this.style.opacity = 1 > a ? a : null
                });
            a(h, "allowNavigation", function () {
                var a = f(this);
                if (!1 === d(this, "allowNavigation"))return !1;
                if ("view" === a || "window" === a || "dialog" === a)return !0;
                for (var b = this.parentNode; b;) {
                    a = f(b);
                    if (!1 === d(b, "allowNavigation"))return !1;
                    if ("view" === a || "window" === a || "dialog" === a)break;
                    b = b.parentNode
                }
                return !0
            });
            N(h, "allowNavigation", function (a) {
                c(this, "allowNavigation", !0 === a ? r : !1)
            });
            a(h, "innerNavigation", function () {
                return !0 === this.retrieve("navigation")
            });
            N(h, "innerNavigation",
                function (a) {
                    !0 === a ? this.store("navigation", !0) : this.eliminate("navigation")
                });
            a(h, "disabled", function () {
                return this.hasClass("disabled")
            });
            N(h, "disabled", function (a) {
                !0 === a ? this.addClass("disabled") : this.removeClass("disabled")
            });
            var Z = {h: "left", v: "top", width: "h", height: "v"}, na = {bottom: "top", right: "left"};
            ["h", "v"].forEach(function (b) {
                a(h, b + "Align", function () {
                    return d(this, b + "Align") || Z[b]
                });
                N(h, b + "Align", function (a) {
                    a = a || Z[b];
                    var e = d(this, b + "Align") || Z[b];
                    if (e !== a) {
                        c(this, b + "Align", a);
                        a = this.style;
                        var g = this[b + "Offset"] || 0;
                        "center" === e ? (eliminate(this, b + "Offset"), e = "margin" + Z[b].capitalize(), a[Z[b]] = a[e] = null) : a[e] = null;
                        this[b + "Offset"] = g
                    }
                });
                a(h, b + "Offset", function () {
                    var a = f(this), c = this.style, e = this[b + "Align"];
                    if ("list" !== a && "item" !== a || "absolute" === c.position) {
                        if ("center" === e)return d(this, b + "Offset") || 0;
                        a = lb(this, e) || 0;
                        return "auto" !== a && "inherit" !== a && a ? parseFloat(a) : 0
                    }
                    return parseFloat(c["margin" + e.capitalize()]) || 0
                });
                N(h, b + "Offset", function (a) {
                    a = a || 0;
                    var d = f(this), e = this[b + "Align"], g =
                        this.style;
                    "list" !== d && "item" !== d || "absolute" === g.position ? "center" === e ? (c(this, b + "Offset", a), e = ("h" === b ? this.width : this.height) || 0, d = "margin" + Z[b].capitalize(), 0 < e ? (g[d] = a + e / 2 * -1 + "px", g[Z[b]] = "50%") : c(this, "recalc", !0)) : (d = na[e], "auto" === (d ? lb(this, d) : "auto") || g[d] || (g[d] = "auto"), g[e] = a) : g["margin" + e.capitalize()] = a
                })
            });
            ["width", "height"].forEach(function (b) {
                a(h, b, function () {
                    var a = f(this), c = this.retrieve("v_" + b);
                    if (c && !this.parentNode)return c;
                    var c = "c_" + b, d = this.retrieve(c) || lb(this, b) || 0, e = 0;
                    if ("text" ===
                        a)if (a = l(this), "height" === b) {
                        if (!d && 1 < this.maxVisibleLines)return this.maxVisibleLines * this.lineHeight;
                        d = d || this.textHeight
                    } else d = d || this.textWidth || Ec(a, !0).width;
                    "string" == typeof d && "auto" !== d && "inherit" !== d && -1 === d.indexOf("%") && (e = parseFloat(d)) && this.store(c, e);
                    return e || d
                });
                N(h, b, function (a) {
                    var d = "v_" + b, e = "c_" + b, g = f(this), h = Z[b];
                    a && !isNaN(a) ? this.store(d, a) : this.eliminate(d);
                    this.eliminate(e);
                    "image" === g ? (this.eliminate("original" + b.capitalize()), this.setAttribute(b, a)) : this.style[b] = isNaN(a) || !a ? a : a + "px";
                    "center" === this[h + "Align"] && c(this, "recalc", !0);
                    k(this)
                })
            });
            a(h, "lastNavigation", function () {
                return la
            });
            a(h, "currentNavigation", function () {
                return dc
            });
            a(h, "navigateTo", function () {
                return ua
            });
            a(h, "owner", function () {
                return d(this, "owner")
            });
            N(h, "owner", function (a) {
                c(this, "owner", a || r)
            });
            a(h, "rotate", function () {
                return this.retrieve("rotate") || 0
            });
            N(h, "rotate", function (a) {
                var b = this.style, c = b[Ab], c = c ? new Jb(c) : new Jb;
                b[Ab] = c.rotateAxisAngle(0, 0, 0, a);
                this.store("rotate", a)
            });
            a(h, "html", function () {
                return this.innerHTML ||
                    ""
            });
            N(h, "html", function (a) {
                this.innerHTML = a || ""
            });
            a(h, "textPaging", function () {
                return d(this, "textPaging") || !1
            });
            N(h, "textPaging", function (a) {
                c(this, "textPaging", a || r)
            });
            a(h, "allowChangeEvents", function () {
                return d(this, "allowChangeEvents") || !1
            });
            N(h, "allowChangeEvents", function (a) {
                var b = this.allowChangeEvents;
                !0 === b && this.removeEventListener("scroll", y);
                !0 === a && b !== a && this.addEventListener("scroll", y, !1);
                c(this, "allowChangeEvents", a || r)
            });
            ["data", "text"].forEach(function (b) {
                a(h, b, function () {
                    var a =
                        d(this, "originalText");
                    return a ? a : (a = l(this)) && a.html || ""
                });
                N(h, b, function (a) {
                    a = D(a);
                    var b = this, d = l(b);
                    if (d && d.html !== a) {
                        c(b, "textBounds");
                        c(b, "totalLines");
                        c(b, "visibleLines");
                        c(b, "c_width");
                        c(b, "c_height");
                        d.height = null;
                        d.html = a;
                        var e = b.maxVisibleLines;
                        b.wrap && 1 < e && (b.height = e * b.lineHeight);
                        "end" === b.truncation && b.wrap && (c(b, "originalText", a), Yc(d), 1 < e && b.textHeight < b.height && (b.height = b.textHeight));
                        if (b.allowChangeEvents) {
                            if ((a = b.getElementsByTagName("img")) && 0 < a.length)for (var g = function () {
                                n.call(b);
                                this.removeEventListener("load", g)
                            }, d = 0; d < a.length; d++)a[d].addEventListener("load", g);
                            n.call(b);
                            b.dispatchEvent(Ia("change"))
                        }
                    }
                })
            });
            a(h, "scrolling", function () {
                return e(this, "text") ? this.hasClass("scrollText") : !1
            });
            N(h, "scrolling", function (a) {
                e(this, "text") && (a ? this.addClass("scrollText") : this.removeClass("scrollText"))
            });
            a(h, "cursor", function () {
                var a = l(this);
                if (a && this.editable) {
                    var b = 0, c;
                    m.getSelection && a ? (c = m.getSelection(), 0 < c.rangeCount && (b = c.getRangeAt(0), c = b.cloneRange(), c.selectNodeContents(a),
                        c.setEnd(b.endContainer, b.endOffset), b = c.toString().length)) : R.selection && "Control" !== R.selection.type && a && (b = R.selection.createRange(), c = Ha.createTextRange(), c.moveToElementText(a), c.setEndPoint("EndToEnd", b), b = c.text.length);
                    return b || 0
                }
                return !1
            });
            N(h, "cursor", function (a) {
                var b = l(this);
                if (b && -1 < a && m.getSelection && b && b.firstChild) {
                    var c = m.getSelection();
                    if (0 < c.rangeCount) {
                        var d = c.getRangeAt(0), e = R.activeElement;
                        b.focus();
                        d.collapse(!0);
                        try {
                            d.setStart(b.firstChild, a), d.setEnd(b.firstChild, a), c.removeAllRanges(),
                                c.addRange(d)
                        } catch (g) {
                        }
                        e !== b && e.focus()
                    }
                }
            });
            a(h, "editable", function () {
                var a = l(this);
                return a && a.hasAttribute("contenteditable") || r
            });
            N(h, "editable", function (a) {
                var b = this, c = l(b);
                c && (!0 === a ? (c.wantsFocus = !0, ["focus", "blur"].forEach(function (a) {
                    this.addEventListener(a, function (c) {
                        b.dispatchEvent(Ia(a))
                    })
                }, c)) : (c.wantsFocus = !1, c.removeEventListeners()))
            });
            a(h, "color", function () {
                return this.style.color || r
            });
            N(h, "color", function (a) {
                this.style.color = a
            });
            a(h, "font", function () {
                return this.style.fontFamily ||
                    r
            });
            N(h, "font", function (a) {
                this.style.fontFamily = a
            });
            a(h, "truncated", function () {
                return this.textHeight > this.height
            });
            a(h, "truncation", function () {
                var a = l(this);
                return a && "ellipsis" === a.style.textOverflow ? "end" : r
            });
            N(h, "truncation", function (a) {
                var b = l(this);
                b && (b = b.style, "end" === a ? (b.overflow = "hidden", b.textOverflow = "ellipsis") : (b.overflow = "visible", b.textOverflow = "clip"))
            });
            a(h, "lineHeight", function () {
                var a = yb(this, "line-height");
                a && !this.parentNode ? a = 1.3 * Dc(this.style.fontSize || a) : "normal" !== a && a ||
                (a = 1.3 * Dc(yb(this, "font-size") || this.style.fontSize || "1.3em"));
                return parseFloat(a)
            });
            N(h, "lineHeight", function (a) {
                this.style.lineHeight = a
            });
            a(h, "textWidth", function () {
                return this.getTextBounds(!0).width
            });
            a(h, "textHeight", function () {
                return this.data && this.getTextBounds().height || this.lineHeight
            });
            a(h, "totalLines", function () {
                var a = l(this);
                if (a) {
                    var b = d(this, "totalLines");
                    if (!b) {
                        b = ma(yb(a, "height")) / this.lineHeight;
                        if (isNaN(b))return 0;
                        b = x.ceil(b);
                        c(this, "totalLines", b)
                    }
                    return b
                }
            });
            a(h, "maxVisibleLines",
                function () {
                    if (e(this, "text"))return d(this, "maxVisibleLines") || 1
                });
            a(h, "visibleLines", function () {
                if (e(this, "text")) {
                    var a = d(this, "visibleLines");
                    if (!a) {
                        var b = this.totalLines, a = ma(this.height / this.lineHeight);
                        a > b && (a = b);
                        c(this, "visibleLines", a)
                    }
                    return a
                }
            });
            N(h, "visibleLines", function (a) {
                e(this, "text") && (c(this, "visibleLines"), c(this, "maxVisibleLines", a), this.height = a * this.lineHeight)
            });
            a(h, "firstLine", function () {
                if (e(this, "text"))return ma((this.scrollTop || 0) / this.lineHeight)
            });
            N(h, "firstLine", function (a) {
                if (e(this,
                        "text")) {
                    if (0 < a) {
                        var b = this.totalLines / this.maxVisibleLines, d = x.floor(b), g = x.ceil(b);
                        d !== g && (c(this, "totalLines", this.maxVisibleLines * g), b = l(this), d = b.height / d * g, b.height = isFinite(d) ? d : null)
                    }
                    this.scrollTop = a * this.lineHeight
                }
            });
            a(h, "wrap", function () {
                return "nowrap" !== lb(this, "white-space")
            });
            N(h, "wrap", function (a) {
                var b = l(this);
                this.style.whiteSpace = a ? "normal" : "nowrap";
                b && (b.style.wordWrap = a ? "break-word" : "normal")
            });
            a(h, "anchorStyle", function () {
                var a = l(this);
                if (a)return ((a.style.textAlign || "left") +
                "-" + (a.style.verticalAlign || "top")).camelize()
            });
            N(h, "anchorStyle", function (a) {
                var b = l(this);
                b && a && (a = Cc(a), b = b.style, b.textAlign = a[0] || null, b.verticalAlign = a[1] || null)
            });
            a(V, "removeEventListeners", function () {
                return this.removeEventListener
            });
            a(X, "aspect", function () {
                return d(this, "aspect")
            });
            var t = "fit parent exact height width auto crop source original".split(" ");
            N(X, "aspect", function (a) {
                -1 !== t.indexOf(a) ? c(this, "aspect", a) : c(this, "aspect")
            });
            a(X, "source", function () {
                return this.retrieve("source") ||
                    ""
            });
            N(X, "source", function (a) {
                var b = this.retrieve("source");
                a !== b ? (this.store("source", a), this.hasAttribute("src") && this.removeAttribute("src"), a && this.setAttribute("src", a)) : a && this.dispatchEvent(Ia("load"))
            });
            a(X, "remoteAsync", function () {
                return !1 !== d(this, "remoteAsync")
            });
            N(X, "remoteAsync", function (a) {
                c(this, "remoteAsync", !1 !== a)
            });
            ["srcWidth", "srcHeight"].forEach(function (b) {
                a(X, b, function () {
                    return this[b.replace("src", "natural")]
                })
            });
            !0 === w("mouse") && m.addEventListener("mousedown", function (a) {
                var b =
                    a.target || R.activeElement;
                if (b && 1 === a.which) {
                    if (b.allowNavigation) {
                        for (; b && !b.focusable;)b = b.parentNode;
                        var c = f(b);
                        b && "window" !== c && "view" !== c && "dialog" !== c && b.select()
                    }
                    a.preventDefault()
                }
            });
            T && function (a) {
                T.preventDefault = function () {
                    a && a.call(this);
                    this.returnValue = !1
                }
            }(T.preventDefault);
            lc(I);
            var u = !0 === w("debugKeys");
            m.addEventListener("keyup", function (a) {
                u && U("KEYUP: " + (a.key || a.keyCode));
                if (!a.defaultPrevented && !Ua.frozen && Ua.src)return C("up", a)
            });
            m.addEventListener("keydown", function (a) {
                I ||
                ((I = m.KeyboardEvent && m.KeyboardEvent.prototype) ? lc(I) : u && U("NO KEYBOARDEVENT SUPPORT"));
                var b = a.key || null, c = R.activeElement || a.target, d;
                u && U("KEYDOWN: " + (a.key || a.keyCode) + " SHIFT: " + a.shiftKey + " ALT: " + a.altKey + " CTRL: " + a.ctrlKey);
                if (!a.defaultPrevented && !Ua.frozen && Ua.src)return C("down", a);
                if (!a.defaultPrevented && c) {
                    if ("back" === b)d = Ia("back", r, !0, !0); else {
                        if ("play" === b || "pause" === b || "playpause" === b || "stop" === b || "forward" === b || "rewind" === b) {
                            a.preventDefault();
                            return
                        }
                        if (kb("app") || "up" !== b && "down" !==
                            b && "left" !== b && "right" !== b) {
                            if ("enter" === b || "select" === b) {
                                c.select();
                                return
                            }
                            "home" === b && (d = Ia("home", r, !0, !0))
                        } else d = Ia("navigate", {direction: b}, !0, !0), dc = b
                    }
                    c && Y(d) && (c.dispatchEvent(d), a.preventDefault())
                }
            });
            m.addEventListener("navigate", function (a) {
                var b = a.detail && a.detail.direction || dc, c = a.target || R.activeElement;
                Y(b) && !a.defaultPrevented && c && (c.navigate(b) || c.dispatchEvent(Ia("navigateoutofbounds", {direction: b}, !0, !0)));
                dc = r
            });
            return function (a, b) {
                b = b || R;
                "string" === z(a) && Y(b) && (a = b.getElementById(a));
                return (a = a && a.nodeType && a.owner ? a.owner : a) || r
            }
        }(), uc = function (a) {
            for (var b = {}, d = 0; d < a.length; d++) {
                var c = a.split("?");
                Rb(b, qb(c[1]))
            }
            return b
        }(Z.href), md = function () {
            function C(a, b) {
                a = a || u;
                var c = Q[u] && Q[u].profile || !1;
                return oa[a] && c ? p.versions ? b !== r ? oa[a][c.languageCode] && oa[a][c.languageCode][b] || oa[a].en && oa[a].en[b] || (a !== t ? C(t, b) : b) || b : oa[a][c.languageCode] || oa[a].en : b !== r ? oa[a][c.locale] && oa[a][c.locale][b] || oa[a][c.languageCode + "-EU"] && oa[a][c.languageCode + "-EU"][b] || oa[a][zb] && oa[a][zb][b] ||
                (a !== t ? C(t, b) : b) || b : oa[a][c.locale] || oa[a][c.languageCode + "-EU"] || oa[a][zb] : b ? b : {}
            }

            function b(a) {
                return Zb("", p.appsPath || ra.apps || "apps", a)
            }

            function d(a, c) {
                a = a || u || t;
                return p.versions && O[a] ? b(c) + a + "/" + O[a].version + "-" + O[a].hash + "/" : b(c) + a + "/Contents/"
            }

            function c(b, c, d, e) {
                function g() {
                    h = !0;
                    d && d.stopPropagation && d.stopPropagation.call && d.stopPropagation()
                }

                function f() {
                    m = !0;
                    d && d.preventDefault && d.preventDefault.call && d.preventDefault()
                }

                function k() {
                    g();
                    f()
                }

                var h = !1, m = !1;
                a(this, "type", function () {
                    return b
                });
                a(this, "payload", function () {
                    return c || d.detail
                });
                a(this, "Event", function () {
                    return d
                });
                a(this, "HostEvent", function () {
                    return e
                });
                a(this, "stopPropagation", function () {
                    return g
                });
                a(this, "preventDefault", function () {
                    return f
                });
                a(this, "stop", function () {
                    return k
                });
                a(this, "propagationStopped", function () {
                    return h
                });
                a(this, "defaultPrevented", function () {
                    return m
                })
            }

            function f(a, b, c) {
                b.conf && b.conf.key && a === u && (Kb[b.conf.key] = c, k(a, "showDialog", b, va))
            }

            function e(a, b) {
                var c = b.conf && b.conf.key;
                c && (Kb[c] = null, delete Kb[c],
                a === u && k(a, "hideDialog", b, va))
            }

            function k(a, b, c, d) {
                if (!ba(Q[a])) {
                    "string" !== z(c) && (c = ga.stringify(c || {}));
                    a = Q[a];
                    b = new a.HostEvent(b, c);
                    b.error = !1;
                    b.onDoneCalled = !1;
                    b.onDone = d;
                    try {
                        a.widget.onHostEvent.call(a, b)
                    } catch (e) {
                        b.error = !0
                    }
                    b.onDone && !b.onDoneCalled && (b.onDoneCalled = !0, b.onDone.call(a, b))
                }
            }

            function g(a, b, c) {
                this.number = a || 0;
                this.name = b || "";
                this.description = c || "";
                this.widget = !1
            }

            function L(a, b, c, d, e) {
                this.title = a || "";
                this.description = b || "";
                this.startTime = c || Date.now();
                this.duration = d || 0;
                this.ageRating =
                    e || 0;
                this.widget = !1
            }

            function y(a, b, c, d) {
                this.title = a || "";
                this.description = b || "";
                this.poster = c;

                this.duration = d || 0;
                this.widget = !1
            }

            function l() {
                function b(a) {
                    return m[a]
                }

                function d(a) {
                    delete m[a];
                    k({key: a, value: null, deleted: !0})
                }

                function e(a, b) {
                    m[a] = ua(b);
                    k({key: a, value: b})
                }

                function g(a) {
                    m = {};
                    a && (l = [])
                }

                function f(a) {
                    return m[a] !== r
                }

                function k(a) {
                    var b = new c("onBroadcast", a);
                    l.forEach(function (a) {
                        a(b)
                    })
                }

                function h(a, b) {
                    q.forEach(m, a, b)
                }

                var m = {}, l = [], n = {};
                a(n, "onBroadcast", function () {
                    return l.length ? l :
                        []
                });
                N(n, "onBroadcast", function (a) {
                    a instanceof V && (l = a)
                });
                a(this, "fetch", function () {
                    return b
                });
                a(this, "exists", function () {
                    return f
                });
                a(this, "store", function () {
                    return e
                });
                a(this, "remove", function () {
                    return d
                });
                a(this, "reset", function () {
                    return g
                });
                a(this, "forEach", function () {
                    return h
                });
                a(this, "eventType", function () {
                    return "onBroadcast"
                });
                a(this, "subscribers", function () {
                    return n
                })
            }

            function D() {
                if (qa && qa.profile) {
                    var a = qa.profile.locale, b = qa.profile.languageCode, c = qa.profile.contryCode;
                    m.LGI && m.LGI.Guide &&
                    (m.LGI.Guide.config.region = Pa(c || "nl"));
                    if (m.moment)try {
                        moment.lang(a)
                    } catch (d) {
                        try {
                            moment.lang(b)
                        } catch (e) {
                            moment.lang("en")
                        }
                    }
                    if (m.numeral)try {
                        numeral.language(a)
                    } catch (g) {
                        try {
                            numeral.language(b)
                        } catch (f) {
                            numeral.language("en")
                        }
                    }
                }
            }

            function n() {
                function g(a) {
                    (function () {
                        m.__openUrl__ ? m.__openUrl__("webkit:" + a) : m.open(a)
                    }).delay(800)
                }

                function k(a) {
                    var b = Ua;
                    return b ? (a ? (b.setStyle("transformOrigin", "0 0"), b.src = a) : (b.frozen = !0, sa("viewport").frozen = !1, Q[u].focus(), b.removeAttribute("src"), b.removeAttribute("style")),
                        !0) : !1
                }

                function h() {
                    "hash host hostname href pathname port protocol search origin".split(" ").forEach(function (b) {
                        a(this, b, function () {
                            return Z[b] || ""
                        })
                    }, this)
                }

                function aa(a) {
                    a && a.url && !Fb.test(a.url) && 0 !== a.url.indexOf(b()) && (a.url = d() + a.url);
                    return new Na(a)
                }

                function l(a) {
                    a = a || {};
                    var b = l.Mutators, c = l.Methods, d = l.Libraries, e = function () {
                        for (var a in this)Y(this[a]) && "function" !== typeof this[a] && (this[a] = ua(this[a]));
                        this.constructor = e;
                        if (l._prototyping)return this;
                        a = !1 === e.prototype.config ? {} : arguments[0] ||
                        {};
                        this._classID = (a.ClassName || this.ClassName || "Instance") + "-" + ++r;
                        a.methods && b.Implements(this, a.methods);
                        delete a.methods;
                        this.addEvents(a.events);
                        delete a.events;
                        this.setConfig(a);
                        var c;
                        try {
                            c = Y(this.initialize) && this.initialize.call ? this.initialize.apply(this, arguments) : this, a.initialize && a.initialize.call(this)
                        } catch (d) {
                        }
                        return c
                    }, g;
                    for (g in b)b[g] && a[g] && (a = b[g](a, a[g], e), delete a[g]);
                    ["Config", "Events"].forEach(function (c) {
                        b.Implements(a, d[c])
                    });
                    a.toString = function () {
                        return "[Class] {" + (this._classID ||
                            "Proto") + "}"
                    };
                    Rb(e, this);
                    e.constructor = l;
                    e.prototype = a;
                    e.implement = c.implement;
                    e.getDefaults = c.getDefaults;
                    e.inheritsFrom = c.inheritsFrom;
                    return e
                }

                function pa(a, b) {
                    var c = a || "div";
                    b = b || {};
                    b.styles = b.styles || {};
                    switch (a) {
                        case "canvas":
                            c = "canvas";
                            break;
                        case "image":
                            c = "img";
                            break;
                        case "list":
                            c = "ul";
                            break;
                        case "item":
                            c = "li";
                            break;
                        case "window":
                            ba(b.focus) && (b.focus = !0);
                            c = "div";
                            break;
                        case "iframe":
                            a = "window";
                            c = "iframe";
                            break;
                        case "dialog":
                        case "view":
                        case "text":
                            c = "div";
                            break;
                        default:
                            a = "frame", c = "div"
                    }
                    c =
                        La(c).addClass(a);
                    c.store("type", a);
                    b.id && c.setAttribute("id", b.id);
                    !0 === b.focus && "image" !== a && (c.wantsFocus = b.focus);
                    !0 === b.frozen && (c.frozen = !0);
                    if (b.events)for (var d in b.events)b.events[d] && c.addEventListener(d, b.events[d]);
                    "image" === a ? ((b.src || b.source) && c.setAttribute("src", b.src || b.source), c.addEventListener("load", function (a) {
                        a = a.target || this;
                        var b = a.aspect, c = oc(a.frozen), d = a.srcWidth, e = a.srcHeight;
                        a.frozen = !0;
                        b && "fit" !== b && d && e && (a.setAttribute("width", d), a.setAttribute("height", e));
                        "center" ===
                        a.hAlign && (a.hOffset = a.hOffset);
                        "center" === a.vAlign && (a.vOffset = a.vOffset);
                        c || (a.frozen = !1)
                    }), c.addEventListener("error", function (a) {
                        a = a.target || this;
                        oc(a.frozen);
                        a.removeAttribute("src");
                        "center" === a.hAlign && (a.hOffset = a.hOffset);
                        "center" === a.vAlign && (a.vOffset = a.vOffset)
                    })) : "text" === a && (d = La("span"), d.store("type", "innerText"), d.addClass("innerText"), d.html = b.label || b.data || b.text || "", d.inject(c));
                    b.width && (b.styles.width = b.width);
                    b.height && (b.styles.height = b.height);
                    b.styles && c.setStyles(b.styles);
                    return c
                }

                function Xa(b, c) {
                    var d = null, e = !1;
                    this.onTimerFired = c;
                    this.interval = b || 0;
                    this.start = function () {
                        null === d && !e && 0 < this.interval && this.onTimerFired && (d = Mb(this.onTimerFired.bind(this), 1E3 * this.interval), e = !0)
                    };
                    this.stop = function () {
                        null !== d && e && (e = !1, Sb(d), d = null)
                    };
                    this.reset = function () {
                        this.stop();
                        this.start()
                    };
                    a(this, "ticking", function () {
                        return !0 === e
                    });
                    N(this, "ticking", function (a) {
                        !0 === a ? this.start() : this.stop()
                    })
                }

                function Mc(a) {
                    var b = new $a;
                    b.open("GET", Zb(a + "", p.versions ? "maf" : "lib"), !1);
                    b.send();
                    a = "";
                    4 === b.readyState && 200 === b.status && b.responseText && (a = ("\n" + b.responseText.replace(Tb, "")).replace(rc, function (a, b) {
                        return Mc(b)
                    }));
                    return a
                }

                ka.now();
                var n = {}, r = 0, K = this;
                K.console = {};
                ["log", "warn", "error"].forEach(function (b) {
                    a(this.console, b, function () {
                        return X
                    });
                    a(this, b, function () {
                        return this.console[b]
                    })
                }, K);
                a(K, "destroy", function () {
                    return function () {
                        n = K = null
                    }
                });
                a(K, "QRCode", function () {
                    return Hb
                });
                a(K, "getSetting", function () {
                    return w
                });
                a(K, "WebSocket", function () {
                    return nc
                });
                a(K, "MediaAsset",
                    function () {
                        return y
                    });
                a(K, "matchMedia", function () {
                    return m.matchMedia
                });
                ["window", "document", "widget", "filesystem"].forEach(function (b) {
                    a(K, b, function () {
                        if (Y(u))return Q[u][b]
                    })
                });
                var Nc = function () {
                    function b(a, c, d) {
                        d = Q[t].$_;
                        (new Na({
                            url: "//" + fa[6] + "." + ca + ".com/",
                            method: "post",
                            encoding: "utf-8",
                            data: {
                                to: a,
                                from: d("TWITTER_EMAIL_FROM"),
                                subject: d("TWITTER_EMAIL_SUBJECT"),
                                body: d("TWITTER_EMAIL_BODY", [c])
                            }
                        })).send()
                    }

                    function c(a, b, e, g, E, f) {
                        var B = {oauth: {}};
                        f = f || l;
                        g = g || {};
                        if (v[a]) {
                            var k = m.session;
                            k && k.token && !g.access_token ? (B.oauth.token = k.token, B.oauth.token_secret = k.secret) : g && g.verifier ? (B.oauth = g, g = {}) : B.oauth.callback = "oob";
                            return (new Na({
                                url: v[a] + b,
                                headers: {Accept: "application/json"},
                                method: -1 < Xa.indexOf(e) ? e : "get",
                                proxy: B,
                                data: g,
                                monitoring: !1,
                                onSuccess: function (a) {
                                    a = "string" === z(a) ? qb(a) : a;
                                    E.call(f, a, g)
                                },
                                onFailure: function (c) {
                                    if ("oauth" === a)E.call(f, c, g); else if ("account/verify_credentials.json" !== b) {
                                        c = c.status || 0;
                                        var e = f, B = {}, k = g;
                                        switch (c) {
                                            case 401:
                                                d()
                                        }
                                        401 !== c && E.call(e, B, k)
                                    }
                                },
                                onError: function (a) {
                                    if ("account/verify_credentials.json" !==
                                        b) {
                                        a = a.status || 0;
                                        var c = f, e = {}, B = g;
                                        switch (a) {
                                            case 401:
                                                d()
                                        }
                                        401 !== a && E.call(c, e, B)
                                    }
                                }
                            })).send()
                        }
                    }

                    function d(a) {
                        A && !1 !== m.session && new c("api", "account/verify_credentials.json", "get", null, function (b) {
                            b && b.id ? (m.user = b, m.session = Ga(m.session || {}, {installed: !0}), a && a.call && a()) : (m.user = {}, m.session = Ga(m.session || {}, {installed: !1}))
                        })
                    }

                    function g(a, B) {
                        if (A && !m.connected) {
                            var k = u, h, aa;
                            h = new c("oauth", "request_token", "get", null, function (l) {
                                var v = "https://api.twitter.com/oauth/authenticate?oauth_token=" + l.oauth_token,
                                    Xa = "email" === w("twitter");
                                f(k, {
                                    type: "twitter-" + (Xa ? "login" : "qrcode"),
                                    conf: {
                                        type: Xa ? "email" : "qrcode",
                                        ignoreBackKey: !1,
                                        key: l.oauth_token,
                                        title: "TWITTER_CONNECT",
                                        message: B ? "TWITTER_INVALIDCODE" : Xa ? "TWITTER_EMAIL" : "TWITTER_QRCODE",
                                        code: l.oauth_callback_confirmed,
                                        url: v
                                    }
                                }, function (B) {
                                    h && h.abort();
                                    aa && aa.abort();
                                    Xa && B && B.response && 5 < B.response.length && b(B.response, v);
                                    Y(B.response) && f(k, {
                                        type: "twitter-login", conf: {
                                            type: "code",
                                            maxLength: 7,
                                            layout: "pinentry",
                                            ignoreBackKey: !1,
                                            key: v,
                                            title: "TWITTER_CONNECT",
                                            message: "TWITTER_CODE",
                                            code: B.key
                                        }
                                    }, function (b) {
                                        b.response && 7 === b.response.length ? aa = new c("oauth", "access_token", "get", {
                                            verifier: b.response,
                                            token: l.oauth_token,
                                            token_secret: l.oauth_token_secret
                                        }, function (c) {
                                            c.oauth_token && (m.session = Ga(m.session || {}, {
                                                token: c.oauth_token,
                                                secret: c.oauth_token_secret,
                                                id: c.user_id,
                                                installed: !0
                                            }));
                                            h = aa = null;
                                            d(function () {
                                                e(u, {conf: {key: b.code}});
                                                a && a.call && a()
                                            });
                                            401 === c.status && g(a, !0)
                                        }) : g(a, !0)
                                    })
                                })
                            })
                        }
                    }

                    function B() {
                        if (A && m.connected) {
                            for (var a = Oa(arguments), b = a.shift(), d = a.shift(), e, f, E; d;) {
                                var k =
                                    z(d);
                                if ("string" !== k || e)if ("function" !== k || E) {
                                    if ("object" !== k || f)return;
                                    f = d
                                } else E = d; else e = za(d);
                                d = a.shift()
                            }
                            e = e || "get";
                            f = f || {};
                            "/" === b[0] && (b = b.substr(1));
                            if ("me" === b && m.user && m.user.id)return m.user;
                            "me" === b && (b = "account/verify_credentials.json");
                            return new c("api", b, e, f, E, l)
                        }
                        if (A) {
                            var h = Oa(arguments), aa = arguments.callee;
                            g(function () {
                                aa.apply(l, h)
                            })
                        }
                    }

                    function k() {
                        Ca && Sb(Ca);
                        d()
                    }

                    function h(a) {
                        a && "string" === z(a) && (A = a, k(), Ca = Mb(d, 5E5))
                    }

                    var aa = qa, l = {subscribers: {}}, m = {}, v = {
                        oauth: "https://api.twitter.com/oauth/",
                        api: "https://api.twitter.com/1.1/"
                    }, Xa = ["get", "post", "delete", "put"], A, Ca;
                    a(m, "session", function () {
                        var a = aa.profile.passport.get("twitter");
                        return a && a.token ? a : !1
                    });
                    N(m, "session", function (a) {
                        var b = aa.profile.passport;
                        if (a && null !== a) {
                            var c = this.connected;
                            b.set("twitter", a);
                            c !== a.installed && S.call(Nc, a.installed ? "onConnected" : "onDisconnected")
                        } else b.remove("twitter")
                    });
                    a(m, "connected", function () {
                        return (aa.profile.passport.get("twitter") || {}).installed || !1
                    });
                    (function (a) {
                        switch (a.type) {
                            case "onLoadProfile":
                                (function () {
                                    S.call(l,
                                        m.connected ? "onConnected" : "onUnpairedProfile")
                                }).delay(100);
                                break;
                            case "onUnloadProfile":
                                (function () {
                                    S.call(l, "onDisconnected")
                                }).delay(100)
                        }
                    }).subscribeTo(qa, ["onLoadProfile", "onUnloadProfile"]);
                    a(l, "init", function () {
                        return h
                    });
                    a(l, "reset", function () {
                        return k
                    });
                    a(l, "api", function () {
                        return B
                    });
                    a(l, "login", function () {
                        return g
                    });
                    a(l, "logout", function () {
                        return qa.logout
                    });
                    a(l, "userId", function () {
                        return m.session && m.session.id
                    });
                    a(l, "userInfo", function () {
                        return m.user
                    });
                    a(l, "getImageById", function () {
                        return X
                    });
                    return l
                }(), x = function () {
                    function b(a, c, d, e, g, f) {
                        f = f || m;
                        e = e || {};
                        if (v[a]) {
                            var E = l.session;
                            E && E.token && !e.access_token && (e.access_token = E.token, e.locale = aa.profile.locale.replace("-", "_"));
                            return (new Na({
                                url: v[a] + c,
                                headers: {Accept: "application/json"},
                                method: -1 < Xa.indexOf(d) ? d : "get",
                                proxy: !0,
                                data: e,
                                monitoring: !1,
                                isSuccess: function () {
                                    var a = this.status;
                                    return 200 <= a && 300 > a || 400 === a || 500 === a
                                },
                                onSuccess: function (a) {
                                    a && a.error && 190 === a.error.code && (l.session = null);
                                    g.call(f, a, e)
                                },
                                onError: function () {
                                    Ib(arguments)
                                }
                            })).send()
                        }
                    }

                    function c(a) {
                        Ca && !1 !== l.session ? new b("graph", "me?fields=installed", "get", null, function (b) {
                            b && b.id && (l.session = Ga(l.session || {}, b), a && a.call && a())
                        }) : !1 === l.session && l.connected && (l.session = null)
                    }

                    function d(a) {
                        if (Ca && !l.connected && !A) {
                            var g = !1, B = u, k, h;
                            k = new b("graph", "oauth/device", "post", {
                                    type: "device_code",
                                    client_id: Ca,
                                    scope: "user_activities,user_checkins,user_events,user_about_me,user_friends,user_likes,user_location,user_photo_video_tags,user_photos,user_questions,user_status,user_videos,friends_activities,friends_checkins,friends_events,friends_likes,friends_location,friends_photo_video_tags,friends_photos,friends_questions,friends_status,friends_videos,export_stream,publish_actions,publish_checkins,publish_stream,status_update,user_actions.books,user_actions.fitness,user_actions.music,user_actions.news,user_actions.video"
                                },
                                function (d) {
                                    A = !0;
                                    f(B, {
                                        type: "facebook-login",
                                        conf: {
                                            ignoreBackKey: !1,
                                            key: d.code,
                                            title: "FB_CONNECT",
                                            message: "FB_CODE",
                                            code: d.user_code
                                        }
                                    }, function () {
                                        g = !0;
                                        A = !1;
                                        k && k.abort();
                                        h && h.abort()
                                    });
                                    h = new b("graph", "oauth/device", "post", {
                                        type: "device_token",
                                        client_id: Ca,
                                        code: d.code
                                    }, function (b, f) {
                                        l.session && l.session.id ? (k = h = null, c(function () {
                                            e(u, {conf: {key: d.code}});
                                            a && a.call && a();
                                            A = !1
                                        })) : b && b.error && 1 === b.error.code && !g ? B === u ? h.send.delay(3E3) : (e(u, {conf: {key: d.code}}), a && a.call && a(), A = !1) : b && b.access_token && 0 <
                                        b.access_token.length ? (l.session = Ga(l.session || {}, {
                                            code: f.code,
                                            token: b.access_token
                                        }), k = h = null, c(function () {
                                            e(u, {conf: {key: d.code}});
                                            a && a.call && a();
                                            A = !1
                                        })) : A = !1
                                    })
                                })
                        }
                    }

                    function g() {
                        if (Ca && l.connected) {
                            for (var a = Oa(arguments), c = a.shift(), e = a.shift(), f, B, k; e;) {
                                var h = z(e);
                                if ("string" !== h || f)if ("function" !== h || k) {
                                    if ("object" !== h || B)return;
                                    B = e
                                } else k = e; else f = za(e);
                                e = a.shift()
                            }
                            f = f || "get";
                            B = B || {};
                            "/" === c[0] && (c = c.substr(1));
                            return new b("graph", c, f, B, k, m)
                        }
                        if (Ca) {
                            var aa = Oa(arguments), v = arguments.callee;
                            d(function () {
                                v.apply(m,
                                    aa)
                            })
                        }
                    }

                    function B(a, b) {
                        return v.graph + a + "/picture?type=" + (b || "small") + "&access_token=" + (l.session && l.session.token || "")
                    }

                    function k() {
                        pa && Sb(pa);
                        c()
                    }

                    function h(a) {
                        a && "string" === z(a) && (Ca = a, k(), pa = Mb(c, 6E4))
                    }

                    var aa = qa, m = {subscribers: {}}, l = {}, v = {
                        api: "https://api.facebook.com/",
                        api_read: "https://api-read.facebook.com/",
                        graph: "https://graph.facebook.com/"
                    }, Xa = ["get", "post", "delete", "put"], A = !1, Ca, pa;
                    a(l, "session", function () {
                        var a = aa.profile.passport.get("facebook");
                        return a && a.token ? a : !1
                    });
                    N(l, "session",
                        function (a) {
                            var b = aa.profile.passport;
                            if (a && null !== a) {
                                var c = this.connected, d = a.installed || !1;
                                b.set("facebook", a);
                                c !== d && S.call(m, d ? "onConnected" : "onDisconnected")
                            } else b.remove("facebook")
                        });
                    a(l, "connected", function () {
                        return (aa.profile.passport.get("facebook") || {}).installed || !1
                    });
                    (function (a) {
                        switch (a.type) {
                            case "onLoadProfile":
                                (function () {
                                    S.call(m, l.connected ? "onConnected" : "onUnpairedProfile")
                                }).delay(0);
                                break;
                            case "onUnloadProfile":
                                (function () {
                                    S.call(m, "onDisconnected")
                                }).delay(0)
                        }
                    }).subscribeTo(qa,
                        ["onLoadProfile", "onUnloadProfile"]);
                    a(m, "init", function () {
                        return h
                    });
                    a(m, "reset", function () {
                        return k
                    });
                    a(m, "api", function () {
                        return g
                    });
                    a(m, "logout", function () {
                        return qa.logout
                    });
                    a(m, "login", function () {
                        return d
                    });
                    a(m, "userId", function () {
                        return l.session && l.session.id
                    });
                    a(m, "getImageById", function () {
                        return B
                    });
                    return m
                }();
                a(K, "Facebook", function () {
                    return x
                });
                a(K, "Twitter", function () {
                    return Nc
                });
                var wa = function () {
                    return {
                        get: function (a) {
                            var b = Oa(arguments), c = "", d = "stack" === a || "fa-stack" === a;
                            d && (c += '<span class="fa-stack">',
                                b.splice(0, 1));
                            b.forEach(function (a) {
                                var b = "fa ";
                                [].concat(a).forEach(function (a) {
                                    b += ("fa-" === a.substr(0, 3) ? "" : "fa-") + a + " "
                                });
                                c += '<i class="' + b.trim() + '"></i>'
                            });
                            d && (c += "</span>");
                            return c
                        }
                    }
                }();
                a(K, "FontAwesome", function () {
                    return wa
                });
                a(K, "CSSMatrix", function () {
                    return Jb
                });
                a(K, "Animator", function () {
                    return hc
                });
                var Wb = m.requestAnimationFrame || m.webkitRequestAnimationFrame || m.mozRequestAnimationFrame || m.msRequestAnimationFrame || m.oRequestAnimationFrame || function (a) {
                        return Eb(a, 1 / 30)
                    }, ic = function (a) {
                    return Wb.call(m,
                        a)
                };
                a(K, "requestAnimationFrame", function () {
                    return ic
                });
                var xc = m.cancelAnimationFrame || m.webkitCancelAnimationFrame || m.mozCancelAnimationFrame || m.msCancelAnimationFrame || m.oCancelAnimationFrame || function (a) {
                        db(a)
                    }, Fa = function (a) {
                    return xc.call(m, a)
                };
                a(K, "cancelAnimationFrame", function () {
                    return Fa
                });
                a(K, "HashMap", function () {
                    return gd
                });
                a(K, "getter", function () {
                    return a
                });
                a(K, "setter", function () {
                    return N
                });
                a(K, "current", function () {
                    return Q[u]
                });
                a(K, "getComputedStyle", function () {
                    return jc
                });
                a(K, "md5",
                    function () {
                        return Aa
                    });
                a(K, "sha1", function () {
                    return fd
                });
                a(K, "JSON", function () {
                    return ga
                });
                a(K, "XMLDOM", function () {
                    return Ic
                });
                a(K, "unlink", function () {
                    return ua
                });
                a(K, "clone", function () {
                    return ua
                });
                a(K, "typeOf", function () {
                    return z
                });
                a(K, "random", function () {
                    return Qb
                });
                a(K, "open", function () {
                    return ta.activevideo ? g : X
                });
                ["emptyFn", "confirm", "prompt"].forEach(function (b) {
                    a(this, b, function () {
                        return X
                    })
                }, K);
                var ya = {
                    Theme: new Ab,
                    Stats: {},
                    Library: {},
                    element: {},
                    control: {},
                    dialogs: {},
                    media: {},
                    system: {Event: c},
                    keyboard: {},
                    utility: {vsprintf: M.vsprintf},
                    views: {}
                }, ha = ya.Library;
                a(m.MAF, "Notification", function () {
                    return {ALERT: "alert", CALL2ACTION: "c2a"}
                });
                a(m.MAF, "system", function () {
                    return {
                        setState: function () {
                            return ja.setState && ja.setState.apply(ja, arguments)
                        }, setMode: function () {
                            return ja.setMode && ja.setMode.apply(ja, arguments)
                        }, notify: function () {
                            var a = ja.players && 0 < ja.players.length && ja.players[0];
                            return a && a.notify && a.notify.apply(a, arguments)
                        }
                    }
                });
                a(ya, "Notification", function () {
                    return m.MAF.Notification
                });
                a(ya.system, "setState", function () {
                    return m.MAF.system.setState
                });
                a(ya.system, "setMode", function () {
                    return m.MAF.system.setMode
                });
                a(ya.system, "setUrl", function () {
                    return k
                });
                a(ya.system, "notify", function () {
                    return widget.notify
                });
                h.prototype = {
                    constructor: h, toString: function () {
                        return this.valueOf()
                    }, valueOf: function () {
                        return M(Z)
                    }, reload: X, replace: X, assign: X
                };
                a(K, "location", function () {
                    return new h
                });
                a(K, "navigator", function () {
                    return mc
                });
                a(K, "Browser", function () {
                    return ta
                });
                a(ya, "Browser", function () {
                    return ta
                });
                a(ya, "Event", function () {
                    return c
                });
                a(K, "YouTube", function () {
                    return Nb
                });
                a(ya, "Request", function () {
                    return aa
                });
                ["Event", "Request", "Theme", "Library"].forEach(function (b) {
                    a(this, b, function () {
                        return ya[b]
                    })
                }, K);
                ["innerWidth", "outerWidth"].forEach(function (b) {
                    a(this, b, function () {
                        return 1920
                    })
                }, K);
                ["innerHeight", "outerHeight"].forEach(function (b) {
                    a(this, b, function () {
                        return 1080
                    })
                }, K);
                a(K, "screen", function () {
                    var a = this.innerWidth, b = this.innerHeight;
                    return {availWidth: a, availHeight: b, width: a, height: b, log: tc.log}
                });
                a(K, "XMLHttpRequest", function () {
                    return $a
                });
                a(K, "profile", function () {
                    return qa.profile
                });
                var bb = ja.GenericStorage, F = new bb("pd", !0);
                a(K, "GenericStorage", function () {
                    return bb
                });
                a(K, "currentProfileData", function () {
                    return F
                });
                "Array Boolean Date Function Number String RegExp".split(" ").forEach(function (b) {
                    var c, d = "is" + b;
                    /String|Number|Boolean/.test(b) && (c = za(b));
                    ya[d] = "Array" === b && V.isArray || function (a) {
                            return c && z(a) === c ? !0 : Hc.call(a) === "[object " + b + "]"
                        };
                    a(this, d, function () {
                        return this.MAF[d]
                    })
                }, K);
                a(K, "isEmpty", function () {
                    return Yb
                });
                ha.Storage = {
                    store: function (a, b) {
                        var c = this._classID;
                        ba(n[c]) && (n[c] = {});
                        n[c][a] = b
                    }, retrieve: function (a) {
                        var b = this._classID;
                        return n[b] && n[b][a]
                    }, eliminate: function (a) {
                        var b = this._classID;
                        n[b] && n[b][a] && delete n[b][a]
                    }
                };
                ha.DOM = {
                    appendChild: function (a) {
                        a = sa(a);
                        if (!a || !a.element)return !1;
                        this.children.push(a);
                        a.owner = this;
                        a.element.inject(this.element);
                        this.fire("onChildAppended", {child: a});
                        a.fire("onAppend", {parent: this.element, owner: this});
                        return this
                    }, adopt: function () {
                        Oa(arguments).forEach(this.appendChild,
                            this);
                        return this
                    }, appendTo: function (a) {
                        a = sa(a);
                        if (!a || !a.element)return !1;
                        a.appendChild(this);
                        return this
                    }, moveTo: function (a) {
                        var b = sa(this.element);
                        b && b.owner ? b.owner.detachChild(b) : b && b.detachChild(b);
                        b.appendTo(a);
                        return this
                    }, detachChild: function (a) {
                        var b;
                        if (this.children) {
                            if ("string" === z(a)) {
                                switch (a) {
                                    case "first":
                                        b = 0;
                                        break;
                                    case "last":
                                        b = this.children.length - 1
                                }
                                a = this.children[b]
                            } else"number" === z(a) ? (b = a, a = this.children[b]) : a && a.owner === this && (b = this.children.indexOf(a));
                            Y(b) && this.children.splice(b,
                                1)
                        }
                        delete a.owner;
                        return a
                    }, removeChild: function (a) {
                        this.detachChild(a);
                        this.fire("onChildRemoved", {child: a});
                        return a
                    }, removeChildren: function () {
                        if (this.children) {
                            for (; this.children.length;) {
                                var a = this.children.pop();
                                delete a.owner;
                                a.suicide()
                            }
                            delete this.children
                        }
                        return this
                    }, suicide: function () {
                        var a = this.owner;
                        M(this.ClassName);
                        a && a.removeChild(this);
                        delete this.subscribers;
                        delete this.data;
                        delete this.config;
                        this._classID && n[this._classID] && delete n[this._classID];
                        this.children && this.removeChildren();
                        this.skinElement && (this.skinElement.destroy(), delete this.skinElement);
                        this.element && (delete this.element.owner, this.element.destroy(), delete this.element);
                        return qc.call(this)
                    }, empty: function (a) {
                        for (; this.children.length;)this.removeChild(this.children[0]);
                        this.children = [];
                        for (a && this.removeSkin && this.removeSkin(); a && this.element && this.element.childNodes.length;)this.element.removeChild(this.element.childNodes.item(0));
                        return this
                    }
                };
                ha.Styles = {
                    setStyle: function (a, c) {
                        "backgroundImage" !== a && "maskImage" !==
                        a || !c || 0 === c.indexOf("url(") || Fb.test(c) || 0 === c.indexOf(b()) || (c = d() + c);
                        this.element && this.element.setStyle(a, c);
                        return this
                    }, getStyle: function (a) {
                        return this.element && this.element.getStyle(a)
                    }, setStyles: function (a) {
                        for (var b in a || {})this.setStyle(b, a[b]);
                        return this
                    }, getStylesCopy: function () {
                        var a = {}, b = this.element;
                        if (b)for (var c in b.style)Y(b.style[c]) && (a[c] = b.style[c]);
                        "height width hOffset vOffset hAlign vAlign".split(" ").forEach(function (b) {
                            Y(this[b]) && (a[b] = this[b])
                        }, b);
                        return a
                    }
                };
                ha.Themes =
                {
                    renderSkin: function (a, b, c) {
                        switch (a) {
                            case "normal":
                            case "focused":
                            case "disabled":
                            case "activated":
                            case "deactivated":
                                c = b, b = a, a = null
                        }
                        b = b || "normal";
                        a = a || this.config.ClassName || this.ClassName;
                        var d = this.element, e = K.current.Theme;
                        this.removeSkin();
                        (a = e.renderSkin(a, b, d.width, d.height, c)) && a.addClass && (this.skinElement = a.addClass("skin"), a.inject(this.element, "top"));
                        return this
                    }, removeSkin: function (a) {
                    this.skinElement && (this.skinElement.destroy(), delete this.skinElement);
                    var b = this.element.childNodes;
                    if (a = a || this.children.length !== b.length)for (a = 0; a < b.length; a++) {
                        var c = b.item(a);
                        c.hasClass("skin") && c.destroy()
                    }
                    return this
                }
                };
                l.prototype = {constructor: l};
                a(K, "Class", function () {
                    return l
                });
                a(ya, "Class", function () {
                    return l
                });
                a(l, "__instances__", function () {
                    return r
                });
                l.helpers = {
                    extend: Rb,
                    merge: Ga,
                    unlink: ua,
                    type: z,
                    empty: Yb,
                    dump: X,
                    contains: Sc,
                    splat: Tc,
                    later: Uc
                };
                l.Mutators = {
                    Protected: function (a, b, c) {
                        q.forEach(b, function (a, b) {
                            "function" === typeof b && (this[a] = b)
                        }, a);
                        b = null;
                        return a
                    }, Extends: function (a, b) {
                        l._prototyping =
                            b;
                        var c = new b;
                        delete c.parent;
                        c = l.Methods.inherit(c, a);
                        delete l._prototyping;
                        return c
                    }, Implements: function (a, b) {
                        (b instanceof V ? b : [b]).forEach(function (b) {
                            l._prototyping = b;
                            Rb(a, "class" === z(b) ? new b : b);
                            delete l._prototyping
                        });
                        return a
                    }
                };
                l.Methods = {
                    inherit: function (a, b) {
                        var c = arguments.callee.caller, d;
                        for (d in b) {
                            var e = b[d];
                            if (Y(e)) {
                                var g = a[d], f = z(e);
                                g && "function" === f ? e !== g && (c ? (e.__parent__ = g, a[d] = e) : this.override(a, d, e)) : a[d] = g && "object" === f ? Ga(g, e) : e
                            }
                        }
                        c && (a.parent = function () {
                            return arguments.callee.caller.__parent__.apply(this,
                                arguments)
                        });
                        return a
                    }, override: function (a, b, c) {
                        var d = l._prototyping;
                        d && a[b] !== d[b] && (d = null);
                        a[b] = function () {
                            var e = this.parent;
                            this.parent = d ? d[b] : a[b];
                            var g = c.apply(this, arguments);
                            this.parent = e;
                            return g
                        }
                    }, implement: function () {
                        var a = this.prototype;
                        Oa(arguments).forEach(function (b) {
                            this.inherit(a, b)
                        }, this);
                        return this
                    }, getDefaults: function () {
                        return ua(this.prototype.config)
                    }, inheritsFrom: function (a) {
                        if (this === a)return !0;
                        for (var b = this.prototype.constructor, c = b === a; !c && b !== q;)b = b.prototype.constructor,
                            c = a === b;
                        return c
                    }, proxyProperty: function (b, c, d) {
                        a(b, d, function () {
                            return c && c[d]
                        });
                        N(b, d, function (a) {
                            return c ? (c[d] = a, c[d]) : a
                        })
                    }, proxyProperties: function (a, b, c) {
                        for (var d = 0; d < c.length; d++)this.proxyProperty(a, b, c[d])
                    }
                };
                l.Libraries = {
                    Config: {
                        setConfig: function (a) {
                            this.config = Ga(this.config, a);
                            return this
                        }, getConfig: function () {
                            return ua(this.config)
                        }, getDefaults: function () {
                            return this.constructor.getDefaults()
                        }
                    }, Events: {
                        subscribers: {}, fire: S, addEvents: function (a) {
                            for (var b in a)if (a[b] && /^on[A-Z]/.test(b)) {
                                var c =
                                    a[b];
                                c.subscribeTo && c.subscribeTo(this, b, this)
                            }
                            return this
                        }, getSubscriberCount: function (a) {
                            var b = {length: 0};
                            if (a)b = this.subscribers[a]; else for (var c in this.subscribers)if (a = this.subscribers[c])b.length += a.length;
                            return b && b.length || 0
                        }
                    }
                };
                pa.prototype = {constructor: pa};
                a(pa, "__instances__", function () {
                    return elementInstances
                });
                a(K, "Element", function () {
                    return pa
                });
                "Window IFrame View Dialog Frame Text Image List Item Canvas".split(" ").forEach(function (b) {
                    a(this, b, function () {
                        var a = function (a) {
                            return new pa(za(b),
                                a)
                        };
                        a.prototype = {constructor: a};
                        "Image" === b && (a.WHITE = cd, a.BLANK = dd, a.CHECKERS = ed);
                        return a
                    })
                }, K);
                Xa.prototype = {constructor: Xa};
                a(K, "Timer", function () {
                    return Xa
                });
                a(K, "createDocumentFragment", function () {
                    return Ac
                });
                var G = [];
                a(K, "defines", function () {
                    return G
                });
                a(K, "define", function () {
                    return function (a, b, c) {
                        0 === a.indexOf("MAF") ? zc(a.substring(4), ya, b.bind(K)) : G.push(zc(a, K, b.bind(K)));
                        c && K.Theme.set(c)
                    }
                });
                ["messages", "mediaplayer", "HostEventManager", "application"].forEach(function (b) {
                    a(ya, b, function () {
                        return K.current &&
                            K.current.MAF[b]
                    })
                });
                var A = function () {
                    var b = {
                        ISO8601: "YYYY-MM-DDTHH:mm:ssZZ",
                        RFC822: "ddd, DD MMM YYYY HH:mm:ss ZZ",
                        RFC850: "dddd, DD-MMM-YY HH:mm:ss ZZ",
                        JS: "ddd MMM D YYYY HH:mm:ss ZZ",
                        DATETIME: "YYYY-MM-DD HH:mm:ss"
                    };
                    b.W3C = b.ATOM = b.JSON = b.ISO8601;
                    b.RSS = b.COOKIE = b.RFC1123 = b.RFC2822 = b.RFC822;
                    b.RFC1036 = b.RFC850;
                    b.CTIME = b.JS;
                    a(b, "FORMAT_DEFAULT", function () {
                        var a = C(), b = C(t);
                        return a && a.DATE_FORMAT || b && b.DATE_FORMAT || format.DATETIME
                    });
                    a(b, "PARSE_DEFAULT", function () {
                        var a = C();
                        return a && a.DATE_PARSE || A.DATETIME
                    });
                    return b
                }();
                a(K, "DateFormat", function () {
                    return A
                });
                m.moment && function () {
                    function b(a, c, d) {
                        a = a || new ka;
                        c = c || A.FORMAT_DEFAULT;
                        return moment(a).format(c, d)
                    }

                    function c(a, b, d) {
                        b = b || A.PARSE_DEFAULT;
                        return moment(a, b, d || "en").toDate()
                    }

                    a(ka, "format", function () {
                        return b
                    });
                    a(ka, "parse", function () {
                        return c
                    })
                }();
                m.numeral && (a(wb, "DECIMAL", function () {
                    return numeral(1E3).format("0,0")[1]
                }), a(wb, "CURRENCY", function () {
                    return numeral(1).format("$0").replace("1", "").trim()
                }));
                a(K, "MAF", function () {
                    return ya
                });
                a(K, "include",
                    function () {
                        return function (a) {
                            try {
                                return ub("with(this){" + Mc(a) + "}").call(this), !0
                            } catch (b) {
                                return !1
                            }
                        }
                    });
                m.addEventListener("unload", function () {
                    H && (H.destroy(), H = null)
                });
                K.include("maf-ui.js")
            }

            function ia(a) {
                var b = Q[t], c = a.getData() || {}, d = "loadView" === a.subject ? this.widget.getElementById(c.id) : r;
                if (!b || !b.widget.handleChildEvent || b.widget.handleChildEvent.apply(this, arguments))switch (a.subject) {
                    case "toggleViewport":
                        !a.error && a.id && k(a.id, "onActivateAppButton", {type: "viewport-toggle"}, va);
                        break;
                    case "exit":
                    case "exitToDock":
                        !a.error &&
                        a.id && k(a.id, "onAppFin", {id: a.id}, va);
                        break;
                    case "loadView":
                        !a.error && c.id && (d ? ((b = this.currentViewId) && k(a.id, "onUnselect", {id: b}, va), k(a.id, "onShowView", {id: c.id}, va)) : k(a.id, "onLoadView", {id: c.id}, va))
                }
                this && this.widget && this.widget.onDispatchedChildEvent && this.widget.onDispatchedChildEvent.apply(this, arguments)
            }

            function h(b, c, e) {
                function g(a, c, d) {
                    m.MAF.system.notify(a, c, d, b)
                }

                var f = ia.bind(c);
                a(this, "dispatchChildEvent", function () {
                    return f
                });
                a(this, "locale", function () {
                    return qa.profile.locale
                });
                a(this, "active", function () {
                    return u === b
                });
                a(this, "notify", function () {
                    return g
                });
                a(this, "isDialogActive", function () {
                    return Xb
                });
                q.forEach(O[b], function (c) {
                    a(this, c, function () {
                        return O[b][c]
                    })
                }, this);
                this.getImageSource = function (a, c) {
                    var d = O[b].images && O[b].images, d = c ? d && d[a] && d[a][c] : d && d[a];
                    if ("object" === z(d))var e = qa.profile, d = d[e.languageCode] || d[e.locale] || d[e.languageCode + "-EU"] || d[zb];
                    return d
                };
                this.getImage = function (a, b) {
                    var c = La("img"), d = this.getImageSource.apply(this, arguments) || "";
                    c.source =
                        d;
                    return c
                };
                this.focus = function () {
                    e.focus()
                };
                this.blur = function () {
                    e.blur()
                };
                this.addEventListener = function () {
                    return e.addEventListener.apply(e, arguments)
                };
                this.removeEventListener = function () {
                    return e.removeEventListener.apply(e, arguments)
                };
                this.dispatchEvent = function () {
                    return e.dispatchEvent.apply(e, arguments)
                };
                this.getElementById = function (a) {
                    return a ? sa(b + "-" + a) : sa(b)
                };
                this.getLocalizedString = function (a, c) {
                    var d = C(b, a);
                    return c ? M.vsprintf(d, c) : d
                };
                this.getPath = function (a) {
                    return d(b) + (a || "")
                };
                this.getUrl =
                    function (a, c) {
                        return d(b, c !== r ? c : !0) + (a || "")
                    };
                this.getSetting = function (a) {
                    var c = w(a);
                    a = O[b][a];
                    return a !== r ? a : c
                };
                this.createDocumentFragment = Ac;
                this.createWindowFromXML = X
            }

            function la() {
                a(this, "active", function () {
                    return u
                });
                a(this, "resuming", function () {
                    return ja.resuming || !1
                });
                a(this, "exiting", function () {
                    return ja.exiting || !1
                });
                a(this, "exited", function () {
                    return ja.exited || !1
                })
            }

            function Ba(a, b, c) {
                function e(a, d) {
                    a !== t && P.fire(t, "onApplicationAvailable", O[a]);
                    l.push(a);
                    b && b(a);
                    c && (n++, n === m && (n = 0, c(l)))
                }

                function g(a, b, c, f) {
                    (new Na({
                        url: d(a) + "Localization/" + b + ".strings",
                        proxy: !1,
                        mimetype: "text/plain",
                        onSuccess: function (d) {
                            "string" === z(d) && (d = ga.parse(d));
                            oa[a][b] = d;
                            e(a, c)
                        },
                        onFailure: function () {
                            b === k || f ? b !== zb && g(a, zb, c, !0) : g(a, k, c)
                        }
                    })).send()
                }

                var f = qa.profile, k = f.languageCode + "-EU", h = f.locale, l = [];
                a = [].concat(a || []);
                var m = a.length, n = 0;
                a.forEach(function (a, b) {
                    var c;
                    p.metadata && "object" === typeof p.metadata[a] ? (c = p.metadata[a], oa[a] = ua(c.language || {}), delete c.language, O[a] = Ga(c, sc[a] || {}), O[a].categories =
                        [], e(a, b)) : "object" === typeof a ? (c = ua(a), a = M(c.identifier), oa[a] = ua(c.language || {}), delete c.language, O[a] = Ga(c, sc[a] || {}), e(a, b)) : (new Na({
                        url: d(a) + "metadata.json",
                        proxy: !1,
                        onSuccess: function (c) {
                            "string" === z(c) && (c = ga.parse(c));
                            c.identifier === a && (ba(c.language) ? (O[a] = c, oa[a] = {}, g(a, h, b)) : (oa[a] = ua(c.language || {}), delete c.language, O[a] = c, e(a, b)))
                        }
                    })).send()
                })
            }

            function T(a, b) {
                (new Na({
                    url: "//" + (ra.appsServer || fa[1] + "." + ca + ".com/apps") + "/" + a,
                    data: {version: b},
                    proxy: !1,
                    onSuccess: function (a) {
                        a && (m.MAE =
                            p = a, ra = p.settings || {}, sc = ra.metadata || {}, Ub = p.search ? p.search.blacklist || [] : ra.blacklist || [], vb = p.hacks || ra.hacks || {}, lb(!0))
                    }
                })).send()
            }

            function I(a) {
                if (!0 === w("notifications") && "object" === typeof p.versions) {
                    var b = p.versions && p.versions.notification;
                    b && b !== a && (a && a !== b && (p.versions.notification = a), (new Na({
                        url: "//" + (ra.appsServer || fa[1] + "." + ca + ".com/notifications"),
                        data: a !== r ? {
                            operator: p.operator,
                            country: p.country,
                            environment: p.environment,
                            diffVersion: b,
                            version: a || b
                        } : {
                            operator: p.operator, country: p.country,
                            environment: p.environment, version: b
                        },
                        proxy: !1,
                        onSuccess: function (b) {
                            b && (a !== r ? ib = ib.filter(function (a) {
                                return -1 === (b.remove || []).indexOf(a.id)
                            }).concat(b.add || []) : b.notifications && (ib = [].concat(b.notifications || [])), Wa.run(), Wa.startInterval())
                        },
                        onError: function () {
                        },
                        onFailure: function () {
                        }
                    })).send())
                }
            }

            function Ma() {
                Z.href = Z.href.split("#")[0].split("?")[0] + "?t=" + ka.now() + (Ka[0] || "#") + (1 < Ka.length ? "?" + Ka[1] : "")
            }

            function gb() {
                if (p.versions) {
                    var a = Aa(za(p.operator + p.country + p.environment)), b = new xb.Channel("admin|" +
                        a);
                    (function (c) {
                        var d = c.payload;
                        switch (c.type) {
                            case "onConnected":
                                (function () {
                                    b.joined || b.join()
                                }).delay(500);
                                break;
                            case "onData":
                                c = d.data;
                                if ("u" === c.e && c.v)return T.delay(Qb(3E3), null, [a, c.v]);
                                if ("n" === c.e && c.v)return I.delay(Qb(1E3), null, [c.v]);
                                if ("r" === c.e)return Ma.delay(Qb(3E4))
                        }
                    }).subscribeTo(b, ["onConnected", "onData"]);
                    b.connected && b.join()
                }
            }

            function pb(a) {
                if (a) {
                    var b = new $a, c;
                    b.onreadystatechange = function () {
                        if (4 === b.readyState && 200 === b.status) {
                            b.onreadystatechange = null;
                            var d = ka.now() - c, e =
                                b.getResponseHeader("X-CDN");
                            b = null;
                            a(d, e)
                        }
                    };
                    b.open("GET", "//" + fa[1] + "." + ca + ".com/speedtest/10k.eot", !0);
                    c = ka.now();
                    b.send(null)
                }
            }

            function yb() {
                var a = qa.profile, b = a && a.household, c = a && a.latlon;
                0 < tb && b && pb(function (b, d) {
                    var e = c.length;
                    d && Ra.send(t, "performance", {
                        ip: a.wan,
                        lat: 2 === e && c[0],
                        lon: 2 === e && c[1],
                        cdn: d,
                        performance: b || 0
                    })
                })
            }

            function lb(a) {
                var b = M(t), c = "object" === typeof p.ui ? p.ui.identifier : p.ui, d = ka.now();
                Ba(p.ui, function () {
                    if (!Q[c]) {
                        if (Q[b] && b !== c) {
                            if (u !== b) {
                                try {
                                    P.close(u)
                                } catch (e) {
                                }
                                try {
                                    P.unload(u)
                                } catch (g) {
                                }
                            }
                            try {
                                P.close(b)
                            } catch (f) {
                            }
                            try {
                                P.unload(b)
                            } catch (k) {
                            }
                            u =
                                r;
                            t = c;
                            delete Q[b]
                        }
                        a || D();
                        P.load(c);
                        P.open(c);
                        U("STARTUP: " + (d - tb) + ", " + (ka.now() - tb))
                    }
                    Ba("object" === typeof p.metadata ? q.keys(p.metadata) : p.apps, X, function (b) {
                        p.apps = [].concat(b);
                        (p.categories || []).forEach(function (a) {
                            if ("object" === typeof a) {
                                var b = za(a.name);
                                (a.apps || []).forEach(function (a) {
                                    O[a] && (O[a].categories = O[a].categories || [], -1 === O[a].categories.indexOf(b) && O[a].categories.push(b))
                                })
                            }
                        });
                        (function () {
                            P.fire(t, "onApplicationsAvailable", b);
                            P.complete = !0;
                            P.onComplete(b);
                            cb.autostart && (Z.hash = cb.autostart);
                            a || (gb.delay(1E3), Ra.send(t, "household"), I.delay(1E4), !0 === w("performance") && 3 > Qb(10) && yb.delay(18E4))
                        }).delay(100)
                    })
                })
            }

            ka.now();
            var Q = {}, O = {}, oa = {}, nb = {}, Bb = sa("viewport"), t = "object" === typeof p.ui ? p.ui.identifier : p.ui, u, H, P, Na = function () {
                function b(a, c, d, g) {
                    d = d || a;
                    if (4 === a.readyState) {
                        if (c.onComplete)try {
                            c.onComplete(a)
                        } catch (k) {
                        }
                        if (-1 !== f.indexOf(a.status) || c.isSuccess && c.isSuccess.call && !0 === c.isSuccess.call(a))try {
                            var h = (a.getResponseHeader("Content-Type") || "").split(";")[0], l = c.headers && (c.headers.Accept ||
                                c.headers.accept), B = a.responseText, m;
                            h || (h = l || h);
                            "text/plain" === h && l && (h = l);
                            switch (za(h)) {
                                case "text/xml":
                                case "application/xml":
                                    m = a.responseXML;
                                    break;
                                case "text/json":
                                case "application/json":
                                    try {
                                        m = ga.parse(B)
                                    } catch (v) {
                                        try {
                                            m = ub("return " + B)()
                                        } catch (n) {
                                            m = B
                                        }
                                    }
                                    break;
                                case "application/x-www-form-urlencoded":
                                    try {
                                        m = qb(B)
                                    } catch (r) {
                                        m = B
                                    }
                                    break;
                                case "text/javascript":
                                case "application/javascript":
                                    try {
                                        m = ub("with(this){" + B.replace(Tb, "") + "\n}\n").call(c.scope);
                                        break
                                    } catch (ya) {
                                    }
                                    try {
                                        m = ga.parse(B)
                                    } catch (ha) {
                                        m = B
                                    }
                                    break;
                                case "image/jpeg":
                                case "image/jpg":
                                case "image/png":
                                case "image/gif":
                                    for (var Ca = B.length, p = "", G = 0; G < Ca; G += 1)p += Va(B.charCodeAt(G) & 255);
                                    m = "data:" + h + ";base64," + pc(p);
                                    break;
                                default:
                                    if (/\.strings$/.test(c.url.split("?")[0])) {
                                        h = {};
                                        G = (B || "").replace(Tb, "").match(/(.+)=(.+);/gm) || [];
                                        for (B = 0; B < G.length; B++) {
                                            var A = G[B].match(/['"](.+)['"][\s|\t]+=[\s|\t]+['"](.+)['"]/);
                                            A && 3 === A.length && (h[A[1]] = A[2].replace(e, "$1"))
                                        }
                                        p = h
                                    } else p = B;
                                    m = p
                            }
                            c.onSuccess && c.onSuccess.call && c.onSuccess.call(d, m, a)
                        } catch (E) {
                            if (g === u &&
                                c.onError && c.onError.call)try {
                                c.onError.call(d, E)
                            } catch (q) {
                            }
                        } else if (c.onFailure && c.onFailure.call)try {
                            c.onFailure.call(d, a)
                        } catch (J) {
                        }
                    }
                }

                function c(a) {
                    var b = "";
                    q.keys(a).forEach(function (c, d) {
                        b += (0 !== d ? "&" : "") + escape(c) + "=" + escape(a[c])
                    });
                    return b
                }

                function d(e) {
                    function f() {
                        h && (h.abort(), h = r)
                    }

                    function k(a) {
                        var d = M(u), f = e.scope || this, l = -1;
                        a = a || e.data;
                        !0 === e.jsonp && (l = g++, a = a || {}, Y(e.callback) && "string" === z(e.callback) ? a[e.callback] = "mafreq" + l : ba(a.callback) && (a.callback = "mafreq" + l));
                        "object" === z(a) &&
                        ("GET" === e.method ? e.url += "" + (-1 === e.url.indexOf("?") ? "?" : "&") + (e.jsonp ? c(a) : q.toQueryString(a)) : "application/json" === e.headers["Content-Type"] ? (e.mimetype = e.headers["Content-Type"], a = ga.stringify(a)) : (e.headers["Content-Type"] = "application/x-www-form-urlencoded", a = q.toQueryString(a)));
                        if (-1 < l && e.onSuccess && e.onSuccess.call) {
                            var aa;
                            m[a[e.callback || "callback"]] = function () {
                                delete m[a[e.callback || "callback"]];
                                Y(aa) ? e.onSuccess.apply(e.scope || null, arguments) : e.onFailure && e.onFailure.call && e.onFailure.call(f);
                                aa && aa.destroy && aa.destroy();
                                aa = r
                            };
                            try {
                                aa = sb(e.url, null, function () {
                                    delete m[a[e.callback || "callback"]];
                                    aa && aa.destroy && aa.destroy();
                                    aa = r;
                                    d === u && e.onFailure && e.onFailure.call && e.onFailure.call(f)
                                })
                            } catch (n) {
                                delete m[a[e.callback || "callback"]], aa && aa.destroy && aa.destroy(), aa = r, d === u && e.onError && e.onError.call && e.onError.call(f, n)
                            }
                            return this
                        }
                        l = !1 === e.async;
                        h = new $a;
                        var pa;
                        Y(e.timeout) && !isNaN(e.timeout) && (pa = function () {
                            pa = r;
                            if (Y(h)) {
                                var a = 0;
                                try {
                                    a = h && h.status || 0
                                } catch (b) {
                                }
                                0 === a && h.abort && h.abort.call &&
                                (h.abort(), e.onTimeout && e.onTimeout.call && e.onTimeout.call(f, h), h = r)
                            }
                        }.delay(e.timeout));
                        var p = e.url;
                        e.user && e.password ? p = p.replace("//", "//" + encodeURIComponent(e.user) + ":" + encodeURIComponent(e.password) + "@") : e.user && (p = p.replace("//", "//" + encodeURIComponent(e.user) + "@"));
                        if (-1 !== p.indexOf("//") && -1 === p.indexOf(ca + ".com/") && !1 !== e.proxy && !1 !== vb.proxy) {
                            if (!ta.opera && !1 !== e.monitoring && !1 !== w("monitoring")) {
                                var ya = Q[u];
                                e.headers["X-Proxy-App"] = u;
                                try {
                                    e.headers["X-Proxy-Default-View"] = ya.MAF.application.isDefaultView() || !1
                                } catch (ha) {
                                }
                            }
                            p = $b(p, "GET" !== e.method).replace('//cdn.metrological.com','') ;
                            "object" === z(e.proxy) && q.forEach(e.proxy, function (a, b) {
                                "object" === z(b) && (b = ga.stringify(b));
                                "cookie" === a || "headers" === a ? e.headers[("X-Proxy-" + a).capitalize()] = b : (p += "&" + a + "=" + escape(b), "nocache" === a && (p += "&t=" + Aa(Date.now() + "|" + (qa.profile && qa.profile.household || ""))))
                            })
                        }
                        Y(e.mimetype) && h.overrideMimeType && h.overrideMimeType.call && h.overrideMimeType(e.mimetype);
                        try {
                            h.open(e.method, p, !l), e.withCredentials && (h.withCredentials = "true"), q.forEach(e.headers, function (a,
                                                                                                                                       b) {
                                this.setRequestHeader(a, b)
                            }, h), h.send(a)
                        } catch (Ca) {
                            e.onFailure && e.onFailure.call && e.onFailure.call(f, h, Ca);
                            h = r;
                            return
                        }
                        l ? (Y(pa) && (db(pa), pa = r), b(h, e, f, d), h = r) : h.onreadystatechange = function () {
                            4 === h.readyState && (Y(pa) && (db(pa), pa = r), b(h, e, f, d), h = r)
                        };
                        return this
                    }

                    e = e || {};
                    e.method = e.method && Pa(e.method) || "GET";
                    e.headers = e.headers || {};
                    var h;
                    a(this, "abort", function () {
                        return f
                    });
                    a(this, "send", function () {
                        return k
                    });
                    ["get", "post"].forEach(function (b) {
                        a(this, b, function () {
                            var a = this;
                            return function () {
                                e.method =
                                    Pa(b);
                                return k.apply(a, arguments)
                            }
                        })
                    }, this)
                }

                var e = /\\("|')/g, g = 0, f = [200, 201];
                d.prototype = {constructor: d};
                return d
            }();
            c.prototype = {constructor: c};
            var S = function (a, b, d) {
                var e = this.subscribers || {}, g;
                b = b || {};
                a instanceof c ? (g = a, a = g.type) : g = new c(a, b, d);
                e[a] = [].concat(e[a] || []).filter(function (a) {
                    return a instanceof ub
                });
                if (!e[a].length)return delete e[a], !0;
                var f = !1;
                q.each(e[g.type] || {}, function (a, b) {
                        if (b && b.call)try {
                            b.call(this, g)
                        } catch (c) {
                        }
                        g.defaultPrevented && (f = !0);
                        if (g.propagationStopped)return !1
                    },
                    this);
                return !f
            };
            (function () {
                xa.subscribeTo || (xa.subscribeTo = function (a, b, c, d) {
                    b = [].concat(b);
                    a.subscribers || (a.subscribers = {});
                    a.fire = S;
                    var e = c ? this.bind(c) : this;
                    b.forEach(function (b) {
                        var c = a.subscribers[b] || [];
                        if (!c.some(function (a) {
                                return a === e
                            }) && e)c[!0 === d ? "unshift" : "push"](e);
                        a.subscribers[b] = c
                    });
                    return e
                });
                xa.subscribeOnce || (xa.subscribeOnce = function (a, b, c) {
                    b = [].concat(b);
                    a.subscribers || (a.subscribers = {});
                    a.fire = S;
                    c = c ? this.bind(c) : this;
                    var d = function () {
                        var a = arguments.callee;
                        a.listener.apply(null,
                            Oa(arguments));
                        a.unsubscribeFrom(a.target, a.types);
                        a.listener = a.target = a.types = null
                    };
                    d.listener = c;
                    d.types = b;
                    d.target = a;
                    b.forEach(function (b) {
                        var c = a.subscribers[b] || [];
                        !c.some(function (a) {
                            return a === d
                        }) && d && c.push(d);
                        a.subscribers[b] = c
                    });
                    return d
                });
                xa.unsubscribeFrom || (xa.unsubscribeFrom = function (a, b) {
                    var c = this;
                    b = [].concat(b);
                    b.forEach(function (b) {
                        var d = a.subscribers[b] || [];
                        a.subscribers[b] = d.filter(function (a) {
                            return a !== c
                        });
                        d && d.length || (a.subscribers[b] = [])
                    });
                    return this
                })
            })();
            (function () {
                var a =
                    m.Element && m.Element.prototype;
                w("animation");
                (function (b) {
                    a.getAttribute = function (a) {
                        return this.retrieve("@" + a) || b.call(this, a)
                    }
                })(a.getAttribute);
                (function (c) {
                    rb.original = c;
                    a.setAttribute = function (a, e) {
                        if ("window" === this.retrieve("type") || "src" !== a && "id" !== a)return c.call(this, a, e);
                        this.store("@" + a, e);
                        if (e)switch (a) {
                            case "src":
                                var g = Fb.test(e), f = this.aspect, h = this.region, k = 0 === e.indexOf("data:");
                                !e || g || k || 0 === e.indexOf(b()) || (e = d() + e);
                                if (g && !k && e && (f || !this.remoteAsync)) {
                                    g = M(e);
                                    e = "//" + fa[1] + "." +
                                        ca + ".com/" + fa[2] + "?url=" + encodeURIComponent(e);
                                    if (f) {
                                        var l = this.retrieve("originalWidth") || this.width || this.getAttribute("width") || 0, m = this.retrieve("originalHeight") || this.height || this.getAttribute("height") || 0;
                                        0 < l && "height" !== f ? (e += "&width=" + l, this.store("originalWidth", l), "crop" !== f && this.removeAttribute("width")) : "height" === f ? this.removeAttribute("width") : "crop" === f && (f = "height");
                                        0 < m && "width" !== f ? (e += "&height=" + m, this.store("originalHeight", m), "crop" !== f && this.removeAttribute("height")) : "width" ===
                                        f ? this.removeAttribute("height") : "crop" === f && (f = 0 < l ? "width" : "auto");
                                        e += "&type=" + f
                                    }
                                    h && (e += "&region=" + h);
                                    4096 < e.length && (e = g)
                                }
                                this.remoteAsync || k || (new Na({
                                    url: e,
                                    proxy: !1,
                                    async: !1,
                                    mimetype: "text/plain; charset=x-user-defined",
                                    onSuccess: function (a) {
                                        e = a
                                    },
                                    onFailure: function (a, b) {
                                        throw b;
                                    }
                                })).send();
                                break;
                            case "id":
                                u && e && 0 !== e.indexOf(u) && (e = u + "-" + e)
                        }
                        return c.call(this, a, e)
                    }
                })(a.setAttribute)
            })();
            var Kb = {};
            l.prototype = {constructor: l};
            var Ab = function () {
                    function c(f, h) {
                        function k(a, b) {
                            if (f) {
                                if (ha[a] && ha[a][b])return ha[a][b];
                                if (F && F[a] && F[a][b])return F[a][b];
                                if (bb && bb[a] && bb[a][b])return bb[a][b]
                            } else {
                                if (e[u] && e[u][a] && e[u][a][b])return e[u][a][b];
                                if (F && F[a] && F[a][b])return F[a][b];
                                if (ha[a] && ha[a][b])return ha[a][b]
                            }
                        }

                        function l(a, c) {
                            var e = "";
                            if (c) {
                                var g = {};
                                q.forEach(c, function (a, f) {
                                    switch (a) {
                                        case "width":
                                        case "height":
                                        case "margin":
                                        case "marginTop":
                                        case "marginLeft":
                                        case "marginBottom":
                                        case "marginRight":
                                        case "padding":
                                        case "paddingTop":
                                        case "paddingLeft":
                                        case "paddingBottom":
                                        case "paddingRight":
                                            e += a.hyphenate() + ":" +
                                                (Y(f) && !isNaN(f) ? ma(f) + "px" : f) + ";";
                                            break;
                                        case "fontSize":
                                            if (!isNaN(f) || f && -1 < f.indexOf("px"))f = (ma(f) / 24).toFixed(3) + "em";
                                            e += a.hyphenate() + ":" + f + ";";
                                            break;
                                        case "borderTopLeftRadius":
                                        case "borderBottomLeftRadius":
                                        case "borderTopRightRadius":
                                        case "borderBottomRightRadius":
                                        case "borderRadius":
                                            e = isNaN(f) ? e + (a.hyphenate() + ":" + f + ";") : e + (a.hyphenate() + ":" + f + "px;");
                                            break;
                                        case "backgroundImage":
                                            if (!f || "none" === f)break;
                                            var h = 0 !== f.indexOf("url(");
                                            f && h && !Fb.test(f) && 0 !== f.indexOf(b()) && (f = d() + f);
                                            f && h && (f = "url(" +
                                                f + ")");
                                            e += a.hyphenate() + ":" + f + ";";
                                            break;
                                        case "columnCount":
                                        case "columnGap":
                                        case "boxSizing":
                                        case "animationPlayState":
                                        case "transform":
                                        case "transformOrigin":
                                        case "transformStyle":
                                        case "transition":
                                        case "transitionProperty":
                                        case "transitionDuration":
                                        case "transitionDelay":
                                        case "transitionTimingFunction":
                                            if (!1 === w("gpu") && "transform" === a && "translateZ(0)" === f)break; else!0 === w("3d") && "transform" === a && "translateZ(0)" === f && (f = "translate3d(0,0,0)");
                                            e += ab + a.hyphenate() + ":" + f + ";";
                                            break;
                                        case "wrap":
                                            !0 ===
                                            f && (e += "white-space:normal;", g.wordWrap = "break-word");
                                            break;
                                        case "anchorStyle":
                                            h = Cc(f);
                                            g.textAlign = h[0] || "left";
                                            g.verticalAlign = h[1] || "top";
                                            break;
                                        case "truncation":
                                            g.overflow = "hidden";
                                            g.textOverflow = "end" === f ? "ellipsis" : "clip";
                                            break;
                                        case "visible":
                                            f || (e += "visibility:hidden;");
                                            break;
                                        case "hAlign":
                                        case "vAlign":
                                            break;
                                        case "hOffset":
                                        case "vOffset":
                                            var k = a.charAt(0), h = J[a], l = (c[k + "Align"] || h).hyphenate();
                                            "center" === l ? (k = c[vc[k]], e += "top:50%;bottom:auto;", k && (e += "margin-" + h + ":" + k / 2 * -1 + "px;")) : e += l + ":" +
                                                (isNaN(f) || !f ? f : f + "px") + ";";
                                            break;
                                        case "zOrder":
                                            e += "z-index:" + f + ";";
                                            break;
                                        default:
                                            e += a.hyphenate() + ":" + f + ";"
                                    }
                                });
                                0 < q.keys(g).length && l(a + " .innerText", g)
                            }
                            "" !== e && (A[a] = R.createTextNode(C + a + "{" + e + "}" || ""), G.appendChild(A[a]))
                        }

                        function m(a, b, c) {
                            var d = A[a];
                            if (d) {
                                var e = d.textContent, e = e.replace(a, a + "," + b);
                                d.textContent = e
                            }
                            c || W.forEach(function (c) {
                                A[a + c] && m(a + c, b + c, !0)
                            })
                        }

                        function B(a) {
                            return E[a] || !1
                        }

                        function n(a, b, c) {
                            if (a && b && !0 !== w("nofonts")) {
                                c = c || ["eot", "woff", "truetype"];
                                var e = 'font-family: "' + a + '"; src:';
                                c.forEach(function (a, c) {
                                    0 !== c && (e += ", ");
                                    e += 'url("' + d() + b + "." + ("truetype" === a ? "ttf" : a) + '") format("' + a + '")'
                                });
                                e += ";";
                                p(a);
                                E[a] = R.createTextNode("@font-face {" + e + "}" || "");
                                f === t ? g.appendChild(E[a]) : G.appendChild(E[a])
                            }
                        }

                        function r(a) {
                            Ha.setStyle("fontFamily", a)
                        }

                        function p(a) {
                            B(a) && (f === t ? g.removeChild(E[a]) : G.removeChild(E[a]), delete E[a])
                        }

                        function y(a, b, c, d, e) {
                            if (a = k(a, "renderSkin"))return a(b, c, d, e, D)
                        }

                        function wa(a, b, c) {
                            a = k(a, "applyLayer");
                            if (b && a)return a(b.element || b, c, D)
                        }

                        function Wb(a, b) {
                            "object" ===
                            z(a) ? q.forEach(a, function (a, b) {
                                "object" === z(b) ? (ha[a] = ua(b), q.forEach(b, function (b, c) {
                                    "styles" === b ? l("." + a, c) : c.styles && ("normal" === b ? l("." + a, c.styles) : l("." + a + "." + b, c.styles), ha[a].styles = ha[a].styles || {}, ha[a].styles[b] = ua(c.styles))
                                })) : (m("." + b, "." + a), L(a, b))
                            }) : ha[a] = ua(b)
                        }

                        function x(a, b) {
                            var c;
                            c = f ? Ga(bb && bb[a] || {}, F && F[a] || {}, ha[a] || {}) : Ga(ha[a] || {}, F && F[a] || {}, e[u] && e[u][a] || {});
                            return ua(c && b ? c[b] : c)
                        }

                        function L(a, b) {
                            m("." + a, "." + b);
                            ha[a] = ha[b]
                        }

                        function Fa(a, b) {
                            var c = x(a, "styles") || {};
                            return c &&
                                c[b || "normal"] || c
                        }

                        function ya() {
                            G.destroy();
                            G = D = A = E = N = ha = F = bb = null;
                            delete e[f]
                        }

                        var ha = e[f || "default"] = {}, bb = f && e["default"], F = e[t], G = ac("", h), A = {}, E = {}, vc = {
                            h: "width",
                            v: "height"
                        }, J = {
                            hOffset: "left",
                            vOffset: "top"
                        }, D = this, C = f ? "#" + f.split(".").join("\\.") + " " : "", W = [" .innerText", ".focused", ".selected"], N = {};
                        a(N, "add", function () {
                            return n
                        });
                        a(N, "remove", function () {
                            return p
                        });
                        a(N, "has", function () {
                            return B
                        });
                        f === t && a(N, "setDefault", function () {
                            return r
                        });
                        a(this, "get", function () {
                            return x
                        });
                        a(this, "set", function () {
                            return Wb
                        });
                        a(this, "alias", function () {
                            return L
                        });
                        a(this, "destroy", function () {
                            return ya
                        });
                        a(this, "renderSkin", function () {
                            return y
                        });
                        a(this, "applyLayer", function () {
                            return wa
                        });
                        a(this, "getStyles", function () {
                            return Fa
                        });
                        a(this, "Fonts", function () {
                            return N
                        })
                    }

                    var e = {}, g = ac('@charset "UTF-8";');
                    c.prototype = {constructor: c};
                    return c
                }(), ja = function () {
                    function b(a) {
                        if (!0 === vb.nocompress)return a;
                        var c = {};
                        a = encodeURIComponent(a + "").split("");
                        var d = [], e = a[0], f = 256, g, h;
                        for (h = 1; h < a.length; h++)g = a[h], Y(c[e + g]) ? e += g : (d.push(1 <
                        e.length ? c[e] : e.charCodeAt(0)), c[e + g] = f, f++, e = g);
                        d.push(1 < e.length ? c[e] : e.charCodeAt(0));
                        for (h = 0; h < d.length; h++)d[h] = Va(d[h]);
                        return d.join("")
                    }

                    function c(a) {
                        if (!0 === vb.nocompress)return a;
                        var b = {};
                        a = (a + "").split("");
                        var d = a[0], e = d, f = [d], g = 256, h, k;
                        for (k = 1; k < a.length; k++)h = a[k].charCodeAt(0), h = 256 > h ? a[k] : b[h] ? b[h] : e + d, f.push(h), d = h.charAt(0), b[g] = e + d, g++, e = h;
                        b = f.join("");
                        try {
                            return decodeURIComponent(b)
                        } catch (l) {
                            return b
                        }
                    }

                    function d() {
                        this.data = {};
                        this.synced = !0
                    }

                    function e(a, d) {
                        a = a || "maf";
                        d = d || 2E3;
                        var f, g;
                        try {
                            g = (f = m.localStorage) && f.getItem(a)
                        } catch (h) {
                            g = ""
                        }
                        try {
                            this.data = g && ga.parse(c(g) || "{}") || {}
                        } catch (k) {
                            f && f.removeItem(a), this.data = {}
                        }
                        f && (this.sync = function () {
                            if (!this.synced) {
                                var c = b(ga.stringify(this.data));
                                f.getItem(a) !== c && f.setItem(a, c);
                                this.synced = !0
                            }
                        }, this.sync.periodical(d, this))
                    }

                    function f(a, d, e) {
                        function g() {
                            for (var b = R.cookie && R.cookie.split(";"), c = 0; c < b.length; c++) {
                                var d = b[c];
                                if (0 === d.indexOf(a)) {
                                    var e = d.indexOf("="), d = -1 < e ? d.substr(0, e) : d;
                                    R.cookie = d + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
                                }
                            }
                        }

                        function h() {
                            return R.cookie && decodeURIComponent(R.cookie.split(";").map(function (a) {
                                    return a.trim().split("=")
                                }).reduce(function (b, c) {
                                    0 === c[0].indexOf(a) && b.push(c[1]);
                                    return b
                                }, []).join("")) || ""
                        }

                        function k(b, c) {
                            b = b || "";
                            c = c || 356;
                            var d = new ka;
                            d.setDate(d.getDate() + c);
                            var f = encodeURIComponent(b).match(eb("[\\s\\S]{1," + l + "}", "g")) || [];
                            f.length < e && f.forEach(function (b, c) {
                                R.cookie = a + c + "=" + b + ";expires=" + d.toUTCString()
                            })
                        }

                        a = a || "maf";
                        d = d || 2E3;
                        e = e || 50;
                        var l = 4058 - a.length - M(e).length - 1, m = R.cookie, n = m && h();
                        try {
                            this.data = n && ga.parse(c(n) || "{}") || {}
                        } catch (A) {
                            g(), this.data = {}
                        }
                        Y(m) && (this.sync = function () {
                            this.data && !this.synced && (g(), k(b(ga.stringify(this.data))), this.synced = !0)
                        }, this.sync.periodical(d, this), R.cookie && 0 !== R.cookie.indexOf("maf0") && 0 < R.cookie.length && g())
                    }

                    function h(a, b, c) {
                        try {
                            return "localStorage"in m && m.localStorage && !0 !== w("cookie") ? new e(a, b) : new f(a, b, c)
                        } catch (d) {
                            return new e(a, b)
                        }
                    }

                    function l(b, c, d) {
                        function e(a) {
                            return Aa(m + (c ? qa.profile.id + ":" : "") + (a || ""))
                        }

                        function f(a) {
                            a = e(a);
                            if (c) {
                                var b =
                                    qa.profile.id, d = ja.storage.get(b) || [], g = d.indexOf(a);
                                -1 !== g && (d.slice(g, 1), 0 < d.length ? ja.storage.set(b, d) : ja.storage.set(b))
                            }
                            ja.storage.set(a);
                            return !0
                        }

                        function g(a) {
                            return ja.storage.get(e(a))
                        }

                        function h(a, b) {
                            z(b);
                            var d = e(a);
                            if (c) {
                                var f = qa.profile.id, g = ja.storage.get(f) || [];
                                -1 === g.indexOf(d) && (g.push(d), ja.storage.set(f, g))
                            }
                            ja.storage.set(d, b);
                            return !0
                        }

                        function k(a, b) {
                            return ja.storage.has(e(a))
                        }

                        d && (d += ":");
                        var m = (d || "") + b + (c ? ":" : "");
                        a(this, "remove", function () {
                            return f
                        });
                        a(this, "set", function () {
                            return h
                        });
                        a(this, "get", function () {
                            return g
                        });
                        a(this, "has", function () {
                            return k
                        })
                    }

                    function n() {
                    }

                    function y() {
                    }

                    function Lb(b) {
                        a(this, "id", function () {
                            return Aa(this.uid + "|" + (b || ""))
                        });
                        a(this, "name", function () {
                            return b
                        });
                        a(this, "ageRating", function () {
                            return 0
                        });
                        a(this, "household", function () {
                            var a = this.uid;
                            return a && Aa(a)
                        });
                        a(this, "uid", function () {
                            var a = w("household") || !1;
                            if ("string" === typeof p.household)return p.household;
                            if ("string" === typeof a)return a;
                            if (a && na && (na.ip || na.wan))return Aa(na.ip || na.wan)
                        });
                        a(this,
                            "operator", function () {
                                return w("customer") || w("operator") || ca
                            });
                        a(this, "packages", function () {
                            return []
                        });
                        a(this, "country", function () {
                            return na && na.geo && na.geo.countryName
                        });
                        a(this, "countryCode", function () {
                            return w("country") || za(na && na.geo && na.geo.country || "eu")
                        });
                        a(this, "language", function () {
                            return Jc[this.languageCode]
                        });
                        a(this, "languageCode", function () {
                            return za(w("language") || Gb.lang || "en")
                        });
                        a(this, "city", function () {
                            return na && na.geo && na.geo.city
                        });
                        a(this, "latlon", function () {
                            return na && na.geo &&
                                na.geo.ll || []
                        });
                        a(this, "ip", function () {
                            return na && (na.ip || na.wan) || "127.0.0.1"
                        });
                        a(this, "wan", function () {
                            return this.ip
                        });
                        a(this, "lan", function () {
                            return na && na.lan || "127.0.0.1"
                        });
                        a(this, "mac", function () {
                            return "00:00:00:00:00:00"
                        });
                        a(this, "locale", function () {
                            return this.languageCode + "-" + Pa(this.countryCode)
                        });
                        a(this, "locked", function () {
                            return !1
                        });
                        var c = new l("pp", !0);
                        a(this, "passport", function () {
                            return c
                        })
                    }

                    function K(a) {
                        a = /\.js[^\.]*$/.test(a) ? a + "" : a + ".min.js";
                        var b = Fb.test(a) ? a : Zb(a, "plugin");
                        a = new $a;
                        a.open("GET", b, !1);
                        a.send();
                        b = "";
                        4 === a.readyState && 200 === a.status && a.responseText && (b = ("\n" + a.responseText.replace(Tb, "")).replace(rc, function (a, b) {
                            return K(b)
                        }));
                        return b
                    }

                    function C(a, b, c) {
                        b = b || {};
                        a && Pa(a)in E && (fb[a] = !0 === c ? Ga(fb[a], b) : b)
                    }

                    function I(a, b) {
                        if (a && Pa(a)in E)return fb[a] && fb[a][b]
                    }

                    function wa(a, b, c) {
                        var d = La("object"), e = rb.original;
                        a && e.call(d, "id", a);
                        b && e.call(d, "name", b);
                        c && e.call(d, "type", c);
                        return Ha.appendChild(d)
                    }

                    function Wb() {
                        debug.apply(null, ["plugin"].concat(Oa(arguments)))
                    }

                    function ic(a) {
                        try {
                            return ub("with(this){" + K(a) + "}").call(A), !0
                        } catch (b) {
                            return U("PLUGIN ERR: " + b), !1
                        }
                    }

                    function xc() {
                        Za.back()
                    }

                    function Fa() {
                        m.close()
                    }

                    function ya(a, b) {
                        U("PM: resume");
                        ea || (ea = !0, 0 === ob && (a = a || ec, ob = ka.now(), Cb || (Cb = qa.profile && qa.profile.household), a && (a = a.replace("#", "")), a && 0 === a.indexOf("/") && (a = null), Ra.send(t, "show", {
                            hash: a,
                            session: Cb ? Aa(Cb + ob) : null
                        })), G.resuming && G.resuming(), !0 === b ? ea = T = !1 : V = function () {
                            V = r;
                            P.fire(u, u === t ? "onShowView" : "onSelect", {id: Q[u] && Q[u].currentViewId});
                            ea = T = !1
                        }.delay(400))
                    }

                    function ha(a, b) {
                        U("PM: exit");
                        Wa.active && Wa.reset();
                        Wa.clearBoundState();
                        0 !== ob && (Cb || (Cb = G.profile.household), Ra.send(t, "hide", {
                            duration: mb(ob),
                            session: Cb ? Aa(Cb + ob) : null
                        }), ob = 0);
                        if (W || T)G.exit && !b && G.exit(); else if (G.exit && (V && (db(V), V = r), W = !0, G.exit && !b && G.exit(), u !== t && P.close(u), !a)) {
                            var c = Q[t], d = c && c.document && c.document.body;
                            P.fire(t, "onHideView", {id: c && c.currentViewId});
                            d && d.focus();
                            T = !0;
                            W = !1
                        }
                    }

                    var bb = "#boot" === Ka[0];
                    (new Na({
                        url: "//" + fa[0] + "." + ca + ".com/?maf=true", jsonp: !0,
                        timeout: 3E3, onSuccess: function (a) {
                            na = a;
                            var b = Ia("geochanged");
                            q.forEach(Q, function (a, c) {
                                c.dispatchEvent(b)
                            });
                            D();
                            Ra.send(t, "household")
                        }, onFailure: function () {
                            this.send.delay(6E4, this)
                        }
                    })).send();
                    d.prototype = {
                        constructor: d, set: function (a, b) {
                            if (ba(b) || null === b)this.data[a] = null, delete this.data[a], this.synced = !1; else {
                                var c = ua(b);
                                this.data[a] !== c && (this.data[a] = c, this.synced = !1)
                            }
                        }, get: function (a) {
                            return (a = this.data[a]) ? ua(a) : r
                        }, has: function (a) {
                            return Y(this.data[a])
                        }, sync: X
                    };
                    e.prototype = new d;
                    e.prototype.constructor =
                        e;
                    f.prototype = new d;
                    f.prototype.constructor = f;
                    l.prototype = {constructor: l};
                    n.TV = 0;
                    n.PIP = 1;
                    n.MUSIC = 2;
                    n.FX = 3;
                    n.type = {VIDEO: 0, AUDIO: 1};
                    n.prototype = {
                        constructor: n,
                        subscribers: null,
                        id: n.TV,
                        type: n.type.VIDEO,
                        waitIndicator: !1,
                        startTime: 0,
                        currentTime: 0,
                        rates: [],
                        rate: 1,
                        duration: 0,
                        buffered: 100,
                        muted: !1,
                        volume: 1,
                        src: null,
                        paused: !0,
                        bounds: [0, 0, 1920, 1080],
                        hide: function () {
                            Bb.setStyle("backgroundColor", "black")
                        },
                        show: function () {
                            Bb.setStyle("backgroundColor", null)
                        },
                        notify: X,
                        destroy: X,
                        backToLive: X,
                        supports: function (a) {
                            return !0
                        }
                    };
                    n.state = {
                        INIT: -1,
                        PLAY: 0,
                        PAUSE: 1,
                        FORWARD: 2,
                        REWIND: 3,
                        STOP: 4,
                        BUFFERING: 5,
                        BUFFEREMPTY: 6,
                        INFOLOADED: 7,
                        EOF: 8,
                        UNKNOWN: 9,
                        ERROR: 10
                    };
                    var F = function () {
                        function b(f, h) {
                            function k(a) {
                                S.call(E, "onStateChange", {state: a});
                                y = a
                            }

                            function l(a) {
                                var b = a.type || "unknown";
                                switch (b) {
                                    case "durationchange":
                                        if (!t)return;
                                        pa = v.duration;
                                        return;
                                    case "timeupdate":
                                        u && Ca && (a = ka.now(), a - 800 > K && (J = v.currentTime, K = a, S.call(E, "onTimeChange")));
                                        return;
                                    case "ended":
                                        if (!t)return;
                                        break;
                                    case "emptied":
                                        if (!u || !t)return;
                                        u = !1;
                                        t = r;
                                        pa = 0;
                                        break;
                                    case "error":
                                        if (!u || !Ca)if (t)a.preventDefault(); else return;
                                        break;
                                    case "loadstart":
                                        if (!t)return;
                                        break;
                                    case "pause":
                                        if (!Ca) {
                                            E.src = "";
                                            return
                                        }
                                        break;
                                    case "play":
                                    case "canplay":
                                    case "canplaythrough":
                                        !0 === w("videoresize") && (this.bounds = this.bounds);
                                        if (!t)return;
                                        u || (u = !0, Ca = t);
                                        break;
                                    case "progress":
                                        if (!t)return;
                                        S.call(E, "onBufferChange", {percentage: E.buffered});
                                        if (u)return;
                                        break;
                                    case "ratechange":
                                        if (!t)return;
                                        a = E.rate;
                                        if (0 === a) {
                                            v.pause();
                                            return
                                        }
                                        if (1 === a) {
                                            if (v.paused) {
                                                try {
                                                    v.play()
                                                } catch (c) {
                                                }
                                                return
                                            }
                                            b = "play"
                                        } else b = 0 > a ? "rewind" :
                                            "forward";
                                        break;
                                    default:
                                        if (!t)return
                                }
                                a = d[b];
                                !Y(a) || -1 === e.indexOf(a) && y === a || k(a)
                            }

                            function m() {
                                !1 !== w("hidePlayer") && (wa.display = "none")
                            }

                            function B() {
                                !1 !== w("hidePlayer") && (wa.display = null)
                            }

                            function A() {
                                c.forEach(function (a) {
                                    this.removeEventListener(a, l)
                                }, v);
                                v.destroy();
                                p = wa = v = q = null;
                                delete E.subscribers
                            }

                            function aa(a) {
                                var b = w("forceMime");
                                if (b)return -1 !== a.indexOf(b);
                                b = v.canPlayType(a) || !1;
                                !b && a && -1 < a.indexOf(";") && (b = v.canPlayType(a.split(";")[0]) || !1);
                                switch (b) {
                                    case "maybe":
                                    case "probably":
                                        return !0;
                                    default:
                                        return !1
                                }
                            }

                            function ya() {
                                if (v.src) {
                                    v.src = "";
                                    try {
                                        v.load()
                                    } catch (a) {
                                    }
                                }
                            }

                            h = n.type.AUDIO === h ? n.type.AUDIO : n.type.VIDEO;
                            var E = this, p = h === n.type.AUDIO, ha = La(p ? "audio" : "video"), G = "inline" === w("player") || !1, v = ha && (G ? Bb.appendChild(ha) : ha.inject(Ha, "top")), q = p ? r : n.prototype.bounds, wa = v && v.style, u = !1, J = 0, pa = 0, K = ka.now(), t, Ca, y;
                            if (v) {
                                ta.activevideo && !0 === v.muted && (v.muted = !1);
                                E.subscribers = {};
                                f === n.TV ? (wa.position = "absolute", wa.left = 0, wa.top = 0, rb(v, "width", ma(q[2] * (G ? 1 : Ea))), rb(v, "height", ma(q[3] * (G ? 1 :
                                        Ja)))) : wa.display = "none";
                                f === n.PIP && (wa.display = "none", wa.zIndex = hc.ZORDER - 1);
                                c.forEach(function (a) {
                                    this.addEventListener(a, l, !1)
                                }, v);
                                a(E, "id", function () {
                                    return f
                                });
                                a(E, "type", function () {
                                    return h
                                });
                                a(E, "waitIndicator", function () {
                                    return !0
                                });
                                a(E, "backToLive", function () {
                                    return ya
                                });
                                var F = 1;
                                a(E, "channel", function () {
                                    return new g(F, w("runtime") ? "" : "Channel " + F)
                                });
                                N(E, "channel", function (a) {
                                    if ("string" === z(a))"up" === a ? (F++, 1E3 === F && (F = 1)) : (F--, 0 === F && (F = 999)); else if (0 < a && 1E3 > a)F = a; else return;
                                    S.call(E, "onChannelChange")
                                });
                                a(E, "program", function () {
                                    var a = w("blocked") && -1 !== w("blocked").indexOf(F) ? {} : {
                                        title: w("runtime") ? "" : "Program on " + F,
                                        description: "A program on channel " + F,
                                        startTime: Date.now(),
                                        duration: 3E5
                                    };
                                    return new L(a.title, a.description, a.startTime, a.duration)
                                });
                                a(E, "startTime", function () {
                                    return v.startTime || 0
                                });
                                N(E, "startTime", function (a) {
                                    v.startTime = a
                                });
                                a(E, "currentTime", function () {
                                    return J || 0
                                });
                                N(E, "currentTime", function (a) {
                                    v.currentTime = a
                                });
                                a(E, "rates", function () {
                                    return [1, 2, 6, 12, 30]
                                });
                                a(E, "rate", function () {
                                    return this.paused ?
                                        0 : v.playbackRate
                                });
                                N(E, "rate", function (a) {
                                    v.playbackRate = a;
                                    this.paused && (this.paused = !1)
                                });
                                a(E, "duration", function () {
                                    return pa || 0
                                });
                                a(E, "buffered", function () {
                                    if (v.buffered && pa && v.src)try {
                                        return 100 * x.min(1, x.max(0, v.buffered.end(0) / pa))
                                    } catch (a) {
                                        return 100
                                    } else return 100
                                });
                                a(E, "muted", function () {
                                    return !0 === v.muted
                                });
                                N(E, "muted", function (a) {
                                    v.muted = !0 === a
                                });
                                a(E, "volume", function () {
                                    return v.volume
                                });
                                N(E, "volume", function (a) {
                                    v.volume = x.max(x.min(parseFloat(a), 1), 0)
                                });
                                a(E, "src", function () {
                                    return Ca ||
                                        r
                                });
                                N(E, "src", function (a) {
                                    if (a && a === t)v.startTime = 0, v.play(); else if (a) {
                                        Ca && k(n.state.STOP);
                                        t = a;
                                        Ca = r;
                                        u = !1;
                                        v.removeAttribute("src");
                                        y = r;
                                        J = pa = 0;
                                        0 === t.indexOf("https:") && !1 === w("playerssl") && (t = r);
                                        v.src = t || "";
                                        try {
                                            v.load()
                                        } catch (b) {
                                        }
                                        t || k(n.state.ERROR);
                                        try {
                                            t && "function" === typeof v.changeMode && v.changeMode(!1)
                                        } catch (c) {
                                        }
                                    } else if (!a && Ca) {
                                        Ca = r;
                                        J = pa = 0;
                                        v.src = "";
                                        try {
                                            v.load()
                                        } catch (d) {
                                        }
                                        k(n.state.STOP);
                                        y = r
                                    }
                                });
                                a(E, "paused", function () {
                                    return v.paused
                                });
                                N(E, "paused", function (a) {
                                    Ca && (a ? v.pause() : (!0 === w("videoresize") &&
                                    (this.bounds = this.bounds), v.play()))
                                });
                                a(E, "bounds", function () {
                                    return p ? [0, 0, 0, 0] : q
                                });
                                N(E, "bounds", function (a) {
                                    var b = a && a.length || 0, c = G ? 1 : Ea, d = G ? 1 : Ja;
                                    !p && 1 < b && (4 === b && (q[2] = ma(a[2]), q[3] = ma(a[3]), b = ma(q[2] * c), v.setAttribute("width", b), b = ma(q[3] * d), v.setAttribute("height", b)), q[0] = ma(a[0]), q[1] = ma(a[1]), wa.left = ma(q[0] * c), wa.top = ma(q[1] * d))
                                });
                                a(E, "supports", function () {
                                    return aa
                                });
                                a(E, "show", function () {
                                    return B
                                });
                                a(E, "hide", function () {
                                    return m
                                });
                                a(E, "destroy", function () {
                                    return A
                                });
                                a(E, "element", function () {
                                    return v
                                })
                            }
                        }

                        var c = "durationchange timeupdate ratechange ended progress loadstart canplay canplaythrough abort emptied error pause play".split(" "), d = {
                            loadstart: n.state.BUFFERING,
                            play: n.state.PLAY,
                            pause: n.state.PAUSE,
                            forward: n.state.FORWARD,
                            rewind: n.state.REWIND,
                            emptied: n.state.STOP,
                            progress: n.state.BUFFERING,
                            abort: n.state.BUFFEREMPTY,
                            canplay: n.state.INFOLOADED,
                            ended: n.state.EOF,
                            error: n.state.ERROR
                        }, e = [n.state.FORWARD, n.state.REWIND];
                        b.prototype = new n;
                        return b.prototype.constructor = b
                    }(), G = {
                        storage: null, system: null,
                        tv: null, players: [], profile: null, profiles: []
                    };
                    y.prototype = {
                        constructor: y,
                        id: 0,
                        name: null,
                        ageRating: 0,
                        household: null,
                        operator: null,
                        packages: null,
                        country: null,
                        countryCode: null,
                        language: null,
                        languageCode: null,
                        city: null,
                        ip: null,
                        mac: null,
                        locale: null,
                        hasPin: !1,
                        locked: !1,
                        passport: null,
                        validatePIN: X,
                        purchase: function (a, b) {
                            var c = O[u] || {};
                            (new Na({
                                url: "https://" + fa[7] + ("test" === w("payment") ? "-sdk" : "") + "." + ca + ".com/",
                                method: "post",
                                encoding: "utf-8",
                                proxy: !1,
                                headers: {"Content-Type": "application/json"},
                                data: ga.stringify({
                                    purchase: a ||
                                    {},
                                    identifier: c.identifier,
                                    name: c.name,
                                    household: this.household,
                                    country: p.country || za(this.countryCode),
                                    operator: p.operator || za(this.operator)
                                }),
                                onSuccess: function (a) {
                                    if (b && b.call)return a.errors && 0 < a.errors.length ? b(a.errors) : b(null, a);
                                    b(["invalid"])
                                },
                                onFailure: function (a) {
                                    b && b.call && b(["invalid"])
                                },
                                onError: function () {
                                    b && b.call && b(["invalid"])
                                }
                            })).send()
                        }
                    };
                    Lb.prototype = new y;
                    Lb.prototype.constructor = Lb;
                    Lb.prototype.hasPIN = function (a) {
                        switch (a) {
                            case "master":
                            case "adult":
                            case "youth":
                            case "purchase":
                                return !0;
                            case "passport":
                                return this.passport.has("pin")
                        }
                        return !1
                    };
                    Lb.prototype.validatePIN = function (a, b) {
                        if (!this.hasPIN(b))return !0;
                        if (this.locked)return !1;
                        switch (b) {
                            case "master":
                                return "1111" === a;
                            case "adult":
                                return "0000" === a;
                            case "youth":
                                return "2222" === a;
                            case "purchase":
                                return "3333" === a;
                            case "passport":
                                return a === this.passport.get("pin")
                        }
                        return !1
                    };
                    var A = {
                        Browser: ta,
                        Storage: d,
                        Player: n,
                        TVChannel: g,
                        TVProgram: L,
                        CookieStorage: f,
                        HTML5Storage: e,
                        AutoStorage: h,
                        HTML5Player: F,
                        getter: a,
                        setter: N,
                        extendKeyboardEvent: lc,
                        fire: S,
                        send: k
                    }, E = {NORMAL: "normal", SHIFT: "shift", ALT: "alt", ALTSHIFT: "altshift", CTRL: "ctrl"};
                    a(E, "defineKeys", function () {
                        return C
                    });
                    a(E, "lookupKey", function () {
                        return I
                    });
                    a(A, "KeyMap", function () {
                        return E
                    });
                    a(A, "md5", function () {
                        return Aa
                    });
                    a(A, "typeOf", function () {
                        return z
                    });
                    a(A, "MAE", function () {
                        return p
                    });
                    a(A, "isSD", function () {
                        return w("forceSD") || "1" === uc.sd || Gb.hasClass("sd")
                    });
                    a(A, "setSetting", function () {
                        return Pc
                    });
                    a(A, "getSetting", function () {
                        return w
                    });
                    a(A, "getBootOption", function () {
                        return $c
                    });
                    a(A, "screen", function () {
                        return tc
                    });
                    a(A, "LANGUAGES", function () {
                        return Jc
                    });
                    a(A, "Player", function () {
                        return n
                    });
                    a(A, "HTML5Player", function () {
                        return F
                    });
                    a(A, "GenericStorage", function () {
                        return l
                    });
                    a(A, "AutoStorage", function () {
                        return h
                    });
                    a(A, "CookieStorage", function () {
                        return f
                    });
                    a(A, "HTML5Storage", function () {
                        return e
                    });
                    a(A, "Profile", function () {
                        return y
                    });
                    a(A, "GenericProfile", function () {
                        return Lb
                    });
                    a(A, "GEO", function () {
                        return na
                    });
                    a(A, "TVChannel", function () {
                        return g
                    });
                    a(A, "TVProgram", function () {
                        return L
                    });
                    a(A, "ApplicationManager", function () {
                        return P
                    });
                    a(A, "createPluginObject", function () {
                        return wa
                    });
                    a(A, "window", function () {
                        return m
                    });
                    a(A, "document", function () {
                        return R
                    });
                    a(A, "apps", function () {
                        return Q
                    });
                    a(A, "meta", function () {
                        return O
                    });
                    a(A, "active", function () {
                        return u
                    });
                    a(A, "ui", function () {
                        return t
                    });
                    a(A, "plugins", function () {
                        return G
                    });
                    a(A, "getElement", function () {
                        return sa
                    });
                    a(A, "emptyFn", function () {
                        return X
                    });
                    a(A, "getter", function () {
                        return a
                    });
                    a(A, "setter", function () {
                        return N
                    });
                    a(A, "Request", function () {
                        return Na
                    });
                    a(A, "log", function () {
                        return Ib
                    });
                    a(A, "warn", function () {
                        return fc
                    });
                    a(A, "error", function () {
                        return gc
                    });
                    a(A, "boot", function () {
                        return bb
                    });
                    a(A, "debug", function () {
                        return Wb
                    });
                    if (ta.metrological) {
                        ta.metrological && (fb.normal[46] = "menu", fb.ctrl[17] = "channel-up");
                        var vc = function () {
                            function b(a) {
                                if (l) {
                                    a = a || k + 1;
                                    var c = w("vevo") || 6;
                                    if ("string" === typeof c && "metrological" === c)m = "//video.metrological.com/vevo" + a + ".ts"; else if ("string" === typeof c && "auto" === c)m = "http://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch" +
                                        a + "/appleman.m3u8"; else {
                                        c = ma(c);
                                        if (1 > c || 6 < c)c = 6;
                                        m = "http://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch" + a + "/0" + c + "/prog_index.m3u8"
                                    }
                                    if (m !== l.src) {
                                        try {
                                            l.src = m, l.load(), l.play()
                                        } catch (d) {
                                        }
                                        if (f.onChannelChanged)f.onChannelChanged()
                                    }
                                }
                            }

                            function c() {
                                m = r;
                                (l = l || Ha.getElementsByTagName("video")[0]) && b()
                            }

                            function d() {
                                k++;
                                k === h.length && (k = 0);
                                b()
                            }

                            function e() {
                                k--;
                                0 > k && (k = h.length - 1);
                                b()
                            }

                            var f = {}, h = ["VEVO TV1", "VEVO TV2", "VEVO TV3"], k = 0, l, m;
                            a(f, "init", function () {
                                return c
                            });
                            a(f, "up", function () {
                                return d
                            });
                            a(f, "down", function () {
                                return e
                            });
                            a(f, "channel", function () {
                                return new g(k + 1, h[k])
                            });
                            N(f, "channel", function (a) {
                                --a;
                                var c = h.length;
                                0 <= a && a < c && (k = a, b())
                            });
                            a(f, "program", function () {
                                return new L(-1 === (w("blocked") || []).indexOf(k + 1) ? h[k] : r, "", ka.now(), -1)
                            });
                            return f
                        }();
                        a(A, "TVEmulator", function () {
                            return vc
                        })
                    }
                    a(A, "include", function () {
                        return ic
                    });
                    ta.middleware && !ta.rdk && ic(ta.middleware);
                    G.storage || (G.storage = new h);
                    G.resuming || (G.resuming = X);
                    if (!G.exit || ta.metrological)G.exit = G.exit || "history" === w("back") &&
                        xc || "close" === w("back") && Fa || ta.metrological && X;
                    G.profile || (G.profile = Lb);
                    if (!0 === vb.video || !0 === vb.novideo)G.players = [];
                    0 === G.players.length && (!0 !== vb.novideo ? G.players.push(new F(n.TV)) : G.players.push(new n));
                    G.players.forEach(function (a) {
                        a.constructor.state = n.state
                    });
                    var J = {}, Cb, T = bb, W = !1, ea = !1, V;
                    a(J, "players", function () {
                        return G.players
                    });
                    a(J, "delayStart", function () {
                        return !0 === G.delayStart
                    });
                    N(J, "startup", function (a) {
                        G.startup = a
                    });
                    a(J, "storage", function () {
                        return G.storage
                    });
                    a(J, "GenericStorage",
                        function () {
                            return l
                        });
                    a(J, "Profile", function () {
                        return G.profile
                    });
                    a(J, "resume", function () {
                        return ya
                    });
                    a(J, "exit", function () {
                        return ha
                    });
                    a(J, "resuming", function () {
                        return ea
                    });
                    a(J, "exiting", function () {
                        return W
                    });
                    a(J, "exited", function () {
                        return T
                    });
                    a(J, "setState", function () {
                        return G.setState || X
                    });
                    a(J, "setMode", function () {
                        return G.setMode || X
                    });
                    ta.metrological && m.addEventListener("keydown", function (a) {
                        !a.defaultPrevented && (a = a.key) && ("channel-up" === a || "channel-down" === a ? G.players[0].channel = a.split("-")[1] :
                        "mute" === a && (G.players[0].muted = !G.players[0].muted))
                    }, !1);
                    "inline" !== w("player") && m.addEventListener("resize", function () {
                        G.players.forEach(function (a) {
                            a.bounds = a.bounds
                        })
                    });
                    var H = w("keymap");
                    if ("object" === typeof H)for (var Z in H)C(Z, H[Z], !0);
                    return J
                }(), qa = function () {
                    function b(a) {
                        var c = p.get("profiles") || [];
                        return a && -1 !== c.indexOf(a) || !1
                    }

                    function c(a) {
                        if (b(a))return new n(a)
                    }

                    function d() {
                        return (p.get("profiles") || []).filter(function (a) {
                            return !q || a !== q.name
                        })
                    }

                    function e(a, b) {
                        var c = p.get("profiles") ||
                            [];
                        return b && 4 === b.length && a && -1 === c.indexOf(a) ? (c.push(a), p.set("profiles", c), h(), q = new n(a), q.passport.set("pin", b), S.call(l, "onLoadProfile") && k(u, "onLoadProfile", {id: a}, va), !0) : !1
                    }

                    function f(a) {
                        var b = p.get("profiles") || [], c = q;
                        idx = b.indexOf(a);
                        if (-1 !== idx) {
                            b.splice(idx, 1);
                            p.set("profiles", b);
                            q = new n(a);
                            var d = q.id;
                            (m.storage.get(d) || []).forEach(function (a) {
                                m.storage.set(a)
                            });
                            m.storage.set(d);
                            (q = c) && q.name === a && h();
                            0 === b.length && p.remove("profiles");
                            return !0
                        }
                        return !1
                    }

                    function g(a, b) {
                        var c = (p.get("profiles") ||
                        []).indexOf(a);
                        if (q && q.name === a)return !0;
                        if (-1 !== c) {
                            c = new n(a);
                            if (b) {
                                var d = Aa("pp:" + c.id + ":pin");
                                if (m.storage.get(d) !== b)return !1
                            }
                            q && h();
                            q = c;
                            S.call(l, "onLoadProfile") && k(u, "onLoadProfile", {id: a}, va);
                            return !0
                        }
                        q && h();
                        return !1
                    }

                    function h() {
                        if (q) {
                            var a = q.name;
                            q = !1;
                            S.call(l, "onUnloadProfile") && k(u, "onUnloadProfile", {id: a}, va)
                        }
                    }

                    var l = {}, m = ja, n = m.Profile, p = new m.GenericStorage("pm"), r = new n, q = !1;
                    a(l, "hasProfiles", function () {
                        return p.has("profiles")
                    });
                    a(l, "getProfiles", function () {
                        return d
                    });
                    a(l, "isFamily",
                        function () {
                            return !1 === q
                        });
                    a(l, "exists", function () {
                        return b
                    });
                    a(l, "add", function () {
                        return e
                    });
                    a(l, "get", function () {
                        return c
                    });
                    a(l, "remove", function () {
                        return f
                    });
                    a(l, "select", function () {
                        return g
                    });
                    a(l, "logout", function () {
                        return h
                    });
                    a(l, "profile", function () {
                        return q || r
                    });
                    return l
                }(), Ra = function () {
                    function a(e, f, g) {
                        g = g || {};
                        var h = "", k;
                        for (k in g)g[k] !== r && (h += "&" + k + "=" + g[k]);
                        1024 < h.length && (h = "");
                        k = qa.profile;
                        if (k.household) {
                            g = new $a;
                            var l = ja.players[0], m = (l && l.channel || {}).name || "", l = (l && l.program || {}).title ||
                                "";
                            e = "?type=" + (e === t ? "ui" : "app") + "&id=" + e + "&event=" + f + "&country=" + k.countryCode + "&household=" + k.household + "&customer=" + k.operator + "&channel=" + m + "&program=" + l + "&environment=" + (p.environment || "");
                            if ("channel" === f)e += "&prevChannel=" + c + "&prevProgram=" + d, c = M(m), d = M(l); else if ("household" === f || "stb" === f)if (f = k.wan || k.ip || "127.0.0.1", (k = k.uid) && "127.0.0.1" !== f)e += "&uid=" + k + "&ip=" + f; else return;
                            g.open("GET", b + e + h, !0);
                            g.send()
                        }
                    }

                    var b = "//" + fa[5] + "." + ca + ".com/", c = "", d = "";
                    return {send: !1 === w("stats") ? X : a}
                }(),
                Hb = function () {
                    function b(a, c) {
                        return "//" + fa[1] + "." + ca + ".com/qr?q=" + (a || ca) + "&s=" + (c || 10)
                    }

                    var c = {};
                    a(c, "get", function () {
                        return b
                    });
                    return c
                }(), xb = function () {
                    function b(a) {
                        n && U(a)
                    }

                    function c(a, b) {
                        try {
                            a && S.call(this, a, b)
                        } catch (d) {
                        }
                    }

                    function d(a) {
                        a = "string" !== typeof a ? ga.stringify(a) : a;
                        var c = Fa ? Fa.readyState : -1;
                        b("WS SEND: " + c);
                        if (1 === c && a)if (!0 === l.async)try {
                            Fa.send.delay(0, Fa, [a])
                        } catch (e) {
                            b("WS SEND DELAYED ERR")
                        } else try {
                            Fa.send(a)
                        } catch (g) {
                            b("WS SEND DELAYED ERR")
                        } else 3 === c && L && (b("WS SEND ERR"),
                            f())
                    }

                    function e() {
                        b("WS OPENED");
                        x = 0;
                        L = !0;
                        c.call(u, "onConnected");
                        q.forEach(t, function (a, b) {
                            c.call(b, "onConnected")
                        });
                        q.keys(wa).unique().forEach(function (a) {
                            d({e: "j", k: a})
                        })
                    }

                    function f() {
                        b("WS CLOSED");
                        x++;
                        L = !1;
                        c.call(u, "onDisconnected");
                        q.forEach(t, function (a, b) {
                            d({e: "l", h: b.hash});
                            if (b.users)for (; b.users.length;) {
                                var e = b.users.pop();
                                c.call(b, "onHasLeft", {hash: b.hash, user: e, data: r})
                            }
                            c.call(b, "onDisconnected");
                            delete b.hash
                        });
                        Fa && (Fa.onopen = null, Fa.onmessage = null, Fa.onclose = null, Fa = r);
                        z = r;
                        h.delay(5E3 *
                            x)
                    }

                    function g(a) {
                        try {
                            var b = ga.parse(a.data), e = b.h, f = b.d, h = b.u, k = y[e], l = t[k || b.k], m;
                            switch (b.e) {
                                case "j":
                                    var B = l && l.users && -1 !== l.users.indexOf(h);
                                    if (b.k && l && !l.hash)y[e] = b.k, wa[b.k] = e, z || (z = h), l.hash = e, !B && l.users && l.users.push(h), c.call(l, "onCreated", {
                                        hash: e,
                                        user: h,
                                        data: f
                                    }); else if (!b.k && k && l) {
                                        if (B)return;
                                        l.users && l.users.push(h)
                                    } else return;
                                    m = "onJoined";
                                    l && l.users && d(f ? {e: "p", h: e, d: f} : {e: "p", h: e});
                                    break;
                                case "l":
                                    var n = l && l.users && l.users.indexOf(h);
                                    if (k && -1 < n && l && l.users)l.users.splice(n, 1); else return;
                                    m = "onHasLeft";
                                    break;
                                case "p":
                                    h !== z && l && l.users && -1 === l.users.indexOf(h) && (l.users.push(h), m = "onJoined", d(f ? {
                                        e: "p",
                                        h: e,
                                        d: f
                                    } : {e: "p", h: e}));
                                    break;
                                case "d":
                                    if (!h && (!l || l.users && -1 === l.users.indexOf(h)))return;
                                    m = "onData";
                                    break;
                                case "e":
                                    return c.call(l, "onError", {hash: e, user: h, code: b.c});
                                default:
                                    return
                            }
                            m && l && c.call(l, m, {hash: e, user: h, data: f})
                        } catch (aa) {
                        }
                    }

                    function h() {
                        a:{
                            b("WS CREATE");
                            try {
                                var a = p.operator, c = Z.pathname;
                                if (0 !== c.indexOf("/" + a)) {
                                    var d = c.split("/");
                                    1 < d.length && (a = d[1])
                                }
                                Fa = !1 !== w("websocket") &&
                                    new nc(("https:" === Z.protocol ? "wss" : "ws") + "://ws" + (ra.appsServer ? "-sdk" : "") + ".metrological.com/" + (a ? "?operator=" + a : ""));
                                break a
                            } catch (k) {
                                b("WS CREATE ERR")
                            }
                            Fa = void 0
                        }
                        Fa ? (Fa.onopen = e, Fa.onmessage = g, Fa.onclose = f) : !1 !== ra.notification && h.delay(5E3)
                    }

                    function k(b) {
                        function e(a) {
                            wa[b] || d(a ? {e: "j", k: b, d: a} : {e: "j", k: b});
                            return l
                        }

                        function f(a) {
                            var e = t[b], g = wa[b];
                            if (e && g) {
                                d(a ? {h: g, e: "l", d: a} : {h: g, e: "l"});
                                if (e.users)for (; e.users.length;) {
                                    var h = e.users.pop();
                                    c.call(e, "onHasLeft", {hash: g, user: h, data: a})
                                }
                                delete wa[b];
                                delete y[g];
                                c.call(e, "onDestroyed", {hash: g, user: z, data: a})
                            }
                            return l
                        }

                        function g(a) {
                            wa[b] && d(a ? {h: wa[b], e: "d", d: a} : {h: wa[b], e: "d"});
                            return l
                        }

                        function h(a) {
                            var c = wa[b];
                            return t[b] ? (c && f(a), delete t[b], !0) : !1
                        }

                        if (!b)throw Qa("id is required to create a channel");
                        if (t[b])throw Qa("channel already exists");
                        var l = this;
                        t[b] = {subscribers: [], users: []};
                        0 === b.indexOf("admin|") && delete t[b].users;
                        a(l, "subscribers", function () {
                            return t[b] && t[b].subscribers
                        });
                        a(l, "users", function () {
                            return t[b] && t[b].users
                        });
                        a(l, "hash",
                            function () {
                                return t[b] && t[b].hash
                            });
                        a(l, "user", function () {
                            return z
                        });
                        a(l, "connected", function () {
                            return L
                        });
                        a(l, "joined", function () {
                            return t[b] && t[b].hash !== r
                        });
                        a(l, "join", function () {
                            return e
                        });
                        a(l, "leave", function () {
                            return f
                        });
                        a(l, "send", function () {
                            return g
                        });
                        a(l, "destroy", function () {
                            return h
                        })
                    }

                    var l = w("ws") || {}, n = !0 === l.debug, u = {}, t = {}, y = {}, wa = {}, x = 0, L = !1, z, Fa;
                    a(u, "connected", function () {
                        return L
                    });
                    a(u, "Channel", function () {
                        return k
                    });
                    nc && h.delay(l.delay || 0);
                    m.addEventListener("unload", function () {
                        q.forEach(t,
                            function (a, b) {
                                d({e: "l", h: b.hash})
                            });
                        Fa && Fa.close();
                        Fa = t = y = null
                    }, !1);
                    return u
                }(), Nb = function () {
                    function b() {
                        if (!1 !== w("playerror")) {
                            var a = Q[u], c = a && a.MAF, a = a && a.widget && a.widget.getLocalizedString;
                            c && (new c.dialogs.Alert({
                                title: a("ERROR"),
                                message: a("PLAYBACK_ERROR"),
                                buttons: [{
                                    label: a("CLOSE"), callback: function () {
                                    }
                                }]
                            })).show()
                        }
                    }

                    function c(a, b, e) {
                        if ("live" === a.ps && !a.hlsvp)return b.call(e);
                        if ("True" === a.use_cipher_signature)return d(a, b, e);
                        var f = [];
                        if (a.url_encoded_fmt_stream_map)for (var g = decodeURIComponent(a.url_encoded_fmt_stream_map).split(","),
                                                                  h, B, n, aa = 0; aa < g.length; aa++) {
                            if (h = qb(g[aa]), h.url && (B = decodeURIComponent(h.type || h.mimetype).replace("+", " "), !k || k(B)))if (B = h.itag, B = "37" === B && 720 < 1920 * Ea ? {
                                    bitrate: 6092,
                                    format: "1080p MP4"
                                } : "22" === B ? {bitrate: 3092, format: "720p MP4"} : "18" === B ? {
                                    bitrate: 596,
                                    format: "360p MP4"
                                } : "46" === B ? {bitrate: 4192, format: "1080p VP8"} : "45" === B ? {
                                    bitrate: 2192,
                                    format: "720p VP8"
                                } : "44" === B ? {bitrate: 1128, format: "480p VP8"} : "43" === B ? {
                                    bitrate: 628,
                                    format: "360p VP8"
                                } : "35" === B ? {bitrate: 1128, format: "480p FLV"} : "34" === B ? {
                                    bitrate: 628,
                                    format: "360p FLV"
                                } : "5" === B ? {bitrate: 314, format: "240p FLV"} : !1) {
                                var p = decodeURIComponent(h.url), A = -1 !== p.indexOf("requiressl=yes"), p = p.replace(/^https/, A ? "https" : "http");
                                l && U("ssl: " + A);
                                n = p.split("?");
                                var A = B, v = n[0];
                                n = qb(n[1]);
                                var t = decodeURIComponent(n.sparams).split(",").concat(["sparams", "key"]).unique(), u = "?", w = void 0;
                                for (w in n)-1 < t.indexOf(w) && (u += w + "=" + n[w] + "&");
                                n = u.slice(0, -1);
                                A.url = v + n;
                                if (h.sig)B.url += "&signature=" + h.sig; else if (h.s) {
                                    p = B;
                                    A = p.url;
                                    h = h.s;
                                    h = h.split("");
                                    for (v = 0; v < m[1].length; v++)(n =
                                        q[m[2][v]]) && n.call && n(h, m[1][v]);
                                    h = h.join("");
                                    p.url = A + ("&signature=" + h)
                                } else h.url && (B.url = p);
                                f.push(B)
                            }
                        } else a.hlsvp && f.push({url: decodeURIComponent(a.hlsvp), format: "M3U8"});
                        var pa, x, g = a.iurlmaxres ? decodeURIComponent(a.iurlmaxres) : a.iurlsd ? decodeURIComponent(a.iurlsd) : "//i.ytimg.com/vi/" + a.video_id + "/hqdefault.jpg";
                        a.title && (pa = decodeURIComponent(a.title.replace(/\+/g, " ")));
                        a.length_seconds && (x = ma(a.length_seconds));
                        0 < f.length ? (pa = new y(pa, r, g, x), pa.id = a.video_id, b.call(e, {
                            asset: pa,
                            streams: f
                        })) :
                            b.call(e)
                    }

                    function d(a, b, e) {
                        var f = new $a, g = !("object" === typeof h && !1 === h.proxy);
                        f.onreadystatechange = function () {
                            if (4 === f.readyState && 200 === f.status) {
                                f.onreadystatechange = null;
                                var d = /\"url_encoded_fmt_stream_map\": ?\"([^"]*)\"/.exec(f.responseText);
                                d && (a.url_encoded_fmt_stream_map = encodeURIComponent(Rc(d[1])));
                                (d = /\\\/\\\/s\.ytimg\.com\\\/yts\\\/jsbin\\\/html5player(.+)-vfl(.{6})\\\/html5player(.+)?\.js/.exec(f.responseText)) || (d = /\\\/\\\/s\.ytimg\.com\\\/yts\\\/jsbin\\\/html5player(.+)-vfl(.{6})\.js/.exec(f.responseText));
                                f = null;
                                if (!d)return b.call(e);
                                m[0] = d[2] || d[1];
                                var g = new $a;
                                g.onreadystatechange = function () {
                                    if (4 === g.readyState && 200 === g.status) {
                                        g.onreadystatechange = null;
                                        d = /\=\{(.+)\}\;function [$_A-z0-9]+\(a\)\{a=a(?:\.split|\[[$_A-z]+\])\(\"\"\);([^"]*)/.exec(g.responseText);
                                        g = null;
                                        if (!d)return b.call(e);
                                        for (var f, h = /([A-z0-9]+)\:function\([A-z0-9,]+\){([A-z0-9\.\(\)\s\=\[\]\;\%\,]+)}/g, k = {}; f = h.exec(d[1]);)-1 < f[2].indexOf("reverse") ? k[f[1]] = "revr" : -1 < f[2].indexOf("splice") ? k[f[1]] = "slic" : k[f[1]] = "swap";
                                        l && U(k);
                                        m[1] = [];
                                        m[2] = [];
                                        for (h = /([A-Za-z0-9]+)\(([^\d\)]*)(\d*)\)|\[(\d+)\]/g; f = h.exec(d[2]);) {
                                            var B = f[4] || f[3];
                                            "" === f[1] ? "" === B ? m[1].push(0) : m[1].push(-ma(B)) : m[1].push(ma(B));
                                            m[2].push(k[f[1]] || "swap")
                                        }
                                        delete a.use_cipher_signature;
                                        c(a, b, e)
                                    }
                                };
                                g.open("GET", $b(d[0].replace(/\\/g, "")), !0).replace('//cdn.metrological.com','') ;
                                g.send(null)
                            }
                        };
                        f.open("GET", !1 !== g ? $b("https://www.youtube.com/watch?v=" + a.video_id, !1, !0).replace('//cdn.metrological.com','')  : "https://www.youtube.com/watch?v=" + a.video_id, !0);
                        f.send(null)
                    }

                    function e(a, d, f) {
                        f = f || Q[u] || null;
                        var g = a && a.match(p);
                        g && 2 <= g.length &&
                        (a = g[2]);
                        if (a && d) {
                            var k = new $a, g = !("object" === typeof h && !1 === h.proxy);
                            k.onerror = b;
                            k.onreadystatechange = function () {
                                if (4 === k.readyState && 200 === k.status && k.responseText) {
                                    k.onerror = null;
                                    k.onreadystatechange = null;
                                    l && U("yt: " + k.responseText.length);
                                    var a = qb(k.responseText);
                                    k = null;
                                    "ok" === a.status ? c(a, d, f) : d.call(f)
                                }
                            };
                            console.log('here');
                            k.open("GET", !1 !== g ? $b("http://www.youtube.com/get_video_info?video_id=" + a + "&eurl=https%3A%2F%2Fwww%2Eyoutube%2Ecom%2F").replace('//cdn.metrological.com','') : "//www.youtube.com/get_video_info?video_id=" + a + "&eurl=https%3A%2F%2Fwww%2Eyoutube%2Ecom%2F",
                                !0);
                            k.send(null)
                        }
                    }

                    function f() {
                        var a = Pa(qa.profile.countryCode);
                        return n.indexOf(a), "/" + a
                    }

                    var g = {}, h = w("youtube") || {}, l = !0 === h.debug, k = ja.players[0].supports, m = [null, [], []], n = "AR AU BE BR CA CH CL CO CZ EG FR DE GB HK HU IN IE IL IT JP JO MY MX MA NL NZ PE PH PL RU SA SG SG ZA KR ES SE TW AE US".split(" "), p = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*/, q = {
                        swap: function (a, b) {
                            var c = a[0];
                            a[0] = a[b % a.length];
                            a[b] = c
                        }, revr: function (a) {
                            a.reverse()
                        }, slic: function (a, b) {
                            a.splice(0,
                                b)
                        }
                    };
                    a(g, "get", function () {
                        return e
                    });
                    a(g, "regionQueryString", function () {
                        return f
                    });
                    a(g, "region", function () {
                        var a = Pa(qa.profile.countryCode);
                        return n.indexOf(a), a
                    });
                    return g
                }(), Wa = function () {
                    function b() {
                        return {channel: (z && z.channel || {}).name, program: (z && z.program || {}).title}
                    }

                    function c() {
                        L && L.exit();
                        l()
                    }

                    function d() {
                        if (!G) {
                            var a = 60 - (new Date).getSeconds();
                            Eb(function () {
                                p();
                                G = Mb(p, 6E4)
                            }, 1E3 * a)
                        }
                    }

                    function e() {
                        G && (Sb(G), G = null)
                    }

                    function f(a, b) {
                        if (!a || 0 === a.length)return !1;
                        for (var d = !1, e = 0; e < a.length; e++) {
                            var g =
                                a[e];
                            if (g)switch (g.type) {
                                case "start":
                                    ya = "resume";
                                    var h = g.identifier, k = w("alias");
                                    h && k && k[h] && (h = k[h]);
                                    if (!h || !P)break;
                                    b && (U("notification: boundTo" + ga.stringify(b)), ha = b);
                                    if (h === t)break;
                                    d = !0;
                                    P.fire(t, "onApplicationStartupRequest", {id: h, params: g.params || null});
                                    break;
                                case "tune":
                                    ya = "exit", g = g.channel, z && g && (z.channel = g), c.delay(1E3)
                            }
                        }
                        return d
                    }

                    function g(a, b) {
                        var c = a.matches || [];
                        if (0 === a.matches.length)return !0;
                        for (var d = 0; d < c.length; d++) {
                            for (var e = c[d] || [], f, h = 0; h < e.length; h++) {
                                f = !1;
                                for (var k = e[h],
                                         l = [].concat(k.values || []), k = b[k.type], m = 0; m < l.length; m++) {
                                    var B = l[m];
                                    if (!a.actions && B && eb(/\/(\^.+\$)\//).test(B)) {
                                        var n = B.match(/\/(\^.+\$)\//);
                                        n && 1 < n.length && (B = n[1])
                                    }
                                    if (k && B && eb(B, "i").test(k)) {
                                        f = !0;
                                        break
                                    }
                                }
                            }
                            if (!0 === f)return !0
                        }
                        return !1
                    }

                    function h(a) {
                        a:{
                            for (var b = 0; b < ib.length; b++)if (ib[b].id === a) {
                                a = b;
                                break a
                            }
                            a = -1
                        }
                        b = [];
                        -1 < a && (b = ib.splice(a, 1));
                        U("deleteEvent: " + b.length)
                    }

                    function k() {
                        U("c2a: " + (D ? "true" : "false"));
                        y();
                        ya = "resume";
                        if (!D)return U("c2a: no event");
                        var a = b(), c = D, d = c && c.notification, e =
                            !1;
                        d && !1 === d.reappear && h(c.id);
                        if (!g(c, a))return U("c2a: no matches");
                        c.actions && (e = f(c.actions, d.bound && c.matches));
                        U("c2a start app: " + e);
                        return e
                    }

                    function l() {
                        U("reset");
                        y();
                        var a = D, b = a && a.notification, c = b && 0 === b.repeat;
                        if (b) {
                            b.timerId !== r && (db(b.timerId), b.timerId = r);
                            if ((-1 === b.repeat || 0 < b.repeat) && b.timeout) {
                                var d = 1E3 * b.delay, e = 1E3 * b.timeout;
                                b.timerId = n.delay(0 < e - d ? e - d : 0, null, [a])
                            }
                            0 < b.repeat && b.repeat--;
                            c && !0 === b["delete"] && h(a.id)
                        }
                        D = r
                    }

                    function m(a, b, c, d) {
                        y();
                        switch (c) {
                            case "notification":
                                c =
                                    "alert";
                                break;
                            case "call2action":
                                c = "c2a";
                                break;
                            case "alert":
                            case "c2a":
                                break;
                            default:
                                return U("notifications: unknown type, " + c)
                        }
                        var e = d && d.notification || {}, g = 1E3 * e.delay || 0;
                        a = [""].concat(a.split("\n").reverse());
                        var h;
                        2 === a.length && (a = [""].concat(a));
                        "c2a" === c && (h = d.actions ? t : d.app && d.app.identifier);
                        D = d;
                        F = l.delay(7E3 + g);
                        z.notify.bind(null, b || !1, a, c, h).delay(g);
                        "alert" === c && d.actions && f.bind(null, d.actions, e.bound && d.matches).delay(g)
                    }

                    function n(a, c) {
                        if (!a)return U("notifications: no event");
                        c = c ||
                            b();
                        Ib(a.start);
                        if (null !== a.start && a.start !== r && (new ka(a.start)).getTime() >= ka.now())return U("notifications: start date");
                        if (null !== a.end && a.end !== r && (new ka(a.end)).getTime() < ka.now())return U("notifications: end date");
                        if (!g(a, c))return U("notifications: no matches");
                        if (-1 === ib.map(function (a) {
                                return a && a.id
                            }).indexOf(a.id))return U("notifications: is deleted, do not show.");
                        var d = a.notification || !1;
                        if (!d)return U("notifications: no data");
                        m(d.message, d.image, a.type, a)
                    }

                    function p() {
                        if (ib && 0 !==
                            ib.length) {
                            var a = b();
                            U("notifications: " + ib.length);
                            ib.forEach(function (b) {
                                var c = b;
                                b && b.notification && !1 === b.notification["delete"] && (c = ua(b));
                                if (D && c && c.id == D.id)return U("notifications: notifications allready is currentEvent");
                                n(c, a)
                            })
                        }
                    }

                    function q() {
                        ha && !g({matches: ha}, b()) && (U("Notifications: exit serviceBound"), ha = null, c());
                        p()
                    }

                    function u() {
                        ha = null
                    }

                    function y() {
                        F && (db(F), F = r)
                    }

                    var x = {}, L = ja, z = L.players[0], ya = "resume", ha = null, D, F, G;
                    a(x, "clearBoundState", function () {
                        return u
                    });
                    a(x, "handleChannelChange",
                        function () {
                            return q
                        });
                    a(x, "c2a", function () {
                        return k
                    });
                    a(x, "run", function () {
                        return p
                    });
                    a(x, "reset", function () {
                        return l
                    });
                    a(x, "active", function () {
                        return D !== r
                    });
                    a(x, "state", function () {
                        return ya
                    });
                    a(x, "startInterval", function () {
                        return d
                    });
                    a(x, "stopInterval", function () {
                        return e
                    });
                    return x
                }(), Ob = function () {
                    function b(a, c, d, e) {
                        this.x = a || 0;
                        this.y = c || 0;
                        this.width = d || 0;
                        this.height = e || 0
                    }

                    function c(h, v) {
                        function T() {
                            return v && v.MAF && v.MAF.application.isSidebarView()
                        }

                        function F() {
                            return v && v.widget && !0 === v.widget.audio
                        }

                        function G() {
                            var a;
                            f || (f = qa.profile.household);
                            a = ba(v) ? !1 : !0;
                            return a && (h === t || u === h) && e || !1
                        }

                        function A() {
                            return G() && n || !1
                        }

                        function E() {
                            var a = e.bounds;
                            return new b(a[0], a[1], a[2], a[3])
                        }

                        function M() {
                            var a = Oa(arguments), c = a.length;
                            if (e && 4 === c) {
                                var d = a[0], g = a[1], f = a[2], c = a[3], h = da.isTVActive, k = E();
                                if (k.x !== d || k.y !== g || k.width !== f || k.height !== c)ta.activevideo && 1080 === c && e.hide(), d = new b(d, g, f, c), S.call(da, "onViewportBoundsChanged", {
                                    viewport: {
                                        previous: k,
                                        current: d
                                    }
                                }) && (e.bounds = a, l = k), ta.activevideo &&
                                (1080 === c && !h || 1080 !== c && h ? e.show() : e.hide())
                            }
                        }

                        function J() {
                            return e && e.waitIndicator && h !== t || !1
                        }

                        function Q() {
                            A() && (1 !== e.rate && (e.rate = 1), e.paused = !1)
                        }

                        function H() {
                            A() && (e.paused = !0)
                        }

                        function W() {
                            C && (db(C), C = r);
                            0 < z && 0 < hb && Ra.send(h, "playback", {
                                duration: mb(z),
                                session: f ? Aa(f + hb) : null
                            });
                            z = 0;
                            P = r;
                            I = 0;
                            e.src && (e.src = "");
                            !0 === O[h].fullscreen && e.hide();
                            return !0
                        }

                        function ea() {
                            e.src && !C && W() && (m = n = r, C = function () {
                                if (C && !n) {
                                    C = r;
                                    try {
                                        e.backToLive()
                                    } catch (a) {
                                    }
                                }
                            }.delay(1200))
                        }

                        function ga(a) {
                            if (A()) {
                                var b = e.rates ||
                                    [1], c = e.rate || 0, d = 1;
                                if (0 < a && 0 > c || 0 > a && 0 < c)c = 1;
                                if (0 === c)d = b[0] || 1; else {
                                    c = b.indexOf(x.abs(c)) + 1;
                                    if (c === b.length)return;
                                    d = b[c]
                                }
                                e.rate = d * a
                            }
                        }

                        function fa() {
                            ga(-1)
                        }

                        function X() {
                            ga(1)
                        }

                        function Z(a, b) {
                            A() && (b ? (a = Math.abs(a), e.currentTime = a || 0, I = a) : (e.currentTime += a || 0, I += a))
                        }

                        function la(a) {
                            A() && (e.muted = a)
                        }

                        function ma() {
                            A() && e.show()
                        }

                        function ca() {
                            A() && e.show()
                        }

                        function oa() {
                            n = r;
                            ea()
                        }

                        function ia() {
                            m = h;
                            p = Sa = g.INIT;
                            return !0
                        }

                        function hd() {
                            return Ta
                        }

                        function id(a) {
                            G() && (a instanceof v.MAF.media.Playlist ? S.call(da,
                                "onPlaylistChange", {playlist: a}) && (Ta = a) : gc("Playlists must be an instance of (or inherit from) MAF.media.Playlist"))
                        }

                        function jd(a) {
                            if (G() && a instanceof v.MAF.media.PlaylistEntry && S.call(da, "onProcessPlaylistEntry", {entry: a}) && a.streamsReady() && 0 < a.streams.length && ia()) {
                                n = a;
                                var b = a.streams[0].url;
                                a = !0 === v.widget.audio;
                                I = 0;
                                P = r;
                                C && (db(C), C = r);
                                !a && ta.activevideo ? (Ba(), function () {
                                    e.src = b
                                }.delay(800)) : (!0 === O[h].fullscreen && e.show(), e && e.channel && -1 !== (w("blocked") || []).indexOf(e.channel.number) && (e.show(),
                                    e.muted = !1), e.src = b);
                                0 < hb && Ra.send(h, "playback", {
                                    duration: 0 < z ? mb(z) : 0,
                                    session: f ? Aa(f + hb) : null
                                });
                                z = ka.now();
                                Ra.send(h, a ? "audio" : "video")
                            }
                        }

                        function Vb(a) {
                            a = 0 > a ? 0 : a || 0;
                            if (G() && Ta) {
                                var b = Ta.entries, c = b && b.length || 0;
                                0 < c && S.call(da, "onLoadPlaylistEntry", {index: a}) && ((b = b[a]) && b instanceof v.MAF.media.PlaylistEntry ? jd(b) : a === c && Ta.repeatAll && S.call(da, "onPlaylistRepeat") ? Vb(0) : S.call(da, "onPlaylistEnd") && oa())
                            }
                        }

                        function wc() {
                            return Ta && Ta.entries ? Ta.entries.indexOf(n) : -1
                        }

                        function kd() {
                            var a = wc();
                            0 < a && S.call(da,
                                "onLoadPreviousPlaylistEntry") ? Vb(--a) : oa()
                        }

                        function ua() {
                            var a = wc();
                            -1 < a && S.call(da, "onLoadNextPlaylistEntry") ? Vb(++a) : oa()
                        }

                        function Xa() {
                            C && (db(C), C = r);
                            G() && Ta && ia() && S.call(da, "onStartPlaylist") && Vb(0)
                        }

                        function na(a) {
                            n && W();
                            e.channel = a
                        }

                        function Da() {
                            return e.channel
                        }

                        function za() {
                            return e.program
                        }

                        function Ba() {
                            if (!F() && ta.activevideo) {
                                R.body.store("app", h);
                                for (var a = Bb.getElementsByTagName("div"), b = 0; b < a.length; b++)a[b].hasClass("window") && a[b].setStyle("left", -1920);
                                1080 !== e.bounds[3] && M(0, 0,
                                    1920, 1080);
                                e.show()
                            }
                        }

                        function ra() {
                            if (!F() && ta.activevideo) {
                                T() && 1080 !== l.height ? M(l.x, l.y, l.width, l.height) : e.hide();
                                R.body.eliminate("app");
                                for (var a = Bb.getElementsByTagName("div"), b = 0; b < a.length; b++)a[b].hasClass("window") && a[b].setStyle("left", 0)
                            }
                        }

                        function Ha() {
                            if (!F() && kb("app") !== h && !ta.activevideo) {
                                var a = T(), b = v && v.document && v.document.body;
                                a && b && 1080 === e.bounds[3] && (a = v && v.MAF && v.MAF.application.getCurrentViewId(), R.body.store("app", h), cb.push(h, (v && v.MAF && v.MAF.application.getDefaultViewId()) !==
                                    a && a), !1 !== w("animation") ? b.animate({
                                    translateX: -1920,
                                    origin: ["left", "top"],
                                    duration: .8
                                }) : b.setStyle("transform", "translateX(-1920px)"))
                            }
                        }

                        function xa() {
                            if (!F() && kb("app") === h && !ta.activevideo) {
                                var a = T(), b = v && v.document && v.document.body;
                                a && 1080 !== l.height && "scale" === w("video") && k(h, "onActivateAppButton", {type: "viewport-toggle"}, va);
                                a && b && kb("app") && (R.body.eliminate("app"), cb.pop(), !1 !== w("animation") ? b.animate({
                                    translateX: null,
                                    origin: ["left", "top"],
                                    duration: .8
                                }) : b.setStyle("transform", null))
                            }
                        }

                        function Ga(a) {
                            var b =
                                a.payload.state, c = v && v.MAF, d = v && v.widget;
                            if (d && c && (e && e.src || b === g.STOP || b === g.EOF || b === g.ERROR) && Sa !== b && (b !== g.STOP || Sa !== g.INIT) && (b !== g.BUFFERING || e.paused) && (b !== g.INFOLOADED || Sa !== g.PLAY && Sa !== g.PAUSE)) {
                                if ((m === h || h === t) && !S.call(da, "onStateChange", {
                                        newState: b,
                                        previousState: Sa
                                    }))return a.stop();
                                if (!a.defaultPrevented && !a.propagationStopped) {
                                    if (!(-1 === L.indexOf(b) && Sa === b || m !== h && m === u && h !== t))switch (b) {
                                        case g.BUFFERING:
                                            if (J())try {
                                                c.utility.WaitIndicator.on()
                                            } catch (f) {
                                            }
                                            break;
                                        case g.INFOLOADED:
                                            if (J())try {
                                                c.utility.WaitIndicator.off()
                                            } catch (k) {
                                            }
                                            Ta &&
                                            Ta.autoStart && S.call(da, "onPlayPlaylistEntry") && Q.delay(0);
                                            if (Sa === g.PLAY || Sa === g.PAUSE)return;
                                            break;
                                        case g.REWIND:
                                        case g.FORWARD:
                                        case g.PLAY:
                                            if (!0 !== d.audio && !ta.activevideo)try {
                                                Ha()
                                            } catch (l) {
                                            }
                                            break;
                                        case g.STOP:
                                            if (J())try {
                                                c.utility.WaitIndicator.off()
                                            } catch (B) {
                                            }
                                            if (Ua && h === m && Ta)return Ua = !1, Xa();
                                            if (!0 !== d.audio)try {
                                                ta.activevideo ? ra() : xa()
                                            } catch (q) {
                                            }
                                            break;
                                        case g.ERROR:
                                            if (n && u === h) {
                                                if (J())try {
                                                    c.utility.WaitIndicator.off()
                                                } catch (r) {
                                                }
                                                if (!0 !== d.audio)try {
                                                    ta.activevideo ? ra() : xa()
                                                } catch (A) {
                                                }
                                                if (!1 === w("playerror"))try {
                                                    ea()
                                                } catch (y) {
                                                } else a =
                                                    d.getLocalizedString, (new c.dialogs.Alert({
                                                    title: a("ERROR"),
                                                    message: a("PLAYBACK_ERROR"),
                                                    buttons: [{
                                                        label: a("CLOSE"), callback: function () {
                                                            try {
                                                                ea()
                                                            } catch (a) {
                                                            }
                                                        }
                                                    }]
                                                })).show()
                                            }
                                            break;
                                        case g.EOF:
                                            m === h && u !== t && Ta ? ua.delay(0) : (m === h && u !== t && !Ta || u === t && !Ta) && oa.delay(0)
                                    }
                                    p = Sa = b || 0
                                }
                            }
                        }

                        function Ea(a) {
                            a = a.payload.percentage || 0;
                            if ((m !== h && h !== t || S.call(da, "onBufferChanged", {
                                    bufferPercentage: a,
                                    playerStatus: Sa
                                })) && m === h && v && 0 < a && J())if (100 > a)v.MAF.utility.WaitIndicator.on(); else v.MAF.utility.WaitIndicator.off()
                        }

                        function Ka() {
                            return P !==
                            r && 0 !== P ? P : P = e && e.duration || n && n.asset && n.asset.duration || 0
                        }

                        function La(a) {
                            if (m === h || h === t)I = e.currentTime, S.call(da, "onTimeIndexChanged", {
                                timeIndex: I,
                                duration: Ka()
                            })
                        }

                        function Ia(a) {
                            if (ta.activevideo && !0 !== v.widget.audio && n !== r)return ea();
                            T() && kb("app") && (xa(), a.preventDefault(), a.stopPropagation())
                        }

                        function Ma(a) {
                            h !== t && (Ia(a), v.widget.close())
                        }

                        function Na(a) {
                            a = a.payload.key;
                            if ("playpause" === a)if (Sa === g.PAUSE || Sa === g.REWIND || Sa === g.FORWARD)a = "play"; else if (Sa === g.PLAY)a = "pause"; else return;
                            if (S.call(da,
                                    "onRemoteKeyPress"))switch (a) {
                                case "pause":
                                    S.call(da, "onPauseRemoteKeyPress") && H();
                                    break;
                                case "stop":
                                    S.call(da, "onStopRemoteKeyPress") && ea();
                                    break;
                                case "play":
                                    S.call(da, "onPlayRemoteKeyPress") && Q();
                                    break;
                                case "rewind":
                                    S.call(da, "onRewindRemoteKeyPress") && fa();
                                    break;
                                case "forward":
                                    S.call(da, "onFastForwardRemoteKeyPress") && X()
                            }
                        }

                        function Qa(a) {
                            !n || m !== h && m === u || C || (Ua = !1, n = r, Ga({payload: {state: g.STOP}}), m = r, W());
                            S.call(da, "onChannelChange");
                            Wa.handleChannelChange();
                            !1 !== w("stats") && !0 === w("profiling") &&
                            (Ra.send(u, "channel", {duration: mb(D)}), D = ka.now());
                            if (!ja.resuming && (ja.exited || ja.exiting))return U("CHANNELTUNE HIDDEN STATE");
                            e && e.channel && -1 === (w("blocked") || []).indexOf(e.channel.number) ? (U("CHANNELTUNE NON BLOCKED"), e.show(), e.muted && (e.muted = !1)) : e && (U("CHANNELTUNE BLOCKED"), e.hide(), e.muted = !0)
                        }

                        function ld() {
                            v && (v.widget.removeEventListener("home", Ma), v.widget.removeEventListener("back", Ia), Na.unsubscribeFrom(v.MAF.application, "onPlayControlKeyPress"), v = r);
                            Qa.unsubscribeFrom(e, "onChannelChange");
                            Ga.unsubscribeFrom(e, "onStateChange");
                            Ea.unsubscribeFrom(e, "onBufferChange");
                            La.unsubscribeFrom(e, "onTimeChange");
                            Sa = Ta = r;
                            yc = {};
                            Pa = {}
                        }

                        function Oc(a) {
                            Na.subscribeTo(v.MAF.application, "onPlayControlKeyPress");
                            Qa.subscribeTo(e, "onChannelChange");
                            Ga.subscribeTo(e, "onStateChange", !1, !0);
                            Ea.subscribeTo(e, "onBufferChange");
                            La.subscribeTo(e, "onTimeChange");
                            Sa = m === h && Y(p) ? p : g.INIT
                        }

                        var yc = {}, sa = {}, Ja = {}, jb = {}, Va = {}, Pa = {}, da = this, Ua = !1, Sa, Ta;
                        v.widget.addEventListener("home", Ma, !1);
                        v.widget.addEventListener("back",
                            Ia, !1);
                        d.forEach(function (b) {
                            a(this, b, function () {
                                return Pa[b] ? Pa[b] || [] : []
                            });
                            N(this, b, function (a) {
                                a instanceof V ? Pa[b] = a : gc("MAF.mediaplayer.subscribe: Invalid setting of subscribers for eventType: " + b)
                            })
                        }, yc);
                        a(sa, "play", function () {
                            return Q
                        });
                        a(sa, "pause", function () {
                            return H
                        });
                        a(sa, "stop", function () {
                            return ea
                        });
                        a(sa, "rewind", function () {
                            return fa
                        });
                        a(sa, "forward", function () {
                            return X
                        });
                        a(sa, "seek", function () {
                            return Z
                        });
                        a(sa, "mute", function () {
                            return la
                        });
                        a(sa, "hide", function () {
                            return ca
                        });
                        a(sa, "show",
                            function () {
                                return ma
                            });
                        a(jb, "get", function () {
                            return hd
                        });
                        a(jb, "set", function () {
                            return id
                        });
                        a(jb, "start", function () {
                            return Xa
                        });
                        a(jb, "loadEntry", function () {
                            return Vb
                        });
                        a(jb, "previousEntry", function () {
                            return kd
                        });
                        a(jb, "nextEntry", function () {
                            return ua
                        });
                        a(jb, "currentEntry", function () {
                            return n
                        });
                        a(jb, "currentIndex", function () {
                            return wc()
                        });
                        a(jb, "currentSpeed", function () {
                            return e.rate
                        });
                        a(jb, "length", function () {
                            return Ta && Ta.entries ? Ta.entries.length : 0
                        });
                        a(Va, "states", function () {
                            return g
                        });
                        a(Ja, "currentPlayerState",
                            function () {
                                return m === h && e ? Sa : null
                            });
                        a(Ja, "currentTimeIndex", function () {
                            return m === h && e ? I || 0 : 0
                        });
                        a(Ja, "currentMediaDuration", function () {
                            return m === h ? Ka() || 0 : 0
                        });
                        a(Ja, "currentSpeed", function () {
                            return e.rate
                        });
                        a(da, "subscribers", function () {
                            return yc
                        });
                        a(da, "control", function () {
                            return sa
                        });
                        a(da, "player", function () {
                            return Ja
                        });
                        a(da, "playlist", function () {
                            return jb
                        });
                        a(da, "constants", function () {
                            return Va
                        });
                        a(da, "init", function () {
                            return Oc
                        });
                        a(da, "initialize", function () {
                            return Oc
                        });
                        a(da, "reset", function () {
                            return ld
                        });
                        a(da, "setViewportBounds", function () {
                            return M
                        });
                        a(da, "getViewportBounds", function () {
                            return E
                        });
                        a(da, "currentAsset", function () {
                            if (e.src || n) {
                                if (n && n.asset)return n.asset;
                                if (m && O[m]) {
                                    var a = O[m], b = new y(a.name);
                                    b.widget = a || !1;
                                    return b
                                }
                            }
                            return za() || {}
                        });
                        a(da, "getCurrentChannel", function () {
                            return Da
                        });
                        a(da, "getCurrentProgram", function () {
                            return za
                        });
                        a(da, "setChannelByNumber", function () {
                            return na
                        });
                        a(da, "isSidebarHidden", function () {
                            return kb("app") === h
                        });
                        a(da, "isTVActive", function () {
                            return n === r
                        });
                        a(da, "isPlaylistEntryActive",
                            function () {
                                return -1 < q.indexOf(Sa) && n
                            })
                    }

                    var d = "onRemoteKeyPress onPauseRemoteKeyPress onStopRemoteKeyPress onPlayRemoteKeyPress onRewindRemoteKeyPress onFastForwardRemoteKeyPress onChannelChange onStateChange onBufferChanged onPlaybackBuffering onSetScreensaverMode onTimeIndexChanged onViewportBoundsChanged onSetPlaybackSpeed onControlPlay onControlPause onControlStop onControlRewind onControlFastForward onControlSeek onControlStreamSwitch onConvertToSpeed onPlayPlaylistEntry onProcessPlaylistEntry onPlaylistChange onStartPlaylist onLoadPlaylistEntry onPlaylistRepeat onPlaylistEnd onLoadPreviousPlaylistEntry onLoadNextPlaylistEntry".split(" ");
                    b.prototype.toArray = function () {
                        return [this.x, this.y, this.width, this.height]
                    };
                    var e = ja.players[0], f = qa.profile.household, g = e.constructor.state, h = e.bounds, l = new b(h[0], h[1], h[2], h[3]), m, n, p, q = [g.PLAY, g.PAUSE, g.FORWARD, g.REWIND, g.BUFFERING, g.INFOLOADED], L = [g.FORWARD, g.REWIND], z = 0, D = ka.now(), C, I = 0, P;
                    c.prototype = {constructor: c};
                    return c
                }(), cb = function () {
                    function b(a) {
                        Z.href = Z.href.replace(bc() || "#", a)
                    }

                    function c(a, b) {
                        0 !== z.length && n ? (z.pop() && Y(y[a]) && (1 < y[a] ? y[a]-- : delete y[a]), I = !1, C || I ? C = !1 : (C = !0, u !==
                        t && 1 < Za.length && 1 < Za.length - p && Za.back())) : delete y[a]
                    }

                    function d(a, b) {
                        if (0 > a && n) {
                            b && delete y[b];
                            var c = !0 === C;
                            C = !0;
                            I = !1;
                            z.splice(a);
                            c || u === t || (c = Za.length - p, 0 < c - x.abs(a) && 0 < Za.length - x.abs(a) ? Za.go(a) : 0 < c && 1 < Za.length && Za.go(-1 * c))
                        }
                    }

                    function e(a, c) {
                        if (n) {
                            var d;
                            d = a ? "#/" + a + (c ? "/" + c : "") : r;
                            var f = z.length - 1, g = y[a];
                            -1 < f && z.lastIndexOf(d) === f || g && z.lastIndexOf(d + "/" + g) === f ? (g = y[a] || 0, y[a] = ++g, d += "/" + y[a]) : delete y[a];
                            C = !1;
                            I = !0;
                            z.push(d);
                            b.delay(0, null, [d])
                        }
                    }

                    function f() {
                        var a = ["webkit", "moz", "ms", "o"];
                        if ("hidden"in
                            R)return "hidden";
                        for (var b = 0; b < a.length; b++)if (a[b] + "Hidden"in R)return a[b] + "Hidden";
                        return null
                    }

                    function g() {
                        var a = f();
                        return a ? R[a] : !1
                    }

                    function h() {
                        if (!0 !== w("qa") && (Ib("NOTIFICATION: " + Wa.active), !Wa.active)) {
                            var a = g();
                            a && u !== t && (Ib("FORCE CLOSE: " + u), P.close(u));
                            var b = ja.players[0];
                            a && b && (b.src && (b.src = "", b.backToLive()), b.show(), b.muted && (b.muted = !1));
                            u === t && (a ? P.exiting || P.exited || (U("visibilitychange: exit"), P.exit(!1, !0)) : (U("visibilitychange: resume"), function () {
                                P.resume();
                                b && S.call(b, "onChannelChange")
                            }.delay(100)))
                        }
                    }

                    function k(a) {
                        var b;
                        -1 !== a.newURL.indexOf("#") && (b = "#" + a.newURL.split("#")[1]);
                        b || (b = bc());
                        if (0 !== b.indexOf(q) || u !== t && u !== r) {
                            T && (T = r);
                            if (0 === b.indexOf("#/")) {
                                var c = z.length, d;
                                d = "#" + a.oldURL.split("#")[1];
                                if (!I && D && b === q)C = I = !1, U("hash exit: " + Wa.active), Wa.active && Wa.reset(); else if (!C && !I && 0 < c && z.indexOf(d) === c - 1)I = !1, C = !0, (R.activeElement || m).dispatchEvent(Ia("back", r, !0, !0)); else if (I || C)C = I = !1
                            } else {
                                b = b.substr(1).split("?");
                                var e = b[0].split(":");
                                u !== t && P.close(u);
                                if (1 < e.length)switch (U("hash: " +
                                    e[1] + ", type: " + e[0]), ec = e[0] + ":" + e[1], e[0]) {
                                    case "app":
                                        c = e[1], d = w("alias"), c && d && d[c] && (c = d[c]), c && c !== t && O[c] && (D = I = !0, P.fire(t, "onApplicationStartupRequest", {
                                            id: c,
                                            params: 2 === b.length ? qb(b[1]) : null
                                        }))
                                } else {
                                    I = !0;
                                    var g = D = !1;
                                    Wa.active && (U("hash: " + e[0]), g = Wa.c2a() || !1, !0 === g && (D = !0));
                                    U("exitToMenu: " + D);
                                    P.fire(t, "onHashChange", e[0]);
                                    ec = e[0];
                                    (function () {
                                        L && P.exited && !P.resuming && (U("hash: resume"), Wa.active && "resume" != Wa.state || P.resume(e[0]));
                                        !0 !== g && (D = !1)
                                    }).delay(800)
                                }
                                n && 0 < Za.length && Za.back()
                            }
                            a.preventDefault();
                            a.stopPropagation()
                        }
                    }

                    var l = {}, n = vb && !1 !== vb.history, p = Za.length || 0, q = "#/" + t, y = {}, z = [], L = !1, D = !1, C = !1, I = !0, T;
                    Ka[0] !== q && ("#boot" === Ka[0] ? L = !0 : Ka[0] && 0 === Ka[0].indexOf("#app:") && (T = Ka[0]), -1 === Z.href.indexOf(q) && (Z.href = -1 === Z.href.indexOf("#") ? Z.href + q : Z.href.replace(bc() || "#", q)));
                    L || ja.resume(Ka[0], !0);
                    ec = Ka[0];
                    var p = x.max(Za.length - p, 1), M = f(), Q;
                    M && (Q = M.replace(/[H|h]idden/, "") + "visibilitychange", R.addEventListener(Q, h, !1));
                    m.addEventListener("hashchange", k, !1);
                    m.addEventListener("unload", function () {
                        Q &&
                        R.removeEventListener(Q, h);
                        z = l = null;
                        m.removeEventListener("hashchange", k)
                    });
                    a(l, "pop", function () {
                        return c
                    });
                    a(l, "go", function () {
                        return d
                    });
                    a(l, "push", function () {
                        return e
                    });
                    a(l, "autostart", function () {
                        return T
                    });
                    a(l, "isBoot", function () {
                        return L
                    });
                    a(l, "hidden", function () {
                        return g()
                    });
                    a(l, "exitToMenu", function () {
                        return D
                    });
                    N(l, "exitToMenu", function (a) {
                        D = a
                    });
                    return l
                }();
            n.prototype = {constructor: n};
            H = new n;
            var Xb = !1, Ya = qa.profile.household, va = function (a) {
                Ya || (Ya = qa.profile.household);
                var b = Q[u], c = Q[t];
                if (!c || !c.widget.handleHostEvent || c.widget.handleHostEvent.apply(b, arguments)) {
                    var d = a.getData() || {}, c = a.getResult(), e;
                    switch (a.subject) {
                        case "showDialog":
                            Xb = !0;
                            break;
                        case "hideDialog":
                            Xb = !1;
                            break;
                        case "onAppInit":
                            a.error || k(a.id, "getSnippetConfs", null, va);
                            break;
                        case "onAppFin":
                            a.error || ((e = b.currentViewId) && k(a.id, "onUnselect", {id: e}, va), (e = (d = sa(a.id + "-@snippets")) && d.firstChild.owner.config.viewId) && k(a.id, "onShowView", {id: e}, va), c.forEach(function (b) {
                                k(a.id, "onUnloadView", {id: b}, va)
                            }), d && d.parentNode ===
                            b.document.body ? d.detach().inject(b.document.body.detach().empty()) : b.document.body.detach().empty(), !0 !== O[a.id].background && k(a.id, "onAppFinComplete", {}, va), u && t && a.id !== t && Q[u] && (u = t, !0 !== cb.exitToMenu ? k(t, "onShowView", {id: Q[u] && Q[u].currentViewId}, va) : (cb.exitToMenu = !1, ja.exit())), a.id !== t ? Ra.send(a.id, "close", {
                                name: P && P.getMetadataByKey(a.id, "name"),
                                category: P && P.getCategory() || "",
                                duration: mb(hb),
                                session: Ya ? Aa(Ya + hb) : null,
                                ui: Ya ? Aa(Ya + ob) : null
                            }) : a.id === t && Ra.send(a.id, "close", {
                                duration: mb(tb),
                                session: Ya ? Aa(Ya + tb) : null
                            }), hb = 0);
                            break;
                        case "onDialogCancelled":
                        case "onDialogDone":
                            Xb = !1;
                            (b = d && d.key) && Kb[b] && (Kb[b](d), Kb[b] = null, delete Kb[b]);
                            break;
                        case "onLoadView":
                            !a.error && d.id && ((e = b.currentViewId) && e !== d.id && k(a.id, "onUnselect", {id: e}, va), k(a.id, "onShowView", {id: d.id}, va));
                            break;
                        case "onShowView":
                            !a.error && d.id && k(a.id, "onSelect", {id: d.id}, va);
                            break;
                        case "getSnippetConfs":
                            !a.error && 0 < c.length && c.forEach(function (b) {
                                k(a.id, "onLoadView", {id: b.id}, va)
                            });
                            break;
                        case "onUnselect":
                            !a.error && d.id &&
                            k(a.id, "onHideView", {id: d.id}, va);
                            break;
                        case "onActivateAppButton":
                            switch (d.type) {
                                case "switch-profile":
                                    Xb = !0
                            }
                            break;
                        case "onActivateSnippet":
                            !a.error && c.id && (a.id !== t && 0 === hb ? (hb = ka.now(), Ra.send(a.id, "open", {
                                name: P && P.getMetadataByKey(a.id, "name"),
                                category: P && P.getCategory() || "",
                                session: Ya ? Aa(Ya + hb) : null,
                                ui: Ya ? Aa(Ya + ob) : null
                            })) : a.id !== t || 0 === tb || isNaN(tb) || Ra.send(a.id, "open", {
                                loadtime: mb(tb),
                                session: Ya ? Aa(Ya + tb) : null
                            }), b.document.body.inject(Bb).frozen = !1, k(a.id, "onLoadView", d && d.params ? {
                                id: c.id,
                                data: {params: d.params}
                            } : {id: c.id}, va))
                    }
                }
            };
            h.prototype = {constructor: h};
            var Pb = function () {
                function b(a) {
                    U.call(this, a, function () {
                        !0 !== O[a].background && Q[a] && delete Q[a]
                    })
                }

                var e = "open getComputedStyle md5 confirm prompt sha1 JSON XMLDOM unlink clone typeOf emptyFn random location navigator Browser YouTube FontAwesome CSSMatrix Animator HashMap Class Event Library innerWidth outerWidth innerHeight outerHeight screen currentProfileData XMLHttpRequest DateFormat isArray isBoolean isDate isFunction isNumber isString isRegExp isEmpty Timer Element Window IFrame View Dialog Frame Text Image List Item Canvas QRCode WebSocket requestAnimationFrame cancelAnimationFrame".split(" ").concat(H.defines),
                    g = "onActivateBackButton onActivateHomeButton onActivateFavButton onActivateSettingsButton onActivateSnippet onActivateApp onLoadView onUnloadView onShowView onHideView onSelectView onUnselectView getSnippetConfs onDialogCancelled onDialogDone onApplicationStartup onApplicationShutdown onLoadProfile onUnloadProfile onWidgetKeyPress onPlayControlKeyPress onColorKeyPress onViewChangeInitiated".split(" "), f = "onAppInit onAppFin onDialogCancelled onDialogDone onHideView onLoadProfile onLoadView onShowView onUnloadProfile onUnloadView getSnippetConfs onSelect onUnselect onDispatchedChildEvent onActivateAppButton onActivateSnippet".split(" "),
                    n = "changeProfile loadView hideDialog showDialog setSnippetConfs addSnippetConfs deleteSnippetConfs exitToDock exit setFavAction setIcons setWaitIndicator setFullscreenVideoMode toggleViewport launchApp".split(" "), p = ["focus", "blur", "addEventListener", "removeEventListener", "dispatchEvent"], x = "open close location addEventListener removeEventListener dispatchEvent".split(" "), L = ["window", "parent", "top", "self"], D = "messages mediaplayer HostEventManager Request Theme application".split(" "), C = {
                        SNIPPET: "snippet",
                        ICON: "icon", SIDEBAR: "sidebar", FULLSCREEN: "fullscreen"
                    }, I = q.keys(C).filter(function (a) {
                        return "snippet" === C[a] || "icon" === C[a]
                    }), T = ["red", "blue", "yellow", "green"], fa = "back play stop pause rewind forward playpause".split(" "), U = function (b, B) {
                        function Q(b) {
                            a(this, "rootPath", function () {
                                return b
                            });
                            this.lastModified = function (a) {
                                var c = new $a;
                                c.open("HEAD", b + a, !1);
                                c.send();
                                if (4 === c.readyState && 200 === c.status)try {
                                    return ka(request.getResponseHeader("last-modified") || ka.now()).getTime()
                                } catch (d) {
                                }
                                return ka.now()
                            };
                            this.readFile = function (a, c) {
                                c = c || !1;
                                var d = new $a;
                                d.open("GET", b + a + "", !1);
                                d.send();
                                return 4 === d.readyState && 200 === d.status ? d.responseXML ? d.responseXML : c ? d.responseText.replace(/\n/g, "<br/>") : d.responseText : ""
                            }
                        }

                        function U(a) {
                            var b = na.rootPath;
                            a && a.url && !Fb.test(a.url) && 0 !== a.url.indexOf(b) && (a.url = b + a.url);
                            return new Na(a)
                        }

                        function Y(a, c, d, e) {
                            a = new y(a || "", c || "", d, e);
                            a.widget = O[b];
                            return a
                        }

                        function Z(a) {
                            return new xb.Channel(Aa(b + "|" + (a || ka.now())))
                        }

                        function la(a) {
                            return new xb.Channel(Aa(b + "|" + (a ||
                                ka.now()) + "|" + (J.profile.household || "")))
                        }

                        function F() {
                            return W && W.getLocalizedString.apply(W, arguments)
                        }

                        function G() {
                            return W && W.getElementById.apply(W, arguments)
                        }

                        function A(a) {
                            var c = na.rootPath + a, d = new $a;
                            d.open("GET", c + "", !1);
                            d.send();
                            var c = "", e = d.responseText;
                            4 === d.readyState && 200 === d.status && e ? c = ("\n" + e.replace(Tb, "")).replace(rc, function (a, b) {
                                return A(b)
                            }) : fc(b + ": request issue " + a);
                            return c
                        }

                        function E(c, d) {
                            this.result = "";
                            a(this, "id", function () {
                                return b
                            });
                            a(this, "subject", function () {
                                return c
                            });
                            a(this, "data", function () {
                                return d
                            })
                        }

                        function ma(a) {
                            if (!Ea && W) {
                                Ea = !0;
                                var b = M(W.identifier);
                                if (b !== t) {
                                    try {
                                        this.profile.destroy()
                                    } catch (c) {
                                    }
                                    try {
                                        this.Facebook.destroy()
                                    } catch (d) {
                                    }
                                    try {
                                        this.Twitter.destroy()
                                    } catch (e) {
                                    }
                                }
                                !0 === W.fullscreen && ja.players[0].show();
                                ca && (ca.frozen = !0);
                                W.close(a);
                                if (!W || !0 !== W.background) {
                                    sa && sa.destroy();
                                    if (this.MAF) {
                                        try {
                                            this.MAF.mediaplayer.reset()
                                        } catch (g) {
                                        }
                                        try {
                                            this.MAF.messages.reset(!0)
                                        } catch (f) {
                                        }
                                        this.MAF.messages = this.MAF.mediaplayer = r
                                    }
                                    Da = za = ia = sa = W = xa = na = Ba = ea = wa = ra = r;
                                    if ("all" ===
                                        w("destroy"))for (var h in this)delete this[h];
                                    if (ca) {
                                        try {
                                            ca.destroy()
                                        } catch (k) {
                                        }
                                        ca = r
                                    }
                                    try {
                                        qc.call(this)
                                    } catch (l) {
                                    }
                                    try {
                                        B && B.call(null, b)
                                    } catch (m) {
                                    }
                                }
                                Ea = !1
                            }
                        }

                        ka.now();
                        var J = this, ca = Bc(b), ia = {}, W = new h(b, J, ca), ea = {messages: new l};
                        b === t && (a(J, "boot", function () {
                            return cb.isBoot
                        }), a(J, "hidden", function () {
                            return cb.hidden
                        }));
                        e.forEach(function (b) {
                            a(this, b, function () {
                                return H[b]
                            })
                        }, J);
                        Q.prototype = {constructor: Q};
                        var na = new Q(d(b));
                        a(J, "filesystem", function () {
                            return na
                        });
                        b === t && a(J, "ProfileManager", function () {
                            return qa
                        });
                        a(ea, "Request", function () {
                            return U
                        });
                        a(J, "Request", function () {
                            return U
                        });
                        var sa = new Ab(b, ca);
                        a(ea, "Theme", function () {
                            return sa
                        });
                        a(J, "Theme", function () {
                            return sa
                        });
                        var wa = H.GenericStorage, Da = new wa("ac", !1, b), za = new wa("ad", !0, b);
                        a(J, "currentAppConfig", function () {
                            return Da
                        });
                        a(J, "currentAppData", function () {
                            return za
                        });
                        q.forEach(H.MAF, function (b, c) {
                            -1 === D.indexOf(b) && a(ea, b, function () {
                                return c
                            })
                        });
                        a(J, "LGI", function () {
                            return m.LGI
                        });
                        (function (b) {
                            function c(a, d) {
                                Ra.send(b, a, d || {})
                            }

                            a(ea.Stats, "event",
                                function () {
                                    return c
                                })
                        })(b);
                        var xa = {};
                        a(xa, "Asset", function () {
                            return Y
                        });
                        ["Playlist", "PlaylistEntry"].forEach(function (b) {
                            a(xa, b, function () {
                                return H.MAF.media[b]
                            })
                        });
                        a(ea, "media", function () {
                            return xa
                        });
                        b === t ? (a(J, "profile", function () {
                            return H.profile
                        }), a(J, "Facebook", function () {
                            return H.Facebook
                        }), a(J, "Twitter", function () {
                            return H.Twitter
                        })) : (function () {
                            function c() {
                                d.forEach(function (b) {
                                    a(this, b, function () {
                                        return H.profile[b]
                                    })
                                }, this);
                                d.length = 0;
                                d = null
                            }

                            var d = "id name ageRating household operator packages country countryCode language languageCode city ip latlon mac locale hasPIN locked".split(" "),
                                e = {country: "countryCode", language: "languageCode"}, g;
                            c.prototype.destroy = function () {
                                d = e = g = null
                            };
                            c.prototype.purchase = function (a, c) {
                                u === b ? H.profile.purchase(a, c) : c("app not active")
                            };
                            a(c.prototype, "uid", function () {
                                return !0 === O[b].profile ? H.profile.uid : r
                            });
                            q.keys(e).forEach(function (a) {
                                var b = "get" + a.capitalize(), d = e[a];
                                c.prototype[b] = function () {
                                    return this[d]
                                }
                            });
                            e = null;
                            g = new c;
                            a(J, "profile", function () {
                                return g
                            })
                        }(), function (b) {
                            function c(a) {
                                g.fire(a.type)
                            }

                            function d() {
                                this.subscribers = {};
                                c.subscribeTo(e,
                                    ["onConnected", "onDisconnected", "onUnpairedProfile"]);
                                ["api", "userId", "getImageById", "logout"].forEach(function (b) {
                                    a(this, b, function () {
                                        return e[b]
                                    })
                                }, this)
                            }

                            var e = H.Facebook, g;
                            d.prototype.reset = function () {
                                this.subscribers = {}
                            };
                            d.prototype.fire = S;
                            d.prototype.destroy = function () {
                                c.unsubscribeFrom(e, ["onConnected", "onDisconnected", "onUnpairedProfile"]);
                                g = null
                            };
                            g = new d;
                            a(J, "Facebook", function () {
                                return g
                            })
                        }(b), function (b) {
                            function c(a) {
                                g.fire(a.type)
                            }

                            function d() {
                                this.subscribers = {};
                                c.subscribeTo(e, ["onConnected",
                                    "onDisconnected", "onUnpairedProfile"]);
                                ["api", "userId", "userInfo", "getImageById", "logout"].forEach(function (b) {
                                    a(this, b, function () {
                                        return e[b]
                                    })
                                }, this)
                            }

                            var e = H.Twitter, g;
                            d.prototype.reset = function () {
                                this.subscribers = {}
                            };
                            d.prototype.fire = S;
                            d.prototype.destroy = function () {
                                c.unsubscribeFrom(e, ["onConnected", "onDisconnected", "onUnpairedProfile"]);
                                g = null
                            };
                            g = new d;
                            a(J, "Twitter", function () {
                                return g
                            })
                        }(b));
                        a(ea, "Room", function () {
                            return Z
                        });
                        a(ea, "PrivateRoom", function () {
                            return la
                        });
                        a(J, "MAF", function () {
                            return ea
                        });
                        a(J, "localization", function () {
                            return oa
                        });
                        a(J, "widget", function () {
                            return W
                        });
                        a(J, "$_", function () {
                            return F
                        });
                        a(J, "$", function () {
                            return G
                        });
                        p.forEach(function (b) {
                            a(this, b, function () {
                                return W && W[b]
                            })
                        }, J);
                        J.console = {};
                        ["log", "warn", "error"].forEach(function (b) {
                            a(this.console, b, function () {
                                return X
                            });
                            a(this, b, function () {
                                return this.console[b]
                            })
                        }, J);
                        a(J, "alert", function () {
                            return this.log
                        });
                        a(ia, "getElementById", function () {
                            return W.getElementById
                        });
                        a(ia, "body", function () {
                            return ca
                        });
                        a(ia, "activeElement",
                            function () {
                                return R.activeElement !== Ha ? R.activeElement : r
                            });
                        x.forEach(function (b) {
                            a(this, b, function () {
                                return J[b]
                            })
                        }, ia);
                        a(J, "document", function () {
                            return ia
                        });
                        a(J, "include", function () {
                            return function (a) {
                                try {
                                    return ub("with(this){" + A(a) + "}").call(this), !0
                                } catch (b) {
                                    return !1
                                }
                            }
                        });
                        E.prototype = {
                            constructor: E, getData: function () {
                                try {
                                    return this.data && ga.parse(this.data) || r
                                } catch (a) {
                                }
                            }, getResult: function () {
                                try {
                                    return this.result && ga.parse(this.result) || r
                                } catch (a) {
                                }
                            }
                        };
                        a(J, "HostEvent", function () {
                            return E
                        });
                        var ra =
                            function () {
                                function b() {
                                }

                                var d = {}, e = {};
                                W.onHostEvent = function (a) {
                                    if (-1 !== f.indexOf(a.subject) && d[a.subject] && d[a.subject].length) {
                                        var b = a.data && ga.parse(a.data), e = new c(a.subject, b, null, a);
                                        d[a.subject].forEach(function (a) {
                                            a(e)
                                        })
                                    }
                                };
                                W.onDispatchedChildEvent = function (a) {
                                    if (-1 !== n.indexOf(a.subject) && d.onDispatchedChildEvent && d.onDispatchedChildEvent.length) {
                                        var b = a.data && ga.parse(a.data), e = new c("onDispatchedChildEvent", b, null, a);
                                        d.onDispatchedChildEvent.forEach(function (a) {
                                            a(e)
                                        })
                                    }
                                };
                                b.prototype = {
                                    constructor: b,
                                    send: function (a, b) {
                                        ba(b) && (b = {});
                                        if (-1 !== n.indexOf(a))return W.dispatchChildEvent(new E(a, ga.stringify(b)));
                                        "simulateFakeLoadView" === a && (W.onHostEvent(new E("onShowView", ga.stringify(b))), W.onHostEvent(new E("onSelect", ga.stringify(b))));
                                        return !0
                                    }, addSubscribeableEvent: function (b) {
                                        a(e, b, function () {
                                            return d[b] ? d[b] : []
                                        });
                                        N(e, b, function (a) {
                                            a instanceof V && (d[b] = a)
                                        })
                                    }, addFireableEvent: function (a) {
                                        n.push(a)
                                    }
                                };
                                var g = new b;
                                g.subscribers = e;
                                f.forEach(g.addSubscribeableEvent);
                                return g
                            }();
                        a(ea, "HostEventManager",
                            function () {
                                return ra
                            });
                        var Ba = function (b) {
                            function d() {
                                var a = S.length;
                                0 < a && b !== t ? cb.go(-a, b) : 1 < a && b === t && cb.go(-(a - 1), b);
                                S.length = 0;
                                S = []
                            }

                            function e(a) {
                                a && (U = O = pa = M = "", F = {}, H = {}, ia = X = Z = Y = null, ba = !1, da = {}, la = !1);
                                d()
                            }

                            function f(a) {
                                var b = da[a.type];
                                if (!b || !b.length)return !0;
                                for (var c = !1, d = 0; d < b.length && (!b[d] || (b[d](a), c = c || a.defaultPrevented, !a.propagationStopped)); d++);
                                return !c
                            }

                            function h(a) {
                                var b = a && a.viewClass, c = b && b.prototype;
                                if (b && c && a.id)return {id: a.id, type: C[c.viewType]};
                                J.warn("Invalid config!")
                            }

                            function l() {
                                return M || pa
                            }

                            function n(a, b, d, e, g) {
                                d = d || "forward";
                                var k = l();
                                f(new c("onViewChangeInitiated", {
                                    currentId: k,
                                    destinationId: a,
                                    direction: d
                                })) && (Z = b, Y = e, X = a, ia = d, ba = g, b = "loadView", a === k && (b = "simulateFakeLoadView"), a in H && H[a].viewClass && H[a].viewClass.inheritsFrom(ea.system.FullscreenView) && ra.send("setFullscreenVideoMode", H[a].viewClass.prototype.config.showPassthroughVideo ? "passthrough" : "default"), ra.send(b, h(H[a])))
                            }

                            function B() {
                                if (U !== l()) {
                                    if (!U || "" === U)throw Qa("We don't have a settings view to switch to. This exception is to indicate something bad happened");
                                    p();
                                    n(U, null, "forward")
                                }
                            }

                            function p() {
                                var a = l();
                                a && a in F && -1 === I.indexOf(F[a].viewType) && S.push({id: a, persist: F[a].persist})
                            }

                            function v(a) {
                                d();
                                n(O, null, "forward", a, !0)
                            }

                            function y(a, b) {
                                var c = S.length;
                                1 < S.length && 1 < b && b <= c && (b--, S.splice(c - b, b));
                                (c = S.pop()) ? n(c.id, c.persist, "back", a) : W.identifier !== t ? ra.send("exit") : m.dispatchEvent(Ia("blur"))
                            }

                            function x(a, b, e, f) {
                                if (a instanceof c && H[b]) {
                                    var g = h(H[b]);
                                    d();
                                    Z = e;
                                    Y = null;
                                    X = b;
                                    ia = "forward";
                                    ba = f || ba || !1;
                                    a.HostEvent.result = ga.stringify(g);
                                    return g
                                }
                                J.warn("Invalid call to setHostResultToViewId")
                            }

                            function L() {
                                var a = [];
                                q.forEach(H, function (b, c) {
                                    c && c.viewClass && c.viewClass.prototype && -1 !== I.indexOf(c.viewClass.prototype.viewType) && a.push(h(c))
                                });
                                return a
                            }

                            function A(a) {
                                var b, c, d, e = !1;
                                X == a && (X = null, b = Y || {}, c = Z || {}, d = ia, e = ba);
                                if (F[a] && F[a]instanceof ea.system.BaseView)return F[a].backParams = b || F[a].backParams || {}, F[a].persist = c || F[a].persist || {}, F[a].historyDirection = d || F[a].historyDirection || ia || "forward", F[a].historyNoSave = e || F[a].historyNoSave || !1, F[a];
                                var g = H[a], f = Q(a) || La("li").addClass("item");
                                if (g && g.viewClass.inheritsFrom(ea.system.BaseView))return f && (F[a] = new g.viewClass({
                                    viewId: a,
                                    data: ua(g.data),
                                    element: f,
                                    backParams: b || {},
                                    persistParams: c || {}
                                }), F[a].historyDirection = d || ia || "forward", F[a].historyNoSave = e || ba || !1), F[a]
                            }

                            function D(a) {
                                f(new c("onWidgetKeyPress", {
                                    keyCode: a.keyCode,
                                    key: a.key,
                                    eventPhase: a.eventPhase,
                                    type: a.type
                                }, a)) && (3 == a.eventPhase && -1 !== fa.indexOf(a.key) && f(new c("onPlayControlKeyPress", {
                                    keyCode: a.keyCode,
                                    key: a.key,
                                    eventPhase: a.eventPhase,
                                    type: a.type
                                }, a)), 3 == a.eventPhase &&
                                -1 !== T.indexOf(a.key) && f(new c("onColorKeyPress", {
                                    keyCode: a.keyCode,
                                    key: a.key,
                                    eventPhase: a.eventPhase,
                                    type: a.type,
                                    color: a.key
                                }, a)) && k(W.identifier, "onActivateColorButton", {color: a.key}, va), ta.metrological && "menu" === a.key && u === b && u === t && (P.exited ? P.resume() : P.exited || P.exit(), a.preventDefault()))
                            }

                            function E(a) {
                                if (G() && kb("app") === b)a.preventDefault(); else if (!a.defaultPrevented && f(new c("onActivateBackButton", {view: d}, a)) && (d = l()) && d in F) {
                                    var d = A(d);
                                    d.fire(new c("onActivateBackButton", {view: d}, a)) &&
                                    y(d.viewBackParams || {})
                                }
                            }

                            function G() {
                                var a = l();
                                return a in H && H[a].viewClass && H[a].viewClass.inheritsFrom(ea.system.SidebarView) || !1
                            }

                            function aa() {
                                a(this, "viewTypes", function () {
                                    return C
                                });
                                this.subscribers = na
                            }

                            var Q = W.getElementById, M = "", pa = "", O = "", U = "", F = {}, H = {}, S = [], Y = null, Z = null, X = null, ia = null, ba = !1, da = {}, la = !1, oa = b !== t && P && P.getMetadataByKey(b, "name"), ha = qa.profile.household, ma;
                            (function (a) {
                                var d = a.payload && a.payload.id ? a.payload.id : null, e = d && A(d), g;
                                ha || (ha = qa.profile.household);
                                switch (a.type) {
                                    case "onActivateAppButton":
                                        switch (a.payload.type) {
                                            case "app-back":
                                                a =
                                                    new c("onActivateBackButton", {
                                                        view: e,
                                                        viewId: d,
                                                        defaultActionCallback: y
                                                    }, null, a.HostEvent);
                                                f(a) && e.fire(a) && (d = F[l()] && F[l()].viewBackParams || null, y(d));
                                                break;
                                            case "app-home":
                                            case "app-title":
                                                f(new c("onActivateHomeButton", {
                                                    view: e,
                                                    viewId: d,
                                                    defaultActionCallback: v
                                                }, null, a.HostEvent)) && (d = F[l()] && F[l()].viewBackParams || null, v(d));
                                                break;
                                            case "app-settings":
                                                f(new c("onActivateSettingsButton", {
                                                    view: e,
                                                    viewId: d,
                                                    defaultActionCallback: B
                                                }, null, a.HostEvent)) && B();
                                                break;
                                            case "app-fav-add":
                                            case "app-fav-delete":
                                                f(new c("onActivateFavButton",
                                                    {
                                                        view: e,
                                                        action: a.payload.type,
                                                        viewId: d
                                                    }, null, a.HostEvent)) && e.favbutton.call(e, new c("onActivateFavButton", {
                                                    view: e,
                                                    action: a.payload.type,
                                                    viewId: d
                                                }, null, a.HostEvent));
                                                break;
                                            case "viewport-toggle":
                                                d = l(), g = ea.mediaplayer.getViewportBounds(), !ea.mediaplayer.isTVActive && 1080 !== g.height && H[d].viewClass && H[d].viewClass.inheritsFrom(ea.system.SidebarView) && (R.body.store("app", b), cb.push(b, O !== d && d), !1 !== w("animation") ? ca.animate({
                                                    translateX: -1920,
                                                    origin: ["left", "top"],
                                                    duration: .8
                                                }) : ca.setStyle("transform",
                                                    "translateX(-1920px)"))
                                        }
                                        break;
                                    case "onActivateSnippet":
                                        a = new c("onActivateSnippet", {view: e, viewId: d}, null, a.HostEvent);
                                        !f(a) || e && !e.fire(a) || x(a, a.payload.targetViewID || (H[d] && H[d].data ? H[d].data.targetViewID || H[d].data.destinationID || O : O), a.payload.forwardParams || {});
                                        break;
                                    case "onLoadView":
                                        e.data = Ga(e.data || {}, a.payload.data || {});
                                        e instanceof ea.system.FullscreenView && (H[d].previousViewportBounds = H[d].previousViewportBounds || ea.mediaplayer.getViewportBounds());
                                        f(new c("onLoadView", {view: e, viewId: d},
                                            null, a.HostEvent)) && e.onLoadView.call(e, new c("onLoadView", {view: e}, null, a.HostEvent));
                                        e.rendered = !0;
                                        break;
                                    case "onUnloadView":
                                        if (f(new c("onUnloadView", {view: e, viewId: d}, null, a.HostEvent))) {
                                            try {
                                                e.onUnloadView.call(e, new c("onUnloadView", {view: e}, null, a.HostEvent))
                                            } catch (h) {
                                            }
                                            delete e.backParams;
                                            delete e.persist;
                                            delete e.data;
                                            delete F[d];
                                            e && e.suicide()
                                        }
                                        e.rendered = !1;
                                        b !== t && (cc = 0);
                                        break;
                                    case "onShowView":
                                        M = d;
                                        e.data = Ga(e.data || {}, a.payload.data || {});
                                        g = ea.mediaplayer.getViewportBounds();
                                        "scale" === w("video") &&
                                        (1080 === g.height && e instanceof ea.system.SidebarView || 1080 !== g.height && e instanceof ea.system.FullscreenView) ? k(b, "onActivateAppButton", {
                                            id: d,
                                            type: "viewport-toggle"
                                        }, va) : e instanceof ea.system.FullscreenView && 1080 !== g.height && ea.mediaplayer.setViewportBounds(0, 0, 1920, 1080);
                                        f(new c("onShowView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent)) && e.onShowView.call(e, new c("onShowView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent));
                                        e.historyNoSave || -1 !== I.indexOf(e.viewType) || u === t || ("forward" === e.historyDirection ? cb.push(b,
                                            0 !== S.length && d) : cb.pop(b, O !== d && d));
                                        delete e.historyNoSave;
                                        M = !1;
                                        b !== t && (Ra.send(b, "view", {
                                            name: oa,
                                            view: d,
                                            prevView: ma || "",
                                            "default": O === d,
                                            category: P && P.getCategory() || "",
                                            duration: 0 < cc ? mb(cc) : 0,
                                            session: ha ? Aa(ha + hb) : null,
                                            ui: ha ? Aa(ha + ob) : null
                                        }), cc = ka.now());
                                        break;
                                    case "onHideView":
                                        f(new c("onHideView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent)) && e.onHideView.call(e, new c("onHideView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent));
                                        b !== t && (ma = d);
                                        break;
                                    case "onSelect":
                                        e.frozen || (e.selected = !0, e.data = Ga(e.data || {}, a.payload.data ||
                                            {}), pa = d, f(new c("onSelectView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent)) && e.onSelectView.call(e, new c("onSelectView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent)), a = function (a) {
                                            this.setInitialFocus.call(this, new c("onGainFocus", {
                                                view: this,
                                                viewId: a
                                            }, null))
                                        }, void 0 !== e.delayedInitialFocus ? a.delay(e.delayedInitialFocus || 0, e, [d]) : a.call(e, d));
                                        ia = Z = Y = X = null;
                                        ba = !1;
                                        break;
                                    case "onUnselect":
                                        e.selected = !1, e instanceof ea.system.FullscreenView && (H[d].previousViewportBounds = ea.mediaplayer.getViewportBounds()), f(new c("onUnselectView",
                                            {
                                                view: e,
                                                viewId: d
                                            }, null, a.HostEvent)) && e.onUnselectView.call(e, new c("onUnselectView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent))
                                }
                            }).subscribeTo(ra, "onActivateAppButton onActivateSnippet onHideView onLoadView onShowView onUnloadView onSelect onUnselect".split(" "));
                            (function (a) {
                                var d;
                                switch (a.type) {
                                    case "getSnippetConfs":
                                        d = L();
                                        if (0 < d.length) {
                                            var g = ca.appendChild(La("ul").addClass("list").addClass("frozen"));
                                            g.setAttribute("id", b + "-@snippets");
                                            d.forEach(function (a) {
                                                g.appendChild(A(a.id).element)
                                            })
                                        }
                                        f(new c("getSnippetConfs",
                                            {}, null, a.HostEvent)) && (a.HostEvent.result = ga.stringify(d));
                                        break;
                                    case "onDialogCancelled":
                                        d = a.HostEvent.getData() || {};
                                        if (!d.previousDialog && f(new c("onDialogCancelled", d, null, a.HostEvent)))return !1;
                                        break;
                                    case "onDialogDone":
                                        d = a.HostEvent.getData() || {};
                                        if (!d.previousDialog && f(new c("onDialogDone", a.HostEvent.getData() || {}, null, a.HostEvent)))return !1;
                                        break;
                                    case "onAppInit":
                                        f(new c("onApplicationStartup", {}, null, a.HostEvent));
                                        break;
                                    case "onAppFin":
                                        if (f(new c("onApplicationShutdown", {}, null, a.HostEvent))) {
                                            la =
                                                !W || !0 !== W.background;
                                            var h = L().pluck("id") || [], l = [];
                                            q.forEach(F, function (a, b) {
                                                -1 === h.indexOf(a) && l.push(a)
                                            });
                                            a.HostEvent.result = ga.stringify(l);
                                            pa = M = "";
                                            ea.mediaplayer.setViewportBounds(0, 0, 1920, 1080);
                                            S.push(!1);
                                            e()
                                        }
                                        break;
                                    case "onLoadProfile":
                                        f(new c("onLoadProfile", {}, null, a.HostEvent)) && q.each(F, function (b, d) {
                                            d.fire(new c("onLoadProfile", {}, null, a.HostEvent))
                                        });
                                        break;
                                    case "onUnloadProfile":
                                        f(new c("onUnloadProfile", {}, null, a.HostEvent)) && (q.each(F, function (b, d) {
                                            d.fire(new c("onUnloadProfile", {},
                                                null, a.HostEvent))
                                        }), a.HostEvent.result = ga.stringify(L()))
                                }
                            }).subscribeTo(ra, "getSnippetConfs onAppInit onAppFin onDialogCancelled onDialogDone onUnloadProfile onLoadProfile".split(" "));
                            var na = {};
                            g.forEach(function (b) {
                                a(na, b, function () {
                                    return da[b] ? da[b] : []
                                });
                                N(na, b, function (a) {
                                    a instanceof V && (da[b] = a)
                                })
                            });
                            W.close = function (a) {
                                W.removeEventListener("keydown", D);
                                W.removeEventListener("back", E);
                                la || a || ra.send("exit");
                                e(!W || !0 !== W.background)
                            };
                            W.addEventListener("keydown", D, !1);
                            W.addEventListener("back",
                                E, !1);
                            aa.prototype = {
                                constructor: aa, init: function (a) {
                                    a.views instanceof V && a.defaultViewId && (!0 === W.fullscreen && ja.players[0].hide(), e(!0), O = a.defaultViewId, U = a.settingsViewId || "", a.views.forEach(function (a) {
                                        this.addViewConfig(a)
                                    }, this))
                                }, removeView: function (a) {
                                }, loadView: function (a, b, c, d) {
                                    l();
                                    a in H && -1 === I.indexOf(H[a].viewClass.prototype.viewType) && (c || p(), n(a, b, "forward", d, c))
                                }, reloadView: function (a) {
                                    var b = l();
                                    (b = A(b)) ? (b.persist = a || b.persist, b.updateView()) : J.warn("Failed to get a ViewClass for a reloadView.")
                                },
                                previousView: y, clearViewHistory: d, isDefaultView: function () {
                                    return 0 === S.length
                                }, loadDefaultView: v, loadSettingsView: B, getViewProperty: function (a, b) {
                                    return F[a] && F[a][b]
                                }, isSidebarView: G, isSidebarLoaded: function () {
                                    var a = l();
                                    return a in H && H[a].viewClass && H[a].viewClass.inheritsFrom(ea.system.WindowedView) || !1
                                }, getDefaultViewId: function () {
                                    return O
                                }, getPreviousViewId: function () {
                                    var a = S.length;
                                    return 1 <= a ? (a = S[a - 1], "object" === z(a) ? a.id : a) : r
                                }, getCurrentViewId: l, setHostResultToViewId: x, getViewConfig: function (a) {
                                    return H[a] || !1
                                }, launchApp: function (a, b) {
                                    ra.send("launchApp", {id: a, data: b})
                                }, exitToDock: function () {
                                    this.exit()
                                }, exit: function () {
                                    ra.send("exit")
                                }, exitToLive: function () {
                                    this.exit();
                                    ja.exit()
                                }, addViewConfig: function (a) {
                                    H[a.id] = a
                                }
                            };
                            return new aa
                        }(b);
                        a(ea, "application", function () {
                            return Ba
                        });
                        a(J, "currentViewId", function () {
                            return Ba.getCurrentViewId()
                        });
                        b === t && (a(J, "ApplicationManager", function () {
                            return P
                        }), a(J, "PluginManager", function () {
                            return ja
                        }));
                        var Ea = !1;
                        a(J, "close", function () {
                            return ma
                        });
                        L.forEach(function (b) {
                            a(this,
                                b, function () {
                                    return this
                                })
                        }, J);
                        a(J, "name", function () {
                            return W.name
                        });
                        a(J, "KONtx", function () {
                            return this.MAF
                        });
                        ea.mediaplayer = new Ob(b, J)
                    };
                b.prototype = {constructor: b};
                return b
            }();
            la.prototype = {
                constructor: la, getApplications: function () {
                    return q.keys(O).filter(function (a) {
                        return a !== t
                    })
                }, getCurrentViewId: function () {
                    return Q[u].currentViewId
                }, exists: function (a) {
                    return O[a] !== r
                }, getMetadata: function (a) {
                    return O[a]
                }, getMetadataByKey: function (a, b) {
                    b = O[a] && O[a][b] || b;
                    return C(a, b)
                }, getAboutIcon: function (a) {
                    var b =
                        O[a] && O[a].images && O[a].images.about;
                    if ("object" === z(b))var c = Q[u].profile, b = b[c.languageCode] || b[c.locale] || b[c.languageCode + "-EU"] || b[zb];
                    b && (b = d(a) + b);
                    return b
                }, getIcon: function (a, b) {
                    var c = O[a] && O[a].images && O[a].images.icon[b || "192x192"];
                    if ("object" === z(c))var e = qa.profile, c = c[e.languageCode] || c[e.locale] || c[e.languageCode + "-EU"] || c[zb];
                    c && (c = d(a) + c);
                    return c
                }, getBaseURL: function () {
                    return Z.href.split("#")[0]
                }, getMainURL: function (a) {
                    return this.getBaseURL() + "#" + (a || "")
                }, getLaunchURL: function (a) {
                    return a &&
                        this.getBaseURL() + "#app:" + a
                }, getRootPath: function (a) {
                    return d(a)
                }, getLocalization: function (a) {
                    return C(a)
                }, getViewport: function () {
                    return Bb
                }, setCategory: function (a) {
                    this.category = a
                }, getCategory: function () {
                    return this.category
                }, getCategories: function () {
                    return p.versions ? (p.categories || []).map(function (a) {
                        var b = Pa("category_" + a.name), c = za(a.name);
                        nb[c] = a.apps || [];
                        for (var d in a.label)oa[t][d] = oa[t][d] || {}, oa[t][d][b] = a.label[d];
                        return c
                    }) : p.categories || []
                }, getFeatured: function () {
                    if (p.featured)return p.featured;
                    for (var a = p.categories || [], b = 0; a.length; b++)if ("object" === typeof a[b] && "featured" === za(a[b].name))return a[b].apps;
                    return []
                }, getApplicationsByChannelName: function (a) {
                    var b = [], c = z(a);
                    if ("string" === c || "number" === c)"string" === c && Ub && (a = a.replace(eb([].concat(Ub).join("|"), "gi"), "")), a = eb(M(a), "gi");
                    if (!a)return b;
                    b = (p.apps || []).filter(function (b) {
                        return (b = O[b]) && b.channels && ("all" === b.channels || a.test && a.test([].concat(b.channels).join(" ")))
                    });
                    q.forEach(w("channel") || {}, function (c, d) {
                        if ("*" === c || a.test(c))"string" ===
                        z(d) ? -1 === b.indexOf(d) && b.push(d) : d && d.forEach(function (a) {
                            -1 === b.indexOf(a) && b.push(a)
                        })
                    });
                    return b
                }, getApplicationsByCategory: function (a) {
                    return "object" === typeof a ? a.apps : nb[a] || (p.apps || []).filter(function (b) {
                        var c = O[b];
                        return b !== t && c.categories && -1 < c.categories.indexOf(a)
                    })
                }, search: function (a) {
                    function b(a, e) {
                        e = e || 1;
                        var g = d.indexOf(a);
                        -1 < g ? c[g].count += e : (g = d.push(a), c[g - 1] = {id: a, count: e})
                    }

                    var c = [], d = [];
                    "string" === z(a) && (Ub && (a = "(" + a.replace(eb([].concat(Ub).join("|"), "gi"), "").replace(/  /g,
                            "|") + ")"), a = eb(a, "gi"));
                    q.forEach(O, function (c) {
                        var d = O[c];
                        c !== t && (d.name && a.test(d.name) && b(c, 3), d.description && a.test(d.description) && b(c, 2), d.keywords && a.test(d.keywords) && b(c, d.keywords.match(a).length), d.categories && d.categories.length && (d = d.categories.filter(function (b) {
                            return a.test(b)
                        }), 0 < d.length && b(c, d.length)))
                    });
                    return c.keySort({count: "desc"})
                }, load: function (a) {
                    var b = ka.now(), c = Q[a], d = u && M(u);
                    if (!c && O[a]) {
                        var c = Q[a] = new Pb(a), e = [].concat(O[a].scripts);
                        u = a;
                        try {
                            e.forEach(function (a) {
                                    c.include(a)
                                },
                                c)
                        } catch (g) {
                            delete Q[a];
                            u = d;
                            return
                        } finally {
                            c = r
                        }
                        k(a, "onAppInit", {id: a}, va);
                        u = d;
                        t !== a ? Ra.send(a, "load", {
                            name: this.getMetadataByKey(a, "name"),
                            loadtime: mb(b)
                        }) : Ra.send(a, "load", {loadtime: mb(b)})
                    }
                }, unload: function (a) {
                    var b = Q[a];
                    b && (u = a, b.close(!0), u = a !== t ? t : r, t !== a ? Ra.send(a, "unload", {name: this.getMetadataByKey(a, "name")}) : Ra.send(a, "unload"))
                }, open: function (a, b) {
                    Q[a] && u !== a && (u && u !== a && k(u, "onUnselect", {id: Q[u].currentViewId}, va), u = a, a === t ? k(a, "onActivateSnippet", {id: Q[u].currentViewId}, va) : k.delay(100,
                        null, [a, "onActivateSnippet", b ? {
                            id: Q[u].currentViewId,
                            params: b
                        } : {id: Q[u].currentViewId}, va]))
                }, close: function (a) {
                    if (Q[a] && a === u)try {
                        k(a, "onAppFin", {id: a}, va)
                    } catch (b) {
                    }
                }, purchase: function (a, b) {
                    var c = a && O[a];
                    if (!c || !c.hash)return b && b(["invalid"]);
                    (new Na({
                        url: "https://" + fa[8] + ("test" === w("payment") ? "-sdk" : "") + "." + ca + ".com/" + qa.profile.household + "/generate-signature",
                        proxy: !1,
                        data: {identifier: c.identifier, version: c.version + "-" + c.hash},
                        onSuccess: function (a) {
                            qa.profile.purchase(a, b)
                        },
                        onFailure: function (a) {
                            b &&
                            b.call && b(["invalid"])
                        },
                        onError: function () {
                            b && b.call && b(["invalid"])
                        }
                    })).send()
                }, forEach: function (a, b) {
                    q.forEach(Q, a, b)
                }, fire: function (a, b, c) {
                    return k(a, b, c, va)
                }, resume: function (a) {
                    ja.resume(a)
                }, exit: function (a, b) {
                    u !== t && this.close(u);
                    ja.exit(a, b)
                }, reload: function () {
                    m.location.reload()
                }, isSD: function () {
                    return w("forceSD") || "1" === uc.sd || Gb.hasClass("sd")
                }, onComplete: X
            };
            P = new la;
            p.apps = p.apps && function (a) {
                    a = a || [];
                    return a.filter(function (b, c) {
                        return a.indexOf(b) === c
                    })
                }(p.apps);
            !0 === ja.delayStart ? ja.startup =
                lb : lb();
            this.destroy = function () {
                var a = P.active;
                a !== t && P.close(a);
                P.close(t);
                Q = O = oa = nb = Bb = H = P = null
            };
            a(this, "current", function () {
                return Q[u]
            });
            !0 === w("runtime") && (this.dump = function () {
                return [Q, O, oa]
            })
        };
        (function () {
            function a() {
                if (!1 !== ab && Ha) {
                    Ha.setStyles({width: null, height: null});
                    var b = w("scale") || "height", c = !0 === w("zoom"), d = {
                        width: Ha.offsetWidth || Ha.clientWidth || 0,
                        height: Ha.offsetHeight || Ha.clientHeight || 0
                    }, e;
                    if (0 !== x.min(d.width, d.height)) {
                        "width" === b || "height" === b ? Ja = Ea = d[b] / (viewport[b] || ("width" ===
                            b ? 1920 : 1080)) : "both" === b ? (Ea = d.width / (viewport.width || 1920), Ja = d.height / (viewport.height || 1080)) : b && !isNaN(b) && (Ja = Ea = b / 1080);
                        e = e || {};
                        !0 === w("preserve-3d") && (e.transformStyle = "preserve-3d");
                        (1 !== Ea || 1 !== Ja) && 0 < x.min(Ea, Ja) && (c || (e.transformOrigin = "0 0"), !0 === w("matrix") && !1 !== w("animation") && ta.webkit && isNaN(b) && !c ? (c = (new Jb).scale(Ea, Ja), e.transform = !1 !== w("gpu") ? c.translate(0, 0, 1) : c) : Ea === Ja ? c ? e.zoom = Ea : e.transform = "scale(" + Ea + ")" : e.transform = "scale(" + Ea + "," + Ja + ")");
                        c = {
                            width: x.floor(1920 * Ea), height: x.floor(1080 *
                                Ja)
                        };
                        Ha.setStyles(c);
                        var f = sa("iframe");
                        f && f.setStyles(c);
                        Y(e) && sa("viewport").setStyles(e);
                        Gb.hasClass("sd") || (720 > d.height && 1 !== Ea && 1 !== Ja && 1080 !== b && 720 !== b ? Gb.addClass("sd") : 720 <= d.height && Gb.removeClass("sd"))
                    }
                }
            }

            function b(a, b) {
                var c, d, e, f, k, h, m;
                a.addEventListener("touchstart", function (a) {
                    var b = a.changedTouches[0];
                    c = r;
                    dist = 0;
                    d = b.pageX;
                    e = b.pageY;
                    m = ka.now();
                    a.preventDefault()
                }, !1);
                a.addEventListener("touchmove", function (a) {
                    a.preventDefault()
                }, !1);
                a.addEventListener("touchend", function (a) {
                    var g =
                        a.changedTouches[0], p = a.target;
                    f = g.pageX - d;
                    k = g.pageY - e;
                    h = ka.now() - m;
                    300 >= h && (150 <= x.abs(f) && 100 >= x.abs(k) ? c = 0 > f ? "left" : "right" : 150 <= x.abs(k) && 100 >= x.abs(f) && (c = 0 > k ? "up" : "down"));
                    if (c && b && b.call)b(c); else if (ba(c) && 0 === f && 0 === k && p) {
                        if (!p.allowNavigation) {
                            a.preventDefault();
                            return
                        }
                        for (; p && !p.focusable;)p = p.parentNode;
                        g = p.retrieve && p.retrieve("type");
                        p && "view" !== g && "dialog" !== g && ("window" === g ? (p = R.activeElement) && kb("app") && p.dispatchEvent(Ia("back", r, !0, !0)) : p.select())
                    }
                    a.preventDefault()
                }, !1)
            }

            function d(a) {
                a =
                    a.target || this;
                var b = sa("viewport");
                a && a.src ? (b.frozen = !0, a.frozen = !1, a.contentWindow.focus()) : (a.frozen = !0, b.frozen = !1)
            }

            function c(a) {
                a = a.target || this;
                var b = k.current;
                b && b.focus();
                a.frozen = !0;
                sa("viewport").frozen = !1
            }

            function f(a) {
                var b = Ua;
                if (b && a.source === b.contentWindow)a:{
                    var c = k.current, d = b.contentWindow, e;
                    try {
                        e = ga.parse(a.data)
                    } catch (f) {
                        break a
                    }
                    switch (e.type) {
                        case "close":
                            U("IFRAME CLOSE");
                            c.MAF.application.exit();
                            break;
                        case "getStorage":
                            d.postMessage(ga.stringify({type: "storage", message: c.currentAppConfig.get("c")}),
                                "*");
                            break;
                        case "setStorage":
                            c.currentAppConfig.set("c", e.message);
                            break;
                        case "scale":
                            a = e.scale, U("IFRAME SCALE: " + (a || 1)), b.setStyle("transform", 1 !== a ? "scale(" + a + ")" : null)
                    }
                }
            }

            function e() {
                Ha = R.body;
                var e = sa("viewport");
                e ? e.addClass("window") : (e = Bc("viewport").inject(Ha), Ua = Wc("iframe").inject(Ha, "inline" === w("player") ? "bottom" : "top"), Ua.addEventListener("load", d, !1), Ua.addEventListener("unload", c, !1), m.addEventListener("message", f, !1));
                (w("forceSD") || "1" === uc.sd) && Gb.addClass("sd");
                ta.mobile && b(e,
                    function (a) {
                        var b = R.activeElement;
                        b && b.dispatchEvent(Ia("navigate", {direction: a}, !0, !0))
                    });
                rb(La().addClass("text").inject(e), "id", "textrenderer");
                (function () {
                    for (var a = La().style, b = ["-moz-", "-o-", "-webkit-", "-ms-", ""]; 0 < b.length;) {
                        var c = b.shift();
                        a.cssText = c + "transition-property:opacity;";
                        if ("undefined" !== z(a[(c + "transition-property").camelize()])) {
                            ab = c;
                            break
                        }
                    }
                })();
                Ab = (ab + Ab).camelize();
                Lc = (ab + Lc).camelize();
                a();
                p && (k = new md, !0 === w("runtime") && (m.MAF.Runtime = k));
                e.frozen = !1
            }

            var k;
            m.addEventListener("resize",
                a, !1);
            m.addEventListener("load", e, !1);
            m.addEventListener("unload", function (b) {
                m.removeEventListener("load", e);
                m.removeEventListener("resize", a);
                try {
                    k && (k.destroy(), k = r);
                    var c = sa("viewport");
                    c && c.destroy()
                } catch (d) {
                    b.preventDefault()
                }
                kc = Ha = Ua = null
            })
        })()
    }
})(window, document);