// Copyright 2005-2015 Metrological
// All Rights Reserved.
(function (p, Q, r) {
    function ta() {
    }

    function ob(a) {
        return Q.body.retrieve(a)
    }

    function X(a) {
        return a !== r
    }

    function la(a) {
        return a === r
    }

    function Ia(a) {
        return K.slice.call(a || [])
    }

    function qa(a, c) {
        return gb.hasOwnProperty.call(a, c)
    }

    function ma(a, c) {
        return parseInt(a, c || 10)
    }

    function Sc(a, c) {
        a !== r && (Pa[a] = c)
    }

    function B(a) {
        return Pa[a] !== r ? Pa[a] : F[a]
    }

    function Ea(a, c) {
        if (!a || !a.call)throw pa("Callback is not callable" + (c ? " from: " + c : ""));
        return !0
    }

    function Sb(a) {
        return w.floor(w.random() * (a || 1E3))
    }

    function x(a) {
        if (la(a))return "undefined";
        if (null === a)return "null";
        if (X(a.constructor))switch (a.constructor) {
            case q:
                if ("number" === typeof a.length) {
                    if (a.callee)return "arguments";
                    if (a.item)return "collection"
                }
                return "object";
            case ea:
                return "array";
            case Ab:
                return isFinite(a) ? "number" : !1;
            case da:
                return "date";
            default:
                if (a && X(a._classID))return "instance";
                if (a && X(a.nodeName))return "element";
                if (a && X(a.helpers))return "class"
        }
        return typeof a
    }

    function Tb(a, c) {
        c = c || {};
        for (var d in c)X(c[d]) && qa(c, d) && (a[d] = c[d]);
        return a
    }

    function xa(a) {
        var c;
        switch (x(a)) {
            case "object":
                c =
                {};
                for (var d in a)X(a[d]) && (c[d] = xa(a[d]) || a[d]);
                break;
            case "array":
                c = [];
                d = 0;
                for (var b = a.length; d < b; d++)c[d] = xa(a[d]);
                break;
            default:
                return a
        }
        return c
    }

    function Yb(a) {
        if (la(a) || null === a)return !0;
        var c = x(a);
        switch (c) {
            case "array":
            case "string":
                return 0 < a.length ? !1 : !0;
            case "number":
                return !1;
            default:
                return c ? !1 : !0
        }
    }

    function Ka() {
        for (var a = {}, c = 0, d = arguments.length; c < d; c++) {
            var b = arguments[c];
            if ("object" === x(b))for (var l in b)if (X(b[l]) && qa(b, l)) {
                var e = b[l], h = a[l];
                a[l] = "object" === x(e) && "object" === x(h) ?
                    Ka(h, e) : xa(e)
            }
        }
        return a
    }

    function Tc(a, c, d) {
        var b = {};
        if (!a)return b;
        la(d) && (d = function (b) {
            return b
        });
        for (var l; l = c.exec(a);)b[l[1]] = d(l[2]);
        return b
    }

    function vb(a) {
        return a && Tc(a, /([^&=]*)=([^&]*)/g)
    }

    function Uc(a) {
        return a.replace(/\\u([0-9a-fA-F]{4})/g, function (a, d) {
            return Ra(ma(d, 16))
        })
    }

    function Aa(a) {
        return a && a.toLowerCase() || ""
    }

    function Va(a) {
        return a && a.toUpperCase() || ""
    }

    function Vc(a, c, d) {
        switch (x(c)) {
            case "object":
                return q.contains(a, c, d || !1);
            case "array":
            case "string":
                return -1 < c.indexOf(a)
        }
        return !0
    }

    function Wc(a) {
        var c = x(a);
        return c ? -1 === ["array", "arguments"].indexOf(c) ? [a] : a : []
    }

    function Xc(a, c, d, b, l) {
        a = a || 0;
        d = d || {};
        l = l || !1;
        b = "array" !== x(b) ? [b] : b;
        var e = "string" === x(c) ? d[c] : c, h, f;
        Ea(h);
        h = function () {
            e.apply(d, b)
        };
        f = l ? Pb(h, a) : Kb(h, a);
        return {
            interval: l ? a : 0, cancel: function () {
                this.interval ? Ub(f) : hb(f)
            }
        }
    }

    function Qb(a) {
        return (!0 !== B("jsdelivr") ? "//" + La[1] + "." + Fa + ".com/jsdelivr/" : "//cdn.jsdelivr.net/") + a
    }

    function Zb(a, c, d) {
        return (d && Y && Y.lan ? "http://" + Y.lan + (Y.port && 80 != Y.port ? ":" + Y.port : "") + "/" : "") +
            c + "/" + a
    }

    function $b(a, c, d) {
        c = "";
        !0 === d && (c += "&ct=ig");
        return "/" + La[3] + "?url=" + encodeURIComponent(a) + c
    }

    function Yc() {
        var a = arguments, c = 0, d = function (a, b, c, d) {
            c || (c = " ");
            b = a.length >= b ? "" : ea(1 + b - a.length >>> 0).join(c);
            return d ? a + b : b + a
        }, b = function (b, a, c, l, jc, k) {
            var m = l - b.length;
            0 < m && (b = c || !jc ? d(b, l, k, c) : b.slice(0, a.length) + d("", m, "0", !0) + b.slice(a.length));
            return b
        }, l = function (a, c, l, jc, t, k, m) {
            a >>>= 0;
            l = l && a && {2: "0b", 8: "0", 16: "0x"}[c] || "";
            a = l + d(a.toString(c), k || 0, "0", !1);
            return b(a, l, jc, t, m)
        };
        return a[c++].replace(/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g,
            function (e, h, f, n, t, k, m) {
                var fa, ia;
                if ("%%" === e)return "%";
                var g = !1;
                ia = "";
                var L = t = !1;
                fa = " ";
                for (var Z = f.length, aa = 0; f && aa < Z; aa++)switch (f.charAt(aa)) {
                    case " ":
                        ia = " ";
                        break;
                    case "+":
                        ia = "+";
                        break;
                    case "-":
                        g = !0;
                        break;
                    case "'":
                        fa = f.charAt(aa + 1);
                        break;
                    case "0":
                        t = !0;
                        break;
                    case "#":
                        L = !0
                }
                n = n ? "*" === n ? +a[c++] : "*" === n.charAt(0) ? +a[n.slice(1, -1)] : +n : 0;
                0 > n && (n = -n, g = !0);
                if (!isFinite(n))throw pa("Minimum width must be finite");
                k = k ? "*" === k ? +a[c++] : "*" === k.charAt(0) ? +a[k.slice(1, -1)] : +k : -1 < "fFeE".indexOf(m) ? 6 : "d" ===
                m ? 0 : r;
                h = h ? a[h.slice(0, -1)] : a[c++];
                switch (m) {
                    case "s":
                        return m = N(h), k && (m = m.slice(0, k)), b(m, "", g, n, t, fa);
                    case "c":
                        return m = Ra(+h), k && (m = m.slice(0, k)), b(m, "", g, n, t, void 0);
                    case "b":
                        return l(h, 2, L, g, n, k, t);
                    case "o":
                        return l(h, 8, L, g, n, k, t);
                    case "x":
                        return l(h, 16, L, g, n, k, t);
                    case "X":
                        return Va(l(h, 16, L, g, n, k, t));
                    case "u":
                        return l(h, 10, L, g, n, k, t);
                    case "i":
                    case "d":
                        return fa = +h || 0, fa = w.round(fa - fa % 1), e = 0 > fa ? "-" : ia, h = e + d(N(w.abs(fa)), k, "0", !1), b(h, e, g, n, t);
                    case "e":
                    case "E":
                    case "f":
                    case "F":
                    case "g":
                    case "G":
                        return fa = +h, e = 0 > fa ? "-" : ia, ia = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(Aa(m))], m = ["toString", "toUpperCase"]["eEfFgG".indexOf(m) % 2], h = e + w.abs(fa)[ia](k), b(h, e, g, n, t)[m]();
                    default:
                        return e
                }
            })
    }

    function yc() {
        var a = [], c;
        for (c in p)try {
            p[c] && qa(p, c) && "_FirebugCommandLine" !== c && 0 !== c.indexOf("moz") && 0 !== c.indexOf("webkit") && "constructor" !== c && a.push(c)
        } catch (d) {
        }
        return a
    }

    function zc(a, c, d) {
        a = a.split(".");
        var b = c;
        for (c = 0; c < a.length; c++)la(b[a[c]]) && (b[a[c]] = d && c === a.length - 1 ? d() : {}), b = b[a[c]];
        return a[0]
    }

    function a(a, c, d) {
        try {
            a && a.__defineGetter__(c, d)
        } catch (b) {
        }
    }

    function M(a, c, d) {
        try {
            a && a.__defineSetter__(c, d)
        } catch (b) {
        }
    }

    function Ac() {
        return Q.createDocumentFragment()
    }

    function ya(a) {
        return Q.createElement(a || "div")
    }

    function Zc(a) {
        var c = ya("iframe").addClass("iframe");
        a && (wb.original ? wb.original.call(c, "id", a) : c.setAttribute("id", a));
        c.frozen = !0;
        c.wantsFocus = !0;
        return c
    }

    function Bc(a) {
        var c = ya().addClass("window");
        a && (wb.original ? wb.original.call(c, "id", a) : c.setAttribute("id", a));
        c.store("type", "window");
        c.frozen = !0;
        c.wantsFocus = !0;
        return c
    }

    function kc(a, c) {
        return p.getComputedStyle(a, c || null)
    }

    function xb(a, c) {
        return kc(a).getPropertyValue(c)
    }

    function Bb(a, c) {
        if (!la(c) && a) {
            c = c.hyphenate();
            var d = xb(a, c);
            if (d && "auto" !== d && "inherit" !== d)return d;
            d = a.style[c];
            switch (d) {
                case "inherit":
                    if (d = a.parentNode) {
                        for (; d && (!d.style || !d.style[c]);) {
                            if (d === Ma)return;
                            d = d.parentNode
                        }
                        return d && d.style && d.style[c]
                    }
                    return;
                case "auto":
                    if ("width" === c || "height" === c)if (d = xb(a, "min-" + c))break;
                    return
            }
            return d
        }
    }

    function wb(a,
                c, d) {
        a.setAttribute(c, d)
    }

    function ac(a, c) {
        a = a || "";
        c = c || lc;
        var d;
        Lb.test(a) ? (d = ya("link"), d.setAttribute("type", "text/css"), d.setAttribute("charset", "utf-8"), d.setAttribute("rel", "stylesheet"), d.setAttribute("href", a)) : (d = ya("style"), d.setAttribute("type", "text/css"), d.setAttribute("charset", "utf-8"), d.setAttribute("rel", "stylesheet"), d.styleSheet ? d.styleSheet.cssText = a : d.appendChild(Q.createTextNode(a || "")));
        c.appendChild(d);
        return d
    }

    function Cb(a, c, d) {
        var b = ya("script");
        b.setAttribute("type", "text/javascript");
        b.setAttribute("charset", "utf-8");
        b.src = a;
        c && c.call && (b.onreadystatechange = function () {
            "complete" === this.readyState && c()
        }, b.onload = c);
        d && d.call && (b.onerror = d);
        return lc.appendChild(b)
    }

    function $c(a, c) {
        a = a || "";
        return eb(c ? "<" + a + "(?!\\w)[^>]*>([\\s\\S]*?)</" + a + "(?!\\w)>" : "</?" + a + "([^>]+)?>", "gi")
    }

    function Qa(a, c, d, b) {
        return new bc(a, {detail: c || null, bubbles: !0 === d, cancelable: !0 === b})
    }

    function Cc(a) {
        a = (a || "leftTop").dasherize().split("-") || [];
        1 <= a.length && (1 === a.length ? "justify" === a[0] ? a[1] = null : "center" ===
        a[0] && (a[1] = "middle") : "center" === a[1] ? a[1] = "middle" : "left" === a[1] && (a[1] = null), "top" === a[0] && (a[0] = null));
        return a
    }

    function Dc(a) {
        return isNaN(a) ? a.indexOf("em") ? 24 * parseFloat(a) : parseFloat(a) : a || 0
    }

    function Ec(a, c) {
        var d = {width: 0, height: 0}, b = Q.getElementById("textrenderer");
        if (!c && (a.clientWidth && a.clientHeight || a.scrollWidth && a.scrollHeight))d.width = a.clientWidth || a.scrollWidth, d.height = a.clientHeight || a.scrollHeight; else if (b) {
            var l = a.parentNode, e = l && l.wrap || !1, h = l && !c && ma(Bb(l, "width")) || 0, f = l &&
                l.style || {};
            if (!c && e && (!h || isNaN(h)))return d;
            b.setStyles({
                minHeight: f.minHeight || null,
                whiteSpace: !c && e ? "normal" : "nowrap",
                wordWrap: !c && e ? "break-word" : "normal",
                fontSize: f.fontSize || null,
                fontWeight: f.fontWeight || null
            });
            b.html = l.data;
            d.width = !c && e && h && b.clientWidth > h ? b.style.width = h : b.clientWidth;
            d.height = b.clientHeight;
            b.html = "";
            b.width = null;
            b.removeAttribute("style")
        }
        return d
    }

    function ad(a) {
        var c = a.parentNode, d = c && c.height || 0, b;
        b = a.html = a.html.stripTags().trim();
        c = d / (c && c.textHeight || 0);
        0 < c && 1 > c &&
        (c = w.ceil(b.length * c), a.html = b.truncate(c))
    }

    function cc() {
        if (Ba.hash)return Ba.hash;
        var a = Ba.href.split("#");
        a.shift();
        return "#" + a.join("#")
    }

    function Fc() {
        Ba.reload()
    }

    function pb(a) {
        a = a || 0;
        a = !isNaN(a) && 0 < a ? da.now() - a : 0;
        return !isNaN(a) && 0 < a && 1728E5 > a ? w.floor(a / 1E3) : 0
    }

    function bd(a) {
        return cd[a]
    }

    function mc(p) {
        a(p, "key", function () {
            var a = this.keyCode || this.which, d = this.altKey || !1, b = this.ctrlKey || !1, l = this.shiftKey || !1, d = d && l ? ib.altshift[a] : b ? ib.ctrl[a] : l ? ib.shift[a] : d ? ib.alt[a] : ib.normal[a];
            d || !this.isChar && !this.isNumeric || (d = Ra(a) || a) && (d = l ? Va(d) : Aa(d));
            !this.isChar && d && 1 === d.length && (isNaN(d) ? this.isExtendedChar = !0 : this.isExtendedNumeric = !0);
            return d
        });
        a(p, "isChar", function () {
            var a = this.keyCode || this.which;
            return 65 <= a && 90 >= a || 97 <= a && 122 >= a || !1
        });
        a(p, "isNumeric", function () {
            var a = this.keyCode || this.which;
            return 48 <= a && 57 >= a || !1
        })
    }

    var Db = +new Date, Mb = Q.getElementsByTagName("html")[0], lc = Q.head || Q.getElementsByTagName("head")[0], Ma, nc, qb = Q.implementation, Ba = p.location, oc = p.navigator, ab = p.history, Na =
            p.console, pc = p.WebSocket, Ca = p.md5, q = Object, ea = Array, yb = Function, Ab = Number, qc = Boolean, da = Date, N = String, w = Math, eb = RegExp, pa = Error, rc = p.btoa, Gc = p.atob, K = ea.prototype, wa = yb.prototype, na = N.prototype, gb = q.prototype, dd = da.prototype, Hc = Ab.prototype, Ic = gb.toString, bb = new TypeError, sc = yb("return delete this"), Kb = p.setTimeout, hb = p.clearTimeout, Pb = p.setInterval, Ub = p.clearInterval, Ra = N.fromCharCode, fb = p.XMLHttpRequest || p.ActiveXObject && p.ActiveXObject("Microsoft.XMLHTTP"), ka = p.JSON, rb = 0, jb = 0, dc = 0, bc = p.CustomEvent,
        Jc = {
            parse: function (a) {
                if ("string" === typeof a) {
                    if (p.DOMParser)return (new p.DOMParser).parseFromString(a, "text/xml");
                    if (p.ActiveXObject) {
                        var c = new p.ActiveXObject("Microsoft.XMLDOM");
                        c.async = !1;
                        return c.loadXML(a)
                    }
                    throw pa("DOMParser not supported");
                }
                return a || r
            }
        }, La = "jsonip cdn image proxy jslint stats mms payment apps".split(" "), Fa = N("metrological"), Kc = {
            nl: "Nederlands",
            en: "English",
            fr: "Fran\u00e7ais",
            de: "Deutsch",
            it: "Italiano",
            pl: "Polszczyzna",
            hu: "Magyar"
        }, Lb = eb("^(https?:)?//"), Vb = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:[\s]+\/\/(?:.*)$)/gm,
        tc = /[^.]\s*include\s*\(\s*["']([^'"\s]+)["']\s*\)/g, Eb = N('html,body{height:100%}.view::-webkit-scrollbar{display:none;}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure, figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark{margin:0;padding:0;border:0;vertical-align: baseline;}body{overflow:auto;margin:0;padding:0;color:white;font:24px/1 "Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif;background-color:transparent;line-height:1}[tabindex]{outline:0;}img:not([src]),img[src=""]{display:none}.frame,.text,.view,.dialog,.window,.canvas,.iframe{position:absolute;overflow:hidden;}.frame,.view,.dialog,.window,.canvas,.iframe{top:0;left:0}.window{width:1920px;height:1080px}.iframe{width:inherit;height:inherit}.upscale720{width:1280px;height:720px;-webkit-transform:scale(1.5);-webkit-transform-origin:0 0}.list{margin:0;padding:0;list-style:none;overflow:hidden}.item{display:inline-block;position:relative;overflow:hidden}.image{position:absolute}.frame,.text,.list,.item,.image{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.text{white-space:nowrap;line-height:130%;min-height:1.3em}.text:before{content:"";display:inline-block;height:100%;vertical-align:middle}.innerText{display:inline-block;width:inherit;vertical-align:top;cursor:default}.innerText *{max-width:100%}.frozen,audio{display:none}.frozenText{clip:rect(0px,0px,0px,0px)}.skin{width:100%;height:100%}.scrollText{-webkit-marquee:left medium infinite scroll normal;overflow-x: -webkit-marquee;}.scrollText .innerText{overflow:visible !important;text-overflow:clip !important;}.innerText[contenteditable="true"]{cursor:auto}#textrenderer{display:block;left:0;top:0;visibility:hidden;overflow:visible}#textrenderer *{max-width:100%}a{color:inherit}a:link{text-decoration:none}p{margin:0 0 1em 0;white-space:inherit;word-wrap:inherit;font-size:inherit}.noBorderBox{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.fa-half{font-size:50%}.fa-middle{vertical-align:middle}.sd .innerText{font-size:115%}'),
        Lc = N("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), ed = N("data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs="), fd = N("data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), gd = N("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAGUlEQVQoz2NQacCEDNjAqEI6KxwNiUGqEAAeh4AhmRJYkwAAAABJRU5ErkJggg=="), ib = {
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
        }, F = p.MAE || {}, Pa = F.settings || {}, uc = Pa.metadata || {}, Wb = F.search ? F.search.blacklist || [] : Pa.blacklist || [], zb = F.hacks || Pa.hacks || {}, Fb = [], Gb = N("en-EU"), Ya = !1, Nb = "transform", Mc = "transform-origin", Oa = 1, Wa = 1, kb = "mousemove", ec = "mouseout", Y, Za, fc, Eb = Eb + N('.license{width:60%;height:60%;top:20%;left:20%;border:2px #fff solid;border-radius:10px;box-shadow:0 0 3px 3px #262a35;background-color:rgba(0,0,0,.7)}.license .text{width:96%;height:80%;top:3%;left:2%;resize:none;white-space:normal;overflow-y:scroll;border:8px #fff solid;border-radius:5px;background-color:#fff;font-family:monospace;font-size:16}.license .checkbox{top:86%;left:2%;font-size:16}.license .buttons{width:100%;text-align:center;bottom:30;top:auto}.license input[type=checkbox]{display:none;}.license input[type=checkbox]+label:before{font-family:FontAwesome;display:inline-block;}.license input[type=checkbox]+label:before{content:"\\f096";}.license input[type=checkbox]+label:before{letter-spacing:10px;}.license input[type=checkbox]:checked+label:before{content:"\\f046";}.license input[type=checkbox]:checked+label:before{letter-spacing:8px;}.license input[type=button]{background-color:transparent;border:none;color:rgba(255,255,255,.5);font-family:FontAwesome,"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:20}.license input[type=button]:hover{color:#fff}');
    if (F.ipv6)La[1] += "-ipv6"; else if (F.cdn || Pa.cdn)La[1] = (F.cdn || Pa.cdn) + "." + La[1];
    var Eb = Eb + ("body{background-color:" + (F.background || Pa.background || "black") + "}"), cb = cc().split("?"), cd = 2 === cb.length && vb(cb[1]) || {}, gc, Hb = ta, Ga = ta, lb = ta;
    (function () {
        if (!X(p.MAF)) {
            p.MAF = {name: "Metrological Application Framework", version: "3.8.0"};
            ac(Eb);
            Eb = r;
            var a = "concat" === B("console");
            Hb = function () {
                var b = a ? [Ia(arguments).join(" ")] : arguments;
                Na.log.apply(Na, b)
            };
            Ga = function () {
                var b = a ? [Ia(arguments).join(" ")] : arguments;
                Na.warn.apply(Na, b)
            };
            lb = function () {
                var b = a ? [Ia(arguments).join(" ")] : arguments;
                Na.error.apply(Na, b)
            };
            ac(Qb("fontawesome/4.4.0/css/font-awesome.min.css"));
            var c = B("plugins") || {}, d = Aa("object" === typeof F.ui ? F.ui.identifier : F.ui);
            (-1 < d.indexOf("horizon") || -1 < d.indexOf("d4a") || -1 < d.indexOf("mldemo") || -1 < d.indexOf("pixidemo") || c["lgi-guide-sdk"]) && Cb("//" + La[1] + "." + Fa + ".com/l/" + ("lgi-guide-sdk/" + (c["lgi-guide-sdk"] || "0.4.8") + "/lgi-guide-sdk.min.js"));
            !1 !== c.tinycolor && Cb(Qb("tinycolor/" + (c.tinycolor ||
                "0.9.16") + "/tinycolor-min.js"));
            !0 === c.kbevent && Cb(Zb("kbevent.min.js", "lib"));
            !0 === c.pixi && (Cb("//" + La[1] + "." + Fa + ".com/pixi/pixi.js"), Cb("//" + La[1] + "." + Fa + ".com/pixi/tween.min.js"));
            !1 !== c.moment && Cb(Qb("momentjs/" + (c.moment || "2.5.1") + "/moment.min.js"), function () {
                (function () {
                    function a(b) {
                        return 1 < b && 5 > b && 1 !== ~~(b / 10)
                    }

                    function c(d, l, e, k) {
                        var h = d + " ";
                        switch (e) {
                            case "s":
                                return l || k ? "p\u00e1r vte\u0159in" : "p\u00e1r vte\u0159inami";
                            case "m":
                                return l ? "minuta" : k ? "minutu" : "minutou";
                            case "mm":
                                return l ||
                                k ? h + (a(d) ? "minuty" : "minut") : h + "minutami";
                            case "h":
                                return l ? "hodina" : k ? "hodinu" : "hodinou";
                            case "hh":
                                return l || k ? h + (a(d) ? "hodiny" : "hodin") : h + "hodinami";
                            case "d":
                                return l || k ? "den" : "dnem";
                            case "dd":
                                return l || k ? h + (a(d) ? "dny" : "dn\u00ed") : h + "dny";
                            case "M":
                                return l || k ? "m\u011bs\u00edc" : "m\u011bs\u00edcem";
                            case "MM":
                                return l || k ? h + (a(d) ? "m\u011bs\u00edce" : "m\u011bs\u00edc\u016f") : h + "m\u011bs\u00edci";
                            case "y":
                                return l || k ? "rok" : "rokem";
                            case "yy":
                                return l || k ? h + (a(d) ? "roky" : "let") : h + "lety"
                        }
                    }

                    var d = "leden \u00fanor b\u0159ezen duben kv\u011bten \u010derven \u010dervenec srpen z\u00e1\u0159\u00ed \u0159\u00edjen listopad prosinec".split(" "),
                        h = "led \u00fano b\u0159e dub kv\u011b \u010dvn \u010dvc srp z\u00e1\u0159 \u0159\u00edj lis pro".split(" ");
                    return moment.lang("cz", {
                        months: d,
                        monthsShort: h,
                        monthsParse: function (a, b) {
                            var c, d = [];
                            for (c = 0; 12 > c; c++)d[c] = new RegExp("^" + a[c] + "$|^" + b[c] + "$", "i");
                            return d
                        }(d, h),
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
                            s: c,
                            m: c,
                            mm: c,
                            h: c,
                            hh: c,
                            d: c,
                            dd: c,
                            M: c,
                            MM: c,
                            y: c,
                            yy: c
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
                            return (/^[0-9].+$/.test(a) ?
                                    "tra" : "in") + " " + a
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
                        LT: "HH:mm",
                        L: "DD-MM-YYYY",
                        LL: "D MMMM YYYY",
                        LLL: "D MMMM YYYY LT",
                        LLLL: "dddd D MMMM YYYY LT"
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
                        return a + (1 === a || 8 === a || 20 <= a ? "ste" : "de")
                    },
                    week: {dow: 1, doy: 4}
                });
                (function () {
                    function a(b, c, d, f) {
                        b = {
                            m: ["eine Minute", "einer Minute"],
                            h: ["eine Stunde", "einer Stunde"],
                            d: ["ein Tag", "einem Tag"],
                            dd: [b + " Tage", b + " Tagen"],
                            M: ["ein Monat", "einem Monat"],
                            MM: [b + " Monate", b + " Monaten"],
                            y: ["ein Jahr", "einem Jahr"],
                            yy: [b + " Jahre", b + " Jahren"]
                        };
                        return c ? b[d][0] : b[d][1]
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
                            future: "in %s",
                            past: "vor %s",
                            s: "ein paar Sekunden",
                            m: a,
                            mm: "%d Minuten",
                            h: a,
                            hh: "%d Stunden",
                            d: a,
                            dd: a,
                            M: a,
                            MM: a,
                            y: a,
                            yy: a
                        },
                        ordinal: "%d.",
                        week: {dow: 1, doy: 4}
                    })
                })();
                (function () {
                    function a(b, c, d, l) {
                        switch (d) {
                            case "s":
                                return l || c ? "n\u00e9h\u00e1ny m\u00e1sodperc" : "n\u00e9h\u00e1ny m\u00e1sodperce";
                            case "m":
                                return "egy" + (l || c ? " perc" : " perce");
                            case "mm":
                                return b + (l || c ? " perc" : " perce");
                            case "h":
                                return "egy" + (l || c ? " \u00f3ra" : " \u00f3r\u00e1ja");
                            case "hh":
                                return b +
                                    (l || c ? " \u00f3ra" : " \u00f3r\u00e1ja");
                            case "d":
                                return "egy" + (l || c ? " nap" : " napja");
                            case "dd":
                                return b + (l || c ? " nap" : " napja");
                            case "M":
                                return "egy" + (l || c ? " h\u00f3nap" : " h\u00f3napja");
                            case "MM":
                                return b + (l || c ? " h\u00f3nap" : " h\u00f3napja");
                            case "y":
                                return "egy" + (l || c ? " \u00e9v" : " \u00e9ve");
                            case "yy":
                                return b + (l || c ? " \u00e9v" : " \u00e9ve")
                        }
                        return ""
                    }

                    var c = "vas\u00e1rnap h\u00e9tf\u0151n kedden szerd\u00e1n cs\u00fct\u00f6rt\u00f6k\u00f6n p\u00e9nteken szombaton".split(" ");
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
                                return "[" + c[this.day()] + "] LT[-kor]"
                            }, lastDay: "[tegnap] LT[-kor]", lastWeek: function () {
                                return "[m\u00falt] [" + c[this.day()] + "] LT[-kor]"
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
                    function a(b) {
                        return 5 > b % 10 && 1 < b % 10 && 1 !== ~~(b / 10) % 10
                    }

                    function c(d, l, e) {
                        var k = d + " ";
                        switch (e) {
                            case "m":
                                return l ? "minuta" : "minut\u0119";
                            case "mm":
                                return k + (a(d) ? "minuty" : "minut");
                            case "h":
                                return l ?
                                    "godzina" : "godzin\u0119";
                            case "hh":
                                return k + (a(d) ? "godziny" : "godzin");
                            case "MM":
                                return k + (a(d) ? "miesi\u0105ce" : "miesi\u0119cy");
                            case "yy":
                                return k + (a(d) ? "lata" : "lat")
                        }
                    }

                    var d = "stycze\u0144 luty marzec kwiecie\u0144 maj czerwiec lipiec sierpie\u0144 wrzesie\u0144 pa\u017adziernik listopad grudzie\u0144".split(" "), h = "stycznia lutego marca kwietnia maja czerwca lipca sierpnia wrze\u015bnia pa\u017adziernika listopada grudnia".split(" ");
                    return moment.lang("pl", {
                        months: function (a, b) {
                            return /D MMMM/.test(b) ?
                                h[a.month()] : d[a.month()]
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
                            m: c,
                            mm: c,
                            h: c,
                            hh: c,
                            d: "1 dzie\u0144",
                            dd: "%d dni",
                            M: "miesi\u0105c",
                            MM: c,
                            y: "rok",
                            yy: c
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
                    }).x)throw bb;
            return !0
        }

        try {
            r() && !gb.__defineGetter__ && (q.defineProperty(gb, "__defineGetter__", {
                enumerable: !1,
                configurable: !0,
                value: function (a, b) {
                    q.defineProperty(this, a, {get: b, enumerable: !0, configurable: !0})
                }
            }), q.defineProperty(gb, "__defineSetter__", {
                enumerable: !1, configurable: !0, value: function (a, b) {
                    q.defineProperty(this, a, {set: b, enumerable: !0, configurable: !0})
                }
            }))
        } catch (c) {
            if (gb.__defineGetter__)q.defineProperty = function (b, c, d) {
                "value"in d ? b[c] = d.value : ("get"in d && a(b,
                    c, d.get), "set"in d && M(b, c, d.set))
            }; else throw pa("Object.defineProperty is minimum required");
        }
        try {
            qb && qb.hasFeature.call && qb.hasFeature("Events.MouseEnter", "3.0") && (kb = "mouseenter"), qb && qb.hasFeature.call && qb.hasFeature("Events.MouseLeave", "3.0") && (ec = "mouseleave")
        } catch (d) {
        }
        la(p.getComputedStyle) && (p.getComputedStyle = function (a, b) {
            this.el = a;
            this.getPropertyValue = function (b) {
                var c = /(\-([a-z]){1})/g;
                "float" == b && (b = "styleFloat");
                c.test(b) && (b = b.replace(c, function (a, b, c) {
                    return Va(c)
                }));
                return a.currentStyle &&
                a.currentStyle[b] ? a.currentStyle[b] : null
            };
            return this
        });
        if (la(fb))throw pa("XMLHttpRequest not supported");
        if (!1 === "1" >= 0)throw pa('Type check is not correctly implemented ("1" >= 0)');
        if (la(Jc.parse('<?xml version="1.0" encoding="UTF-8"?><root></root>')))throw pa("DOMParser is not working correctly");
        if (la(Na)) {
            Na = p.console = {};
            var b = p.alert || ta;
            Na.log = Na.warn = Na.debug = Na.error = Na.info = function () {
                try {
                    b(Ia(arguments).join(" "))
                } catch (a) {
                }
            };
            Na.assert = Na.dir = ta
        }
    })();
    var Ob = p.WebKitCSSMatrix || p.MSCSSMatrix ||
            p.CSSMatrix || function () {
                function a(b) {
                    this.m11 = this.m22 = this.m33 = this.m44 = 1;
                    this.m12 = this.m13 = this.m14 = this.m21 = this.m23 = this.m24 = this.m31 = this.m32 = this.m34 = this.m41 = this.m42 = this.m43 = 0;
                    "string" == typeof b && this.setMatrixValue(b)
                }

                function c(a, c, d, h, f, n, t, k, m) {
                    return a * (f * m - n * k) - h * (c * m - d * k) + t * (c * n - d * f)
                }

                a.displayName = "CSSMatrix";
                var d = a.prototype;
                [["m11", "a"], ["m12", "b"], ["m21", "c"], ["m22", "d"], ["m41", "e"], ["m42", "f"]].forEach(function (a) {
                    var c = a[0];
                    q.defineProperty(d, a[1], {
                        set: function (a) {
                            this[c] = a
                        },
                        get: function () {
                            return this[c]
                        }
                    })
                });
                d.isAffine = function () {
                    return 0 === this.m13 && 0 === this.m14 && 0 === this.m23 && 0 === this.m24 && 0 === this.m31 && 0 === this.m32 && 1 === this.m33 && 0 === this.m34 && 0 === this.m43 && 1 === this.m44
                };
                d.multiply = function (b) {
                    var c = new a;
                    c.m11 = b.m11 * this.m11 + b.m12 * this.m21 + b.m13 * this.m31 + b.m14 * this.m41;
                    c.m12 = b.m11 * this.m12 + b.m12 * this.m22 + b.m13 * this.m32 + b.m14 * this.m42;
                    c.m13 = b.m11 * this.m13 + b.m12 * this.m23 + b.m13 * this.m33 + b.m14 * this.m43;
                    c.m14 = b.m11 * this.m14 + b.m12 * this.m24 + b.m13 * this.m34 + b.m14 * this.m44;
                    c.m21 = b.m21 * this.m11 + b.m22 * this.m21 + b.m23 * this.m31 + b.m24 * this.m41;
                    c.m22 = b.m21 * this.m12 + b.m22 * this.m22 + b.m23 * this.m32 + b.m24 * this.m42;
                    c.m23 = b.m21 * this.m13 + b.m22 * this.m23 + b.m23 * this.m33 + b.m24 * this.m43;
                    c.m24 = b.m21 * this.m14 + b.m22 * this.m24 + b.m23 * this.m34 + b.m24 * this.m44;
                    c.m31 = b.m31 * this.m11 + b.m32 * this.m21 + b.m33 * this.m31 + b.m34 * this.m41;
                    c.m32 = b.m31 * this.m12 + b.m32 * this.m22 + b.m33 * this.m32 + b.m34 * this.m42;
                    c.m33 = b.m31 * this.m13 + b.m32 * this.m23 + b.m33 * this.m33 + b.m34 * this.m43;
                    c.m34 = b.m31 * this.m14 + b.m32 * this.m24 + b.m33 *
                        this.m34 + b.m34 * this.m44;
                    c.m41 = b.m41 * this.m11 + b.m42 * this.m21 + b.m43 * this.m31 + b.m44 * this.m41;
                    c.m42 = b.m41 * this.m12 + b.m42 * this.m22 + b.m43 * this.m32 + b.m44 * this.m42;
                    c.m43 = b.m41 * this.m13 + b.m42 * this.m23 + b.m43 * this.m33 + b.m44 * this.m43;
                    c.m44 = b.m41 * this.m14 + b.m42 * this.m24 + b.m43 * this.m34 + b.m44 * this.m44;
                    return c
                };
                d.isIdentityOrTranslation = function () {
                    return 1 === this.m11 && 0 === this.m12 && 0 === this.m13 && 0 === this.m14 && 0 === this.m21 && 1 === this.m22 && 0 === this.m23 && 0 === this.m24 && 0 === this.m31 && 0 === this.m31 && 1 === this.m33 && 0 === this.m34 &&
                        1 === this.m44
                };
                d.adjoint = function () {
                    var b = new a, d = this.m11, e = this.m12, h = this.m13, f = this.m14, n = this.m21, t = this.m22, k = this.m23, m = this.m24, fa = this.m31, ia = this.m32, g = this.m33, L = this.m34, Z = this.m41, aa = this.m42, D = this.m43, p = this.m44;
                    b.m11 = c(t, ia, aa, k, g, D, m, L, p);
                    b.m21 = -c(n, fa, Z, k, g, D, m, L, p);
                    b.m31 = c(n, fa, Z, t, ia, aa, m, L, p);
                    b.m41 = -c(n, fa, Z, t, ia, aa, k, g, D);
                    b.m12 = -c(e, ia, aa, h, g, D, f, L, p);
                    b.m22 = c(d, fa, Z, h, g, D, f, L, p);
                    b.m32 = -c(d, fa, Z, e, ia, aa, f, L, p);
                    b.m42 = c(d, fa, Z, e, ia, aa, h, g, D);
                    b.m13 = c(e, t, aa, h, k, D, f, m, p);
                    b.m23 = -c(d,
                        n, Z, h, k, D, f, m, p);
                    b.m33 = c(d, n, Z, e, t, aa, f, m, p);
                    b.m43 = -c(d, n, Z, e, t, aa, h, k, D);
                    b.m14 = -c(e, t, ia, h, k, g, f, m, L);
                    b.m24 = c(d, n, fa, h, k, g, f, m, L);
                    b.m34 = -c(d, n, fa, e, t, ia, f, m, L);
                    b.m44 = c(d, n, fa, e, t, ia, h, k, g);
                    return b
                };
                d.inverse = function () {
                    var b, d, e, h;
                    if (this.isIdentityOrTranslation()) {
                        b = new a;
                        if (0 !== this.m41 || 0 !== this.m42 || 0 !== this.m43)b.m41 = -this.m41, b.m42 = -this.m42, b.m43 = -this.m43;
                        return b
                    }
                    b = this.adjoint();
                    d = this.m21;
                    e = this.m31;
                    h = this.m41;
                    var f = this.m12, n = this.m22, t = this.m32, k = this.m42, m = this.m13, fa = this.m23, ia =
                        this.m33, g = this.m43, L = this.m14, Z = this.m24, aa = this.m34, D = this.m44;
                    d = this.m11 * c(n, fa, Z, t, ia, aa, k, g, D) - d * c(f, m, L, t, ia, aa, k, g, D) + e * c(f, m, L, n, fa, Z, k, g, D) - h * c(f, m, L, n, fa, Z, t, ia, aa);
                    if (1E-8 > w.abs(d))return null;
                    for (e = 1; 5 > e; e++)for (h = 1; 5 > h; h++)b["m" + e + h] /= d;
                    return b
                };
                d.rotate = function (b, c, d) {
                    if ("number" != typeof b || isNaN(b))b = 0;
                    "number" == typeof c && !isNaN(c) || "number" == typeof d && !isNaN(d) || (d = b, c = b = 0);
                    if ("number" != typeof c || isNaN(c))c = 0;
                    if ("number" != typeof d || isNaN(d))d = 0;
                    b = b * w.PI / 180;
                    c = c * w.PI / 180;
                    d = d * w.PI /
                        180;
                    var h = new a, f = new a, n = new a, t;
                    d /= 2;
                    t = w.sin(d);
                    d = w.cos(d);
                    n.m11 = n.m22 = 1 - 2 * t * t;
                    n.m12 = n.m21 = 2 * t * d;
                    n.m21 *= -1;
                    c /= 2;
                    t = w.sin(c);
                    d = w.cos(c);
                    f.m11 = f.m33 = 1 - 2 * t * t;
                    f.m13 = f.m31 = 2 * t * d;
                    f.m13 *= -1;
                    b /= 2;
                    t = w.sin(b);
                    d = w.cos(b);
                    h.m22 = h.m33 = 1 - 2 * t * t;
                    h.m23 = h.m32 = 2 * t * d;
                    h.m32 *= -1;
                    return n.multiply(f).multiply(h).multiply(this)
                };
                d.rotateAxisAngle = function (b, c, d, h) {
                    if ("number" != typeof b || isNaN(b))b = 0;
                    if ("number" != typeof c || isNaN(c))c = 0;
                    if ("number" != typeof d || isNaN(d))d = 0;
                    if ("number" != typeof h || isNaN(h))h = 0;
                    0 === b && 0 === c &&
                    0 === d && (d = 1);
                    var f = new a, n = w.sqrt(b * b + c * c + d * d), t, k, m;
                    h = (h * w.PI / 180 || 0) / 2;
                    t = w.cos(h);
                    k = w.sin(h);
                    h = k * k;
                    0 === n ? (c = b = 0, d = 1) : 1 !== n && (b /= n, c /= n, d /= n);
                    1 === b && 0 === c && 0 === d ? (f.m22 = f.m33 = 1 - 2 * h, f.m23 = f.m32 = 2 * t * k, f.m32 *= -1) : 0 === b && 1 === c && 0 === d ? (f.m11 = f.m33 = 1 - 2 * h, f.m13 = f.m31 = 2 * t * k, f.m13 *= -1) : 0 === b && 0 === c && 1 === d ? (f.m11 = f.m22 = 1 - 2 * h, f.m12 = f.m21 = 2 * t * k, f.m21 *= -1) : (n = k * t, t = b * b, k = c * c, m = d * d, f.m11 = 1 - 2 * (k + m) * h, f.m12 = 2 * (b * c * h + d * n), f.m13 = 2 * (b * d * h - c * n), f.m21 = 2 * (c * b * h - d * n), f.m22 = 1 - 2 * (m + t) * h, f.m23 = 2 * (c * d * h + b * n), f.m31 = 2 * (d * b *
                        h + c * n), f.m32 = 2 * (d * c * h - b * n), f.m33 = 1 - 2 * (t + k) * h);
                    return this.multiply(f)
                };
                d.scale = function (c, d, e) {
                    var h = new a;
                    if ("number" != typeof c || isNaN(c))c = 1;
                    if ("number" != typeof d || isNaN(d))d = c;
                    if ("number" != typeof e || isNaN(e))e = 1;
                    h.m11 = c;
                    h.m22 = d;
                    h.m33 = e;
                    return this.multiply(h)
                };
                d.translate = function (c, d, e) {
                    var h = new a;
                    if ("number" != typeof c || isNaN(c))c = 0;
                    if ("number" != typeof d || isNaN(d))d = 0;
                    if ("number" != typeof e || isNaN(e))e = 0;
                    h.m41 = c;
                    h.m42 = d;
                    h.m43 = e;
                    return this.multiply(h)
                };
                d.setMatrixValue = function (a) {
                    a = a && a.trim() ||
                        "";
                    var c = a.match(/^matrix(3d)?\(\s*(.+)\s*\)$/), d, h, f, n;
                    if (c && (a = !!c[1], c = c[2].split(/\s*,\s*/), d = c.length, h = ea(d), !(a && 16 !== d || !a && 6 !== d))) {
                        for (f = 0; f < d; f++)if (n = c[f], n.match(/^-?\d+(\.\d+)?$/))h[f] = parseFloat(n); else return;
                        for (f = 0; f < d; f++)point = a ? "m" + (w.floor(f / 4) + 1) + (f % 4 + 1) : Ra(f + 97), this[point] = h[f]
                    }
                };
                d.toString = function () {
                    var a = this, c, d;
                    this.isAffine() ? (d = "matrix(", c = "abcdef".split("")) : (d = "matrix3d(", c = "m11 m12 m13 m14 m21 m22 m23 m24 m31 m32 m33 m34 m41 m42 m43 m44".split(" "));
                    return d + c.map(function (c) {
                            return a[c].toFixed(6)
                        }).join(", ") +
                        ")"
                };
                return a
            }(), Nc = function () {
            var a;
            return {
                log: function (c) {
                    if (null === c)a.destroy(), a = r; else {
                        var d = la(a) && Sa("viewport");
                        d && (a = ya("pre"), a.style.width = "100%", a.style.height = B("screenDebugHeight") || 110, a.setStyles({
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
                        a && (a.innerHTML += c + "\n", a.style.height = B("screenDebugHeight") || 110, a.scrollTop = (a.scrollTop || 0) + 25)
                    }
                }
            }
        }(),
        U = function (a) {
            try {
                Hb(a)
            } catch (c) {
            }
        };
    (function () {
        var a = Lc + "+/=";
        la(rc) && (p.btoa = rc = function (c) {
            for (var d, b, l, e, h, f, n = 0, t = c.length, k = w.max, m = ""; n < t;) {
                d = c.charCodeAt(n++) || 0;
                b = c.charCodeAt(n++) || 0;
                f = c.charCodeAt(n++) || 0;
                if (255 < k(d, b, f))throw pa("Invalid character");
                l = d >> 2 & 63;
                d = (d & 3) << 4 | b >> 4 & 15;
                e = (b & 15) << 2 | f >> 6 & 3;
                h = f & 63;
                b ? f || (h = 64) : e = h = 64;
                m += a.charAt(l) + a.charAt(d) + a.charAt(e) + a.charAt(h)
            }
            return m
        });
        la(Gc) && (p.atob = Gc = function (c) {
            c = c.replace(/=+$/, "");
            var d, b, l, e, h = 0, f = c.length, n = [];
            if (1 === f % 4)throw pa("Invalid character");
            for (; h < f;)d = a.indexOf(c.charAt(h++)), b = a.indexOf(c.charAt(h++)), l = a.indexOf(c.charAt(h++)), e = a.indexOf(c.charAt(h++)), d = (d & 63) << 2 | b >> 4 & 3, b = (b & 15) << 4 | l >> 2 & 15, l = (l & 3) << 6 | e & 63, n.push(Ra(d)), b && n.push(Ra(b)), l && n.push(Ra(l));
            return n.join("")
        })
    })();
    (function () {
        if (la(Ca)) {
            var a = function (a, c) {
                return a + c & 4294967295
            }, c = function (c, b, d, h, l, g) {
                b = a(a(b, c), a(h, g));
                return a(b << l | b >>> 32 - l, d)
            }, d = function (a, b, d, h, l, g, L) {
                return c(b & d | ~b & h, a, b, l, g, L)
            }, b = function (a, b, d, h, l, g, L) {
                return c(b & h | d & ~h, a, b, l, g, L)
            }, l = function (a,
                             b, d, h, l, g, L) {
                return c(d ^ (b | ~h), a, b, l, g, L)
            }, e = function (h, k) {
                var m = h[0], e = h[1], f = h[2], g = h[3], m = d(m, e, f, g, k[0], 7, -680876936), g = d(g, m, e, f, k[1], 12, -389564586), f = d(f, g, m, e, k[2], 17, 606105819), e = d(e, f, g, m, k[3], 22, -1044525330), m = d(m, e, f, g, k[4], 7, -176418897), g = d(g, m, e, f, k[5], 12, 1200080426), f = d(f, g, m, e, k[6], 17, -1473231341), e = d(e, f, g, m, k[7], 22, -45705983), m = d(m, e, f, g, k[8], 7, 1770035416), g = d(g, m, e, f, k[9], 12, -1958414417), f = d(f, g, m, e, k[10], 17, -42063), e = d(e, f, g, m, k[11], 22, -1990404162), m = d(m, e, f, g, k[12], 7, 1804603682),
                    g = d(g, m, e, f, k[13], 12, -40341101), f = d(f, g, m, e, k[14], 17, -1502002290), e = d(e, f, g, m, k[15], 22, 1236535329), m = b(m, e, f, g, k[1], 5, -165796510), g = b(g, m, e, f, k[6], 9, -1069501632), f = b(f, g, m, e, k[11], 14, 643717713), e = b(e, f, g, m, k[0], 20, -373897302), m = b(m, e, f, g, k[5], 5, -701558691), g = b(g, m, e, f, k[10], 9, 38016083), f = b(f, g, m, e, k[15], 14, -660478335), e = b(e, f, g, m, k[4], 20, -405537848), m = b(m, e, f, g, k[9], 5, 568446438), g = b(g, m, e, f, k[14], 9, -1019803690), f = b(f, g, m, e, k[3], 14, -187363961), e = b(e, f, g, m, k[8], 20, 1163531501), m = b(m, e, f, g, k[13], 5, -1444681467),
                    g = b(g, m, e, f, k[2], 9, -51403784), f = b(f, g, m, e, k[7], 14, 1735328473), e = b(e, f, g, m, k[12], 20, -1926607734), m = c(e ^ f ^ g, m, e, k[5], 4, -378558), g = c(m ^ e ^ f, g, m, k[8], 11, -2022574463), f = c(g ^ m ^ e, f, g, k[11], 16, 1839030562), e = c(f ^ g ^ m, e, f, k[14], 23, -35309556), m = c(e ^ f ^ g, m, e, k[1], 4, -1530992060), g = c(m ^ e ^ f, g, m, k[4], 11, 1272893353), f = c(g ^ m ^ e, f, g, k[7], 16, -155497632), e = c(f ^ g ^ m, e, f, k[10], 23, -1094730640), m = c(e ^ f ^ g, m, e, k[13], 4, 681279174), g = c(m ^ e ^ f, g, m, k[0], 11, -358537222), f = c(g ^ m ^ e, f, g, k[3], 16, -722521979), e = c(f ^ g ^ m, e, f, k[6], 23, 76029189),
                    m = c(e ^ f ^ g, m, e, k[9], 4, -640364487), g = c(m ^ e ^ f, g, m, k[12], 11, -421815835), f = c(g ^ m ^ e, f, g, k[15], 16, 530742520), e = c(f ^ g ^ m, e, f, k[2], 23, -995338651), m = l(m, e, f, g, k[0], 6, -198630844), g = l(g, m, e, f, k[7], 10, 1126891415), f = l(f, g, m, e, k[14], 15, -1416354905), e = l(e, f, g, m, k[5], 21, -57434055), m = l(m, e, f, g, k[12], 6, 1700485571), g = l(g, m, e, f, k[3], 10, -1894986606), f = l(f, g, m, e, k[10], 15, -1051523), e = l(e, f, g, m, k[1], 21, -2054922799), m = l(m, e, f, g, k[8], 6, 1873313359), g = l(g, m, e, f, k[15], 10, -30611744), f = l(f, g, m, e, k[6], 15, -1560198380), e = l(e, f, g, m,
                        k[13], 21, 1309151649), m = l(m, e, f, g, k[4], 6, -145523070), g = l(g, m, e, f, k[11], 10, -1120210379), f = l(f, g, m, e, k[2], 15, 718787259), e = l(e, f, g, m, k[9], 21, -343485551);
                h[0] = a(m, h[0]);
                h[1] = a(e, h[1]);
                h[2] = a(f, h[2]);
                h[3] = a(g, h[3])
            }, h = function (a) {
                var c = a.length, b = [1732584193, -271733879, -1732584194, 271733878], d, f, g;
                for (d = 64; d <= c; d += 64) {
                    g = a.substring(d - 64, d);
                    f = [];
                    for (var L = void 0, L = 0; 64 > L; L += 4)f[L >> 2] = g.charCodeAt(L) + (g.charCodeAt(L + 1) << 8) + (g.charCodeAt(L + 2) << 16) + (g.charCodeAt(L + 3) << 24);
                    e(b, f)
                }
                a = a.substring(d - 64);
                f = a.length;
                g = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (d = 0; d < f; d += 1)g[d >> 2] |= a.charCodeAt(d) << (d % 4 << 3);
                g[d >> 2] |= 128 << (d % 4 << 3);
                if (55 < d)for (e(b, g), d = 0; 16 > d; d += 1)g[d] = 0;
                c = (8 * c).toString(16).match(/(.*?)(.{0,8})$/);
                a = ma(c[2], 16);
                c = ma(c[1], 16) || 0;
                g[14] = a;
                g[15] = c;
                e(b, g);
                return b
            }, f = "0123456789abcdef".split(""), n = function (a) {
                var c;
                for (c = 0; c < a.length; c += 1) {
                    for (var b = c, d = a[c], e = "", g = void 0, g = 0; 4 > g; g += 1)e += f[d >> 8 * g + 4 & 15] + f[d >> 8 * g & 15];
                    a[b] = e
                }
                return a.join("")
            };
            "b48ce274efe63bc264a6e101f867da83" !== n(h(Fa)) && (a = function (a, c) {
                var b =
                    (a & 65535) + (c & 65535);
                return (a >> 16) + (c >> 16) + (b >> 16) << 16 | b & 65535
            });
            Ca = function (a) {
                return n(h(a))
            }
        }
    })();
    var hc = function () {
        function a(c, b) {
            var d = [], e;
            if (b.global)for (; e = b.exec(c);)d.push(e[1]); else(e = b.exec(c)) && d.push(e[1]);
            return d
        }

        function c(a) {
            return "-moz-" !== Ya ? a.toString() : "matrix(" + "abcdef".split("").map(function (c, b) {
                var d = a[c].toFixed(6);
                3 < b && (d += "px");
                return d
            }).join(", ") + ")"
        }

        function d(a, c) {
            var b;
            switch (a) {
                case "rad":
                    return c;
                case "deg":
                    b = w.PI / 180;
                    break;
                case "grad":
                    b = w.PI / 200;
                    break;
                case "turn":
                    b =
                        2 * w.PI
            }
            return b * c
        }

        function b(a) {
            return a ? a instanceof ea ? a : [a.x, a.y, a.z] : null
        }

        function l(a, c) {
            return function (b) {
                var d, e;
                if ("number" == typeof b)return [c, b];
                if ("string" != typeof b)return null;
                e = (b.match(r) || [""])[0];
                return (d = e.length === b.length ? c : a.filter(function (a) {
                    return b.substr(e.length) === a
                })[0]) && e ? [d, parseFloat(e)] : null
            }
        }

        function e(a, c) {
            this.ctm = a || new Ob;
            this.centre = b(c) || ["50%", "50%", 0]
        }

        function h() {
            this.properties = ["all"];
            this.duration = ["ms", 0];
            this.delay = ["ms", 0];
            this.timingFunction = "ease"
        }

        function f(a, c) {
            var b;
            "function" == typeof a.callback && (this.callback = a.callback);
            delete a.callback;
            b = h.parse(a, c);
            this.transition = b.result;
            b = e.parse(b.remainder, c);
            this.transform = b.result;
            this.style = b.remainder
        }

        function n(a) {
            this.element = a;
            this.operations = [];
            this.callback = null
        }

        function p() {
            var a = this.callback;
            if ("function" === typeof a)try {
                a.call(this.element, this)
            } catch (c) {
                throw c;
            }
        }

        function k(a) {
            this.operations.push(a);
            this.lastAnimation = a;
            this.fired && (this.fired = !1, this.run());
            return this
        }

        var m = {ZORDER: 99999},
            r = /^-?\d+(\.\d+)?/, x = l(["deg", "grad", "rad", "turn"], "deg"), g = l(["s", "ms"], "s");
        e.methods = "translate translate3d translateX translateY translateZ scale scale3d scaleX scaleY scaleZ rotate rotate3d rotateX rotateY rotateZ skew skewX skewY matrix matrix3d".split(" ");
        e.parse = function (a, c) {
            var b = e.methods, d = {}, f = null, g, h;
            "object" === typeof c && c.transform && (g = c.transform.ctm, h = c.transform.centre, f = new e(g, h));
            q.forEach(a, function (c) {
                -1 !== b.indexOf(c) ? (f = f || new e, f[c](a[c])) : "origin" === c ? (f = f || new e, f[c](a[c])) :
                    d[c] = a[c]
            });
            return {result: f, remainder: d}
        };
        e.prototype.build = function (a) {
            var b = this.centre;
            "-o-" === Ya && (b = b.slice(0, 2));
            a = a || {};
            a.transform = (a.transform || "") + c(this.ctm);
            a.transformOrigin = b.join(" ");
            return a
        };
        e.prototype.matrix = e.prototype.matrix3d = function (a) {
            var c = new Ob;
            6 === a.length ? (c.a = a[0], c.b = a[1], c.c = a[2], c.d = a[3], c.e = a[4], c.f = a[5]) : (c.m11 = a[0], c.m12 = a[1], c.m13 = a[2], c.m14 = a[3], c.m21 = a[4], c.m22 = a[5], c.m23 = a[6], c.m24 = a[7], c.m31 = a[8], c.m32 = a[9], c.m33 = a[10], c.m34 = a[11], c.m41 = a[12], c.m42 = a[13],
                c.m43 = a[14], c.m44 = a[15]);
            this.ctm = this.ctm.multiply(c)
        };
        e.prototype.translate = e.prototype.translate3d = function (a) {
            var c, d;
            "number" == typeof a || "string" == typeof a ? (a = d = ma(a) || 0, c = 0) : (c = b(a), a = c[0], d = c[1], c = c[2], "number" != typeof a && (a = ma(a) || 0), "number" != typeof d && (d = ma(d) || 0), "number" != typeof c && (c = ma(c) || 0));
            this.ctm = this.ctm.translate(a, d, c)
        };
        e.prototype.translateX = function (a) {
            this.translate([a, 0])
        };
        e.prototype.translateY = function (a) {
            this.translate([0, a])
        };
        e.prototype.translateZ = function (a) {
            this.translate3d([0,
                0, a])
        };
        e.prototype.scale = e.prototype.scale3d = function (a) {
            var c, d;
            "number" == typeof a ? (a = d = a, c = 1) : (c = b(a), a = c[0], d = c[1], c = c[2]);
            this.ctm = this.ctm.scale(a, d, c)
        };
        e.prototype.scaleX = function (a) {
            this.scale3d([a, 1, 1])
        };
        e.prototype.scaleY = function (a) {
            this.scale3d([1, a, 1])
        };
        e.prototype.scaleZ = function (a) {
            this.scale3d([1, 1, a])
        };
        e.prototype.skew = function (a) {
            var c;
            "number" == typeof a || "string" == typeof a ? c = a = d.apply(null, x(a)) || 0 : (a = b(a), c = d.apply(null, x(a[0])) || 0, a = d.apply(null, x(a[1])) || 0);
            this.matrix([1, w.tan(a),
                w.tan(c), 1, 0, 0])
        };
        e.prototype.skewX = function (a) {
            this.skew([a, 0])
        };
        e.prototype.skewY = function (a) {
            this.skew([0, a])
        };
        e.prototype.rotate = function (a) {
            a = d.apply(null, x(a)) * (180 / w.PI);
            this.ctm = this.ctm.rotate(0, 0, a)
        };
        e.prototype.rotate3d = function (a) {
            var c = a.x, b = a.y, e = a.z;
            a = a.angle;
            "number" != typeof c && (c = 0);
            "number" != typeof b && (b = 0);
            "number" != typeof e && (e = 0);
            a = d.apply(null, x(a)) * (180 / w.PI);
            this.ctm = this.ctm.rotateAxisAngle(c, b, e, a)
        };
        e.prototype.rotateX = function (a) {
            this.rotate3d({x: 1, angle: a})
        };
        e.prototype.rotateY =
            function (a) {
                this.rotate3d({y: 1, angle: a})
            };
        e.prototype.rotateZ = function (a) {
            this.rotate3d({z: 1, angle: a})
        };
        e.prototype.origin = function (a) {
            a = b(a);
            var c;
            if (c = a[0])this.centre[0] = c;
            if (c = a[1])this.centre[1] = c;
            if (a = a[2])this.centre[2] = a
        };
        h.methods = ["properties", "timingFunction", "duration", "delay"];
        h.parse = function (a, c) {
            var b = h.methods, d = {}, e = new h, f, l;
            q.forEach(a, function (c) {
                -1 !== b.indexOf(c) ? "properties" === c && "string" == typeof c ? e[c] = [a[c]] : "timingFunction" === c && "string" !== typeof a[c] ? e[c] = "cubic-bezier(" +
                    a[c].join(",") + ")" : "duration" === c ? (f = g(a[c])) && (e[c] = f) : "delay" === c ? (l = g(a[c])) && (e[c] = l) : e[c] = a[c] : d[c] = a[c]
            });
            return {result: e, remainder: d}
        };
        h.prototype.hasDuration = function () {
            return 0 !== this.duration[1]
        };
        h.prototype.getDuration = function () {
            var a = this.duration;
            return "s" === a[0] ? 1E3 * a[1] : a[1]
        };
        h.prototype.hasDelay = function () {
            return 0 !== this.delay[1]
        };
        h.prototype.getDelay = function () {
            var a = this.delay;
            return "s" === a[0] ? 1E3 * a[1] : a[1]
        };
        h.prototype.build = function (a) {
            a = a || {};
            a.transitionProperty = "string" == typeof this.properties ? this.properties : this.properties.join(", ");
            a.transitionDuration = this.duration[1] + this.duration[0];
            a.transitionDelay = this.delay[1] + this.delay[0];
            this.timingFunction && (a.transitionTimingFunction = this.timingFunction);
            return a
        };
        f.prototype.hasDuration = function () {
            return this.transition && this.transition.hasDuration()
        };
        f.prototype.getTotalDuration = function () {
            return this.transition ? this.transition.getDuration() + this.transition.getDelay() : 0
        };
        f.prototype.exec = function (c) {
            var b = this.style;
            !1 !== B("animation") && this.transition && (b = this.transition.build(b));
            this.transform && (b = this.transform.build(b));
            var d = (Ya + "transform".hyphenate()).camelize();
            if (c && c.element && c.element.style[d]) {
                var e = "string" === typeof b.transform && a(b.transform, /(?:(\w+)(?:\([\S\s]*?\)))/gi) || [], f = "string" === typeof b.transform && a(b.transform, /((?:\w+)\([\S\s]+?\))/gi) || [];
                b.transform = c.element.style[d];
                for (var g = 0; g < e.length; g++)-1 === c.element.style[d].indexOf(e[g] + "(") ? b.transform += " " + f[g] : b.transform = b.transform.replace(eb("(" +
                    e[g] + "\\([^)]*\\))", "gmi"), f[g])
            }
            c.setStyles(b)
        };
        n.prototype.run = function () {
            var a = this, c = a.operations.shift();
            if (!c)return a.fired = !0, a;
            var b = !1 === B("animation") ? 10 : c.getTotalDuration() || 10;
            Kb(function () {
                c.exec(a.element)
            }, 10);
            a.internalTimeout = Kb(function () {
                delete a.internalTimeout;
                p.call(a);
                a.run()
            }, b);
            a.callback = c.callback;
            return a
        };
        n.prototype.pause = function () {
            this.element && this.element.setStyle("animationPlayState", "paused")
        };
        n.prototype.resume = function () {
            this.element && this.element.setStyle("animationPlayState",
                null)
        };
        n.prototype.reset = function () {
            this.callback = null;
            this.internalTimeout && (hb(this.internalTimeout), delete this.internalTimeout);
            this.element && this.element.setStyle("transition", null)
        };
        n.prototype.animate = function (a, c) {
            !a.callback && c && (a.callback = c);
            return !0 === a.relative && this.lastAnimation ? k.call(this, new f(a, this.lastAnimation)) : k.call(this, new f(a))
        };
        m.animate = function (a, c, b) {
            var d = new n(a);
            if (!0 === c.relative) {
                var g = new f({}), h = new e, l = new Ob;
                l.setMatrixValue(a.style[Nb]);
                h.ctm = l;
                g.transform =
                    h;
                d.lastAnimation = g
            }
            d.animate(c, b);
            return d.run()
        };
        e.methods.forEach(function (a) {
            m[a] = function (c, b, d, e) {
                var f = {};
                f[a] = b;
                return m.animate(c, f, d, e)
            };
            n.prototype[a] = function (c, b, d) {
                var e = {};
                e[a] = c;
                return this.animate(e, b, d)
            }
        });
        return m
    }();
    (function () {
        try {
            Qa(Fa)
        } catch (a) {
            bc = r
        }
        la(bc) && (bc = function (a, c) {
            var l;
            try {
                l = Q.createEvent("CustomEvent")
            } catch (e) {
            }
            if (!l)try {
                l = Q.createEvent("Event")
            } catch (h) {
            }
            if (!l)try {
                l = Q.createEvent("HTMLEvent")
            } catch (f) {
            }
            c = c || {};
            c.detail = c.detail || null;
            c.bubbles = !0 === c.bubbles;
            c.catchable = !0 === c.catchable;
            if (l && l.initCustomEvent)l.initCustomEvent(a, c.bubbles, c.catchable, c.detail); else if (l && l.initEvent)l.initEvent(a, c.bubbles, c.catchable), l.detail = c.detail; else throw pa("No CustomEvent support");
            return l
        });
        var c = function (a) {
            "object" !== x(a.detail) && Ga("Event implementation is incorrect");
            p.removeEventListener(Fa, c)
        };
        p.addEventListener(Fa, c);
        Q.dispatchEvent(Qa(Fa, {}, !0))
    })();
    (function () {
        function a(c) {
            return 10 > c ? "0" + c : c
        }

        function c(a) {
            l.lastIndex = 0;
            return l.test(a) ? '"' + a.replace(l,
                function (a) {
                    var c = n[a];
                    return "string" === x(c) ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + a + '"'
        }

        function d(a, b) {
            var l, n, g, p, r = e, aa, D = b[a];
            D && "object" === x(D) && "function" === x(D.toJSON) && (D = D.toJSON(a));
            "function" === x(f) && (D = f.call(b, a, D));
            switch (typeof D) {
                case "string":
                    return c(D);
                case "number":
                    return isFinite(D) ? N(D) : "null";
                case "boolean":
                case "null":
                    return N(D);
                case "object":
                    if (!D)return "null";
                    e += h;
                    aa = [];
                    if ("[object Array]" === Ic.call(D)) {
                        p = D.length;
                        for (l = 0; l < p; l += 1)aa[l] = d(l,
                                D) || "null";
                        g = 0 === aa.length ? "[]" : e ? "[\n" + e + aa.join(",\n" + e) + "\n" + r + "]" : "[" + aa.join(",") + "]";
                        e = r;
                        return g
                    }
                    if (f && "object" === typeof f)for (p = f.length, l = 0; l < p; l += 1)"string" === typeof f[l] && (n = f[l], (g = d(n, D)) && aa.push(c(n) + (e ? ": " : ":") + g)); else for (n in D)qa(D, n) && (g = d(n, D)) && aa.push(c(n) + (e ? ": " : ":") + g);
                    g = 0 === aa.length ? "{}" : e ? "{\n" + e + aa.join(",\n" + e) + "\n" + r + "}" : "{" + aa.join(",") + "}";
                    e = r;
                    return g
            }
        }

        la(ka) && (ka = p.JSON = {});
        "function" !== x(dd.toJSON) && (dataProto.toJSON = function () {
            return isFinite(this.valueOf()) ?
            this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
        }, na.toJSON = Ab.prototype.toJSON = qc.prototype.toJSON = function () {
            return this.valueOf()
        });
        var b = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, l = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, h, f, n = {
            "\b": "\\b",
            "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"
        };
        "function" !== x(ka.stringify) && (ka.stringify = function (a, c, b) {
            var l;
            h = e = "";
            if ("number" === x(b))for (l = 0; l < b; l += 1)h += " "; else"string" === x(b) && (h = b);
            if ((f = c) && "function" !== x(c) && ("object" !== x(c) || "number" !== x(c.length)))throw pa("JSON.stringify");
            return d("", {"": a})
        });
        "function" !== x(ka.parse) && (ka.parse = function (a, c) {
            function d(a, b) {
                var e, f = a[b];
                f && "object" === x(f) && qa(f, void 0) && (e = d(f, void 0), X(e) ? f[void 0] = e : delete f[void 0]);
                return c.call(a,
                    b, f)
            }

            var e;
            a = N(a);
            b.lastIndex = 0;
            b.test(a) && (a = a.replace(b, function (a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return e = yb("return (" + a + ")").call(null), "function" === x(c) ? d({"": e}, "") : e;
            throw pa("JSON.parse");
        });
        if ("function" !== x(ka.fromXML))var r = ka.fromXML = function (a) {
            var c = {};
            if (1 == a.nodeType) {
                if (0 <
                    a.attributes.length) {
                    c["@attributes"] = {};
                    for (var b = 0; b < a.attributes.length; b++) {
                        var d = a.attributes.item(b);
                        c["@attributes"][d.nodeName] = d.nodeValue
                    }
                }
            } else 3 == a.nodeType && (c = a.nodeValue);
            if (a.hasChildNodes())for (b = 0; b < a.childNodes.length; b++) {
                var d = a.childNodes.item(b), e = d.nodeName;
                if ("undefined" == typeof c[e])c[e] = r(d); else {
                    if ("undefined" == typeof c[e].push) {
                        var f = c[e];
                        c[e] = [];
                        c[e].push(f)
                    }
                    c[e].push(r(d))
                }
            }
            return c
        }
    })();
    (function () {
        K.forEach || (K.forEach = function (a, d) {
            var b = 0;
            if (la(this))throw bb;
            var l =
                q(this), e = l.length >>> 0;
            for (Ea(a); b < e;)b in l && qa(l, b) && a.call(d, l[b], b, l), b++
        });
        K.each || q.defineProperty(K, "each", {
            enumerable: !1, configurable: !1, writable: !1, value: function (a, d) {
                var b = 0;
                if (la(this))throw bb;
                var l = q(this), e = l.length >>> 0;
                for (Ea(a); b < e && !(b in l && qa(l, b) && !1 === a.call(d, l[b], b, l));)b++
            }
        });
        K.lastIndexOf || q.defineProperty(K, "lastIndexOf", {
            enumerable: !1, configurable: !1, writable: !1, value: function (a) {
                if (la(this))throw bb;
                var d, b = q(this), l = b.length >>> 0;
                if (0 === l)return -1;
                d = l - 1;
                1 < arguments.length &&
                (d = Ab(arguments[1]), d != d ? d = 0 : 0 !== d && d != 1 / 0 && d != -(1 / 0) && (d = (0 < d || -1) * w.floor(w.abs(d))));
                for (d = 0 <= d ? w.min(d, l - 1) : l - w.abs(d); 0 <= d; d--)if (d in b && b[d] === a)return d;
                return -1
            }
        });
        K.unique || q.defineProperty(K, "unique", {
            enumerable: !1, configurable: !1, writable: !1, value: function () {
                return this.filter(function (a, d, b) {
                    return b.indexOf(a) === d
                })
            }
        });
        K.merge || q.defineProperty(K, "merge", {
            enumerable: !1, configurable: !1, writable: !1, value: function () {
                for (var a = 0; a < arguments.length; a++)for (var d = arguments[a], b = 0; b < d.length; b++)-1 ===
                this.indexOf(d[b]) && this.push(d[b]);
                return this
            }
        });
        K.erase || q.defineProperty(K, "erase", {
            enumerable: !1, configurable: !1, writable: !1, value: function () {
                this.length = 0;
                return this
            }
        });
        K.contains || q.defineProperty(K, "contains", {
            enumerable: !1,
            configurable: !1,
            writable: !1,
            value: function (a) {
                return -1 < this.indexOf(a)
            }
        });
        K.shuffle || q.defineProperty(K, "shuffle", {
            enumerable: !1, configurable: !1, writable: !1, value: function (a) {
                for (var d, b = this.length, l = a ? this : this.concat(); --b;)a = w.floor(w.random() * b), d = l[a], l[a] = l[b],
                    l[b] = d;
                return l
            }
        });
        K.indexOf || (K.indexOf = function (a) {
            for (var d = 0; d < this.length; d++)if (this[d] === a)return d;
            return -1
        });
        K.map || q.defineProperty(K, "map", {
            enumerable: !1, configurable: !1, writable: !1, value: function (a, d) {
                if (la(this))throw bb;
                var b = this.length >>> 0, l = ea(b);
                Ea(a);
                for (var e = 0; e < b; e++)e in this && qa(this, e) && (l[e] = a.call(d, this[e], e, this));
                return l
            }
        });
        K.pluck || q.defineProperty(K, "pluck", {
            enumerable: !1, configurable: !1, writable: !1, value: function (a) {
                return this.map(function (d) {
                    return d[a]
                })
            }
        });
        K.filter ||
        q.defineProperty(K, "filter", {
            enumerable: !1, configurable: !1, writable: !1, value: function (a, d) {
                if (la(this))throw bb;
                var b = q(this), l = b.length >>> 0;
                Ea(a);
                for (var e = [], h = 0; h < l; h++)if (h in b && qa(b, h)) {
                    var f = b[h];
                    a.call(d, f, h, b) && e.push(f)
                }
                return e
            }
        });
        K.every || q.defineProperty(K, "every", {
            enumerable: !1,
            configurable: !1,
            writable: !1,
            value: function (a, d) {
                if (la(this))throw bb;
                var b = q(this), l = b.length >>> 0;
                Ea(a);
                for (var e = 0; e < l; e++)if (e in b && qa(b, e) && !a.call(d, b[e], e, b))return !1;
                return !0
            }
        });
        K.some || q.defineProperty(K,
            "some", {
                enumerable: !1, configurable: !1, writable: !1, value: function (a, d) {
                    if (la(this))throw bb;
                    var b = q(this), l = b.length >>> 0;
                    Ea(a);
                    for (var e = 0; e < l; e++)if (e in b && qa(b, e) && a.call(d, b[e], e, b))return !0;
                    return !1
                }
            });
        K.clean || q.defineProperty(K, "clean", {
            enumerable: !1, configurable: !1, writable: !1, value: function (a) {
                return this.filter(function (d) {
                    return null !== d && X(d) && !("string" === typeof d && !0 !== a && "" === d)
                })
            }
        });
        K.diff || q.defineProperty(K, "diff", {
            enumerable: !1, configurable: !1, writable: !1, value: function (a) {
                return this.filter(function (d) {
                    return -1 ===
                        a.indexOf(d)
                })
            }
        });
        K.clone || q.defineProperty(K, "clone", {
            enumerable: !1, configurable: !1, writable: !1, value: function () {
                return xa(this)
            }
        });
        K.keySort || function () {
            q.defineProperty(K, "keySort", {
                enumerable: !1, configurable: !1, writable: !1, value: function (a) {
                    a = a || {};
                    var d = "object" === x(a) ? q.keys(a) : [], b = d.length;
                    if (!b)return this.sort(a);
                    q.forEach(a, function (a, c) {
                        this[a] = "desc" === c || -1 === c ? -1 : "skip" === c || 0 === c ? 0 : 1
                    }, a);
                    this.sort(function (l, e) {
                        for (var h = 0, f = 0; 0 === h && f < b;) {
                            var n = d[f];
                            if (n) {
                                var h = l[n], p = e[n], n = a[n],
                                    n = null !== n ? n : 1, h = h == p ? 0 : h > p ? 1 * n : -1 * n;
                                f++
                            }
                        }
                        return h
                    });
                    return this
                }
            })
        }();
        ea.forEach || (ea.forEach = function (a, d, b) {
            K.forEach.call(a, d, b)
        });
        ea.each || (ea.each = function (a, d, b) {
            K.each.call(a, d, b)
        });
        ea.slice || (ea.slice = function (a, d, b) {
            return K.slice.call(a, d, b)
        });
        ea.from || (ea.from = function (a) {
            return "object" === x(a) ? [a] : Ia(a)
        });
        ea.of || (ea.of = function () {
            return Ia(arguments)
        });
        ea.pluck || (ea.pluck = function (a, d) {
            return a && K.pluck.call(a, d) || []
        });
        ea.push || (ea.push = function (a, d) {
            return a && K.push.call(a, d) || []
        });
        ea.join ||
        (ea.join = function (a, d) {
            return a && K.join.call(a, d) || []
        });
        wa.bind || (wa.bind = function (a) {
            var d = K.slice.call(arguments, 1), b = this, l = function () {
            }, e = function () {
                return b.apply(this instanceof l && a ? this : a, d.concat(Ia(arguments)))
            };
            l.prototype = this.prototype;
            e.prototype = new l;
            return e
        });
        wa.bindTo || (wa.bindTo = wa.bind);
        wa.pass || (wa.pass = function (a, d) {
            a = a || [];
            a = [].concat(a);
            var b = this;
            return function () {
                return b.apply(d, a.concat(Ia(arguments)))
            }
        });
        wa.delay || (wa.delay = function (a, d, b) {
            return Kb(this.pass(b, d), a)
        });
        wa.defer || (wa.defer = wa.delay);
        wa.periodical || (wa.periodical = function (a, d, b) {
            return Pb(this.pass(b, d), a)
        });
        q.merge || (q.merge = Ka);
        q.forEach || (q.forEach = function (a, d, b) {
            for (var l in a)l in a && qa(a, l) && d.call(b || a, l, a[l], a)
        });
        q.sort || (q.sort = function (a) {
            var d = {};
            q.keys(a).sort().forEach(function (b) {
                d[b] = a[b]
            });
            return d
        });
        q.each || (q.each = function (a, d, b) {
            for (var l in a)if (l in a && qa(a, l) && !1 === d.call(b || a, l, a[l], a))break
        });
        q.keyOf || (q.keyOf = function (a, d) {
            for (var b in a)if (b === d)return b;
            return r
        });
        q.indexOf ||
        (q.indexOf = function (a, d) {
            for (var b in a)if (a[b] === d)return b;
            return r
        });
        q.flip || (q.flip = function (a) {
            var d = {}, b;
            for (b in a)b in a && qa(a, b) && (d[a[b]] = b);
            return d
        });
        q.keys || (q.keys = function (a) {
            var d = [], b;
            for (b in a)b in a && qa(a, b) && d.push(b);
            return d
        });
        q.values || (q.values = function (a) {
            var d = [], b;
            for (b in a)b in a && qa(a, b) && d.push(a[b]);
            return d
        });
        q.contains || (q.contains = function (a, d, b) {
            var l, e = !1, h;
            for (h in a)if (h in a && qa(a, h) && (l = b ? h : a[h], l === d)) {
                e = h;
                break
            }
            return e
        });
        q.clone || (q.clone = function (a) {
            return xa(a)
        });
        q.create || (q.create = function () {
            var a = function () {
            };
            return function (d) {
                if (1 < arguments.length)throw pa("Second argument not supported");
                if ("object" != typeof d)throw bb("Argument must be an object");
                a.prototype = d;
                var b = new a;
                a.prototype = null;
                return b
            }
        }());
        if (!q.toQueryString) {
            var a = function (a) {
                return "%" + a.charCodeAt(0).toString(16)
            };
            q.toQueryString = function (c) {
                var d = [], b = function (c, e) {
                    e || (e = "");
                    for (var h in c) {
                        var f = c[h];
                        f && ("" !== e && (h = e + "[" + h + "]"), "object" === x(f) ? b(f, h) : d.push(encodeURIComponent(h) + "=" +
                            encodeURIComponent(f).replace(/[!*()']/g, a)))
                    }
                };
                b(c);
                return d.join("&")
            }
        }
        q.getFromPath || (q.getFromPath = function (a, d) {
            "string" === typeof d && (d = d.split("."));
            for (var b = 0, l = d.length; b < l; b++)if (qa(a, d[b]))a = a[d[b]]; else return null;
            return a
        });
        da.now || (da.now = function () {
            return +new Date
        });
        N.sprintf || (N.sprintf = Yc);
        N.htmlDecode || (N.htmlDecode = function (a) {
            var d = ya("a");
            d.innerHTML = a;
            return d.textContent
        });
        N.vsprintf || (N.vsprintf = function (a, d) {
            return N.sprintf.apply(this, [a].concat(d))
        });
        N.parseQueryString ||
        (N.parseQueryString = function (a) {
            return vb(a)
        });
        na.trim || (na.trim = function () {
            return N(this).replace(/^\s+|\s+$/g, "")
        });
        na.truncate || (na.truncate = function (a) {
            return this.length > a ? this.substr(0, a).replace(/\W*\s(\S)*$/, "&hellip;") : this
        });
        na.stripTags || (na.stripTags = function (a, d) {
            return N(this).replace($c(a, d), "")
        });
        na.htmlEscape || (na.htmlEscape = function () {
            return N(this).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        });
        na.clean || (na.clean =
            function () {
                return N(this).replace(/\s+/g, " ").trim()
            });
        na.repeat || (na.repeat = function (a, d) {
            a = Yb(a) ? 1 : a;
            for (var b = [], l = a; l--;)b.push(N(this));
            return b.join(d || "")
        });
        na.reverse || (na.reverse = function () {
            return Ia(this).reverse().join("")
        });
        na.camelize || (na.camelize = function () {
            return N(this).replace(/-\D/g, function (a) {
                return Va(a.charAt(1))
            })
        });
        na.capitalize || (na.capitalize = function () {
            return N(this).replace(/\b[a-z]/g, function (a) {
                return Va(a)
            })
        });
        na.hyphenate || (na.hyphenate = function () {
            return N(this).replace(/[A-Z]/g,
                function (a) {
                    return "-" + Aa(a.charAt(0))
                })
        });
        na.contains || (na.contains = function (a) {
            return -1 < N(this).indexOf(a)
        });
        na.dasherize || (na.dasherize = function () {
            var a = N(this);
            return -1 === a.indexOf("_") ? Aa(a.replace(/[A-Z]/g, "-$&")) : a.replace(/_/g, "-")
        });
        Hc.toFixed || (Hc.toFixed = function (a) {
            a = w.pow(10, a || 0);
            return N(w.round(this * a) / a)
        });
        Ab.random || (Ab.random = function (a, d) {
            return w.floor(w.random() * (d - a + 1) + a)
        })
    })();
    var hd = function () {
            function a(c) {
                return n(h(m(c)))
            }

            function c(a) {
                return p(h(m(a)))
            }

            function d(a, c) {
                return k(h(m(a)),
                    c)
            }

            function b(a, c) {
                return n(f(m(a), m(c)))
            }

            function l(a, c) {
                return p(f(m(a), m(c)))
            }

            function e(a, c, b) {
                return k(f(m(a), m(c)), b)
            }

            function h(a) {
                return q(g(r(a), 8 * a.length))
            }

            function f(a, c) {
                var b = r(a);
                16 < b.length && (b = g(b, 8 * a.length));
                for (var d = ea(16), e = ea(16), f = 0; 16 > f; f++)d[f] = b[f] ^ 909522486, e[f] = b[f] ^ 1549556828;
                b = g(d.concat(r(c)), 512 + 8 * c.length);
                return q(g(e.concat(b), 672))
            }

            function n(a) {
                for (var c = "", b, d = 0; d < a.length; d++)b = a.charCodeAt(d), c += "0123456789abcdef".charAt(b >>> 4 & 15) + "0123456789abcdef".charAt(b &
                        15);
                return c
            }

            function p(a) {
                for (var c = Lc + "+/", b = "", d = a.length, e = 0; e < d; e += 3)for (var f = a.charCodeAt(e) << 16 | (e + 1 < d ? a.charCodeAt(e + 1) << 8 : 0) | (e + 2 < d ? a.charCodeAt(e + 2) : 0), g = 0; 4 > g; g++)b = 8 * e + 6 * g > 8 * a.length ? b + "=" : b + c.charAt(f >>> 6 * (3 - g) & 63);
                return b
            }

            function k(a, c) {
                var b = c.length, d = [], e, f, g, h, l = ea(w.ceil(a.length / 2));
                for (e = 0; e < l.length; e++)l[e] = a.charCodeAt(2 * e) << 8 | a.charCodeAt(2 * e + 1);
                for (; 0 < l.length;) {
                    h = [];
                    for (e = g = 0; e < l.length; e++)if (g = (g << 16) + l[e], f = w.floor(g / b), g -= f * b, 0 < h.length || 0 < f)h[h.length] = f;
                    d[d.length] =
                        g;
                    l = h
                }
                b = "";
                for (e = d.length - 1; 0 <= e; e--)b += c.charAt(d[e]);
                d = w.ceil(8 * a.length / (w.log(c.length) / w.log(2)));
                for (e = b.length; e < d; e++)b = c[0] + b;
                return b
            }

            function m(a) {
                for (var c = "", b = -1, d, e; ++b < a.length;)d = a.charCodeAt(b), e = b + 1 < a.length ? a.charCodeAt(b + 1) : 0, 55296 <= d && 56319 >= d && 56320 <= e && 57343 >= e && (d = 65536 + ((d & 1023) << 10) + (e & 1023), b++), 127 >= d ? c += Ra(d) : 2047 >= d ? c += Ra(192 | d >>> 6 & 31, 128 | d & 63) : 65535 >= d ? c += Ra(224 | d >>> 12 & 15, 128 | d >>> 6 & 63, 128 | d & 63) : 2097151 >= d && (c += Ra(240 | d >>> 18 & 7, 128 | d >>> 12 & 63, 128 | d >>> 6 & 63, 128 | d & 63));
                return c
            }

            function r(a) {
                for (var c = ea(a.length >> 2), b = 0, b = 0; b < c.length; b++)c[b] = 0;
                for (b = 0; b < 8 * a.length; b += 8)c[b >> 5] |= (a.charCodeAt(b / 8) & 255) << 24 - b % 32;
                return c
            }

            function q(a) {
                for (var c = "", b = 0; b < 32 * a.length; b += 8)c += Ra(a[b >> 5] >>> 24 - b % 32 & 255);
                return c
            }

            function g(a, b) {
                a[b >> 5] |= 128 << 24 - b % 32;
                a[(b + 64 >> 9 << 4) + 15] = b;
                for (var c = ea(80), d = 1732584193, e = -271733879, f = -1732584194, g = 271733878, h = -1009589776, l = 0; l < a.length; l += 16) {
                    for (var k = d, m = e, p = f, n = g, V = h, ra = 0; 80 > ra; ra++) {
                        if (16 > ra)c[ra] = a[l + ra]; else {
                            var G = c[ra - 3] ^ c[ra - 8] ^ c[ra - 14] ^
                                c[ra - 16];
                            c[ra] = G << 1 | G >>> 31
                        }
                        var G = d << 5 | d >>> 27, r;
                        r = 20 > ra ? e & f | ~e & g : 40 > ra ? e ^ f ^ g : 60 > ra ? e & f | e & g | f & g : e ^ f ^ g;
                        G = B(B(G, r), B(B(h, c[ra]), 20 > ra ? 1518500249 : 40 > ra ? 1859775393 : 60 > ra ? -1894007588 : -899497514));
                        h = g;
                        g = f;
                        f = e << 30 | e >>> 2;
                        e = d;
                        d = G
                    }
                    d = B(d, k);
                    e = B(e, m);
                    f = B(f, p);
                    g = B(g, n);
                    h = B(h, V)
                }
                return ea(d, e, f, g, h)
            }

            function B(a, c) {
                var b = (a & 65535) + (c & 65535);
                return (a >> 16) + (c >> 16) + (b >> 16) << 16 | b & 65535
            }

            function x() {
            }

            x.prototype = {
                constructor: x, hex: function (c, d) {
                    return (d ? b : a)(c, d)
                }, b64: function (a, b) {
                    return (b ? l : c)(a, b)
                }, any: function (a,
                                  b, c) {
                    return (c ? e : d)(a, b, c)
                }
            };
            return new x
        }(), ga = function (a, c) {
            a = a && Aa(a);
            c = c && Aa(c);
            var d = /(nativexrebrowser|nativexrereceiver|tnt browser|netfront|nds|nsn|webshell|belgacom|airties|ekioh|hawaii|cisco|espial|tivo)/.exec(a) || /(webkit|firefox)[ \/]([\w.]+)/.exec(a) || /(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(trident)(?:.*rv:([\w.]+))/.exec(a) || /(msie|) ([\w.]+)/.exec(a) || [], b = d[1] || "unknown", l = /mobile|midp/.test(a), e = c && "activevideo" === c && c, d = parseFloat(d[2] || 0);
            switch (b) {
                case "trident":
                    b =
                        "msie";
                    break;
                case "msie":
                    d = Q.documentMode || d;
                    break;
                case "ipod":
                case "ipad":
                case "iphone":
                case "safari":
                case "chrome":
                case "netfront":
                    b = "webkit";
                    break;
                case "nativexrebrowser":
                case "nativexrereceiver":
                    e = "rdk";
                    b = "webkit";
                    break;
                case "tnt browser":
                    e = "naf";
                    b = "webkit";
                    break;
                case "hawaii":
                case "cisco":
                    Pa.scale = 720;
                    e = "cisco";
                    b = "webkit";
                    break;
                case "ekioh":
                    e = "opentv";
                    b = "webkit";
                    break;
                case "webshell":
                    e = "cubiware";
                    b = "webkit";
                    break;
                case "belgacom":
                    e = "wyplay";
                    b = "webkit";
                    break;
                case "nsn":
                    e = "accenture";
                    b = "webkit";
                    break;
                case "nds":
                    e = b;
                    b = "webkit";
                    break;
                case "airties":
                    e = b;
                    b = "opera";
                    break;
                case "espial":
                    e = b;
                    b = "webkit";
                    break;
                case "tivo":
                    e = b;
                    b = "opera";
                    break;
                case "opera":
                case "firefox":
                case "webkit":
                    break;
                default:
                    Ga("browser not detected correctly"), b = "unkown"
            }
            l = {name: b, version: d, mobile: l};
            if (e = e || B("middleware"))l.middleware = e, l[e] = !0;
            l[b] = !0;
            return l
        }(oc.userAgent, oc.vendor), id = function () {
            function a() {
                this.clear()
            }

            a.uid = 0;
            a.prototype = {
                constructor: a, get: function (a) {
                    return (a = this._data[this.hash(a)]) && a[1]
                }, set: function (a,
                                  d) {
                    this._data[this.hash(a)] = [a, d]
                }, has: function (a) {
                    return this.hash(a)in this._data
                }, remove: function (a) {
                    delete this._data[this.hash(a)]
                }, type: function (a) {
                    var d = gb.toString.call(a), d = Aa(d.slice(8, -1));
                    return "domwindow" !== d || a ? d : a + ""
                }, count: function () {
                    var a = 0, d;
                    for (d in this._data)a++;
                    return a
                }, clear: function () {
                    delete this._data;
                    this._data = {}
                }, hash: function (c) {
                    switch (this.type(c)) {
                        case "undefined":
                        case "null":
                        case "boolean":
                        case "number":
                        case "regexp":
                            return c + "";
                        case "date":
                            return ":" + c.getTime();
                        case "string":
                            return '"' +
                                c;
                        case "array":
                            for (var d = [], b = 0; b < c.length; b++)d[b] = this.hash(c[b]);
                            return "[" + d.join("|");
                        default:
                            return c._hmuid_ || (c._hmuid_ = ++a.uid, q.defineProperty && q.defineProperty(c, "_hmuid_", {enumerable: !1})), "{" + c._hmuid_
                    }
                }, forEach: function (a, d) {
                    d = d || this;
                    for (var b in this._data) {
                        var l = this._data[b];
                        a.apply(d, [l[1], l[0]])
                    }
                }
            };
            return a
        }(), Sa = function () {
            function F(a, b) {
                return ma(w.sqrt(w.pow(b[0] - a[0], 2) + w.pow(b[1] - a[1], 2)))
            }

            function c(a) {
                a && la(a._elementID) && (a._elementID = ++Ca);
                return a._elementID
            }

            function d(a,
                       b) {
                if (a && a.retrieve)return a.retrieve(b)
            }

            function b(a, b, c) {
                a && a.store && (la(c) ? a.eliminate(b) : a.store(b, c));
                return a
            }

            function l(a) {
                return d(a, "type")
            }

            function e(a, b) {
                return d(a, "type") === b
            }

            function h(a, c) {
                if (d(a, "recalc") || c)b(a, "recalc"), "center" === a.hAlign && (a.hOffset = a.hOffset), "center" === a.vAlign && (a.vOffset = a.vOffset)
            }

            function f(a) {
                var b = a && a.target || this;
                if (b && b !== Q.activeElement && (a.type !== kb || b.allowNavigation)) {
                    for (var c = l(b); b && "window" !== c && "view" !== c && "dialog" !== c;) {
                        if (b === Q.activeElement)return;
                        if (!b.hasFocus && b.focusable && !b.disabled) {
                            switch (a.type) {
                                case kb:
                                    b.focus && b.focus();
                                    break;
                                case ec:
                                    b.removeClass("focused")
                            }
                            return
                        }
                        b = b.parentNode;
                        c = l(b)
                    }
                    a.stopPropagation();
                    a.preventDefault()
                }
            }

            function n(a) {
                if (!a.defaultPrevented)switch (a.type) {
                    case "focus":
                        this.addClass("focused");
                        break;
                    case "blur":
                        this.removeClass("focused")
                }
            }

            function t(a) {
                (a && a.target || this).dispatchEvent(Qa("layoutchange"))
            }

            function k(a) {
                return e(a, "text") ? a.lastChild : r
            }

            function m(a) {
                return "string" === x(a) ? a.stripTags("video").stripTags("script").stripTags("object").stripTags("iframe").replace(/\r\n/g,
                    " ").replace(/\n/g, " ").replace(/\r/g, " ") : Yb(a) ? "" : N(a)
            }

            function K() {
                var a = k(this), c;
                a && this.allowChangeEvents && (b(this, "textBounds"), b(this, "totalLines"), a.height = null, this.textPaging && (c = this.height, a.height = w.ceil(ma(xb(a, "height")) / c) * c), t.delay(300, this))
            }

            function ea(a, b) {
                Za && !Za.frozen && Za.src && (Za.contentWindow.postMessage(ka.stringify({
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

            var g = p.Element &&
                p.Element.prototype, L = p.HTMLElement && p.HTMLElement.prototype, Z = p.HTMLImageElement && p.HTMLImageElement.prototype || L, aa = p.Event && p.Event.prototype, D = p.KeyboardEvent && p.KeyboardEvent.prototype, U = "hOffset vOffset hAlign vAlign width height rotate zOrder opacity visible anchorStyle wrap truncation".split(" "), Y = {}, Ca = 0, S, O;
            if (la(g))throw pa("Element needs to exist");
            (function () {
                var a = {};
                (function (b) {
                    L.addEventListener = function (d, e, f) {
                        f = !0 === f;
                        a[d] || (a[d] = []);
                        var g = this._elementID || c(this);
                        a[d].push({
                            id: g,
                            type: d, fn: e, capture: f
                        });
                        return b.apply(this, [d, e, f])
                    }
                })(L.addEventListener);
                (function (b) {
                    L.removeEventListener = function (c, d, e) {
                        var f = this, g = [];
                        if (!d && f) {
                            e = [];
                            if ("string" === typeof c)e = [c]; else for (var h in a)e.push(h);
                            if (0 === e.length)return;
                            e.forEach(function (b) {
                                g = a[b] ? g.concat(a[b].filter(function (a) {
                                    return a.id === f._elementID
                                })) : g
                            })
                        } else if (f && c)g = a[c] ? g.concat(a[c].filter(function (a) {
                            return a.id === f._elementID && a.fn === d
                        })) : g; else {
                            Ga("nothing found");
                            return
                        }
                        0 !== g.length && g.forEach(function (c) {
                            var d =
                                a[c.type], e = d && d.indexOf(c);
                            X(e) && -1 < e && d.splice(e, 1);
                            d && 0 === d.length && delete a[c.type];
                            b.apply(f, [c.type, c.fn, c.capture])
                        })
                    }
                })(L.removeEventListener)
            })();
            g.getBoundingClientRect || (g.getBoundingClientRect = function () {
                for (var a = this, b = a.offsetWidth, c = a.offsetHeight, b = {
                    left: 0,
                    top: 0,
                    right: b,
                    bottom: c,
                    width: b,
                    height: c
                }; a && a !== Ma;) {
                    var c = a.offsetLeft, d = a.offsetTop;
                    b.left += c;
                    b.top += d;
                    b.right += c;
                    b.bottom += d;
                    a = a.offsetParent
                }
                return b
            });
            var ua = "top bottom left right width height".split(" "), na = function () {
                var a =
                    ya();
                return q.keys(a)
            }();
            Tb(g, {
                getBounds: function () {
                    var a = this.getBoundingClientRect();
                    return {
                        top: w.round(a.top / Wa),
                        bottom: w.round((a.bottom || a.top + a.height) / Wa),
                        left: w.round(a.left / Oa),
                        right: w.round(a.right / Oa),
                        width: w.round((a.width || a.right - a.left) / Oa),
                        height: w.round((a.height || a.bottom - a.top) / Wa)
                    }
                }, addClass: function (a) {
                    var b = this.className;
                    if (!this.hasClass(a))return "" !== b && (a = " " + a), this.className = b + a, this
                }, hasClass: function (a) {
                    return eb("\\s?\\b" + a + "\\b", "g").test(this.className)
                }, removeClass: function (a) {
                    var b =
                        this.className;
                    a = eb("\\s?\\b" + a + "\\b", "g");
                    this.className = b = b.replace(a, "")
                }, setStyles: function (a) {
                    for (var b in a || {})this.setStyle(b, a[b]);
                    return this
                }, getStyle: function (a) {
                    var b;
                    b = -1 === U.indexOf(a) ? Bb(this, a) : this[a];
                    !la(b) && "auto" !== b && "inherit" !== b || -1 === ua.indexOf(a) || (b = this.getBounds()[a]);
                    return b
                }, setStyle: function (a, b) {
                    a = -1 !== a.indexOf("-") ? a.camelize() : a;
                    if (-1 !== U.indexOf(a))return this[a] = b, this;
                    switch (a) {
                        case "boxShadow":
                            if (ga.nds || !1 === B("animation") || !1 === B("gpu"))return;
                            break;
                        case "textShadow":
                            if (!1 ===
                                B("animation") || !1 === B("gpu"))return;
                            break;
                        case "borderTopLeftRadius":
                        case "borderBottomLeftRadius":
                        case "borderTopRightRadius":
                        case "borderBottomRightRadius":
                        case "borderRadius":
                            isNaN(b) || (b += "px");
                            break;
                        case "textDecoration":
                            e(this, "text") && (k(this).style[a] = b);
                            break;
                        case "fontSize":
                            b && (!isNaN(b) || -1 < b.indexOf("px")) && (b = (ma(b) / 24).toFixed(3) + "em");
                            break;
                        case "display":
                            ga.firefox || "box" !== b && "flex" !== b || (b = Ya + b);
                            break;
                        case "transform":
                            if (!1 === B("gpu") && "translateZ(0)" === b)return this;
                            !0 === B("3d") &&
                            "translateZ(0)" === b && (b = "translate3d(0,0,0)");
                            a = (Ya + a.hyphenate()).camelize();
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
                            a = (Ya + a.hyphenate()).camelize();
                            break;
                        case "transition":
                        case "transitionProperty":
                        case "transitionDuration":
                        case "transitionDelay":
                        case "transitionTimingFunction":
                            if (!1 ===
                                B("animation"))return this;
                            a = (Ya + a.hyphenate()).camelize();
                            break;
                        case "flex":
                        case "flexWrap":
                        case "order":
                            ga.firefox || (a = (Ya + a.hyphenate()).camelize());
                            break;
                        case "maskImage":
                        case "maskBoxImage":
                            if (ga.nds)return;
                            a = (Ya + a.hyphenate()).camelize();
                            "none" === b && (b = null);
                            b && 0 !== b.indexOf("url(") && (b = "url(" + b + ")");
                            break;
                        case "backgroundImage":
                            "none" === b && (b = null), b && 0 !== b.indexOf("url(") && (b = "url(" + b + ")")
                    }
                    this.style[a] = b;
                    return this
                }, getTextBounds: function (a) {
                    var c = !a && d(this, "textBounds");
                    !e(this, "text") ||
                    !a && c || (c = Ec(k(this), !0 === a), !a && 0 < c.width && 0 < c.height && b(this, "textBounds", c));
                    return c || {width: 0, height: 0}
                }, animate: function (a, b) {
                    return hc.animate(this, a || {}, b)
                }, store: function (a, b) {
                    var d = this._elementID || c(this);
                    la(Y[d]) && (Y[d] = {});
                    Y[d] && (Y[d][a] = b)
                }, retrieve: function (a) {
                    var b = this._elementID || c(this);
                    return Y && Y[b] && Y[b][a]
                }, eliminate: function (a) {
                    var b = this._elementID;
                    b && Y[b] && delete Y[b][a]
                }, appendTo: function (a) {
                    return this.inject(a)
                }, inject: function (a, b) {
                    if ("top" === b && a) {
                        var c = a.firstChild ||
                            r;
                        c ? a.insertBefore(this, c) : b = r
                    }
                    b && "bottom" !== b || !a || a.appendChild(this);
                    h(this);
                    return this
                }, detach: function () {
                    this.parentNode && this.parentNode.removeChild && this.parentNode.removeChild(this);
                    return this
                }, empty: function (a) {
                    var b;
                    if (!this.firstChild || 1 !== this.firstChild.nodeType)return this;
                    for (; b = this.lastChild;) {
                        var c = b.owner;
                        b.destroy && b.destroy.call ? b.destroy() : b && b.parentNode && b.parentNode.removeChild(b);
                        b && c && (delete b.owner, a || (c.suicide(), Ga("owner still exists", c, c.ClassName, b)))
                    }
                    return this
                },
                destroy: function (a) {
                    var b = this.detach(), c = N(b._elementID);
                    b.owner && delete b.owner;
                    b.removeEventListeners && b.removeEventListeners();
                    "image" === l(b) && b.removeAttribute("src");
                    b.removeAttribute("style");
                    b.removeAttribute("class");
                    b.removeAttribute("id");
                    Y[c] && delete Y[c];
                    delete b._elementID;
                    b.empty(a);
                    try {
                        return sc.call(b)
                    } finally {
                        q.forEach(b, function (a, b) {
                            var c = x(b);
                            !b || -1 !== na.indexOf(a) || "instance" !== c && "object" !== c && "element" !== c && "array" !== c || Ga("memory leak?", a, c)
                        })
                    }
                }, removeFromParentNode: function () {
                    return this.destroy()
                },
                createImage: function () {
                    var a = ya("img").addClass("image");
                    Ga("createImage is only available in SDK");
                    html2canvas(this, {
                        async: !1, onrendered: function (b) {
                            a.width = b.width;
                            a.height = b.height;
                            b = b.toDataURL();
                            a.setAttribute("src", b)
                        }
                    });
                    return a
                }, select: function () {
                    this.focusable && !this.disabled && (ob("app") || this.dispatchEvent(Qa("select", r, !0, !0)));
                    return this
                }, back: function () {
                    return this.dispatchEvent(Qa("back", r, !0, !0))
                }, navigate: function (a, b, c) {
                    da.now();
                    var d;
                    a:if (e(this, "view"))d = this; else for (var f = (d =
                            this.parentNode) && l(d); d && f && "view" !== f && "dialog" !== f && !d.innerNavigation;) {
                        if ("window" === f) {
                            d = !1;
                            break a
                        }
                        f = (d = d.parentNode) && l(d)
                    }
                    var g = d || this;
                    d = this.getBounds() || {};
                    var f = d.width - (this.scrollLeft || 0), h = d.height - (this.scrollTop || 0), k = [], m = "array" === x(b);
                    if (g && !ob("app")) {
                        g = X(g.querySelectorAll) ? g.querySelectorAll("[tabindex]:not([class*=disabled])") || [] : g.getElementsByTagName("*") || [];
                        m || ("left" === a || "right" === a ? b = [d[a], d.top + h / 2] : "up" === a ? b = [d.left + f / 2, d.top] : "down" === a && (b = [d.left + f / 2, d.bottom]));
                        for (var p = 0; p < g.length; p++) {
                            var n = g[p], q = l(n);
                            if (n.focusable && !n.disabled && "window" !== q && n !== this && n.allowNavigation && (m || "view" !== q) && "hidden" !== (kc(n, null) || {}).visibility) {
                                var q = ("innerText" === q ? n.parentNode : n).getBounds() || {}, u, v;
                                if ("left" === a || "right" === a) {
                                    u = q["left" === a ? "right" : "left"];
                                    v = q.top + q.height / 2;
                                    w.abs(v - b[1]) >= w.abs(q.bottom - b[1]) && (v = q.bottom - q.height / 2);
                                    if (q.top < d.top || q.top > d.top + h)continue;
                                    if ("right" === a && b[0] - f / 2 >= u)continue; else if ("left" === a && b[0] + f / 2 <= u)continue
                                } else if ("up" ===
                                    a || "down" === a)if (u = q.left + q.width / 2, v = q["up" === a ? "bottom" : "top"], w.abs(u - b[0]) >= w.abs(q.right - b[0]) && (u = q.right - q.width / 2), "up" === a && (b[1] + h / 2 <= v || q.top >= d.top))continue; else if ("down" === a && (b[1] - h / 2 >= v || q.top < d.top))continue;
                                k.push({
                                    distance: F(b, [u, v]),
                                    x: q.left,
                                    y: "left" === a || "right" === a ? w.abs(q.top - d.top) : q.top,
                                    el: n
                                })
                            }
                        }
                        return 0 < k.length ? ("left" === a || "right" === a ? k.keySort({
                            x: "left" === a ? "desc" : "asc",
                            y: "asc",
                            distance: "asc"
                        }) : k.keySort({
                            y: "up" === a ? "desc" : "asc",
                            distance: "asc"
                        }), b = k[0].el, !c && b && (O = b,
                            b.focus(), O = r, S = a), b || !1) : !1
                    }
                }
            });
            a(g, "focusedView", function () {
                var a = Q.activeElement, b = a.window, c = this.window, d = l(a);
                if ("window" === d || a === Ma || b === a || !c)return !1;
                if (b && "dialog" === l(b))return b;
                if ("view" === d)return a == c ? a : !1;
                for (a = a.parentNode; a;) {
                    if (a === c)return a;
                    a = a.parentNode
                }
                return !1
            });
            a(g, "window", function () {
                if (e(this, "view"))return this;
                for (var a = this.parentNode, b = a && l(a); a && b && "view" !== b && "dialog" !== b;) {
                    if ("window" === b)return !1;
                    a = a.parentNode;
                    b = l(a)
                }
                return a
            });
            a(g, "visible", function () {
                return "hidden" !==
                    this.style.visibility
            });
            M(g, "visible", function (a) {
                this.style.visibility = !1 === a ? "hidden" : null
            });
            a(g, "focusable", function () {
                return this.wantsFocus
            });
            a(g, "hasFocus", function () {
                return this === Q.activeElement
            });
            var ta = ["focus", "blur"];
            a(g, "wantsFocus", function () {
                return this.hasAttribute("tabindex")
            });
            M(g, "wantsFocus", function (a) {
                var b = l(this);
                !0 === a ? (this.setAttribute("tabindex", -1), ta.forEach(function (a) {
                    this.addEventListener(a, n)
                }, this), "window" !== b && "view" !== b && "dialog" !== b && (this.addEventListener(kb,
                    f), this.addEventListener(ec, f))) : ("window" !== b && "view" !== b && "dialog" !== b && (this.removeEventListener(kb, f), this.removeEventListener(ec, f)), ta.forEach(function (a) {
                    this.removeEventListener(a, n)
                }, this), this.removeAttribute("tabindex"))
            });
            a(g, "frozen", function () {
                return this.hasClass("frozen")
            });
            M(g, "frozen", function (a) {
                var b = l(this);
                !0 === a ? this.addClass("text" === b ? "frozenText" : "frozen") : (this.removeClass("text" === b ? "frozenText" : "frozen"), h(this))
            });
            a(g, "updatesEnabled", function () {
                return !this.frozen
            });
            M(g, "updatesEnabled", function (a) {
                this.frozen = !1 === a
            });
            a(g, "zOrder", function () {
                return this.style.zIndex
            });
            M(g, "zOrder", function (a) {
                this.style.zIndex = a
            });
            a(g, "opacity", function () {
                return parseFloat(this.style.opacity || 1)
            });
            M(g, "opacity", function (a) {
                this.style.opacity = 1 > a ? a : null
            });
            a(g, "allowNavigation", function () {
                var a = l(this);
                if (!1 === d(this, "allowNavigation"))return !1;
                if ("view" === a || "window" === a || "dialog" === a)return !0;
                for (var b = this.parentNode; b;) {
                    a = l(b);
                    if (!1 === d(b, "allowNavigation"))return !1;
                    if ("view" ===
                        a || "window" === a || "dialog" === a)break;
                    b = b.parentNode
                }
                return !0
            });
            M(g, "allowNavigation", function (a) {
                b(this, "allowNavigation", !0 === a ? r : !1)
            });
            a(g, "innerNavigation", function () {
                return !0 === this.retrieve("navigation")
            });
            M(g, "innerNavigation", function (a) {
                !0 === a ? this.store("navigation", !0) : this.eliminate("navigation")
            });
            a(g, "disabled", function () {
                return this.hasClass("disabled")
            });
            M(g, "disabled", function (a) {
                !0 === a ? this.addClass("disabled") : this.removeClass("disabled")
            });
            var v = {h: "left", v: "top", width: "h", height: "v"},
                u = {bottom: "top", right: "left"};
            ["h", "v"].forEach(function (c) {
                a(g, c + "Align", function () {
                    return d(this, c + "Align") || v[c]
                });
                M(g, c + "Align", function (a) {
                    a = a || v[c];
                    var e = d(this, c + "Align") || v[c];
                    if (e !== a) {
                        b(this, c + "Align", a);
                        a = this.style;
                        var f = this[c + "Offset"] || 0;
                        "center" === e ? (eliminate(this, c + "Offset"), e = "margin" + v[c].capitalize(), a[v[c]] = a[e] = null) : a[e] = null;
                        this[c + "Offset"] = f
                    }
                });
                a(g, c + "Offset", function () {
                    var a = l(this), b = this.style, e = this[c + "Align"];
                    if ("list" !== a && "item" !== a || "absolute" === b.position) {
                        if ("center" ===
                            e)return d(this, c + "Offset") || 0;
                        a = Bb(this, e) || 0;
                        return "auto" !== a && "inherit" !== a && a ? parseFloat(a) : 0
                    }
                    return parseFloat(b["margin" + e.capitalize()]) || 0
                });
                M(g, c + "Offset", function (a) {
                    a = a || 0;
                    var d = l(this), e = this[c + "Align"], f = this.style;
                    "list" !== d && "item" !== d || "absolute" === f.position ? "center" === e ? (b(this, c + "Offset", a), e = ("h" === c ? this.width : this.height) || 0, d = "margin" + v[c].capitalize(), 0 < e ? (f[d] = a + e / 2 * -1 + "px", f[v[c]] = "50%") : b(this, "recalc", !0)) : (d = u[e], "auto" === (d ? Bb(this, d) : "auto") || f[d] || (f[d] = "auto"), f[e] =
                        a) : f["margin" + e.capitalize()] = a
                })
            });
            ["width", "height"].forEach(function (c) {
                a(g, c, function () {
                    var a = l(this), b = this.retrieve("v_" + c);
                    if (b && !this.parentNode)return b;
                    var b = "c_" + c, d = this.retrieve(b) || Bb(this, c) || 0, e = 0;
                    if ("text" === a)if (a = k(this), "height" === c) {
                        if (!d && 1 < this.maxVisibleLines)return this.maxVisibleLines * this.lineHeight;
                        d = d || this.textHeight
                    } else d = d || this.textWidth || Ec(a, !0).width;
                    "string" == typeof d && "auto" !== d && "inherit" !== d && -1 === d.indexOf("%") && (e = parseFloat(d)) && this.store(b, e);
                    return e ||
                        d
                });
                M(g, c, function (a) {
                    var d = "v_" + c, e = "c_" + c, f = l(this), g = v[c];
                    a && !isNaN(a) ? this.store(d, a) : this.eliminate(d);
                    this.eliminate(e);
                    "image" === f ? (this.eliminate("original" + c.capitalize()), this.setAttribute(c, a)) : this.style[c] = isNaN(a) || !a ? a : a + "px";
                    "center" === this[g + "Align"] && b(this, "recalc", !0);
                    h(this)
                })
            });
            a(g, "lastNavigation", function () {
                return S
            });
            a(g, "currentNavigation", function () {
                return fc
            });
            a(g, "navigateTo", function () {
                return O
            });
            a(g, "owner", function () {
                return d(this, "owner")
            });
            M(g, "owner", function (a) {
                b(this,
                    "owner", a || r)
            });
            a(g, "rotate", function () {
                return this.retrieve("rotate") || 0
            });
            M(g, "rotate", function (a) {
                var b = this.style, c = b[Nb], c = c ? new Ob(c) : new Ob;
                b[Nb] = c.rotateAxisAngle(0, 0, 0, a);
                this.store("rotate", a)
            });
            a(g, "html", function () {
                return this.innerHTML || ""
            });
            M(g, "html", function (a) {
                this.innerHTML = a || ""
            });
            a(g, "textPaging", function () {
                return d(this, "textPaging") || !1
            });
            M(g, "textPaging", function (a) {
                b(this, "textPaging", a || r)
            });
            a(g, "allowChangeEvents", function () {
                return d(this, "allowChangeEvents") || !1
            });
            M(g, "allowChangeEvents",
                function (a) {
                    var c = this.allowChangeEvents;
                    !0 === c && this.removeEventListener("scroll", t);
                    !0 === a && c !== a && this.addEventListener("scroll", t, !1);
                    b(this, "allowChangeEvents", a || r)
                });
            ["data", "text"].forEach(function (c) {
                a(g, c, function () {
                    var a = d(this, "originalText");
                    return a ? a : (a = k(this)) && a.html || ""
                });
                M(g, c, function (a) {
                    a = m(a);
                    var c = this, d = k(c);
                    if (d && d.html !== a) {
                        b(c, "textBounds");
                        b(c, "totalLines");
                        b(c, "visibleLines");
                        b(c, "c_width");
                        b(c, "c_height");
                        d.height = null;
                        d.html = a;
                        var e = c.maxVisibleLines;
                        c.wrap && 1 < e && (c.height =
                            e * c.lineHeight);
                        "end" === c.truncation && c.wrap && (b(c, "originalText", a), ad(d), 1 < e && c.textHeight < c.height && (c.height = c.textHeight));
                        if (c.allowChangeEvents) {
                            if ((a = c.getElementsByTagName("img")) && 0 < a.length)for (var f = function () {
                                K.call(c);
                                this.removeEventListener("load", f)
                            }, d = 0; d < a.length; d++)a[d].addEventListener("load", f);
                            K.call(c);
                            c.dispatchEvent(Qa("change"))
                        }
                    }
                })
            });
            a(g, "scrolling", function () {
                return e(this, "text") ? this.hasClass("scrollText") : !1
            });
            M(g, "scrolling", function (a) {
                e(this, "text") && (a ? this.addClass("scrollText") :
                    this.removeClass("scrollText"))
            });
            a(g, "cursor", function () {
                var a = k(this);
                if (a && this.editable) {
                    var b = 0, c;
                    p.getSelection && a ? (c = p.getSelection(), 0 < c.rangeCount && (b = c.getRangeAt(0), c = b.cloneRange(), c.selectNodeContents(a), c.setEnd(b.endContainer, b.endOffset), b = c.toString().length)) : Q.selection && "Control" !== Q.selection.type && a && (b = Q.selection.createRange(), c = Ma.createTextRange(), c.moveToElementText(a), c.setEndPoint("EndToEnd", b), b = c.text.length);
                    return b || 0
                }
                return !1
            });
            M(g, "cursor", function (a) {
                var b = k(this);
                if (b && -1 < a && p.getSelection && b && b.firstChild) {
                    var c = p.getSelection();
                    if (0 < c.rangeCount) {
                        var d = c.getRangeAt(0), e = Q.activeElement;
                        b.focus();
                        d.collapse(!0);
                        try {
                            d.setStart(b.firstChild, a), d.setEnd(b.firstChild, a), c.removeAllRanges(), c.addRange(d)
                        } catch (f) {
                        }
                        e !== b && e.focus()
                    }
                }
            });
            a(g, "editable", function () {
                var a = k(this);
                return a && a.hasAttribute("contenteditable") || r
            });
            M(g, "editable", function (a) {
                var b = this, c = k(b);
                c && (!0 === a ? (c.wantsFocus = !0, ["focus", "blur"].forEach(function (a) {
                        this.addEventListener(a, function (c) {
                            b.dispatchEvent(Qa(a))
                        })
                    },
                    c)) : (c.wantsFocus = !1, c.removeEventListeners()))
            });
            a(g, "color", function () {
                return this.style.color || r
            });
            M(g, "color", function (a) {
                this.style.color = a
            });
            a(g, "font", function () {
                return this.style.fontFamily || r
            });
            M(g, "font", function (a) {
                this.style.fontFamily = a
            });
            a(g, "truncated", function () {
                return this.textHeight > this.height
            });
            a(g, "truncation", function () {
                var a = k(this);
                return a && "ellipsis" === a.style.textOverflow ? "end" : r
            });
            M(g, "truncation", function (a) {
                var b = k(this);
                b && (b = b.style, "end" === a ? (b.overflow = "hidden", b.textOverflow =
                    "ellipsis") : (b.overflow = "visible", b.textOverflow = "clip"))
            });
            a(g, "lineHeight", function () {
                var a = xb(this, "line-height");
                a && !this.parentNode ? a = 1.3 * Dc(this.style.fontSize || a) : "normal" !== a && a || (a = 1.3 * Dc(xb(this, "font-size") || this.style.fontSize || "1.3em"));
                return parseFloat(a)
            });
            M(g, "lineHeight", function (a) {
                this.style.lineHeight = a
            });
            a(g, "textWidth", function () {
                return this.getTextBounds(!0).width
            });
            a(g, "textHeight", function () {
                return this.data && this.getTextBounds().height || this.lineHeight
            });
            a(g, "totalLines",
                function () {
                    var a = k(this);
                    if (a) {
                        var c = d(this, "totalLines");
                        if (!c) {
                            c = ma(xb(a, "height")) / this.lineHeight;
                            if (isNaN(c))return 0;
                            c = w.ceil(c);
                            b(this, "totalLines", c)
                        }
                        return c
                    }
                });
            a(g, "maxVisibleLines", function () {
                if (e(this, "text"))return d(this, "maxVisibleLines") || 1
            });
            a(g, "visibleLines", function () {
                if (e(this, "text")) {
                    var a = d(this, "visibleLines");
                    if (!a) {
                        var c = this.totalLines, a = ma(this.height / this.lineHeight);
                        a > c && (a = c);
                        b(this, "visibleLines", a)
                    }
                    return a
                }
            });
            M(g, "visibleLines", function (a) {
                e(this, "text") && (b(this,
                    "visibleLines"), b(this, "maxVisibleLines", a), this.height = a * this.lineHeight)
            });
            a(g, "firstLine", function () {
                if (e(this, "text"))return ma((this.scrollTop || 0) / this.lineHeight)
            });
            M(g, "firstLine", function (a) {
                if (e(this, "text")) {
                    if (0 < a) {
                        var c = this.totalLines / this.maxVisibleLines, d = w.floor(c), f = w.ceil(c);
                        d !== f && (b(this, "totalLines", this.maxVisibleLines * f), c = k(this), d = c.height / d * f, c.height = isFinite(d) ? d : null)
                    }
                    this.scrollTop = a * this.lineHeight
                }
            });
            a(g, "wrap", function () {
                return "nowrap" !== Bb(this, "white-space")
            });
            M(g,
                "wrap", function (a) {
                    var b = k(this);
                    this.style.whiteSpace = a ? "normal" : "nowrap";
                    b && (b.style.wordWrap = a ? "break-word" : "normal")
                });
            a(g, "anchorStyle", function () {
                var a = k(this);
                if (a)return ((a.style.textAlign || "left") + "-" + (a.style.verticalAlign || "top")).camelize()
            });
            M(g, "anchorStyle", function (a) {
                var b = k(this);
                b && a && (a = Cc(a), b = b.style, b.textAlign = a[0] || null, b.verticalAlign = a[1] || null)
            });
            a(L, "removeEventListeners", function () {
                return this.removeEventListener
            });
            a(Z, "aspect", function () {
                return d(this, "aspect")
            });
            var xa =
                "fit parent exact height width auto crop source original".split(" ");
            M(Z, "aspect", function (a) {
                -1 !== xa.indexOf(a) ? b(this, "aspect", a) : b(this, "aspect")
            });
            a(Z, "source", function () {
                return this.retrieve("source") || ""
            });
            M(Z, "source", function (a) {
                var b = this.retrieve("source");
                a !== b ? (this.store("source", a), this.hasAttribute("src") && this.removeAttribute("src"), a && this.setAttribute("src", a)) : a && this.dispatchEvent(Qa("load"))
            });
            a(g, "id", function () {
                return this.getAttribute("id")
            });
            M(g, "id", function (a) {
                Ga("Element.id is not safe, please use Element.setAttribute()");
                this.setAttribute("id", a)
            });
            a(Z, "src", function () {
                return this.getAttribute("src") || ""
            });
            M(Z, "src", function (a) {
                Ga("Image.src is not safe, please use Image.source");
                a ? this.setAttribute("src", a) : this.removeAttribute("src")
            });
            a(Z, "remoteAsync", function () {
                return !1 !== d(this, "remoteAsync")
            });
            M(Z, "remoteAsync", function (a) {
                b(this, "remoteAsync", !1 !== a)
            });
            ["srcWidth", "srcHeight"].forEach(function (b) {
                a(Z, b, function () {
                    return this[b.replace("src", "natural")]
                })
            });
            p.addEventListener("mousedown", function (a) {
                var b =
                    a.target || Q.activeElement;
                if (b && 1 === a.which) {
                    if (b.allowNavigation) {
                        for (; b && !b.focusable;)b = b.parentNode;
                        var c = l(b);
                        b && "window" !== c && "view" !== c && "dialog" !== c && b.select()
                    }
                    a.preventDefault()
                }
            });
            aa && function (a) {
                aa.preventDefault = function () {
                    a && a.call(this);
                    this.returnValue = !1
                }
            }(aa.preventDefault);
            mc(D);
            p.addEventListener("keyup", function (a) {
                if (!a.defaultPrevented && !Za.frozen && Za.src)return ea("up", a)
            });
            p.addEventListener("keydown", function (a) {
                D || (D = p.KeyboardEvent && p.KeyboardEvent.prototype) && mc(D);
                var b =
                    a.key || null, c = Q.activeElement || a.target, d;
                if (!a.defaultPrevented && !Za.frozen && Za.src)return ea("down", a);
                if (!a.defaultPrevented && c) {
                    if ("back" === b)d = Qa("back", r, !0, !0); else {
                        if ("play" === b || "pause" === b || "playpause" === b || "stop" === b || "forward" === b || "rewind" === b) {
                            a.preventDefault();
                            return
                        }
                        if (ob("app") || "up" !== b && "down" !== b && "left" !== b && "right" !== b) {
                            if ("enter" === b || "select" === b) {
                                c.select();
                                return
                            }
                            if ("home" === b)d = Qa("home", r, !0, !0); else if ("reload" === b)return Fc()
                        } else d = Qa("navigate", {direction: b}, !0, !0),
                            fc = b
                    }
                    c && X(d) && (c.dispatchEvent(d), a.preventDefault())
                }
            });
            p.addEventListener("navigate", function (a) {
                var b = a.detail && a.detail.direction || fc, c = a.target || Q.activeElement;
                X(b) && !a.defaultPrevented && c && (c.navigate(b) || c.dispatchEvent(Qa("navigateoutofbounds", {direction: b}, !0, !0)));
                fc = r
            });
            return function (a, b) {
                b = b || Q;
                "string" === x(a) && X(b) && (a = b.getElementById(a));
                return (a = a && a.nodeType && a.owner ? a.owner : a) || r
            }
        }(), vc = function (a) {
            for (var c = {}, d = 0; d < a.length; d++) {
                var b = a.split("?");
                Tb(c, vb(b[1]))
            }
            return c
        }(Ba.href),
        od = function () {
            function K(a, b) {
                a = a || u;
                var c = S[u] && S[u].profile || !1;
                return ua[a] && c ? F.versions ? b !== r ? ua[a][c.languageCode] && ua[a][c.languageCode][b] || ua[a].en && ua[a].en[b] || (a !== v ? K(v, b) : b) || b : ua[a][c.languageCode] || ua[a].en : b !== r ? ua[a][c.locale] && ua[a][c.locale][b] || ua[a][c.languageCode + "-EU"] && ua[a][c.languageCode + "-EU"][b] || ua[a][Gb] && ua[a][Gb][b] || (a !== v ? K(v, b) : b) || b : ua[a][c.locale] || ua[a][c.languageCode + "-EU"] || ua[a][Gb] : b ? b : {}
            }

            function c(a) {
                return Zb("", F.appsPath || Pa.apps || "apps", a)
            }

            function d(a,
                       b) {
                a = a || u || v;
                return c(b) + a + "/Contents/"
            }

            function b(b, c, d, e) {
                function f() {
                    l = !0;
                    d && d.stopPropagation && d.stopPropagation.call && d.stopPropagation()
                }

                function g() {
                    k = !0;
                    d && d.preventDefault && d.preventDefault.call && d.preventDefault()
                }

                function h() {
                    f();
                    g()
                }

                if (!b)throw pa("You can't create an event with no type");
                var l = !1, k = !1;
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
                a(this, "stopPropagation",
                    function () {
                        return f
                    });
                a(this, "preventDefault", function () {
                    return g
                });
                a(this, "stop", function () {
                    return h
                });
                a(this, "propagationStopped", function () {
                    return l
                });
                a(this, "defaultPrevented", function () {
                    return k
                })
            }

            function l(a, b, c) {
                b.conf && b.conf.key && a === u && (Ea[b.conf.key] = c, h(a, "showDialog", b, va))
            }

            function e(a, b) {
                var c = b.conf && b.conf.key;
                c && (Ea[c] = null, delete Ea[c], a === u && h(a, "hideDialog", b, va))
            }

            function h(a, b, c, d) {
                if (!la(S[a])) {
                    "string" !== x(c) && (c = ka.stringify(c || {}));
                    a = S[a];
                    b = new a.HostEvent(b, c);
                    b.error = !1;
                    b.onDoneCalled = !1;
                    b.onDone = d;
                    try {
                        a.widget.onHostEvent.call(a, b)
                    } catch (e) {
                        a && a.error(e), b.error = !0
                    }
                    b.onDone && !b.onDoneCalled && (b.onDoneCalled = !0, b.onDone.call(a, b))
                }
            }

            function f(a, b, c) {
                this.number = a || 0;
                this.name = b || "";
                this.description = c || "";
                this.widget = !1
            }

            function n(a, b, c, d, e) {
                this.title = a || "";
                this.description = b || "";
                this.startTime = c || Date.now();
                this.duration = d || 0;
                this.ageRating = e || 0;
                this.widget = !1
            }

            function t(a, b, c, d) {
                this.title = a || "";
                this.description = b || "";
                this.poster = c;
                this.duration = d || 0;
                this.widget = !1
            }

            function k() {
                function c(a) {
                    return k[a]
                }

                function d(a) {
                    delete k[a];
                    h({key: a, value: null, deleted: !0})
                }

                function e(a, b) {
                    k[a] = xa(b);
                    h({key: a, value: b})
                }

                function f(a) {
                    k = {};
                    a && (m = [])
                }

                function g(a) {
                    return k[a] !== r
                }

                function h(a) {
                    var c = new b("onBroadcast", a);
                    m.forEach(function (a) {
                        a(c)
                    })
                }

                function l(a, b) {
                    q.forEach(k, a, b)
                }

                var k = {}, m = [], n = {};
                a(n, "onBroadcast", function () {
                    return m.length ? m : []
                });
                M(n, "onBroadcast", function (a) {
                    if (a instanceof ea)m = a; else throw pa("MAF.messages.subscribe: Invalid setting of subscribers");
                });
                a(this, "fetch", function () {
                    return c
                });
                a(this, "exists", function () {
                    return g
                });
                a(this, "store", function () {
                    return e
                });
                a(this, "remove", function () {
                    return d
                });
                a(this, "reset", function () {
                    return f
                });
                a(this, "forEach", function () {
                    return l
                });
                a(this, "eventType", function () {
                    return "onBroadcast"
                });
                a(this, "subscribers", function () {
                    return n
                })
            }

            function m() {
                if (sa && sa.profile) {
                    var a = sa.profile.locale, b = sa.profile.languageCode, c = sa.profile.countryCode;
                    p.LGI && p.LGI.Guide && (p.LGI.Guide.config.region = Va(c || "nl"));
                    if (p.moment)try {
                        moment.lang(a)
                    } catch (d) {
                        try {
                            moment.lang(b)
                        } catch (e) {
                            moment.lang("en")
                        }
                    }
                    if (p.numeral)try {
                        numeral.language(a)
                    } catch (f) {
                        try {
                            numeral.language(b)
                        } catch (g) {
                            numeral.language("en")
                        }
                    }
                }
            }

            function fa() {
                function f(a) {
                    (function () {
                        p.__openUrl__ ? p.__openUrl__("webkit:" + a) : p.open(a)
                    }).delay(800)
                }

                function g(a) {
                    var b = Za;
                    return b ? (a ? (b.setStyle("transformOrigin", "0 0"), b.src = a) : (b.frozen = !0, Sa("viewport").frozen = !1, S[u].focus(), b.removeAttribute("src"), b.removeAttribute("style")), !0) : !1
                }

                function h() {
                    "hash host hostname href pathname port protocol search origin".split(" ").forEach(function (b) {
                        a(this, b, function () {
                            return Ba[b] || ""
                        })
                    }, this)
                }

                function R(a) {
                    a && a.url && !Lb.test(a.url) && 0 !== a.url.indexOf(c()) &&
                    (a.url = d() + a.url);
                    return new ra(a)
                }

                function k(a) {
                    a = a || {};
                    var b = k.Mutators, c = k.Methods, d = k.Libraries, e = function () {
                        for (var a in this)X(this[a]) && "function" !== typeof this[a] && (this[a] = xa(this[a]));
                        this.constructor = e;
                        if (k._prototyping)return this;
                        a = !1 === e.prototype.config ? {} : arguments[0] || {};
                        this._classID = (a.ClassName || this.ClassName || "Instance") + "-" + ++sb;
                        a.methods && b.Implements(this, a.methods);
                        delete a.methods;
                        this.addEvents(a.events);
                        delete a.events;
                        this.setConfig(a);
                        var c;
                        try {
                            c = X(this.initialize) &&
                            this.initialize.call ? this.initialize.apply(this, arguments) : this, a.initialize && a.initialize.call(this)
                        } catch (d) {
                            A && A.error(d)
                        }
                        return c
                    }, f;
                    for (f in b)b[f] && a[f] && (a = b[f](a, a[f], e), delete a[f]);
                    ["Config", "Events"].forEach(function (c) {
                        b.Implements(a, d[c])
                    });
                    a.toString = function () {
                        return "[Class] {" + (this._classID || "Proto") + "}"
                    };
                    Tb(e, this);
                    e.constructor = k;
                    e.prototype = a;
                    e.implement = c.implement;
                    e.getDefaults = c.getDefaults;
                    e.inheritsFrom = c.inheritsFrom;
                    a.ClassName && (e.displayName = a.ClassName);
                    return e
                }

                function m(a,
                           b) {
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
                            la(b.focus) && (b.focus = !0);
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
                    c = ya(c).addClass(a);
                    c.store("type", a);
                    b.id && c.setAttribute("id", b.id);
                    !0 === b.focus && "image" !== a && (c.wantsFocus = b.focus);
                    !0 === b.frozen && (c.frozen = !0);
                    if (b.events)for (var d in b.events)b.events[d] &&
                    c.addEventListener(d, b.events[d]);
                    "image" === a ? ((b.src || b.source) && c.setAttribute("src", b.src || b.source), c.addEventListener("load", function (a) {
                        a = a.target || this;
                        var b = a.aspect, c = qc(a.frozen), d = a.srcWidth, e = a.srcHeight;
                        a.frozen = !0;
                        b && "fit" !== b && d && e && (a.setAttribute("width", d), a.setAttribute("height", e));
                        "center" === a.hAlign && (a.hOffset = a.hOffset);
                        "center" === a.vAlign && (a.vOffset = a.vOffset);
                        c || (a.frozen = !1)
                    }), c.addEventListener("error", function (a) {
                        a = a.target || this;
                        qc(a.frozen);
                        a.removeAttribute("src");
                        "center" === a.hAlign && (a.hOffset = a.hOffset);
                        "center" === a.vAlign && (a.vOffset = a.vOffset)
                    })) : "text" === a && (d = ya("span"), d.store("type", "innerText"), d.addClass("innerText"), d.html = b.label || b.data || b.text || "", d.inject(c));
                    b.width && (b.styles.width = b.width);
                    b.height && (b.styles.height = b.height);
                    b.styles && c.setStyles(b.styles);
                    return c
                }

                function Da(b, c) {
                    var d = null, e = !1;
                    this.onTimerFired = c;
                    this.interval = b || 0;
                    this.start = function () {
                        null === d && !e && 0 < this.interval && this.onTimerFired && (d = Pb(this.onTimerFired.bind(this),
                            1E3 * this.interval), e = !0)
                    };
                    this.stop = function () {
                        null !== d && e && (e = !1, Ub(d), d = null)
                    };
                    this.reset = function () {
                        this.stop();
                        this.start()
                    };
                    a(this, "ticking", function () {
                        return !0 === e
                    });
                    M(this, "ticking", function (a) {
                        !0 === a ? this.start() : this.stop()
                    })
                }

                function n(a) {
                    var b = new fb;
                    b.open("GET", Zb(a + ("?" + da.now() || ""), "src"), !1);
                    b.send();
                    var c = "";
                    4 === b.readyState && 200 === b.status && b.responseText ? (c = ("\n" + b.responseText.replace(Vb, "")).replace(tc, function (a, b) {
                        return n(b)
                    }), c += "\n//# sourceURL=" + a + "\n") : Ga("error loading maf-ui file: " +
                        a);
                    return c
                }

                da.now();
                var r = {}, sb = 0, A = this;
                A.console = {};
                ["log", "warn", "error"].forEach(function (b) {
                    a(this.console, b, function () {
                        return function () {
                            var a = [u + "*"].concat(Ia(arguments)), a = "concat" === B("console") ? [Ia(a).join(" ")] : a;
                            Na[b].apply(Na, a)
                        }
                    });
                    a(this, b, function () {
                        return this.console[b]
                    })
                }, A);
                a(A, "destroy", function () {
                    return function () {
                        r = A = null
                    }
                });
                a(A, "QRCode", function () {
                    return Bb
                });
                a(A, "getSetting", function () {
                    return B
                });
                a(A, "WebSocket", function () {
                    return pc
                });
                a(A, "MediaAsset", function () {
                    return t
                });
                a(A, "matchMedia", function () {
                    return p.matchMedia
                });
                ["window", "document", "widget", "filesystem"].forEach(function (b) {
                    a(A, b, function () {
                        if (X(u))return S[u][b];
                        throw pa("No App is active");
                    })
                });
                var Oc = function () {
                    function b(a, c, d) {
                        d = S[v].$_;
                        (new ra({
                            url: "//" + La[6] + "." + Fa + ".com/",
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

                    function c(a, b, e, f, T, g) {
                        var y = {oauth: {}};
                        g = g || k;
                        f = f || {};
                        if (Da[a]) {
                            var h = z.session;
                            h && h.token && !f.access_token ? (y.oauth.token = h.token, y.oauth.token_secret = h.secret) : f && f.verifier ? (y.oauth = f, f = {}) : y.oauth.callback = "oob";
                            return (new ra({
                                url: Da[a] + b,
                                headers: {Accept: "application/json"},
                                method: -1 < m.indexOf(e) ? e : "get",
                                proxy: y,
                                data: f,
                                monitoring: !1,
                                onSuccess: function (a) {
                                    a = "string" === x(a) ? vb(a) : a;
                                    T.call(g, a, f)
                                },
                                onFailure: function (c) {
                                    if ("oauth" === a)T.call(g, c, f); else if ("account/verify_credentials.json" !== b) {
                                        c = c.status || 0;
                                        var e = g, y = {}, h = f;
                                        switch (c) {
                                            case 401:
                                                d()
                                        }
                                        401 !== c && T.call(e, y, h)
                                    }
                                },
                                onError: function (a) {
                                    if ("account/verify_credentials.json" !==
                                        b) {
                                        a = a.status || 0;
                                        var c = g, e = {}, y = f;
                                        switch (a) {
                                            case 401:
                                                d()
                                        }
                                        401 !== a && T.call(c, e, y)
                                    }
                                }
                            })).send()
                        }
                    }

                    function d(a) {
                        n && !1 !== z.session && new c("api", "account/verify_credentials.json", "get", null, function (b) {
                            b && b.id ? (z.user = b, z.session = Ka(z.session || {}, {installed: !0}), a && a.call && a()) : (z.user = {}, z.session = Ka(z.session || {}, {installed: !1}))
                        })
                    }

                    function f(a, g) {
                        if (n && !z.connected) {
                            var y = u, h, k;
                            h = new c("oauth", "request_token", "get", null, function (R) {
                                var Da = "https://api.twitter.com/oauth/authenticate?oauth_token=" + R.oauth_token,
                                    m = "email" === B("twitter");
                                l(y, {
                                    type: "twitter-" + (m ? "login" : "qrcode"),
                                    conf: {
                                        type: m ? "email" : "qrcode",
                                        ignoreBackKey: !1,
                                        key: R.oauth_token,
                                        title: "TWITTER_CONNECT",
                                        message: g ? "TWITTER_INVALIDCODE" : m ? "TWITTER_EMAIL" : "TWITTER_QRCODE",
                                        code: R.oauth_callback_confirmed,
                                        url: Da
                                    }
                                }, function (g) {
                                    h && h.abort();
                                    k && k.abort();
                                    m && g && g.response && 5 < g.response.length && b(g.response, Da);
                                    X(g.response) && l(y, {
                                        type: "twitter-login", conf: {
                                            type: "code",
                                            maxLength: 7,
                                            layout: "pinentry",
                                            ignoreBackKey: !1,
                                            key: Da,
                                            title: "TWITTER_CONNECT",
                                            message: "TWITTER_CODE",
                                            code: g.key
                                        }
                                    }, function (b) {
                                        b.response && 7 === b.response.length ? k = new c("oauth", "access_token", "get", {
                                            verifier: b.response,
                                            token: R.oauth_token,
                                            token_secret: R.oauth_token_secret
                                        }, function (c) {
                                            c.oauth_token && (z.session = Ka(z.session || {}, {
                                                token: c.oauth_token,
                                                secret: c.oauth_token_secret,
                                                id: c.user_id,
                                                installed: !0
                                            }));
                                            h = k = null;
                                            d(function () {
                                                e(u, {conf: {key: b.code}});
                                                a && a.call && a()
                                            });
                                            401 === c.status && f(a, !0)
                                        }) : f(a, !0)
                                    })
                                })
                            })
                        }
                    }

                    function g() {
                        if (n && z.connected) {
                            for (var a = Ia(arguments), b = a.shift(), d = a.shift(), e, T, y; d;) {
                                var h =
                                    x(d);
                                if ("string" !== h || e)if ("function" !== h || y) {
                                    if ("object" !== h || T)return;
                                    T = d
                                } else y = d; else e = Aa(d);
                                d = a.shift()
                            }
                            e = e || "get";
                            T = T || {};
                            "/" === b[0] && (b = b.substr(1));
                            if ("me" === b && z.user && z.user.id)return z.user;
                            "me" === b && (b = "account/verify_credentials.json");
                            return new c("api", b, e, T, y, k)
                        }
                        if (n) {
                            var l = Ia(arguments), R = arguments.callee;
                            f(function () {
                                R.apply(k, l)
                            })
                        } else throw pa("Twitter is not initialized");
                    }

                    function y() {
                        P && Ub(P);
                        d()
                    }

                    function h(a) {
                        a && "string" === x(a) && (n = a, y(), P = Pb(d, 5E5))
                    }

                    var R = sa, k = {subscribers: {}},
                        z = {}, Da = {
                            oauth: "https://api.twitter.com/oauth/",
                            api: "https://api.twitter.com/1.1/"
                        }, m = ["get", "post", "delete", "put"], n, P;
                    a(z, "session", function () {
                        var a = R.profile.passport.get("twitter");
                        return a && a.token ? a : !1
                    });
                    M(z, "session", function (a) {
                        var b = R.profile.passport;
                        if (a && null !== a) {
                            var c = this.connected;
                            b.set("twitter", a);
                            c !== a.installed && G.call(Oc, a.installed ? "onConnected" : "onDisconnected")
                        } else b.remove("twitter")
                    });
                    a(z, "connected", function () {
                        return (R.profile.passport.get("twitter") || {}).installed || !1
                    });
                    (function (a) {
                        switch (a.type) {
                            case "onLoadProfile":
                                (function () {
                                    G.call(k, z.connected ? "onConnected" : "onUnpairedProfile")
                                }).delay(100);
                                break;
                            case "onUnloadProfile":
                                (function () {
                                    G.call(k, "onDisconnected")
                                }).delay(100)
                        }
                    }).subscribeTo(sa, ["onLoadProfile", "onUnloadProfile"]);
                    a(k, "init", function () {
                        return h
                    });
                    a(k, "reset", function () {
                        return y
                    });
                    a(k, "api", function () {
                        return g
                    });
                    a(k, "login", function () {
                        return f
                    });
                    a(k, "logout", function () {
                        return sa.logout
                    });
                    a(k, "userId", function () {
                        return z.session && z.session.id
                    });
                    a(k,
                        "userInfo", function () {
                            return z.user
                        });
                    a(k, "getImageById", function () {
                        return ta
                    });
                    return k
                }(), jd = function () {
                    function b(a, c, d, e, f, T) {
                        T = T || R;
                        e = e || {};
                        if (Da[a]) {
                            var g = z.session;
                            g && g.token && !e.access_token && (e.access_token = g.token, e.locale = k.profile.locale.replace("-", "_"));
                            return (new ra({
                                url: Da[a] + c,
                                headers: {Accept: "application/json"},
                                method: -1 < m.indexOf(d) ? d : "get",
                                proxy: !0,
                                data: e,
                                monitoring: !1,
                                isSuccess: function () {
                                    var a = this.status;
                                    return 200 <= a && 300 > a || 400 === a || 500 === a
                                },
                                onSuccess: function (a) {
                                    a && a.error &&
                                    190 === a.error.code && (z.session = null);
                                    f.call(T, a, e)
                                },
                                onError: function () {
                                    Hb(arguments)
                                }
                            })).send()
                        }
                    }

                    function c(a) {
                        P && !1 !== z.session ? new b("graph", "me?fields=installed", "get", null, function (b) {
                            b && b.id && (z.session = Ka(z.session || {}, b), a && a.call && a())
                        }) : !1 === z.session && z.connected && (z.session = null)
                    }

                    function d(a) {
                        if (P && !z.connected && !n) {
                            var f = !1, g = u, y, h;
                            y = new b("graph", "oauth/device", "post", {
                                    type: "device_code",
                                    client_id: P,
                                    scope: "user_activities,user_checkins,user_events,user_about_me,user_friends,user_likes,user_location,user_photo_video_tags,user_photos,user_questions,user_status,user_videos,friends_activities,friends_checkins,friends_events,friends_likes,friends_location,friends_photo_video_tags,friends_photos,friends_questions,friends_status,friends_videos,export_stream,publish_actions,publish_checkins,publish_stream,status_update,user_actions.books,user_actions.fitness,user_actions.music,user_actions.news,user_actions.video"
                                },
                                function (d) {
                                    n = !0;
                                    l(g, {
                                        type: "facebook-login",
                                        conf: {
                                            ignoreBackKey: !1,
                                            key: d.code,
                                            title: "FB_CONNECT",
                                            message: "FB_CODE",
                                            code: d.user_code
                                        }
                                    }, function () {
                                        f = !0;
                                        n = !1;
                                        y && y.abort();
                                        h && h.abort()
                                    });
                                    h = new b("graph", "oauth/device", "post", {
                                        type: "device_token",
                                        client_id: P,
                                        code: d.code
                                    }, function (b, T) {
                                        z.session && z.session.id ? (y = h = null, c(function () {
                                            e(u, {conf: {key: d.code}});
                                            a && a.call && a();
                                            n = !1
                                        })) : b && b.error && 1 === b.error.code && !f ? g === u ? h.send.delay(3E3) : (e(u, {conf: {key: d.code}}), a && a.call && a(), n = !1) : b && b.access_token && 0 <
                                        b.access_token.length ? (z.session = Ka(z.session || {}, {
                                            code: T.code,
                                            token: b.access_token
                                        }), y = h = null, c(function () {
                                            e(u, {conf: {key: d.code}});
                                            a && a.call && a();
                                            n = !1
                                        })) : n = !1
                                    })
                                })
                        }
                    }

                    function f() {
                        if (P && z.connected) {
                            for (var a = Ia(arguments), c = a.shift(), e = a.shift(), g, y, h; e;) {
                                var l = x(e);
                                if ("string" !== l || g)if ("function" !== l || h) {
                                    if ("object" !== l || y)return;
                                    y = e
                                } else h = e; else g = Aa(e);
                                e = a.shift()
                            }
                            g = g || "get";
                            y = y || {};
                            "/" === c[0] && (c = c.substr(1));
                            return new b("graph", c, g, y, h, R)
                        }
                        if (P) {
                            var k = Ia(arguments), Da = arguments.callee;
                            d(function () {
                                Da.apply(R,
                                    k)
                            })
                        } else throw pa("Facebook is not initialized");
                    }

                    function g(a, b) {
                        return Da.graph + a + "/picture?type=" + (b || "small") + "&access_token=" + (z.session && z.session.token || "")
                    }

                    function y() {
                        A && Ub(A);
                        c()
                    }

                    function h(a) {
                        a && "string" === x(a) && (P = a, y(), A = Pb(c, 6E4))
                    }

                    var k = sa, R = {subscribers: {}}, z = {}, Da = {
                        api: "https://api.facebook.com/",
                        api_read: "https://api-read.facebook.com/",
                        graph: "https://graph.facebook.com/"
                    }, m = ["get", "post", "delete", "put"], n = !1, P, A;
                    a(z, "session", function () {
                        var a = k.profile.passport.get("facebook");
                        return a && a.token ? a : !1
                    });
                    M(z, "session", function (a) {
                        var b = k.profile.passport;
                        if (a && null !== a) {
                            var c = this.connected, d = a.installed || !1;
                            b.set("facebook", a);
                            c !== d && G.call(R, d ? "onConnected" : "onDisconnected")
                        } else b.remove("facebook")
                    });
                    a(z, "connected", function () {
                        return (k.profile.passport.get("facebook") || {}).installed || !1
                    });
                    (function (a) {
                        switch (a.type) {
                            case "onLoadProfile":
                                (function () {
                                    G.call(R, z.connected ? "onConnected" : "onUnpairedProfile")
                                }).delay(0);
                                break;
                            case "onUnloadProfile":
                                (function () {
                                    G.call(R, "onDisconnected")
                                }).delay(0)
                        }
                    }).subscribeTo(sa,
                        ["onLoadProfile", "onUnloadProfile"]);
                    a(R, "init", function () {
                        return h
                    });
                    a(R, "reset", function () {
                        return y
                    });
                    a(R, "api", function () {
                        return f
                    });
                    a(R, "logout", function () {
                        return sa.logout
                    });
                    a(R, "login", function () {
                        return d
                    });
                    a(R, "userId", function () {
                        return z.session && z.session.id
                    });
                    a(R, "getImageById", function () {
                        return g
                    });
                    return R
                }();
                a(A, "Facebook", function () {
                    return jd
                });
                a(A, "Twitter", function () {
                    return Oc
                });
                var tb = function () {
                    return {
                        get: function (a) {
                            var b = Ia(arguments), c = "", d = "stack" === a || "fa-stack" === a;
                            d && (c +=
                                '<span class="fa-stack">', b.splice(0, 1));
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
                a(A, "FontAwesome", function () {
                    return tb
                });
                a(A, "CSSMatrix", function () {
                    return Ob
                });
                a(A, "Animator", function () {
                    return hc
                });
                var H = p.requestAnimationFrame || p.webkitRequestAnimationFrame || p.mozRequestAnimationFrame || p.msRequestAnimationFrame || p.oRequestAnimationFrame || function (a) {
                        return Kb(a,
                            1 / 30)
                    }, w = function (a) {
                    return H.call(p, a)
                };
                a(A, "requestAnimationFrame", function () {
                    return w
                });
                var Rb = p.cancelAnimationFrame || p.webkitCancelAnimationFrame || p.mozCancelAnimationFrame || p.msCancelAnimationFrame || p.oCancelAnimationFrame || function (a) {
                        hb(a)
                    }, Ha = function (a) {
                    return Rb.call(p, a)
                };
                a(A, "cancelAnimationFrame", function () {
                    return Ha
                });
                a(A, "HashMap", function () {
                    return id
                });
                a(A, "getter", function () {
                    return a
                });
                a(A, "setter", function () {
                    return M
                });
                a(A, "current", function () {
                    return S[u]
                });
                a(A, "getComputedStyle",
                    function () {
                        return kc
                    });
                a(A, "md5", function () {
                    return Ca
                });
                a(A, "sha1", function () {
                    return hd
                });
                a(A, "JSON", function () {
                    return ka
                });
                a(A, "XMLDOM", function () {
                    return Jc
                });
                a(A, "unlink", function () {
                    return xa
                });
                a(A, "clone", function () {
                    return xa
                });
                a(A, "typeOf", function () {
                    return x
                });
                a(A, "random", function () {
                    return Sb
                });
                a(A, "open", function () {
                    return ga.activevideo ? f : p.open
                });
                ["emptyFn", "confirm", "prompt"].forEach(function (b) {
                    a(this, b, function () {
                        return ta
                    })
                }, A);
                var C = {
                    Theme: new xb, Stats: {}, Library: {}, element: {}, control: {},
                    dialogs: {}, media: {}, system: {Event: b}, keyboard: {}, utility: {vsprintf: N.vsprintf}, views: {}
                }, ha = C.Library;
                a(p.MAF, "Notification", function () {
                    return {ALERT: "alert", CALL2ACTION: "c2a"}
                });
                a(p.MAF, "system", function () {
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
                a(C, "Notification", function () {
                    return p.MAF.Notification
                });
                a(C.system, "setState", function () {
                    return p.MAF.system.setState
                });
                a(C.system, "setMode", function () {
                    return p.MAF.system.setMode
                });
                a(C.system, "setUrl", function () {
                    return g
                });
                a(C.system, "notify", function () {
                    return widget.notify
                });
                h.prototype = {
                    constructor: h, toString: function () {
                        return this.valueOf()
                    }, valueOf: function () {
                        return N(Ba)
                    }, reload: ta, replace: ta, assign: ta
                };
                a(A, "location", function () {
                    return new h
                });
                a(A, "navigator", function () {
                    return oc
                });
                a(A, "Browser", function () {
                    return ga
                });
                a(C, "Browser", function () {
                    return ga
                });
                a(C, "Event", function () {
                    return b
                });
                a(A, "YouTube", function () {
                    return Eb
                });
                a(C, "Request", function () {
                    return R
                });
                ["Event", "Request", "Theme", "Library"].forEach(function (b) {
                    a(this, b, function () {
                        return C[b]
                    })
                }, A);
                ["innerWidth", "outerWidth"].forEach(function (b) {
                    a(this, b, function () {
                        return 1920
                    })
                }, A);
                ["innerHeight", "outerHeight"].forEach(function (b) {
                    a(this, b, function () {
                        return 1080
                    })
                }, A);
                a(A, "screen", function () {
                    var a = this.innerWidth, b = this.innerHeight;
                    return {availWidth: a, availHeight: b, width: a, height: b, log: Nc.log}
                });
                a(A, "XMLHttpRequest", function () {
                    return fb
                });
                a(A, "profile", function () {
                    return sa.profile
                });
                var P = ja.GenericStorage, W = new P("pd", !0);
                a(A, "GenericStorage", function () {
                    return P
                });
                a(A, "currentProfileData", function () {
                    return W
                });
                "Array Boolean Date Function Number String RegExp".split(" ").forEach(function (b) {
                    var c, d = "is" + b;
                    /String|Number|Boolean/.test(b) && (c = Aa(b));
                    C[d] = "Array" === b && ea.isArray || function (a) {
                            return c && x(a) === c ? !0 : Ic.call(a) === "[object " + b + "]"
                        };
                    a(this, d, function () {
                        return this.MAF[d]
                    })
                }, A);
                a(A,
                    "isEmpty", function () {
                        return Yb
                    });
                ha.Storage = {
                    store: function (a, b) {
                        var c = this._classID;
                        la(r[c]) && (r[c] = {});
                        r[c][a] = b
                    }, retrieve: function (a) {
                        var b = this._classID;
                        return r[b] && r[b][a]
                    }, eliminate: function (a) {
                        var b = this._classID;
                        r[b] && r[b][a] && delete r[b][a]
                    }
                };
                ha.DOM = {
                    appendChild: function (a) {
                        a = Sa(a);
                        if (!a || !a.element)return !1;
                        this.children.push(a);
                        a.owner = this;
                        a.element.inject(this.element);
                        this.fire("onChildAppended", {child: a});
                        a.fire("onAppend", {parent: this.element, owner: this});
                        return this
                    }, adopt: function () {
                        Ia(arguments).forEach(this.appendChild,
                            this);
                        return this
                    }, appendTo: function (a) {
                        a = Sa(a);
                        if (!a || !a.element)return !1;
                        a.appendChild(this);
                        return this
                    }, moveTo: function (a) {
                        var b = Sa(this.element);
                        b && b.owner ? b.owner.detachChild(b) : b && b.detachChild(b);
                        b.appendTo(a);
                        return this
                    }, detachChild: function (a) {
                        var b;
                        if (this.children) {
                            if ("string" === x(a)) {
                                switch (a) {
                                    case "first":
                                        b = 0;
                                        break;
                                    case "last":
                                        b = this.children.length - 1
                                }
                                a = this.children[b]
                            } else"number" === x(a) ? (b = a, a = this.children[b]) : a && a.owner === this && (b = this.children.indexOf(a));
                            X(b) && this.children.splice(b,
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
                        var a = this, b = a.owner, c = N(a.ClassName);
                        b && b.removeChild(a);
                        delete a.subscribers;
                        delete a.data;
                        delete a.config;
                        a._classID && r[a._classID] && delete r[a._classID];
                        a.children && a.removeChildren();
                        a.skinElement &&
                        (a.skinElement.destroy(), delete a.skinElement);
                        a.element && (delete a.element.owner, a.element.destroy(), delete a.element);
                        try {
                            return sc.call(a)
                        } finally {
                            q.forEach(a, function (b, d) {
                                var e = x(d);
                                "object" !== e && "array" !== e && "instance" !== e && "element" !== e || (a.element ? lb : Ga)("memory leak?", c, b, e)
                            })
                        }
                    }, empty: function (a) {
                        for (; this.children.length;)this.removeChild(this.children[0]);
                        this.children = [];
                        for (a && this.removeSkin && this.removeSkin(); a && this.element && this.element.childNodes.length;)this.element.removeChild(this.element.childNodes.item(0));
                        return this
                    }
                };
                ha.Styles = {
                    setStyle: function (a, b) {
                        "backgroundImage" !== a && "maskImage" !== a || !b || 0 === b.indexOf("url(") || Lb.test(b) || 0 === b.indexOf(c()) || (b = d() + b);
                        this.element && this.element.setStyle(a, b);
                        return this
                    }, getStyle: function (a) {
                        return this.element && this.element.getStyle(a)
                    }, setStyles: function (a) {
                        for (var b in a || {})this.setStyle(b, a[b]);
                        return this
                    }, getStylesCopy: function () {
                        var a = {}, b = this.element;
                        if (b)for (var c in b.style)X(b.style[c]) && (a[c] = b.style[c]);
                        "height width hOffset vOffset hAlign vAlign".split(" ").forEach(function (b) {
                            X(this[b]) &&
                            (a[b] = this[b])
                        }, b);
                        return a
                    }
                };
                ha.Themes = {
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
                        var d = this.element, e = A.current.Theme;
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
                k.prototype = {constructor: k};
                a(A, "Class", function () {
                    return k
                });
                a(C, "Class", function () {
                    return k
                });
                a(k, "__instances__", function () {
                    return sb
                });
                k.helpers = {
                    extend: Tb,
                    merge: Ka,
                    unlink: xa,
                    type: x,
                    empty: Yb,
                    dump: ta,
                    contains: Vc,
                    splat: Wc,
                    later: Xc
                };
                k.Mutators = {
                    Protected: function (a, b, c) {
                        q.forEach(b, function (a, b) {
                            "function" === typeof b && (this[a] = b)
                        }, a);
                        b = null;
                        return a
                    },
                    Extends: function (a, b) {
                        k._prototyping = b;
                        var c = new b;
                        delete c.parent;
                        c = k.Methods.inherit(c, a);
                        delete k._prototyping;
                        return c
                    }, Implements: function (a, b) {
                        (b instanceof ea ? b : [b]).forEach(function (b) {
                            k._prototyping = b;
                            Tb(a, "class" === x(b) ? new b : b);
                            delete k._prototyping
                        });
                        return a
                    }
                };
                k.Methods = {
                    inherit: function (a, b) {
                        var c = arguments.callee.caller, d;
                        for (d in b) {
                            var e = b[d];
                            if (X(e)) {
                                var f = a[d], g = x(e);
                                f && "function" === g ? e !== f && (c ? (e.__parent__ = f, a[d] = e) : this.override(a, d, e)) : a[d] = f && "object" === g ? Ka(f, e) : e
                            }
                        }
                        c && (a.parent =
                            function () {
                                return arguments.callee.caller.__parent__.apply(this, arguments)
                            });
                        return a
                    }, override: function (a, b, c) {
                        var d = k._prototyping;
                        d && a[b] !== d[b] && (d = null);
                        a[b] = function () {
                            var e = this.parent;
                            this.parent = d ? d[b] : a[b];
                            var f = c.apply(this, arguments);
                            this.parent = e;
                            return f
                        }
                    }, implement: function () {
                        var a = this.prototype;
                        Ia(arguments).forEach(function (b) {
                            this.inherit(a, b)
                        }, this);
                        return this
                    }, getDefaults: function () {
                        return xa(this.prototype.config)
                    }, inheritsFrom: function (a) {
                        if (this === a)return !0;
                        for (var b = this.prototype.constructor,
                                 c = b === a; !c && b !== q;)b = b.prototype.constructor, c = a === b;
                        return c
                    }, proxyProperty: function (b, c, d) {
                        a(b, d, function () {
                            return c && c[d]
                        });
                        M(b, d, function (a) {
                            return c ? (c[d] = a, c[d]) : a
                        })
                    }, proxyProperties: function (a, b, c) {
                        for (var d = 0; d < c.length; d++)this.proxyProperty(a, b, c[d])
                    }
                };
                k.Libraries = {
                    Config: {
                        setConfig: function (a) {
                            this.config = Ka(this.config, a);
                            return this
                        }, getConfig: function () {
                            return xa(this.config)
                        }, getDefaults: function () {
                            return this.constructor.getDefaults()
                        }
                    }, Events: {
                        subscribers: {}, fire: G, addEvents: function (a) {
                            for (var b in a)if (a[b] &&
                                /^on[A-Z]/.test(b)) {
                                var c = a[b];
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
                m.prototype = {constructor: m};
                a(m, "__instances__", function () {
                    return elementInstances
                });
                a(A, "Element", function () {
                    return m
                });
                "Window IFrame View Dialog Frame Text Image List Item Canvas".split(" ").forEach(function (b) {
                    a(this, b, function () {
                        var a =
                            function (a) {
                                return new m(Aa(b), a)
                            };
                        a.prototype = {constructor: a};
                        "Image" === b && (a.WHITE = ed, a.BLANK = fd, a.CHECKERS = gd);
                        return a
                    })
                }, A);
                Da.prototype = {constructor: Da};
                a(A, "Timer", function () {
                    return Da
                });
                a(A, "createDocumentFragment", function () {
                    return Ac
                });
                var I = [];
                a(A, "defines", function () {
                    return I
                });
                a(A, "define", function () {
                    return function (a, b, c) {
                        0 === a.indexOf("MAF") ? zc(a.substring(4), C, b.bind(A)) : I.push(zc(a, A, b.bind(A)));
                        c && A.Theme.set(c)
                    }
                });
                ["messages", "mediaplayer", "HostEventManager", "application"].forEach(function (b) {
                    a(C,
                        b, function () {
                            return A.current && A.current.MAF[b]
                        })
                });
                var J = function () {
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
                        var a = K(), b = K(v);
                        return a && a.DATE_FORMAT || b && b.DATE_FORMAT || format.DATETIME
                    });
                    a(b, "PARSE_DEFAULT", function () {
                        var a = K();
                        return a && a.DATE_PARSE || J.DATETIME
                    });
                    return b
                }();
                a(A, "DateFormat", function () {
                    return J
                });
                p.moment && function () {
                    function b(a, c, d) {
                        a = a || new da;
                        c = c || J.FORMAT_DEFAULT;
                        return moment(a).format(c, d)
                    }

                    function c(a, b, d) {
                        b = b || J.PARSE_DEFAULT;
                        return moment(a, b, d || "en").toDate()
                    }

                    a(da, "format", function () {
                        return b
                    });
                    a(da, "parse", function () {
                        return c
                    })
                }();
                p.numeral && (a(Ab, "DECIMAL", function () {
                    return numeral(1E3).format("0,0")[1]
                }), a(Ab, "CURRENCY", function () {
                    return numeral(1).format("$0").replace("1", "").trim()
                }));
                a(A,
                    "MAF", function () {
                        return C
                    });
                a(A, "include", function () {
                    return function (a) {
                        try {
                            return yb("with(this){" + n(a) + "}").call(this), !0
                        } catch (b) {
                            return lb(a, b), !1
                        }
                    }
                });
                p.addEventListener("unload", function () {
                    Ja && (Ja.destroy(), Ja = null)
                });
                A.include("maf-ui.js")
            }

            function ia(a) {
                var b = S[v], c = a.getData() || {}, d = "loadView" === a.subject ? this.widget.getElementById(c.id) : r;
                if (!b || !b.widget.handleChildEvent || b.widget.handleChildEvent.apply(this, arguments))switch (a.subject) {
                    case "toggleViewport":
                        !a.error && a.id && h(a.id, "onActivateAppButton",
                            {type: "viewport-toggle"}, va);
                        break;
                    case "exit":
                    case "exitToDock":
                        !a.error && a.id && h(a.id, "onAppFin", {id: a.id}, va);
                        break;
                    case "loadView":
                        !a.error && c.id && (d ? ((b = this.currentViewId) && h(a.id, "onUnselect", {id: b}, va), h(a.id, "onShowView", {id: c.id}, va)) : h(a.id, "onLoadView", {id: c.id}, va))
                }
                this && this.widget && this.widget.onDispatchedChildEvent && this.widget.onDispatchedChildEvent.apply(this, arguments)
            }

            function g(b, c, e) {
                function f(a, c, d) {
                    p.MAF.system.notify(a, c, d, b)
                }

                var g = ia.bind(c);
                a(this, "dispatchChildEvent",
                    function () {
                        return g
                    });
                a(this, "locale", function () {
                    return sa.profile.locale
                });
                a(this, "active", function () {
                    return u === b
                });
                a(this, "notify", function () {
                    return f
                });
                a(this, "isDialogActive", function () {
                    return kb
                });
                q.forEach(O[b], function (c) {
                    a(this, c, function () {
                        return O[b][c]
                    })
                }, this);
                this.getImageSource = function (a, c) {
                    var d = O[b].images && O[b].images, d = c ? d && d[a] && d[a][c] : d && d[a];
                    if ("object" === x(d))var e = sa.profile, d = d[e.languageCode] || d[e.locale] || d[e.languageCode + "-EU"] || d[Gb];
                    return d
                };
                this.getImage = function (a,
                                          b) {
                    var c = ya("img"), d = this.getImageSource.apply(this, arguments) || "";
                    c.source = d;
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
                    return a ? Sa(b + "-" + a) : Sa(b)
                };
                this.getLocalizedString = function (a, c) {
                    var d = K(b, a);
                    return c ?
                        N.vsprintf(d, c) : d
                };
                this.getPath = function (a) {
                    return d(b) + (a || "")
                };
                this.getUrl = function (a, c) {
                    return d(b, c !== r ? c : !0) + (a || "")
                };
                this.getSetting = function (a) {
                    var c = B(a);
                    a = O[b][a];
                    return a !== r ? a : c
                };
                this.createDocumentFragment = Ac;
                this.createWindowFromXML = ta
            }

            function L() {
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

            function Z(a, b, c) {
                function e(a, d) {
                    a !== v && V.fire(v,
                        "onApplicationAvailable", O[a]);
                    k.push(a);
                    b && b(a);
                    c && (n++, n === m && (n = 0, c(k)))
                }

                function f(a, b, c, g) {
                    (new ra({
                        url: d(a) + "Localization/" + b + ".strings" + ("?" + da.now() || ""),
                        proxy: !1,
                        mimetype: "text/plain",
                        onSuccess: function (d) {
                            "string" === x(d) && (d = ka.parse(d));
                            ua[a][b] = d;
                            e(a, c)
                        },
                        onFailure: function () {
                            b === h || g ? b !== Gb ? f(a, Gb, c, !0) : lb("no localization files found for " + a) : f(a, h, c)
                        }
                    })).send()
                }

                var g = sa.profile, h = g.languageCode + "-EU", l = g.locale, k = [];
                a = [].concat(a || []);
                var m = a.length, n = 0;
                a.forEach(function (a, b) {
                    var c;
                    F.metadata && "object" === typeof F.metadata[a] ? (c = F.metadata[a], ua[a] = xa(c.language || {}), delete c.language, O[a] = Ka(c, uc[a] || {}), O[a].categories = [], e(a, b)) : "object" === typeof a ? (c = xa(a), a = N(c.identifier), ua[a] = xa(c.language || {}), delete c.language, O[a] = Ka(c, uc[a] || {}), e(a, b)) : (new ra({
                        url: d(a) + "metadata.json" + ("?" + da.now() || ""), proxy: !1, onSuccess: function (c) {
                            "string" === x(c) && (c = ka.parse(c));
                            c.identifier === a ? la(c.language) ? (O[a] = c, ua[a] = {}, f(a, l, b)) : (ua[a] = xa(c.language || {}), delete c.language, O[a] = c, e(a,
                                b)) : lb("identifier doesn't match metadata.json, please check your metadata.json for " + a)
                        }
                    })).send()
                })
            }

            function aa(a, b) {
                (new ra({
                    url: "//" + (Pa.appsServer || La[1] + "." + Fa + ".com/apps") + "/" + a,
                    data: {version: b},
                    proxy: !1,
                    onSuccess: function (a) {
                        a && (p.MAE = F = a, Pa = F.settings || {}, uc = Pa.metadata || {}, Wb = F.search ? F.search.blacklist || [] : Pa.blacklist || [], zb = F.hacks || Pa.hacks || {}, bb(!0))
                    }
                })).send()
            }

            function D(a) {
            }

            function na() {
                Ba.href = Ba.href.split("#")[0].split("?")[0] + "?t=" + da.now() + (cb[0] || "#") + (1 < cb.length ? "?" + cb[1] :
                        "")
            }

            function qa() {
                if (F.versions) {
                    var a = Ca(Aa(F.operator + F.country + F.environment)), b = new qb.Channel("admin|" + a);
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
                                if ("u" === c.e && c.v)return aa.delay(Sb(3E3), null, [a, c.v]);
                                if ("n" === c.e && c.v)return D.delay(Sb(1E3), null, [c.v]);
                                if ("r" === c.e)return na.delay(Sb(3E4))
                        }
                    }).subscribeTo(b, ["onConnected", "onData"]);
                    b.connected && b.join()
                }
            }

            function bb(a) {
                var b = N(v), c = "object" === typeof F.ui ?
                    F.ui.identifier : F.ui, d = da.now();
                Z(F.ui, function () {
                    if (!S[c]) {
                        if (S[b] && b !== c) {
                            if (u !== b) {
                                try {
                                    V.close(u)
                                } catch (e) {
                                }
                                try {
                                    V.unload(u)
                                } catch (f) {
                                }
                            }
                            try {
                                V.close(b)
                            } catch (g) {
                            }
                            try {
                                V.unload(b)
                            } catch (h) {
                            }
                            u = r;
                            v = c;
                            delete S[b]
                        }
                        a || m();
                        V.load(c);
                        V.open(c);
                        var l = Q.getElementById("pre-loader");
                        l && (l.parentNode.removeChild(l), l = null);
                        U("STARTUP: " + (d - Db) + ", " + (da.now() - Db))
                    }
                    Z("object" === typeof F.metadata ? q.keys(F.metadata) : F.apps, ta, function (b) {
                        F.apps = [].concat(b);
                        (F.categories || []).forEach(function (a) {
                            if ("object" === typeof a) {
                                var b =
                                    Aa(a.name);
                                (a.apps || []).forEach(function (a) {
                                    O[a] && (O[a].categories = O[a].categories || [], -1 === O[a].categories.indexOf(b) && O[a].categories.push(b))
                                })
                            }
                        });
                        (function () {
                            V.fire(v, "onApplicationsAvailable", b);
                            V.complete = !0;
                            V.onComplete(b);
                            db.autostart && (Ba.hash = db.autostart);
                            a || (qa.delay(1E3), Xa.send(v, "household"))
                        }).delay(100)
                    })
                })
            }

            da.now();
            var S = {}, O = {}, ua = {}, gb = {}, Ib = Sa("viewport"), v = "object" === typeof F.ui ? F.ui.identifier : F.ui, u, Ja, V, ra = function () {
                function b(a, c, d, f) {
                    d = d || a;
                    if (4 === a.readyState) {
                        if (c.onComplete)c.onComplete(a);
                        if (-1 !== g.indexOf(a.status) || c.isSuccess && c.isSuccess.call && !0 === c.isSuccess.call(a))try {
                            var h = (a.getResponseHeader("Content-Type") || "").split(";")[0], y = c.headers && (c.headers.Accept || c.headers.accept), l = a.responseText, k;
                            h || (h = y || h);
                            "text/plain" === h && y && (h = y);
                            switch (Aa(h)) {
                                case "text/xml":
                                case "application/xml":
                                    k = a.responseXML;
                                    break;
                                case "text/json":
                                case "application/json":
                                    try {
                                        k = ka.parse(l)
                                    } catch (z) {
                                        try {
                                            k = yb("return " + l)()
                                        } catch (m) {
                                            Ga("request is not returning correct json, returning responseText"),
                                                k = l
                                        }
                                    }
                                    break;
                                case "application/x-www-form-urlencoded":
                                    try {
                                        k = vb(l)
                                    } catch (n) {
                                        Ga("request is not returning correct form response, returning responseText"), k = l
                                    }
                                    break;
                                case "text/javascript":
                                case "application/javascript":
                                    try {
                                        k = yb("with(this){" + l.replace(Vb, "") + ("}\n//# sourceURL=" + c.url) + "\n").call(c.scope);
                                        break
                                    } catch (p) {
                                    }
                                    try {
                                        k = ka.parse(l)
                                    } catch (r) {
                                        Ga("request is not returning correct json or javascript, returning responseText"), k = l
                                    }
                                    break;
                                case "image/jpeg":
                                case "image/jpg":
                                case "image/png":
                                case "image/gif":
                                    for (var ha =
                                        l.length, P = "", q = 0; q < ha; q += 1)P += Ra(l.charCodeAt(q) & 255);
                                    k = "data:" + h + ";base64," + rc(P);
                                    break;
                                default:
                                    if (/\.strings$/.test(c.url.split("?")[0])) {
                                        h = {};
                                        q = (l || "").replace(Vb, "").match(/(.+)=(.+);/gm) || [];
                                        for (l = 0; l < q.length; l++) {
                                            var I = q[l].match(/['"](.+)['"][\s|\t]+=[\s|\t]+['"](.+)['"]/);
                                            I && 3 === I.length && (h[I[1]] = I[2].replace(e, "$1"))
                                        }
                                        P = h
                                    } else P = l;
                                    k = P
                            }
                            c.onSuccess && c.onSuccess.call && c.onSuccess.call(d, k, a)
                        } catch (J) {
                            f === u && c.onError && c.onError.call && c.onError.call(d, J)
                        } else c.onFailure && c.onFailure.call &&
                        c.onFailure.call(d, a)
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
                    function g() {
                        l && (l.abort(), l = r)
                    }

                    function h(a) {
                        var d = N(u), g = e.scope || this, k = -1;
                        a = a || e.data;
                        !0 === e.jsonp && (k = f++, a = a || {}, X(e.callback) && "string" === x(e.callback) ? a[e.callback] = "mafreq" + k : la(a.callback) && (a.callback = "mafreq" + k));
                        "object" === x(a) && ("GET" === e.method ? e.url += "" + (-1 === e.url.indexOf("?") ? "?" : "&") + (e.jsonp ? c(a) : q.toQueryString(a)) : "application/json" ===
                        e.headers["Content-Type"] ? (e.mimetype = e.headers["Content-Type"], a = ka.stringify(a)) : (e.headers["Content-Type"] = "application/x-www-form-urlencoded", a = q.toQueryString(a)));
                        if (-1 < k && e.onSuccess && e.onSuccess.call) {
                            var R;
                            p[a[e.callback || "callback"]] = function () {
                                delete p[a[e.callback || "callback"]];
                                X(R) ? e.onSuccess.apply(e.scope || null, arguments) : e.onFailure && e.onFailure.call && e.onFailure.call(g);
                                R && R.destroy && R.destroy();
                                R = r
                            };
                            try {
                                R = Cb(e.url, null, function () {
                                    delete p[a[e.callback || "callback"]];
                                    R && R.destroy &&
                                    R.destroy();
                                    R = r;
                                    d === u && e.onFailure && e.onFailure.call && e.onFailure.call(g)
                                })
                            } catch (m) {
                                delete p[a[e.callback || "callback"]], R && R.destroy && R.destroy(), R = r, d === u && e.onError && e.onError.call && e.onError.call(g, m)
                            }
                            return this
                        }
                        k = !1 === e.async;
                        l = new fb;
                        var n;
                        X(e.timeout) && !isNaN(e.timeout) && (n = function () {
                            n = r;
                            if (X(l)) {
                                var a = 0;
                                try {
                                    a = l && l.status || 0
                                } catch (b) {
                                }
                                0 === a && l.abort && l.abort.call && (l.abort(), e.onTimeout && e.onTimeout.call && e.onTimeout.call(g, l), l = r)
                            }
                        }.delay(e.timeout));
                        var za = e.url;
                        e.user && e.password ? za = za.replace("//",
                            "//" + encodeURIComponent(e.user) + ":" + encodeURIComponent(e.password) + "@") : e.user && (za = za.replace("//", "//" + encodeURIComponent(e.user) + "@"));
                        -1 !== za.indexOf("//") && -1 === za.indexOf(Fa + ".com/") && !1 !== e.proxy && !1 !== zb.proxy && (za = $b(za, "GET" !== e.method), "object" === x(e.proxy) && q.forEach(e.proxy, function (a, b) {
                            "object" === x(b) && (b = ka.stringify(b));
                            "cookie" === a || "headers" === a ? e.headers[("X-Proxy-" + a).capitalize()] = b : (za += "&" + a + "=" + escape(b), "nocache" === a && (za += "&t=" + Ca(Date.now() + "|" + (sa.profile && sa.profile.household ||
                                    ""))))
                        }));
                        X(e.mimetype) && l.overrideMimeType && l.overrideMimeType.call && l.overrideMimeType(e.mimetype);
                        2047 < za.length && Ga("url should not exceed 2047 length");
                        try {
                            l.open(e.method, za, !k), e.withCredentials && (l.withCredentials = "true"), q.forEach(e.headers, function (a, b) {
                                this.setRequestHeader(a, b)
                            }, l), l.send(a)
                        } catch (C) {
                            e.onFailure && e.onFailure.call && e.onFailure.call(g, l, C);
                            l = r;
                            return
                        }
                        k ? (X(n) && (hb(n), n = r), b(l, e, g, d), l = r) : l.onreadystatechange = function () {
                            4 === l.readyState && (X(n) && (hb(n), n = r), b(l, e, g, d), l = r)
                        };
                        return this
                    }

                    e = e || {};
                    e.method = e.method && Va(e.method) || "GET";
                    e.headers = e.headers || {};
                    var l;
                    a(this, "abort", function () {
                        return g
                    });
                    a(this, "send", function () {
                        return h
                    });
                    ["get", "post"].forEach(function (b) {
                        a(this, b, function () {
                            var a = this;
                            return function () {
                                Ga("get and post on request are deprecated, please use the send method");
                                e.method = Va(b);
                                return h.apply(a, arguments)
                            }
                        })
                    }, this)
                }

                var e = /\\("|')/g, f = 0, g = [200, 201];
                d.prototype = {constructor: d};
                return d
            }();
            b.prototype = {constructor: b};
            var G = function (a, c, d) {
                var e =
                    this.subscribers || {}, f;
                c = c || {};
                a instanceof b ? (f = a, a = f.type) : f = new b(a, c, d);
                e[a] = [].concat(e[a] || []).filter(function (a) {
                    return a instanceof yb
                });
                if (!e[a].length)return delete e[a], !0;
                var g = !1;
                q.each(e[f.type] || {}, function (a, b) {
                    if (b && b.call)try {
                        b.call(this, f)
                    } catch (c) {
                        Ja && Ja.error(c)
                    }
                    f.defaultPrevented && (g = !0);
                    if (f.propagationStopped)return !1
                }, this);
                return !g
            };
            (function () {
                wa.subscribeTo || (wa.subscribeTo = function (a, b, c, d) {
                    b = [].concat(b);
                    if (!a instanceof q)throw pa("Didn't provide an Object to subscribe to");
                    if (!b.length || "string" !== x(b[0]))throw pa("Didn't provide any event types to subscribe to");
                    if (a.fire && a.fire !== G)throw pa("Your Object already has a fire method");
                    a.subscribers || (a.subscribers = {});
                    a.fire = G;
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
                wa.subscribeOnce || (wa.subscribeOnce = function (a, b, c) {
                    b = [].concat(b);
                    if (!a instanceof q)throw pa("Didn't provide an Object to subscribe to");
                    if (!b.length || "string" !== x(b[0]))throw pa("Didn't provide any event types to subscribe to");
                    if (a.fire && a.fire !== G)throw pa("Your Object already has a fire method");
                    a.subscribers || (a.subscribers = {});
                    a.fire = G;
                    c = c ? this.bind(c) : this;
                    var d = function () {
                        var a = arguments.callee;
                        a.listener.apply(null, Ia(arguments));
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
                wa.unsubscribeFrom || (wa.unsubscribeFrom = function (a, b) {
                    if (!a || !a.subscribers)throw pa("Didn't provide a valid Object to unsubscribe from");
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
                var a = p.Element && p.Element.prototype;
                B("animation");
                (function (b) {
                    a.getAttribute = function (a) {
                        return this.retrieve("@" + a) || b.call(this, a)
                    }
                })(a.getAttribute);
                (function (b) {
                    wb.original = b;
                    a.setAttribute = function (a, e) {
                        if ("window" === this.retrieve("type") || "src" !== a && "id" !== a)return b.call(this, a, e);
                        this.store("@" + a, e);
                        if (e)switch (a) {
                            case "src":
                                var f = Lb.test(e), g = this.aspect, h = this.region, l = 0 === e.indexOf("data:");
                                !e || f || l || 0 === e.indexOf(c()) || (e = d() + e);
                                if (f && !l && e && (g || !this.remoteAsync)) {
                                    f = N(e);
                                    e = "//" + La[2] + "." + Fa + ".com/?url=" + encodeURIComponent(e);
                                    if (g) {
                                        var k = this.retrieve("originalWidth") || this.width || this.getAttribute("width") || 0, y = this.retrieve("originalHeight") ||
                                            this.height || this.getAttribute("height") || 0;
                                        0 < k && "height" !== g ? (e += "&width=" + k, this.store("originalWidth", k), "crop" !== g && this.removeAttribute("width")) : "height" === g ? this.removeAttribute("width") : "crop" === g && (g = "height");
                                        0 < y && "width" !== g ? (e += "&height=" + y, this.store("originalHeight", y), "crop" !== g && this.removeAttribute("height")) : "width" === g ? this.removeAttribute("height") : "crop" === g && (g = 0 < k ? "width" : "auto");
                                        e += "&type=" + g
                                    }
                                    h && (e += "&region=" + h);
                                    4096 < e.length && (e = f)
                                }
                                this.remoteAsync || l || (new ra({
                                    url: e, proxy: !1,
                                    async: !1, mimetype: "text/plain; charset=x-user-defined", onSuccess: function (a) {
                                        e = a
                                    }, onFailure: function (a, b) {
                                        throw b;
                                    }
                                })).send();
                                break;
                            case "id":
                                u && e && 0 !== e.indexOf(u) && (e = u + "-" + e)
                        }
                        return b.call(this, a, e)
                    }
                })(a.setAttribute)
            })();
            var Ea = {};
            k.prototype = {constructor: k};
            var xb = function () {
                function b(g, h) {
                    function l(a, b) {
                        if (g) {
                            if (ha[a] && ha[a][b])return ha[a][b];
                            if (W && W[a] && W[a][b])return W[a][b];
                            if (P && P[a] && P[a][b])return P[a][b]
                        } else {
                            if (e[u] && e[u][a] && e[u][a][b])return e[u][a][b];
                            if (W && W[a] && W[a][b])return W[a][b];
                            if (ha[a] && ha[a][b])return ha[a][b]
                        }
                    }

                    function k(a, b) {
                        var e = "";
                        if (b) {
                            var f = {};
                            q.forEach(b, function (a, g) {
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
                                        e += a.hyphenate() + ":" + (X(g) && !isNaN(g) ? ma(g) + "px" : g) + ";";
                                        break;
                                    case "fontSize":
                                        if (!isNaN(g) || g && -1 < g.indexOf("px"))g = (ma(g) / 24).toFixed(3) + "em";
                                        e += a.hyphenate() + ":" + g + ";";
                                        break;
                                    case "borderTopLeftRadius":
                                    case "borderBottomLeftRadius":
                                    case "borderTopRightRadius":
                                    case "borderBottomRightRadius":
                                    case "borderRadius":
                                        e =
                                            isNaN(g) ? e + (a.hyphenate() + ":" + g + ";") : e + (a.hyphenate() + ":" + g + "px;");
                                        break;
                                    case "backgroundImage":
                                        if (!g || "none" === g)break;
                                        var h = 0 !== g.indexOf("url(");
                                        g && h && !Lb.test(g) && 0 !== g.indexOf(c()) && (g = d() + g);
                                        g && h && (g = "url(" + g + ")");
                                        e += a.hyphenate() + ":" + g + ";";
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
                                        if (!1 ===
                                            B("gpu") && "transform" === a && "translateZ(0)" === g)break; else!0 === B("3d") && "transform" === a && "translateZ(0)" === g && (g = "translate3d(0,0,0)");
                                        e += Ya + a.hyphenate() + ":" + g + ";";
                                        break;
                                    case "wrap":
                                        !0 === g && (e += "white-space:normal;", f.wordWrap = "break-word");
                                        break;
                                    case "anchorStyle":
                                        h = Cc(g);
                                        f.textAlign = h[0] || "left";
                                        f.verticalAlign = h[1] || "top";
                                        break;
                                    case "truncation":
                                        f.overflow = "hidden";
                                        f.textOverflow = "end" === g ? "ellipsis" : "clip";
                                        break;
                                    case "visible":
                                        g || (e += "visibility:hidden;");
                                        break;
                                    case "hAlign":
                                    case "vAlign":
                                        break;
                                    case "hOffset":
                                    case "vOffset":
                                        var l = a.charAt(0), h = E[a], k = (b[l + "Align"] || h).hyphenate();
                                        "center" === k ? (l = b[F[l]], e += "top:50%;bottom:auto;", l && (e += "margin-" + h + ":" + l / 2 * -1 + "px;")) : e += k + ":" + (isNaN(g) || !g ? g : g + "px") + ";";
                                        break;
                                    case "zOrder":
                                        e += "z-index:" + g + ";";
                                        break;
                                    default:
                                        e += a.hyphenate() + ":" + g + ";"
                                }
                            });
                            0 < q.keys(f).length && k(a + " .innerText", f)
                        }
                        "" !== e && (J[a] = Q.createTextNode(K + a + "{" + e + "}\n" || ""), I.appendChild(J[a]))
                    }

                    function y(a, b, c) {
                        var d = J[a];
                        if (d) {
                            var e = d.textContent, e = e.replace(a, a + "," + b);
                            d.textContent =
                                e
                        }
                        c || ba.forEach(function (c) {
                            J[a + c] && y(a + c, b + c, !0)
                        })
                    }

                    function n(a) {
                        return T[a] || !1
                    }

                    function m(a, b, c) {
                        if (a && b && !0 !== B("nofonts")) {
                            c = c || ["eot", "woff", "truetype"];
                            var e = 'font-family: "' + a + '"; src:';
                            c.forEach(function (a, c) {
                                0 !== c && (e += ", ");
                                e += 'url("' + d() + b + "." + ("truetype" === a ? "ttf" : a) + '") format("' + a + '")'
                            });
                            e += ";";
                            r(a);
                            T[a] = Q.createTextNode("@font-face {" + e + "}\n" || "");
                            g === v ? f.appendChild(T[a]) : I.appendChild(T[a])
                        }
                    }

                    function p(a) {
                        Ma.setStyle("fontFamily", a)
                    }

                    function r(a) {
                        n(a) && (g === v ? f.removeChild(T[a]) :
                            I.removeChild(T[a]), delete T[a])
                    }

                    function t(a, b, c, d, e) {
                        if (a = l(a, "renderSkin"))return a(b, c, d, e, M)
                    }

                    function tb(a, b, c) {
                        a = l(a, "applyLayer");
                        if (b && a)return a(b.element || b, c, M)
                    }

                    function H(a, b) {
                        "object" === x(a) ? q.forEach(a, function (a, b) {
                            "object" === x(b) ? (ha[a] = xa(b), q.forEach(b, function (b, c) {
                                "styles" === b ? k("." + a, c) : c.styles && ("normal" === b ? k("." + a, c.styles) : k("." + a + "." + b, c.styles), ha[a].styles = ha[a].styles || {}, ha[a].styles[b] = xa(c.styles))
                            })) : (y("." + b, "." + a), Rb(a, b))
                        }) : ha[a] = xa(b)
                    }

                    function w(a, b) {
                        var c;
                        c =
                            g ? Ka(P && P[a] || {}, W && W[a] || {}, ha[a] || {}) : Ka(ha[a] || {}, W && W[a] || {}, e[u] && e[u][a] || {});
                        return xa(c && b ? c[b] : c)
                    }

                    function Rb(a, b) {
                        y("." + a, "." + b);
                        ha[a] = ha[b]
                    }

                    function Ha(a, b) {
                        var c = w(a, "styles") || {};
                        return c && c[b || "normal"] || c
                    }

                    function C() {
                        I.destroy();
                        I = M = J = T = D = ha = W = P = null;
                        delete e[g]
                    }

                    var ha = e[g || "default"] = {}, P = g && e["default"], W = e[v], I = ac("", h), J = {}, T = {}, F = {
                        h: "width",
                        v: "height"
                    }, E = {
                        hOffset: "left",
                        vOffset: "top"
                    }, M = this, K = g ? "#" + g.split(".").join("\\.") + " " : "", ba = [" .innerText", ".focused", ".selected"], D = {};
                    a(D, "add", function () {
                        return m
                    });
                    a(D, "remove", function () {
                        return r
                    });
                    a(D, "has", function () {
                        return n
                    });
                    g === v && a(D, "setDefault", function () {
                        return p
                    });
                    a(this, "get", function () {
                        return w
                    });
                    a(this, "set", function () {
                        return H
                    });
                    a(this, "alias", function () {
                        return Rb
                    });
                    a(this, "destroy", function () {
                        return C
                    });
                    a(this, "renderSkin", function () {
                        return t
                    });
                    a(this, "applyLayer", function () {
                        return tb
                    });
                    a(this, "getStyles", function () {
                        return Ha
                    });
                    a(this, "Fonts", function () {
                        return D
                    })
                }

                var e = {}, f = ac('@charset "UTF-8";');
                b.prototype =
                {constructor: b};
                return b
            }(), ja = function () {
                function b(a) {
                    if (!0 === zb.nocompress)return a;
                    var c = {};
                    a = encodeURIComponent(a + "").split("");
                    var d = [], e = a[0], f = 256, g, h;
                    for (h = 1; h < a.length; h++)g = a[h], X(c[e + g]) ? e += g : (d.push(1 < e.length ? c[e] : e.charCodeAt(0)), c[e + g] = f, f++, e = g);
                    d.push(1 < e.length ? c[e] : e.charCodeAt(0));
                    for (h = 0; h < d.length; h++)d[h] = Ra(d[h]);
                    return d.join("")
                }

                function c(a) {
                    if (!0 === zb.nocompress)return a;
                    var b = {};
                    a = (a + "").split("");
                    var d = a[0], e = d, f = [d], g = 256, h, l;
                    for (l = 1; l < a.length; l++)h = a[l].charCodeAt(0),
                        h = 256 > h ? a[l] : b[h] ? b[h] : e + d, f.push(h), d = h.charAt(0), b[g] = e + d, g++, e = h;
                    b = f.join("");
                    try {
                        return decodeURIComponent(b)
                    } catch (k) {
                        return b
                    }
                }

                function d() {
                    this.data = {};
                    this.synced = !0
                }

                function e(a, d) {
                    a = a || "maf";
                    d = d || 500;
                    var f, g;
                    try {
                        g = (f = p.localStorage) && f.getItem(a)
                    } catch (h) {
                        g = ""
                    }
                    try {
                        this.data = g && ka.parse(c(g) || "{}") || {}
                    } catch (l) {
                        f && f.removeItem(a), this.data = {}
                    }
                    f ? (this.sync = function () {
                        if (!this.synced) {
                            var c = b(ka.stringify(this.data));
                            f.getItem(a) !== c && f.setItem(a, c);
                            this.synced = !0
                        }
                    }, this.sync.periodical(d,
                        this)) : Ga("localstorage not supported")
                }

                function g(a, d, e) {
                    function f() {
                        for (var b = Q.cookie && Q.cookie.split(";"), c = 0; c < b.length; c++) {
                            var d = b[c];
                            if (0 === d.indexOf(a)) {
                                var e = d.indexOf("="), d = -1 < e ? d.substr(0, e) : d;
                                Q.cookie = d + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
                            }
                        }
                    }

                    function h() {
                        return Q.cookie && decodeURIComponent(Q.cookie.split(";").map(function (a) {
                                return a.trim().split("=")
                            }).reduce(function (b, c) {
                                0 === c[0].indexOf(a) && b.push(c[1]);
                                return b
                            }, []).join("")) || ""
                    }

                    function l(b, c) {
                        b = b || "";
                        c = c || 356;
                        var d = new da;
                        d.setDate(d.getDate() + c);
                        var f = encodeURIComponent(b).match(eb("[\\s\\S]{1," + k + "}", "g")) || [];
                        f.length < e && f.forEach(function (b, c) {
                            Q.cookie = a + c + "=" + b + ";expires=" + d.toUTCString()
                        })
                    }

                    a = a || "maf";
                    d = d || 2E3;
                    e = e || 50;
                    var k = 4058 - a.length - N(e).length - 1, n = Q.cookie, m = n && h();
                    try {
                        this.data = m && ka.parse(c(m) || "{}") || {}
                    } catch (R) {
                        f(), this.data = {}
                    }
                    X(n) ? (this.sync = function () {
                        this.data && !this.synced && (f(), l(b(ka.stringify(this.data))), this.synced = !0)
                    }, this.sync.periodical(d, this), Q.cookie && 0 !== Q.cookie.indexOf("maf0") && 0 <
                    Q.cookie.length && f()) : Ga("cookies not supported")
                }

                function l(a, b, c) {
                    try {
                        return "localStorage"in p && p.localStorage && !0 !== B("cookie") ? new e(a, b) : new g(a, b, c)
                    } catch (d) {
                        return new e(a, b)
                    }
                }

                function k(b, c, d) {
                    function e(a) {
                        return Ca(y + (c ? sa.profile.id + ":" : "") + (a || ""))
                    }

                    function f(a) {
                        a = e(a);
                        if (c) {
                            var b = sa.profile.id, d = ja.storage.get(b) || [], g = d.indexOf(a);
                            -1 !== g && (d.slice(g, 1), 0 < d.length ? ja.storage.set(b, d) : ja.storage.set(b))
                        }
                        ja.storage.set(a);
                        return !0
                    }

                    function g(a) {
                        return ja.storage.get(e(a))
                    }

                    function h(a,
                               b) {
                        x(b);
                        var d = e(a);
                        if (c) {
                            var f = sa.profile.id, g = ja.storage.get(f) || [];
                            -1 === g.indexOf(d) && (g.push(d), ja.storage.set(f, g))
                        }
                        ja.storage.set(d, b);
                        return !0
                    }

                    function l(a, b) {
                        return ja.storage.has(e(a))
                    }

                    d && (d += ":");
                    var y = (d || "") + b + (c ? ":" : "");
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
                        return l
                    })
                }

                function t() {
                }

                function D() {
                }

                function sb(b) {
                    a(this, "id", function () {
                        return Ca(this.uid + "|" + (b || ""))
                    });
                    a(this, "name", function () {
                        return b
                    });
                    a(this, "ageRating", function () {
                        return 0
                    });
                    a(this, "household", function () {
                        var a = this.uid;
                        return a && Ca(a)
                    });
                    a(this, "uid", function () {
                        var a = B("household") || !1;
                        if ("string" === typeof F.household)return F.household;
                        if ("string" === typeof a)return a;
                        if (Y && (Y.ip || Y.wan))return Ca(Y.ip || Y.wan)
                    });
                    a(this, "operator", function () {
                        return B("customer") || B("operator") || Fa
                    });
                    a(this, "packages", function () {
                        return []
                    });
                    a(this, "country", function () {
                        return Y && Y.geo && Y.geo.countryName
                    });
                    a(this, "countryCode", function () {
                        return B("country") ||
                            Aa(Y && Y.geo && Y.geo.country || "eu")
                    });
                    a(this, "language", function () {
                        return Kc[this.languageCode]
                    });
                    a(this, "languageCode", function () {
                        return Aa(B("language") || Mb.lang || "en")
                    });
                    a(this, "city", function () {
                        return Y && Y.geo && Y.geo.city
                    });
                    a(this, "latlon", function () {
                        return Y && Y.geo && Y.geo.ll || []
                    });
                    a(this, "ip", function () {
                        return Y && (Y.ip || Y.wan) || "127.0.0.1"
                    });
                    a(this, "wan", function () {
                        return this.ip
                    });
                    a(this, "lan", function () {
                        return Y && Y.lan || "127.0.0.1"
                    });
                    a(this, "mac", function () {
                        return "00:00:00:00:00:00"
                    });
                    a(this,
                        "locale", function () {
                            return this.languageCode + "-" + Va(this.countryCode)
                        });
                    a(this, "locked", function () {
                        return !1
                    });
                    var c = new k("pp", !0);
                    a(this, "passport", function () {
                        return c
                    })
                }

                function A(a) {
                    a = /\.js[^\.]*$/.test(a) ? a + ("?" + da.now() || "") : a + (".js?" + da.now() || ".min.js");
                    var b = Lb.test(a) ? a : Zb(a, "plugin"), c = new fb;
                    c.open("GET", b, !1);
                    c.send();
                    var d = "";
                    4 === c.readyState && 200 === c.status && c.responseText ? (d = ("\n" + c.responseText.replace(Vb, "")).replace(tc, function (a, b) {
                        return A(b)
                    }), d += "\n//# sourceURL=" + b + "\n") : Ga("error loading plugin: " +
                        a);
                    return d
                }

                function K(a, b, c) {
                    b = b || {};
                    a && Va(a)in T && (ib[a] = !0 === c ? Ka(ib[a], b) : b)
                }

                function L(a, b) {
                    if (a && Va(a)in T)return ib[a] && ib[a][b]
                }

                function tb(a, b, c) {
                    var d = ya("object"), e = wb.original;
                    a && e.call(d, "id", a);
                    b && e.call(d, "name", b);
                    c && e.call(d, "type", c);
                    return Ma.appendChild(d)
                }

                function H() {
                    debug.apply(null, ["plugin"].concat(Ia(arguments)))
                }

                function Qc(a) {
                    try {
                        return yb("with(this){" + A(a) + "}").call(J), !0
                    } catch (b) {
                        return U("PLUGIN ERR: " + b), lb(a, b), !1
                    }
                }

                function Rb() {
                    ab.back()
                }

                function Ha() {
                    p.close()
                }

                function C(a, b) {
                    U("PM: resume");
                    oa || (oa = !0, 0 === rb && (a = a || gc, rb = da.now(), Jb || (Jb = sa.profile && sa.profile.household), a && (a = a.replace("#", "")), a && 0 === a.indexOf("/") && (a = null), Xa.send(v, "show", {
                        hash: a,
                        session: Jb ? Ca(Jb + rb) : null
                    })), I.resuming && I.resuming(), !0 === b ? oa = aa = !1 : ea = function () {
                        ea = r;
                        V.fire(u, u === v ? "onShowView" : "onSelect", {id: S[u] && S[u].currentViewId});
                        oa = aa = !1
                    }.delay(400))
                }

                function ha(a, b) {
                    U("PM: exit");
                    mb.active && mb.reset();
                    mb.clearBoundState();
                    0 !== rb && (Jb || (Jb = I.profile.household), Xa.send(v, "hide",
                        {duration: pb(rb), session: Jb ? Ca(Jb + rb) : null}), rb = 0);
                    if (ba || aa)I.exit && !b && I.exit(); else if (I.exit && (ea && (hb(ea), ea = r), ba = !0, I.exit && !b && I.exit(), u !== v && V.close(u), !a)) {
                        var c = S[v], d = c && c.document && c.document.body;
                        V.fire(v, "onHideView", {id: c && c.currentViewId});
                        d && d.focus();
                        aa = !0;
                        ba = !1
                    }
                }

                var P = "#boot" === cb[0];
                (new ra({
                    url: "/" === Ba.pathname ? "/ip" : "//" + La[0] + "." + Fa + ".com/?maf=true",
                    jsonp: !0,
                    timeout: 3E3,
                    onSuccess: function (a) {
                        Y = a;
                        var b = Qa("geochanged");
                        q.forEach(S, function (a, c) {
                            c.dispatchEvent(b)
                        });
                        m();
                        Xa.send(v,
                            "household")
                    },
                    onFailure: function () {
                    }
                })).send();
                d.prototype = {
                    constructor: d, set: function (a, b) {
                        if (la(b) || null === b)this.data[a] = null, delete this.data[a], this.synced = !1; else {
                            var c = xa(b);
                            this.data[a] !== c && (this.data[a] = c, this.synced = !1)
                        }
                        this.sync()
                    }, get: function (a) {
                        return (a = this.data[a]) ? xa(a) : r
                    }, has: function (a) {
                        return X(this.data[a])
                    }, sync: ta
                };
                e.prototype = new d;
                e.prototype.constructor = e;
                g.prototype = new d;
                g.prototype.constructor = g;
                k.prototype = {constructor: k};
                t.TV = 0;
                t.PIP = 1;
                t.MUSIC = 2;
                t.FX = 3;
                t.type = {
                    VIDEO: 0,
                    AUDIO: 1
                };
                t.prototype = {
                    constructor: t,
                    subscribers: null,
                    id: t.TV,
                    type: t.type.VIDEO,
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
                        Ib.setStyle("backgroundColor", "black")
                    },
                    show: function () {
                        Ib.setStyle("backgroundColor", null)
                    },
                    notify: function () {
                        Hb("notify", arguments)
                    },
                    destroy: ta,
                    backToLive: ta,
                    supports: function (a) {
                        return !0
                    }
                };
                t.state = {
                    INIT: -1, PLAY: 0, PAUSE: 1, FORWARD: 2, REWIND: 3, STOP: 4, BUFFERING: 5, BUFFEREMPTY: 6,
                    INFOLOADED: 7, EOF: 8, UNKNOWN: 9, ERROR: 10
                };
                var W = function () {
                    function b(a) {
                        if (!1 !== B("poster") && !ga.middleware || !0 === B("poster")) {
                            var c = ga.rdk ? "//" + La[1] + "." + Fa + ".com/sdk/rdk.jpg" : "//" + La[1] + "." + Fa + ".com/sdk/" + Sb(4) + ".jpg";
                            a.setAttribute("poster", c)
                        }
                    }

                    function c(h, l) {
                        function k(a) {
                            G.call(p, "onStateChange", {state: a});
                            ic = a
                        }

                        function y(a) {
                            var b = a.type || "unknown";
                            switch (b) {
                                case "durationchange":
                                    if (!H)return;
                                    u = C.duration;
                                    return;
                                case "timeupdate":
                                    E && v && (a = da.now(), a - 800 > za && (tb = C.currentTime, za = a, G.call(p, "onTimeChange")));
                                    return;
                                case "ended":
                                    if (!H)return;
                                    break;
                                case "emptied":
                                    if (!E || !H)return;
                                    E = !1;
                                    H = r;
                                    u = 0;
                                    break;
                                case "error":
                                    if (!E || !v)if (H)a.preventDefault(); else return;
                                    break;
                                case "loadstart":
                                    if (!H)return;
                                    break;
                                case "pause":
                                    if (!v) {
                                        p.src = "";
                                        return
                                    }
                                    break;
                                case "play":
                                case "canplay":
                                case "canplaythrough":
                                    !0 === B("videoresize") && (this.bounds = this.bounds);
                                    if (!H)return;
                                    E || (E = !0, v = H);
                                    break;
                                case "progress":
                                    if (!H)return;
                                    G.call(p, "onBufferChange", {percentage: p.buffered});
                                    if (E)return;
                                    break;
                                case "ratechange":
                                    if (!H)return;
                                    a = p.rate;
                                    if (0 === a) {
                                        C.pause();
                                        return
                                    }
                                    if (1 === a) {
                                        if (C.paused) {
                                            try {
                                                C.play()
                                            } catch (c) {
                                            }
                                            return
                                        }
                                        b = "play"
                                    } else b = 0 > a ? "rewind" : "forward";
                                    break;
                                default:
                                    if (!H)return
                            }
                            a = e[b];
                            !X(a) || -1 === g.indexOf(a) && ic === a || k(a)
                        }

                        function m() {
                            !1 !== B("hidePlayer") && (A.display = "none")
                        }

                        function R() {
                            !1 !== B("hidePlayer") && (A.display = null)
                        }

                        function T() {
                            d.forEach(function (a) {
                                this.removeEventListener(a, y)
                            }, C);
                            C.destroy();
                            J = A = C = I = null;
                            delete p.subscribers
                        }

                        function P(a) {
                            var b = B("forceMime");
                            if (b)return -1 !== a.indexOf(b);
                            b = C.canPlayType(a) || !1;
                            !b &&
                            a && -1 < a.indexOf(";") && (b = C.canPlayType(a.split(";")[0]) || !1);
                            switch (b) {
                                case "maybe":
                                case "probably":
                                    return !0;
                                default:
                                    return !1
                            }
                        }

                        function z() {
                            if (C.src) {
                                C.src = "";
                                try {
                                    C.load()
                                } catch (a) {
                                }
                            }
                        }

                        l = t.type.AUDIO === l ? t.type.AUDIO : t.type.VIDEO;
                        var p = this, J = l === t.type.AUDIO, q = ya(J ? "audio" : "video"), ha = "inline" === B("player") || !1, C = q && (ha ? Ib.appendChild(q) : q.inject(Ma, "top")), I = J ? r : t.prototype.bounds, A = C && C.style, E = !1, tb = 0, u = 0, za = da.now(), H, v, ic;
                        if (C) {
                            ga.activevideo && !0 === C.muted && (C.muted = !1);
                            ga.metrological && (C.muted = !0);
                            q && !J && b(q);
                            p.subscribers = {};
                            h === t.TV ? (A.position = "absolute", A.left = 0, A.top = 0, wb(C, "width", ma(I[2] * (ha ? 1 : Oa))), wb(C, "height", ma(I[3] * (ha ? 1 : Wa)))) : A.display = "none";
                            h === t.PIP && (A.display = "none", A.zIndex = hc.ZORDER - 1);
                            d.forEach(function (a) {
                                this.addEventListener(a, y, !1)
                            }, C);
                            a(p, "id", function () {
                                return h
                            });
                            a(p, "type", function () {
                                return l
                            });
                            a(p, "waitIndicator", function () {
                                return !0
                            });
                            a(p, "backToLive", function () {
                                return z
                            });
                            var W = 1;
                            a(p, "channel", function () {
                                return new f(W, (B("runtime"), "Channel " + W))
                            });
                            M(p,
                                "channel", function (a) {
                                    if ("string" === x(a))"up" === a ? (W++, 1E3 === W && (W = 1)) : (W--, 0 === W && (W = 999)); else if (0 < a && 1E3 > a)W = a; else return;
                                    q && !J && b(q);
                                    G.call(p, "onChannelChange")
                                });
                            a(p, "program", function () {
                                var a = B("blocked") && -1 !== B("blocked").indexOf(W) ? {} : {
                                    title: (B("runtime"), "Program on " + W),
                                    description: "A program on channel " + W,
                                    startTime: Date.now(),
                                    duration: 3E5
                                };
                                return new n(a.title, a.description, a.startTime, a.duration)
                            });
                            a(p, "startTime", function () {
                                return C.startTime || 0
                            });
                            M(p, "startTime", function (a) {
                                C.startTime =
                                    a
                            });
                            a(p, "currentTime", function () {
                                return tb || 0
                            });
                            M(p, "currentTime", function (a) {
                                C.currentTime = a
                            });
                            a(p, "rates", function () {
                                return [1, 2, 6, 12, 30]
                            });
                            a(p, "rate", function () {
                                return this.paused ? 0 : C.playbackRate
                            });
                            M(p, "rate", function (a) {
                                C.playbackRate = a;
                                this.paused && (this.paused = !1)
                            });
                            a(p, "duration", function () {
                                return u || 0
                            });
                            a(p, "buffered", function () {
                                if (C.buffered && u && C.src)try {
                                    return 100 * w.min(1, w.max(0, C.buffered.end(0) / u))
                                } catch (a) {
                                    return 100
                                } else return 100
                            });
                            a(p, "muted", function () {
                                return !0 === C.muted
                            });
                            M(p,
                                "muted", function (a) {
                                    C.muted = !0 === a
                                });
                            a(p, "volume", function () {
                                return C.volume
                            });
                            M(p, "volume", function (a) {
                                C.volume = w.max(w.min(parseFloat(a), 1), 0)
                            });
                            a(p, "src", function () {
                                return v || r
                            });
                            M(p, "src", function (a) {
                                if (a && a === H)C.startTime = 0, C.play(); else if (a) {
                                    v && k(t.state.STOP);
                                    H = a;
                                    v = r;
                                    E = !1;
                                    C.removeAttribute("src");
                                    ic = r;
                                    tb = u = 0;
                                    0 === H.indexOf("https:") && !1 === B("playerssl") && (H = r);
                                    C.src = H || "";
                                    try {
                                        C.load()
                                    } catch (b) {
                                    }
                                    H || k(t.state.ERROR);
                                    try {
                                        H && "function" === typeof C.changeMode && C.changeMode(!1)
                                    } catch (c) {
                                    }
                                } else if (!a &&
                                    v) {
                                    v = r;
                                    tb = u = 0;
                                    C.src = "";
                                    try {
                                        C.load()
                                    } catch (d) {
                                    }
                                    k(t.state.STOP);
                                    ic = r
                                }
                            });
                            a(p, "paused", function () {
                                return C.paused
                            });
                            M(p, "paused", function (a) {
                                v && (a ? C.pause() : (!0 === B("videoresize") && (this.bounds = this.bounds), C.play()))
                            });
                            a(p, "bounds", function () {
                                return J ? [0, 0, 0, 0] : I
                            });
                            M(p, "bounds", function (a) {
                                var b = a && a.length || 0, c = ha ? 1 : Oa, d = ha ? 1 : Wa;
                                !J && 1 < b && (4 === b && (I[2] = ma(a[2]), I[3] = ma(a[3]), b = ma(I[2] * c), C.setAttribute("width", b), b = ma(I[3] * d), C.setAttribute("height", b)), I[0] = ma(a[0]), I[1] = ma(a[1]), A.left = ma(I[0] * c),
                                    A.top = ma(I[1] * d))
                            });
                            a(p, "supports", function () {
                                return P
                            });
                            a(p, "show", function () {
                                return R
                            });
                            a(p, "hide", function () {
                                return m
                            });
                            a(p, "destroy", function () {
                                return T
                            });
                            a(p, "element", function () {
                                return C
                            })
                        }
                    }

                    var d = "durationchange timeupdate ratechange ended progress loadstart canplay canplaythrough abort emptied error pause play".split(" "), e = {
                        loadstart: t.state.BUFFERING,
                        play: t.state.PLAY,
                        pause: t.state.PAUSE,
                        forward: t.state.FORWARD,
                        rewind: t.state.REWIND,
                        emptied: t.state.STOP,
                        progress: t.state.BUFFERING,
                        abort: t.state.BUFFEREMPTY,
                        canplay: t.state.INFOLOADED,
                        ended: t.state.EOF,
                        error: t.state.ERROR
                    }, g = [t.state.FORWARD, t.state.REWIND];
                    c.prototype = new t;
                    return c.prototype.constructor = c
                }(), I = {storage: null, system: null, tv: null, players: [], profile: null, profiles: []};
                D.prototype = {
                    constructor: D,
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
                    validatePIN: ta,
                    purchase: function (a, b) {
                        var c =
                            O[u] || {};
                        (new ra({
                            url: "https://" + La[7] + "-sdk." + Fa + ".com/",
                            method: "post",
                            encoding: "utf-8",
                            proxy: !1,
                            headers: {"Content-Type": "application/json"},
                            data: ka.stringify({
                                purchase: a || {},
                                identifier: c.identifier,
                                name: c.name,
                                household: this.household,
                                country: F.country || Aa(this.countryCode),
                                operator: F.operator || Aa(this.operator)
                            }),
                            onSuccess: function (a) {
                                if (b && b.call)return a.errors && 0 < a.errors.length ? b(a.errors) : b(null, a);
                                b(["invalid"])
                            },
                            onFailure: function (a) {
                                b && b.call && b(["invalid"])
                            },
                            onError: function () {
                                b && b.call &&
                                b(["invalid"])
                            }
                        })).send()
                    }
                };
                sb.prototype = new D;
                sb.prototype.constructor = sb;
                sb.prototype.hasPIN = function (a) {
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
                sb.prototype.validatePIN = function (a, b) {
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
                var J = {
                    Browser: ga,
                    Storage: d,
                    Player: t,
                    TVChannel: f,
                    TVProgram: n,
                    CookieStorage: g,
                    HTML5Storage: e,
                    AutoStorage: l,
                    HTML5Player: W,
                    getter: a,
                    setter: M,
                    extendKeyboardEvent: mc,
                    fire: G,
                    send: h
                }, T = {NORMAL: "normal", SHIFT: "shift", ALT: "alt", ALTSHIFT: "altshift", CTRL: "ctrl"};
                a(T, "defineKeys", function () {
                    return K
                });
                a(T, "lookupKey", function () {
                    return L
                });
                a(J, "KeyMap", function () {
                    return T
                });
                a(J, "md5", function () {
                    return Ca
                });
                a(J, "typeOf", function () {
                    return x
                });
                a(J, "MAE", function () {
                    return F
                });
                a(J, "isSD", function () {
                    return B("forceSD") ||
                        "1" === vc.sd || Mb.hasClass("sd")
                });
                a(J, "setSetting", function () {
                    return Sc
                });
                a(J, "getSetting", function () {
                    return B
                });
                a(J, "getBootOption", function () {
                    return bd
                });
                a(J, "screen", function () {
                    return Nc
                });
                a(J, "LANGUAGES", function () {
                    return Kc
                });
                a(J, "Player", function () {
                    return t
                });
                a(J, "HTML5Player", function () {
                    return W
                });
                a(J, "GenericStorage", function () {
                    return k
                });
                a(J, "AutoStorage", function () {
                    return l
                });
                a(J, "CookieStorage", function () {
                    return g
                });
                a(J, "HTML5Storage", function () {
                    return e
                });
                a(J, "Profile", function () {
                    return D
                });
                a(J, "GenericProfile", function () {
                    return sb
                });
                a(J, "GEO", function () {
                    return Y
                });
                a(J, "TVChannel", function () {
                    return f
                });
                a(J, "TVProgram", function () {
                    return n
                });
                a(J, "ApplicationManager", function () {
                    return V
                });
                a(J, "createPluginObject", function () {
                    return tb
                });
                a(J, "window", function () {
                    return p
                });
                a(J, "document", function () {
                    return Q
                });
                a(J, "apps", function () {
                    return S
                });
                a(J, "meta", function () {
                    return O
                });
                a(J, "active", function () {
                    return u
                });
                a(J, "ui", function () {
                    return v
                });
                a(J, "plugins", function () {
                    return I
                });
                a(J, "getElement",
                    function () {
                        return Sa
                    });
                a(J, "emptyFn", function () {
                    return ta
                });
                a(J, "getter", function () {
                    return a
                });
                a(J, "setter", function () {
                    return M
                });
                a(J, "Request", function () {
                    return ra
                });
                a(J, "log", function () {
                    return Hb
                });
                a(J, "warn", function () {
                    return Ga
                });
                a(J, "error", function () {
                    return lb
                });
                a(J, "boot", function () {
                    return P
                });
                a(J, "debug", function () {
                    return H
                });
                ga.metrological && (ib.normal[46] = "menu", ib.ctrl[17] = "channel-up");
                var kd = function () {
                    function b(a) {
                        if (k) {
                            a = a || l + 1;
                            var c = B("vevo") || 6;
                            if ("string" === typeof c && "metrological" ===
                                c)y = "//video.metrological.com/vevo" + a + ".ts"; else if ("string" === typeof c && "auto" === c)y = "http://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch" + a + "/appleman.m3u8"; else {
                                c = ma(c);
                                if (1 > c || 6 < c)c = 6;
                                y = "http://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch" + a + "/0" + c + "/prog_index.m3u8"
                            }
                            if (y !== k.src) {
                                try {
                                    k.src = y, k.load(), k.play()
                                } catch (d) {
                                }
                                if (g.onChannelChanged)g.onChannelChanged()
                            }
                        }
                    }

                    function c() {
                        y = r;
                        (k = k || Ma.getElementsByTagName("video")[0]) && b()
                    }

                    function d() {
                        l++;
                        l === h.length && (l = 0);
                        b()
                    }

                    function e() {
                        l--;
                        0 > l && (l = h.length - 1);
                        b()
                    }

                    var g = {}, h = ["VEVO TV1", "VEVO TV2", "VEVO TV3"], l = 0, k, y;
                    a(g, "init", function () {
                        return c
                    });
                    a(g, "up", function () {
                        return d
                    });
                    a(g, "down", function () {
                        return e
                    });
                    a(g, "channel", function () {
                        return new f(l + 1, h[l])
                    });
                    M(g, "channel", function (a) {
                        --a;
                        var c = h.length;
                        0 <= a && a < c && (l = a, b())
                    });
                    a(g, "program", function () {
                        return new n(-1 === (B("blocked") || []).indexOf(l + 1) ? h[l] : r, "", da.now(), -1)
                    });
                    return g
                }();
                a(J, "TVEmulator", function () {
                    return kd
                });
                a(J, "include", function () {
                    return Qc
                });
                ga.middleware && !ga.rdk &&
                Qc(ga.middleware);
                I.storage || (I.storage = new l);
                I.resuming || (I.resuming = ta);
                if (!I.exit || ga.metrological)I.exit = I.exit || "history" === B("back") && Rb || "close" === B("back") && Ha || ga.metrological && ta;
                I.profile || (I.profile = sb);
                if (!0 === zb.video || !0 === zb.novideo)I.players = [];
                0 === I.players.length && (!0 !== zb.novideo ? I.players.push(new W(t.TV)) : I.players.push(new t));
                I.players.forEach(function (a) {
                    a.constructor.state = t.state
                });
                var E = {}, Jb, aa = P, ba = !1, oa = !1, ea;
                a(E, "players", function () {
                    return I.players
                });
                a(E, "delayStart",
                    function () {
                        return !0 === I.delayStart
                    });
                M(E, "startup", function (a) {
                    I.startup = a
                });
                a(E, "storage", function () {
                    return I.storage
                });
                a(E, "GenericStorage", function () {
                    return k
                });
                a(E, "Profile", function () {
                    return I.profile
                });
                a(E, "resume", function () {
                    return C
                });
                a(E, "exit", function () {
                    return ha
                });
                a(E, "resuming", function () {
                    return oa
                });
                a(E, "exiting", function () {
                    return ba
                });
                a(E, "exited", function () {
                    return aa
                });
                a(E, "setState", function () {
                    return I.setState || ta
                });
                a(E, "setMode", function () {
                    return I.setMode || ta
                });
                p.addEventListener("keydown",
                    function (a) {
                        !a.defaultPrevented && (a = a.key) && ("channel-up" === a || "channel-down" === a ? I.players[0].channel = a.split("-")[1] : "mute" === a && (I.players[0].muted = !I.players[0].muted))
                    }, !1);
                "inline" !== B("player") && p.addEventListener("resize", function () {
                    I.players.forEach(function (a) {
                        a.bounds = a.bounds
                    })
                });
                var Z = B("keymap");
                if ("object" === typeof Z)for (var fa in Z)K(fa, Z[fa], !0);
                return E
            }(), sa = function () {
                function b(a) {
                    var c = p.get("profiles") || [];
                    return a && -1 !== c.indexOf(a) || !1
                }

                function c(a) {
                    if (b(a))return new m(a)
                }

                function d() {
                    return (p.get("profiles") || []).filter(function (a) {
                        return !r || a !== r.name
                    })
                }

                function e(a, b) {
                    var c = p.get("profiles") || [];
                    return b && 4 === b.length && a && -1 === c.indexOf(a) ? (c.push(a), p.set("profiles", c), l(), r = new m(a), r.passport.set("pin", b), G.call(k, "onLoadProfile") && h(u, "onLoadProfile", {id: a}, va), !0) : !1
                }

                function f(a) {
                    var b = p.get("profiles") || [], c = r;
                    idx = b.indexOf(a);
                    if (-1 !== idx) {
                        b.splice(idx, 1);
                        p.set("profiles", b);
                        r = new m(a);
                        var d = r.id;
                        (n.storage.get(d) || []).forEach(function (a) {
                            n.storage.set(a)
                        });
                        n.storage.set(d);
                        (r = c) && r.name === a && l();
                        0 === b.length && p.remove("profiles");
                        return !0
                    }
                    return !1
                }

                function g(a, b) {
                    var c = (p.get("profiles") || []).indexOf(a);
                    if (r && r.name === a)return !0;
                    if (-1 !== c) {
                        c = new m(a);
                        if (b) {
                            var d = Ca("pp:" + c.id + ":pin");
                            if (n.storage.get(d) !== b)return !1
                        }
                        r && l();
                        r = c;
                        G.call(k, "onLoadProfile") && h(u, "onLoadProfile", {id: a}, va);
                        return !0
                    }
                    r && l();
                    return !1
                }

                function l() {
                    if (r) {
                        var a = r.name;
                        r = !1;
                        G.call(k, "onUnloadProfile") && h(u, "onUnloadProfile", {id: a}, va)
                    }
                }

                var k = {}, n = ja, m = n.Profile, p = new n.GenericStorage("pm"),
                    q = new m, r = !1;
                a(k, "hasProfiles", function () {
                    return p.has("profiles")
                });
                a(k, "getProfiles", function () {
                    return d
                });
                a(k, "isFamily", function () {
                    return !1 === r
                });
                a(k, "exists", function () {
                    return b
                });
                a(k, "add", function () {
                    return e
                });
                a(k, "get", function () {
                    return c
                });
                a(k, "remove", function () {
                    return f
                });
                a(k, "select", function () {
                    return g
                });
                a(k, "logout", function () {
                    return l
                });
                a(k, "profile", function () {
                    return r || q
                });
                return k
            }(), Xa = {send: ta}, Bb = function () {
                function b(a, c) {
                    return "//" + La[1] + "." + Fa + ".com/qr?q=" + (a || Fa) + "&s=" + (c ||
                        10)
                }

                var c = {};
                a(c, "get", function () {
                    return b
                });
                return c
            }(), qb = function () {
                function b(a) {
                    n && U(a)
                }

                function c(a, b) {
                    try {
                        a && G.call(this, a, b)
                    } catch (d) {
                    }
                }

                function d(a) {
                    a = "string" !== typeof a ? ka.stringify(a) : a;
                    var c = Ha ? Ha.readyState : -1;
                    b("WS SEND: " + c);
                    if (1 === c && a)if (!0 === k.async)try {
                        Ha.send.delay(0, Ha, [a])
                    } catch (e) {
                        b("WS SEND DELAYED ERR")
                    } else try {
                        Ha.send(a)
                    } catch (g) {
                        b("WS SEND DELAYED ERR")
                    } else 3 === c && w && (b("WS SEND ERR"), f())
                }

                function e() {
                    b("WS OPENED");
                    H = 0;
                    w = !0;
                    c.call(m, "onConnected");
                    q.forEach(t, function (a,
                                           b) {
                        c.call(b, "onConnected")
                    });
                    q.keys(v).unique().forEach(function (a) {
                        d({e: "j", k: a})
                    })
                }

                function f() {
                    b("WS CLOSED");
                    H++;
                    w = !1;
                    c.call(m, "onDisconnected");
                    q.forEach(t, function (a, b) {
                        d({e: "l", h: b.hash});
                        if (b.users)for (; b.users.length;) {
                            var e = b.users.pop();
                            c.call(b, "onHasLeft", {hash: b.hash, user: e, data: r})
                        }
                        c.call(b, "onDisconnected");
                        delete b.hash
                    });
                    Ha && (Ha.onopen = null, Ha.onmessage = null, Ha.onclose = null, Ha = r);
                    x = r;
                    h.delay(5E3 * H)
                }

                function g(a) {
                    try {
                        var b = ka.parse(a.data), e = b.h, f = b.d, h = b.u, l = u[e], k = t[l || b.k], y;
                        switch (b.e) {
                            case "j":
                                var m =
                                    k && k.users && -1 !== k.users.indexOf(h);
                                if (b.k && k && !k.hash)u[e] = b.k, v[b.k] = e, x || (x = h), k.hash = e, !m && k.users && k.users.push(h), c.call(k, "onCreated", {
                                    hash: e,
                                    user: h,
                                    data: f
                                }); else if (!b.k && l && k) {
                                    if (m)return;
                                    k.users && k.users.push(h)
                                } else return;
                                y = "onJoined";
                                k && k.users && d(f ? {e: "p", h: e, d: f} : {e: "p", h: e});
                                break;
                            case "l":
                                var n = k && k.users && k.users.indexOf(h);
                                if (l && -1 < n && k && k.users)k.users.splice(n, 1); else return;
                                y = "onHasLeft";
                                break;
                            case "p":
                                h !== x && k && k.users && -1 === k.users.indexOf(h) && (k.users.push(h), y = "onJoined",
                                    d(f ? {e: "p", h: e, d: f} : {e: "p", h: e}));
                                break;
                            case "d":
                                if (!h && (!k || k.users && -1 === k.users.indexOf(h)))return;
                                y = "onData";
                                break;
                            case "e":
                                return c.call(k, "onError", {hash: e, user: h, code: b.c});
                            default:
                                return
                        }
                        y && k && c.call(k, y, {hash: e, user: h, data: f})
                    } catch (p) {
                    }
                }

                function h() {
                    a:{
                        b("WS CREATE");
                        try {
                            Ha = !1 !== B("websocket") && new pc(("https:" === Ba.protocol ? "wss" : "ws") + "://ws-sdk.metrological.com/");
                            break a
                        } catch (a) {
                            b("WS CREATE ERR")
                        }
                        Ha = void 0
                    }
                    Ha ? (Ha.onopen = e, Ha.onmessage = g, Ha.onclose = f) : !1 !== Pa.notification && h.delay(5E3)
                }

                function l(b) {
                    function e(a) {
                        v[b] || d(a ? {e: "j", k: b, d: a} : {e: "j", k: b});
                        return k
                    }

                    function f(a) {
                        var e = t[b], g = v[b];
                        if (e && g) {
                            d(a ? {h: g, e: "l", d: a} : {h: g, e: "l"});
                            if (e.users)for (; e.users.length;) {
                                var h = e.users.pop();
                                c.call(e, "onHasLeft", {hash: g, user: h, data: a})
                            }
                            delete v[b];
                            delete u[g];
                            c.call(e, "onDestroyed", {hash: g, user: x, data: a})
                        }
                        return k
                    }

                    function g(a) {
                        v[b] && d(a ? {h: v[b], e: "d", d: a} : {h: v[b], e: "d"});
                        return k
                    }

                    function h(a) {
                        var c = v[b];
                        return t[b] ? (c && f(a), delete t[b], !0) : !1
                    }

                    if (!b)throw pa("id is required to create a channel");
                    if (t[b])throw pa("channel already exists");
                    var k = this;
                    t[b] = {subscribers: [], users: []};
                    0 === b.indexOf("admin|") && delete t[b].users;
                    a(k, "subscribers", function () {
                        return t[b] && t[b].subscribers
                    });
                    a(k, "users", function () {
                        return t[b] && t[b].users
                    });
                    a(k, "hash", function () {
                        return t[b] && t[b].hash
                    });
                    a(k, "user", function () {
                        return x
                    });
                    a(k, "connected", function () {
                        return w
                    });
                    a(k, "joined", function () {
                        return t[b] && t[b].hash !== r
                    });
                    a(k, "join", function () {
                        return e
                    });
                    a(k, "leave", function () {
                        return f
                    });
                    a(k, "send", function () {
                        return g
                    });
                    a(k, "destroy", function () {
                        return h
                    })
                }

                var k = B("ws") || {}, n = !0 === k.debug, m = {}, t = {}, u = {}, v = {}, H = 0, w = !1, x, Ha;
                a(m, "connected", function () {
                    return w
                });
                a(m, "Channel", function () {
                    return l
                });
                pc && h.delay(k.delay || 0);
                p.addEventListener("unload", function () {
                    q.forEach(t, function (a, b) {
                        d({e: "l", h: b.hash})
                    });
                    Ha && Ha.close();
                    Ha = t = u = null
                }, !1);
                return m
            }(), Eb = function () {
                function b() {
                    if (!1 !== B("playerror")) {
                        var a = S[u], c = a && a.MAF, a = a && a.widget && a.widget.getLocalizedString;
                        c && (new c.dialogs.Alert({
                            title: a("ERROR"), message: a("PLAYBACK_ERROR"),
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
                    var g = [];
                    if (a.url_encoded_fmt_stream_map)for (var f = decodeURIComponent(a.url_encoded_fmt_stream_map).split(","), h, y, n, p = 0; p < f.length; p++) {
                        if (h = vb(f[p]), h.url && (y = decodeURIComponent(h.type || h.mimetype).replace("+", " "), !k || k(y)))if (y = h.itag, y = "37" === y && 720 < 1920 * Oa ? {
                                bitrate: 6092,
                                format: "1080p MP4"
                            } : "22" === y ? {bitrate: 3092, format: "720p MP4"} :
                                "18" === y ? {bitrate: 596, format: "360p MP4"} : "46" === y ? {
                                    bitrate: 4192,
                                    format: "1080p VP8"
                                } : "45" === y ? {bitrate: 2192, format: "720p VP8"} : "44" === y ? {
                                    bitrate: 1128,
                                    format: "480p VP8"
                                } : "43" === y ? {bitrate: 628, format: "360p VP8"} : "35" === y ? {
                                    bitrate: 1128,
                                    format: "480p FLV"
                                } : "34" === y ? {bitrate: 628, format: "360p FLV"} : "5" === y ? {
                                    bitrate: 314,
                                    format: "240p FLV"
                                } : !1) {
                            var R = decodeURIComponent(h.url), z = -1 !== R.indexOf("requiressl=yes"), R = R.replace(/^https/, z ? "https" : "http");
                            l && U("ssl: " + z);
                            n = R.split("?");
                            var z = y, T = n[0];
                            n = vb(n[1]);
                            var v =
                                decodeURIComponent(n.sparams).split(",").concat(["sparams", "key"]).unique(), u = "?", A = void 0;
                            for (A in n)-1 < v.indexOf(A) && (u += A + "=" + n[A] + "&");
                            n = u.slice(0, -1);
                            z.url = T + n;
                            if (h.sig)y.url += "&signature=" + h.sig; else if (h.s) {
                                R = y;
                                z = R.url;
                                h = h.s;
                                h = h.split("");
                                for (T = 0; T < m[1].length; T++)(n = q[m[2][T]]) && n.call && n(h, m[1][T]);
                                h = h.join("");
                                R.url = z + ("&signature=" + h)
                            } else h.url && (y.url = R);
                            g.push(y)
                        }
                    } else a.hlsvp && g.push({url: decodeURIComponent(a.hlsvp), format: "M3U8"});
                    var za, B, f = a.iurlmaxres ? decodeURIComponent(a.iurlmaxres) :
                        a.iurlsd ? decodeURIComponent(a.iurlsd) : "//i.ytimg.com/vi/" + a.video_id + "/hqdefault.jpg";
                    a.title && (za = decodeURIComponent(a.title.replace(/\+/g, " ")));
                    a.length_seconds && (B = ma(a.length_seconds));
                    0 < g.length ? (za = new t(za, r, f, B), za.id = a.video_id, b.call(e, {
                        asset: za,
                        streams: g
                    })) : b.call(e)
                }

                function d(a, b, e) {
                    var g = new fb, f = !("object" === typeof h && !1 === h.proxy);
                    g.onreadystatechange = function () {
                        if (4 === g.readyState && 200 === g.status) {
                            g.onreadystatechange = null;
                            var d = /\"url_encoded_fmt_stream_map\": ?\"([^"]*)\"/.exec(g.responseText);
                            d && (a.url_encoded_fmt_stream_map = encodeURIComponent(Uc(d[1])));
                            (d = /\\\/\\\/s\.ytimg\.com\\\/yts\\\/jsbin\\\/html5player(.+)-vfl(.{6})\\\/html5player(.+)?\.js/.exec(g.responseText)) || (d = /\\\/\\\/s\.ytimg\.com\\\/yts\\\/jsbin\\\/html5player(.+)-vfl(.{6})\.js/.exec(g.responseText));
                            g = null;
                            if (!d)return b.call(e);
                            m[0] = d[2] || d[1];
                            var f = new fb;
                            f.onreadystatechange = function () {
                                if (4 === f.readyState && 200 === f.status) {
                                    f.onreadystatechange = null;
                                    d = /\=\{(.+)\}\;function [$_A-z0-9]+\(a\)\{a=a(?:\.split|\[[$_A-z]+\])\(\"\"\);([^"]*)/.exec(f.responseText);
                                    f = null;
                                    if (!d)return b.call(e);
                                    for (var g, h = /([A-z0-9]+)\:function\([A-z0-9,]+\){([A-z0-9\.\(\)\s\=\[\]\;\%\,]+)}/g, k = {}; g = h.exec(d[1]);)-1 < g[2].indexOf("reverse") ? k[g[1]] = "revr" : -1 < g[2].indexOf("splice") ? k[g[1]] = "slic" : k[g[1]] = "swap";
                                    l && U(k);
                                    m[1] = [];
                                    m[2] = [];
                                    for (h = /([A-Za-z0-9]+)\(([^\d\)]*)(\d*)\)|\[(\d+)\]/g; g = h.exec(d[2]);) {
                                        var y = g[4] || g[3];
                                        "" === g[1] ? "" === y ? m[1].push(0) : m[1].push(-ma(y)) : m[1].push(ma(y));
                                        m[2].push(k[g[1]] || "swap")
                                    }
                                    delete a.use_cipher_signature;
                                    c(a, b, e)
                                }
                            };
                            f.open("GET", $b(d[0].replace(/\\/g,
                                "")), !0);
                            f.send(null)
                        }
                    };
                    g.open("GET", !1 !== f ? $b("https://www.youtube.com/watch?v=" + a.video_id, !1, !0) : "https://www.youtube.com/watch?v=" + a.video_id, !0);
                    g.send(null)
                }

                function e(a, d, g) {
                    g = g || S[u] || null;
                    var f = a && a.match(p);
                    f && 2 <= f.length && (a = f[2]);
                    if (a && d) {
                        var k = new fb, f = !("object" === typeof h && !1 === h.proxy);
                        k.onerror = b;
                        k.onreadystatechange = function () {
                            if (4 === k.readyState && 200 === k.status && k.responseText) {
                                k.onerror = null;
                                k.onreadystatechange = null;
                                l && U("yt: " + k.responseText.length);
                                var a = vb(k.responseText);
                                k = null;
                                "ok" === a.status ? c(a, d, g) : d.call(g)
                            }
                        };
                        console.log($b("http://www.youtube.com/get_video_info?video_id=" + a + "&eurl=https%3A%2F%2Fwww%2Eyoutube%2Ecom%2F") )
                        k.open("GET", !1 !== f ? $b("http://www.youtube.com/get_video_info?video_id=" + a + "&eurl=https%3A%2F%2Fwww%2Eyoutube%2Ecom%2F") : "//www.youtube.com/get_video_info?video_id=" + a + "&eurl=https%3A%2F%2Fwww%2Eyoutube%2Ecom%2F", !0);
                        k.send(null)
                    }
                }

                function f() {
                    var a = Va(sa.profile.countryCode);
                    return n.indexOf(a), "/" + a
                }

                var g = {}, h = B("youtube") || {}, l = !0 === h.debug, k = ja.players[0].supports, m = [null, [], []], n = "AR AU BE BR CA CH CL CO CZ EG FR DE GB HK HU IN IE IL IT JP JO MY MX MA NL NZ PE PH PL RU SA SG SG ZA KR ES SE TW AE US".split(" "),
                    p = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*/, q = {
                        swap: function (a, b) {
                            var c = a[0];
                            a[0] = a[b % a.length];
                            a[b] = c
                        }, revr: function (a) {
                            a.reverse()
                        }, slic: function (a, b) {
                            a.splice(0, b)
                        }
                    };
                a(g, "get", function () {
                    return e
                });
                a(g, "regionQueryString", function () {
                    return f
                });
                a(g, "region", function () {
                    var a = Va(sa.profile.countryCode);
                    return n.indexOf(a), a
                });
                return g
            }(), mb = function () {
                function b() {
                    return {channel: (D && D.channel || {}).name, program: (D && D.program || {}).title}
                }

                function c() {
                    x && x.exit();
                    l()
                }

                function d() {
                    if (!I) {
                        var a =
                            60 - (new Date).getSeconds();
                        Kb(function () {
                            p();
                            I = Pb(p, 6E4)
                        }, 1E3 * a)
                    }
                }

                function e() {
                    I && (Ub(I), I = null)
                }

                function g(a, b) {
                    if (!a || 0 === a.length)return !1;
                    for (var d = !1, e = 0; e < a.length; e++) {
                        var f = a[e];
                        if (f)switch (f.type) {
                            case "start":
                                C = "resume";
                                var h = f.identifier, k = B("alias");
                                h && k && k[h] && (h = k[h]);
                                if (!h || !V)break;
                                b && (U("notification: boundTo" + ka.stringify(b)), ha = b);
                                if (h === v)break;
                                d = !0;
                                V.fire(v, "onApplicationStartupRequest", {id: h, params: f.params || null});
                                break;
                            case "tune":
                                C = "exit", f = f.channel, D && f && (D.channel = f), c.delay(1E3)
                        }
                    }
                    return d
                }

                function f(a, b) {
                    var c = a.matches || [];
                    if (0 === a.matches.length)return !0;
                    for (var d = 0; d < c.length; d++) {
                        for (var e = c[d] || [], g, h = 0; h < e.length; h++) {
                            g = !1;
                            for (var k = e[h], l = [].concat(k.values || []), k = b[k.type], y = 0; y < l.length; y++) {
                                var n = l[y];
                                if (!a.actions && n && eb(/\/(\^.+\$)\//).test(n)) {
                                    var m = n.match(/\/(\^.+\$)\//);
                                    m && 1 < m.length && (n = m[1])
                                }
                                if (k && n && eb(n, "i").test(k)) {
                                    g = !0;
                                    break
                                }
                            }
                        }
                        if (!0 === g)return !0
                    }
                    return !1
                }

                function h(a) {
                    a:{
                        for (var b = 0; b < Fb.length; b++)if (Fb[b].id === a) {
                            a = b;
                            break a
                        }
                        a = -1
                    }
                    b = [];
                    -1 < a && (b = Fb.splice(a,
                        1));
                    U("deleteEvent: " + b.length)
                }

                function k() {
                    U("c2a: " + (P ? "true" : "false"));
                    u();
                    C = "resume";
                    if (!P)return U("c2a: no event");
                    var a = b(), c = P, d = c && c.notification, e = !1;
                    d && !1 === d.reappear && h(c.id);
                    if (!f(c, a))return U("c2a: no matches");
                    c.actions && (e = g(c.actions, d.bound && c.matches));
                    U("c2a start app: " + e);
                    return e
                }

                function l() {
                    U("reset");
                    u();
                    var a = P, b = a && a.notification, c = b && 0 === b.repeat;
                    if (b) {
                        b.timerId !== r && (hb(b.timerId), b.timerId = r);
                        if ((-1 === b.repeat || 0 < b.repeat) && b.timeout) {
                            var d = 1E3 * b.delay, e = 1E3 * b.timeout;
                            b.timerId = m.delay(0 < e - d ? e - d : 0, null, [a])
                        }
                        0 < b.repeat && b.repeat--;
                        c && !0 === b["delete"] && h(a.id)
                    }
                    P = r
                }

                function n(a, b, c, d) {
                    u();
                    switch (c) {
                        case "notification":
                            c = "alert";
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
                    var e = d && d.notification || {}, f = 1E3 * e.delay || 0;
                    a = [""].concat(a.split("\n").reverse());
                    var h;
                    2 === a.length && (a = [""].concat(a));
                    "c2a" === c && (h = d.actions ? v : d.app && d.app.identifier);
                    P = d;
                    W = l.delay(7E3 + f);
                    D.notify.bind(null, b || !1,
                        a, c, h).delay(f);
                    "alert" === c && d.actions && g.bind(null, d.actions, e.bound && d.matches).delay(f)
                }

                function m(a, c) {
                    if (!a)return U("notifications: no event");
                    c = c || b();
                    Hb(a.start);
                    if (null !== a.start && a.start !== r && (new da(a.start)).getTime() >= da.now())return U("notifications: start date");
                    if (null !== a.end && a.end !== r && (new da(a.end)).getTime() < da.now())return U("notifications: end date");
                    if (!f(a, c))return U("notifications: no matches");
                    if (-1 === Fb.map(function (a) {
                            return a && a.id
                        }).indexOf(a.id))return U("notifications: is deleted, do not show.");
                    var d = a.notification || !1;
                    if (!d)return U("notifications: no data");
                    n(d.message, d.image, a.type, a)
                }

                function p() {
                    if (Fb && 0 !== Fb.length) {
                        var a = b();
                        U("notifications: " + Fb.length);
                        Fb.forEach(function (b) {
                            var c = b;
                            b && b.notification && !1 === b.notification["delete"] && (c = xa(b));
                            if (P && c && c.id == P.id)return U("notifications: notifications allready is currentEvent");
                            m(c, a)
                        })
                    }
                }

                function q() {
                    ha && !f({matches: ha}, b()) && (U("Notifications: exit serviceBound"), ha = null, c());
                    p()
                }

                function t() {
                    ha = null
                }

                function u() {
                    W && (hb(W), W = r)
                }

                var w = {}, x = ja, D = x.players[0], C = "resume", ha = null, P, W, I;
                a(w, "clearBoundState", function () {
                    return t
                });
                a(w, "handleChannelChange", function () {
                    return q
                });
                a(w, "c2a", function () {
                    return k
                });
                a(w, "run", function () {
                    return p
                });
                a(w, "reset", function () {
                    return l
                });
                a(w, "active", function () {
                    return P !== r
                });
                a(w, "state", function () {
                    return C
                });
                a(w, "startInterval", function () {
                    return d
                });
                a(w, "stopInterval", function () {
                    return e
                });
                return w
            }(), Nb = function () {
                function b(a, c, d, e) {
                    this.x = a || 0;
                    this.y = c || 0;
                    this.width = d || 0;
                    this.height = e ||
                        0
                }

                function c(k, z) {
                    function W() {
                        return z && z.MAF && z.MAF.application.isSidebarView()
                    }

                    function I() {
                        return z && z.widget && !0 === z.widget.audio
                    }

                    function J() {
                        var a;
                        g || (g = sa.profile.household);
                        la(z) ? (Ga("MAF.mediaplayer.init is not called"), a = !1) : a = !0;
                        return a && (k === v || u === k) && e || !1
                    }

                    function T() {
                        return J() && m || !1
                    }

                    function aa() {
                        var a = e.bounds;
                        return new b(a[0], a[1], a[2], a[3])
                    }

                    function E() {
                        var a = Ia(arguments), c = a.length;
                        if (e && 4 === c) {
                            var d = a[0], f = a[1], g = a[2], c = a[3], k = ca.isTVActive, h = aa();
                            if (h.x !== d || h.y !== f || h.width !==
                                g || h.height !== c)ga.activevideo && 1080 === c && e.hide(), d = new b(d, f, g, c), G.call(ca, "onViewportBoundsChanged", {
                                viewport: {
                                    previous: h,
                                    current: d
                                }
                            }) && (e.bounds = a, l = h), ga.activevideo && (1080 === c && !k || 1080 !== c && k ? e.show() : e.hide())
                        }
                    }

                    function N() {
                        return e && e.waitIndicator && k !== v || !1
                    }

                    function V() {
                        T() && (1 !== e.rate && (e.rate = 1), e.paused = !1)
                    }

                    function ba() {
                        T() && (e.paused = !0)
                    }

                    function S() {
                        F && (hb(F), F = r);
                        0 < H && 0 < jb && Xa.send(k, "playback", {duration: pb(H), session: g ? Ca(g + jb) : null});
                        H = 0;
                        C = r;
                        L = 0;
                        e.src && (e.src = "");
                        !0 === O[k].fullscreen &&
                        e.hide();
                        return !0
                    }

                    function Da() {
                        e.src && !F && S() && (n = m = r, F = function () {
                            if (F && !m) {
                                F = r;
                                try {
                                    e.backToLive()
                                } catch (a) {
                                }
                            }
                        }.delay(1200))
                    }

                    function Y(a) {
                        if (T()) {
                            var b = e.rates || [1], c = e.rate || 0, d = 1;
                            if (0 < a && 0 > c || 0 > a && 0 < c)c = 1;
                            if (0 === c)d = b[0] || 1; else {
                                c = b.indexOf(w.abs(c)) + 1;
                                if (c === b.length)return;
                                d = b[c]
                            }
                            e.rate = d * a
                        }
                    }

                    function Z() {
                        Y(-1)
                    }

                    function fa() {
                        Y(1)
                    }

                    function ka(a, b) {
                        T() && (b ? (a = Math.abs(a), e.currentTime = a || 0, L = a) : (e.currentTime += a || 0, L += a))
                    }

                    function pa(a) {
                        T() && (e.muted = a)
                    }

                    function ra() {
                        T() && e.show()
                    }

                    function ma() {
                        T() &&
                        e.show()
                    }

                    function ia() {
                        m = r;
                        Da()
                    }

                    function Pc() {
                        n = k;
                        p = Ta = f.INIT;
                        return !0
                    }

                    function ld() {
                        return Ua
                    }

                    function md(a) {
                        J() && (a instanceof z.MAF.media.Playlist ? G.call(ca, "onPlaylistChange", {playlist: a}) && (Ua = a) : lb("Playlists must be an instance of (or inherit from) MAF.media.Playlist"))
                    }

                    function nd(a) {
                        if (J() && a instanceof z.MAF.media.PlaylistEntry && G.call(ca, "onProcessPlaylistEntry", {entry: a}) && a.streamsReady() && 0 < a.streams.length && Pc()) {
                            m = a;
                            var b = a.streams[0].url;
                            a = !0 === z.widget.audio;
                            L = 0;
                            C = r;
                            F && (hb(F), F =
                                r);
                            !a && ga.activevideo ? (Aa(), function () {
                                e.src = b
                            }.delay(800)) : (!0 === O[k].fullscreen && e.show(), e && e.channel && -1 !== (B("blocked") || []).indexOf(e.channel.number) && (e.show(), e.muted = !1), e.src = b);
                            0 < jb && Xa.send(k, "playback", {
                                duration: 0 < H ? pb(H) : 0,
                                session: g ? Ca(g + jb) : null
                            });
                            H = da.now();
                            Xa.send(k, a ? "audio" : "video")
                        }
                    }

                    function Xb(a) {
                        a = 0 > a ? 0 : a || 0;
                        if (J() && Ua) {
                            var b = Ua.entries, c = b && b.length || 0;
                            0 < c && G.call(ca, "onLoadPlaylistEntry", {index: a}) && ((b = b[a]) && b instanceof z.MAF.media.PlaylistEntry ? nd(b) : a === c && Ua.repeatAll &&
                            G.call(ca, "onPlaylistRepeat") ? Xb(0) : G.call(ca, "onPlaylistEnd") && ia())
                        }
                    }

                    function wc() {
                        return Ua && Ua.entries ? Ua.entries.indexOf(m) : -1
                    }

                    function na() {
                        var a = wc();
                        0 < a && G.call(ca, "onLoadPreviousPlaylistEntry") ? Xb(--a) : ia()
                    }

                    function ua() {
                        var a = wc();
                        -1 < a && G.call(ca, "onLoadNextPlaylistEntry") ? Xb(++a) : ia()
                    }

                    function ta() {
                        F && (hb(F), F = r);
                        J() && Ua && Pc() && G.call(ca, "onStartPlaylist") && Xb(0)
                    }

                    function xa(a) {
                        m && S();
                        e.channel = a
                    }

                    function ya() {
                        return e.channel
                    }

                    function Fa() {
                        return e.program
                    }

                    function Aa() {
                        if (!I() && ga.activevideo) {
                            Q.body.store("app",
                                k);
                            for (var a = Ib.getElementsByTagName("div"), b = 0; b < a.length; b++)a[b].hasClass("window") && a[b].setStyle("left", -1920);
                            1080 !== e.bounds[3] && E(0, 0, 1920, 1080);
                            e.show()
                        }
                    }

                    function qa() {
                        if (!I() && ga.activevideo) {
                            W() && 1080 !== l.height ? E(l.x, l.y, l.width, l.height) : e.hide();
                            Q.body.eliminate("app");
                            for (var a = Ib.getElementsByTagName("div"), b = 0; b < a.length; b++)a[b].hasClass("window") && a[b].setStyle("left", 0)
                        }
                    }

                    function Ma() {
                        if (!I() && ob("app") !== k && !ga.activevideo) {
                            var a = W(), b = z && z.document && z.document.body;
                            a && b && 1080 ===
                            e.bounds[3] && (a = z && z.MAF && z.MAF.application.getCurrentViewId(), Q.body.store("app", k), db.push(k, (z && z.MAF && z.MAF.application.getDefaultViewId()) !== a && a), !1 !== B("animation") ? b.animate({
                                translateX: -1920,
                                origin: ["left", "top"],
                                duration: .8
                            }) : b.setStyle("transform", "translateX(-1920px)"))
                        }
                    }

                    function Ba() {
                        if (!I() && ob("app") === k && !ga.activevideo) {
                            var a = W(), b = z && z.document && z.document.body;
                            a && 1080 !== l.height && "scale" === B("video") && h(k, "onActivateAppButton", {type: "viewport-toggle"}, va);
                            a && b && ob("app") && (Q.body.eliminate("app"),
                                db.pop(), !1 !== B("animation") ? b.animate({
                                translateX: null,
                                origin: ["left", "top"],
                                duration: .8
                            }) : b.setStyle("transform", null))
                        }
                    }

                    function wa(a) {
                        var b = a.payload.state, c = z && z.MAF, d = z && z.widget;
                        if (d && c && (e && e.src || b === f.STOP || b === f.EOF || b === f.ERROR) && Ta !== b && (b !== f.STOP || Ta !== f.INIT) && (b !== f.BUFFERING || e.paused) && (b !== f.INFOLOADED || Ta !== f.PLAY && Ta !== f.PAUSE)) {
                            if ((n === k || k === v) && !G.call(ca, "onStateChange", {
                                    newState: b,
                                    previousState: Ta
                                }))return a.stop();
                            if (!a.defaultPrevented && !a.propagationStopped) {
                                if (!(-1 ===
                                    x.indexOf(b) && Ta === b || n !== k && n === u && k !== v))switch (b) {
                                    case f.BUFFERING:
                                        if (N())try {
                                            c.utility.WaitIndicator.on()
                                        } catch (g) {
                                        }
                                        break;
                                    case f.INFOLOADED:
                                        if (N())try {
                                            c.utility.WaitIndicator.off()
                                        } catch (h) {
                                        }
                                        Ua && Ua.autoStart && G.call(ca, "onPlayPlaylistEntry") && V.delay(0);
                                        if (Ta === f.PLAY || Ta === f.PAUSE)return;
                                        break;
                                    case f.PAUSE:
                                        Q.title = D;
                                        break;
                                    case f.REWIND:
                                    case f.FORWARD:
                                    case f.PLAY:
                                        if (!0 !== d.audio && !ga.activevideo)try {
                                            Ma()
                                        } catch (l) {
                                        }
                                        Q.title = "\u25b6 " + D;
                                        break;
                                    case f.STOP:
                                        Q.title = D;
                                        if (N())try {
                                            c.utility.WaitIndicator.off()
                                        } catch (y) {
                                        }
                                        if (Va &&
                                            k === n && Ua)return Va = !1, ta();
                                        if (!0 !== d.audio)try {
                                            ga.activevideo ? qa() : Ba()
                                        } catch (r) {
                                        }
                                        break;
                                    case f.ERROR:
                                        Q.title = D;
                                        if (m && u === k) {
                                            if (N())try {
                                                c.utility.WaitIndicator.off()
                                            } catch (q) {
                                            }
                                            if (!0 !== d.audio)try {
                                                ga.activevideo ? qa() : Ba()
                                            } catch (t) {
                                            }
                                            if (!1 === B("playerror"))try {
                                                Da()
                                            } catch (w) {
                                            } else a = d.getLocalizedString, (new c.dialogs.Alert({
                                                title: a("ERROR"),
                                                message: a("PLAYBACK_ERROR"),
                                                buttons: [{
                                                    label: a("CLOSE"), callback: function () {
                                                        try {
                                                            Da()
                                                        } catch (a) {
                                                        }
                                                    }
                                                }]
                                            })).show()
                                        }
                                        break;
                                    case f.EOF:
                                        n === k && u !== v && Ua ? ua.delay(0) : (n === k &&
                                        u !== v && !Ua || u === v && !Ua) && ia.delay(0)
                                }
                                p = Ta = b || 0
                            }
                        }
                    }

                    function Ja(a) {
                        a = a.payload.percentage || 0;
                        if ((n !== k && k !== v || G.call(ca, "onBufferChanged", {
                                bufferPercentage: a,
                                playerStatus: Ta
                            })) && n === k && z && 0 < a && N())if (100 > a)z.MAF.utility.WaitIndicator.on(); else z.MAF.utility.WaitIndicator.off()
                    }

                    function La() {
                        return C !== r && 0 !== C ? C : C = e && e.duration || m && m.asset && m.asset.duration || 0
                    }

                    function Na(a) {
                        if (n === k || k === v)L = e.currentTime, G.call(ca, "onTimeIndexChanged", {
                            timeIndex: L,
                            duration: La()
                        })
                    }

                    function Ka(a) {
                        if (ga.activevideo &&
                            !0 !== z.widget.audio && m !== r)return Da();
                        W() && ob("app") && (Ba(), a.preventDefault(), a.stopPropagation())
                    }

                    function Oa(a) {
                        k !== v && (Ka(a), z.widget.close())
                    }

                    function Pa(a) {
                        a = a.payload.key;
                        if ("playpause" === a)if (Ta === f.PAUSE || Ta === f.REWIND || Ta === f.FORWARD)a = "play"; else if (Ta === f.PLAY)a = "pause"; else return;
                        if (G.call(ca, "onRemoteKeyPress"))switch (a) {
                            case "pause":
                                G.call(ca, "onPauseRemoteKeyPress") && ba();
                                break;
                            case "stop":
                                G.call(ca, "onStopRemoteKeyPress") && Da();
                                break;
                            case "play":
                                G.call(ca, "onPlayRemoteKeyPress") &&
                                V();
                                break;
                            case "rewind":
                                G.call(ca, "onRewindRemoteKeyPress") && Z();
                                break;
                            case "forward":
                                G.call(ca, "onFastForwardRemoteKeyPress") && fa()
                        }
                    }

                    function Qa(a) {
                        !m || n !== k && n === u || F || (Va = !1, m = r, wa({payload: {state: f.STOP}}), n = r, S());
                        G.call(ca, "onChannelChange");
                        mb.handleChannelChange();
                        !1 !== B("stats") && !0 === B("profiling") && (Xa.send(u, "channel", {duration: pb(K)}), K = da.now());
                        if (!ja.resuming && (ja.exited || ja.exiting))return U("CHANNELTUNE HIDDEN STATE");
                        e && e.channel && -1 === (B("blocked") || []).indexOf(e.channel.number) ?
                            (U("CHANNELTUNE NON BLOCKED"), e.show(), e.muted && (e.muted = !1)) : e && (U("CHANNELTUNE BLOCKED"), e.hide(), e.muted = !0)
                    }

                    function Sa() {
                        z && (z.widget.removeEventListener("home", Oa), z.widget.removeEventListener("back", Ka), Pa.unsubscribeFrom(z.MAF.application, "onPlayControlKeyPress"), z = r);
                        Qa.unsubscribeFrom(e, "onChannelChange");
                        wa.unsubscribeFrom(e, "onStateChange");
                        Ja.unsubscribeFrom(e, "onBufferChange");
                        Na.unsubscribeFrom(e, "onTimeChange");
                        Ta = Ua = r;
                        xc = {};
                        Ra = {}
                    }

                    function Rc(a) {
                        Pa.subscribeTo(z.MAF.application, "onPlayControlKeyPress");
                        Qa.subscribeTo(e, "onChannelChange");
                        wa.subscribeTo(e, "onStateChange", !1, !0);
                        Ja.subscribeTo(e, "onBufferChange");
                        Na.subscribeTo(e, "onTimeChange");
                        Ta = n === k && X(p) ? p : f.INIT
                    }

                    var xc = {}, ub = {}, Ea = {}, nb = {}, Wa = {}, Ra = {}, ca = this, Va = !1, Ta, Ua;
                    z.widget.addEventListener("home", Oa, !1);
                    z.widget.addEventListener("back", Ka, !1);
                    d.forEach(function (b) {
                        a(this, b, function () {
                            return Ra[b] ? Ra[b] || [] : []
                        });
                        M(this, b, function (a) {
                            a instanceof ea ? Ra[b] = a : lb("MAF.mediaplayer.subscribe: Invalid setting of subscribers for eventType: " +
                                b)
                        })
                    }, xc);
                    a(ub, "play", function () {
                        return V
                    });
                    a(ub, "pause", function () {
                        return ba
                    });
                    a(ub, "stop", function () {
                        return Da
                    });
                    a(ub, "rewind", function () {
                        return Z
                    });
                    a(ub, "forward", function () {
                        return fa
                    });
                    a(ub, "seek", function () {
                        return ka
                    });
                    a(ub, "mute", function () {
                        return pa
                    });
                    a(ub, "hide", function () {
                        return ma
                    });
                    a(ub, "show", function () {
                        return ra
                    });
                    a(nb, "get", function () {
                        return ld
                    });
                    a(nb, "set", function () {
                        return md
                    });
                    a(nb, "start", function () {
                        return ta
                    });
                    a(nb, "loadEntry", function () {
                        return Xb
                    });
                    a(nb, "previousEntry", function () {
                        return na
                    });
                    a(nb, "nextEntry", function () {
                        return ua
                    });
                    a(nb, "currentEntry", function () {
                        return m
                    });
                    a(nb, "currentIndex", function () {
                        return wc()
                    });
                    a(nb, "currentSpeed", function () {
                        return e.rate
                    });
                    a(nb, "length", function () {
                        return Ua && Ua.entries ? Ua.entries.length : 0
                    });
                    a(Wa, "states", function () {
                        return f
                    });
                    a(Ea, "currentPlayerState", function () {
                        return n === k && e ? Ta : null
                    });
                    a(Ea, "currentTimeIndex", function () {
                        return n === k && e ? L || 0 : 0
                    });
                    a(Ea, "currentMediaDuration", function () {
                        return n === k ? La() || 0 : 0
                    });
                    a(Ea, "currentSpeed", function () {
                        return e.rate
                    });
                    a(ca, "subscribers", function () {
                        return xc
                    });
                    a(ca, "control", function () {
                        return ub
                    });
                    a(ca, "player", function () {
                        return Ea
                    });
                    a(ca, "playlist", function () {
                        return nb
                    });
                    a(ca, "constants", function () {
                        return Wa
                    });
                    a(ca, "init", function () {
                        return Rc
                    });
                    a(ca, "initialize", function () {
                        Ga("MAF.mediaplayer.initialize is deprecated, use MAF.mediaplayer.init");
                        return Rc
                    });
                    a(ca, "reset", function () {
                        return Sa
                    });
                    a(ca, "setViewportBounds", function () {
                        return E
                    });
                    a(ca, "getViewportBounds", function () {
                        return aa
                    });
                    a(ca, "currentAsset", function () {
                        if (e.src ||
                            m) {
                            if (m && m.asset)return m.asset;
                            if (n && O[n]) {
                                var a = O[n], b = new t(a.name);
                                b.widget = a || !1;
                                return b
                            }
                        }
                        return Fa() || {}
                    });
                    a(ca, "getCurrentChannel", function () {
                        return ya
                    });
                    a(ca, "getCurrentProgram", function () {
                        return Fa
                    });
                    a(ca, "setChannelByNumber", function () {
                        return xa
                    });
                    a(ca, "isSidebarHidden", function () {
                        return ob("app") === k
                    });
                    a(ca, "isTVActive", function () {
                        return m === r
                    });
                    a(ca, "isPlaylistEntryActive", function () {
                        return -1 < q.indexOf(Ta) && m
                    })
                }

                var d = "onRemoteKeyPress onPauseRemoteKeyPress onStopRemoteKeyPress onPlayRemoteKeyPress onRewindRemoteKeyPress onFastForwardRemoteKeyPress onChannelChange onStateChange onBufferChanged onPlaybackBuffering onSetScreensaverMode onTimeIndexChanged onViewportBoundsChanged onSetPlaybackSpeed onControlPlay onControlPause onControlStop onControlRewind onControlFastForward onControlSeek onControlStreamSwitch onConvertToSpeed onPlayPlaylistEntry onProcessPlaylistEntry onPlaylistChange onStartPlaylist onLoadPlaylistEntry onPlaylistRepeat onPlaylistEnd onLoadPreviousPlaylistEntry onLoadNextPlaylistEntry".split(" ");
                b.prototype.toArray = function () {
                    return [this.x, this.y, this.width, this.height]
                };
                var e = ja.players[0], g = sa.profile.household, f = e.constructor.state, k = e.bounds, l = new b(k[0], k[1], k[2], k[3]), n, m, p, q = [f.PLAY, f.PAUSE, f.FORWARD, f.REWIND, f.BUFFERING, f.INFOLOADED], x = [f.FORWARD, f.REWIND], D = Q.title, H = 0, K = da.now(), F, L = 0, C;
                c.prototype = {constructor: c};
                return c
            }(), db = function () {
                function b(a) {
                    Ba.href = Ba.href.replace(cc() || "#", a)
                }

                function c(a, b) {
                    0 !== q.length && k ? (q.pop() && X(m[a]) && (1 < m[a] ? m[a]-- : delete m[a]), D = !1, H || D ?
                        H = !1 : (H = !0, u !== v && 1 < ab.length && 1 < ab.length - l && ab.back())) : delete m[a]
                }

                function d(a, b) {
                    if (0 > a && k) {
                        b && delete m[b];
                        var c = !0 === H;
                        H = !0;
                        D = !1;
                        q.splice(a);
                        c || u === v || (c = ab.length - l, 0 < c - w.abs(a) && 0 < ab.length - w.abs(a) ? ab.go(a) : 0 < c && 1 < ab.length && ab.go(-1 * c))
                    }
                }

                function e(a, c) {
                    if (k) {
                        var d;
                        d = a ? "#/" + a + (c ? "/" + c : "") : r;
                        var f = q.length - 1, g = m[a];
                        -1 < f && q.lastIndexOf(d) === f || g && q.lastIndexOf(d + "/" + g) === f ? (g = m[a] || 0, m[a] = ++g, d += "/" + m[a]) : delete m[a];
                        H = !1;
                        D = !0;
                        q.push(d);
                        b.delay(0, null, [d])
                    }
                }

                function f() {
                }

                function g(a) {
                    var b;
                    -1 !== a.newURL.indexOf("#") && (b = "#" + a.newURL.split("#")[1]);
                    b || (b = cc());
                    if (0 !== b.indexOf(n) || u !== v && u !== r) {
                        K && (K = r);
                        if (0 === b.indexOf("#/")) {
                            var c = q.length, d;
                            d = "#" + a.oldURL.split("#")[1];
                            if (!D && x && b === n)H = D = !1, U("hash exit: " + mb.active), mb.active && mb.reset(); else if (!H && !D && 0 < c && q.indexOf(d) === c - 1)D = !1, H = !0, (Q.activeElement || p).dispatchEvent(Qa("back", r, !0, !0)); else if (D || H)H = D = !1
                        } else {
                            b = b.substr(1).split("?");
                            var e = b[0].split(":");
                            u !== v && V.close(u);
                            if (1 < e.length)switch (U("hash: " + e[1] + ", type: " + e[0]),
                                gc = e[0] + ":" + e[1], e[0]) {
                                case "app":
                                    c = e[1];
                                    d = B("alias");
                                    c && d && d[c] && (c = d[c]);
                                    c && c !== v && O[c] && (x = D = !0, V.fire(v, "onApplicationStartupRequest", {
                                        id: c,
                                        params: 2 === b.length ? vb(b[1]) : null
                                    }));
                                    break;
                                default:
                                    Ga("action unknown: " + e[0])
                            } else {
                                D = !0;
                                var f = x = !1;
                                mb.active && (U("hash: " + e[0]), f = mb.c2a() || !1, !0 === f && (x = !0));
                                U("exitToMenu: " + x);
                                V.fire(v, "onHashChange", e[0]);
                                gc = e[0];
                                (function () {
                                    t && V.exited && !V.resuming && (U("hash: resume"), mb.active && "resume" != mb.state || V.resume(e[0]));
                                    !0 !== f && (x = !1)
                                }).delay(800)
                            }
                            k && 0 < ab.length &&
                            ab.back()
                        }
                        a.preventDefault();
                        a.stopPropagation()
                    }
                }

                var h = {}, k = zb && !1 !== zb.history, l = ab.length || 0, n = "#/" + v, m = {}, q = [], t = !1, x = !1, H = !1, D = !0, F = !0, K;
                cb[0] !== n && ("#boot" === cb[0] ? t = !0 : cb[0] && 0 === cb[0].indexOf("#app:") && (K = cb[0]), -1 === Ba.href.indexOf(n) && (Ba.href = -1 === Ba.href.indexOf("#") ? Ba.href + n : Ba.href.replace(cc() || "#", n)));
                t || ja.resume(cb[0], !0);
                t && (F = !1);
                gc = cb[0];
                var l = w.max(ab.length - l, 1), C = function () {
                    var a = ["webkit", "moz", "ms", "o"];
                    if ("hidden"in Q)return "hidden";
                    for (var b = 0; b < a.length; b++)if (a[b] +
                        "Hidden"in Q)return a[b] + "Hidden";
                    return null
                }(), L;
                C && (L = C.replace(/[H|h]idden/, "") + "visibilitychange", Q.addEventListener(L, f, !1));
                p.addEventListener("hashchange", g, !1);
                p.addEventListener("unload", function () {
                    L && Q.removeEventListener(L, f);
                    q = h = null;
                    p.removeEventListener("hashchange", g)
                });
                a(h, "pop", function () {
                    return c
                });
                a(h, "go", function () {
                    return d
                });
                a(h, "push", function () {
                    return e
                });
                a(h, "autostart", function () {
                    return K
                });
                a(h, "isBoot", function () {
                    return t
                });
                a(h, "hidden", function () {
                    return !1 === F
                });
                a(h, "exitToMenu",
                    function () {
                        return x
                    });
                M(h, "exitToMenu", function (a) {
                    x = a
                });
                return h
            }();
            fa.prototype = {constructor: fa};
            Ja = new fa;
            var kb = !1, $a = sa.profile.household, va = function (a) {
                $a || ($a = sa.profile.household);
                var b = S[u], c = S[v];
                if (!c || !c.widget.handleHostEvent || c.widget.handleHostEvent.apply(b, arguments)) {
                    var d = a.getData() || {}, c = a.getResult(), e;
                    switch (a.subject) {
                        case "showDialog":
                            kb = !0;
                            break;
                        case "hideDialog":
                            kb = !1;
                            break;
                        case "onAppInit":
                            a.error || h(a.id, "getSnippetConfs", null, va);
                            break;
                        case "onAppFin":
                            a.error || ((e = b.currentViewId) &&
                            h(a.id, "onUnselect", {id: e}, va), (e = (d = Sa(a.id + "-@snippets")) && d.firstChild.owner.config.viewId) && h(a.id, "onShowView", {id: e}, va), c.forEach(function (b) {
                                h(a.id, "onUnloadView", {id: b}, va)
                            }), d && d.parentNode === b.document.body ? d.detach().inject(b.document.body.detach().empty()) : b.document.body.detach().empty(), !0 !== O[a.id].background && h(a.id, "onAppFinComplete", {}, va), u && v && a.id !== v && S[u] && (u = v, !0 !== db.exitToMenu ? h(v, "onShowView", {id: S[u] && S[u].currentViewId}, va) : (db.exitToMenu = !1, ja.exit())), a.id !== v ? Xa.send(a.id,
                                "close", {
                                    name: V && V.getMetadataByKey(a.id, "name"),
                                    category: V && V.getCategory() || "",
                                    duration: pb(jb),
                                    session: $a ? Ca($a + jb) : null,
                                    ui: $a ? Ca($a + rb) : null
                                }) : a.id === v && Xa.send(a.id, "close", {
                                duration: pb(Db),
                                session: $a ? Ca($a + Db) : null
                            }), jb = 0);
                            break;
                        case "onDialogCancelled":
                        case "onDialogDone":
                            kb = !1;
                            (b = d && d.key) && Ea[b] && (Ea[b](d), Ea[b] = null, delete Ea[b]);
                            break;
                        case "onLoadView":
                            !a.error && d.id && ((e = b.currentViewId) && e !== d.id && h(a.id, "onUnselect", {id: e}, va), h(a.id, "onShowView", {id: d.id}, va));
                            break;
                        case "onShowView":
                            !a.error &&
                            d.id && h(a.id, "onSelect", {id: d.id}, va);
                            break;
                        case "getSnippetConfs":
                            !a.error && 0 < c.length && c.forEach(function (b) {
                                h(a.id, "onLoadView", {id: b.id}, va)
                            });
                            break;
                        case "onUnselect":
                            !a.error && d.id && h(a.id, "onHideView", {id: d.id}, va);
                            break;
                        case "onActivateAppButton":
                            switch (d.type) {
                                case "switch-profile":
                                    kb = !0
                            }
                            break;
                        case "onActivateSnippet":
                            !a.error && c.id && (a.id !== v && 0 === jb ? (jb = da.now(), Xa.send(a.id, "open", {
                                name: V && V.getMetadataByKey(a.id, "name"),
                                category: V && V.getCategory() || "",
                                session: $a ? Ca($a + jb) : null,
                                ui: $a ? Ca($a +
                                    rb) : null
                            })) : a.id !== v || 0 === Db || isNaN(Db) || Xa.send(a.id, "open", {
                                loadtime: pb(Db),
                                session: $a ? Ca($a + Db) : null
                            }), b.document.body.inject(Ib).frozen = !1, h(a.id, "onLoadView", d && d.params ? {
                                id: c.id,
                                data: {params: d.params}
                            } : {id: c.id}, va))
                    }
                }
            };
            g.prototype = {constructor: g};
            var Qb = function () {
                function c(a) {
                    Z.call(this, a, function () {
                        !0 !== O[a].background && S[a] && delete S[a]
                    })
                }

                var e = "open getComputedStyle md5 confirm prompt sha1 JSON XMLDOM unlink clone typeOf emptyFn random location navigator Browser YouTube FontAwesome CSSMatrix Animator HashMap Class Event Library innerWidth outerWidth innerHeight outerHeight screen currentProfileData XMLHttpRequest DateFormat isArray isBoolean isDate isFunction isNumber isString isRegExp isEmpty Timer Element Window IFrame View Dialog Frame Text Image List Item Canvas QRCode WebSocket requestAnimationFrame cancelAnimationFrame".split(" ").concat(Ja.defines),
                    f = "onActivateBackButton onActivateHomeButton onActivateFavButton onActivateSettingsButton onActivateSnippet onActivateApp onLoadView onUnloadView onShowView onHideView onSelectView onUnselectView getSnippetConfs onDialogCancelled onDialogDone onApplicationStartup onApplicationShutdown onLoadProfile onUnloadProfile onWidgetKeyPress onPlayControlKeyPress onColorKeyPress onViewChangeInitiated".split(" "), l = "onAppInit onAppFin onDialogCancelled onDialogDone onHideView onLoadProfile onLoadView onShowView onUnloadProfile onUnloadView getSnippetConfs onSelect onUnselect onDispatchedChildEvent onActivateAppButton onActivateSnippet".split(" "),
                    m = "changeProfile loadView hideDialog showDialog setSnippetConfs addSnippetConfs deleteSnippetConfs exitToDock exit setFavAction setIcons setWaitIndicator setFullscreenVideoMode toggleViewport launchApp".split(" "), n = ["focus", "blur", "addEventListener", "removeEventListener", "dispatchEvent"], w = "open close location addEventListener removeEventListener dispatchEvent".split(" "), D = ["window", "parent", "top", "self"], K = "messages mediaplayer HostEventManager Request Theme application".split(" "), L = {
                        SNIPPET: "snippet",
                        ICON: "icon", SIDEBAR: "sidebar", FULLSCREEN: "fullscreen"
                    }, A = q.keys(L).filter(function (a) {
                        return "snippet" === L[a] || "icon" === L[a]
                    }), aa = ["red", "blue", "yellow", "green"], Y = "back play stop pause rewind forward playpause".split(" "), Z = function (c, y) {
                        function S(b) {
                            a(this, "rootPath", function () {
                                return b
                            });
                            this.lastModified = function (a) {
                                var c = new fb;
                                c.open("HEAD", b + a, !1);
                                c.send();
                                if (4 === c.readyState && 200 === c.status)try {
                                    return da(request.getResponseHeader("last-modified") || da.now()).getTime()
                                } catch (d) {
                                }
                                return da.now()
                            };
                            this.readFile = function (a, c) {
                                c = c || !1;
                                var d = new fb;
                                d.open("GET", b + a + ("?" + da.now() || ""), !1);
                                d.send();
                                return 4 === d.readyState && 200 === d.status ? d.responseXML ? d.responseXML : c ? d.responseText.replace(/\n/g, "<br/>") : d.responseText : ""
                            }
                        }

                        function Z(a) {
                            var b = ma.rootPath;
                            a && a.url && !Lb.test(a.url) && 0 !== a.url.indexOf(b) && (a.url = b + a.url);
                            return new ra(a)
                        }

                        function C(a, b, d, e) {
                            a = new t(a || "", b || "", d, e);
                            a.widget = O[c];
                            return a
                        }

                        function fa(a) {
                            return new qb.Channel(Ca(c + "|" + (a || da.now())))
                        }

                        function P(a) {
                            return new qb.Channel(Ca(c +
                                "|" + (a || da.now()) + "|" + (E.profile.household || "")))
                        }

                        function W() {
                            return ba && ba.getLocalizedString.apply(ba, arguments)
                        }

                        function I() {
                            return ba && ba.getElementById.apply(ba, arguments)
                        }

                        function J(a) {
                            var b = ma.rootPath + a, d = new fb;
                            d.open("GET", b + ("?" + da.now() || ""), !1);
                            d.send();
                            var e = "", f = d.responseText;
                            4 === d.readyState && 200 === d.status && f ? (!1 !== F.lint && (new ra({
                                url: "//" + La[4] + "." + Fa + ".com/",
                                method: "post",
                                data: {script: f, id: c, file: b}
                            })).send(), e = ("\n" + f.replace(Vb, "")).replace(tc, function (a, b) {
                                return J(b)
                            }), e +=
                                "\n//# sourceURL=" + b + "\n") : Ga(c + ": request issue " + a);
                            return e
                        }

                        function T(b, d) {
                            this.result = "";
                            a(this, "id", function () {
                                return c
                            });
                            a(this, "subject", function () {
                                return b
                            });
                            a(this, "data", function () {
                                return d
                            })
                        }

                        function X(a) {
                            if (!Ea && ba) {
                                Ea = !0;
                                var b = N(ba.identifier);
                                if (b !== v) {
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
                                var f = yc().diff(nc);
                                0 < f.length && this.warn("global scope has been poluted", f);
                                !0 === ba.fullscreen && ja.players[0].show();
                                U &&
                                (U.frozen = !0);
                                ba.close(a);
                                if (!ba || !0 !== ba.background) {
                                    ga && ga.destroy();
                                    if (this.MAF) {
                                        try {
                                            this.MAF.mediaplayer.reset()
                                        } catch (g) {
                                        }
                                        try {
                                            this.MAF.messages.reset(!0)
                                        } catch (h) {
                                        }
                                        this.MAF.messages = this.MAF.mediaplayer = r
                                    }
                                    ta = Ba = ia = ga = ba = wa = ma = Aa = oa = na = qa = r;
                                    if ("all" === B("destroy"))for (var k in this)delete this[k];
                                    if (U) {
                                        try {
                                            U.destroy()
                                        } catch (l) {
                                        }
                                        U = r
                                    }
                                    try {
                                        sc.call(this)
                                    } catch (m) {
                                    }
                                    try {
                                        y && y.call(null, b)
                                    } catch (n) {
                                    }
                                }
                                Ea = !1
                            }
                        }

                        da.now();
                        var E = this, U = Bc(c), ia = {}, ba = new g(c, E, U), oa = {messages: new k};
                        c === v && (a(E, "boot", function () {
                            return db.isBoot
                        }),
                            a(E, "hidden", function () {
                                return db.hidden
                            }));
                        e.forEach(function (b) {
                            a(this, b, function () {
                                return Ja[b]
                            })
                        }, E);
                        S.prototype = {constructor: S};
                        var ma = new S(d(c));
                        a(E, "filesystem", function () {
                            return ma
                        });
                        c === v && a(E, "ProfileManager", function () {
                            return sa
                        });
                        a(oa, "Request", function () {
                            return Z
                        });
                        a(E, "Request", function () {
                            return Z
                        });
                        var ga = new xb(c, U);
                        a(oa, "Theme", function () {
                            return ga
                        });
                        a(E, "Theme", function () {
                            return ga
                        });
                        var na = Ja.GenericStorage, ta = new na("ac", !1, c), Ba = new na("ad", !0, c);
                        a(E, "currentAppConfig", function () {
                            return ta
                        });
                        a(E, "currentAppData", function () {
                            return Ba
                        });
                        q.forEach(Ja.MAF, function (b, c) {
                            -1 === K.indexOf(b) && a(oa, b, function () {
                                return c
                            })
                        });
                        a(E, "LGI", function () {
                            return p.LGI
                        });
                        (function (b) {
                            function c(a, d) {
                                Xa.send(b, a, d || {})
                            }

                            a(oa.Stats, "event", function () {
                                return c
                            })
                        })(c);
                        var wa = {};
                        a(wa, "Asset", function () {
                            return C
                        });
                        ["Playlist", "PlaylistEntry"].forEach(function (b) {
                            a(wa, b, function () {
                                return Ja.MAF.media[b]
                            })
                        });
                        a(oa, "media", function () {
                            return wa
                        });
                        c === v ? (a(E, "profile", function () {
                            return Ja.profile
                        }), a(E, "Facebook", function () {
                            return Ja.Facebook
                        }),
                            a(E, "Twitter", function () {
                                return Ja.Twitter
                            })) : (function () {
                            function b() {
                                d.forEach(function (b) {
                                    a(this, b, function () {
                                        return Ja.profile[b]
                                    })
                                }, this);
                                d.length = 0;
                                d = null
                            }

                            var d = "id name ageRating household operator packages country countryCode language languageCode city ip latlon mac locale hasPIN locked".split(" "), e = {
                                country: "countryCode",
                                language: "languageCode"
                            }, f;
                            b.prototype.destroy = function () {
                                d = e = f = null
                            };
                            b.prototype.purchase = function (a, b) {
                                u === c ? Ja.profile.purchase(a, b) : b("app not active")
                            };
                            a(b.prototype,
                                "uid", function () {
                                    return !0 === O[c].profile ? Ja.profile.uid : r
                                });
                            q.keys(e).forEach(function (a) {
                                var c = "get" + a.capitalize(), d = e[a];
                                b.prototype[c] = function () {
                                    Ga("profile." + c + "() is deprecated, please use profile." + d);
                                    return this[d]
                                }
                            });
                            e = null;
                            f = new b;
                            a(E, "profile", function () {
                                return f
                            })
                        }(), function (b) {
                            function c(a) {
                                f.fire(a.type)
                            }

                            function d() {
                                this.subscribers = {};
                                c.subscribeTo(e, ["onConnected", "onDisconnected", "onUnpairedProfile"]);
                                ["api", "userId", "getImageById", "logout"].forEach(function (b) {
                                        a(this, b, function () {
                                            return e[b]
                                        })
                                    },
                                    this)
                            }

                            var e = Ja.Facebook, f;
                            d.prototype.reset = function () {
                                this.subscribers = {}
                            };
                            d.prototype.fire = G;
                            d.prototype.destroy = function () {
                                c.unsubscribeFrom(e, ["onConnected", "onDisconnected", "onUnpairedProfile"]);
                                f = null
                            };
                            f = new d;
                            a(E, "Facebook", function () {
                                return f
                            })
                        }(c), function (b) {
                            function c(a) {
                                f.fire(a.type)
                            }

                            function d() {
                                this.subscribers = {};
                                c.subscribeTo(e, ["onConnected", "onDisconnected", "onUnpairedProfile"]);
                                ["api", "userId", "userInfo", "getImageById", "logout"].forEach(function (b) {
                                        a(this, b, function () {
                                            return e[b]
                                        })
                                    },
                                    this)
                            }

                            var e = Ja.Twitter, f;
                            d.prototype.reset = function () {
                                this.subscribers = {}
                            };
                            d.prototype.fire = G;
                            d.prototype.destroy = function () {
                                c.unsubscribeFrom(e, ["onConnected", "onDisconnected", "onUnpairedProfile"]);
                                f = null
                            };
                            f = new d;
                            a(E, "Twitter", function () {
                                return f
                            })
                        }(c));
                        a(oa, "Room", function () {
                            return fa
                        });
                        a(oa, "PrivateRoom", function () {
                            return P
                        });
                        a(E, "MAF", function () {
                            return oa
                        });
                        a(E, "localization", function () {
                            return ua
                        });
                        a(E, "widget", function () {
                            return ba
                        });
                        a(E, "$_", function () {
                            return W
                        });
                        a(E, "$", function () {
                            return I
                        });
                        n.forEach(function (b) {
                            a(this, b, function () {
                                return ba && ba[b]
                            })
                        }, E);
                        E.console = {};
                        ["log", "warn", "error"].forEach(function (b) {
                            a(this.console, b, function () {
                                return function () {
                                    var a = [c + " "].concat(Ia(arguments)), a = "concat" === B("console") ? [Ia(a).join(" ")] : a;
                                    Na[b].apply(Na, a)
                                }
                            });
                            a(this, b, function () {
                                return this.console[b]
                            })
                        }, E);
                        a(E, "alert", function () {
                            return this.log
                        });
                        a(ia, "getElementById", function () {
                            return ba.getElementById
                        });
                        a(ia, "body", function () {
                            return U
                        });
                        a(ia, "activeElement", function () {
                            return Q.activeElement !==
                            Ma ? Q.activeElement : r
                        });
                        w.forEach(function (b) {
                            a(this, b, function () {
                                return E[b]
                            })
                        }, ia);
                        a(E, "document", function () {
                            return ia
                        });
                        a(E, "include", function () {
                            return function (a) {
                                try {
                                    return yb("with(this){" + J(a) + "}").call(this), !0
                                } catch (b) {
                                    return lb(c, a, b), !1
                                }
                            }
                        });
                        T.prototype = {
                            constructor: T, getData: function () {
                                try {
                                    return this.data && ka.parse(this.data) || r
                                } catch (a) {
                                }
                            }, getResult: function () {
                                try {
                                    return this.result && ka.parse(this.result) || r
                                } catch (a) {
                                }
                            }
                        };
                        a(E, "HostEvent", function () {
                            return T
                        });
                        var qa = function () {
                            function d() {
                            }

                            var e = {}, f = {};
                            ba.onHostEvent = function (a) {
                                if (-1 === l.indexOf(a.subject))a.id !== c && E.warn('Received "' + a.subject + '" from ui that is not recognized. This is probably bad!'); else if (e[a.subject] && e[a.subject].length) {
                                    var d = a.data && ka.parse(a.data), f = new b(a.subject, d, null, a);
                                    e[a.subject].forEach(function (a) {
                                        a(f)
                                    })
                                }
                            };
                            ba.onDispatchedChildEvent = function (a) {
                                if (-1 === m.indexOf(a.subject))E.warn('Received "' + a.subject + '" response from ui that is not recognized. This is probably bad!'); else if (e.onDispatchedChildEvent &&
                                    e.onDispatchedChildEvent.length) {
                                    var c = a.data && ka.parse(a.data), d = new b("onDispatchedChildEvent", c, null, a);
                                    e.onDispatchedChildEvent.forEach(function (a) {
                                        a(d)
                                    })
                                }
                            };
                            d.prototype = {
                                constructor: d, send: function (a, b) {
                                    la(b) && (b = {});
                                    if (-1 !== m.indexOf(a))return ba.dispatchChildEvent(new T(a, ka.stringify(b)));
                                    if ("simulateFakeLoadView" === a)ba.onHostEvent(new T("onShowView", ka.stringify(b))), ba.onHostEvent(new T("onSelect", ka.stringify(b))); else throw pa("MAF.HostEventManager.fire: Unknown eventType: " + a);
                                    return !0
                                },
                                addSubscribeableEvent: function (b) {
                                    a(f, b, function () {
                                        return e[b] ? e[b] : []
                                    });
                                    M(f, b, function (a) {
                                        if (a instanceof ea)e[b] = a; else throw pa("MAF.HostEventManager.subscribe: Invalid setting of subscribers for eventType: " + b);
                                    })
                                }, addFireableEvent: function (a) {
                                    m.push(a)
                                }
                            };
                            var g = new d;
                            g.subscribers = f;
                            l.forEach(g.addSubscribeableEvent);
                            return g
                        }();
                        a(oa, "HostEventManager", function () {
                            return qa
                        });
                        var Aa = function (c) {
                            function d() {
                                var a = P.length;
                                0 < a && c !== v ? db.go(-a, c) : 1 < a && c === v && db.go(-(a - 1), c);
                                P.length = 0;
                                P = []
                            }

                            function e(a) {
                                a &&
                                (Z = O = za = S = "", G = {}, H = {}, X = ia = W = fa = null, ca = !1, ga = {}, Da = !1);
                                d()
                            }

                            function g(a) {
                                var b = ga[a.type];
                                if (!b || !b.length)return !0;
                                for (var c = !1, d = 0; d < b.length && (!b[d] || (b[d](a), c = c || a.defaultPrevented, !a.propagationStopped)); d++);
                                return !c
                            }

                            function k(a) {
                                var b = a && a.viewClass, c = b && b.prototype;
                                if (b && c && a.id)return {id: a.id, type: L[c.viewType]};
                                E.warn("Invalid config!")
                            }

                            function l() {
                                return S || za
                            }

                            function m(a, c, d, e, f) {
                                d = d || "forward";
                                var h = l();
                                g(new b("onViewChangeInitiated", {currentId: h, destinationId: a, direction: d})) &&
                                (W = c, fa = e, ia = a, X = d, ca = f, c = "loadView", a === h && (c = "simulateFakeLoadView"), a in H && H[a].viewClass && H[a].viewClass.inheritsFrom(oa.system.FullscreenView) && qa.send("setFullscreenVideoMode", H[a].viewClass.prototype.config.showPassthroughVideo ? "passthrough" : "default"), qa.send(c, k(H[a])))
                            }

                            function n() {
                                if (Z !== l()) {
                                    if (!Z || "" === Z)throw pa("We don't have a settings view to switch to. This exception is to indicate something bad happened");
                                    y();
                                    m(Z, null, "forward")
                                }
                            }

                            function y() {
                                var a = l();
                                a && a in G && -1 === A.indexOf(G[a].viewType) &&
                                P.push({id: a, persist: G[a].persist})
                            }

                            function z(a) {
                                d();
                                m(O, null, "forward", a, !0)
                            }

                            function t(a, b) {
                                var c = P.length;
                                1 < P.length && 1 < b && b <= c && (b--, P.splice(c - b, b));
                                (c = P.pop()) ? m(c.id, c.persist, "back", a) : ba.identifier !== v ? qa.send("exit") : p.dispatchEvent(Qa("blur"))
                            }

                            function w(a, c, e, f) {
                                if (a instanceof b && H[c]) {
                                    var g = k(H[c]);
                                    d();
                                    W = e;
                                    fa = null;
                                    ia = c;
                                    X = "forward";
                                    ca = f || ca || !1;
                                    a.HostEvent.result = ka.stringify(g);
                                    return g
                                }
                                E.warn("Invalid call to setHostResultToViewId")
                            }

                            function D() {
                                var a = [];
                                q.forEach(H, function (b, c) {
                                    c &&
                                    c.viewClass && c.viewClass.prototype && -1 !== A.indexOf(c.viewClass.prototype.viewType) && a.push(k(c))
                                });
                                return a
                            }

                            function R(a) {
                                var b, c, d, e = !1;
                                ia == a && (ia = null, b = fa || {}, c = W || {}, d = X, e = ca);
                                if (G[a] && G[a]instanceof oa.system.BaseView)return G[a].backParams = b || G[a].backParams || {}, G[a].persist = c || G[a].persist || {}, G[a].historyDirection = d || G[a].historyDirection || X || "forward", G[a].historyNoSave = e || G[a].historyNoSave || !1, G[a];
                                var f = H[a], g = T(a) || ya("li").addClass("item");
                                if (f && f.viewClass.inheritsFrom(oa.system.BaseView))return g &&
                                (G[a] = new f.viewClass({
                                    viewId: a,
                                    data: xa(f.data),
                                    element: g,
                                    backParams: b || {},
                                    persistParams: c || {}
                                }), G[a].historyDirection = d || X || "forward", G[a].historyNoSave = e || ca || !1), G[a];
                                throw pa("Can't get a view which we don't have a valid config for " + (f && f.id || "unknown view"));
                            }

                            function C(a) {
                                var d = a.payload && a.payload.id ? a.payload.id : null, e = d && R(d), f;
                                ha || (ha = sa.profile.household);
                                switch (a.type) {
                                    case "onActivateAppButton":
                                        switch (a.payload.type) {
                                            case "app-back":
                                                a = new b("onActivateBackButton", {
                                                        view: e,
                                                        viewId: d,
                                                        defaultActionCallback: t
                                                    },
                                                    null, a.HostEvent);
                                                g(a) && e.fire(a) && (d = G[l()] && G[l()].viewBackParams || null, t(d));
                                                break;
                                            case "app-home":
                                            case "app-title":
                                                g(new b("onActivateHomeButton", {
                                                    view: e,
                                                    viewId: d,
                                                    defaultActionCallback: z
                                                }, null, a.HostEvent)) && (d = G[l()] && G[l()].viewBackParams || null, z(d));
                                                break;
                                            case "app-settings":
                                                g(new b("onActivateSettingsButton", {
                                                    view: e,
                                                    viewId: d,
                                                    defaultActionCallback: n
                                                }, null, a.HostEvent)) && n();
                                                break;
                                            case "app-fav-add":
                                            case "app-fav-delete":
                                                g(new b("onActivateFavButton", {
                                                        view: e,
                                                        action: a.payload.type,
                                                        viewId: d
                                                    },
                                                    null, a.HostEvent)) && e.favbutton.call(e, new b("onActivateFavButton", {
                                                    view: e,
                                                    action: a.payload.type,
                                                    viewId: d
                                                }, null, a.HostEvent));
                                                break;
                                            case "viewport-toggle":
                                                d = l(), f = oa.mediaplayer.getViewportBounds(), !oa.mediaplayer.isTVActive && 1080 !== f.height && H[d].viewClass && H[d].viewClass.inheritsFrom(oa.system.SidebarView) && (Q.body.store("app", c), db.push(c, O !== d && d), !1 !== B("animation") ? U.animate({
                                                    translateX: -1920,
                                                    origin: ["left", "top"],
                                                    duration: .8
                                                }) : U.setStyle("transform", "translateX(-1920px)"))
                                        }
                                        break;
                                    case "onActivateSnippet":
                                        a =
                                            new b("onActivateSnippet", {view: e, viewId: d}, null, a.HostEvent);
                                        !g(a) || e && !e.fire(a) || w(a, a.payload.targetViewID || (H[d] && H[d].data ? H[d].data.targetViewID || H[d].data.destinationID || O : O), a.payload.forwardParams || {});
                                        break;
                                    case "onLoadView":
                                        e.data = Ka(e.data || {}, a.payload.data || {});
                                        e instanceof oa.system.FullscreenView && (H[d].previousViewportBounds = H[d].previousViewportBounds || oa.mediaplayer.getViewportBounds());
                                        g(new b("onLoadView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent)) && e.onLoadView.call(e, new b("onLoadView",
                                            {view: e}, null, a.HostEvent));
                                        e.rendered = !0;
                                        break;
                                    case "onUnloadView":
                                        if (g(new b("onUnloadView", {view: e, viewId: d}, null, a.HostEvent))) {
                                            try {
                                                e.onUnloadView.call(e, new b("onUnloadView", {view: e}, null, a.HostEvent))
                                            } catch (k) {
                                                E && E.error(k)
                                            }
                                            delete e.backParams;
                                            delete e.persist;
                                            delete e.data;
                                            delete G[d];
                                            e && e.suicide()
                                        }
                                        e.rendered = !1;
                                        c !== v && (dc = 0);
                                        break;
                                    case "onShowView":
                                        S = d;
                                        e.data = Ka(e.data || {}, a.payload.data || {});
                                        f = oa.mediaplayer.getViewportBounds();
                                        "scale" === B("video") && (1080 === f.height && e instanceof oa.system.SidebarView ||
                                        1080 !== f.height && e instanceof oa.system.FullscreenView) ? h(c, "onActivateAppButton", {
                                            id: d,
                                            type: "viewport-toggle"
                                        }, va) : e instanceof oa.system.FullscreenView && 1080 !== f.height && oa.mediaplayer.setViewportBounds(0, 0, 1920, 1080);
                                        g(new b("onShowView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent)) && e.onShowView.call(e, new b("onShowView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent));
                                        e.historyNoSave || -1 !== A.indexOf(e.viewType) || u === v || ("forward" === e.historyDirection ? db.push(c, 0 !== P.length && d) : db.pop(c, O !== d && d));
                                        delete e.historyNoSave;
                                        S = !1;
                                        c !== v && (Xa.send(c, "view", {
                                            name: ma,
                                            view: d,
                                            prevView: la || "",
                                            "default": O === d,
                                            category: V && V.getCategory() || "",
                                            duration: 0 < dc ? pb(dc) : 0,
                                            session: ha ? Ca(ha + jb) : null,
                                            ui: ha ? Ca(ha + rb) : null
                                        }), dc = da.now());
                                        break;
                                    case "onHideView":
                                        g(new b("onHideView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent)) && e.onHideView.call(e, new b("onHideView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent));
                                        c !== v && (la = d);
                                        break;
                                    case "onSelect":
                                        e.frozen || (e.selected = !0, e.data = Ka(e.data || {}, a.payload.data || {}), za = d, g(new b("onSelectView", {
                                                view: e,
                                                viewId: d
                                            },
                                            null, a.HostEvent)) && e.onSelectView.call(e, new b("onSelectView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent)), a = function (a) {
                                            this.setInitialFocus.call(this, new b("onGainFocus", {
                                                view: this,
                                                viewId: a
                                            }, null))
                                        }, void 0 !== e.delayedInitialFocus ? a.delay(e.delayedInitialFocus || 0, e, [d]) : a.call(e, d));
                                        X = W = fa = ia = null;
                                        ca = !1;
                                        break;
                                    case "onUnselect":
                                        e.selected = !1, e instanceof oa.system.FullscreenView && (H[d].previousViewportBounds = oa.mediaplayer.getViewportBounds()), g(new b("onUnselectView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent)) &&
                                        e.onUnselectView.call(e, new b("onUnselectView", {
                                            view: e,
                                            viewId: d
                                        }, null, a.HostEvent))
                                }
                            }

                            function F(a) {
                                var d;
                                switch (a.type) {
                                    case "getSnippetConfs":
                                        d = D();
                                        if (0 < d.length) {
                                            var f = U.appendChild(ya("ul").addClass("list").addClass("frozen"));
                                            f.setAttribute("id", c + "-@snippets");
                                            d.forEach(function (a) {
                                                f.appendChild(R(a.id).element)
                                            })
                                        }
                                        g(new b("getSnippetConfs", {}, null, a.HostEvent)) && (a.HostEvent.result = ka.stringify(d));
                                        break;
                                    case "onDialogCancelled":
                                        d = a.HostEvent.getData() || {};
                                        if (!d.previousDialog && g(new b("onDialogCancelled",
                                                d, null, a.HostEvent)))return !1;
                                        break;
                                    case "onDialogDone":
                                        d = a.HostEvent.getData() || {};
                                        if (!d.previousDialog && g(new b("onDialogDone", a.HostEvent.getData() || {}, null, a.HostEvent)))return !1;
                                        break;
                                    case "onAppInit":
                                        g(new b("onApplicationStartup", {}, null, a.HostEvent));
                                        break;
                                    case "onAppFin":
                                        if (g(new b("onApplicationShutdown", {}, null, a.HostEvent))) {
                                            Da = !ba || !0 !== ba.background;
                                            var h = D().pluck("id") || [], k = [];
                                            q.forEach(G, function (a, b) {
                                                -1 === h.indexOf(a) && k.push(a)
                                            });
                                            a.HostEvent.result = ka.stringify(k);
                                            za = S = "";
                                            oa.mediaplayer.setViewportBounds(0,
                                                0, 1920, 1080);
                                            P.push(!1);
                                            e()
                                        }
                                        break;
                                    case "onLoadProfile":
                                        g(new b("onLoadProfile", {}, null, a.HostEvent)) && q.each(G, function (c, d) {
                                            d.fire(new b("onLoadProfile", {}, null, a.HostEvent))
                                        });
                                        break;
                                    case "onUnloadProfile":
                                        g(new b("onUnloadProfile", {}, null, a.HostEvent)) && (q.each(G, function (c, d) {
                                            d.fire(new b("onUnloadProfile", {}, null, a.HostEvent))
                                        }), a.HostEvent.result = ka.stringify(D()))
                                }
                            }

                            function I(a) {
                                g(new b("onWidgetKeyPress", {
                                    keyCode: a.keyCode,
                                    key: a.key,
                                    eventPhase: a.eventPhase,
                                    type: a.type
                                }, a)) && (3 == a.eventPhase &&
                                -1 !== Y.indexOf(a.key) && g(new b("onPlayControlKeyPress", {
                                    keyCode: a.keyCode,
                                    key: a.key,
                                    eventPhase: a.eventPhase,
                                    type: a.type
                                }, a)), 3 == a.eventPhase && -1 !== aa.indexOf(a.key) && g(new b("onColorKeyPress", {
                                    keyCode: a.keyCode,
                                    key: a.key,
                                    eventPhase: a.eventPhase,
                                    type: a.type,
                                    color: a.key
                                }, a)) && h(ba.identifier, "onActivateColorButton", {color: a.key}, va), "menu" === a.key && u === c && u === v && (V.exited ? V.resume() : V.exited || V.exit(), a.preventDefault()))
                            }

                            function J(a) {
                                if (K() && ob("app") === c)a.preventDefault(); else if (!a.defaultPrevented &&
                                    g(new b("onActivateBackButton", {view: d}, a)) && (d = l()) && d in G) {
                                    var d = R(d);
                                    d.fire(new b("onActivateBackButton", {view: d}, a)) && t(d.viewBackParams || {})
                                }
                            }

                            function K() {
                                var a = l();
                                return a in H && H[a].viewClass && H[a].viewClass.inheritsFrom(oa.system.SidebarView) || !1
                            }

                            function N() {
                                a(this, "viewTypes", function () {
                                    return L
                                });
                                this.subscribers = na
                            }

                            var T = ba.getElementById, S = "", za = "", O = "", Z = "", G = {}, H = {}, P = [], fa = null, W = null, ia = null, X = null, ca = !1, ga = {}, Da = !1, ma = c !== v && V && V.getMetadataByKey(c, "name"), ha = sa.profile.household,
                                la;
                            C.allowed = !0;
                            F.allowed = !0;
                            C.subscribeTo(qa, "onActivateAppButton onActivateSnippet onHideView onLoadView onShowView onUnloadView onSelect onUnselect".split(" "));
                            F.subscribeTo(qa, "getSnippetConfs onAppInit onAppFin onDialogCancelled onDialogDone onUnloadProfile onLoadProfile".split(" "));
                            var na = {};
                            f.forEach(function (b) {
                                a(na, b, function () {
                                    return ga[b] ? ga[b] : []
                                });
                                M(na, b, function (a) {
                                    if (a instanceof ea)ga[b] = a; else throw pa("MAF.application.subscribe: Invalid setting of subscribers for eventType: " +
                                        b);
                                })
                            });
                            ba.close = function (a) {
                                ba.removeEventListener("keydown", I);
                                ba.removeEventListener("back", J);
                                Da || a || qa.send("exit");
                                e(!ba || !0 !== ba.background)
                            };
                            ba.addEventListener("keydown", I, !1);
                            ba.addEventListener("back", J, !1);
                            N.prototype = {
                                constructor: N, init: function (a) {
                                    a.views instanceof ea && a.defaultViewId ? (!0 === ba.fullscreen && ja.players[0].hide(), e(!0), O = a.defaultViewId, Z = a.settingsViewId || "", a.views.forEach(function (a) {
                                        this.addViewConfig(a)
                                    }, this)) : E.warn("Invalid application config. The following properties are required: views, defaultViewId")
                                },
                                removeView: function (a) {
                                }, loadView: function (a, b, c, d) {
                                    l();
                                    b && "object" !== x(b) && E.warn("loadView: params need to be an object");
                                    d && "object" !== x(d) && E.warn("loadView: backParams need to be an object");
                                    a in H ? -1 !== A.indexOf(H[a].viewClass.prototype.viewType) ? E.warn("You can't call loadView on a snippet or icon view!") : (c || y(), m(a, b, "forward", d, c)) : E.warn("You can't switch to a view for which we don't have a config for (typo maybe?)")
                                }, reloadView: function (a) {
                                    a && "object" !== x(a) && E.warn("reloadView: params need to be an object");
                                    var b = l();
                                    (b = R(b)) ? (b.persist = a || b.persist, b.updateView()) : E.warn("Failed to get a ViewClass for a reloadView.")
                                }, previousView: t, clearViewHistory: d, isDefaultView: function () {
                                    return 0 === P.length
                                }, loadDefaultView: z, loadSettingsView: n, getViewProperty: function (a, b) {
                                    return G[a] && G[a][b]
                                }, isSidebarView: K, isSidebarLoaded: function () {
                                    var a = l();
                                    return a in H && H[a].viewClass && H[a].viewClass.inheritsFrom(oa.system.WindowedView) || !1
                                }, getDefaultViewId: function () {
                                    return O
                                }, getPreviousViewId: function () {
                                    var a = P.length;
                                    return 1 <= a ? (a = P[a - 1], "object" === x(a) ? a.id : a) : r
                                }, getCurrentViewId: l, setHostResultToViewId: w, getViewConfig: function (a) {
                                    return H[a] || !1
                                }, launchApp: function (a, b) {
                                    qa.send("launchApp", {id: a, data: b})
                                }, exitToDock: function () {
                                    E.warn("MAF.application.exitToDock() is deprecated, please use MAF.application.exit()");
                                    this.exit()
                                }, exit: function () {
                                    qa.send("exit")
                                }, exitToLive: function () {
                                    this.exit();
                                    ja.exit()
                                }, addViewConfig: function (a) {
                                    if (!a.viewClass || !a.viewClass.inheritsFrom(oa.system.BaseView))throw pa("Invalid view config. All configs must at minimum provide an id and a viewClass (" +
                                        a.id + ")");
                                    H[a.id] = a
                                }
                            };
                            N.prototype.debugWhatViewsLoaded = function () {
                                Hb(l())
                            };
                            N.prototype.debugViewHistory = function () {
                                Hb(P)
                            };
                            return new N
                        }(c);
                        a(oa, "application", function () {
                            return Aa
                        });
                        a(E, "currentViewId", function () {
                            return Aa.getCurrentViewId()
                        });
                        c === v && (a(E, "ApplicationManager", function () {
                            return V
                        }), a(E, "PluginManager", function () {
                            return ja
                        }));
                        var Ea = !1;
                        a(E, "close", function () {
                            return X
                        });
                        D.forEach(function (b) {
                            a(this, b, function () {
                                return this
                            })
                        }, E);
                        a(E, "name", function () {
                            return ba.name
                        });
                        a(E, "KONtx", function () {
                            return this.MAF
                        });
                        oa.mediaplayer = new Nb(c, E)
                    };
                c.prototype = {constructor: c};
                return c
            }();
            L.prototype = {
                constructor: L, getApplications: function () {
                    return q.keys(O).filter(function (a) {
                        return a !== v
                    })
                }, getCurrentViewId: function () {
                    return S[u].currentViewId
                }, exists: function (a) {
                    return O[a] !== r
                }, getMetadata: function (a) {
                    return O[a]
                }, getMetadataByKey: function (a, b) {
                    b = O[a] && O[a][b] || b;
                    return K(a, b)
                }, getAboutIcon: function (a) {
                    var b = O[a] && O[a].images && O[a].images.about;
                    if ("object" === x(b))var c = S[u].profile, b = b[c.languageCode] || b[c.locale] ||
                        b[c.languageCode + "-EU"] || b[Gb];
                    b && (b = d(a) + b);
                    return b
                }, getIcon: function (a, b) {
                    var c = O[a] && O[a].images && O[a].images.icon[b || "192x192"];
                    if ("object" === x(c))var e = sa.profile, c = c[e.languageCode] || c[e.locale] || c[e.languageCode + "-EU"] || c[Gb];
                    c && (c = d(a) + c);
                    return c
                }, getBaseURL: function () {
                    return Ba.href.split("#")[0]
                }, getMainURL: function (a) {
                    return this.getBaseURL() + "#" + (a || "")
                }, getLaunchURL: function (a) {
                    return a && this.getBaseURL() + "#app:" + a
                }, getRootPath: function (a) {
                    return d(a)
                }, getLocalization: function (a) {
                    return K(a)
                },
                getViewport: function () {
                    return Ib
                }, setCategory: function (a) {
                    this.category = a
                }, getCategory: function () {
                    return this.category
                }, getCategories: function () {
                    return F.versions ? (F.categories || []).map(function (a) {
                        var b = Va("category_" + a.name), c = Aa(a.name);
                        gb[c] = a.apps || [];
                        for (var d in a.label)ua[v][d] = ua[v][d] || {}, ua[v][d][b] = a.label[d];
                        return c
                    }) : F.categories || []
                }, getFeatured: function () {
                    if (F.featured)return F.featured;
                    for (var a = F.categories || [], b = 0; a.length; b++)if ("object" === typeof a[b] && "featured" === Aa(a[b].name))return a[b].apps;
                    return []
                }, getApplicationsByChannelName: function (a) {
                    var b = [], c = x(a);
                    if ("string" === c || "number" === c)"string" === c && Wb && (a = a.replace(eb([].concat(Wb).join("|"), "gi"), "")), a = eb(N(a), "gi");
                    if (!a)return b;
                    b = (F.apps || []).filter(function (b) {
                        return (b = O[b]) && b.channels && ("all" === b.channels || a.test && a.test([].concat(b.channels).join(" ")))
                    });
                    q.forEach(B("channel") || {}, function (c, d) {
                        if ("*" === c || a.test(c))"string" === x(d) ? -1 === b.indexOf(d) && b.push(d) : d && d.forEach(function (a) {
                            -1 === b.indexOf(a) && b.push(a)
                        })
                    });
                    return b
                },
                getApplicationsByCategory: function (a) {
                    return "object" === typeof a ? a.apps : gb[a] || (F.apps || []).filter(function (b) {
                        var c = O[b];
                        return b !== v && c.categories && -1 < c.categories.indexOf(a)
                    })
                }, search: function (a) {
                    function b(a, e) {
                        e = e || 1;
                        var f = d.indexOf(a);
                        -1 < f ? c[f].count += e : (f = d.push(a), c[f - 1] = {id: a, count: e})
                    }

                    var c = [], d = [];
                    "string" === x(a) && (Wb && (a = "(" + a.replace(eb([].concat(Wb).join("|"), "gi"), "").replace(/  /g, "|") + ")"), a = eb(a, "gi"));
                    q.forEach(O, function (c) {
                        var d = O[c];
                        c !== v && (d.name && a.test(d.name) && b(c, 3), d.description &&
                        a.test(d.description) && b(c, 2), d.keywords && a.test(d.keywords) && b(c, d.keywords.match(a).length), d.categories && d.categories.length && (d = d.categories.filter(function (b) {
                            return a.test(b)
                        }), 0 < d.length && b(c, d.length)))
                    });
                    return c.keySort({count: "desc"})
                }, load: function (a) {
                    var b = da.now(), c = S[a], d = u && N(u);
                    if (!c && O[a]) {
                        var c = S[a] = new Qb(a), e = [].concat(O[a].scripts);
                        u = a;
                        try {
                            e.forEach(function (a) {
                                c.include(a)
                            }, c)
                        } catch (f) {
                            delete S[a];
                            u = d;
                            return
                        } finally {
                            c = r
                        }
                        h(a, "onAppInit", {id: a}, va);
                        u = d;
                        v !== a ? Xa.send(a, "load",
                            {
                                name: this.getMetadataByKey(a, "name"),
                                loadtime: pb(b)
                            }) : Xa.send(a, "load", {loadtime: pb(b)})
                    }
                }, unload: function (a) {
                    var b = S[a];
                    b && (u = a, b.close(!0), u = a !== v ? v : r, v !== a ? Xa.send(a, "unload", {name: this.getMetadataByKey(a, "name")}) : Xa.send(a, "unload"))
                }, open: function (a, b) {
                    S[a] && u !== a && (u && u !== a && h(u, "onUnselect", {id: S[u].currentViewId}, va), u = a, a === v ? h(a, "onActivateSnippet", {id: S[u].currentViewId}, va) : h.delay(100, null, [a, "onActivateSnippet", b ? {
                        id: S[u].currentViewId,
                        params: b
                    } : {id: S[u].currentViewId}, va]))
                }, close: function (a) {
                    if (S[a] &&
                        a === u)try {
                        h(a, "onAppFin", {id: a}, va)
                    } catch (b) {
                    }
                }, purchase: function (a, b) {
                    var c = a && O[a];
                    if (!c || !c.hash)return b && b(["invalid"]);
                    (new ra({
                        url: "https://" + La[8] + "-sdk." + Fa + ".com/" + sa.profile.household + "/generate-signature",
                        proxy: !1,
                        data: {identifier: c.identifier, version: c.version + "-" + c.hash},
                        onSuccess: function (a) {
                            sa.profile.purchase(a, b)
                        },
                        onFailure: function (a) {
                            b && b.call && b(["invalid"])
                        },
                        onError: function () {
                            b && b.call && b(["invalid"])
                        }
                    })).send()
                }, forEach: function (a, b) {
                    q.forEach(S, a, b)
                }, fire: function (a, b, c) {
                    return h(a,
                        b, c, va)
                }, resume: function (a) {
                    ja.resume(a)
                }, exit: function (a, b) {
                    u !== v && this.close(u);
                    ja.exit(a, b)
                }, reload: function () {
                    p.location.reload()
                }, isSD: function () {
                    return B("forceSD") || "1" === vc.sd || Mb.hasClass("sd")
                }, onComplete: ta
            };
            V = new L;
            ga.middleware || "1" === ja.storage.get("sdk") || "agree" === F.license ? (F.apps = F.apps && function (a) {
                    a = a || [];
                    return a.filter(function (b, c) {
                        return a.indexOf(b) === c
                    })
                }(F.apps), !0 === ja.delayStart ? ja.startup = bb : bb(), this.destroy = function () {
                var a = V.active;
                a !== v && V.close(a);
                V.close(v);
                S = O =
                    ua = gb = Ib = Ja = V = null
            }, a(this, "current", function () {
                return S[u]
            }), !0 === B("runtime") && (this.dump = function () {
                return [S, O, ua]
            })) : (lb("please agree licenses and the terms and conditions"), function () {
                var a = Sa("viewport"), b = ya().addClass("frame license"), c = ya().addClass("frame buttons").inject(b), d = ya().addClass("frame checkbox").inject(b), e = ya("textarea").addClass("frame text").inject(b), f = ya("input").inject(d), g = ya("label").inject(d), h = ya("input").inject(c), c = ya("input").inject(c), d = new fb;
                d.open("GET", "LICENSE?" +
                    da.now(), !1);
                d.send();
                e.setAttribute("disabled", "disabled");
                e.innerHTML = d.responseText;
                f.setAttribute("type", "checkbox");
                f.setAttribute("id", "agree");
                f.onclick = function () {
                    f.checked && g.setStyle("color", null)
                };
                g.setAttribute("for", "agree");
                g.innerHTML = "I have read and accept the Terms &amp; Conditions.";
                h.setAttribute("type", "button");
                h.setAttribute("value", "OK");
                h.onclick = function () {
                    f.checked ? (ja.storage.set("sdk", "1"), h.addClass("fa-input fa-spin"), h.setStyle("color", "white"), h.setAttribute("value",
                        "\uf110"), h.setAttribute("disabled", "disabled"), Kb(Fc, 1E3)) : g.setStyle("color", "red")
                };
                c.setAttribute("type", "button");
                c.setAttribute("value", "PRINT");
                c.onclick = function () {
                    var a = p.open("", "printWindow", "location=yes, menubar=yes, toolbar=yes");
                    a.document.open();
                    a.document.write("<html><head></head><body><pre>" + e.innerHTML + "</pre></body></html>");
                    a.print();
                    a.document.close();
                    a.close()
                };
                a.setStyle("backgroundColor", "rgba(0,0,0,.7)");
                b.inject(a)
            }())
        };
    (function () {
        function a() {
            if (!1 !== Ya && Ma) {
                Ma.setStyles({
                    width: null,
                    height: null
                });
                var b = B("scale") || "height", c = !0 === B("zoom"), d = {
                    width: Ma.offsetWidth || Ma.clientWidth || 0,
                    height: Ma.offsetHeight || Ma.clientHeight || 0
                }, e;
                if (0 !== w.min(d.width, d.height)) {
                    "width" === b || "height" === b ? Wa = Oa = d[b] / (viewport[b] || ("width" === b ? 1920 : 1080)) : "both" === b ? (Oa = d.width / (viewport.width || 1920), Wa = d.height / (viewport.height || 1080)) : b && !isNaN(b) && (Wa = Oa = b / 1080);
                    e = e || {};
                    !0 === B("preserve-3d") && (e.transformStyle = "preserve-3d");
                    (1 !== Oa || 1 !== Wa) && 0 < w.min(Oa, Wa) && (c || (e.transformOrigin = "0 0"), !0 === B("matrix") &&
                    !1 !== B("animation") && ga.webkit && isNaN(b) && !c ? (c = (new Ob).scale(Oa, Wa), e.transform = !1 !== B("gpu") ? c.translate(0, 0, 1) : c) : Oa === Wa ? c ? e.zoom = Oa : e.transform = "scale(" + Oa + ")" : e.transform = "scale(" + Oa + "," + Wa + ")");
                    c = {width: w.floor(1920 * Oa), height: w.floor(1080 * Wa)};
                    Ma.setStyles(c);
                    var h = Sa("iframe");
                    h && h.setStyles(c);
                    X(e) && Sa("viewport").setStyles(e);
                    Mb.hasClass("sd") || (720 > d.height && 1 !== Oa && 1 !== Wa && 1080 !== b && 720 !== b ? Mb.addClass("sd") : 720 <= d.height && Mb.removeClass("sd"))
                }
            }
        }

        function c(a, b) {
            var c, d, e, h, l, g, p;
            a.addEventListener("touchstart",
                function (a) {
                    var b = a.changedTouches[0];
                    c = r;
                    dist = 0;
                    d = b.pageX;
                    e = b.pageY;
                    p = da.now();
                    a.preventDefault()
                }, !1);
            a.addEventListener("touchmove", function (a) {
                a.preventDefault()
            }, !1);
            a.addEventListener("touchend", function (a) {
                var f = a.changedTouches[0], q = a.target;
                h = f.pageX - d;
                l = f.pageY - e;
                g = da.now() - p;
                300 >= g && (150 <= w.abs(h) && 100 >= w.abs(l) ? c = 0 > h ? "left" : "right" : 150 <= w.abs(l) && 100 >= w.abs(h) && (c = 0 > l ? "up" : "down"));
                if (c && b && b.call)b(c); else if (la(c) && 0 === h && 0 === l && q) {
                    if (!q.allowNavigation) {
                        a.preventDefault();
                        return
                    }
                    for (; q && !q.focusable;)q = q.parentNode;
                    f = q.retrieve && q.retrieve("type");
                    q && "view" !== f && "dialog" !== f && ("window" === f ? (q = Q.activeElement) && ob("app") && q.dispatchEvent(Qa("back", r, !0, !0)) : q.select())
                }
                a.preventDefault()
            }, !1)
        }

        function d(a) {
            a = a.target || this;
            var b = Sa("viewport");
            a && a.src ? (b.frozen = !0, a.frozen = !1, a.contentWindow.focus()) : (a.frozen = !0, b.frozen = !1)
        }

        function b(a) {
            a = a.target || this;
            var b = h.current;
            b && b.focus();
            a.frozen = !0;
            Sa("viewport").frozen = !1
        }

        function l(a) {
            var b = Za;
            if (b && a.source === b.contentWindow)a:{
                var c =
                    h.current, d = b.contentWindow, e;
                try {
                    e = ka.parse(a.data)
                } catch (l) {
                    break a
                }
                switch (e.type) {
                    case "close":
                        U("IFRAME CLOSE");
                        c.MAF.application.exit();
                        break;
                    case "getStorage":
                        d.postMessage(ka.stringify({type: "storage", message: c.currentAppConfig.get("c")}), "*");
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
            Ma = Q.body;
            var e = Sa("viewport");
            e ? e.addClass("window") : (e = Bc("viewport").inject(Ma),
                Za = Zc("iframe").inject(Ma, "inline" === B("player") ? "bottom" : "top"), Za.addEventListener("load", d, !1), Za.addEventListener("unload", b, !1), p.addEventListener("message", l, !1));
            (B("forceSD") || "1" === vc.sd) && Mb.addClass("sd");
            ga.mobile && c(e, function (a) {
                var b = Q.activeElement;
                b && b.dispatchEvent(Qa("navigate", {direction: a}, !0, !0))
            });
            wb(ya().addClass("text").inject(e), "id", "textrenderer");
            (function () {
                for (var a = ya().style, b = ["-moz-", "-o-", "-webkit-", "-ms-", ""]; 0 < b.length;) {
                    var c = b.shift();
                    a.cssText = c + "transition-property:opacity;";
                    if ("undefined" !== x(a[(c + "transition-property").camelize()])) {
                        Ya = c;
                        break
                    }
                }
            })();
            Nb = (Ya + Nb).camelize();
            Mc = (Ya + Mc).camelize();
            a();
            nc = yc();
            F && (h = new od, !0 === B("runtime") && (p.MAF.Runtime = h));
            e.frozen = !1
        }

        var h;
        p.addEventListener("resize", a, !1);
        p.addEventListener("load", e, !1);
        p.addEventListener("unload", function (b) {
            p.removeEventListener("load", e);
            p.removeEventListener("resize", a);
            try {
                h && (h.destroy(), h = r);
                var c = Sa("viewport");
                c && c.destroy()
            } catch (d) {
                b.preventDefault()
            }
            lc = Ma = nc = Za = null
        })
    })()
})(window, document);
