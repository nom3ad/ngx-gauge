(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-gauge', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory(global['ngx-gauge'] = {}, global.ng.core, global.ng.common));
}(this, function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} value
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function coerceBooleanProperty(value) {
        return value != null && "" + value !== 'false';
    }
    /**
     * @param {?} value
     * @param {?=} fallbackValue
     * @return {?}
     */
    function coerceNumberProperty(value, fallbackValue) {
        if (fallbackValue === void 0) { fallbackValue = 0; }
        return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallbackValue : Number(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function cssUnit(value) {
        return value + "px";
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isNumber(value) {
        return value != undefined && !isNaN(parseFloat(value)) && !isNaN(Number(value));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxGaugeAppend = /** @class */ (function () {
        function NgxGaugeAppend() {
        }
        NgxGaugeAppend.decorators = [
            { type: core.Directive, args: [{
                        selector: "ngx-gauge-append",
                        exportAs: "ngxGaugeAppend"
                    },] }
        ];
        return NgxGaugeAppend;
    }());
    var NgxGaugePrepend = /** @class */ (function () {
        function NgxGaugePrepend() {
        }
        NgxGaugePrepend.decorators = [
            { type: core.Directive, args: [{
                        selector: "ngx-gauge-prepend",
                        exportAs: "ngxGaugePrepend"
                    },] }
        ];
        return NgxGaugePrepend;
    }());
    var NgxGaugeValue = /** @class */ (function () {
        function NgxGaugeValue() {
        }
        NgxGaugeValue.decorators = [
            { type: core.Directive, args: [{
                        selector: "ngx-gauge-value",
                        exportAs: "ngxGaugeValue"
                    },] }
        ];
        return NgxGaugeValue;
    }());
    var NgxGaugeLabel = /** @class */ (function () {
        function NgxGaugeLabel() {
        }
        NgxGaugeLabel.decorators = [
            { type: core.Directive, args: [{
                        selector: "ngx-gauge-label",
                        exportAs: "ngxGaugeLabel"
                    },] }
        ];
        return NgxGaugeLabel;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DEFAULTS = {
        MIN: 0,
        MAX: 100,
        TYPE: 'arch',
        THICK: 4,
        FOREGROUND_COLOR: '#009688',
        BACKGROUND_COLOR: 'rgba(0, 0, 0, 0.1)',
        CAP: 'butt',
        SIZE: 200
    };
    /**
     * @param {?} i
     * @return {?}
     */
    function selectColor(i) {
        return ['#009688', '#dbf7f7'][i];
    }
    var NgxGauge = /** @class */ (function () {
        function NgxGauge(_elementRef, _renderer) {
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._size = DEFAULTS.SIZE;
            this._min = DEFAULTS.MIN;
            this._max = DEFAULTS.MAX;
            this._animate = true;
            this._initialized = false;
            this._animationRequestID = 0;
            this.ariaLabel = '';
            this.ariaLabelledby = null;
            this.type = (/** @type {?} */ (DEFAULTS.TYPE));
            this.cap = (/** @type {?} */ (DEFAULTS.CAP));
            this.thick = DEFAULTS.THICK;
            this.foregroundColor = DEFAULTS.FOREGROUND_COLOR;
            this.backgroundColor = DEFAULTS.BACKGROUND_COLOR;
            this.thresholds = Object.create(null);
            this._value = 0;
            this.duration = 1200;
        }
        Object.defineProperty(NgxGauge.prototype, "size", {
            get: /**
             * @return {?}
             */
            function () { return this._size; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._size = coerceNumberProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxGauge.prototype, "min", {
            get: /**
             * @return {?}
             */
            function () { return this._min; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._min = coerceNumberProperty(value, DEFAULTS.MIN);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxGauge.prototype, "animate", {
            get: /**
             * @return {?}
             */
            function () { return this._animate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._animate = coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxGauge.prototype, "max", {
            get: /**
             * @return {?}
             */
            function () { return this._max; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._max = coerceNumberProperty(value, DEFAULTS.MAX);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxGauge.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._value; },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                var _this = this;
                if (Array.isArray(val)) {
                    if (typeof (val[0]) === 'object') {
                        this._value = coerceNumberProperty(val.reduce((/**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */
                        function (a, b) { return a + b.step; }), 0));
                        this._steps = val.map((/**
                         * @param {?} s
                         * @param {?} i
                         * @return {?}
                         */
                        function (s, i) { return ({ ratio: s.step / _this._value, color: s.color || selectColor(i) }); }));
                    }
                    else {
                        this._value = coerceNumberProperty(val.reduce((/**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */
                        function (a, b) { return a + b; }), 0));
                        this._steps = val.map((/**
                         * @param {?} s
                         * @param {?} i
                         * @return {?}
                         */
                        function (s, i) { return ({ ratio: s / _this._value, color: selectColor(i) }); }));
                    }
                }
                else {
                    this._value = coerceNumberProperty(val);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        NgxGauge.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var isCanvasPropertyChanged = changes['thick'] || changes['type'] || changes['cap'] || changes['size'];
            /** @type {?} */
            var isDataChanged = changes['value'] || changes['min'] || changes['max'];
            if (this._initialized) {
                if (isDataChanged) {
                    /** @type {?} */
                    var nv = void 0;
                    /** @type {?} */
                    var ov = void 0;
                    if (changes['value']) {
                        nv = changes['value'].currentValue;
                        ov = changes['value'].previousValue;
                    }
                    this._update(nv, ov);
                }
                if (isCanvasPropertyChanged) {
                    this._destroy();
                    this._init();
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        NgxGauge.prototype._updateSize = /**
         * @private
         * @return {?}
         */
        function () {
            this._renderer.setElementStyle(this._elementRef.nativeElement, 'width', cssUnit(this._size));
            this._renderer.setElementStyle(this._elementRef.nativeElement, 'height', cssUnit(this._size));
            this._canvas.nativeElement.width = this.size;
            this._canvas.nativeElement.height = this.size;
        };
        /**
         * @return {?}
         */
        NgxGauge.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            if (this._canvas) {
                this._init();
            }
        };
        /**
         * @return {?}
         */
        NgxGauge.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._destroy();
        };
        /**
         * @private
         * @param {?} type
         * @return {?}
         */
        NgxGauge.prototype._getBounds = /**
         * @private
         * @param {?} type
         * @return {?}
         */
        function (type) {
            /** @type {?} */
            var head;
            /** @type {?} */
            var tail;
            if (type == 'semi') {
                head = Math.PI;
                tail = 2 * Math.PI;
            }
            else if (type == 'full') {
                head = 1.5 * Math.PI;
                tail = 3.5 * Math.PI;
            }
            else if (type === 'arch') {
                head = 0.8 * Math.PI;
                tail = 2.2 * Math.PI;
            }
            return { head: head, tail: tail };
        };
        /**
         * @private
         * @param {?} start
         * @param {?} middle
         * @param {?} tail
         * @param {?} color
         * @return {?}
         */
        NgxGauge.prototype._drawShell = /**
         * @private
         * @param {?} start
         * @param {?} middle
         * @param {?} tail
         * @param {?} color
         * @return {?}
         */
        function (start, middle, tail, color) {
            var e_1, _a;
            /** @type {?} */
            var center = this._getCenter();
            /** @type {?} */
            var radius = this._getRadius();
            middle = Math.max(middle, start); // never below 0%
            middle = Math.min(middle, tail); // never exceed 100%
            if (this._initialized) {
                this._clear();
                this._context.beginPath();
                this._context.strokeStyle = this.backgroundColor;
                this._context.arc(center.x, center.y, radius, middle, tail, false);
                this._context.stroke();
                if (!this._steps) {
                    this._context.beginPath();
                    this._context.strokeStyle = color;
                    this._context.arc(center.x, center.y, radius, start, middle, false);
                    this._context.stroke();
                }
                else {
                    /** @type {?} */
                    var archlen = middle - start;
                    /** @type {?} */
                    var stepstart = start;
                    try {
                        for (var _b = __values(this._steps), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var _d = _c.value, color_1 = _d.color, ratio = _d.ratio;
                            /** @type {?} */
                            var stepend = stepstart + archlen * ratio;
                            this._context.beginPath();
                            this._context.strokeStyle = color_1;
                            this._context.arc(center.x, center.y, radius, stepstart, stepend, false);
                            this._context.stroke();
                            stepstart = stepend;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        NgxGauge.prototype._clear = /**
         * @private
         * @return {?}
         */
        function () {
            this._context.clearRect(0, 0, this._getWidth(), this._getHeight());
        };
        /**
         * @private
         * @return {?}
         */
        NgxGauge.prototype._getWidth = /**
         * @private
         * @return {?}
         */
        function () {
            return this.size;
        };
        /**
         * @private
         * @return {?}
         */
        NgxGauge.prototype._getHeight = /**
         * @private
         * @return {?}
         */
        function () {
            return this.size;
        };
        /**
         * @private
         * @return {?}
         */
        NgxGauge.prototype._getRadius = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var center = this._getCenter();
            return center.x - this.thick;
        };
        /**
         * @private
         * @return {?}
         */
        NgxGauge.prototype._getCenter = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var x = this._getWidth() / 2;
            /** @type {?} */
            var y = this._getHeight() / 2;
            return { x: x, y: y };
        };
        /**
         * @private
         * @return {?}
         */
        NgxGauge.prototype._init = /**
         * @private
         * @return {?}
         */
        function () {
            this._context = ((/** @type {?} */ (this._canvas.nativeElement))).getContext('2d');
            this._initialized = true;
            this._updateSize();
            this._setupStyles();
            this._create();
        };
        /**
         * @private
         * @return {?}
         */
        NgxGauge.prototype._destroy = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._animationRequestID) {
                window.cancelAnimationFrame(this._animationRequestID);
                this._animationRequestID = 0;
            }
            this._clear();
            this._context = null;
            this._initialized = false;
        };
        /**
         * @private
         * @return {?}
         */
        NgxGauge.prototype._setupStyles = /**
         * @private
         * @return {?}
         */
        function () {
            this._context.lineCap = this.cap;
            this._context.lineWidth = this.thick;
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        NgxGauge.prototype._getForegroundColorByRange = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var match = Object.keys(this.thresholds)
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return isNumber(item) && Number(item) <= value; }))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return Number(a) - Number(b); }))
                .reverse()[0];
            return match !== undefined
                ? this.thresholds[match].color || this.foregroundColor
                : this.foregroundColor;
        };
        /**
         * @private
         * @param {?=} nv
         * @param {?=} ov
         * @return {?}
         */
        NgxGauge.prototype._create = /**
         * @private
         * @param {?=} nv
         * @param {?=} ov
         * @return {?}
         */
        function (nv, ov) {
            /** @type {?} */
            var self = this;
            /** @type {?} */
            var type = this.type;
            /** @type {?} */
            var bounds = this._getBounds(type);
            /** @type {?} */
            var duration = this.duration;
            /** @type {?} */
            var min = this.min;
            /** @type {?} */
            var max = this.max;
            /** @type {?} */
            var value = clamp(this.value, this.min, this.max);
            /** @type {?} */
            var start = bounds.head;
            /** @type {?} */
            var unit = (bounds.tail - bounds.head) / (max - min);
            /** @type {?} */
            var displacement = unit * (value - min);
            /** @type {?} */
            var tail = bounds.tail;
            /** @type {?} */
            var color = this._getForegroundColorByRange(value);
            /** @type {?} */
            var startTime;
            if (self._animationRequestID) {
                window.cancelAnimationFrame(self._animationRequestID);
            }
            /**
             * @param {?} timestamp
             * @return {?}
             */
            function animate(timestamp) {
                timestamp = timestamp || new Date().getTime();
                /** @type {?} */
                var runtime = timestamp - startTime;
                /** @type {?} */
                var progress = Math.min(runtime / duration, 1);
                /** @type {?} */
                var previousProgress = ov ? (ov - min) * unit : 0;
                /** @type {?} */
                var middle = start + previousProgress + displacement * progress;
                self._drawShell(start, middle, tail, color);
                if (self._animationRequestID && (runtime < duration)) {
                    self._animationRequestID = window.requestAnimationFrame((/**
                     * @param {?} timestamp
                     * @return {?}
                     */
                    function (timestamp) { return animate(timestamp); }));
                }
                else {
                    window.cancelAnimationFrame(self._animationRequestID);
                }
            }
            if (this._animate) {
                if (nv != undefined && ov != undefined) {
                    displacement = unit * nv - unit * ov;
                }
                self._animationRequestID = window.requestAnimationFrame((/**
                 * @param {?} timestamp
                 * @return {?}
                 */
                function (timestamp) {
                    startTime = timestamp || new Date().getTime();
                    animate(startTime);
                }));
            }
            else {
                self._drawShell(start, start + displacement, tail, color);
            }
        };
        /**
         * @private
         * @param {?} nv
         * @param {?} ov
         * @return {?}
         */
        NgxGauge.prototype._update = /**
         * @private
         * @param {?} nv
         * @param {?} ov
         * @return {?}
         */
        function (nv, ov) {
            this._clear();
            this._create(nv, ov);
        };
        NgxGauge.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-gauge',
                        template: "<div class=\"reading-block\" #reading [style.fontSize]=\"size * 0.22 + 'px'\" [style.lineHeight]=\"size + 'px'\">\n  <!-- This block can not be indented correctly, because line breaks cause layout spacing, related problem: https://pt.stackoverflow.com/q/276760/2998 -->\n  <u class=\"reading-affix\" [ngSwitch]=\"_prependChild != null\"><ng-content select=\"ngx-gauge-prepend\" *ngSwitchCase=\"true\"></ng-content><ng-container *ngSwitchCase=\"false\">{{prepend}}</ng-container></u><ng-container [ngSwitch]=\"_valueDisplayChild != null\"><ng-content *ngSwitchCase=\"true\" select=\"ngx-gauge-value\"></ng-content><ng-container *ngSwitchCase=\"false\">{{value | number}}</ng-container></ng-container><u class=\"reading-affix\" [ngSwitch]=\"_appendChild != null\"><ng-content select=\"ngx-gauge-append\" *ngSwitchCase=\"true\"></ng-content><ng-container *ngSwitchCase=\"false\">{{append}}</ng-container></u>\n</div>\n<div class=\"reading-label\" \n     [style.fontSize]=\"size / 13 + 'px'\" \n     [style.lineHeight]=\"(5 * size / 13) + size + 'px'\" \n     [ngSwitch]=\"_labelChild != null\">\n  <ng-content select=\"ngx-gauge-label\" *ngSwitchCase=\"true\"></ng-content>\n  <ng-container *ngSwitchCase=\"false\">{{label}}</ng-container>\n</div>\n<canvas #canvas></canvas>",
                        host: {
                            'role': 'slider',
                            'aria-readonly': 'true',
                            '[class.ngx-gauge-meter]': 'true',
                            '[attr.aria-valuemin]': 'min',
                            '[attr.aria-valuemax]': 'max',
                            '[attr.aria-valuenow]': 'value',
                            '[attr.aria-label]': 'ariaLabel',
                            '[attr.aria-labelledby]': 'ariaLabelledby'
                        },
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".ngx-gauge-meter{display:inline-block;text-align:center;position:relative}.reading-block{position:absolute;width:100%;font-weight:400;white-space:nowrap;text-align:center;overflow:hidden;text-overflow:ellipsis}.reading-label{font-family:inherit;width:100%;display:inline-block;position:absolute;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400}.reading-affix{text-decoration:none;font-size:.6em;opacity:.8;font-weight:200;padding:0 .18em}.reading-affix:first-child{padding-left:0}.reading-affix:last-child{padding-right:0}"]
                    }] }
        ];
        /** @nocollapse */
        NgxGauge.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer }
        ]; };
        NgxGauge.propDecorators = {
            _canvas: [{ type: core.ViewChild, args: ['canvas', { static: true },] }],
            _labelChild: [{ type: core.ContentChild, args: [NgxGaugeLabel, { static: false },] }],
            _prependChild: [{ type: core.ContentChild, args: [NgxGaugePrepend, { static: false },] }],
            _appendChild: [{ type: core.ContentChild, args: [NgxGaugeAppend, { static: false },] }],
            _valueDisplayChild: [{ type: core.ContentChild, args: [NgxGaugeValue, { static: false },] }],
            ariaLabel: [{ type: core.Input, args: ['aria-label',] }],
            ariaLabelledby: [{ type: core.Input, args: ['aria-labelledby',] }],
            size: [{ type: core.Input }],
            min: [{ type: core.Input }],
            animate: [{ type: core.Input }],
            max: [{ type: core.Input }],
            type: [{ type: core.Input }],
            cap: [{ type: core.Input }],
            thick: [{ type: core.Input }],
            label: [{ type: core.Input }],
            append: [{ type: core.Input }],
            prepend: [{ type: core.Input }],
            foregroundColor: [{ type: core.Input }],
            backgroundColor: [{ type: core.Input }],
            thresholds: [{ type: core.Input }],
            value: [{ type: core.Input }],
            duration: [{ type: core.Input }]
        };
        return NgxGauge;
    }());
    if (false) {
        /** @type {?} */
        NgxGauge.prototype._canvas;
        /** @type {?} */
        NgxGauge.prototype._labelChild;
        /** @type {?} */
        NgxGauge.prototype._prependChild;
        /** @type {?} */
        NgxGauge.prototype._appendChild;
        /** @type {?} */
        NgxGauge.prototype._valueDisplayChild;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._size;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._min;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._max;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._animate;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._initialized;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._context;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._animationRequestID;
        /** @type {?} */
        NgxGauge.prototype.ariaLabel;
        /** @type {?} */
        NgxGauge.prototype.ariaLabelledby;
        /** @type {?} */
        NgxGauge.prototype.type;
        /** @type {?} */
        NgxGauge.prototype.cap;
        /** @type {?} */
        NgxGauge.prototype.thick;
        /** @type {?} */
        NgxGauge.prototype.label;
        /** @type {?} */
        NgxGauge.prototype.append;
        /** @type {?} */
        NgxGauge.prototype.prepend;
        /** @type {?} */
        NgxGauge.prototype.foregroundColor;
        /** @type {?} */
        NgxGauge.prototype.backgroundColor;
        /** @type {?} */
        NgxGauge.prototype.thresholds;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._value;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._steps;
        /** @type {?} */
        NgxGauge.prototype.duration;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._elementRef;
        /**
         * @type {?}
         * @private
         */
        NgxGauge.prototype._renderer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxGaugeModule = /** @class */ (function () {
        function NgxGaugeModule() {
        }
        NgxGaugeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel],
                        exports: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel]
                    },] }
        ];
        return NgxGaugeModule;
    }());

    exports.NgxGaugeModule = NgxGaugeModule;
    exports.ɵa = NgxGauge;
    exports.ɵb = NgxGaugeAppend;
    exports.ɵc = NgxGaugePrepend;
    exports.ɵd = NgxGaugeValue;
    exports.ɵe = NgxGaugeLabel;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-gauge.umd.js.map
