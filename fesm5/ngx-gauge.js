import { Directive, Component, ViewEncapsulation, ElementRef, Renderer, ViewChild, ContentChild, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { __values } from 'tslib';

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
        { type: Directive, args: [{
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
        { type: Directive, args: [{
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
        { type: Directive, args: [{
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
        { type: Directive, args: [{
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
        { type: Component, args: [{
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
                    encapsulation: ViewEncapsulation.None,
                    styles: [".ngx-gauge-meter{display:inline-block;text-align:center;position:relative}.reading-block{position:absolute;width:100%;font-weight:400;white-space:nowrap;text-align:center;overflow:hidden;text-overflow:ellipsis}.reading-label{font-family:inherit;width:100%;display:inline-block;position:absolute;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400}.reading-affix{text-decoration:none;font-size:.6em;opacity:.8;font-weight:200;padding:0 .18em}.reading-affix:first-child{padding-left:0}.reading-affix:last-child{padding-right:0}"]
                }] }
    ];
    /** @nocollapse */
    NgxGauge.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer }
    ]; };
    NgxGauge.propDecorators = {
        _canvas: [{ type: ViewChild, args: ['canvas', { static: true },] }],
        _labelChild: [{ type: ContentChild, args: [NgxGaugeLabel, { static: false },] }],
        _prependChild: [{ type: ContentChild, args: [NgxGaugePrepend, { static: false },] }],
        _appendChild: [{ type: ContentChild, args: [NgxGaugeAppend, { static: false },] }],
        _valueDisplayChild: [{ type: ContentChild, args: [NgxGaugeValue, { static: false },] }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
        size: [{ type: Input }],
        min: [{ type: Input }],
        animate: [{ type: Input }],
        max: [{ type: Input }],
        type: [{ type: Input }],
        cap: [{ type: Input }],
        thick: [{ type: Input }],
        label: [{ type: Input }],
        append: [{ type: Input }],
        prepend: [{ type: Input }],
        foregroundColor: [{ type: Input }],
        backgroundColor: [{ type: Input }],
        thresholds: [{ type: Input }],
        value: [{ type: Input }],
        duration: [{ type: Input }]
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
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel],
                    exports: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel]
                },] }
    ];
    return NgxGaugeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxGaugeModule, NgxGauge as ɵa, NgxGaugeAppend as ɵb, NgxGaugePrepend as ɵc, NgxGaugeValue as ɵd, NgxGaugeLabel as ɵe };
//# sourceMappingURL=ngx-gauge.js.map
