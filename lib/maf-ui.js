// Copyright 2005-2015 Metrological
// All Rights Reserved.
define("MAF.utility.PagerStorageClass", function () {
    return new MAF.Class({
        ClassName: "PagerStorageClass", initialize: function () {
            this.items = [];
            this.config.data && (this.addItems([].concat(this.config.data)), this.config.data = null, delete this.config.data)
        }, add: function (a) {
            this.addItems(a)
        }, addItems: function (a) {
            this.items = this.items.concat(a || []).unique()
        }, remove: function (a, b) {
            a = [].concat(a);
            b = !0 === b ? !0 : !1;
            for (var c = 0, d = a.length; c < d; c++)!1 !== this.contains(a[c], b) && this.items.splice(itemIndex, 1)
        }, contains: function (a,
                               b) {
            return Object.contains(a, this.items, b)
        }, truncate: function () {
            this.items = []
        }
    })
});
define("MAF.utility.Pager", function () {
    var a = {};
    return new MAF.Class({
        ClassName: "Pager", eventType: "pageDone", Protected: {
            filterItems: function (b) {
                var c = [], d = a[this._classID];
                d.storage.remove("filter");
                d.allowFiltering && (d.dataSize = 0);
                d.storage.forEach(function (a, f) {
                    var g = b && "function" === typeOf(b) ? b(a, f) : a;
                    !1 !== g && void 0 !== g && null !== g && (b && "function" === typeOf(b) ? c.push(f) : c[f] = f, d.allowFiltering && d.dataSize++)
                }, this);
                d.storage.set("filter", c)
            }, setData: function () {
            }, getData: function (b, c, d) {
                var e = a[this._classID];
                b = b || 0;
                c = c || e.dataSize;
                d = "function" === typeOf(this.config.filter) && !0 === d ? !0 : !1;
                var f = [];
                (e.storage.get("filter") || []).slice(b, b + c).forEach(function (c, a) {
                    f.push(e.storage.get(c))
                }, this);
                return f
            }
        }, config: {filter: null}, initialize: function (b, c, d, e, f) {
            var g = a[this._classID] = {};
            g.pageSize = b || 1;
            g.fetchSize = c || 48;
            g.loadFactor = f;
            g.storage = new HashMap;
            d ? (g.fetch = {func: d, obj: e}, g.allowFiltering = !1) : g.allowFiltering = !0
        }, initItems: function (b, c) {
            if (!b)return !1;
            var d = a[this._classID];
            d.curIndex = 0;
            d.nextIndex = 0;
            d.leftIndex = 0;
            d.rightIndex = 0;
            d.paramsMap = {};
            d.storage.clear();
            b.forEach(function (c, a) {
                d.storage.set(a, c)
            }, this);
            d.dataSize = c || b.length || 0;
            this.filterItems(this.config.filter)
        }, setFilter: function (b) {
            var c = a[this._classID];
            "function" === typeOf(b) && c.allowFiltering ? (this.config.filter = b, this.filterItems(this.config.filter)) : warn("Filtering needs a function or is not allowed because its set on dynamic paging.")
        }, getItem: function (b) {
            var c = a[this._classID];
            b = c.storage.get("filter")[b];
            return c.storage.get(b)
        },
        getItems: function () {
            return this.getData()
        }, addItems: function (a) {
            a && "array" === typeOf(a) && (a = this.getItems().concat(a), this.initItems(a, a.length))
        }, removeItems: function (a, c) {
            var d = this.getItems();
            d.splice(a, c);
            this.initItems(d, d.length)
        }, getPageSize: function () {
            return a[this._classID].pageSize || 0
        }, setPageSize: function (b) {
            a[this._classID].pageSize = b || 0
        }, getFetchSize: function () {
            return a[this._classID].fetchSize || 0
        }, getItemsSize: function () {
            return this.getItems().length
        }, getDataSize: function () {
            return a[this._classID].dataSize ||
                0
        }, getNumPages: function () {
            var b = a[this._classID];
            return 0 < b.dataSize ? Math.ceil(b.dataSize / b.pageSize) : 0
        }, getPage: function (b, c, d, e) {
            var f = a[this._classID];
            b = b || 0;
            d = d || f.pageSize || 0;
            var g = this.getData(b, d, !0);
            if (g && 0 < g.length)return f = new MAF.utility.PagerStorageClass({data: g}), this.fire(this.eventType, {
                data: f,
                index: b,
                wrap: c
            }), f;
            var h = Math.floor(b / f.fetchSize), k = Math.max(d, f.fetchSize), g = "" + Date.now() + Math.random();
            d = {index: b, wrap: c, add_index: h * f.fetchSize, page_size: d || f.pageSize, quiet: e};
            e = {
                page: h,
                per_page: k, key: g
            };
            f.paramsMap || (f.paramsMap = {});
            f.paramsMap[g] = d;
            f.fetch && f.fetch.func ? f.fetch.func.call(f.fetch.obj, e) : this.fire(this.eventType, {
                data: new MAF.utility.PagerStorageClass({data: []}),
                index: b,
                wrap: c
            });
            return null
        }, onGotPage: function (b, c, d) {
            var e = a[this._classID], f = e.paramsMap[b.key];
            if (!f)return !1;
            e.paramsMap[b.key] = null;
            c.forEach(function (c, a) {
                e.storage.set(f.add_index + a, c)
            }, this);
            this.filterItems(this.config.filter);
            null !== d && (e.dataSize = d);
            b = this.getData(f.index, f.page_size);
            b = new MAF.utility.PagerStorageClass({data: b});
            f.quiet || this.fire(this.eventType, {data: b, index: f.index, wrap: f.wrap});
            return !0
        }, suicide: function () {
            var b = a[this._classID];
            b && delete b.storage;
            delete a[this._classID]
        }
    })
});
define("MAF.utility.BusyIndicators", function () {
    return {
        check: function (a) {
            a = a || 0;
            MAF.utility.LoadingOverlay.check() ? a = 2 : 0 < MAF.utility.WaitIndicator.check() && (a = 1);
            return MAF.HostEventManager.send("setWaitIndicator", a)
        }
    }
});
define("MAF.utility.LoadingOverlay", function () {
    return {
        show: function () {
            return this.active ? this.active : (this.active = !0, MAF.utility.BusyIndicators.check())
        }, hide: function () {
            return this.active ? (this.active = !1, MAF.utility.BusyIndicators.check()) : this.active
        }, on: function () {
            return this.show()
        }, off: function () {
            return this.hide()
        }, toggle: function () {
            return this.active ? this.hide() : this.show()
        }, check: function () {
            return this.active
        }
    }
});
define("MAF.utility.WaitIndicator", function () {
    var a = 0, b = null, c = new Timer(60, function () {
        MAF.utility.WaitIndicator.police(!0)
    });
    return {
        up: function () {
            a += 1;
            b = Date.now();
            return this.check()
        }, down: function () {
            a = Math.max(0, a - 1);
            return this.check()
        }, on: function () {
            return 0 < this.tasks ? (b = Date.now()) && this.check() : this.up()
        }, off: function () {
            this.hide(!0)
        }, show: function (b) {
            c.start();
            return this.active || (this.active = !0, MAF.utility.BusyIndicators.check(a))
        }, hide: function (c) {
            c && (a = 0);
            return !this.active || (this.active = !1) || MAF.utility.BusyIndicators.check(a)
        }, police: function (a) {
            if (a || b + 6E4 < Date.now())return c.stop(), this.hide(!0)
        }, toggle: function () {
            return this.active ? this.hide(!0) : (a = 1, this.show())
        }, check: function () {
            0 < a ? this.show() : this.hide();
            this.police();
            return a
        }
    }
});
define("MAF.utility.timer", function () {
    return {
        setInterval: function (a, b) {
            var c = new Timer;
            c.onTimerFired = a;
            c.interval = b / 1E3;
            c.ticking = !0;
            return c
        }, clearInterval: function (a) {
            a.ticking = !1;
            delete a
        }, setTimeout: function (a, b) {
            var c = new Timer;
            c.onTimerFired = function () {
                this.ticking = !1;
                a()
            };
            c.interval = b / 1E3;
            c.ticking = !0;
            return c
        }, clearTimeout: function (a) {
            a.ticking = !1;
            delete a
        }
    }
});
define("MAF.element.Core", function () {
    return new MAF.Class({
        ClassName: "BaseCore", Implements: [Library.Storage, Library.DOM, Library.Styles], Protected: {
            initElement: function () {
                var a = this.config.element;
                a && a.nodeType || (a = a && a.prototype && a.prototype.constructor ? new a : new this.constructor.prototype.config.element);
                a.addClass(this.ClassName);
                this.config.ClassName && a.addClass(this.config.ClassName);
                this.config.element = null;
                delete this.config.element;
                a.owner = this;
                this.element = a;
                this.proxyProperties();
                this.registerEvents();
                this.config.id && (this.id = this.config.id);
                !0 === this.config.frozen && this.freeze()
            }, proxyProperties: function (a) {
                a = "width height visible frozen hAlign vAlign rotate zOrder hOffset vOffset scrollLeft scrollTop".split(" ").concat(a || []);
                MAF.Class.Methods.proxyProperties(this, this.element, a);
                getter(this, "outerWidth", function () {
                    var a = this.element, c = a && a.width;
                    return void 0 !== c && c + (a.hOffset || 0)
                });
                getter(this, "outerHeight", function () {
                    var a = this.element, c = a && a.height;
                    return void 0 !== c && c + (a.vOffset || 0)
                });
                getter(this,
                    "id", function () {
                        var a = this.element;
                        return a && a.getAttribute("id")
                    });
                setter(this, "id", function (a) {
                    var c = this.element;
                    return c && c.setAttribute("id", a)
                })
            }, registerEvents: function (a) {
                if (a) {
                    var b = this.dispatchEvents.bindTo(this);
                    [].concat(a).forEach(function (c) {
                        c = c && c.type ? c.type : c;
                        var a = !0 === c.phase;
                        c && this.element && this.element.addEventListener(c, b, a)
                    }, this)
                }
            }, dispatchEvents: emptyFn, getWindow: function () {
                var a = this.element;
                return (a = a && a.window) && a.owner
            }
        }, config: {element: Frame}, initialize: function () {
            this.initElement();
            this.children = [];
            this.setStyles(this.config.styles)
        }, getView: function () {
            return this.getWindow()
        }, show: function () {
            this.element.visible = !0;
            return this
        }, hide: function () {
            this.element.visible = !1;
            return this
        }, freeze: function () {
            this.element.updatesEnabled = !1;
            return this
        }, thaw: function () {
            this.element.updatesEnabled = !0;
            return this
        }, animate: function (a) {
            var b;
            a.events && a.events.onAnimationEnded ? (b = a.events.onAnimationEnded, delete a.events) : a.callback && (b = a.callback);
            a.callback = function (c) {
                if (b && b.call)try {
                    b.call(this,
                        c)
                } catch (a) {
                }
                try {
                    this.fire("onAnimationEnded", c)
                } catch (e) {
                }
            };
            return this.element && this.element.animate.call(this, a)
        }, getAbsolutePosition: function () {
            var a = this.hOffset, b = this.vOffset, c = this.element.window, d = this.element.parentNode;
            if (c && d)for (; d && c !== d;)a += d.hOffset, b += d.vOffset, d = d.parentNode;
            return {hOffset: a, vOffset: b}
        }
    })
});
define("MAF.element.Container", function () {
    return new MAF.Class({
        ClassName: "BaseContainer", Extends: MAF.element.Core, Implements: Library.Themes, Protected: {
            dispatchEvents: function (a, b) {
                this.parent(a, b);
                var c = a.type;
                switch (c) {
                    case "navigate":
                        this.fire("onNavigate", a.detail, a);
                        return
                }
                this.fire("on" + c.capitalize(), b, a)
            }, registerEvents: function (a) {
                this.parent(["focus", "blur", "select", "navigate"].concat(a || []))
            }, proxyProperties: function (a) {
                this.parent(a);
                getter(this, "disabled", function () {
                    return this.element &&
                        this.element.disabled
                });
                setter(this, "disabled", function (a) {
                    a = a || !1;
                    var c = this.element;
                    this.disabled !== a && (this.fire(a ? "onDisable" : "onEnable"), c && (c.disabled = a), this.fire("onChangeDisabled", {disabled: a}))
                })
            }
        }, initialize: function () {
            this.parent();
            this.element.wantsFocus = this.config.focus;
            this.config.content && (this.content = this.config.content, this.config.content.element ? this.adopt(this.content) : this.config.content.length && this.adopt.apply(this, this.content), this.config.content = null, delete this.config.content)
        },
        focus: function () {
            if (this.element.hasFocus)return !0;
            this.element.focusable && this.element.focus();
            return !0 === this.element.hasFocus
        }, suicide: function () {
            if (this.content) {
                for (this.content = [].concat(this.content); this.content.length;)this.content.pop().suicide();
                delete this.content
            }
            this.parent()
        }
    })
}, {
    BaseGlow: {
        applyLayer: function (a, b, c) {
            if (!a.hasClass("BaseGlow"))return a.addClass("BaseGlow"), a
        }, styles: {backgroundColor: "rgba(0,0,0,.5)"}
    }, BaseHighlight: {
        applyLayer: function (a, b, c) {
        }, styles: {}
    }, BaseFocus: {
        applyLayer: function (a,
                              b, c) {
            if (!a.hasClass("BaseFocus"))return a.addClass("BaseFocus"), a
        }, styles: {backgroundColor: "red"}
    }, BaseActive: {
        applyLayer: function (a, b, c) {
            if (!a.hasClass("BaseActive"))return a.addClass("BaseActive"), a
        }, styles: {backgroundColor: "rgba(255,0,0,.5)"}
    }
});
define("MAF.element.Image", function () {
    return new MAF.Class({
        ClassName: "BaseImage",
        Extends: MAF.element.Core,
        Protected: {
            dispatchEvents: function (a, b) {
                this.parent(a, b);
                switch (a.type) {
                    case "load":
                        this.fire("onLoaded", b, a);
                        this.config.autoShow && this.show();
                        this.config.manageWaitIndicator && MAF.utility.WaitIndicator.down();
                        break;
                    case "error":
                        this.config.missingSrc && (this.element.source = this.config.missingSrc), this.fire("onError", b, a), this.config.autoShow && this.show(), this.config.manageWaitIndicator && MAF.utility.WaitIndicator.down()
                }
            },
            registerEvents: function (a) {
                this.parent(["load", "error"].concat(a || []))
            }, proxyProperties: function (a) {
                this.parent("source aspect srcWidth srcHeight region remoteAsync".split(" ").concat(a || []));
                getter(this, "src", function () {
                    return this.element && this.element.source
                });
                setter(this, "src", function (a) {
                    this.element && (this.element.source = a)
                })
            }
        },
        config: {remoteAsync: !0, element: Image, hideWhileLoading: !1, autoShow: !0, manageWaitIndicator: !1},
        initialize: function () {
            this.parent();
            this.remoteAsync = !1 === this.config.remoteAsync ?
                !1 : !0;
            delete this.config.remoteAsync;
            this.config.aspect && (this.aspect = this.config.aspect);
            this.config.region && (this.region = this.config.region);
            this.setSources(this.config)
        },
        getSource: function () {
            return this.source
        },
        setSource: function (a) {
            return this.setSources({src: a})
        },
        setSources: function (a) {
            a = a || {};
            var b = this.element, c = this.config, d = a.src || a.source;
            "missingSrc"in a && (c.missingSrc = a.missingSrc);
            d && (c.manageWaitIndicator && MAF.utility.WaitIndicator.up(), c.hideWhileLoading && this.hide());
            b && c && (a = c.src ===
                d, b.source = c.src = d, a && d && d !== Image.BLANK && (this.fire("onLoaded"), c.autoShow && this.show(), c.manageWaitIndicator && MAF.utility.WaitIndicator.down()));
            delete c.source;
            return this
        },
        aspectSizeMax: function (a) {
            var b, c = this.srcWidth / this.srcHeight;
            1 <= c ? (b = a, a /= c) : b = a * c;
            return this.setStyles({width: b, height: a})
        },
        aspectSizeMin: function (a) {
            var b, c = this.srcWidth / this.srcHeight;
            1 <= c ? b = a * c : (b = a, a /= c);
            return this.setStyles({width: b, height: a})
        },
        aspectSizeBestFit: function (a, b, c) {
            var d = 0;
            "height" === c ? (d = b / this.srcHeight,
                a > this.srcWidth * d ? this.setStyles({
                    width: this.srcWidth * d,
                    height: b
                }) : (d = a / (this.srcWidth * d), this.setStyles({
                    width: a,
                    height: b * d
                }))) : (d = a / this.srcWidth, b > this.srcHeight * d ? this.setStyles({
                width: a,
                height: this.srcHeight * d
            }) : (d = b / (this.srcHeight * d), this.setStyles({width: a * d, height: b})))
        },
        fitToParent: function () {
            var a = this.element && this.element.parentNode;
            return a ? this.aspectSizeMax(Math.min(a.width, a.height)) : null
        },
        fillParent: function () {
            var a = this.element && this.element.parentNode;
            return a ? this.aspectSizeMin(Math.max(a.width,
                a.height)) : null
        }
    })
});
define("MAF.element.Text", function () {
    return new MAF.Class({
        ClassName: "BaseText", Extends: MAF.element.Core, Protected: {
            dispatchEvents: function (a, b) {
                this.parent(a, b);
                switch (a.type) {
                    case "change":
                        this.fire("onChange", b, a);
                        break;
                    case "layoutchange":
                        this.fire("onLayoutChange", b, a)
                }
            }, registerEvents: function (a) {
                this.parent(["change", "layoutchange"].concat(a || []))
            }, proxyProperties: function (a) {
                this.parent("data text size scrolling truncation wrap font lineHeight totalLines maxVisibleLindex visibleLines firstLine anchorStyle color textWidth textHeight".split(" ").concat(a ||
                    []))
            }
        }, config: {element: Text}, initialize: function () {
            this.config.anchorStyle = this.config.styles && this.config.styles.anchorStyle || this.config.anchorStyle;
            this.config.styles && delete this.config.styles.anchorStyle;
            if ("wrap"in this.config || "truncation"in this.config)this.config.styles || (this.config.styles = {}), this.config.styles.wrap = "wrap"in this.config.styles ? this.config.styles.wrap : this.config.wrap, this.config.styles.truncation = "truncation"in this.config.styles ? this.config.styles.truncation : this.config.truncation,
                delete this.config.wrap, delete this.config.truncation;
            this.parent();
            this.config.anchorStyle && (this.anchorStyle = this.config.anchorStyle);
            this.config.visibleLines && (this.visibleLines = this.config.visibleLines);
            this.setText(this.config.data || this.config.text || this.config.label)
        }, setText: function (a) {
            this.element.data = a
        }
    })
});
define("MAF.element.TextField", function () {
    return new MAF.Class({
        ClassName: "BaseTextField", Extends: MAF.element.Text, Protected: {
            dispatchEvents: function (a, b) {
                this.parent(a, b);
                var c = a.type;
                switch (c) {
                    case "navigate":
                        this.fire("onNavigate", a.detail, a);
                        return;
                    case "keydown":
                        this.fire("onKeyDown", {
                            keyCode: a.keyCode,
                            key: a.key,
                            eventPhase: a.eventPhase,
                            type: a.type
                        }, a);
                        return;
                    case "cursor":
                        this.fire("onCursor", a.detail, a);
                        return
                }
                this.fire("on" + c.capitalize(), b, a)
            }, registerEvents: function (a) {
                this.parent(["focus",
                    "blur", "keydown", "navigate", "cursor"].concat(a || []))
            }, proxyProperties: function (a) {
                this.parent(["editable"].concat(a || []))
            }
        }, config: {editable: !1}, initialize: function () {
            this.parent();
            this.editable = this.config.editable
        }
    })
});
define("MAF.element.Button", function () {
    function a(a) {
        this.fire(Boolean(a) ? "onSelect" : "onSecureFailed", null, arguments.callee.caller.__event__ || null)
    }

    return new MAF.Class({
        ClassName: "BaseButton", Extends: MAF.element.Container, Protected: {
            dispatchEvents: function (b, c) {
                switch (b.type) {
                    case "select":
                        if (this.secure) {
                            var d = this.config, e = a.bindTo(this);
                            e.__event__ = b;
                            d.verifySecure && d.verifySecure.call ? d.verifySecure.call(this, e) : this.verifySecure(e);
                            return
                        }
                }
                this.parent(b, c)
            }
        }, config: {focus: !0, secure: !1}, initialize: function () {
            this.parent();
            this.setDisabled(!1 === this.config.enabled || !0 === this.config.disabled);
            delete this.config.enabled;
            delete this.config.disabled;
            this.setSecure(this.config.secure);
            delete this.config.secure
        }, generateStatePacket: function (a) {
            return Object.merge({focused: this.element.hasFocus, disabled: this.disabled, secure: this.secure}, a || {})
        }, inspectStatePacket: function (a, c) {
            if (!this.config.guid || a && !(this.config.guid in a))return a;
            var d = a && a[this.config.guid];
            "object" === typeOf(d) && (c ? d.focused && this.focus() : d && Object.forEach(d,
                function (c) {
                    switch (c) {
                        case "disabled":
                            d[c] && this.setDisabled(!0);
                            break;
                        case "secure":
                            d[c] && this.setSecure(!0);
                            break;
                        case "label":
                            this.setText && d[c] && this.setText(d[c])
                    }
                }, this));
            return d
        }, appendTo: function (a) {
            this.parent(a) && this.getSubscriberCount("onBroadcast") && (a = this.getView()) && a.registerMessageCenterListenerControl(this);
            return this
        }, setDisabled: function (a) {
            this.disabled = !0 === a;
            this.setStyle("opacity", this.disabled ? .5 : null);
            return this
        }, toggleDisabled: function () {
            this.setDisabled(!this.disabled);
            return this
        }, setSecure: function (a) {
            this.secure = a = !0 === a;
            this.fire("onChangeSecure", {secure: a});
            return this
        }, toggleSecure: function () {
            return this.setSecure(!this.secure)
        }, verifySecure: function (a) {
            a(!0)
        }
    })
});
define("MAF.element.GridCell", function () {
    return new MAF.Class({
        ClassName: "BaseGridCell", Extends: MAF.element.Container, Protected: {
            dispatchEvents: function (a) {
                if (this.grid) {
                    var b = this.getCellCoordinates();
                    switch (a.type) {
                        case "focus":
                            this.grid.getState().hasFocus ? this.grid.updateState({
                                focusIndex: this.getCellIndex(),
                                focusCoordinates: {row: b.row, column: b.column}
                            }) : this.grid.updateState({hasFocus: !0});
                            this.grid.fire("onFocus", b);
                            break;
                        case "blur":
                            if (!this.element.navigateTo || this.grid.cells && -1 === this.grid.cells.indexOf(this.element.navigateTo.owner))this.grid.updateState({hasFocus: !1}),
                                this.grid.fire("onBlur", b);
                            break;
                        case "select":
                            this.fire("onSelect", {
                                cellIndex: this.getCellIndex(),
                                dataIndex: this.getCellDataIndex(),
                                dataItem: this.getCellDataItem()
                            })
                    }
                    "select" !== a.type && this.parent(a)
                }
            }, proxyProperties: function (a) {
                a = "visible frozen hAlign vAlign rotate zOrder hOffset vOffset scrollLeft scrollTop".split(" ").concat(a || []);
                MAF.Class.Methods.proxyProperties(this, this.element, a);
                getter(this, "width", function () {
                    var a = this.element;
                    return this.getCellDimensions().width || a && a.width
                });
                getter(this,
                    "height", function () {
                        var a = this.element;
                        return this.getCellDimensions().height || a && a.height
                    });
                getter(this, "outerWidth", function () {
                    var a = this.element, c = a && a.width;
                    return void 0 !== c && c + (a.hOffset || 0)
                });
                getter(this, "outerHeight", function () {
                    var a = this.element, c = a && a.height;
                    return void 0 !== c && c + (a.vOffset || 0)
                });
                getter(this, "id", function () {
                    var a = this.element;
                    return a && a.getAttribute("id")
                });
                setter(this, "id", function (a) {
                    var c = this.element;
                    return c && c.setAttribute("id", a)
                });
                getter(this, "disabled", function () {
                    var a =
                        this.element;
                    return a && a.disabled
                });
                setter(this, "disabled", function (a) {
                    a = a || !1;
                    var c = this.element;
                    this.disabled !== a && (this.fire(a ? "onDisable" : "onEnable"), c && (c.disabled = a), this.fire("onChangeDisabled", {disabled: a}))
                })
            }
        }, config: {focus: !0, element: Item}, getCellDimensions: function () {
            return this.grid && this.grid.getCellDimensions() || {}
        }, getCellCoordinates: function () {
            return this.grid && this.grid.getCellCoordinates(this)
        }, getCellIndex: function () {
            return this.grid && this.grid.getCellIndex(this)
        }, getCellDataIndex: function () {
            return this.grid &&
                this.grid.getCellDataIndex(this)
        }, getCellDataItem: function () {
            return this.grid && this.grid.getCellDataItem(this)
        }, suicide: function () {
            delete this.grid;
            Object.forEach(this, function (a, b) {
                "owner" !== a && "instance" === typeOf(b) && b.suicide && b !== this && (delete this[a], b.suicide())
            }, this);
            this.parent()
        }
    })
});
define("MAF.element.Grid", function () {
    var a = function () {
        if (this.config.render) {
            var c = this.config.state || {}, a = {transition: "none"};
            c.focusCoordinates && (a.focus = c.focusCoordinates);
            this.changePage(c.currentPage || 0, a)
        }
        delete this.config.state
    }, b = function (c) {
        if (!c.defaultPrevented) {
            var a = c && c.Event && c.Event.target, b = a && a.owner, a = c && c.payload && c.payload.direction, f = this.config.carousel, g = !1, h = !1, k = this.getState(), l = k.currentPage || 0, p = Math.max(0, this.getPageCount() - 1), n = k.dataLength, q = "horizontal" === this.config.orientation,
                b = b && b.getCellCoordinates(), m = this.pager.getDataSize() || 0, n = Math.ceil(n / this.config.columns);
            switch (a) {
                case "left":
                    if (q && 0 === b.column && (l || f)) {
                        if (0 < p && f || l)g = !0;
                        b.column = b.columns - 1
                    }
                    break;
                case "right":
                    if (q && (l < p || f)) {
                        if (0 < p && f || l < p)g = !0;
                        b.column = 0
                    }
                    break;
                case "up":
                    if (!q && 0 === b.row)if (l || f) {
                        if (0 < p && f || l)g = !0;
                        0 === l && f ? (f = Math.ceil(m / this.config.columns) % this.config.rows, f = 0 === f ? this.config.rows - 1 : f - 1, b.row = f) : b.row = this.config.rows - 1
                    } else h = !0;
                    break;
                case "down":
                    if (!q && (m %= this.config.columns * this.config.rows,
                            m = 0 !== m ? m : this.config.columns, n < b.row + 2 && (b.row = this.config.rows - 1), b.row === this.config.rows - 1))if (l < p || f) {
                        if (0 < p && f || l < p)g = !0;
                        b.row = 0;
                        l === p - 1 && b.column + 1 > m && (b.column = m - 1)
                    } else h = !0
            }
            g && !k.animating ? (this.shift(a, {focus: b}), c.preventDefault(), c.stopPropagation()) : q && "right" === a ? Math.min(b.column + 1, b.columns - 1) !== b.column && (--b.row, b.column = Math.min(b.column + 1, b.columns - 1), c.preventDefault(), c.stopPropagation(), this.focusCell(b, c)) : q || "up" !== a && "down" !== a || h ? (this.setDisabled(!0), this.element.navigate(a) &&
            (c.preventDefault(), c.stopPropagation()), this.setDisabled(!1)) : (c.stop(), this.focusCell(b, c))
        }
    };
    return new MAF.Class({
        ClassName: "BaseGrid", Extends: MAF.element.Container, Protected: {
            registerEvents: function (c) {
                this.parent(["navigateoutofbounds"].concat(c || []))
            }, dispatchEvents: function (c) {
                this.parent(c);
                switch (c.type) {
                    case "navigateoutofbounds":
                        this.fire("onNavigateOutOfBounds", c.detail, c)
                }
            }, generateCells: function (c, a) {
                if (0 < c && c > this.cells.length) {
                    for (var b = createDocumentFragment(), f = {
                        width: 1 / this.config.columns *
                        100 + "%", height: 1 / this.config.rows * 100 + "%"
                    }, g = this.cells.length; g < c; g++) {
                        var h = this.config.cellCreator.call(this).setStyles(f);
                        h.grid = this;
                        b.appendChild(h.element);
                        h.fire("onAppend", {parent: this.element, owner: this});
                        this.cells.push(h)
                    }
                    this.body.element.appendChild(b)
                }
                return this.cells.length
            }, updateWaitIndicator: function (c) {
                if (this.config.manageWaitIndicator)MAF.utility.WaitIndicator["onPageChanged" === c.type ? "down" : "up"]()
            }, handleFocusEvent: function (c) {
                var a = c.payload;
                switch (c.type) {
                    case "onFocus":
                        c =
                            this.getCellIndex(a || {row: 0, column: 0});
                        this.updateState({
                            hasFocus: !0,
                            focusIndex: c,
                            focusCoordinates: {row: a.row, column: a.column}
                        });
                        break;
                    case "onBlur":
                        this.updateState({hasFocus: !1})
                }
            }, onDataPage: function (c) {
                var a = this.getState(), b = a.pageRequested, f = this.config.cellUpdater, g = c.payload;
                c = c.type;
                var h = g && g.index;
                if (g && c === this.pager.eventType && g.data && b && h === b.index) {
                    var k = g.data.items && g.data.items.length && [].concat(g.data.items) || [], l = k.length;
                    void 0 === a.focusIndex && this.updateState({focusIndex: -1});
                    this.body.freeze();
                    if (this.cells && 0 < this.cells.length && b && b.options && b.options.refresh)for (; this.cells.length;)this.cells.pop().suicide();
                    0 < this.generateCells(l) && this.cells.forEach(function (c, a) {
                        a < l ? (c.show(), f.call(this, c, k[a])) : c.hide()
                    }, this);
                    this.body.thaw();
                    this.updateState({startIndex: b.index, currentPage: b.index / this.getCellCount(), dataLength: l});
                    g = b.options.focus;
                    c = this.getCellIndex(g);
                    if (g && a.hasFocus) {
                        for (a = this.cells.length; c >= l && a;) {
                            switch (b.options.direction) {
                                case "right":
                                    g.column && g.row ?
                                        --g.row : g.row ? (--g.row, g.column = this.config.columns - 1) : --g.column;
                                    c = this.getCellIndex(g);
                                    break;
                                case "left":
                                    g.row = Math.max(0, g.row - 1);
                                    c = this.getCellIndex(g);
                                    break;
                                case "up":
                                    g.column = Math.max(0, g.column - 1);
                                    c = this.getCellIndex(g);
                                    break;
                                case "down":
                                    g.row && g.column ? --g.column : g.column ? (--g.row, g.column = this.config.row - 1) : --g.row;
                                    c = this.getCellIndex(g);
                                    break;
                                default:
                                    c--, c = this.getCellIndex(c)
                            }
                            a--
                        }
                        this.focusCell(c)
                    }
                    this.fire("onPageChanged", this.updateState({pageChanging: !1}))
                }
            }
        }, config: {
            rows: 1,
            columns: 1,
            orientation: "horizontal",
            carousel: !1,
            inverted: !1,
            render: !0,
            manageWaitIndicator: !0,
            animate: !1,
            animation: {duration: 400, transition: "slide", direction: "left", ease: 0}
        }, initialize: function () {
            this.config.orientation = "vertical" === this.config.orientation ? "vertical" : "horizontal";
            this.config.rows = this.config.rows || 1;
            this.config.columns = this.config.columns || 1;
            this.parent();
            this.cells = [];
            if (this.config.pager)this.pager = this.config.pager, delete this.config.pager; else {
                var c = this.config.dataset || this.config.dataSet ||
                    [], d = this.config.rows * this.config.columns;
                this.pager = new MAF.utility.Pager(d, this.config.payloadSize || d);
                this.pager.initItems(c, c.length)
            }
            this.body = (new MAF.element.Core({
                element: List,
                styles: {width: "inherit", height: "inherit", overflow: "inherit"}
            })).appendTo(this);
            this.element.innerNavigation = !0;
            this.generateCells(Math.min(this.pager.getDataSize(), this.pager.getPageSize()));
            this.onDataPage.subscribeTo(this.pager, this.pager.eventType, this);
            this.updateWaitIndicator.subscribeTo(this, ["onChangePage", "onPageChanged"],
                this);
            this.handleFocusEvent.subscribeTo(this, ["onFocus", "onBlur"], this);
            b.subscribeTo(this, "onNavigateOutOfBounds", this);
            a.subscribeOnce(this, "onAppend", this);
            this.store("state", {});
            delete this.config.dataset;
            delete this.config.dataSet
        }, setFilter: function (c) {
            this.pager && (this.pager.setFilter(c), this.changePage(0))
        }, appendTo: function (c) {
            this.parent(c) && this.getSubscriberCount("onBroadcast") && (c = this.getView()) && c.registerMessageCenterListenerControl(this);
            return this
        }, changeDataset: function (c, a, b) {
            c =
                c && c.length ? c : [];
            b = b && b > c.length ? b : c.length;
            this.pager.initItems(c, b);
            a && this.updateState({row: null, column: null});
            c = this.getState();
            this.changePage(a ? 0 : c.currentPage || 0, {
                transition: "none",
                refresh: a || !1,
                focus: c.hasFocus && c.focusCoordinates
            });
            this.fire("onDatasetChanged");
            return this
        }, getDataItem: function (c) {
            return this.pager.getItem(c)
        }, getState: function () {
            return this.retrieve("state")
        }, updateState: function (c) {
            c = Object.merge(this.getState(), c || {});
            this.store("state", c);
            this.fire("onStateUpdated", c);
            return c
        }, releaseFocus: function (c, a) {
            return !0
        }, shift: function (c, a) {
            var b = !1, f = this.getState().currentPage || 0, g = Math.max(0, this.pager.getNumPages() - 1), h = this.config.carousel;
            a = a || {};
            switch (c) {
                case "first":
                    b = 0;
                    a.direction = h && f > g / 2 ? "right" : "left";
                    break;
                case "last":
                    b = g;
                    a.direction = h && f > g / 2 ? "right" : "left";
                    break;
                case "up":
                    b = h ? f - 1 : Math.max(f - 1, 0);
                    a.direction = "up";
                    break;
                case "down":
                    b = h ? f + 1 : Math.min(f + 1, g);
                    a.direction = "down";
                    break;
                case "left":
                    b = h ? f - 1 : Math.max(f - 1, 0);
                    a.direction = "right";
                    break;
                case "right":
                    b =
                        h ? f + 1 : Math.min(f + 1, g), a.direction = "left"
            }
            !1 !== b && this.changePage(b, a)
        }, changePage: function (c, a) {
            var b = this.getCellCount(), f = this.getState(), b = this.normalizeIndex((c || 0) * b);
            if (c !== f.currentPage || a && a.refresh)f = this.updateState({
                pageRequested: {index: b, options: a || {}},
                pageChanging: !0
            }), this.getPageCount() && this.fire("onChangePage", f);
            this.pager.getPage(b)
        }, normalizeIndex: function (c) {
            var a = this.pager.getPageSize(), b = this.pager.getDataSize(), f = Math.ceil(b / a), g = f * a, h = this.config.carousel;
            c = isNaN(c) ? 0 : c;
            return a >= b ? 0 : c >= b ? h ? Math.floor(c % g / a) * a : f * a : 0 > c ? h ? Math.floor((c % g + g) % g / a) * a : 0 : Math.floor(c / a) * a
        }, getCellCount: function () {
            return this.config.rows * this.config.columns
        }, getVisibleCellCount: function () {
            return this.cells && this.cells.filter(function (c) {
                    return c && c.visible
                }).length || this.cells.length
        }, getPageCount: function () {
            return this.pager.getNumPages()
        }, getCurrentPage: function () {
            return this.getState().currentPage || 0
        }, getStartIndex: function () {
            return this.getState().startIndex
        }, getFocusIndex: function () {
            var c =
                document.activeElement, a = this.getState(), b = -1;
            c && this.cells && (b = this.cells.indexOf(c.owner));
            -1 === b && void 0 !== a.focusIndex && (b = a.focusIndex);
            return b
        }, getFocusCoordinates: function () {
            return this.getState().focusCoordinates
        }, focus: function () {
            this.getVisibleCellCount() && (this.updateState({hasFocus: !0}), this.focusCell(this.getFocusCoordinates() || {
                    row: 0,
                    column: 0
                }))
        }, focusCell: function (c) {
            var a = this.getState(), b = a.focusIndex;
            c = this.getCellIndex(c || {row: 0, column: 0});
            var f = this.getVisibleCellCount();
            if (f &&
                -1 !== c && a.hasFocus)return c = Math.min(f - 1, c), -1 < b && this.blurCell(b), -1 < c && this.cells && this.cells[c] && this.cells[c].element.focus(), b = this.getCellCoordinates(c), this.updateState({
                focusIndex: c,
                focusCoordinates: {row: b.row, column: b.column}
            }), this
        }, blurCell: function (c) {
            c = -1 < parseInt(c, 10) ? c : this.getState().focusCoordinates;
            c = this.getCellIndex(c);
            -1 < c && this.cells[c] && this.cells[c].element.blur();
            return this
        }, getCellDimensions: function () {
            return {
                width: Math.floor(this.width / this.config.columns), height: Math.floor(this.height /
                    this.config.rows)
            }
        }, getCellCoordinates: function (c) {
            var a = this.cells.indexOf(c);
            try {
                -1 == a && (a = parseInt(c, 10))
            } catch (b) {
            }
            return -1 == a ? !1 : {
                row: Math.floor(a / this.config.columns),
                column: a % this.config.columns,
                rows: this.config.rows,
                columns: this.config.columns
            }
        }, getCellIndex: function (a, b) {
            var e = this.cells.indexOf(a), f = this.config.columns;
            if (-1 < parseInt(e, 10))return e;
            "object" === typeOf(a) ? "row"in a && "column"in a && (e = (a.row || 0) * f + (a.column || 0)) : -1 < parseInt(b, 10) ? e = a * f + b : -1 < parseInt(a, 10) && (e = a);
            return -1 < e ? e :
                -1
        }, getCellDataIndex: function (a) {
            var b = this.getState(), b = b.pageRequested && b.pageRequested.index;
            a = this.getCellIndex(a);
            return -1 < parseInt(b, 10) && -1 < a ? b + a : !1
        }, getCellDataItem: function (a) {
            a = this.getCellDataIndex(a);
            return -1 < parseInt(a, 10) && this.pager.getItem(a)
        }, attachAccessory: function (a) {
            a && a.attachToSource && a.attachToSource(this);
            return this
        }, attachAccessories: function () {
            Array.slice(arguments).forEach(this.attachAccessory, this);
            return this
        }, inspectStatePacket: function (a, b) {
            if (!this.config.guid || a && !(this.config.guid in a))return a;
            var e = a && a[this.config.guid], f = this.getState() || {};
            if (null === e || void 0 === e)return a;
            b ? e.focused && (this.getVisibleCellCount() ? (this.updateState({hasFocus: !0}), this.focusCell(e.state.focusCoordinates || {
                    row: 0,
                    column: 0
                })) : (f = this.getView()) && f.resetFocus()) : "object" === typeof e && e.state && f.currentPage !== e.state.currentPage && this.changePage(e.state.currentPage || 0, {
                transition: "none",
                focus: !1
            });
            return e
        }, setDisabled: function (a) {
            this.element && (this.element.allowNavigation = !a);
            return this
        }, generateStatePacket: function (a) {
            var b = this.getState();
            return Object.merge({state: b, focused: b.hasFocus}, a || {})
        }, suicide: function () {
            if (this.cells) {
                for (; this.cells.length;)this.cells.pop().suicide();
                delete this.cells
            }
            this.body && (this.body.suicide(), delete this.body);
            this.pager && (this.pager.suicide(), delete this.pager);
            this.parent()
        }
    })
});
define("MAF.element.TextGrid", function () {
    return new MAF.Class({
        ClassName: "BaseTextGrid", Extends: MAF.element.Text, Protected: {
            dispatchEvents: function (a, b) {
                "layoutchange" === a.type && this.fire("onStateUpdated", {
                    currentPage: this.getCurrentPage(),
                    pageCount: this.getPageCount()
                }, a);
                this.parent(a, b)
            }
        }, initialize: function () {
            this.parent();
            this.element.allowChangeEvents = !0;
            this.element.textPaging = !0
        }, getCurrentPage: function () {
            return Math.ceil(this.getPageCount() * this.firstLine / this.totalLines)
        }, getPageCount: function () {
            return Math.floor(this.totalLines /
                this.visibleLines)
        }, getStartLine: function (a) {
            return a * this.visibleLines
        }, shift: function (a) {
            var b = this.getCurrentPage(), c = this.getPageCount(), d;
            switch (a) {
                case "left":
                    d = Math.max(b - 1, 0);
                    break;
                case "right":
                    d = Math.min(b + 1, c - 1)
            }
            this.firstLine = this.getStartLine(d);
            return this
        }, attachAccessory: function (a) {
            a && a.attachToSource && a.attachToSource(this);
            return this
        }, attachAccessories: function () {
            Array.slice(arguments).forEach(this.attachAccessory, this);
            return this
        }, setText: function (a) {
            this.firstLine = 0;
            this.parent(a)
        }
    })
});
define("MAF.element.Carousel", function () {
    var a = function (a) {
        var c = this.config.orientation, d = this.config.carousel, e = this.cells.length, f = a && a.payload && a.payload.direction;
        f && (d && 0 < e && ("horizontal" === c && "right" === f || "vertical" === c && "down" === f) ? this.cells[0].focus() : d && 0 < e && ("horizontal" === c && "left" === f || "vertical" === c && "up" === f) ? this.cells[e - 1].focus() : (this.setDisabled(!0), this.element.navigate(f), this.setDisabled(!1)), a.stopPropagation(), a.preventDefault())
    };
    return new MAF.Class({
        ClassName: "BaseCarousel",
        Extends: MAF.element.Container, Protected: {
            registerEvents: function (a) {
                this.parent(["navigateoutofbounds"].concat(a || []))
            }, dispatchEvents: function (a) {
                this.parent(a);
                switch (a.type) {
                    case "navigateoutofbounds":
                        this.fire("onNavigateOutOfBounds", a.detail, a)
                }
            }, generateCells: function (a, c) {
                for (; this.cells.length;)this.cells.pop().suicide();
                var d = this.config.cellUpdater;
                if (0 < a && a > this.cells.length) {
                    var e = createDocumentFragment(), f = {
                        width: 1 / this.config.columns * 100,
                        height: 1 / this.config.rows * 100
                    };
                    "horizontal" ===
                    this.config.orientation && (f.width /= this.getPageCount());
                    f.width += "%";
                    f.height += "%";
                    for (var g = this.cells.length; g < a; g++) {
                        var h = this.config.cellCreator.call(this).setStyles(f);
                        h.carousel = this;
                        e.appendChild(h.element);
                        h.fire("onAppend", {parent: this.element, owner: this});
                        this.cells.push(h);
                        d.call(this, h, c[g])
                    }
                    this.body.element.appendChild(e)
                }
                return this.cells.length
            }, handleFocusEvent: function (a) {
                var c = a.payload;
                switch (a.type) {
                    case "onFocus":
                        a = this.getCellIndex(c || {row: 0, column: 0});
                        this.updateState({
                            hasFocus: !0,
                            focusIndex: a, focusCoordinates: {row: c.row, column: c.column}
                        });
                        break;
                    case "onBlur":
                        this.updateState({hasFocus: !1})
                }
            }
        }, config: {rows: 1, columns: 1, orientation: "horizontal", carousel: !0}, initialize: function () {
            this.config.orientation = "vertical" === this.config.orientation ? "vertical" : "horizontal";
            this.config.rows = this.config.rows || 1;
            this.config.columns = this.config.columns || 1;
            this.parent();
            this.cells = [];
            getter(this, "hasFocus", function () {
                var a = document.activeElement;
                return a && this.cells && -1 < this.cells.indexOf(a) || !1
            });
            this.body = (new MAF.element.Core({
                element: List,
                styles: {width: "inherit", height: "inherit", overflow: "inherit"}
            })).appendTo(this);
            this.element.innerNavigation = !0;
            this.handleFocusEvent.subscribeTo(this, ["onFocus", "onBlur"], this);
            a.subscribeTo(this, "onNavigateOutOfBounds", this);
            this.store("state", {});
            var b = this.config.dataset || this.config.dataSet;
            b && 0 < b.length && (this.changeDataset(this.config.dataset || this.config.dataSet), delete this.config.dataset, delete this.config.dataSet)
        }, focus: function () {
            0 < this.cells.length && !this.hasFocus && this.cells[0].focus()
        }, getCellCount: function () {
            return this.config.rows * this.config.columns
        }, getVisibleCellCount: function () {
            return this.cells && this.cells.filter(function (a) {
                    return a && a.visible
                }).length || this.cells.length
        }, setDisabled: function (a) {
            this.element.allowNavigation = !a;
            return this
        }, getCurrentPage: function () {
        }, getPageCount: function () {
            var a = this.retrieve("data", a) || [];
            return Math.ceil(a.length / this.getCellCount())
        }, getStartIndex: function () {
        }, getFocusIndex: function () {
        }, setFilter: function () {
        },
        getCellCoordinates: function (a, c) {
            this.cells.indexOf(a);
            return 0
        }, getCellDimensions: function () {
            return {
                width: Math.floor(this.width / this.config.columns),
                height: Math.floor(this.height / this.config.rows)
            }
        }, getCellIndex: function (a) {
            return this.cells.indexOf(a)
        }, getCellDataIndex: function (a) {
            return this.getCellIndex(a)
        }, getCellDataItem: function (a) {
            var c = this.retrieve("data"), d = c.length;
            a = this.getCellDataIndex(a);
            return -1 < a && a < d ? c[a] : null
        }, getState: function () {
            return this.retrieve("state")
        }, updateState: function (a) {
            a =
                Object.merge(this.getState(), a || {});
            this.store("state", a);
            this.fire("onStateUpdated", a);
            return a
        }, changeDataset: function (a) {
            a = a || [];
            this.store("data", a);
            this.generateCells(a.length, a);
            "horizontal" === this.config.orientation && this.body.setStyle("width", this.width * this.getPageCount());
            this.fire("onDatasetChanged");
            return this
        }, suicide: function () {
            if (this.cells) {
                for (; this.cells.length;)this.cells.pop().suicide();
                delete this.cells
            }
            this.body && (this.body.suicide(), delete this.body);
            this.parent()
        }
    })
});
define("MAF.element.CarouselCell", function () {
    return new MAF.Class({
        ClassName: "BaseCarouselCell", Extends: MAF.element.Container, Protected: {
            dispatchEvents: function (a) {
                if (this.carousel) {
                    this.getCellCoordinates();
                    switch (a.type) {
                        case "focus":
                            this.carousel.getState().hasFocus ? this.carousel.updateState({focusIndex: this.getCellIndex()}) : this.carousel.fire("onFocus", this);
                            break;
                        case "blur":
                            this.carousel && (!this.element.navigateTo || this.carousel.cells && -1 === this.carousel.cells.indexOf(this.element.navigateTo.owner)) &&
                            this.carousel.fire("onBlur", this);
                            break;
                        case "select":
                            this.fire("onSelect", {
                                cellIndex: this.getCellIndex(),
                                dataIndex: this.getCellDataIndex(),
                                dataItem: this.getCellDataItem()
                            })
                    }
                    "select" !== a.type && this.parent(a)
                }
            }, proxyProperties: MAF.element.GridCell.prototype.proxyProperties
        }, config: {focus: !0, element: Item}, getCellDimensions: function () {
            return this.carousel && this.carousel.getCellDimensions() || {}
        }, getCellCoordinates: function () {
            return this.carousel && this.carousel.getCellCoordinates(this)
        }, getCellIndex: function () {
            return this.carousel &&
                this.carousel.getCellIndex(this)
        }, getCellDataIndex: function () {
            return this.carousel && this.carousel.getCellDataIndex(this)
        }, getCellDataItem: function () {
            return this.carousel && this.carousel.getCellDataItem(this)
        }, suicide: function () {
            delete this.carousel;
            Object.forEach(this, function (a, b) {
                "owner" !== a && "instance" === typeOf(b) && b.suicide && b !== this && (delete this[a], b.suicide())
            }, this);
            this.parent()
        }
    })
});
define("MAF.element.SlideCarousel", function () {
    function a(a, d, e) {
        a && a.forEach(function (d, g) {
            var h = e.currentDataset.length;
            d && (b(e.currentDataset[g]) || e.currentDataset.length === g ? d.visible = !1 : d.visible = !0, d.animate({
                hOffset: "horizontal" === e.config.orientation ? e.offsets[g] : 0,
                vOffset: "vertical" === e.config.orientation ? e.offsets[g] : 0,
                duration: e.config.slideDuration,
                timingFunction: e.config.slideEase,
                events: {
                    onAnimationEnded: function (b) {
                        b.reset();
                        g === h - 1 && (e.animating = !1, e.fire("onSlideDone"));
                        d.element.allowNavigation = !1;
                        d.thaw();
                        if (g === e.config.focusIndex) {
                            d.element.allowNavigation = e.config.blockFocus ? !1 : !0;
                            if (b = !e.config.blockFocus)a:{
                                for (b = 0; b < a.length; b++)if (a[b].element.hasFocus) {
                                    b = !0;
                                    break a
                                }
                                b = !1
                            }
                            b && d.focus()
                        }
                    }
                }
            }))
        }, this)
    }

    function b(a) {
        for (var b in a)if (a.hasOwnProperty(b))return !1;
        return !0
    }

    return new MAF.Class({
        ClassName: "SlideCarousel",
        Extends: MAF.element.Container,
        Protected: {
            dispatchEvents: function (a, b) {
                this.parent(a, b);
                if ("navigate" === a.type && !a.defaultPrevented) {
                    var e = a.detail.direction;
                    this.config.blockFocus &&
                    a.preventDefault();
                    if ("horizontal" === this.config.orientation && ("left" === e || "right" === e) || "vertical" === this.config.orientation && ("up" === e || "down" === e)) {
                        a.preventDefault();
                        var f = "left" === e || "up" === e, g = "right" === e || "down" === e, h = this.config.focusIndex - 1 <= this.config.dynamicFocusStart, k = this.config.focusIndex + 1 >= this.cells.length - this.config.dynamicFocusEnd - (this.cells.length - 2 < this.config.visibleCells ? 0 : 1);
                        this.config.dynamicFocus && (f && !h || g && !k) ? (g ? this.config.focusIndex++ : f && this.config.focusIndex--,
                            this.cells[this.config.focusIndex].focus()) : this.shift(e)
                    } else this.fire("onNavigateOutOfBounds", a.detail)
                }
            }, handleFocusEvent: function (a) {
                switch (a.type) {
                    case "onFocus":
                        (a = this.getCurrentCell()) && a.focus()
                }
            }, setCellConfiguration: function (a, d) {
                var e;
                e = {
                    width: "horizontal" === this.config.orientation ? 1 / this.config.visibleCells * 100 + "%" : "100%",
                    height: "vertical" === this.config.orientation ? 1 / this.config.visibleCells * 100 + "%" : "100%",
                    hOffset: "horizontal" === this.config.orientation ? -1 * d.width + a * d.width : 0,
                    vOffset: "vertical" ===
                    this.config.orientation ? -1 * d.height + a * d.height : 0,
                    transform: "translateZ(0)",
                    visible: b(this.currentDataset[a]) && 1 !== this.currentDataset.length ? !1 : !0
                };
                e = this.config.cellCreator.call(this).setStyles(e);
                e.grid = this;
                e.appendTo(this);
                e.element.allowNavigation = this.config.blockFocus ? !1 : a === this.config.focusIndex ? !0 : !1;
                this.cells.push(e)
            }, generateCells: function (a) {
                if (0 < this.currentDataset.length)if (a = this.getCellDimensions(), this.offsets = [], 1 === this.currentDataset.length)this.setCellConfiguration(this.config.focusIndex,
                    a); else for (var b = 0, b = 0; b < this.currentDataset.length; b++)this.offsets.push("horizontal" === this.config.orientation ? -1 * a.width + b * a.width : -1 * a.height + b * a.height), this.setCellConfiguration(b, a);
                return this.cells.length
            }, collectedPage: function (c) {
                var b = this.retrieve("slider"), e;
                switch (b.status) {
                    case "reset":
                    case "empty":
                        this.store("slider", {status: "building"});
                        this.updateCells();
                        break;
                    case "focusCell":
                        c = b.page;
                        this.store("slider", {status: "building"});
                        this.updateCells(c);
                        break;
                    case "navigating":
                        switch (b.direction) {
                            case "up":
                            case "left":
                                e =
                                    this.cells.pop();
                                e.freeze();
                                this.cells.unshift(e);
                                this.currentDataset.unshift(this.currentDataset.pop());
                                this.currentDataset[0] = c.payload.data.items[0];
                                this.config.cellUpdater.call(this, this.cells[0], this.currentDataset[0]);
                                break;
                            case "down":
                            case "right":
                                e = this.cells.shift(), e.freeze(), this.cells.push(e), this.currentDataset.shift(), this.currentDataset.push(c.payload.data.items[0]), this.config.cellUpdater.call(this, this.cells[this.cells.length - 1], this.currentDataset[this.currentDataset.length - 1])
                        }
                        this.store("slider",
                            {status: "idle"});
                        this.fire("onStateUpdated");
                        a(this.cells, b.direction, this)
                }
            }, updateCells: function (a) {
                var d = this.config.cellUpdater, e = this.pager.getDataSize();
                this.animating = !1;
                this.currentDataset = [];
                this.collection = [];
                this.page = a || 0;
                if (0 < e)if (1 === e)this.currentDataset.push(this.pager.getPage(0).items[0]); else {
                    a = this.config.visibleCells + 2;
                    e + 1 + this.config.focusIndex < a && (a = e + this.config.focusIndex);
                    for (var f = 0; f < a; f++) {
                        var g = this.config.focusIndex - f, h = Math.abs(g), k = null;
                        (h > e - 1 || 0 < g) && this.customPager ?
                            (g = 0 < this.page ? this.page - g : null, k = null === g || 0 > g ? null : g) : h > e - 1 && !this.customPager ? k = 0 : 0 < g ? (k = 0 !== this.page ? this.page - h : e - h, 0 > k && (k = e - Math.abs(k))) : 0 > g ? (k = this.page + h, k >= e && (k -= e)) : k = this.page === e ? 0 : this.page;
                        null === k ? this.currentDataset.push({}) : this.currentDataset.push(this.pager.getPage(k).items[0]);
                        this.collection.push(k)
                    }
                }
                if (this.config.carousel && this.cells.length && this.cells.length === this.currentDataset.length)this.cells.forEach(function (a, c) {
                    b(this.currentDataset[c]) ? a.freeze() : d.call(this, a,
                        this.currentDataset[c])
                }, this); else {
                    for (this.freeze(); this.cells.length;)this.cells.pop().suicide();
                    0 < this.generateCells() && this.cells.forEach(function (a, c) {
                        b(this.currentDataset[c]) ? a.freeze() : d.call(this, a, this.currentDataset[c])
                    }, this);
                    this.thaw()
                }
                this.fire("onStateUpdated")
            }
        },
        config: {
            visibleCells: 1,
            focusIndex: 1,
            slideEase: "ease",
            carousel: !0,
            orientation: "horizontal",
            blockFocus: !1,
            render: !0,
            focus: !0,
            dynamicFocus: !1,
            dynamicFocusStart: 0,
            dynamicFocusEnd: 0
        },
        initialize: function () {
            this.config.visibleCells =
                this.config.visibleCells || 1;
            this.config.focusIndex = this.config.focusIndex || 1;
            this.config.orientation = this.config.orientation || "horizontal";
            this.config.slideEase = this.config.slideEase || "ease";
            this.config.blockFocus = this.config.blockFocus || !1;
            this.config.slideDuration = this.config.slideDuration || .1;
            this.customPager = this.config.carousel && !0 === this.config.carousel ? !1 : !0;
            this.parent();
            this.cells = [];
            this.config.pager ? (this.customPager = !0, this.pager = this.config.pager, delete this.config.pager) : this.pager =
                new MAF.utility.Pager(1, this.config.visibleCells);
            this.config.carousel || (this.customPager = !0);
            this.currentDataset = [];
            this.offsets = [];
            this.animating = !1;
            this.store("slider", {status: "empty"});
            this.collectedPage.subscribeTo(this.pager, "pageDone", this);
            this.handleFocusEvent.subscribeTo(this, ["onFocus", "onBlur"], this);
            this.setStyle("transform", "translateZ(0)")
        },
        setVisibleCells: function (a) {
            this.config.visibleCells = a
        },
        getVisibleCells: function () {
            return this.config.visibleCells
        },
        setFocusIndex: function (a) {
            this.config.focusIndex =
                a
        },
        getFocusIndex: function () {
            return 1 < this.cells.length ? this.config.focusIndex : 0
        },
        changeDataset: function (a, b, e) {
            a = a && a.length ? a : [];
            e = e && e > a.length ? e : a.length;
            this.pager.initItems(a, e);
            this.store("slider", {status: "reset"});
            this.collectPage(0);
            this.fire("onDatasetChanged")
        },
        collectPage: function (a) {
            this.pager.getPage(a)
        },
        getCellDataItem: function (a) {
            for (var b = 0; b < this.cells.length; b++)if (a === this.cells[b])return this.currentDataset[b]
        },
        getCurrentPage: function () {
            return this.collection && this.collection[this.config.focusIndex] ?
                this.collection[this.config.focusIndex] : 0
        },
        getPageCount: function () {
            return this.pager.getNumPages()
        },
        focusCell: function (a) {
            a >= this.getPageCount() || (this.store("slider", {status: "focusCell", page: a}), this.pager.getPage(a))
        },
        attachAccessory: function (a) {
            a && a.attachToSource && a.attachToSource(this);
            return this
        },
        attachAccessories: function () {
            Array.slice(arguments).forEach(this.attachAccessory, this);
            return this
        },
        shift: function (c) {
            if (("vertical" !== this.config.orientation || "right" !== c && "left" !== c) && ("horizontal" !==
                this.config.orientation || "up" !== c && "down" !== c) && c && !this.animating && "navigating" !== this.retrieve("slider").status && (this.animating = !0, 1 !== this.cells.length && 1 < this.cells.length)) {
                var d = this.pager.getNumPages();
                switch (c) {
                    case "up":
                    case "left":
                        if (b(this.currentDataset[this.config.focusIndex - 1])) {
                            this.fire("onNavigateOutOfBounds", {direction: c});
                            this.animating = !1;
                            break
                        }
                        this.collection.unshift(this.collection.pop());
                        this.collection[0] = 0 > this.collection[1] - 1 && !this.customPager ? d - 1 : 0 > this.collection[1] -
                        1 ? null : this.collection[1] - 1;
                        null === this.collection[0] ? (d = this.cells.pop(), d.freeze(), this.cells.unshift(d), this.currentDataset.unshift(this.currentDataset.pop()), this.currentDataset[0] = {}, a(this.cells, c, this)) : (this.store("slider", {
                            status: "navigating",
                            direction: c
                        }), this.pager.getPage(this.collection[0]));
                        break;
                    case "down":
                    case "right":
                        if (b(this.currentDataset[this.config.focusIndex + 1])) {
                            this.fire("onNavigateOutOfBounds", {direction: c});
                            this.animating = !1;
                            break
                        }
                        this.collection.push(this.collection.shift());
                        this.collection[this.collection.length - 1] = null === this.collection[this.collection.length - 2] ? null : this.collection[this.collection.length - 2] + 1 >= d ? this.collection[this.collection.length - 2] + 1 >= d && !this.customPager ? 0 : null : this.collection[this.collection.length - 2] + 1;
                        null === this.collection[this.collection.length - 1] ? (d = this.cells.shift(), d.freeze(), this.cells.push(d), this.currentDataset.shift(), this.currentDataset.push({}), a(this.cells, c, this)) : (this.store("slider", {
                            status: "navigating",
                            direction: c
                        }), this.pager.getPage(this.collection[this.collection.length -
                        1]))
                }
            }
        },
        getCellDimensions: function () {
            return {
                width: "horizontal" === this.config.orientation ? Math.floor(this.width / this.config.visibleCells) : this.width,
                height: "vertical" === this.config.orientation ? Math.floor(this.height / this.config.visibleCells) : this.height
            }
        },
        getCellDataIndex: function (a) {
            return a === this.getCurrentCell() ? this.getCurrentPage() : this.collection[this.cells.indexOf(a)]
        },
        getCurrentCell: function () {
            return this.cells[1 === this.cells.length ? 0 : this.config.focusIndex]
        },
        suicide: function () {
            this.pager &&
            this.pager.suicide();
            delete this.currentDataset;
            delete this.offsets;
            delete this.pager;
            delete this.collection;
            if (this.cells) {
                for (; this.cells.length;)this.cells.pop().suicide();
                delete this.cells
            }
            this.body && (this.body.suicide(), delete this.body);
            this.parent()
        }
    })
});
define("MAF.element.SlideCarouselCell", function () {
    return new MAF.Class({
        ClassName: "SlideCarouselCell", Extends: MAF.element.Container, Protected: {
            proxyProperties: function (a) {
                a = "visible frozen hAlign vAlign rotate zOrder scrollLeft scrollTop".split(" ").concat(a || []);
                MAF.Class.Methods.proxyProperties(this, this.element, a);
                getter(this, "width", function () {
                    var a = this.element;
                    return this.getCellDimensions().width || a && a.width
                });
                getter(this, "height", function () {
                    var a = this.element;
                    return this.getCellDimensions().height ||
                        a && a.height
                });
                getter(this, "outerWidth", function () {
                    var a = this.element, c = a && a.width;
                    return void 0 !== c && c + (a.hOffset || 0)
                });
                getter(this, "outerHeight", function () {
                    var a = this.element, c = a && a.height;
                    return void 0 !== c && c + (a.vOffset || 0)
                });
                getter(this, "id", function () {
                    var a = this.element;
                    return a && a.getAttribute("id")
                });
                setter(this, "id", function (a) {
                    var c = this.element;
                    return c && c.setAttribute("id", a)
                });
                getter(this, "disabled", function () {
                    var a = this.element;
                    return a && a.disabled
                });
                setter(this, "disabled", function (a) {
                    a =
                        a || !1;
                    var c = this.element;
                    this.disabled !== a && (this.fire(a ? "onDisable" : "onEnable"), c && (c.disabled = a), this.fire("onChangeDisabled", {disabled: a}))
                })
            }
        }, config: {focus: !0, animation: !0}, getCellDimensions: function () {
            return this.grid && this.grid.getCellDimensions() || {}
        }, getCellDataItem: function () {
            return this.grid && this.grid.getCellDataItem(this)
        }, getCellDataIndex: function () {
            return this.grid && this.grid.getCellDataIndex(this)
        }, suicide: function () {
            delete this.grid;
            Object.forEach(this, function (a, b) {
                "owner" !== a &&
                "instance" === typeOf(b) && b.suicide && b !== this && (delete this[a], b.suicide())
            }, this);
            this.parent()
        }
    })
});
define("MAF.keyboard.ReuseKeyboard", function (a) {
    var b = (getSetting("hacks") || {}).hasdelete || !1, c = {
            Tables: {
                CharacterDefinitions: {
                    "char-a": {label: "a", value: "a", unicode: "a"},
                    "char-A": {label: "A", value: "A", unicode: "A"},
                    "char-agrave": {label: "\u00e0", value: "\u00e0", unicode: "\u00e0"},
                    "char-aacute": {label: "\u00e1", value: "\u00e1", unicode: "\u00e1"},
                    "char-acirc": {label: "\u00e2", value: "\u00e2", unicode: "\u00e2"},
                    "char-auml": {label: "\u00e4", value: "\u00e4", unicode: "\u00e4"},
                    "char-aring": {
                        label: "\u00e5", value: "\u00e5",
                        unicode: "\u00e5"
                    },
                    "char-atilde": {label: "\u00e3", value: "\u00e3", unicode: "\u00e3"},
                    "char-aogon": {label: "\u0105", value: "\u0105", unicode: "\u0105"},
                    "char-Agrave": {label: "\u00c0", value: "\u00c0", unicode: "\u00c0"},
                    "char-Aacute": {label: "\u00c1", value: "\u00c1", unicode: "\u00c1"},
                    "char-Acirc": {label: "\u00c2", value: "\u00c2", unicode: "\u00c2"},
                    "char-Auml": {label: "\u00c4", value: "\u00c4", unicode: "\u00c4"},
                    "char-Aring": {label: "\u00c5", value: "\u00c5", unicode: "\u00c5"},
                    "char-Atilde": {label: "\u00c3", value: "\u00c3", unicode: "\u00c3"},
                    "char-aelig": {label: "\u00e6", value: "\u00e6", unicode: "\u00e6"},
                    "char-AElig": {label: "\u00c6", value: "\u00c6", unicode: "\u00c6"},
                    "char-Aogon": {label: "\u0104", value: "\u0104", unicode: "\u0104"},
                    "char-b": {label: "b", value: "b", unicode: "b"},
                    "char-B": {label: "B", value: "B", unicode: "B"},
                    "char-c": {label: "c", value: "c", unicode: "c"},
                    "char-C": {label: "C", value: "C", unicode: "C"},
                    "char-ccedil": {label: "\u00e7", value: "\u00e7", unicode: "\u00e7"},
                    "char-cacute": {label: "\u0107", value: "\u0107", unicode: "\u0107"},
                    "char-ccaron": {
                        label: "\u010d",
                        value: "\u010d", unicode: "\u010d"
                    },
                    "char-Ccedil": {label: "\u00c7", value: "\u00c7", unicode: "\u00c7"},
                    "char-Cacute": {label: "\u0106", value: "\u0106", unicode: "\u0106"},
                    "char-Ccaron": {label: "\u010c", value: "\u010c", unicode: "\u010c"},
                    "char-d": {label: "d", value: "d", unicode: "d"},
                    "char-D": {label: "D", value: "D", unicode: "D"},
                    "char-e": {label: "e", value: "e", unicode: "e"},
                    "char-E": {label: "E", value: "E", unicode: "E"},
                    "char-egrave": {label: "\u00e8", value: "\u00e8", unicode: "\u00e8"},
                    "char-eacute": {
                        label: "\u00e9", value: "\u00e9",
                        unicode: "\u00e9"
                    },
                    "char-ecirc": {label: "\u00ea", value: "\u00ea", unicode: "\u00ea"},
                    "char-ecaron": {label: "\u011b", value: "\u011b", unicode: "\u011b"},
                    "char-euml": {label: "\u00eb", value: "\u00eb", unicode: "\u00eb"},
                    "char-eogon": {label: "\u0119", value: "\u0119", unicode: "\u0119"},
                    "char-Egrave": {label: "\u00c8", value: "\u00c8", unicode: "\u00c8"},
                    "char-Eacute": {label: "\u00c9", value: "\u00c9", unicode: "\u00c9"},
                    "char-Ecirc": {label: "\u00ca", value: "\u00ca", unicode: "\u00ca"},
                    "char-Ecaron": {label: "\u011a", value: "\u011a", unicode: "\u011a"},
                    "char-Euml": {label: "\u00cb", value: "\u00cb", unicode: "\u00cb"},
                    "char-Eogon": {label: "\u0118", value: "\u0118", unicode: "\u0118"},
                    "char-f": {label: "f", value: "f", unicode: "f"},
                    "char-F": {label: "F", value: "F", unicode: "F"},
                    "char-g": {label: "g", value: "g", unicode: "g"},
                    "char-G": {label: "G", value: "G", unicode: "G"},
                    "char-h": {label: "h", value: "h", unicode: "h"},
                    "char-H": {label: "H", value: "H", unicode: "H"},
                    "char-i": {label: "i", value: "i", unicode: "i"},
                    "char-I": {label: "I", value: "I", unicode: "I"},
                    "char-igrave": {
                        label: "\u00ec", value: "\u00ec",
                        unicode: "\u00ec"
                    },
                    "char-iacute": {label: "\u00ed", value: "\u00ed", unicode: "\u00ed"},
                    "char-icirc": {label: "\u00ee", value: "\u00ee", unicode: "\u00ee"},
                    "char-iuml": {label: "\u00ef", value: "\u00ef", unicode: "\u00ef"},
                    "char-Igrave": {label: "\u00cc", value: "\u00cc", unicode: "\u00cc"},
                    "char-Iacute": {label: "\u00cd", value: "\u00cd", unicode: "\u00cd"},
                    "char-Icirc": {label: "\u00ce", value: "\u00ce", unicode: "\u00ce"},
                    "char-Iuml": {label: "\u00cf", value: "\u00cf", unicode: "\u00cf"},
                    "char-j": {label: "j", value: "j", unicode: "j"},
                    "char-J": {
                        label: "J",
                        value: "J", unicode: "J"
                    },
                    "char-k": {label: "k", value: "k", unicode: "k"},
                    "char-K": {label: "K", value: "K", unicode: "K"},
                    "char-l": {label: "l", value: "l", unicode: "l"},
                    "char-lstrok": {label: "\u0142", value: "\u0142", unicode: "\u0142"},
                    "char-lcaron": {label: "\u013e", value: "\u013e", unicode: "\u013e"},
                    "char-L": {label: "L", value: "L", unicode: "L"},
                    "char-Lstrok": {label: "\u0141", value: "\u0141", unicode: "\u0141"},
                    "char-Lcaron": {label: "\u013d", value: "\u013d", unicode: "\u013d"},
                    "char-m": {label: "m", value: "m", unicode: "m"},
                    "char-M": {
                        label: "M",
                        value: "M", unicode: "M"
                    },
                    "char-n": {label: "n", value: "n", unicode: "n"},
                    "char-N": {label: "N", value: "N", unicode: "N"},
                    "char-ntilde": {label: "\u00f1", value: "\u00f1", unicode: "\u00f1"},
                    "char-nacute": {label: "\u0144", value: "\u0144", unicode: "\u0144"},
                    "char-ncaron": {label: "\u0148", value: "\u0148", unicode: "\u0148"},
                    "char-Ntilde": {label: "\u00d1", value: "\u00d1", unicode: "\u00d1"},
                    "char-Nacute": {label: "\u0143", value: "\u0143", unicode: "\u0143"},
                    "char-Ncaron": {label: "\u0147", value: "\u0147", unicode: "\u0147"},
                    "char-o": {
                        label: "o",
                        value: "o", unicode: "o"
                    },
                    "char-O": {label: "O", value: "O", unicode: "O"},
                    "char-ograve": {label: "\u00f2", value: "\u00f2", unicode: "\u00f2"},
                    "char-oacute": {label: "\u00f3", value: "\u00f3", unicode: "\u00f3"},
                    "char-ocirc": {label: "\u00f4", value: "\u00f4", unicode: "\u00f4"},
                    "char-ouml": {label: "\u00f6", value: "\u00f6", unicode: "\u00f5"},
                    "char-oslash": {label: "\u00f8", value: "\u00f8", unicode: "\u00f8"},
                    "char-otilde": {label: "\u00f5", value: "\u00f5", unicode: "\u00f6"},
                    "char-Ograve": {label: "\u00d2", value: "\u00d2", unicode: "\u00d2"},
                    "char-Oacute": {label: "\u00d3", value: "\u00d3", unicode: "\u00d3"},
                    "char-Ocirc": {label: "\u00d4", value: "\u00d4", unicode: "\u00d4"},
                    "char-Ouml": {label: "\u00d6", value: "\u00d6", unicode: "\u00d5"},
                    "char-Oslash": {label: "\u00d8", value: "\u00d8", unicode: "\u00d8"},
                    "char-Otilde": {label: "\u00d5", value: "\u00d5", unicode: "\u00d6"},
                    "char-oelig": {label: "\u0153", value: "\u0153", unicode: "\u0153"},
                    "char-OElig": {label: "\u0152", value: "\u0152", unicode: "\u0152"},
                    "char-p": {label: "p", value: "p", unicode: "p"},
                    "char-P": {
                        label: "P", value: "P",
                        unicode: "P"
                    },
                    "char-q": {label: "q", value: "q", unicode: "q"},
                    "char-Q": {label: "Q", value: "Q", unicode: "Q"},
                    "char-r": {label: "r", value: "r", unicode: "r"},
                    "char-rcaron": {label: "\u0159", value: "\u0159", unicode: "\u0159"},
                    "char-R": {label: "R", value: "R", unicode: "R"},
                    "char-Rcaron": {label: "\u0158", value: "\u0158", unicode: "\u0158"},
                    "char-s": {label: "s", value: "s", unicode: "s"},
                    "char-S": {label: "S", value: "S", unicode: "S"},
                    "char-sacute": {label: "\u015b", value: "\u015b", unicode: "\u015b"},
                    "char-scaron": {
                        label: "\u0161", value: "\u0161",
                        unicode: "\u0161"
                    },
                    "char-Sacute": {label: "\u015a", value: "\u015a", unicode: "\u015a"},
                    "char-Scaron": {label: "\u0160", value: "\u0160", unicode: "\u0160"},
                    "char-t": {label: "t", value: "t", unicode: "t"},
                    "char-tcaron": {label: "\u0165", value: "\u0165", unicode: "\u0165"},
                    "char-T": {label: "T", value: "T", unicode: "T"},
                    "char-Tcaron": {label: "\u0164", value: "\u0164", unicode: "\u0164"},
                    "char-u": {label: "u", value: "u", unicode: "u"},
                    "char-U": {label: "U", value: "U", unicode: "U"},
                    "char-ugrave": {label: "\u00f9", value: "\u00f9", unicode: "\u00f9"},
                    "char-uacute": {label: "\u00fa", value: "\u00fa", unicode: "\u00fa"},
                    "char-ucirc": {label: "\u00fb", value: "\u00fb", unicode: "\u00fb"},
                    "char-uuml": {label: "\u00fc", value: "\u00fc", unicode: "\u00fc"},
                    "char-uring": {label: "\u016f", value: "\u016f", unicode: "\u016f"},
                    "char-Ugrave": {label: "\u00d9", value: "\u00d9", unicode: "\u00d9"},
                    "char-Uacute": {label: "\u00da", value: "\u00da", unicode: "\u00da"},
                    "char-Ucirc": {label: "\u00db", value: "\u00db", unicode: "\u00db"},
                    "char-Uuml": {label: "\u00dc", value: "\u00dc", unicode: "\u00dc"},
                    "char-Uring": {
                        label: "\u016e",
                        value: "\u016e", unicode: "\u016e"
                    },
                    "char-v": {label: "v", value: "v", unicode: "v"},
                    "char-V": {label: "V", value: "V", unicode: "V"},
                    "char-w": {label: "w", value: "w", unicode: "w"},
                    "char-W": {label: "W", value: "W", unicode: "W"},
                    "char-x": {label: "x", value: "x", unicode: "x"},
                    "char-X": {label: "X", value: "X", unicode: "X"},
                    "char-y": {label: "y", value: "y", unicode: "y"},
                    "char-Y": {label: "Y", value: "Y", unicode: "Y"},
                    "char-yuml": {label: "\u00ff", value: "\u00ff", unicode: "\u00ff"},
                    "char-yacute": {label: "\u00fd", value: "\u00fd", unicode: "\u00fd"},
                    "char-Yacute": {label: "\u00dd", value: "\u00dd", unicode: "\u00dd"},
                    "char-z": {label: "z", value: "z", unicode: "z"},
                    "char-Z": {label: "Z", value: "Z", unicode: "Z"},
                    "char-zacute": {label: "\u017a", value: "\u017a", unicode: "\u017a"},
                    "char-zdot": {label: "\u017c", value: "\u017c", unicode: "\u017c"},
                    "char-zcaron": {label: "\u017e", value: "\u017e", unicode: "\u017e"},
                    "char-Zacute": {label: "\u0179", value: "\u0179", unicode: "\u0179"},
                    "char-Zdot": {label: "\u017b", value: "\u017b", unicode: "\u017b"},
                    "char-Zcaron": {
                        label: "\u017d", value: "\u017d",
                        unicode: "\u017d"
                    },
                    "char-dcaron": {label: "\u010f", value: "\u010f", unicode: "\u0010F"},
                    "char-Dcaron": {label: "\u010e", value: "\u010e", unicode: "\u0010E"},
                    "char-eth": {label: "\u00f0", value: "\u00f0", unicode: "\u00f0"},
                    "char-thorn": {label: "\u00fe", value: "\u00fe", unicode: "\u00fe"},
                    "char-ETH": {label: "\u00d0", value: "\u00d0", unicode: "\u00d0"},
                    "char-THORN": {label: "\u00de", value: "\u00de", unicode: "\u00de"},
                    "char-szlig": {label: "\u00df", value: "\u00df", unicode: "\u00df"},
                    "char-excl": {label: "!", value: "!", unicode: "!"},
                    "char-iexcl": {
                        label: "\u00a1",
                        value: "\u00a1", unicode: "\u00a1"
                    },
                    "char-quest": {label: "?", value: "?", unicode: "?"},
                    "char-iquest": {label: "\u00bf", value: "\u00bf", unicode: "\u00bf"},
                    "char-dollar": {label: "$", value: "$", unicode: "$"},
                    "char-euro": {label: "\u20ac", value: "\u20ac", unicode: "\u20ac"},
                    "char-pound": {label: "\u00a3", value: "\u00a3", unicode: "\u00a3"},
                    "char-yen": {label: "\u00a5", value: "\u00a5", unicode: "\u00a5"},
                    "char-atsign": {label: "@", value: "@", unicode: "@"},
                    "char-colon": {label: ":", value: ":", unicode: ":"},
                    "char-semicolon": {
                        label: ";", value: ";",
                        unicode: ";"
                    },
                    "char-caret": {label: "^", value: "^", unicode: "^"},
                    "char-lt": {label: "<", value: "<", unicode: "<"},
                    "char-gt": {label: ">", value: ">", unicode: ">"},
                    "char-equal": {label: "=", value: "=", unicode: "="},
                    "char-number": {label: "#", value: "#", unicode: "#"},
                    "char-apos": {label: "'", value: "'", unicode: "'"},
                    "char-quot": {label: '"', value: '"', unicode: '"'},
                    "char-amp": {label: "&", value: "&", unicode: "&"},
                    "char-lparen": {label: "(", value: "(", unicode: "("},
                    "char-rparen": {label: ")", value: ")", unicode: ")"},
                    "char-lcurly": {
                        label: "{",
                        value: "{", unicode: "{"
                    },
                    "char-rcurly": {label: "}", value: "}", unicode: "}"},
                    "char-lsquare": {label: "[", value: "[", unicode: "["},
                    "char-rsquare": {label: "]", value: "]", unicode: "]"},
                    "char-vertline": {label: "|", value: "|", unicode: "|"},
                    "char-grave": {label: "`", value: "`", unicode: "`"},
                    "char-tilde": {label: "~", value: "~", unicode: "~"},
                    "char-asterisk": {label: "*", value: "*", unicode: "*"},
                    "char-comma": {label: ",", value: ",", unicode: ","},
                    "char-hyphen": {label: "-", value: "-", unicode: "-"},
                    "char-underscore": {label: "_", value: "_", unicode: "_"},
                    "char-period": {label: ".", value: ".", unicode: "."},
                    "char-plus": {label: "+", value: "+", unicode: "+"},
                    "char-percent": {label: "%", value: "%", unicode: "%"},
                    "char-divide": {label: "\u00f7", value: "\u00f7", unicode: "\u00f7"},
                    "char-doubledagger": {label: "\u2021", value: "\u2021", unicode: "\u2021"},
                    "char-degree": {label: "\u00b0", value: "\u00b0", unicode: "\u00b0"},
                    "char-bullet": {label: "\u2022", value: "\u2022", unicode: "\u2022"},
                    "char-ellipsis": {label: "\u2026", value: "\u2026", unicode: "\u2026"},
                    "char-slash": {label: "/", value: "/", unicode: "/"},
                    "char-backslash": {label: "\\", value: "\\", unicode: "\\"},
                    "digit-0": {label: "0", value: "0", unicode: "0"},
                    "digit-1": {label: "1", value: "1", unicode: "1"},
                    "digit-2": {label: "2", value: "2", unicode: "2"},
                    "digit-3": {label: "3", value: "3", unicode: "3"},
                    "digit-4": {label: "4", value: "4", unicode: "4"},
                    "digit-5": {label: "5", value: "5", unicode: "5"},
                    "digit-6": {label: "6", value: "6", unicode: "6"},
                    "digit-7": {label: "7", value: "7", unicode: "7"},
                    "digit-8": {label: "8", value: "8", unicode: "8"},
                    "digit-9": {label: "9", value: "9", unicode: "9"},
                    "char-space": {
                        label: "space",
                        value: " ", unicode: " "
                    },
                    "char-uspace": {label: "_", value: " ", unicode: " "},
                    "numpad-0": {label: "0", sublabel: "", value: "0"},
                    "numpad-1": {label: "1", sublabel: "", value: "1"},
                    "numpad-2": {label: "2", sublabel: "abc", value: "2"},
                    "numpad-3": {label: "3", sublabel: "def", value: "3"},
                    "numpad-4": {label: "4", sublabel: "ghi", value: "4"},
                    "numpad-5": {label: "5", sublabel: "jkl", value: "5"},
                    "numpad-6": {label: "6", sublabel: "mno", value: "6"},
                    "numpad-7": {label: "7", sublabel: "pqrs", value: "7"},
                    "numpad-8": {label: "8", sublabel: "tuv", value: "8"},
                    "numpad-9": {
                        label: "9",
                        sublabel: "wxyz", value: "9"
                    },
                    "multi-0": {label: "0", sublabel: " ", value: "0"}
                },
                KeyDefinitions: {
                    "key-a": {
                        normal: "char-a",
                        shift: "char-A",
                        extended: "char-a char-agrave char-aacute char-acirc char-auml char-aring char-aelig char-aogon".split(" "),
                        shiftextended: "char-A char-Agrave char-Aacute char-Acirc char-Auml char-Aring char-AElig char-Aogon".split(" ")
                    },
                    "key-b": {normal: "char-b", shift: "char-B"},
                    "key-c": {
                        normal: "char-c",
                        shift: "char-C",
                        extended: ["char-c", "char-ccedil", "char-cacute", "char-ccaron"],
                        shiftextended: ["char-C",
                            "char-Ccedil", "char-Cacute", "char-Ccaron"]
                    },
                    "key-d": {
                        normal: "char-d",
                        shift: "char-D",
                        extended: ["char-d", "char-eth", "char-thorn", "char-dcaron"],
                        shiftextended: ["char-D", "char-ETH", "char-THORN", "char-Dcaron"]
                    },
                    "key-e": {
                        normal: "char-e",
                        shift: "char-E",
                        extended: "char-e char-egrave char-eacute char-ecirc char-ecaron char-euml char-eogon".split(" "),
                        shiftextended: "char-E char-Egrave char-Eacute char-Ecirc char-Ecaron char-Euml char-Eogon".split(" ")
                    },
                    "key-f": {normal: "char-f", shift: "char-F"},
                    "key-g": {
                        normal: "char-g",
                        shift: "char-G"
                    },
                    "key-h": {normal: "char-h", shift: "char-H"},
                    "key-i": {
                        normal: "char-i",
                        shift: "char-I",
                        extended: ["char-i", "char-igrave", "char-iacute", "char-icirc", "char-iuml"],
                        shiftextended: ["char-I", "char-Igrave", "char-Iacute", "char-Icirc", "char-Iuml"]
                    },
                    "key-j": {normal: "char-j", shift: "char-J"},
                    "key-k": {normal: "char-k", shift: "char-K"},
                    "key-l": {
                        normal: "char-l",
                        shift: "char-L",
                        extended: ["char-l", "char-lstrok", "char-lcaron"],
                        shiftextended: ["char-L", "char-Lstrok", "char-Lcaron"]
                    },
                    "key-m": {normal: "char-m", shift: "char-M"},
                    "key-n": {
                        normal: "char-n",
                        shift: "char-N",
                        extended: ["char-n", "char-ntilde", "char-nacute", "char-ncaron"],
                        shiftextended: ["char-N", "char-Ntilde", "char-Nacute", "char-Ncaron"]
                    },
                    "key-o": {
                        normal: "char-o",
                        shift: "char-O",
                        extended: "char-o char-ograve char-oacute char-ocirc char-ouml char-oslash char-otilde char-oelig".split(" "),
                        shiftextended: "char-O char-Ograve char-Oacute char-Ocirc char-Ouml char-Oslash char-Otilde char-OElig".split(" ")
                    },
                    "key-p": {normal: "char-p", shift: "char-P"},
                    "key-q": {normal: "char-q", shift: "char-Q"},
                    "key-r": {
                        normal: "char-r",
                        shift: "char-R",
                        extended: ["char-rcaron"],
                        shiftextended: ["char-Rcaron"]
                    },
                    "key-s": {
                        normal: "char-s",
                        shift: "char-S",
                        extended: ["char-s", "char-szlig", "char-sacute", "char-scaron"],
                        shiftextended: ["char-S", "char-szlig", "char-Sacute", "char-Scaron"]
                    },
                    "key-t": {
                        normal: "char-t",
                        shift: "char-T",
                        extended: ["char-tcaron"],
                        shiftextended: ["char-Tcaron"]
                    },
                    "key-u": {
                        normal: "char-u",
                        shift: "char-U",
                        extended: "char-u char-ugrave char-uacute char-ucirc char-uuml char-uring".split(" "),
                        shiftextended: "char-U char-Ugrave char-Uacute char-Ucirc char-Uuml char-Uring".split(" ")
                    },
                    "key-v": {normal: "char-v", shift: "char-V"},
                    "key-w": {normal: "char-w", shift: "char-W"},
                    "key-x": {normal: "char-x", shift: "char-X"},
                    "key-y": {
                        normal: "char-y",
                        shift: "char-Y",
                        extended: ["char-y", "char-yacute", "char-yuml"],
                        shiftextended: ["char-Y", "char-Yacute"]
                    },
                    "key-z": {
                        normal: "char-z",
                        shift: "char-Z",
                        extended: ["char-z", "char-zacute", "char-zdot", "char-zcaron"],
                        shiftextended: ["char-Z", "char-Zacute", "char-Zdot", "char-Zcaron"]
                    },
                    "key-currency": {
                        normal: "char-dollar",
                        shift: "char-dollar",
                        extended: ["char-dollar", "char-euro",
                            "char-pound", "char-yen"],
                        shiftextended: ["char-dollar", "char-euro", "char-pound", "char-yen"]
                    },
                    "key-currency2": {
                        normal: "char-euro",
                        shift: "char-euro",
                        extended: ["char-dollar", "char-euro", "char-pound", "char-yen"],
                        shiftextended: ["char-dollar", "char-euro", "char-pound", "char-yen"]
                    },
                    "key-excl": {
                        normal: "char-excl",
                        shift: "char-excl",
                        extended: ["char-excl", "char-iexcl"],
                        shiftextended: ["char-excl", "char-iexcl"]
                    },
                    "key-quest": {
                        normal: "char-quest",
                        shift: "char-quest",
                        extended: ["char-quest", "char-iquest"],
                        shiftextended: ["char-quest",
                            "char-iquest"]
                    },
                    "key-lparen": {normal: "char-lparen", shift: "char-lparen"},
                    "key-rparen": {normal: "char-rparen", shift: "char-rparen"},
                    "key-lcurly": {normal: "char-lcurly", shift: "char-lcurly"},
                    "key-rcurly": {normal: "char-rcurly", shift: "char-rcurly"},
                    "key-lsquare": {normal: "char-lsquare", shift: "char-lsquare"},
                    "key-rsquare": {normal: "char-rsquare", shift: "char-rsquare"},
                    "key-atsign": {normal: "char-atsign", shift: "char-atsign"},
                    "key-period": {normal: "char-period", shift: "char-period"},
                    "key-underscore": {
                        normal: "char-underscore",
                        shift: "char-underscore"
                    },
                    "key-comma": {normal: "char-comma", shift: "char-comma"},
                    "key-semicolon": {normal: "char-semicolon", shift: "char-semicolon"},
                    "key-colon": {normal: "char-colon", shift: "char-colon"},
                    "key-caret": {normal: "char-caret", shift: "char-caret"},
                    "key-plus": {normal: "char-plus", shift: "char-plus"},
                    "key-tilde": {normal: "char-tilde", shift: "char-tilde"},
                    "key-grave": {normal: "char-grave", shift: "char-grave"},
                    "key-vertline": {normal: "char-vertline", shift: "char-vertline"},
                    "key-amp": {normal: "char-amp", shift: "char-amp"},
                    "key-percent": {normal: "char-percent", shift: "char-percent"},
                    "key-divide": {normal: "char-divide", shift: "char-divide"},
                    "key-hash": {normal: "char-number", shift: "char-number"},
                    "key-doubledagger": {normal: "char-doubledagger", shift: "char-doubledagger"},
                    "key-degree": {normal: "char-degree", shift: "char-degree"},
                    "key-lt": {normal: "char-lt", shift: "char-lt"},
                    "key-gt": {normal: "char-gt", shift: "char-gt"},
                    "key-slash": {normal: "char-slash", shift: "char-slash"},
                    "key-backslash": {normal: "char-backslash", shift: "char-backslash"},
                    "key-apos": {normal: "char-apos", shift: "char-apos"},
                    "key-quot": {normal: "char-quot", shift: "char-quot"},
                    "key-hyphen": {normal: "char-hyphen", shift: "char-hyphen"},
                    "key-equal": {normal: "char-equal", shift: "char-equal"},
                    "key-bullet": {normal: "char-bullet", shift: "char-bullet"},
                    "key-asterisk": {normal: "char-asterisk", shift: "char-asterisk"},
                    "key-0": {normal: "digit-0", shift: "char-hyphen"},
                    "key-1": {normal: "digit-1", shift: "char-excl"},
                    "key-2": {normal: "digit-2", shift: "char-atsign"},
                    "key-3": {normal: "digit-3", shift: "char-number"},
                    "key-4": {normal: "digit-4", shift: "char-euro"},
                    "key-5": {normal: "digit-5", shift: "char-colon"},
                    "key-6": {normal: "digit-6", shift: "char-slash"},
                    "key-7": {normal: "digit-7", shift: "char-period"},
                    "key-8": {normal: "digit-8", shift: "char-comma"},
                    "key-9": {normal: "digit-9", shift: "char-quest"},
                    "multi-0": {normal: "multi-0"},
                    "multi-1": {normal: "numpad-1"},
                    "multi-2": {normal: "numpad-2"},
                    "multi-3": {normal: "numpad-3"},
                    "multi-4": {normal: "numpad-4"},
                    "multi-5": {normal: "numpad-5"},
                    "multi-6": {normal: "numpad-6"},
                    "multi-7": {normal: "numpad-7"},
                    "multi-8": {normal: "numpad-8"},
                    "multi-9": {normal: "numpad-9"},
                    "numkey-0": {normal: "numpad-0"},
                    "numkey-1": {normal: "numpad-1"},
                    "numkey-2": {normal: "numpad-2"},
                    "numkey-3": {normal: "numpad-3"},
                    "numkey-4": {normal: "numpad-4"},
                    "numkey-5": {normal: "numpad-5"},
                    "numkey-6": {normal: "numpad-6"},
                    "numkey-7": {normal: "numpad-7"},
                    "numkey-8": {normal: "numpad-8"},
                    "numkey-9": {normal: "numpad-9"},
                    "numkey-decimal": {normal: "char-period"},
                    "numkey-comma": {normal: "char-comma"},
                    "key-space": {normal: "char-space", shift: "char-space", event: "space"},
                    "key-uspace": {normal: "char-uspace", shift: "char-uspace", event: "space"},
                    "action-shift": {
                        code: "shift",
                        label: FontAwesome.get("arrow-up"),
                        glyph: "shift",
                        event: "shiftselect"
                    },
                    "action-extended": {label: "\u00e2\u00eb\u00ed", event: "extendedselect"},
                    "action-backspace": {
                        code: b ? "delete" : "back",
                        label: FontAwesome.get("arrow-left"),
                        glyph: "delete",
                        event: "backspace"
                    },
                    "action-closeextendedpanel": {
                        label: FontAwesome.get("undo"),
                        glyph: "cancel",
                        event: "extendedselect"
                    },
                    "action-nextlayout": {label: "", glyph: "", event: "layoutchanged"}
                },
                KeyLayouts: [{
                    id: "alphanumeric",
                    label: FontAwesome.get(["keyboard-o", "lg"]),
                    glyph: "",
                    keyrows: [[{keyid: "key-a"}, {keyid: "key-b"}, {keyid: "key-c"}, {keyid: "key-d"}, {keyid: "key-e"}, {keyid: "key-f"}, {keyid: "key-g"}, {keyid: "key-h"}, {keyid: "key-i"}], [{keyid: "key-j"}, {keyid: "key-k"}, {keyid: "key-l"}, {keyid: "key-m"}, {keyid: "key-n"}, {keyid: "key-o"}, {keyid: "key-p"}, {keyid: "key-q"}, {keyid: "key-r"}], [{keyid: "key-s"}, {keyid: "key-t"}, {keyid: "key-u"}, {keyid: "key-v"}, {keyid: "key-w"}, {keyid: "key-x"}, {keyid: "key-y"}, {keyid: "key-z"},
                        {keyid: "key-0"}], [{keyid: "key-1"}, {keyid: "key-2"}, {keyid: "key-3"}, {keyid: "key-4"}, {keyid: "key-5"}, {keyid: "key-6"}, {keyid: "key-7"}, {keyid: "key-8"}, {keyid: "key-9"}]],
                    controlrow: [{keyid: "action-nextlayout"}, {keyid: "action-shift"}, {keyid: "key-space"}, {keyid: "action-extended"}, {keyid: "action-backspace"}]
                }, {
                    id: "symbols",
                    label: ".@#",
                    glyph: "",
                    keyrows: [[{keyid: "key-currency"}, {keyid: "key-currency2"}, {keyid: "key-lparen"}, {keyid: "key-rparen"}, {keyid: "key-lcurly"}, {keyid: "key-rcurly"}, {keyid: "key-tilde"}, {keyid: "key-grave"},
                        {keyid: "key-vertline"}], [{keyid: "key-comma"}, {keyid: "key-amp"}, {keyid: "key-lsquare"}, {keyid: "key-rsquare"}, {keyid: "key-caret"}, {keyid: "key-percent"}, {keyid: "key-divide"}, {keyid: "key-hash"}, {keyid: "key-degree"}], [{keyid: "key-excl"}, {keyid: "key-quest"}, {keyid: "key-lt"}, {keyid: "key-gt"}, {keyid: "key-colon"}, {keyid: "key-semicolon"}, {keyid: "key-plus"}, {keyid: "key-asterisk"}, {keyid: "key-bullet"}], [{keyid: "key-period"}, {keyid: "key-atsign"}, {keyid: "key-backslash"}, {keyid: "key-slash"}, {keyid: "key-apos"}, {keyid: "key-quot"},
                        {keyid: "key-hyphen"}, {keyid: "key-equal"}, {keyid: "key-underscore"}]],
                    controlrow: [{keyid: "action-nextlayout"}, {keyid: "action-shift"}, {keyid: "key-space"}, {keyid: "action-extended"}, {keyid: "action-backspace"}],
                    noShift: !0,
                    noExtended: !0
                }, {
                    id: "digits",
                    label: "123",
                    glyph: "",
                    keyrows: [[], [{keyid: "key-1"}, {keyid: "key-2"}, {keyid: "key-3"}, {keyid: "key-4"}, {keyid: "key-5"}], [{keyid: "key-6"}, {keyid: "key-7"}, {keyid: "key-8"}, {keyid: "key-9"}, {keyid: "key-0"}], []],
                    controlrow: [{keyid: "action-nextlayout"}, {keyid: "action-shift"},
                        {keyid: "action-extended"}, {keyid: "key-space"}, {keyid: "action-backspace"}]
                }, {
                    id: "multitab",
                    label: "123",
                    glyph: "",
                    keyrows: [[{keyid: "multi-1"}, {keyid: "multi-2"}, {keyid: "multi-3"}], [{keyid: "multi-4"}, {keyid: "multi-5"}, {keyid: "multi-6"}], [{keyid: "multi-7"}, {keyid: "multi-8"}, {keyid: "multi-9"}], []],
                    controlrow: [{keyid: "action-nextlayout"}, {keyid: "multi-0"}, {keyid: "action-backspace"}],
                    largeNumeric: !0,
                    noShift: !0,
                    isNumeric: !0
                }, {
                    id: "pinentry",
                    label: "PIN",
                    glyph: "",
                    keyrows: [[{keyid: "numkey-1"}, {keyid: "numkey-2"},
                        {keyid: "numkey-3"}], [{keyid: "numkey-4"}, {keyid: "numkey-5"}, {keyid: "numkey-6"}], [{keyid: "numkey-7"}, {keyid: "numkey-8"}, {keyid: "numkey-9"}], [{keyid: "spacer-numkey"}, {keyid: "numkey-0"}, {keyid: "action-backspace"}]],
                    controlrow: [],
                    noShift: !0,
                    needNumericBackspace: !0,
                    isPin: !0,
                    isNumeric: !0
                }, {
                    id: "numeric-decimal",
                    label: "123",
                    glyph: "",
                    keyrows: [[{keyid: "numkey-1"}, {keyid: "numkey-2"}, {keyid: "numkey-3"}], [{keyid: "numkey-4"}, {keyid: "numkey-5"}, {keyid: "numkey-6"}], [{keyid: "numkey-7"}, {keyid: "numkey-8"}, {keyid: "numkey-9"}]],
                    controlrow: [{keyid: "," === Number.DECIMAL ? "numkey-comma" : "numkey-decimal"}, {keyid: "numkey-0"}, {keyid: "action-backspace"}],
                    needNumericBackspace: !0,
                    isNumeric: !0
                }],
                KeyLayoutSets: {normal: ["alphanumeric", "symbols"], pin: ["pinentry"], decimal: ["numeric-decimal"]},
                ControlDimensions: {
                    standard: {
                        container: {width: 522, height: 331},
                        key: {width: 58, height: 63},
                        action: {width: 87, height: 63},
                        space: {width: 198, height: 63},
                        numkey: {width: 116, height: 63},
                        keypadding: 6,
                        rowpadding: 2,
                        "keypadding-pinentry": 4,
                        "rowpadding-pinentry": 1
                    },
                    small: {
                        container: {width: 522, height: 331},
                        key: {width: 52, height: 63},
                        action: {width: 77, height: 63},
                        space: {width: 176, height: 63},
                        numkey: {width: 116, height: 63},
                        keypadding: 4,
                        rowpadding: 4,
                        "keypadding-pinentry": 4,
                        "rowpadding-pinentry": 1
                    }
                },
                KeyImageSources: {}
            }
        }, d = function (a) {
            var b = "";
            switch (a) {
                case "action-nextlayout":
                case "action-shift":
                case "action-extended":
                case "action-backspace":
                    b = "action";
                    "multitab" === c[this._classID].state.currentLayout.id ? b = "multikey" : c[this._classID].state.currentLayout.isNumeric && (b = "numkey");
                    break;
                case "key-space":
                    b = "space";
                    break;
                case "numkey":
                case "spacer-numkey":
                    b = "numkey";
                    break;
                case "multi":
                    b = "multikey"
            }
            a && 0 === a.indexOf("numkey-") && (b = "numkey");
            a && 0 === a.indexOf("key-") && !b && (b = "key");
            a && 0 === a.indexOf("multi-") && (b = "multikey");
            return b
        }, e = function (a) {
            var b = c.Tables.KeyLayoutSets, d = c.Tables.KeyLayouts, e = c[this._classID];
            a || (a = "normal");
            "string" === typeOf(a) && (a = b[a] || [a]);
            e.availableLayouts = a.map(function (a) {
                return d.filter(function (c) {
                    return c.id == a
                })[0]
            });
            e.availableLayouts.length ||
            (e.availableLayouts = b.normal.map(function (a) {
                return d.filter(function (c) {
                    return c.id == a
                })[0]
            }))
        }, f = function (a) {
            return c.Tables.KeyLayouts.filter(function (c) {
                return c.id == a
            })[0]
        }, g = function () {
            var a = c[this._classID], b = a.availableLayouts, d = b.indexOf(a.state.currentLayout);
            if (0 > d)return a.state.currentLayout;
            d = d + 1 < b.length ? d + 1 : 0;
            a && a.state && a.state.current_focused_key && delete a.state.current_focused_key;
            return b[d]
        }, h = function (a) {
            MAF.system && MAF.system.setMode && MAF.system.setMode("keyboard");
            a = c[this._classID];
            l.call(this, a.state.current_focused_key, a.body.firstChild.firstChild)
        }, k = function (a) {
            MAF.system && MAF.system.setMode && MAF.system.setMode();
            c[this._classID].state.current_focused_key && c[this._classID].state.current_focused_key.removeClass("focused")
        }, l = function (a, b) {
            var d = c[this._classID].state;
            d.current_focused_key = a || b;
            d.current_focused_key.focus()
        }, p = function (a, b, d) {
            d = c[this._classID];
            var e = c.Tables.KeyDefinitions[b], f, h, k;
            a.store("definition", e);
            a.store("keyid", b);
            if (0 === b.indexOf("spacer-"))a.opacity =
                0, a.wantsFocus = !1; else {
                if (0 === b.indexOf("action-"))f = "action-nextlayout" === b ? g.call(this).label : e.label, k = e.code || f; else {
                    h = c.Tables.CharacterDefinitions[e[d.state.showShift ? "shift" : "normal"]];
                    if (!h)return;
                    f = h.label;
                    k = h.code || f;
                    h = h.sublabel
                }
                if (f) {
                    var l = a.retrieve("label");
                    l || (l = (new Text).inject(a), l.addClass("ReuseKeyboardLabel"), h && 0 === b.indexOf("multi-") && l.addClass("ReuseKeyboardLabelOffset"), a.store("label", l));
                    var m = a.retrieve("key");
                    d.indexing["key-" + k] = m && m.key || 0;
                    l.data = "space" === f ? widget.getLocalizedString("SPACE") :
                        f
                }
                0 === b.indexOf("multi-") && h && (f = a.retrieve("sublabel"), f || (f = (new Text).inject(a), f.addClass("ReuseKeyboardSubLabel"), a.store("label", f)), f.data = " " === h ? widget.getLocalizedString("SPACE").toLowerCase() : h);
                h = !1;
                d.state.showExtended ? (e.extended && !d.extendedOverlay.visible && (h = !0), "control" !== a.retrieve("key").row || d.extendedOverlay.visible || (h = !0)) : h = !0;
                a.disabled = h ? !1 : !0;
                "action-extended" === b && (a.disabled = d.state.currentLayout.noExtended ? !0 : a.disabled);
                "action-shift" === b && (a.disabled = d.state.currentLayout.noShift ?
                    !0 : a.disabled);
                "action-nextlayout" === b && (a.disabled = d.state.showExtended ? !0 : a.disabled)
            }
        }, n = function (a) {
            var b = c[this._classID];
            a = b.indexing["key-" + a];
            return isNumber(a) && (b = b.body.firstChild.childNodes[a], !b.disabled) ? (this.config && this.config.autoFocus && b.focus(), b.select(), !0) : !1
        }, q = function (a) {
            var d = a.target, e = a.key, f = c[d.owner._classID];
            f.state.showShift && (e = e.toUpperCase());
            if (a.isChar || a.isNumeric || a.isExtendedChar || a.isExtendedNumeric) {
                if (!n.call(d.owner, e)) {
                    d.owner.appendToValue(e);
                    t.call(d.owner,
                        "char", e, a.shiftKey || f.state.showShift || !1);
                    return
                }
            } else if (this.visible)switch (a.key) {
                case "capslock":
                    f.state.currentLayout.noShift || d.owner.setShiftState(!f.state.showShift);
                    break;
                case "shift":
                    f.state.currentLayout.noShift || f.state.showShift || d.owner.setShiftState(!0);
                    break;
                case "back":
                    if (b)break;
                case "delete":
                    a.preventDefault();
                    if (!n.call(d.owner, a.key))return d.owner.deleteFromValue();
                    break;
                case "space":
                    if (!n.call(d.owner, a.key))return d.owner.appendToValue(" ")
            }
            return a
        }, m = function (a) {
            var b =
                a.target, d = c[b.owner._classID];
            switch (a.key) {
                case "capslock":
                    d.state.currentLayout.noShift || b.owner.setShiftState(!d.state.showShift);
                    break;
                case "shift":
                    d.state.currentLayout.noShift || b.owner.setShiftState(!1)
            }
        }, u = function (a) {
            var b = c[this._classID], d = b.extendedOverlay || new Frame, e = (a.retrieve("definition")[b.state.showShift ? "shiftextended" : "extended"] || []).slice();
            e.push("action-closeextendedpanel");
            d.store("type", "view");
            d.addClass("extendedOverlay");
            d.store("focusTarget", a.retrieve("key").key ||
                0);
            var f = (new List).inject(d), g = createDocumentFragment();
            e.forEach(function (b, d) {
                var e = new Item({focus: !0});
                e.addClass("ReuseKeyboardkey");
                "small" === this.config.controlSize && e.addClass("small");
                e.addEventListener("select", y, this);
                e.owner = a.owner;
                g.appendChild(e);
                var f = c.Tables.CharacterDefinitions[b];
                f || "action-closeextendedpanel" != b || (f = c.Tables.KeyDefinitions[b]);
                var h = f.label;
                e.store("definition", f);
                e.store("keyid", b);
                f = e.retrieve("label");
                f || (f = (new Text).inject(e), f.addClass("ReuseKeyboardLabel"),
                    e.store("label", f));
                h && f ? f.data = h : f && (f.data = "")
            }, this);
            f.appendChild(g);
            var h = a.getBounds(), k = a.retrieve("key"), m = this.element.getBounds(), p = m.top, m = m.left, n = Math.min(0, k.keysonrow - k.column - e.length), k = b.body.width / k.keysonrow;
            d.hOffset = h.left - m - (this.width - b.body.width) + n * k || 0;
            d.vOffset = h.top - p || 0;
            d.width = f.width = k * e.length;
            f.height = this.config.externalClassName ? Theme.getStyles(this.config.externalClassName + " .extendedOverlay", "height") : Theme.getStyles("extendedOverlay", "height");
            b.body.appendChild(d);
            b.body.firstChild.allowNavigation = !1;
            d.visible = !0;
            l.call(this, d.lastChild.firstChild)
        }, v = function () {
            var a = c[this._classID];
            a.extendedOverlay.firstChild.destroy(!0);
            a.extendedOverlay.visible = !1;
            a.body.firstChild.allowNavigation = !0
        }, z = null, A = null, r = null, t = function (a, c, b, d) {
            var e = {};
            switch (a) {
                case "multi":
                    d && d.sublabel && 0 < d.sublabel.length ? (e.key = d.sublabel[0], a = d.sublabel.split(""), 1E3 > new Date - A ? z === c && "number" === typeOf(r) && (r = r >= a.length ? 0 : r + 1, e.key = r > a.length - 1 ? c : a[r], e.update = !0) : r = 0, A = new Date,
                        z = c) : e.key = c;
                    e.shiftKey = b;
                    e.isChar = !0;
                    e.isNumeric = !0;
                    e.keyCode = 13;
                    break;
                case "key":
                case "numkey":
                    e.shiftKey = b;
                    e.isChar = !0;
                    e.isNumeric = !0;
                    e.keyCode = 13;
                    e.key = c;
                    break;
                case "char":
                    e.shiftKey = b;
                    e.isChar = !0;
                    e.key = c;
                    e.keyCode = 13;
                    break;
                case "backspace":
                    e.key = "back"
            }
            this.fireEvent("keydown", e)
        }, y = function (a) {
            var b = c[this.owner._classID || a.target.owner._classID];
            a = a.target || b.state.current_focused_key;
            var d = a.retrieve("definition") || a._characterDefinition, e = String(a.retrieve("keyid") || a._charDefId).split("-")[0],
                f = String(a.retrieve("keyid") || a._charDefId).split("-")[1], h = b.state.showShift, k = null, k = null, k = b.state.showExtended;
            switch (e) {
                case "key":
                case "numkey":
                case "multi":
                    k && "space" !== f ? (u.call(this.owner, a), a.owner.fire("extendedselect")) : (k = c.Tables.CharacterDefinitions[d[h ? "shift" : "normal"]], a.owner.appendToValue(k.value || ""), t.call(a.owner, e, k.value, h, k));
                    break;
                case "char":
                    k = b.extendedOverlay.retrieve("focusTarget");
                    a.owner.appendToValue(d.value || "");
                    t.call(a.owner, e, d.value, h);
                    a.owner.toggleExtended();
                    h && a.owner.toggleShift();
                    v.call(this.owner);
                    isNumber(k) && b.body.firstChild.childNodes[k].focus();
                    break;
                case "action":
                    switch (f) {
                        case "shift":
                            a.owner.toggleShift();
                            break;
                        case "extended":
                            a.owner.toggleExtended();
                            break;
                        case "backspace":
                            a.owner.deleteFromValue();
                            t.call(a.owner, f);
                            break;
                        case "nextlayout":
                            a.owner.loadLayout(g.call(this.owner), a.retrieve("key") || {});
                            break;
                        case "closeextendedpanel":
                            k = b.extendedOverlay.retrieve("focusTarget"), a.owner.toggleExtended(), v.call(this.owner), isNumber(k) && b.body.firstChild.childNodes[k].focus()
                    }
            }
        },
        C = function (a) {
            var b = c[this._classID];
            el = b.body && b.body.firstChild && b.body.firstChild.firstChild;
            b.indexing = {};
            do el && 1 === el.nodeType && p.call(this, el, el.retrieve("keyid"), "shiftselect" === a.type ? "shift" : "extended"), el = el.nextSibling; while (el)
        }, B = {
            space: "onSpace",
            keydown: "onKeyDown",
            backspace: "onBackspace",
            valuechanged: "onValueChanged",
            layoutchanged: "onLayoutChanged",
            shiftselect: "onShiftSelect",
            extendedselect: "onExtendedSelect",
            closeextendedpanel: "onCloseExtendedPanel",
            maxlengthexceeded: "onMaxLengthExceeded"
        };
    return new MAF.Class({
        ClassName: "ReuseKeyboard",
        Extends: MAF.element.Core,
        config: {
            controlSize: "standard",
            autoAdjust: !0,
            autoFocus: !0,
            allowSpace: !0,
            maxLength: 99,
            keyPadding: !1,
            rowPadding: !1,
            wrapNavigation: !0
        },
        initialize: function () {
            var a = c[this._classID] = {
                value: [],
                body: new Frame({frozen: !0}),
                extendedOverlay: new Frame,
                state: {showShift: !1, showExtended: !1, controlSize: this.config.controlSize}
            };
            this.config.element = c[this._classID].body;
            this.parent();
            var b = "multitab" === getSetting("keyboard") ? {
                KeyLayoutSets: {
                    normal: ["multitab",
                        "alphanumeric", "symbols"]
                },
                CharacterDefinitions: {
                    "numpad-0": {label: "0", sublabel: "", value: "0"},
                    "numpad-1": {label: "1", sublabel: ";@!?", value: "1"}
                }
            } : {};
            "CharacterDefinitions KeyDefinitions KeyLayouts KeyLayoutSets ControlDimensions KeyLabelPresentation KeyImageSources".split(" ").forEach(function (a) {
                b[a] && (c.Tables[a] = Object.merge(c.Tables[a], b[a]));
                this.config[a] && c.Tables[a].merge(this.config[a])
            }, this);
            this.body = new List;
            this.body.inject(this.element);
            e.call(this, this.config.availableLayouts);
            var d =
                a.body;
            d.addEventListener("focus", h);
            d.addEventListener("blur", k);
            d.addEventListener("keydown", q, this);
            d.addEventListener("keyup", m, this);
            d.addEventListener("navigateoutofbounds", function (a) {
                var c = a.detail && a.detail.direction;
                a = a.target;
                var b = d.getBounds() || {}, e = a.getBounds() || {};
                switch (c) {
                    case "left":
                        a.navigate(c, [(b.left || 0) + (b.width || 0), e.top || 0]);
                        break;
                    case "right":
                        a.navigate(c, [b.left || 0, e.top || 0])
                }
            });
            C.subscribeTo(this, ["shiftselect", "extendedselect"], this);
            a.extendedOverlay.visible = !1;
            this.config.startShifted &&
            (a.state.showShift = !0);
            this.setValue(this.config.value);
            this.loadLayout(this.config.layout || a.availableLayouts[0]);
            this.config.startFocused && this.focus()
        },
        appendTo: function (a) {
            if (a) {
                var b = c[this._classID].body;
                b.inject(a);
                b.frozen = !1
            }
            return this
        },
        loadLayout: function (a, b) {
            var e = c[this._classID], g = this;
            a = "string" === typeOf(a) ? f(a) : a;
            if (e.state.currentLayout !== a) {
                b = b || {};
                var h = c.Tables.ControlDimensions[c[this._classID].state.controlSize];
                e.indexing = {};
                e.state.currentLayout = a;
                this.body && (this.body.destroy(!0),
                    this.body = (new List).inject(e.body, "top"));
                var k = 0, l = 0, m = 0, n = 0, q = createDocumentFragment();
                if (this.config.autoAdjust) {
                    var u = window.Theme.getStyles("ReuseKeyboard .item"), r = 0, t = 0;
                    this.config.externalClassName && (u = Object.merge(u, window.Theme.getStyles(this.config.externalClassName + " .ReuseKeyboard .item")));
                    ["border", "borderLeftWidth", "borderRightWidth", "marginLeft", "marginRight"].forEach(function (a) {
                        a = "border" === a ? 2 * parseInt(u[a], 10) : u[a];
                        r += a || 0
                    }, this);
                    ["border", "borderTopWidth", "borderBottomWidth",
                        "marginTop", "marginBottom"].forEach(function (a) {
                            a = "border" === a ? 2 * parseInt(u[a], 10) : u[a];
                            t += a || 0
                        }, this)
                }
                a.keyrows.forEach(function (c, b) {
                    var e = 0, f = 0;
                    "array" !== typeOf(c) ? 0 === b && warn('The KeyLayout "' + (a.id || "unknown") + '" is not defined properly.') : c.forEach(function (a, h) {
                        var l = new Item({focus: !0}), m = this.ClassName + d.call(this, a.keyid), w = "small" === this.config.controlSize ? Theme.getStyles(m, "small") || {} : Theme.getStyles(m), x = 0;
                        g.config.externalClassName && (w = Object.merge(w, "small" === this.config.controlSize ?
                            window.Theme.getStyles(g.config.externalClassName + " ." + m, "small") : window.Theme.getStyles(g.config.externalClassName + " ." + m)));
                        l.addClass(m);
                        0 === h && l.addClass("firstKeyOnRow");
                        "small" === this.config.controlSize && l.addClass("small");
                        l.addEventListener("select", y, this);
                        l.owner = this;
                        q.appendChild(l);
                        l.store("key", {row: b, column: h, key: n++, keysonrow: c.length || 0});
                        p.call(this, l, a.keyid);
                        this.config.autoAdjust && (e += r + w.width || 0, x += t + w.height || 0, f = Math.max(x, f));
                        k++
                    }, this);
                    l = Math.max(l, e);
                    m += f
                }, this);
                var v =
                    0;
                a.controlrow && "array" === typeOf(a.controlrow) && a.controlrow.forEach(function (a, c) {
                    var e = new Item({focus: !0}), f = this.ClassName + d.call(this, a.keyid), h = "small" === this.config.controlSize ? Theme.getStyles(f, "small") || {} : Theme.getStyles(f), l = 0;
                    g.config.externalClassName && (h = Object.merge(h, "small" === this.config.controlSize ? window.Theme.getStyles(g.config.externalClassName + " ." + f, "small") : window.Theme.getStyles(g.config.externalClassName + " ." + f)));
                    "control" === b.row && c === b.column && (b.focusTarget = k);
                    e.addClass(f);
                    "small" === this.config.controlSize && e.addClass("small");
                    e.addEventListener("select", y, this);
                    e.owner = this;
                    q.appendChild(e);
                    e.store("key", {row: "control", column: c, key: n++});
                    p.call(this, e, a.keyid);
                    this.config.autoAdjust && (l += t + h.height || 0, v = Math.max(l, v));
                    k++
                }, this);
                m += v;
                this.setStyles({
                    width: this.config.autoAdjust ? l : h.container.width,
                    height: this.config.autoAdjust ? m : h.container.height
                });
                this.body.setStyles({
                    width: this.config.autoAdjust ? l : h.container.width,
                    height: this.config.autoAdjust ? m : h.container.height
                });
                this.body.appendChild(q);
                b && b.focusTarget ? this.body.childNodes[b.focusTarget < k ? b.focusTarget : 0].focus() : this.body.childNodes[0].focus()
            }
        },
        getValue: function () {
            return c[this._classID].value.join("")
        },
        setValue: function (a) {
            var b = this.getValue(), d = String(a || ""), e = parseInt(this.config.maxLength, 10);
            this.config.allowSpace || a.replace(/\s/g, "");
            d.length > e && this.fire("maxlengthexceeded");
            c[this._classID].value = d.split("");
            c[this._classID].value.length = Math.min(e, d.length);
            b !== d && this.fireEvent("valuechanged",
                {oldValue: b, newValue: d});
            return d
        },
        appendToValue: function (a) {
            return this.setValue(this.getValue() + String(a || ""))
        },
        deleteFromValue: function (a) {
            a = parseInt(a, 10) || 1;
            var b = c[this._classID].value.slice();
            b.length = Math.max(0, b.length - a);
            return this.setValue(b.join(""))
        },
        clearValue: function () {
            return this.setValue("")
        },
        setShiftState: function (a) {
            var b = c[this._classID];
            return b.state.showShift === Boolean(a) ? b.state.showShift : this.toggleShift()
        },
        getShiftState: function () {
            return c[this._classID].state.showShift
        },
        toggleShift: function () {
            var a = c[this._classID];
            a.state.showShift = !a.state.showShift;
            this.fire("shiftselect")
        },
        setExtendedState: function (a) {
            var b = c[this._classID];
            return b.state.showExtended === Boolean(a) ? b.state.showExtended : this.toggleExtended()
        },
        getExtendedState: function () {
            return c[this._classID].state.showExtended
        },
        toggleExtended: function () {
            var a = c[this._classID];
            a.state.showExtended = !a.state.showExtended;
            this.fire("extendedselect")
        },
        focus: function () {
            h.call(this)
        },
        resetFocus: emptyFn,
        clearFocus: function () {
            c[this._classID].state.current_focused_key =
                null
        },
        fireEvent: function (a) {
            var c = Array.slice(arguments, 1);
            this.fire(arguments);
            var b = this[B[a]];
            b && b.apply && b.apply(this, c)
        },
        reset: function (a) {
            var b = c[this._classID];
            v.call(this);
            a = a || {};
            for (var d in a)this.config[d] = a[d];
            b.state.controlSize = this.config.controlSize;
            b.state.showShift = !0 === this.config.startShifted;
            this.fire("shiftselect");
            b.state.showExtended = !0 === this.config.startExtended;
            this.fire("extendedselect");
            b.state.current_focused_key && b.state.current_focused_key._applyState("normal");
            b.state.current_focused_key =
                null;
            this.setValue(this.config.value || "");
            this.loadLayout(this.config.layout || b.availableLayouts[0]);
            this.config.startFocused && this.focus()
        },
        suicide: function () {
            MAF.system && MAF.system.setMode && MAF.system.setMode();
            Object.forEach(B, function (a, c) {
                this[c] && delete this[c]
            }, this);
            if (this.body) {
                for (var a; a = this.body.lastChild;)delete a.owner, a.destroy();
                this.body.destroy();
                delete this.body
            }
            this.element && (this.element.destroy(), delete this.element);
            var b = (a = c[this._classID]) && a.body, d = a && a.extendedOverlay;
            b && b.destroy();
            d && d.destroy();
            a && (delete a.overlay, delete a.body, delete c[this._classID]);
            this.parent()
        }
    })
}, {
    ReuseKeyboard: {normal: {styles: {width: "inherit"}}},
    "ReuseKeyboard .item": {
        normal: {
            styles: {
                border: "2px solid white",
                backgroundColor: "black",
                borderRadius: "10px",
                boxSizing: "content-box",
                marginLeft: 2,
                marginRight: 2,
                marginBottom: 2,
                "float": "left"
            }
        },
        focused: {styles: {backgroundColor: Theme.getStyles("BaseFocus", "backgroundColor")}},
        disabled: {styles: {opacity: .3}}
    },
    "ReuseKeyboard .item.firstKeyOnRow": {styles: {clear: "both"}},
    ReuseKeyboardkey: {
        normal: {styles: {transform: "translateZ(0)", width: 57, height: 63}},
        small: {styles: {transform: "translateZ(0)", width: 52, height: 63}}
    },
    ReuseKeyboardaction: {
        normal: {styles: {transform: "translateZ(0)", width: 87, height: 63}},
        small: {styles: {transform: "translateZ(0)", width: 82, height: 63}}
    },
    ReuseKeyboardspace: {
        normal: {styles: {transform: "translateZ(0)", width: 196, height: 63}},
        small: {styles: {transform: "translateZ(0)", width: 171, height: 63}}
    },
    ReuseKeyboardnumkey: {
        normal: {
            styles: {
                transform: "translateZ(0)",
                width: 116, height: 63
            }
        }, small: {styles: {transform: "translateZ(0)", width: 116, height: 63}}
    },
    ReuseKeyboardmultikey: {
        normal: {styles: {transform: "translateZ(0)", width: 116, height: 80}},
        small: {styles: {transform: "translateZ(0)", width: 116, height: 80}}
    },
    ReuseKeyboardLabel: {
        styles: {
            transform: "translateZ(0)",
            width: "inherit",
            height: "inherit",
            fontSize: 32,
            anchorStyle: "center"
        }
    },
    ReuseKeyboardLabelOffset: {styles: {vOffset: -10, hOffset: 0}},
    ReuseKeyboardSubLabel: {
        styles: {
            width: "inherit", height: "inherit", hAlign: "right", fontSize: 22,
            anchorStyle: "center", vOffset: 20
        }
    },
    extendedOverlay: {styles: {transform: "translateZ(0)", height: 67}}
});
define("MAF.keyboard.KeyboardValueManager", function (a) {
    var b = {};
    return new MAF.Class({
        initialize: function () {
            b[this._classID] = {value: "", cursorPosition: 0};
            getter(this, "value", function () {
                return b[this._classID] && b[this._classID].value || ""
            });
            setter(this, "value", function (a) {
                if (null === a || void 0 === a)a = "";
                if (b[this._classID]) {
                    var d = b[this._classID].value || "";
                    a !== d && (d = a, this.config.maxLength && d.length > this.config.maxLength && (d = d.substr(0, this.config.maxLength), this.fire("maxlengthexceeded")), b[this._classID].value =
                        d, this.fire("valuechanged", {value: d}));
                    return d
                }
            });
            getter(this, "cursorPosition", function () {
                return b[this._classID].cursorPosition || 0
            });
            setter(this, "cursorPosition", function (a) {
                "number" === typeOf(a) && (a = Math.max(0, Math.min(parseInt(a, 10), this.value.length)), this.cursorPosition !== a && (b[this._classID].cursorPosition = a, this.fire("cursormoved", {cursorPosition: a})));
                return this.cursorPosition
            })
        }, deleteLeft: function (a) {
            a = parseInt(a, 10) || 1;
            var b = this.value;
            this.value = b.substr(0, Math.max(0, this.cursorPosition -
                    a)) + b.substr(this.cursorPosition, b.length);
            this.moveCursorLeft(a);
            return this.value
        }, deleteRight: function (a) {
            a = parseInt(a, 10) || 1;
            var b = this.value;
            this.value = b.substr(0, this.cursorPosition) + b.substr(this.cursorPosition + a, b.length);
            this.moveCursorRight(a);
            return this.value
        }, handleExternalKeyInput: function (a) {
            var b = a.payload && a.payload.layout || null;
            a.Event && (a = {payload: a.Event});
            if ("pinentry" === b && !a.payload.isNumeric && 0 > ["tab", "back", "enter"].indexOf(a.payload.key))return !1;
            !0 === a.payload.update && this.deleteLeft();
            if (a.payload.isChar || "space" === a.payload.key)return this.insertCharacters("space" === a.payload.key ? " " : a.payload.key);
            switch (a.payload.key) {
                case "back":
                    this.deleteLeft();
                    break;
                case "delete":
                    this.deleteRight()
            }
        }, insertCharacters: function (a) {
            if (null === a || void 0 === a)return this.value;
            a = String(a);
            var b = this.value;
            this.value = b.substr(0, this.cursorPosition) + a + b.substr(this.cursorPosition, b.length);
            this.moveCursorRight(a.length);
            return b
        }, moveCursorLeft: function (a) {
            return this.cursorPosition -= a || 1
        }, moveCursorRight: function (a) {
            return this.cursorPosition +=
                a || 1
        }, setMaxLength: function (a) {
            isNumber(a) && (this.config.maxLength = a)
        }, suicide: function () {
            delete b[this._classID]
        }
    })
});
define("MAF.media.PlaylistEntry", function () {
    var a = function (a) {
        a.sort(function (a, b) {
            return a.bitrate === b.bitrate ? 0 : a.bitrate < b.bitrate ? 1 : -1
        })
    };
    return new MAF.Class({
        config: {url: null, bitrate: 0, asset: null, streams: null}, initialize: function () {
            var b = [];
            this.config.url && b.push({url: this.config.url, bitrate: this.config.bitrate});
            this.config.streams instanceof Array && (this.config.streams.forEach(function (a) {
                a.url && b.push({url: a.url, bitrate: a.bitrate || this.config.bitrate})
            }, this), a(b), delete this.config.streams);
            getter(this, "asset", function () {
                return this.config.asset
            });
            getter(this, "streams", function () {
                return b
            })
        }, streamsReady: function () {
            return !0
        }, hasURL: function (a) {
            return 0 < this.streams.filter(function (c) {
                    return c.url === a
                }).length
        }, addURL: function (b, c) {
            b && (this.streams.push({url: b, bitrate: isNaN(c) ? 0 : c}), a(this.streams));
            return this
        }
    })
});
define("MAF.media.Playlist", function () {
    return new MAF.Class({
        config: {autoStart: !0, repeatAll: !1, forcePlay: !0}, initialize: function () {
            var a = [], b = !0 === this.config.autoStart, c = !0 === this.config.repeatAll, d = !0 === this.config.forcePlay;
            getter(this, "autoStart", function () {
                return b
            });
            setter(this, "autoStart", function (a) {
                b = Boolean(a)
            });
            getter(this, "repeatAll", function () {
                return c
            });
            setter(this, "repeatAll", function (a) {
                c = Boolean(a)
            });
            getter(this, "forcePlay", function () {
                return d
            });
            setter(this, "forcePlay", function (a) {
                d =
                    Boolean(a)
            });
            getter(this, "entries", function () {
                return a
            });
            setter(this, "entries", function (b) {
                a = b || []
            })
        }, removeEntry: function (a) {
            this.entries.slice(a)
        }, clearEntries: function () {
            this.entries = []
        }, addEntry: function (a) {
            return this.addEntries([a])
        }, addEntries: function (a) {
            this.entries = this.entries.concat(a).filter(function (a) {
                return a instanceof MAF.media.PlaylistEntry
            });
            return this
        }, addEntryByURL: function (a, b, c) {
            return this.addEntry(new MAF.media.PlaylistEntry({url: a, bitrate: b, startIndex: c || 0}))
        }
    })
});
define("MAF.control.EmptySpace", function () {
    return new MAF.Class({ClassName: "ControlEmptySpace", Extends: MAF.element.Core})
}, {ControlEmptySpace: {styles: {backgroundImage: "url(" + Image.CHECKERS + ")"}}});
define("MAF.control.Button", function () {
    var a = function (a) {
        !this.secureIndicator && this.secure && (this.secureIndicator = (new MAF.element.Text({
            ClassName: "SecureButtonIndicator",
            label: FontAwesome.get("lock")
        })).appendTo(this));
        this.adjustAccessories()
    };
    return new MAF.Class({
        ClassName: "ControlButton", Extends: MAF.element.Button, Protected: {
            onThemeNeeded: function (a) {
                if (!a.defaultPrevented)switch (a.type) {
                    case "onFocus":
                        this.renderSkin("focused");
                        break;
                    case "onBlur":
                        this.renderSkin("normal");
                        break;
                    case "onAppend":
                        this.renderSkin("normal"),
                            this.createContent()
                }
            }
        }, initialize: function () {
            !1 !== this.config.theme ? this.onThemeNeeded.subscribeTo(this, ["onFocus", "onBlur", "onAppend"], this) : this.createContent.subscribeTo(this, "onAppend", this);
            a.subscribeTo(this, "onChangedSecure", this);
            this.parent();
            a.call(this)
        }, createContent: emptyFn, adjustAccessories: emptyFn, suicide: function () {
            this.secureIndicator && (this.secureIndicator.suicide(), delete this.secureIndicator);
            this.parent()
        }
    })
}, {
    ControlButton: {
        renderSkin: function (a, b, c, d, e) {
            b = new Frame;
            e.applyLayer("BaseGlow",
                b);
            "focused" === a && e.applyLayer("BaseFocus", b);
            e.applyLayer("BaseHighlight", b);
            return b
        }, styles: {width: "inherit", height: 51}
    }, SecureButtonIndicator: {styles: {hAlign: "right", vAlign: "bottom", hOffset: 10, vOffset: 7}}
});
define("MAF.control.TextButton", function () {
    return new MAF.Class({
        ClassName: "ControlTextButton", Extends: MAF.control.Button, createContent: function () {
            this.content = (new MAF.element.Text({
                ClassName: (this.config.ClassName || this.ClassName) + "Text",
                label: this.config.label,
                styles: this.config.textStyles
            })).appendTo(this)
        }, setText: function (a) {
            this.content.setText(a)
        }
    })
}, {
    ControlTextButton: "ControlButton", ControlTextButtonText: {
        styles: {
            width: "100%", height: "inherit", paddingLeft: 10, paddingRight: 10, anchorStyle: "leftCenter",
            truncation: "end"
        }
    }
});
define("MAF.control.BackButton", function () {
    return new MAF.Class({
        ClassName: "ControlBackButton", Extends: MAF.control.Button, Protected: {
            dispatchEvents: function (a, b) {
                switch (a.type) {
                    case "select":
                        this.fire("onSelect", b, a) && MAF.application.previousView(this.config.backParams || {});
                        break;
                    default:
                        this.parent(a, b)
                }
            }
        }, config: {backParams: !1}, createContent: function () {
            var a = getSetting("labels") || {};
            this.content = [(new MAF.element.Text({
                ClassName: "ControlBackButtonIcon",
                label: FontAwesome.get(a.back || "undo")
            })).appendTo(this),
                (new MAF.element.Text({
                    ClassName: "ControlBackButtonText",
                    label: this.config.label || widget.getLocalizedString("BACK"),
                    styles: this.config.textStyles
                })).appendTo(this)]
        }, setText: function (a) {
            this.content[1].setText(a)
        }
    })
}, {
    ControlBackButton: "ControlButton",
    ControlBackButtonIcon: {styles: {width: 60, height: "inherit", fontSize: 24, paddingTop: 3, anchorStyle: "center"}},
    ControlBackButtonText: {
        styles: {
            width: "inherit",
            height: "inherit",
            paddingLeft: 60,
            fontSize: 24,
            anchorStyle: "leftCenter",
            truncation: "end"
        }
    }
});
define("MAF.control.PhotoBackButton", function () {
        var a = function () {
            this.aspectSizeMax(Math.min(this.width, this.height))
        };
        return new MAF.Class({
            ClassName: "ControlPhotoBackButton",
            Extends: MAF.control.BackButton,
            createContent: function () {
                this.parent();
                this.photo = (new MAF.element.Image({ClassName: (this.config.ClassName || this.ClassName) + "Image"})).appendTo(this);
                a.subscribeTo(this.photo, "onLoaded", this.photo);
                this.photo.setSources(this.config)
            },
            setSource: function (a) {
                return this.photo.setSource(a)
            },
            setSources: function (a) {
                return this.photo.setSources(a)
            }
        })
    },
    {
        ControlPhotoBackButton: "ControlButton",
        ControlPhotoBackButtonImage: {styles: {vAlign: "center", hOffset: 100, width: 40, height: 40}}
    });
define("MAF.control.Header", function () {
    return new MAF.Class({
        ClassName: "ControlHeader",
        Extends: MAF.element.Container,
        config: {headerStyle: "large"},
        initialize: function () {
            delete this.config.focus;
            this.parent();
            var a = this.config, b = a.ClassName || this.ClassName, c = a.headerStyle && a.headerStyle.capitalize() || "";
            this.element.addClass(b + c);
            this.content = (new MAF.element.Text({
                ClassName: b + "Text" + c,
                label: a.label,
                styles: a.textStyles
            })).appendTo(this)
        },
        setText: function (a) {
            this.content.setText(a)
        }
    })
}, {
    ControlHeader: {
        styles: {
            backgroundColor: Theme.getStyles("BaseGlow",
                "backgroundColor"), width: "inherit"
        }
    },
    ControlHeaderSmall: {styles: {height: "32px"}},
    ControlHeaderLarge: {styles: {height: "48px"}},
    ControlHeaderTextSmall: {
        styles: {
            width: "100%",
            height: "inherit",
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 18,
            anchorStyle: "leftCenter",
            truncation: "end"
        }
    },
    ControlHeaderTextLarge: {
        styles: {
            width: "100%",
            height: "inherit",
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 24,
            anchorStyle: "leftCenter",
            truncation: "end"
        }
    }
});
define("MAF.control.Keyboard", function () {
    var a = {}, b = {}, c = function () {
        var c = b[this._classID] = {
            valueChanged: function () {
                this.fire("onValueChanged", {value: this.getValue()})
            }.bindTo(this), maxLengthExceeded: function () {
                this.fire("onMaxLengthExceeded")
            }.bindTo(this), keyDown: function (a) {
                this.fire("onKeyDown", a, a.type ? a : null)
            }.bindTo(this)
        }, e = a[this._classID] = new MAF.keyboard.ReuseKeyboard({
            focus: this.config.focus,
            autoAdjust: !0,
            allowSpace: this.config.allowSpace,
            maxLength: this.config.maxLength,
            controlSize: this.config.controlSize,
            startShifted: this.config.startShifted,
            startExtended: this.config.startExtended,
            startFocused: this.config.startFocused,
            layout: this.config.layout,
            availableLayouts: this.config.availableLayouts,
            wrapNavigation: this.config.wrapNavigation,
            KeyLayouts: this.config.KeyLayouts,
            externalClassName: this.config.ClassName
        });
        e.element.hAlign = "center";
        e.element.owner = this;
        e.appendTo(this.element);
        this.setStyle("height", e.element.height);
        e.onValueChanged = c.valueChanged;
        e.onMaxLengthExceeded = c.maxLengthExceeded;
        e.onKeyDown =
            c.keyDown
    };
    return new MAF.Class({
        ClassName: "ControlKeyboard",
        Extends: MAF.element.Container,
        config: {
            embedded: !0,
            focus: !0,
            controlSize: "standard",
            autoAdjust: !0,
            allowSpace: !0,
            maxLength: 99,
            startShifted: !1,
            wrapNavigation: !0
        },
        Protected: {
            registerEvents: function (a) {
                this.parent(["navigateoutofbounds"].concat(a || []))
            }, dispatchEvents: function (a, b) {
                switch (a.type) {
                    case "focus":
                        this.focus();
                        break;
                    case "navigateoutofbounds":
                        this.fire("onNavigateOutOfBounds", a.detail, a);
                        break;
                    default:
                        this.parent(a, b)
                }
            }
        },
        initialize: function () {
            this.config.autoAdjust &&
            this.config.styles && delete this.config.styles.height;
            this.parent();
            this.element.wantsFocus = !1;
            c.call(this);
            this.config.value && this.setValue(this.config.value);
            delete this.config.value;
            this.config.autoAdjust && this.setStyle("height", a[this._classID].element.height)
        },
        getValue: function () {
            return a[this._classID].getValue()
        },
        setValue: function (b) {
            return a[this._classID].setValue(b)
        },
        appendToValue: function (b) {
            return a[this._classID].appendToValue(b)
        },
        deleteFromValue: function (b) {
            return a[this._classID].deleteFromValue(b)
        },
        clearValue: function () {
            return a[this._classID].clearValue()
        },
        loadLayout: function (b, c) {
            return a[this._classID].loadLayout(b, c)
        },
        focus: function () {
            return a[this._classID].focus()
        },
        resetFocus: function () {
            return a[this._classID].resetFocus()
        },
        reset: function () {
            return a[this._classID].reset()
        },
        getShiftState: function () {
            return a[this._classID].getShiftState()
        },
        setShiftState: function (b) {
            return a[this._classID].setShiftState(b)
        },
        toggleShift: function () {
            return a[this._classID].toggleShift()
        },
        getExtendedState: function () {
            return a[this._classID].getExtendedState()
        },
        setExtendedState: function (b) {
            return a[this._classID].setExtendedState(b)
        },
        toggleExtendedState: function () {
            return a[this._classID].toggleExtended()
        },
        getKeyboard: function () {
            return a[this._classID]
        },
        generateStatePacket: function (b) {
            return Object.merge({value: this.getValue(), focused: a[this._classID].element.hasFocus}, b)
        },
        inspectStatePacket: function (a, b) {
            if (!this.config.guid || a && !(this.config.guid in a))return a;
            var c = a && a[this.config.guid], g = typeOf(c);
            if ("null" === g || "undefined" === g)return a;
            if (b)c.focused &&
            this.focus(); else switch (g) {
                case "boolean":
                case "string":
                    return this.setValue(c);
                case "object":
                    for (var h in c)switch (h) {
                        case "value":
                            c[h] && this.setValue(c[h])
                    }
            }
            return c
        },
        suicide: function () {
            var c = this._classID;
            a[c] && a[c].suicide();
            a[c] = null;
            delete a[c];
            b[c] = null;
            delete b[c];
            this.parent()
        }
    })
}, {ControlKeyboard: {styles: {width: "inherit"}}});
define("MAF.control.ValueDisplay", function () {
    return new MAF.Class({
        ClassName: "ControlValueDisplay", Extends: MAF.element.Core, Protected: {
            onSourceUpdated: function () {
                var a = this.getSourceDisplayValue();
                this.updateContent(a)
            }, updateContent: function (a, b) {
                b = b || {};
                if (this.config.animate && "none" != b.transition) {
                    this.content.freeze();
                    this.content.appendTo(this.buffer);
                    this.buffer.freeze();
                    this.content.hide();
                    this.content.thaw();
                    this.content.appendTo(this);
                    this.content.data = a;
                    var c = this.config.animation, d = [],
                        e = function (a) {
                            var e = {};
                            a.forEach(function (a) {
                                e[a] = a in b ? b[a] : c[a]
                            });
                            return e
                        }(["duration", "fade", "slide", "direction", "ease"]), f = this.width, g = this.height, h = this.content.element, k = this.buffer.element, l = this.contentUpdated.bindTo(this);
                    if (!e.slide && !e.fade)return l();
                    e.fade && (d.push(new FadeAnimation(h, 255, e.duration, e.ease)), d.push(new FadeAnimation(k, 0, e.duration, e.ease)));
                    if (e.slide) {
                        switch (e.direction) {
                            case "left":
                                h.hOffset = f;
                                d.push(new MoveAnimation(k, 0 - f, 0, e.duration, e.ease));
                                break;
                            case "right":
                                h.hOffset =
                                    0 - f;
                                d.push(new MoveAnimation(k, f, 0, e.duration, e.ease));
                                break;
                            case "up":
                                h.vOffset = g;
                                d.push(new MoveAnimation(k, 0, 0 - g, e.duration, e.ease));
                                break;
                            case "down":
                                h.vOffset = 0 - g, d.push(new MoveAnimation(k, 0, g, e.duration, e.ease))
                        }
                        d.push(new MoveAnimation(h, 0, 0, e.duration, e.ease, l))
                    }
                    this.content.show()
                } else this.content.data = a
            }, contentUpdated: function () {
                this.content.show();
                this.buffer.hide();
                this.buffer.setStyles({hOffset: 0, vOffset: 0, opacity: 255});
                this.buffer.thaw();
                this.buffer.show()
            }
        }, config: {
            eventTypes: ["onValueChanged",
                "onValueInitialized"],
            sourceElement: null,
            source: null,
            animation: {duration: 250, fade: !0, slide: !0, direction: "left", ease: 0}
        }, initialize: function () {
            this.parent();
            this.createContent();
            var a = this.config.sourceElement || this.config.source;
            a && this.attachToSource(a);
            this.config.source = null;
            delete this.config.source;
            this.config.sourceElement = null;
            delete this.config.sourceElement
        }, getSourceDisplayValue: function () {
            return this.source ? this.source.getDisplayValue() : ""
        }, createContent: function () {
            this.content = (new MAF.element.Text({
                ClassName: "ControlValueContainerText",
                label: "..."
            })).appendTo(this);
            this.buffer = (new MAF.element.Core).appendTo(this)
        }, attachToSource: function (a) {
            var b = null;
            if (!a || this.source === a)return b = this.getSourceDisplayValue(), this.updateContent(b, {transition: "none"});
            this.source = a;
            this.onSourceUpdated.subscribeTo(this.source, this.config.eventTypes, this);
            b = this.getSourceDisplayValue();
            this.updateContent(b, {transition: "none"})
        }, suicide: function () {
            this.content.suicide();
            delete this.content;
            this.buffer.suicide();
            delete this.buffer;
            delete this.source;
            this.parent()
        }
    })
}, {
    ControlValueContainerText: {
        styles: {
            width: "100%",
            height: "inherit",
            paddingLeft: 10,
            paddingRight: 10,
            anchorStyle: "rightCenter",
            opacity: "0.7"
        }
    }
});
define("MAF.control.InputButton", function () {
    var a = function (a) {
        this.setValue(a);
        this.fire("onSelect")
    }, b = function () {
        var a = this.getDisplayValue();
        this.config.valueOnSubline ? (this.valueDisplay = (new MAF.element.Text({
            ClassName: "ControlValueContainerSubline",
            label: a
        })).appendTo(this), function () {
            this.valueDisplay.data = this.getDisplayValue()
        }.subscribeTo(this, ["onValueInitialized", "onValueChanged"], this)) : "ImageToggleButton" !== this.ClassName ? this.valueDisplay = (new MAF.control.ValueDisplay({
            source: this,
            styles: {height: "inherit"}
        })).appendTo(this) :
            (this.valueDisplay = (new MAF.element.Image({
                src: a.src,
                styles: Object.merge({hAlign: "right", vAlign: "center"}, this.config.toggleStyles || {})
            })).appendTo(this), function () {
                this.valueDisplay.setSource(this.getDisplayValue().src)
            }.subscribeTo(this, ["onValueInitialized", "onValueChanged"], this))
    };
    return new MAF.Class({
        ClassName: "ControlInputButton", Extends: MAF.control.TextButton, Protected: {
            valueDisplayWidth: function (a) {
                this.config.valueOnSubline || "ImageToggleButton" === this.ClassName || !this.valueDisplay || a.payload.skip ||
                (this.valueDisplay.width = this.width)
            }, dispatchEvents: function (b, d) {
                this.parent(b, d);
                if ("select" === b.type) {
                    b.stopPropagation();
                    b.preventDefault();
                    var e = this.config, f = a.bindTo(this), g = this.getValue();
                    f.__event__ = void 0;
                    e.changeValue && e.changeValue.apply ? e.changeValue.apply(this, [f, g]) : this.changeValue(f, g)
                }
            }
        }, config: {options: [], value: null, valueOnSubline: !1}, initialize: function () {
            this.ClassName += this.config.valueOnSubline ? "Subline" : "";
            this.parent();
            this.valueDisplayWidth.subscribeTo(this, "onAppend",
                this);
            this.config.options && (this.setOptions(this.config.options), delete this.config.options);
            this.setValue(this.config.value || "");
            delete this.config.value
        }, adjustAccessories: function () {
            var a = this.width;
            this.secureIndicator && this.secure && (a = this.secureIndicator.hOffset - this.secureIndicator.width);
            this.valueDisplay && this.valueDisplay.config && this.valueDisplay.config.styles && "right" === this.valueDisplay.config.styles.hAlign && this.valueDisplay.setStyles({hOffset: a})
        }, createContent: function () {
            this.getDisplayValue();
            var a = this.config, d = a.valueOnSubline ? "ControlValueContainerMainline" : "ControlTextButtonText", e = Object.clone(a.textStyles || Theme.getStyles(d) || {});
            delete e.width;
            this.content = (new MAF.element.Text({ClassName: d, label: a.label, styles: e})).appendTo(this);
            b.call(this)
        }, getValue: function () {
            return String(this.retrieve("value") || "")
        }, setValue: function (a) {
            var b = isEmpty(this.retrieve("value"));
            a = null === a ? "" : String(a);
            if ((this.retrieve("value") || "") === a)return "";
            this.store("value", a);
            this.fire(b ? "onValueInitialized" :
                "onValueChanged", {value: a});
            return this.getValue()
        }, changeValue: function (a, b) {
            a(b)
        }, getDisplayValue: function (a) {
            var b = a = a || this.getValue();
            this.getOptions().forEach(function (e) {
                e.value == a && (b = e.label)
            });
            return b
        }, setOptions: function (a, b) {
            a = [].concat(a);
            var e = a.map(function (a, c) {
                var e = "object" === typeOf(a), k = b && b.length || 0;
                return a ? {
                    value: e && "value"in a ? a.value : a,
                    label: k > c ? b[c] : e && "label"in a ? a.label : a
                } : a
            });
            this.store("options", e);
            this.fire("onOptionsChanged", {options: this.getOptions()})
        }, getOptions: function () {
            return this.retrieve("options") ||
                []
        }, getOptionValues: function () {
            return this.getOptions().map(function (a) {
                return a.value
            })
        }, getOptionLabels: function () {
            return this.getOptions().map(function (a) {
                return a.label
            })
        }, generateStatePacket: function (a) {
            a = a || {};
            return this.parent(Object.merge({value: this.getValue()}, a))
        }, inspectStatePacket: function (a, b) {
            var e = this.parent(a, b), f = typeOf(e);
            if (!b) {
                if (e === a)return a;
                switch (f) {
                    case "boolean":
                    case "string":
                        return this.setValue(e)
                }
                for (var g in e)switch (g) {
                    case "optionCancelled":
                        if (e[g])return this.fire("onOptionCancelled",
                            e), e[g] = null, e;
                        break;
                    case "optionSelected":
                        if (e[g] && "option"in e) {
                            this.fire("onOptionSelected", e.option);
                            e[g] = null;
                            continue
                        } else if (!1 === e[g])return this.fire("onOptionCancelled", e), e[g] = null, e;
                        break;
                    case "option":
                        this.setValue(e[g].value);
                        break;
                    case "value":
                        this.setValue(e[g])
                }
                return e
            }
        }, suicide: function () {
            this.valueDisplay.suicide();
            delete this.valueDisplay;
            this.parent()
        }
    })
}, {
    ControlInputButton: "ControlButton",
    ControlInputButtonSubline: {
        renderSkin: function (a, b, c, d, e) {
            b = new Frame;
            e.applyLayer("BaseGlow",
                b);
            "focused" === a && e.applyLayer("BaseFocus", b);
            e.applyLayer("BaseHighlight", b);
            return b
        }, styles: {width: "inherit", height: "91px"}
    },
    ControlValueContainerMainline: {
        styles: {
            width: "100%",
            height: "inherit",
            vOffset: 6,
            fontSize: 28,
            paddingLeft: 10,
            paddingRight: 10,
            anchorStyle: "leftTop",
            truncation: "end"
        }
    },
    ControlValueContainerSubline: {
        styles: {
            width: "100%",
            height: "inherit",
            truncation: "end",
            paddingLeft: 10,
            anchorStyle: "leftBottom",
            fontSize: 23,
            paddingBottom: 4,
            color: "rgba(255,255,255,.7)"
        }
    }
});
define("MAF.control.PromptButton", function () {
    return new MAF.Class({
        ClassName: "ControlPromptButton",
        Extends: MAF.control.InputButton,
        config: {title: "", message: "Please select an option:"},
        changeValue: function (a, b) {
            var c = this, d = function (b) {
                a(b.selected.value);
                c.fire("onOptionSelected", b.selected || {})
            }, e = this.getOptions().map(function (a) {
                a.callback = d;
                return a
            });
            (new MAF.dialogs.Alert({
                title: this.config.title || this.config.label,
                message: this.config.message,
                buttons: e,
                focusOnCompletion: this
            })).show()
        }
    })
}, {
    ControlPromptButton: "ControlButton",
    ControlPromptButtonSubline: "ControlInputButtonSubline"
});
define("MAF.control.ToggleButton", function () {
    return new MAF.Class({
        ClassName: "ControlToggleButton",
        Extends: MAF.control.InputButton,
        changeValue: function (a, b) {
            var c = this.getOptions(), d = c.map(function (a) {
                return a.value
            }).indexOf(b), d = -1 == d || d == c.length - 1 ? 0 : d + 1;
            a(c[d].value)
        }
    })
}, {ControlToggleButton: "ControlButton", ControlToggleButtonSubline: "ControlInputButtonSubline"});
define("MAF.control.ImageToggleButton", function () {
    return new MAF.Class({
        ClassName: "ImageToggleButton",
        Extends: MAF.control.InputButton,
        config: {styling: !0},
        changeValue: function (a, b) {
            var c = this.getOptions(), d = c.map(function (a) {
                return a.value
            }).indexOf(b), d = -1 == d || d == c.length - 1 ? 0 : d + 1;
            a(c[d].value)
        }
    })
}, {ImageToggleButton: "ControlButton"});
define("MAF.control.TextEntryButton", function () {
    return new MAF.Class({
        ClassName: "ControlTextEntryButton",
        Extends: MAF.control.InputButton,
        Protected: {
            valueDisplayWidth: function (a) {
                a.payload.skip = !0;
                this.parent(a)
            }
        },
        config: {
            showCursor: !0,
            cursorCharacter: "_",
            bulletCharacter: "\u2022",
            secureMask: !1,
            secureMaskType: "mask-submitted",
            keyboard: {layout: getSetting("keyboard") || "alphanumeric"},
            overlayBackgroundColor: "rgba(0,0,0,.7)",
            formBackgroundColor: "black"
        },
        createContent: function () {
            this.content = (new MAF.element.Text({
                ClassName: "ControlTextEntryButtonLabel",
                label: this.config.label
            })).appendTo(this);
            this.valueDisplay = (new MAF.element.Text({
                ClassName: "ControlTextEntryButtonValue",
                styles: {width: this.width - 2 * Theme.getStyles("ControlTextEntryButtonValue", "margin")}
            })).appendTo(this);
            !1 !== this.config.theme && this.valueDisplay.element.addClass("ControlTextEntryButtonValueTheme");
            this.valueDisplay._updateContent = function (a) {
                a = this.getDisplayValue(a.payload.value || "");
                this.valueDisplay.setText(a)
            }.subscribeTo(this, ["onValueInitialized", "onValueChanged", "onValueEdited"],
                this);
            this.valueDisplay.setText(this.getDisplayValue(this.getValue()))
        },
        getDisplayValue: function (a, b) {
            var c = this.config.cursorCharacter, d = this.config.bulletCharacter, e = this.config.secureMask;
            a = b ? a : a || this.getValue();
            if (e && a.length) {
                var f = d.repeat(a.length);
                switch (e) {
                    case "mask-character":
                        c = b ? d.repeat(a.length - 1) + a.charAt(a.length - 1) + c : f;
                        break;
                    case "mask-submitted":
                        c = b ? a + c : f;
                        break;
                    case "mask-all":
                        c = f;
                        break;
                    default:
                        c = f
                }
            } else c = a.length ? b ? a + c : a : b ? c : "";
            return c ? c.htmlEscape() : c
        },
        destroyOverlay: function () {
            this._TextEntryOverlay &&
            (this._TextEntryOverlay.suicide(), delete this._TextEntryOverlay);
            this.focus()
        },
        suicide: function () {
            this._TextEntryOverlay && (this._TextEntryOverlay.suicide(), delete this._TextEntryOverlay);
            this.parent()
        },
        changeValue: function (a, b) {
            this._TextEntryOverlay = (new MAF.control.TextEntryOverlay({creator: this})).appendTo(this.getView())
        }
    })
}, {
    ControlTextEntryButton: {
        renderSkin: function (a, b, c, d, e) {
            b = new Frame;
            e.applyLayer("BaseGlow", b);
            "focused" === a && e.applyLayer("BaseFocus", b);
            e.applyLayer("BaseHighlight", b);
            return b
        }, styles: {width: "inherit", height: 102}
    },
    ControlTextEntryButtonSubline: "ControlTextEntryButton",
    ControlTextEntryButtonLabel: {styles: {fontSize: 20, hOffset: 10, vOffset: 62}},
    ControlTextEntryButtonValue: {
        styles: {
            display: "block",
            margin: 10,
            minHeight: "42px",
            height: "1.9em",
            padding: "3px",
            truncation: "end"
        }
    },
    ControlTextEntryButtonValueTheme: {
        styles: {
            border: "2px solid white",
            borderRadius: "10px",
            backgroundColor: "rgba(150,150,150,.5)",
            opacity: .9
        }
    }
});
define("MAF.control.TextEntryOverlay", function () {
    var a = {}, b = function () {
        this.config.creator.destroyOverlay()
    }, c = function (a) {
        var c = function () {
            a.payload && a.payload.defaultActionCallback && a.payload.defaultActionCallback.call && a.payload.defaultActionCallback()
        };
        "onHideView" !== a.type && a.preventDefault();
        this.config.creator.fire("onCancel", {
            event: a,
            value: this.getValue(),
            cancelCallback: b.bindTo(this),
            defaultActionCallback: c
        }) && (b.call(this), c())
    }, d = function (b) {
        var c = this.inputField.element || !1, d = a[this._classID],
            h = c && c.editable || !1, k = !1, l, p;
        switch (b.type) {
            case "cursormoved":
                l = d.value;
                p = b.payload.cursorPosition || d.cursorPosition;
                break;
            case "valuechanged":
                l = b.payload.value || d.value, p = d.cursorPosition
        }
        k = l;
        l = this.config;
        var n = l.creator, d = n.config.bulletCharacter || l.bulletCharacter;
        l = (n.config.secureMask || l.secureMask) && n.config.secureMaskType || l.secureMaskType;
        n = d.repeat(k.length);
        if (l && n.length)switch (l) {
            case "mask-character":
                n = d.repeat(k.length - 1) + k.charAt(k.length - 1);
                break;
            case "mask-submitted":
                n = k;
                break;
            case "mask-all":
                break;
            default:
                n = k
        } else n = k;
        d = n;
        h ? "valuechanged" === b.type && this.inputField.setText((d || "").htmlEscape()) : (k = this.config.creator.config.cursorCharacter, d = d.substr(0, p) + k + d.substr(p, d.length), this.inputField.setText((d || "").htmlEscape()));
        "valuechanged" === b.type && (this.form.height = this.retrieve("formHeight") + c.getTextBounds().height - c.lineHeight);
        h && isNumber(c.cursor) && "cursormoved" === b.type && (c.cursor = p || 0)
    };
    return new MAF.Class({
        ClassName: "ControlTextEntryOverlay", Extends: MAF.element.Container,
        Protected: {
            initValueManager: function () {
                var b, c = a[this._classID];
                c || (this.config.creator && this.config.creator.config && this.config.creator.config.keyboard && (b = this.config.creator.config.keyboard.maxLength), this.config.keyboard && (b = this.config.keyboard.maxLength), b || (b = this.config.maxLength), c = a[this._classID] = new MAF.keyboard.KeyboardValueManager({maxLength: b}), d.subscribeTo(c, ["cursormoved", "valuechanged"], this))
            }, createContent: function () {
                var c = this.config.creator.getView(), d = a[this._classID];
                this.setStyle("backgroundColor",
                    this.config.creator.config.overlayBackgroundColor);
                c.element.allowNavigation = !1;
                var g = Theme.getStyles("ControlButton");
                Theme.getStyles("ControlTextEntryButtonLabel");
                var h = Theme.get("ControlTextEntryButton").submitButtonPadding || 0, k = Theme.getStyles("ControlTextEntryTextButtonText"), l = this.config.creator.config.submitButtonLabel || widget.getLocalizedString("OK"), p = this.config.creator.config.cancelButtonLabel || widget.getLocalizedString("CANCEL");
                this.form = (new MAF.element.Container({
                    styles: {
                        width: c.width,
                        vAlign: "center", backgroundColor: this.config.creator.config.formBackgroundColor
                    }
                })).appendTo(this);
                var n = Theme.get("ControlTextEntryOverlayClearButton") || {}, q = (new MAF.element.Button({
                    ClassName: "ControlTextEntryOverlayClearButton",
                    content: new MAF.element.Text({
                        label: FontAwesome.get("times"),
                        styles: {width: "100%", height: "100%", anchorStyle: "center"}
                    }),
                    styles: Object.merge({}, n.styling || {}, {marginRight: (c.width - 588) / 2}),
                    events: {
                        onSelect: function () {
                            d.value = ""
                        }
                    }
                })).appendTo(this.form);
                this.inputField = (new MAF.element.TextField({
                    ClassName: "ControlTextEntryButtonValue",
                    label: "",
                    styles: {
                        width: c.width - 80,
                        maxWidth: "508px",
                        height: "auto",
                        vOffset: 0,
                        hOffset: (c.width - 588) / 2,
                        wrap: !0,
                        truncation: null
                    },
                    events: {
                        onCursor: function (a) {
                            d.cursorPosition = a.payload.caret || 0
                        }, onNavigate: function (a) {
                            "right" === a.payload.direction && d.cursorPosition === d.value.length && (a.preventDefault(), q.focus())
                        }.bindTo(this), onKeyDown: function (a) {
                            0 > ["left", "right", "up", "down"].indexOf(a.payload.key) && (a.payload.layout = this.keyboard.config.layout, a.preventDefault(), a.stopPropagation(), d.handleExternalKeyInput(a))
                        }.bindTo(this)
                    }
                })).appendTo(this.form);
                this.inputField.element.addClass("ControlTextEntryButtonValueTheme");
                (new MAF.control.TextButton({
                    label: p,
                    styles: {vAlign: "bottom"},
                    textStyles: k,
                    events: {
                        onSelect: function () {
                            var a = this.getValue(), c = b.bindTo(this);
                            this.config.creator.fire("onCancel", {value: a, cancelCallback: c}) && b.call(this)
                        }.bindTo(this)
                    }
                })).appendTo(this.form);
                g = g.height;
                (new MAF.control.TextButton({
                    label: l, styles: {vAlign: "bottom", vOffset: g + h}, textStyles: k, events: {
                        onSelect: function (a) {
                            var c = {
                                value: d.value, cursorPosition: d.cursorPosition,
                                submitCallback: function () {
                                    this.config.creator.setValue && this.config.creator.setValue(c.value);
                                    b.call(this)
                                }.bindTo(this)
                            };
                            this.config.creator.fire("onSubmit", c) && c.submitCallback()
                        }.bindTo(this)
                    }
                })).appendTo(this.form);
                k = Object.merge(this.config.creator.config.keyboard, {
                    embedded: !1,
                    styles: {vAlign: "bottom", width: c.width, vOffset: 2 * g + 2 * h, controlSize: "standard"},
                    events: {
                        onKeyDown: function (a) {
                            a.preventDefault();
                            a.stopPropagation();
                            a.payload.layout = this.keyboard.config.layout;
                            d.handleExternalKeyInput(a)
                        }.bindTo(this)
                    }
                });
                this.keyboard = (new MAF.control.Keyboard(k)).appendTo(this.form);
                c = (new MAF.element.Text({
                    label: this.config.creator.config.label,
                    styles: {
                        fontSize: 20,
                        width: 578,
                        hOffset: (c.width - 588) / 2 + 10,
                        vAlign: "bottom",
                        vOffset: 2 * g + 3 * h + this.keyboard.height
                    }
                })).appendTo(this.form);
                h = 2 * Theme.getStyles("ControlTextEntryButtonValue", "margin");
                this.form.height = c.outerHeight + this.inputField.height + h;
                this.store("formHeight", this.form.height)
            }, registerHandler: function () {
                this.boundHandler = c.subscribeTo(MAF.application, ["onActivateBackButton",
                    "onActivateSettingsButton", "onHideView"], this)
            }, unregisterHandler: function () {
                this.boundHandler && (this.boundHandler.unsubscribeFrom(MAF.application, ["onActivateBackButton", "onActivateSettingsButton", "onHideView"]), delete this.boundHandler)
            }
        }, config: {maxLength: 255, element: View, creator: null}, initialize: function () {
            this.parent();
            this.show.subscribeTo(this, "onAppend", this);
            this.initValueManager();
            this.createContent();
            var b = a[this._classID];
            b.value = this.config.creator.getValue();
            b.value.length && (b.cursorPosition =
                b.value.length)
        }, getValue: function () {
            return a[this._classID].value
        }, setValue: function (b) {
            a[this._classID].value = b
        }, show: function () {
            this.registerHandler();
            this.keyboard.focus();
            return this
        }, suicide: function () {
            this.unregisterHandler();
            if (this.config.creator) {
                var b = this.config.creator.getView();
                delete this.config.creator;
                b && b.element && (b.element.allowNavigation = !0)
            }
            a[this._classID] && (a[this._classID].suicide(), delete a[this._classID]);
            this.inputField && (this.inputField.suicide(), delete this.inputField);
            this.keyboard && (this.keyboard.suicide(), delete this.keyboard);
            this.form && (this.form.suicide(), delete this.form);
            this.parent()
        }
    })
}, {
    ControlTextEntryOverlay: {styles: {width: "inherit", height: "inherit"}},
    ControlTextEntryOverlayClearButton: {
        styling: {
            border: "2px solid white",
            borderRadius: "10px",
            width: 64,
            height: 44,
            hAlign: "right",
            hOffset: 2,
            vOffset: 9
        },
        normal: {styles: {backgroundColor: Theme.getStyles("BaseGlow", "backgroundColor")}},
        focused: {styles: {backgroundColor: Theme.getStyles("BaseFocus", "backgroundColor")}}
    }
});
define("MAF.control.TabStrip", function () {
    var a = function (a, b) {
        b = b || [];
        var e = Math.max(0, Math.min(a, b.length - 1));
        return b[e]
    }, b = function () {
        this.initTabs(this.config.tabs, this.focusIndex)
    };
    return new MAF.Class({
        ClassName: "ControlTabStrip", Extends: MAF.element.Container, Protected: {
            handleFocusEvent: function (a) {
                var b = this.focusIndex || 0, e = -1 < parseInt(this.activeIndex, 10) ? this.activeIndex : -1;
                switch (a.type) {
                    case "onFocus":
                        b === e && (this.focusIndex = b = 0 < e ? e - 1 : e < this.buttons.length - 1 ? e + 1 : b);
                        this.focusButton(b);
                        break;
                    case "onBlur":
                        this.blurButton(b)
                }
            }, handleSelectEvent: function (a) {
                return this.activateButton(this.focusIndex)
            }, handleNavEvent: function (a) {
                var b = this.focusIndex, e = this.activeIndex, f = !1;
                switch (a.payload.direction) {
                    case "left":
                        b && (f = b - 1);
                        f == e && (f = e ? e - 1 : !1);
                        break;
                    case "right":
                        b < this.buttons.length - 1 && (f = b + 1), f && f == e && (f = e < this.buttons.length - 1 ? e + 1 : !1)
                }
                !1 !== f && (a.preventDefault(), this.focusIndex = f, this.focusButton(f), this.blurButton(b))
            }, focusButton: function (b) {
                if (b = a(b, this.buttons)) {
                    var d = this.body.owner,
                        e = b.element.getBounds().left + d.scrollLeft - 2 * d.element.getBounds().left;
                    b.fire("onFocus");
                    d.scrollLeft = e
                }
            }, blurButton: function (b) {
                (b = a(b, this.buttons)) && b.fire("onBlur")
            }, activateButton: function (a, b) {
                var e = this.buttons[this.activeIndex] || !1, f = this.buttons[a] || !1;
                if (f && f.fire) {
                    var g = this.getButtonConfig(f);
                    this.activeIndex = g.index = a;
                    f.fire("onActive");
                    this.fire("onTabSelect", g)
                }
                e && e.fire && (!b || b && e !== f) && e.fire("onInactive")
            }, generateButtons: function (a, b) {
                for (this.buttons = this.buttons || []; 0 < this.buttons.length;) {
                    var e =
                        this.buttons.pop();
                    e.tabController = null;
                    e.suicide()
                }
                this.buttons.length = 0;
                this.body.empty();
                a = -1 < parseInt(a, 10) ? a : 0;
                for (e = 0; e < a; e++)this.buttons[e] = this.createButton(b).hide().appendTo(this.body);
                return this.buttons.length
            }, createButton: function (a) {
                var b = MAF.control.TabStripButton, e = this.config.buttonClass;
                a = e && e.inheritsFrom && e.inheritsFrom(b) ? new e({noimages: a}) : new b({noimages: a});
                a.tabController = this;
                return a
            }
        }, config: {focus: !0, defaultTab: null}, initialize: function () {
            b.subscribeTo(this, "onAppend",
                this);
            this.handleFocusEvent.subscribeTo(this, ["onFocus", "onBlur"], this);
            this.handleSelectEvent.subscribeTo(this, "onSelect", this);
            this.handleNavEvent.subscribeTo(this, "onNavigate", this);
            this.activeIndex = 0 < this.config.defaultTab ? --this.config.defaultTab : -1;
            this.focusIndex = this.activeIndex + 1;
            this.parent();
            this.body = (new MAF.element.Core({
                ClassName: (this.config.ClassName || this.ClassName) + "Body",
                element: List
            })).appendTo(this)
        }, initTabs: function (a, b) {
            b = b || this.activeIndex + 1;
            if (a) {
                this.body.owner.scrollLeft =
                    0;
                this.activeIndex = 0 < b ? --b : -1;
                this.focusIndex = 1 > this.activeIndex ? 0 : this.activeIndex + 1;
                this.focusIndex === a.length && this.focusIndex--;
                this.config.tabs = a && a.length ? a : [];
                var e = Theme.getStyles(this.ClassName + "Container"), f = e && e.paddingRight || 0, g = !this.config.tabs.filter(function (a) {
                    return a.src || a.source
                }).length;
                this.generateButtons(this.config.tabs.length, g);
                this.buttons.forEach(function (a, b) {
                    var c = Theme.getStyles(a.ClassName);
                    a.setTabContent(this.config.tabs[b], g);
                    a.show();
                    b == this.activeIndex ? (this.fire("onTabInitialized",
                        this.config.tabs[b]), a.fire("onActive")) : a.fire("onInactive");
                    f += a.element.clientWidth + 2 * c.marginLeft + parseInt(c.borderLeft, 10) + parseInt(c.borderRight, 10)
                }, this);
                this.body.width = f;
                this.element.hasFocus && (e = parseInt(this.focusIndex, 10) || 0, this.focusButton(e))
            }
        }, selectTab: function (a) {
            this.activateButton(a, !0)
        }, getActiveIndex: function () {
            return this.activeIndex
        }, getFocusIndex: function () {
            return this.focusIndex
        }, getButtonIndex: function (a) {
            return this.buttons.indexOf(a)
        }, getButtonConfig: function (a) {
            a = this.getButtonIndex(a);
            return -1 < a ? Object.clone(this.config.tabs[a]) : !1
        }, generateStatePacket: function (a) {
            return Object.merge({
                activeIndex: this.activeIndex,
                focusIndex: this.focusIndex,
                focused: this.element.hasFocus
            }, a)
        }, inspectStatePacket: function (a, b) {
            if (!this.config.guid || a && !(this.config.guid in a))return a;
            var e = a && a[this.config.guid], f = typeof e;
            if ("null" == f || "undefined" == f)return a;
            b ? e.focused && this.focus() : "object" === f && ("activeIndex"in e && (this.activeIndex = e.activeIndex), "focusIndex"in e && (this.focusIndex = e.focusIndex));
            return e
        }, suicide: function () {
            if (this.buttons) {
                for (; this.buttons.length;)this.buttons.pop().suicide();
                delete this.buttons
            }
            this.body.suicide();
            delete this.body;
            this.parent()
        }
    })
}, {
    ControlTabStrip: {styles: {borderBottom: "2px solid grey", width: "inherit", height: 51}},
    ControlTabStripBody: {styles: {height: "inherit"}}
});
define("MAF.control.TabStripButton", function () {
    return new MAF.Class({
        ClassName: "ControlTabStripButton",
        Extends: MAF.element.Container,
        config: {element: Item},
        Protected: {
            onThemeNeeded: function (a) {
                if (!a.defaultPrevented) {
                    var b = this.element;
                    switch (a.type) {
                        case "onFocus":
                            b.addClass("focused");
                            break;
                        case "onBlur":
                            b.removeClass("focused");
                            break;
                        case "onActive":
                            b.addClass("selected");
                            break;
                        case "onInactive":
                            b.removeClass("selected")
                    }
                }
            }, getTabController: function () {
                return this.tabController
            }
        },
        initialize: function () {
            this.onThemeNeeded.subscribeTo(this,
                ["onAppend", "onFocus", "onBlur", "onActive", "onInactive"], this);
            this.parent();
            this.config.noimages || (this.image = (new MAF.element.Image({ClassName: this.ClassName + "Image"})).appendTo(this));
            this.content = (new MAF.element.Text({ClassName: this.ClassName + "Text"})).appendTo(this)
        },
        getButtonIndex: function () {
            return this.getTabController().getButtonIndex(this)
        },
        setTabContent: function (a, b) {
            this.content.setText(a.label);
            if (this.image && (a.src || a.source)) {
                var c = 2 * Theme.getStyles(this.ClassName + "Image", "marginTop"),
                    d = Theme.getStyles(this.ClassName + "Text", "paddingLeft"), c = this.height - c;
                this.image.width = this.image.height = c;
                this.image.setSources(a);
                this.content.setStyle("paddingLeft", d + c + d / 2)
            }
        },
        adjustTabContent: emptyFn,
        suicide: function () {
            delete this.tabController;
            this.image && (this.image.suicide(), delete this.image);
            this.parent()
        }
    })
}, {
    ControlTabStripButton: {
        normal: {
            styles: {
                backgroundColor: Theme.getStyles("BaseGlow", "backgroundColor"),
                borderTop: "2px solid white",
                borderLeft: "2px solid white",
                borderRight: "2px solid white",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                marginLeft: 1,
                height: "inherit",
                marginRight: 1
            }
        },
        selected: {styles: {backgroundColor: Theme.getStyles("BaseActive", "backgroundColor")}},
        focused: {styles: {backgroundColor: Theme.getStyles("BaseFocus", "backgroundColor")}}
    },
    ControlTabStripButtonText: {
        styles: {
            position: "relative",
            fontSize: 20,
            fontWeight: "bold",
            paddingLeft: 12,
            paddingRight: 12,
            height: "inherit",
            anchorStyle: "center"
        }
    },
    ControlTabStripButtonImage: {styles: {marginLeft: 12, marginTop: 4}}
});
define("MAF.control.TabPipeButton", function () {
    return new MAF.Class({ClassName: "ControlTabPipeButton", Extends: MAF.control.TabStripButton})
}, {
    ControlTabPipeButton: "ControlTabStripButton",
    ControlTabPipeButtonText: "ControlTabStripButtonText",
    ControlTabPipeButtonImage: "ControlTabStripButtonImage"
});
define("MAF.control.TabPipe", function () {
    return new MAF.Class({
        ClassName: "ControlTabPipe",
        Extends: MAF.control.TabStrip,
        config: {buttonClass: MAF.control.TabPipeButton},
        initialize: function () {
            this.parent();
            this.body.appendTo((new MAF.element.Container({ClassName: "ControlTabPipeContainer"})).appendTo(this))
        }
    })
}, {
    ControlTabPipe: {styles: {borderBottom: "2px solid grey", width: "inherit", height: "57px"}},
    ControlTabPipeBody: "ControlTabStripBody",
    ControlTabPipeContainer: {
        styles: {
            width: "100%", height: "100%", paddingTop: 6,
            paddingLeft: 18, paddingRight: 18
        }
    }
});
define("MAF.control.PageIndicator", function () {
    return new MAF.Class({
        ClassName: "ControlPageIndicator", Extends: MAF.control.Button, Protected: {
            dispatchEvents: function (a, b) {
                switch (a.type) {
                    case "navigate":
                        if (a.detail && a.detail.direction && ("left" === a.detail.direction || "right" === a.detail.direction))return a.preventDefault(), this.shiftSource(a.detail.direction)
                }
                this.parent(a, b)
            }, createContent: function () {
                this.content = (new MAF.element.Text({ClassName: this.ClassName + "TextLink"})).appendTo(this)
            }, buildDots: function (a,
                                    b, c) {
                if (this.config.updateDots && this.config.updateDots.call)return this.config.updateDots.call(this, a, b, c);
                c = "";
                for (var d = 0; d < b; d++)c += FontAwesome.get(a === d ? "circle-o" : "circle") + " ";
                return c.trim()
            }, buildText: function (a, b, c) {
                return this.config.updateText && this.config.updateText.call ? this.config.updateText.call(this, a, b, c) : FontAwesome.get("caret-left") + " " + widget.getLocalizedString("PAGE", [parseInt(a, 10) + 1, b]) + " " + FontAwesome.get("caret-right")
            }, onSourceUpdated: function (a) {
                return this.update(a.payload)
            }
        },
        config: {threshold: 0, arrowPadding: 6, imageSources: null, autoDisableWhenEmpty: !0}, initialize: function () {
            this.parent();
            var a = this.config.sourceElement || this.config.source;
            a && this.attachToSource(a);
            this.config.source = null;
            delete this.config.source;
            this.config.sourceElement = null;
            delete this.config.sourceElement
        }, attachToSource: function (a) {
            if (!a || a === this.source)return this.update();
            this.source = a;
            this.onSourceUpdated.subscribeTo(this.source, "onStateUpdated", this);
            return this.update()
        }, getSourceCurrentPage: function () {
            return this.source ?
                this.source.getCurrentPage() : 1
        }, getSourcePageCount: function () {
            return this.source ? this.source.getPageCount() : 1
        }, getSourceCarousel: function () {
            return this.source ? this.source.config.carousel : !1
        }, update: function (a) {
            var b = a && a.currentPage ? a.currentPage : this.getSourceCurrentPage() || 0, c = a && a.pageCount ? a.pageCount : this.getSourcePageCount() || 1, d = c < (parseInt(this.config.threshold, 10) || 0);
            this.content.setText((d ? this.buildDots : this.buildText).call(this, b, c, a));
            d ? this.content.setStyle("fontSize", "66%") : this.content.setStyle("fontSize",
                null);
            !1 === this.config.focus || 0 === c ? this.element.wantsFocus = !1 : 0 < c && (this.element.wantsFocus = !0);
            this.config.autoDisableWhenEmpty && this.setDisabled(2 > c);
            return this
        }, shiftSource: function (a) {
            this.source.shift(a)
        }, suicide: function () {
            delete this.source;
            this.parent()
        }
    })
}, {
    ControlPageIndicator: {
        renderSkin: function (a, b, c, d, e) {
            b = new Frame;
            e.applyLayer("BaseGlow", b);
            "focused" === a && e.applyLayer("BaseFocus", b);
            e.applyLayer("BaseHighlight", b);
            return b
        }, styles: {width: "inherit", height: "38px"}
    }, ControlPageIndicatorTextLink: {
        styles: {
            width: "inherit",
            height: "inherit", anchorStyle: "center"
        }
    }
});
define("MAF.control.ScrollIndicator", function () {
    return new MAF.Class({
        ClassName: "ControlScrollIndicator",
        Extends: MAF.control.Button,
        Protected: {
            dispatchEvents: function (a, b) {
                switch (a.type) {
                    case "navigate":
                        var c = a.detail && a.detail.direction;
                        if ("up" === c || "down" === c) {
                            var d = this.getSourceCurrentPage(), e = this.getSourcePageCount() - 1;
                            if ("up" === c && 0 === d || "down" === c && d === e)break;
                            a.preventDefault();
                            return this.shiftSource("up" === a.detail.direction ? "left" : "right")
                        }
                }
                this.parent(a, b)
            }, createContent: function () {
                this.content =
                    (new MAF.element.Container({
                        ClassName: this.ClassName + "Scroll",
                        styles: {visible: !1}
                    })).appendTo(this)
            }, onSourceUpdated: function (a) {
                return this.update(a.payload)
            }
        },
        config: {autoHideWhenEmpty: !0, autoDisableWhenEmpty: !0, animation: {duration: .3}},
        initialize: function () {
            this.parent();
            var a = this.config.sourceElement || this.config.source;
            a && this.attachToSource(a);
            this.config.source = null;
            delete this.config.source;
            this.config.sourceElement = null;
            delete this.config.sourceElement
        },
        attachToSource: function (a) {
            if (!a ||
                a === this.source)return this.update();
            this.source = a;
            this.onSourceUpdated.subscribeTo(this.source, "onStateUpdated", this);
            return this.update()
        },
        getSourceCurrentPage: function () {
            return this.source ? this.source.getCurrentPage() : 1
        },
        getSourcePageCount: function () {
            return this.source ? this.source.getPageCount() : 1
        },
        getSourceCarousel: function () {
            return this.source ? this.source.config.carousel : !1
        },
        update: function (a) {
            var b = a && a.currentPage ? a.currentPage : this.getSourceCurrentPage() || 0;
            a = a && a.pageCount ? a.pageCount : this.getSourcePageCount() ||
            1;
            var c = 1 / a * this.height, b = c * b;
            if (this.content.height !== c || this.content.retrieve("offset") !== b)return this.config.autoDisableWhenEmpty && this.setDisabled(2 > a), this.config.autoHideWhenEmpty && (this.content.visible = !(2 > a)), this.content.height = c, this.content.retrieve("offset") !== b && (this.content.store("offset", b), this.content.animate({
                properties: ["top"],
                duration: this.config.animation && ("number" === typeOf(this.config.animation.duration) ? this.config.animation.duration : .3),
                top: b
            })), !1 === this.config.focus ||
            0 === a ? this.element.wantsFocus = !1 : 0 < a && (this.element.wantsFocus = !0), this
        },
        updateAnimation: function (a) {
            this.config.animation = "object" === typeOf(a) ? Object.merge(this.config.animation, a) : this.config.animation
        },
        shiftSource: function (a) {
            this.source.shift(a)
        },
        suicide: function () {
            delete this.source;
            this.parent()
        }
    })
}, {
    ControlScrollIndicator: {
        renderSkin: function (a, b, c, d, e) {
            b = new Frame;
            e.applyLayer("BaseGlow", b);
            "focused" === a && e.applyLayer("BaseFocus", b);
            e.applyLayer("BaseHighlight", b);
            return b
        }, styles: {
            width: "7px",
            height: "inherit", borderRadius: "3px"
        }
    },
    ControlScrollIndicatorScroll: {
        styles: {
            width: "inherit",
            height: "inherit",
            backgroundColor: "rgba(255,255,255,.9)",
            borderRadius: "inherit"
        }
    }
});
define("MAF.control.SingleTab", function () {
    return new MAF.Class({
        ClassName: "ControlSingleTab", Extends: MAF.control.Button, Protected: {
            dispatchEvents: function (a, b) {
                switch (a.type) {
                    case "navigate":
                        if (a.detail && a.detail.direction)switch (a.detail.direction) {
                            case "left":
                            case "right":
                                a.preventDefault(), this.shiftSource(a.detail.direction)
                        }
                }
                this.parent(a, b)
            }, createContent: function () {
                this.text = (new MAF.element.Text({
                    ClassName: (this.config.ClassName || this.ClassName) + "Text", styles: Object.merge({
                        width: this.width -
                        40,
                        height: this.height,
                        hOffset: 20,
                        anchorStyle: "center",
                        truncation: "SingleTab" === this.ClassName ? "end" : null
                    }, this.config.textStyles || {})
                })).appendTo(this);
                var a = this.getOptions();
                this.setValue(this.config.value || a && 0 < a.length ? a[0].value : "");
                delete this.config.value
            }
        }, config: {carousel: !1}, initialize: function () {
            this.parent();
            this.config.options && (this.setOptions(this.config.options), delete this.config.options)
        }, getValue: function () {
            return String(this.retrieve("value") || "")
        }, setValue: function (a) {
            var b = void 0 ===
                this.retrieve("value");
            a = void 0 === a ? "" : String(a);
            if ((this.retrieve("value") || "") === a && !b)return "";
            this.store("value", a);
            this.fire(b ? "onTabInitialized" : "onTabChanged", {value: a, index: this.getActiveIndex()});
            this.update();
            return this.getValue()
        }, getDisplayValue: function (a) {
            var b = a = a || this.getValue();
            this.getOptions().forEach(function (c) {
                c.value == a && (b = c.label)
            });
            return b
        }, initTabs: function (a, b, c) {
            this.setOptions(a, b, c);
            (0 === this.getValue().length || c) && this.setValue(this.config.value || this.getOptions()[0].value)
        },
        setOptions: function (a, b, c) {
            a = [].concat(a);
            a = a.map(function (a, c) {
                var f = "object" == typeOf(a), g = b && b.length || 0;
                return a ? {
                    value: f && "value"in a ? String(a.value) : String(a),
                    label: g > c ? b[c] : f && "label"in a ? a.label : a
                } : a
            });
            this.eliminate("value");
            this.store("options", a);
            this.fire("onOptionsChanged", {options: this.getOptions()})
        }, getOptions: function () {
            return this.retrieve("options") || []
        }, getOptionValues: function () {
            return this.getOptions().map(function (a) {
                return a.value
            })
        }, getOptionLabels: function () {
            return this.getOptions().map(function (a) {
                return a.label
            })
        },
        getActiveIndex: function () {
            var a = this.getOptions(), b = this.getValue(), a = a.map(function (a) {
                return a.value
            }).indexOf(b);
            return 0 > a ? 0 : a
        }, shiftSource: function (a) {
            var b = this.getOptions(), c = !0 === this.config.carousel, d = this.getActiveIndex();
            if (!(2 > b.length)) {
                switch (a) {
                    case "left":
                        d = 0 === d ? c ? b.length - 1 : d : d - 1;
                        break;
                    case "right":
                        d = d === b.length - 1 ? c ? 0 : d : d + 1
                }
                this.setValue(b[d].value)
            }
        }, update: function (a) {
            !0 === a && (a = this.getOptions(), this.setValue(a[0].value));
            a = "";
            a = this.getDisplayValue();
            var b = this.width - 160;
            this.text.textWidth >
            b && (b = Math.ceil(b / this.text.textWidth * a.length), a = a.truncate(b));
            a = this.config.updateText && this.config.updateText.call ? this.config.updateText.call(this, a) : FontAwesome.get("caret-left") + " " + a.stripTags() + " " + FontAwesome.get("caret-right");
            this.text.setText(a)
        }, suicide: function () {
            this.text.suicide();
            delete this.text;
            this.parent()
        }
    })
}, {ControlSingleTab: "ControlPageIndicator"});
define("MAF.control.FixedTab", function () {
    return new MAF.Class({
        ClassName: "ControlFixedTab", Extends: MAF.control.SingleTab, Protected: {
            createContent: function () {
                this.right = (new MAF.element.Text({
                    styles: Object.merge({
                        height: this.height,
                        anchorStyle: "leftCenter",
                        color: "rgba(255,255,255,.7)"
                    }, this.config.textStyles || {})
                })).appendTo(this);
                this.parent()
            }
        }, config: {optionsPadding: "    "}, initialize: function () {
            this.parent();
            this.textPadding = this.config.optionsPadding.replace(/(?:(?:^ | $)|( ) )/gm, "&nbsp;")
        },
        update: function (a) {
            this.parent(a);
            a = this.getOptions();
            var b = a.map(function (a) {
                return a.value
            }).indexOf(this.getValue());
            this.text.setStyles({width: null, hOffset: 10});
            var c = this.text.outerWidth + 10;
            this.right.setStyles({width: this.width - c - 10, hOffset: c});
            var d = "";
            a && (a.forEach(function (a, c) {
                c > b && (d += a.label + this.textPadding)
            }, this), a.forEach(function (a, c) {
                c < b && (d += a.label + this.textPadding)
            }, this));
            this.right.setText(d)
        }, suicide: function () {
            delete this.textPadding;
            this.right.suicide();
            delete this.right;
            this.parent()
        }
    })
}, {ControlFixedTab: "ControlPageIndicator"});
define("MAF.control.MetadataDisplay", function () {
    return new MAF.Class({
        ClassName: "ControlMetadataDisplay", Extends: MAF.control.Button, Protected: {
            createContent: function () {
                this.content = (new MAF.element.Text({
                    ClassName: this.ClassName + "Text",
                    styles: this.config.textStyles || {}
                })).appendTo(this)
            }, updateContent: function (a) {
                var b = a && -1 < parseInt(a.startIndex, 10) ? a.startIndex : this.source.getStartIndex();
                a = a && -1 < parseInt(a.focusIndex, 10) ? a.focusIndex : this.source.getFocusIndex();
                b = -1 < parseInt(b, 10) && -1 < parseInt(a,
                    10) ? b + a : !1;
                (b = !1 !== b && this.getSourceDataItem(b)) && (a = this.config.updateMethod || this.updateMethod) && a.call && a.call(this, b)
            }, updateMethod: function (a) {
                var b = "";
                switch (typeOf(a)) {
                    case "string":
                        b = a;
                        break;
                    case "object":
                        var c = this.config.metadataMap;
                        c ? b = a[c.label || c.text] : "label"in a ? b = a.label : "text"in a && (b = a.text)
                }
                this.setText(b)
            }, onSourceUpdated: function (a) {
                switch (a.type) {
                    case "onStateUpdated":
                        return this.updateContent(a.payload);
                    case "onFocus":
                        this.fire("onFocus");
                        this.content.thaw();
                        break;
                    case "onBlur":
                        this.fire("onBlur"),
                            this.content.freeze()
                }
            }
        }, config: {focus: !1}, initialize: function () {
            this.parent();
            var a = this.config.sourceElement || this.config.source;
            a && this.attachToSource(a);
            this.config.source = null;
            delete this.config.source;
            this.config.sourceElement = null;
            delete this.config.sourceElement
        }, attachToSource: function (a) {
            if (a === this.source)return this.update();
            this.source = a;
            this.onSourceUpdated.subscribeTo(this.source, ["onStateUpdated", "onFocus", "onBlur"], this);
            return this.updateContent()
        }, getSourceStartIndex: function () {
            return this.source &&
                this.source.getStartIndex()
        }, getSourceFocusIndex: function () {
            return this.source && this.source.getFocusIndex()
        }, getSourceDataItem: function (a) {
            return this.source && this.source.getDataItem(a)
        }, setText: function (a) {
            this.content.setText(a || "")
        }, suicide: function () {
            delete this.source;
            this.parent()
        }
    })
}, {
    ControlMetadataDisplay: {styles: {width: "inherit", height: 40}},
    ControlMetadataDisplayText: {
        styles: {
            width: "100%",
            height: "inherit",
            paddingLeft: 5,
            paddingRight: 5,
            anchorStyle: "center",
            truncation: "end"
        }
    }
});
define("MAF.control.Grid", function () {
    return new MAF.Class({
        ClassName: "ControlGrid", Extends: MAF.element.Grid, Protected: {
            onThemeNeeded: function (a) {
                if (!a.defaultPrevented)switch (a.type) {
                    case "onFocus":
                        this.renderSkin("focused");
                        break;
                    case "onBlur":
                    case "onAppend":
                        this.renderSkin("normal")
                }
            }
        }, initialize: function () {
            !1 !== this.config.theme && this.onThemeNeeded.subscribeTo(this, ["onAppend", "onFocus", "onBlur"], this);
            this.parent()
        }
    })
}, {});
define("MAF.control.GridCell", function () {
    return new MAF.Class({
        ClassName: "ControlGridCell",
        Extends: MAF.element.GridCell,
        Protected: {
            onThemeNeeded: function (a) {
                if (!a.defaultPrevented) {
                    var b = this.getCellCoordinates();
                    switch (a.type) {
                        case "onFocus":
                            this.renderSkin("focused", b);
                            break;
                        case "onBlur":
                        case "onAppend":
                            this.renderSkin("normal", b)
                    }
                }
            }
        },
        initialize: function () {
            !1 !== this.config.theme && this.onThemeNeeded.subscribeTo(this, ["onAppend", "onFocus", "onBlur"], this);
            this.parent()
        }
    })
}, {
    ControlGridCell: {
        renderSkin: function (a,
                              b, c, d, e) {
            b = new Frame;
            e.applyLayer("BaseGlow", b);
            "focused" === a && e.applyLayer("BaseFocus", b);
            e.applyLayer("BaseHighlight", b);
            return b
        }
    }
});
define("MAF.control.PhotoGridCell", function () {
    var a = function () {
        var a = Math.min(this.width, this.height) - 2 * (this.config.cellPadding || 0);
        this.photo.aspectSizeMax(a);
        this.photo.show()
    };
    return new MAF.Class({
        ClassName: "ControlPhotoGridCell",
        Extends: MAF.control.GridCell,
        config: {cellPadding: 16},
        initialize: function () {
            this.parent();
            this.photo = (new MAF.element.Image({
                ClassName: "ControlPhotoHolderImage",
                hideWhileLoading: !0,
                autoShow: !1,
                styles: {hAlign: "center", vAlign: "center"}
            })).appendTo(this);
            a.subscribeTo(this.photo,
                "onLoaded", this);
            this.photo.setSources(this.config)
        },
        setSources: function (a) {
            return this.photo.setSources(a)
        },
        setSource: function (a) {
            return this.photo.setSource(a)
        }
    })
}, {ControlPhotoGridCell: "ControlGridCell", ControlPhotoHolderImage: {styles: {border: "2px solid white"}}});
define("MAF.control.MediaTransportOverlay", function () {
    var a = {};
    return new MAF.Class({
        Extends: MAF.element.Container,
        ClassName: "ControlMediaTransportOverlay",
        config: {
            buttonOrder: "backwardseekButton rewindButton playButton forwardButton forwardseekButton stopButton infoButton resizeButton".split(" "),
            buttonOffset: 10,
            buttonSpacing: 6,
            fadeTimeout: 12,
            playButton: !0,
            stopButton: !0,
            rewindButton: !0,
            forwardButton: !0,
            forwardseekButton: !1,
            backwardseekButton: !1,
            infoButton: !1,
            resizeButton: !1
        },
        Protected: {
            onAppended: function (b) {
                this.createContent();
                this.viewEventHandler.subscribeTo(this.getView(), ["onUpdateView", "onHideView", "onDestroyView"], this);
                a[this._classID].boundMediaUpdated = this.onMediaUpdated.subscribeTo(MAF.mediaplayer, ["onTimeIndexChanged", "onStateChange", "onPlayPlaylistEntry"], this)
            }, createTimer: function () {
                this.overlayTimer = new Timer;
                this.overlayTimer.ticking = !1;
                this.overlayTimer.interval = this.config.fadeTimeout;
                this.overlayTimer.onTimerFired = this.overlayFade.bindTo(this)
            }, overlayFade: function () {
                this.overlayTimer && (this.overlayTimer.ticking = !1);
                this.fire("onTransportOverlayHide") && this.hide()
            }, resetOverlayTimer: function (a) {
                var c = MAF.mediaplayer.constants.states;
                [c.PAUSE, c.STOP, c.REWIND].contains(a) ? (this.overlayTimer && (this.overlayTimer.ticking = !1), this.fire("onTransportOverlayShow") && this.show()) : this.overlayTimer && (this.overlayTimer.ticking && (this.overlayTimer.ticking = !1), this.overlayTimer.ticking = !0)
            }, viewEventHandler: function (b) {
                switch (b.type) {
                    case "onUpdateView":
                        this.registerKeyHandlers();
                        break;
                    case "onHideView":
                        this.unregisterKeyHandlers();
                        break;
                    case "onDestroyView":
                        this.unregisterKeyHandlers(), a[this._classID].boundMediaUpdated.unsubscribeFrom(MAF.mediaplayer, ["onTimeIndexChanged", "onStateChange", "onPlayPlaylistEntry"]), a[this._classID].boundMediaUpdated = !1
                }
            }, registerKeyHandlers: function () {
                a[this._classID].boundKeypressHandler || (a[this._classID].boundKeypressHandler = this.onKeyPressHandler.subscribeTo(MAF.application, ["onWidgetKeyPress"], this))
            }, unregisterKeyHandlers: function () {
                a[this._classID].boundKeypressHandler && (a[this._classID].boundKeypressHandler.unsubscribeFrom(MAF.application,
                    ["onWidgetKeyPress"]), a[this._classID].boundKeypressHandler = !1)
            }, onMediaUpdated: function (b) {
                switch (b.type) {
                    case "onTimeIndexChanged":
                        var c = MAF.mediaplayer.constants.states;
                        [c.PLAY, c.FORWARD, c.REWIND].contains(MAF.mediaplayer.player.currentPlayerState) && (this.updateTimeIndexDisplay(), this.moveProgressBar(Math.round(Math.ceil(b.payload.timeIndex) / Math.ceil(b.payload.duration) * a[this._classID].steps)));
                        break;
                    case "onStateChange":
                        this.updateState(b.payload.newState);
                        this.resetOverlayTimer(b.payload.newState);
                        break;
                    case "onPlayPlaylistEntry":
                        this.resetState()
                }
            }, onKeyPressHandler: function (a) {
                this.visible || (MAF.mediaplayer.player.currentPlayerState === MAF.mediaplayer.constants.states.PLAY && "back" !== a.payload.key && "playpause" !== a.payload.key && "stop" !== a.payload.key && "forward" !== a.payload.key && "rewind" !== a.payload.key && a.stop(), this.fire("onTransportOverlayShow") && this.show());
                this.resetOverlayTimer(MAF.mediaplayer.player.currentPlayerState)
            }, createContent: function () {
                this.controls = {};
                this.body = (new MAF.element.Container({
                    ClassName: this.ClassName +
                    "Body", styles: Theme.getStyles(this.ClassName + "Body", "normal")
                })).appendTo(this);
                this.progressBar = (new MAF.element.Container({ClassName: this.ClassName + "ProgressBar"})).appendTo(this.body);
                this.controls.troth = (new MAF.element.Container({ClassName: this.ClassName + "ProgressBarTroth"})).appendTo(this.progressBar);
                this.controlBar = (new MAF.element.Container({
                    ClassName: this.ClassName + "ControlBar",
                    styles: Theme.getStyles(this.ClassName + "ControlBar", "normal")
                })).appendTo(this.body);
                this.createControls();
                this.createIntervalText()
            },
            createControls: function () {
                var a = 0, c = Theme.get("ControlMediaTransportOverlay"), d = Theme.getStyles(this.ClassName + "Button", "normal").width + this.config.buttonSpacing;
                this.config.buttonOrder.forEach(function (e, f) {
                    this.config[e] && (this.controls[e] = (new MAF.control.Button({
                        ClassName: this.ClassName + "Button",
                        content: new MAF.element.Text({
                            label: FontAwesome.get(c.icons[e]),
                            styles: {width: "inherit", height: "inherit", anchorStyle: "center"}
                        }),
                        styles: {hOffset: a * d + this.config.buttonOffset, vAlign: "center"},
                        events: {
                            onSelect: function (a) {
                                if (this.visible)switch (a =
                                    e.replace("Button", ""), a) {
                                    case "play":
                                        switch (MAF.mediaplayer.player.currentPlayerState) {
                                            case MAF.mediaplayer.constants.states.PLAY:
                                                this.fire("onTransportButtonPress", {
                                                    button: a,
                                                    action: "pause"
                                                }) && MAF.mediaplayer.control.pause();
                                                break;
                                            default:
                                                this.fire("onTransportButtonPress", {
                                                    button: a,
                                                    action: "play"
                                                }) && MAF.mediaplayer.control.play()
                                        }
                                        break;
                                    case "stop":
                                        this.fire("onTransportButtonPress", {
                                            button: a,
                                            action: a
                                        }) && MAF.mediaplayer.control.stop();
                                        break;
                                    case "rewind":
                                        this.fire("onTransportButtonPress", {
                                            button: a,
                                            action: a
                                        }) && MAF.mediaplayer.control.rewind();
                                        break;
                                    case "forward":
                                        this.fire("onTransportButtonPress", {
                                            button: a,
                                            action: a
                                        }) && MAF.mediaplayer.control.forward();
                                        break;
                                    default:
                                        this.fire("onTransportButtonPress", {
                                            button: a,
                                            action: null
                                        }) && log("no default handler for " + a)
                                }
                            }.bindTo(this)
                        }
                    })).appendTo(this.controlBar), a++)
                }, this);
                this.body.setStyle("width", 2 * this.config.buttonOffset + a * d)
            }, createIntervalText: function () {
                this.controls.intervalText = (new MAF.element.Text({
                    label: " 00:00:00", styles: Object.merge({
                        width: 150,
                        hOffset: this.config.buttonOffset, vOffset: this.config.buttonSpacing
                    }, Theme.getStyles(this.ClassName + "IntervalText"))
                })).appendTo(this.controlBar);
                this.controls.durationText = (new MAF.element.Text({
                    label: " 00:00:00",
                    styles: Object.merge({
                        width: 150,
                        hAlign: "right",
                        hOffset: this.config.buttonOffset,
                        vOffset: this.config.buttonSpacing,
                        anchorStyle: "right"
                    }, Theme.getStyles(this.ClassName + "IntervalText"))
                })).appendTo(this.controlBar)
            }, updateState: function (a) {
                var c = MAF.mediaplayer.constants.states, d = Theme.get("ControlMediaTransportOverlay");
                switch (a) {
                    case c.PAUSE:
                        d.icons && d.icons.playButton ? this.controls.playButton.content.setText(FontAwesome.get(d.icons.playButton)) : this.controls.playButton.content.setSource(d.sources.playButton);
                        this.overlayTimer && (this.overlayTimer.ticking = !1);
                        !this.visible && this.fire("onTransportOverlayShow") && this.show();
                        break;
                    case c.PLAY:
                    case c.BUFFERING:
                        d.icons && d.icons.playButton ? this.controls.playButton.content.setText(FontAwesome.get(d.icons.pauseButton)) : this.controls.playButton.content.setSource(d.sources.pauseButton);
                        break;
                    case c.STOP:
                        this.resetState();
                    default:
                        d.icons && d.icons.playButton ? this.controls.playButton.content.setText(FontAwesome.get(d.icons.playButton)) : this.controls.playButton.content.setSource(d.sources.playButton)
                }
            }, updateTimeIndexDisplay: function (a) {
                (this.visible || a) && MAF.mediaplayer.player.currentTimeIndex <= MAF.mediaplayer.player.currentMediaDuration && (this.controls.intervalText.setText(this.formatTime(MAF.mediaplayer.player.currentTimeIndex)), this.controls.durationText.setText(this.formatTime(MAF.mediaplayer.player.currentMediaDuration)))
            },
            moveProgressBar: function (b) {
                this.controls.troth.setStyles({
                    width: Math.round(this.progressBar.width / a[this._classID].steps * b),
                    hOffset: 0
                })
            }
        },
        initialize: function () {
            this.parent();
            a[this._classID] = {};
            a[this._classID].steps = 180;
            this.createTimer();
            this.onAppended.subscribeOnce(this, ["onAppend"], this)
        },
        focus: function () {
            if (this.controls && this.controls.playButton)return this.controls.playButton.focus()
        },
        show: function () {
            this.updateTimeIndexDisplay(!0);
            this.parent()
        },
        hide: function () {
            this.parent()
        },
        resetState: function () {
            this.fire("onTransportOverlayShow") &&
            this.show();
            this.updateState(MAF.mediaplayer.constants.states.PAUSE);
            this.updateTimeIndexDisplay(!0);
            this.moveProgressBar(0);
            this.focus()
        },
        formatTime: function (a) {
            return a ? numeral(Math.floor(a)).format("00:00:00") : "00:00:00"
        },
        suicide: function () {
            this.controls && (Object.forEach(this.controls, function (a, c) {
                c && c.suicide && (delete this.controls[a], c.suicide())
            }, this), delete this.controls);
            this.controlBar && (this.controlBar.suicide(), delete this.controlBar);
            this.progressBar && (this.progressBar.suicide(), delete this.progressBar);
            this.body && (this.body.suicide(), delete this.body);
            this.overlayTimer && (this.overlayTimer.ticking = !1, this.overlayTimer.onTimerFired = null, delete this.overlayTimer);
            a[this._classID] = null;
            delete a[this._classID];
            this.parent()
        }
    })
}, {
    ControlMediaTransportOverlay: {
        icons: {
            playButton: "play",
            pauseButton: "pause",
            stopButton: "stop",
            rewindButton: "backward",
            forwardButton: "forward",
            forwardseekButton: "fast-forward",
            backwardseekButton: "fast-backward",
            infoButton: "info",
            resizeButton: "expand"
        }, styles: {width: "inherit", height: "inherit"}
    },
    ControlMediaTransportOverlayBody: {
        styles: {
            backgroundColor: "rgba(0,0,0,.8)",
            hAlign: "center",
            vAlign: "bottom",
            vOffset: 200,
            width: 10,
            height: 140
        }
    },
    ControlMediaTransportOverlayProgressBar: {
        styles: {
            backgroundColor: "darkgrey",
            borderTop: "2px solid grey",
            width: "inherit",
            height: "10%"
        }
    },
    ControlMediaTransportOverlayControlBar: {styles: {width: "inherit", height: "90%", vAlign: "bottom"}},
    ControlMediaTransportOverlayButton: {
        normal: {styles: {color: "white", fontSize: 40, height: 66, width: 85}}, focused: {
            styles: {
                color: Theme.getStyles("BaseFocus",
                    "backgroundColor")
            }
        }, disabled: {styles: {color: "grey"}}
    },
    ControlMediaTransportOverlayProgressBarTroth: {
        styles: {
            backgroundColor: "darkred",
            borderTop: "2px solid red",
            height: "100%",
            width: 1,
            hOffset: -1
        }
    },
    ControlMediaTransportOverlayIntervalText: {styles: {minWidth: 150, height: "1.3em", fontSize: 22}}
});
define("MAF.dialogs.BaseDialogImplementation", function () {
    var a = {};
    return new MAF.Class({
        ClassName: "BaseDialogImplementation", Implements: [Library.Storage], Protected: {
            removeHandler: function () {
                var b = a[this._classID];
                b && (b.unsubscribeFrom(MAF.application, ["onDialogDone", "onDialogCancelled", "onHideView"]), delete a[this._classID])
            }
        }, config: {focusOnCompletion: null, isModal: !1}, initialize: function () {
            this.store("key", md5(this._classID))
        }, show: function () {
            if (MAF.application.isSidebarLoaded())return this.store("viewId",
                MAF.application.getCurrentViewId()), a[this._classID] = this.dispatchEvents.subscribeTo(MAF.application, ["onDialogDone", "onDialogCancelled", "onHideView"], this), MAF.HostEventManager.send("showDialog", this.getDialogConfig()), this
        }, hide: function () {
            this.removeHandler();
            MAF.HostEventManager.send("hideDialog", this.getDialogConfig());
            return this
        }, dispatchEvents: function (a) {
            "onHideView" == a.type ? this.retrieve("viewId") === a.payload.viewId && this.removeHandler() : a.payload.key === this.retrieve("key") && (this.removeHandler(),
            "onDialogCancelled" === a.type && (a.payload.cancelled = !0), this.config.focusOnCompletion && this.config.focusOnCompletion.focus && this.config.focusOnCompletion.focus.call && (this.config.focusOnCompletion.focus(), delete this.config.focusOnCompletion), this.handleCallback(a.payload))
        }, getDialogConfig: function () {
        }, handleCallback: function (a) {
        }
    })
});
define("MAF.dialogs.Alert", function () {
    return new MAF.Class({
        ClassName: "AlertDialog",
        Extends: MAF.dialogs.BaseDialogImplementation,
        config: {title: "", message: "", buttons: [], cancelCallback: null},
        initialize: function () {
            this.parent();
            var a = [], b = {};
            if (this.config.buttons && this.config.buttons instanceof Array)[].concat(this.config.buttons).forEach(function (c) {
                var d = md5(c.label + Date.now());
                c.callback && c.callback.call && this.store(d, c.callback);
                a.push({value: d, label: c.label});
                b[d] = c
            }, this), this.store("configs",
                b), this.store("buttons", a); else throw Error("Can't create an alert without any buttons");
            delete this.config.buttons
        },
        getDialogConfig: function () {
            return {
                type: "alert",
                conf: {
                    ignoreBackKey: this.config.isModal,
                    key: this.retrieve("key"),
                    title: this.config.title,
                    message: this.config.message,
                    buttons: this.retrieve("buttons")
                }
            }
        },
        handleCallback: function (a) {
            var b = a.selectedValue, c = this.retrieve(b), b = {selected: this.retrieve("configs")[b] || {}};
            a.cancelled ? this.config.cancelCallback && this.config.cancelCallback.call &&
            this.config.cancelCallback.call(this, b) : c && c.call && c.call(this, b)
        }
    })
});
define("MAF.dialogs.TextEntry", function () {
    return new MAF.Class({
        ClassName: "TextEntryDialog",
        Extends: MAF.dialogs.BaseDialogImplementation,
        config: {title: "", message: "", callback: null, cancelCallback: null, maxLength: 99},
        initialize: function () {
            this.parent()
        },
        getDialogConfig: function () {
            return {
                type: "textentry",
                conf: {
                    maxLength: this.config.maxLength,
                    ignoreBackKey: this.config.isModal,
                    key: this.retrieve("key"),
                    title: this.config.title,
                    message: this.config.message
                }
            }
        },
        handleCallback: function (a) {
            a.cancelled ? this.config.cancelCallback &&
            this.config.cancelCallback.call && this.config.cancelCallback(a) : this.config.callback && this.config.callback.call && this.config.callback(a)
        }
    })
});
define("MAF.dialogs.VerifyPin", function () {
    return new MAF.Class({
        ClassName: "VerifyPinDialog",
        Extends: MAF.dialogs.BaseDialogImplementation,
        config: {
            title: "",
            message: "",
            errorMessage: "",
            type: "adult",
            profileId: null,
            forgotPinCallback: null,
            callback: null,
            cancelCallback: null
        },
        initialize: function () {
            this.parent()
        },
        getDialogConfig: function () {
            return {
                type: "pin", conf: {
                    key: this.retrieve("key"),
                    title: this.config.title,
                    message: this.config.message,
                    errorMessage: this.config.errorMessage,
                    type: this.config.type,
                    profileId: this.config.profileId,
                    ignoreBackKey: this.config.isModal
                }
            }
        },
        handleCallback: function (a) {
            a.cancelled ? this.config.cancelCallback && this.config.cancelCallback.call && this.config.cancelCallback(a) : a.forgot ? this.config.forgotPinCallback && this.config.forgotPinCallback.call && this.config.forgotPinCallback(a) : this.config.callback && this.config.callback.call && this.config.callback(a)
        }
    })
});
define("MAF.dialogs.Login", function () {
    return new MAF.Class({
        ClassName: "LoginDialog",
        Extends: MAF.dialogs.BaseDialogImplementation,
        config: {title: "", message: "", callback: null, cancelCallback: null},
        initialize: function () {
            this.parent()
        },
        getDialogConfig: function () {
            return {
                type: "login",
                conf: {
                    ignoreBackKey: this.config.isModal,
                    key: this.retrieve("key"),
                    title: this.config.title,
                    message: this.config.message
                }
            }
        },
        handleCallback: function (a) {
            a.cancelled ? this.config.cancelCallback && this.config.cancelCallback.call && this.config.cancelCallback(a) :
            this.config.callback && this.config.callback.call && this.config.callback(a)
        }
    })
});
define("MAF.system.BaseView", function () {
    function a(a, b) {
        var d = "on" + b.capitalize();
        "updateView" === b && a.thaw();
        if (c && a.transition && a.transition[b]) {
            var h = Object.merge({}, a.transition[b], {
                events: {
                    onAnimationEnded: function () {
                        if ("hideView" !== b && "unselectView" !== b || !document.activeElement || a.element !== document.activeElement.window)a.fire(d) && a[b].call(a), "hideView" === b && a.freeze()
                    }
                }
            });
            a.animate(h)
        } else a.fire(d) && a[b].call(a), "hideView" === b && a.freeze()
    }

    var b = "minimal" === getSetting("render"), c = !1 !== getSetting("animation"),
        d = {};
    return new MAF.Class({
        ClassName: "BaseView",
        Extends: MAF.element.Core,
        viewBackParams: null,
        Protected: {
            initElement: function () {
                this.parent();
                var a = this.constructor.prototype;
                a && a.constructor && this.element.addClass(a.constructor.prototype.ClassName)
            }, onLoadView: function () {
                this.fire("onCreateView") && (b || this.thaw(), this.createView())
            }, onUnloadView: function () {
                this.fire("onDestroyView") && this.destroyView();
                this.unregisterMessageCenterListeners();
                this.cache = {};
                this.controls = {};
                this.elements = {};
                d[this._classID] =
                    []
            }, onShowView: function () {
                a(this, "updateView")
            }, onHideView: function () {
                a(this, "hideView")
            }, onSelectView: function () {
                a(this, "selectView")
            }, onUnselectView: function () {
                a(this, "unselectView")
            }, setInitialFocus: emptyFn, unregisterMessageCenterListeners: function () {
                if (0 < d[this._classID].length)for (var a = !1; a = d[this._classID].pop();)a && a.unsubscribeFrom && a.unsubscribeFrom.call && a.unsubscribeFrom(MAF.messages, MAF.messages.eventType)
            }, getControlData: function (a, b) {
                if (this.persist && this.persist.___systemViewData___ &&
                    this.persist.___systemViewData___[a]) {
                    var c = this.persist.___systemViewData___[a];
                    b && this.clearControlData(a);
                    return c
                }
            }, setControlData: function (a, b) {
                this.persist = this.persist || {};
                this.persist.___systemViewData___ = this.persist.___systemViewData___ || {};
                this.persist.___systemViewData___[a] = b
            }, clearControlData: function (a) {
                delete this.persist.___systemViewData___[a]
            }, getWindow: function () {
                return this
            }
        },
        config: {element: View},
        initialize: function () {
            this.parent();
            this.cache = {};
            this.persist = {};
            this.controls =
            {};
            this.elements = {};
            d[this._classID] = [];
            this.selected = this.rendered = !1;
            this.config.backParams && (this.backParams = this.config.backParams, this.config.backParams = null, delete this.config.backParams);
            this.config.persistParams && (this.persist = this.config.persistParams, this.config.persistParams = null, delete this.config.persistParams);
            this.initView()
        },
        initView: emptyFn,
        createView: emptyFn,
        updateView: emptyFn,
        selectView: emptyFn,
        unselectView: emptyFn,
        destroyView: emptyFn,
        hideView: emptyFn,
        favbutton: emptyFn,
        getView: function () {
            return this
        },
        registerMessageCenterListenerCallback: function (a) {
            a && a.subscribeTo && d[this._classID].push(a.subscribeTo(MAF.messages, MAF.messages.eventType, this))
        },
        registerMessageCenterListenerControl: function (a) {
        },
        suicide: function () {
            delete d[this._classID];
            delete this.rendered;
            delete this.selected;
            delete this.persist;
            delete this.cache;
            delete this.historyDirection;
            delete this.historyNoSave;
            delete this.viewBackParams;
            delete this.transition;
            Object.forEach(this.elements, function (a, b) {
                b && b.suicide && (delete this.elements[a],
                    b.suicide())
            }, this);
            delete this.elements;
            Object.forEach(this.controls, function (a, b) {
                b && b.suicide && (delete this.controls[a], b.suicide())
            }, this);
            delete this.controls;
            this.parent()
        }
    })
});
define("MAF.system.WindowedView", function () {
    function a(a, c) {
        (a = Object.merge(this.persist, a, this.backParams)) && Object.forEach(this.controls, function (f, g) {
            "array" === typeOf(g) ? g.forEach(function (f, g) {
                b.call(this, f, a, c)
            }, this) : b.call(this, g, a, c)
        }, this)
    }

    function b(a, b, c) {
        a.config && a.config.guid && a.inspectStatePacket && a.inspectStatePacket.call && a.inspectStatePacket.call(a, b, c)
    }

    function c(a, b) {
        a.config && a.config.guid && a.generateStatePacket && a.generateStatePacket.call && (b[a.config.guid] = a.generateStatePacket.call(a))
    }

    return new MAF.Class({
        ClassName: "WindowedView", Extends: MAF.system.BaseView, config: {loadingOverlay: !0}, Protected: {
            dispatchEvents: function (a) {
                this.parent(a);
                switch (a.type) {
                    case "navigate":
                        this.fire("onNavigate", a.detail, a);
                        break;
                    case "navigateoutofbounds":
                        this.fire("onNavigateOutOfBounds", a.detail, a)
                }
            }, registerEvents: function (a) {
                this.parent(["navigate", "navigateoutofbounds"].concat(a || []))
            }, setInitialFocus: function () {
                !0 === this.hasbeenfocused && document.activeElement || (this.parent(), this.hasbeenfocused = !0, this.element.focusedView || this.resetFocus(), a.call(this, this.getControlData("statePacket", !0), !0), this.fire("onFocusView") && this.focusView())
            }, onLoadView: function (a) {
                this.config.loadingOverlay && MAF.utility.LoadingOverlay.show();
                this.parent(a)
            }, onShowView: function (a) {
                this.config.loadingOverlay && MAF.utility.LoadingOverlay.show();
                this.parent(a)
            }, onSelectView: function (b) {
                this.parent(b);
                a.call(this, this.getControlData("statePacket"), !1);
                this.config.loadingOverlay && MAF.utility.LoadingOverlay.hide()
            },
            onUnselectView: function (a) {
                this.parent(a);
                var b = {};
                Object.forEach(this.controls, function (a, d) {
                    "array" === typeOf(d) ? d.forEach(function (a, d) {
                        c.call(this, a, b)
                    }, this) : c.call(this, d, b)
                }, this);
                this.setControlData("statePacket", b);
                this.hasbeenfocused = !1
            }, onHideView: function (a) {
                this.parent(a);
                this.backParams = {}
            }
        }, focusView: emptyFn, resetFocus: function () {
            !this.disableResetFocus && this.element && (this.element.navigate("down", [0, 0]) || this.element.focus())
        }, suicide: function () {
            delete this.backParams;
            this.parent()
        }
    })
});
define("MAF.system.SidebarView", function () {
    return new MAF.Class({ClassName: "SidebarView", Extends: MAF.system.WindowedView, viewType: "SIDEBAR"})
}, {SidebarView: {styles: {width: "588px", height: "930px"}}});
define("MAF.system.FullscreenView", function () {
    return new MAF.Class({
        ClassName: "FullscreenView",
        Extends: MAF.system.WindowedView,
        viewType: "FULLSCREEN",
        config: {showPassthroughVideo: !1},
        setTVViewportSize: function (a, b, c, d) {
            MAF.mediaplayer.setViewportBounds(a, b, c, d)
        },
        getTVViewportSize: function () {
            return MAF.mediaplayer.getViewportBounds()
        }
    })
}, {FullscreenView: {styles: {width: "1920px", height: "1080px"}}});
define("MAF.system.IconView", function () {
    return new MAF.Class({ClassName: "IconView", Extends: MAF.system.BaseView, viewType: "ICON"})
}, {IconView: {styles: {width: "192px", height: "192px"}}});
define("MAF.system.SnippetView", function () {
    return new MAF.Class({ClassName: "SnippetView", Extends: MAF.system.BaseView, viewType: "SNIPPET"})
}, {SnippetView: {styles: {width: "470px", height: "166px"}}});
define("MAF.system.OptionSelectView", function () {
    return new MAF.Class({
        ClassName: "OptionSelectView", Extends: MAF.system.SidebarView, Protected: {
            cancelDialogNeeded: function (a) {
                log("cancelDialogNeeded OptionSelectView")
            }, onOptionCancelled: function (a) {
                this.unregisterHandlers();
                var b = {};
                this.config.data.guid && (b[this.config.data.guid] = {
                    optionSelected: !1,
                    optionViewId: this.config.id,
                    cancelType: a
                });
                MAF.application.previousView(b)
            }
        }, config: {data: {optionGridRows: 1, optionGridColumns: 1, value: null, backLabel: "Select an Option"}},
        createView: function () {
            var a = (new MAF.control.BackButton({
                label: this.config.data.backLabel,
                events: {onSelect: this.cancelOption.bindTo(this)}
            })).appendTo(this), b = (new MAF.control.PageIndicator({styles: {vAlign: "bottom"}})).appendTo(this);
            this.elements.grid = (new MAF.control.Grid({
                rows: this.config.data.optionGridRows,
                columns: this.config.data.optionGridColumns,
                styles: {width: this.width, height: this.height - a.height - b.height, vOffset: a.height},
                cellCreator: this.optionCellCreator,
                cellUpdater: this.optionCellUpdater
            })).attachAccessory(b).appendTo(this)
        },
        updateView: function () {
            this.registerHandlers();
            this.elements.grid.changeDataset(this.config.data.options)
        }, submitOption: function (a) {
            this.unregisterHandlers();
            var b = {};
            this.config.data.guid && (b[this.config.data.guid] = {
                optionSelected: !0,
                option: a,
                optionViewId: this.config.viewId
            });
            MAF.application.previousView(b)
        }, cancelOption: function (a) {
            a.preventDefault();
            if (this.config.data.cancelDialog)this.cancelDialogNeeded(a.type); else this.onOptionCancelled(a.type)
        }, registerHandlers: function () {
            this.cancel = this.cancelOption.bindTo(this);
            this.cancel.subscribeTo(MAF.application, ["onActivateBackButton", "onActivateSettingsButton", "onActivateHomeButton"])
        }, unregisterHandlers: function () {
            this.cancel.unsubscribeFrom(MAF.application, ["onActivateBackButton", "onActivateSettingsButton", "onActivateHomeButton"]);
            delete this.cancel
        }, optionCellCreator: function () {
            var a = new MAF.control.GridCell({
                styles: this.getCellDimensions(), events: {
                    onSelect: function () {
                        var a = this.getCellDataItem();
                        this.grid.owner.submitOption(a)
                    }
                }
            });
            a.content = (new MAF.element.Text({
                ClassName: "ControlOptionSelectCellText",
                styles: {width: a.width - 10, height: a.height}
            })).appendTo(a);
            return a
        }, optionCellUpdater: function (a, b) {
            a.content.setText(b.label)
        }
    })
}, {
    ControlOptionSelectCellText: {
        styles: {
            width: "100%",
            height: "inherit",
            paddingLeft: 10,
            paddingRight: 10,
            anchorStyle: "leftCenter"
        }
    }
});
define("MAF.views.AboutDocView", function () {
    return new MAF.Class({
        ClassName: "AboutDocView",
        Extends: MAF.system.SidebarView,
        config: {data: {backLabel: "Back", value: ""}},
        createView: function () {
            this.controls.backButton = (new MAF.control.BackButton({
                guid: this._classID + ".BackButton",
                label: this.config.data.backLabel
            })).appendTo(this);
            this.controls.pageIndicator = (new MAF.control.PageIndicator({
                guid: this._classID + ".PageIndicator",
                styles: {width: this.width, vAlign: "bottom"}
            })).appendTo(this);
            var a = Theme.getStyles("AboutDocViewTextGrid",
                "margin");
            this.elements.textGrid = (new MAF.element.TextGrid({
                ClassName: "AboutDocViewTextGrid",
                styles: {
                    width: this.width - 2 * a,
                    height: this.height - (this.controls.pageIndicator.height + this.controls.backButton.height) - 2 * a,
                    vOffset: this.controls.backButton.outerHeight,
                    anchorStyle: "justify"
                }
            })).appendTo(this).attachAccessories(this.controls.pageIndicator)
        },
        updateView: function () {
            this.elements.textGrid.setText(this.config.data.value)
        }
    })
}, {AboutDocViewTextGrid: {styles: {fontSize: 22, color: "#FFFFFF", margin: 7, wrap: !0}}});
define("MAF.control.SelectButton", function () {
    return new MAF.Class({
        ClassName: "ControlSelectButton",
        Extends: MAF.control.InputButton,
        config: {
            valueOnSubline: !1,
            fillEmptySpace: !1,
            optionViewClass: MAF.system.OptionSelectView,
            optionGridRows: 1,
            optionGridColumns: 1
        },
        changeValue: function (a, b) {
            var c = this.config.optionViewClass, c = {
                id: this.config.optionListViewId || this._classID + "." + c.prototype.ClassName, data: {
                    guid: this.config.guid,
                    backLabel: this.config.label,
                    options: this.getOptions(),
                    value: b,
                    optionGridRows: this.config.optionGridRows,
                    optionGridColumns: this.config.optionGridColumns,
                    cancelDialog: this.config.cancelDialog
                }, viewClass: c
            };
            this.optionListViewId = c.id;
            MAF.application.addViewConfig(c);
            MAF.application.loadView(c.id)
        },
        inspectStatePacket: function (a, b) {
            var c = this.parent(a, b);
            if (!b) {
                var d;
                if (c) {
                    if (c.optionViewId) {
                        var e = c.optionViewId;
                        e && (MAF.application.removeView(e), delete this.optionListViewId)
                    }
                    switch (c.cancelType) {
                        case "onActivateHomeButton":
                            d = MAF.application.loadDefaultView;
                            break;
                        case "onActivateSettingsButton":
                            d = MAF.application.loadSettingsView
                    }
                }
                try {
                    return c
                } finally {
                    d &&
                    d()
                }
            }
        }
    })
}, {ControlSelectButton: "ControlButton", ControlSelectButtonSubline: "ControlInputButtonSubline"});
define("MAF.views.AboutBox", function () {
    return new MAF.Class({
        ClassName: "AboutBoxView",
        Extends: MAF.system.SidebarView,
        config: {BackButtonTitle: "ABOUT"},
        createView: function () {
            var a = ["copyright", "tos", "privacy"], b = parseInt(Theme.getStyles("ControlTextButton", "normal").height, 10) || 51, c = (new MAF.control.BackButton({
                    label: widget.getLocalizedString(this.config.BackButtonTitle),
                    backParams: this.viewBackParams || {},
                    events: {
                        onSelect: function (a) {
                            this.getView().fire("onBackButtonSelect", a) || a.preventDefault()
                        }
                    }
                })).appendTo(this),
                d = [];
            "array" === typeOf(this.config.pages) ? (this.config.pages.forEach(function (b) {
                if (-1 < a.indexOf(b.id)) {
                    if (!("srcString"in b))try {
                        b.srcString = filesystem.readFile("About/" + widget.locale + "/" + b.id + ".txt", !0)
                    } catch (c) {
                        b.srcString = ""
                    }
                    d.splice(0, 0, b)
                } else d.push(b)
            }), d.length = 5 < d.length ? 5 : d.length) : this.config.pages = [];
            var c = (new MAF.element.Container({
                styles: {
                    width: this.width,
                    height: this.height - (b * d.length + c.height),
                    vOffset: c.height
                }
            })).appendTo(this), e = (new MAF.element.Text({
                ClassName: "AboutBoxViewMetadataName",
                label: widget.getLocalizedString(widget.name),
                styles: {fontSize: Theme.getStyles("AboutBoxViewMetadataName", "fontSize")}
            })).appendTo(c), f = (new MAF.element.Text({
                ClassName: "AboutBoxViewMetadataDescription",
                label: widget.getLocalizedString(widget.description),
                styles: {
                    fontSize: Theme.getStyles("AboutBoxViewMetadataDescription", "fontSize"),
                    vOffset: e.outerHeight,
                    wrap: !0,
                    truncation: "end"
                }
            })).appendTo(c);
            f.visibleLines = 3;
            e = Theme.get("AboutBoxViewMetadataAuthorNote", "PAD_TOP");
            e = (new MAF.element.Text({
                ClassName: "AboutBoxViewMetadataAuthorNote",
                label: widget.getLocalizedString("WIDGET_BY") + "...",
                styles: {
                    fontSize: Theme.getStyles("AboutBoxViewMetadataAuthorNote", "fontSize"),
                    vOffset: f.outerHeight + e
                }
            })).appendTo(c);
            e = (new MAF.element.Text({
                ClassName: "AboutBoxViewMetadataAuthor",
                label: widget.author && 0 !== widget.author.length && widget.author !== widget.company ? widget.author + ", " + (widget.company || "") : widget.company || "",
                styles: {fontSize: Theme.getStyles("AboutBoxViewMetadataAuthor", "fontSize"), vOffset: e.outerHeight}
            })).appendTo(c);
            f = (new MAF.element.Text({
                ClassName: "AboutBoxViewMetadataVersion",
                label: widget.version,
                styles: {fontSize: Theme.getStyles("AboutBoxViewMetadataVersion", "fontSize"), vOffset: e.outerHeight}
            })).appendTo(c);
            if (widget.authorURL || widget.url)e = Theme.get("AboutBoxViewMetadataUrlNote", "PAD_TOP"), e = (new MAF.element.Text({
                ClassName: "AboutBoxViewMetadataUrlNote",
                label: widget.getLocalizedString("MORE_INFO") + "...",
                styles: {
                    fontSize: Theme.getStyles("AboutBoxViewMetadataUrlNote", "fontSize"),
                    vOffset: f.outerHeight + e
                }
            })).appendTo(c), (new MAF.element.Text({
                ClassName: "AboutBoxViewMetadataUrl",
                label: widget.authorURL || widget.url,
                styles: {fontSize: Theme.getStyles("AboutBoxViewMetadataUrl", "fontSize"), vOffset: e.outerHeight}
            })).appendTo(c);
            e = Theme.get("AboutBoxViewMetadataCopyright", "PAD_BOTTOM");
            (new MAF.element.Text({
                ClassName: "AboutBoxViewMetadataCopyright",
                label: widget.getLocalizedString("COPYRIGHT", (new Date).getFullYear()) + " " + widget.copyright,
                styles: {fontSize: Theme.getStyles("AboutBoxViewMetadataCopyright", "fontSize"), vOffset: c.height - e}
            })).appendTo(c);
            e = Theme.get("AboutBoxViewMetadataReserved",
                "PAD_BOTTOM");
            (new MAF.element.Text({
                ClassName: "AboutBoxViewMetadataReserved",
                label: widget.getLocalizedString("RIGHTS_RESERVED"),
                styles: {fontSize: Theme.getStyles("AboutBoxViewMetadataReserved", "fontSize"), vOffset: c.height - e}
            })).appendTo(c);
            if (d.length) {
                var g = null, h = (new MAF.element.Core({
                    styles: {
                        width: this.width,
                        height: b * d.length,
                        vAlign: "bottom"
                    }
                })).appendTo(this);
                d.forEach(function (a) {
                    g = a instanceof MAF.element.Button ? a : new MAF.control.TextButton({
                        label: a.name, value: a.srcString, styles: {
                            vOffset: g ?
                                g.outerHeight : 0
                        }, events: {
                            onSelect: function () {
                                var a = {
                                    id: this._classID + "AboutDocView",
                                    data: {backLabel: this.config.label, value: this.config.value},
                                    viewClass: MAF.views.AboutDocView
                                };
                                MAF.application.addViewConfig(a);
                                MAF.application.loadView(a.id, {documentText: this.config.value})
                            }
                        }
                    });
                    g.appendTo(h)
                })
            }
        }
    })
}, {
    AboutBoxView: "SidebarView",
    AboutBoxViewMetadataName: {
        styles: {
            width: "100%",
            paddingLeft: 5,
            paddingRight: 5,
            truncation: "end",
            vOffset: 67,
            fontSize: 32
        }
    },
    AboutBoxViewMetadataDescription: {
        styles: {
            width: "100%", paddingLeft: 5,
            paddingRight: 5, fontSize: 18, fontWeight: "bold"
        }
    },
    AboutBoxViewMetadataAuthorNote: {PAD_TOP: 20, styles: {hOffset: 5, fontSize: 23}},
    AboutBoxViewMetadataAuthor: {styles: {hOffset: 5, fontSize: 23}},
    AboutBoxViewMetadataVersion: {styles: {hOffset: 5, fontSize: 23}},
    AboutBoxViewMetadataUrlNote: {PAD_TOP: 20, styles: {hOffset: 5, fontSize: 18}},
    AboutBoxViewMetadataUrl: {styles: {hOffset: 5, fontSize: 18}},
    AboutBoxViewMetadataCopyright: {PAD_BOTTOM: 40, styles: {hOffset: 5, fontSize: 15}},
    AboutBoxViewMetadataReserved: {
        PAD_BOTTOM: 20, styles: {
            hOffset: 5,
            fontSize: 15
        }
    }
});
define("MAF.views.SearchSuggest", function () {
    return new MAF.Class({
        ClassName: "SearchSuggestView", Extends: MAF.system.SidebarView, Protected: {
            showResultsGrid: function () {
                this.hideNoResults();
                this.controls.grid.visible || this.controls.grid.show();
                this.controls.indic.visible || this.controls.indic.show()
            }, showNoResults: function () {
                this.hideResultsGrid();
                this.elements.noResultsIcon.visible || this.elements.noResultsIcon.show();
                this.elements.noResultsText.visible || this.elements.noResultsText.show()
            }, hideResultsGrid: function () {
                this.controls.grid.visible &&
                this.controls.grid.hide();
                this.controls.indic.visible && this.controls.indic.hide()
            }, hideNoResults: function () {
                this.elements.noResultsIcon.visible && this.elements.noResultsIcon.hide();
                this.elements.noResultsText.visible && this.elements.noResultsText.hide()
            }
        }, config: {
            BackButtonTitle: "BACK",
            SearchButtonTitle: "SEARCH",
            NoResultsMessage: "NO_RESULTS",
            Cursor: "_",
            DisplayDefaultValue: "",
            AutocompleteThreshold: 3,
            GridRows: 6,
            GridColumns: 1,
            bulletCharacter: "\u2022",
            secureMask: !1,
            secureMaskType: "mask-submitted",
            formBackgroundColor: "#000",
            keyboard: {startFocused: !0, maxLength: 15}
        }, valueManagerUpdate: function (a) {
            var b = this.elements.valueManager.value, c = this.elements.valueManager.cursorPosition, d = !1, e, d = this.config.bulletCharacter;
            e = this.config.secureMask && this.config.secureMaskType;
            var f = d.repeat(b.length);
            if (e && f.length)switch (e) {
                case "mask-characer":
                    f = d.repeat(b.length - 1) + b.charAt(b.length - 1);
                    break;
                case "mask-submitted":
                    f = b;
                    break;
                case "mask-all":
                    break;
                default:
                    f = b
            } else f = b;
            e = f;
            d = this.config.Cursor;
            e = e.substring(0, c) + d + e.substring(c,
                    e.length);
            this.controls.keyOutput.setText(e);
            this.hideNoResults();
            b.length >= this.config.AutocompleteThreshold && a && a.type && "valuechanged" === a.type ? this.performAutocomplete(b) : this.hideResultsGrid()
        }, createView: function () {
            this.elements.valueManager = new MAF.keyboard.KeyboardValueManager({maxLength: this.config.keyboard.maxLength});
            this.valueManagerUpdate.subscribeTo(this.elements.valueManager, ["cursormoved", "valuechanged"], this);
            this.elements.valueManager.cursorPosition = this.elements.valueManager.value.length;
            this.controls.backButton = (new MAF.control.BackButton({label: widget.getLocalizedString(this.config.BackButtonTitle)})).appendTo(this);
            this.controls.grid = (new MAF.control.Grid({
                guid: this.config.viewId + ".grid",
                rows: this.config.GridRows,
                columns: this.config.GridColumns,
                styles: Theme.getStyles("SearchSuggestResultGrid"),
                cellCreator: function () {
                    return new MAF.control.GridCell({
                        content: this.getView().cellContentCreator(),
                        events: {
                            onSelect: function (a) {
                                this.getView().performRowSelected(a.payload.dataItem)
                            }
                        }
                    })
                },
                cellUpdater: function (a, c) {
                    this.getView().cellContentUpdater(a.content, c)
                }
            })).appendTo(this);
            this.controls.indic = (new MAF.control.PageIndicator({
                guid: this.config.viewId + ".indicator",
                styles: {vOffset: this.controls.grid.outerHeight}
            })).appendTo(this).attachToSource(this.controls.grid);
            this.controls.submitButton = (new MAF.control.TextButton({
                label: widget.getLocalizedString(this.config.SearchButtonTitle),
                styles: {vAlign: "bottom"},
                events: {
                    onSelect: function (a) {
                        a = this.getView();
                        a.performSearch(a.elements.valueManager.value)
                    }
                }
            })).appendTo(this);
            this.controls.keyboardContainer = (new MAF.element.Container({
                styles: {
                    width: this.width,
                    height: this.height - this.controls.indic.outerHeight - this.controls.submitButton.height,
                    vAlign: "bottom",
                    vOffset: this.controls.submitButton.height
                }
            })).appendTo(this);
            var a = Theme.get("ControlTextEntryOverlayClearButton", "styling") || {};
            this.controls.clearButton = (new MAF.element.Button({
                ClassName: "ControlTextEntryOverlayClearButton", content: new MAF.element.Text({
                    label: FontAwesome.get("times"), styles: {
                        width: "100%", height: "100%",
                        anchorStyle: "center"
                    }
                }), guid: this.config.viewId + ".clearButton", styles: a, events: {
                    onSelect: function () {
                        this.getView().elements.valueManager.value = ""
                    }, onNavigate: function (a) {
                        switch (a.payload.direction) {
                            case "right":
                                a.preventDefault()
                        }
                    }
                }
            })).appendTo(this.controls.keyboardContainer);
            this.controls.textHighlight = (new MAF.element.Container({
                ClassName: "ControlTextEntryOverlayTextHighlight",
                focus: !1
            })).appendTo(this.controls.keyboardContainer);
            this.controls.textHighlight.hide();
            this.controls.keyOutput = (new MAF.element.TextField({
                ClassName: "ControlTextEntryButtonValue",
                guid: this.config.viewId + ".keyOutput",
                label: "",
                focus: !0,
                styles: {width: this.width - (a.width || 0) - 20},
                events: {
                    onKeyDown: function (a) {
                        var c = this.getView();
                        a.KFEvent && 13 == a.KFEvent.keyCode ? c._onSubmit(a) : (a.payload.layout = c.controls.keyCaps.config.layout, c.elements.valueManager.handleExternalKeyInput(a))
                    }, onFocus: function (a) {
                        var c = this.getView();
                        c.controls.keyOutput.element.allowCursor ? c.controls.textHighlight.show() : (a.preventDefault(), c.controls.clearButton.focus())
                    }, onBlur: function () {
                        var a = this.getView();
                        a.controls.keyOutput.element.allowCursor && a.controls.textHighlight.hide()
                    }, onNavigate: function (a) {
                        var c = this.getView();
                        switch (a.payload.direction) {
                            case "left":
                                a.preventDefault();
                                c.elements.valueManager.moveCursorLeft();
                                break;
                            case "right":
                                c.elements.valueManager.cursorPosition < c.elements.valueManager.value.length && (a.preventDefault(), c.elements.valueManager.moveCursorRight())
                        }
                    }
                }
            })).appendTo(this.controls.keyboardContainer);
            this.controls.keyOutput.element.addClass("ControlTextEntryButtonValueTheme");
            Theme.get("ControlTextEntryButtonValue", "cursor");
            this.controls.outputLabel = (new MAF.element.Text({
                ClassName: "ControlTextEntryButtonLabel",
                label: widget.getLocalizedString(this.config.label)
            })).appendTo(this.controls.keyboardContainer);
            this.controls.outputLabel.setStyles({width: 0, height: 0});
            this.elements.keyCaps = (new MAF.control.Keyboard({
                id: this.config.viewId + ".keyCaps",
                embedded: !1,
                maxLength: this.config.keyboard.maxLength || 255,
                layout: getSetting("keyboard") || "alphanumeric",
                controlSize: "standard",
                styles: {
                    width: this.width,
                    vAlign: "bottom"
                },
                events: {
                    onKeyDown: function (a) {
                        var c = this.getView();
                        a.payload.layout = c.elements.keyCaps.config.layout;
                        c.elements.valueManager.handleExternalKeyInput(a);
                        a.KFEvent && c._isCursorSupported() && !c.controls.keyOutput.element.hasFocus && c.controls.keyOutput.focus()
                    }
                }
            })).appendTo(this.controls.keyboardContainer);
            this.elements.noResultsIcon = (new MAF.element.Text({
                label: FontAwesome.get(Theme.get("SearchSuggestNoResultsIcon", "icon")),
                styles: Theme.getStyles("SearchSuggestNoResultsIcon")
            })).appendTo(this);
            this.elements.noResultsText = (new MAF.element.Text({
                label: widget.getLocalizedString(this.config.NoResultsMessage),
                styles: Object.merge(Theme.getStyles("SearchSuggestNoResultsText"), {wrap: !0})
            })).appendTo(this);
            this.controls.keyboardContainer.renderSkin("ControlTextEntryOverlay")
        }, updateView: function () {
            this.valueManagerUpdate()
        }, focusView: function () {
            null === this.element.focusedView && this.elements.keyCaps.focus();
            this.elements.keyCaps.focus()
        }, cellContentCreator: function () {
            return new MAF.element.Text({
                styles: Object.merge(Theme.getStyles("SearchSuggestResultGridText"),
                    {width: "90%", truncation: "end", vOffset: 15, hOffset: 10})
            })
        }, cellContentUpdater: function (a, b) {
            a.setText(b.label)
        }, dataReady: function (a, b) {
            !a || 1 > a.length ? b && this.showNoResults() : (this.controls.grid.changeDataset(a, !0), this.showResultsGrid())
        }, performRowSelected: function () {
            throw Error("There is no point in having a Search Suggest control if you will do nothing with what the user selected, so implement this method!");
        }, performAutocomplete: function (a) {
            this.performSearch(a)
        }, performSearch: function () {
            throw Error("There is no point in having a Search Suggest control if you will do nothing with what the user selected, so implement this method!");
        }
    })
}, {
    SearchSuggestView: "SidebarView",
    SearchSuggestNoResultsIcon: {
        icon: "search",
        styles: {visible: !1, width: 550, color: "#FFFFFF", fontSize: 120, vOffset: 151, textAlign: "center"}
    },
    SearchSuggestNoResultsText: {
        styles: {
            visible: !1,
            color: "#FFFFFF",
            vOffset: 351,
            width: 550,
            fontSize: 32,
            textAlign: "center",
            hAlign: "center"
        }
    },
    SearchSuggestResultGrid: {styles: {width: "100%", height: 360, vOffset: 52}},
    ControlTextEntryOverlayTextHighlight: {}
});