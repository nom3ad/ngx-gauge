/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation, Renderer, ElementRef, ViewChild, ContentChild } from '@angular/core';
import { clamp, coerceBooleanProperty, coerceNumberProperty, cssUnit, isNumber } from '../common/util';
import { NgxGaugeLabel, NgxGaugeValue, NgxGaugePrepend, NgxGaugeAppend } from './gauge-directives';
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
                    for (var _b = tslib_1.__values(this._steps), _c = _b.next(); !_c.done; _c = _b.next()) {
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
export { NgxGauge };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZ2F1Z2UvIiwic291cmNlcyI6WyJnYXVnZS9nYXVnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUVMLGlCQUFpQixFQUNqQixRQUFRLEVBRVIsVUFBVSxFQUdWLFNBQVMsRUFDVCxZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNILEtBQUssRUFDTCxxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3BCLE9BQU8sRUFDUCxRQUFRLEVBQ1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0lBRTdGLFFBQVEsR0FBRztJQUNiLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLEdBQUc7SUFDUixJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxDQUFDO0lBQ1IsZ0JBQWdCLEVBQUUsU0FBUztJQUMzQixnQkFBZ0IsRUFBRSxvQkFBb0I7SUFDdEMsR0FBRyxFQUFFLE1BQU07SUFDWCxJQUFJLEVBQUUsR0FBRztDQUNaOzs7OztBQUtELFNBQVMsV0FBVyxDQUFDLENBQUM7SUFDbEIsT0FBTyxDQUFFLFNBQVMsRUFBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBQ0Q7SUF1R0ksa0JBQW9CLFdBQXVCLEVBQVUsU0FBbUI7UUFBcEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBN0VoRSxVQUFLLEdBQVcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM5QixTQUFJLEdBQVcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUM1QixTQUFJLEdBQVcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUM1QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGlC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QW9DOzs7OztJQUNwQyw0QkFBaUM7Ozs7O0lBRWpDLGdDQUFzQzs7Ozs7SUFDdEMsNEJBQTJDOzs7OztJQUMzQyx1Q0FBd0M7O0lBRXhDLDZCQUE0Qzs7SUFFNUMsa0NBQStEOztJQXlCL0Qsd0JBQTREOztJQUU1RCx1QkFBd0Q7O0lBRXhELHlCQUF3Qzs7SUFFeEMseUJBQXVCOztJQUV2QiwwQkFBd0I7O0lBRXhCLDJCQUF5Qjs7SUFFekIsbUNBQTZEOztJQUU3RCxtQ0FBNkQ7O0lBRTdELDhCQUFrRDs7Ozs7SUFFbEQsMEJBQTJCOzs7OztJQUMzQiwwQkFBb0Q7O0lBa0JwRCw0QkFBaUM7Ozs7O0lBSXJCLCtCQUErQjs7Ozs7SUFBRSw2QkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFJlbmRlcmVyLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIFZpZXdDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hHYXVnZUVycm9yIH0gZnJvbSAnLi9nYXVnZS1lcnJvcic7XG5pbXBvcnQge1xuICAgIGNsYW1wLFxuICAgIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgICBjb2VyY2VOdW1iZXJQcm9wZXJ0eSxcbiAgICBjc3NVbml0LFxuICAgIGlzTnVtYmVyXG59IGZyb20gJy4uL2NvbW1vbi91dGlsJztcbmltcG9ydCB7IE5neEdhdWdlTGFiZWwsIE5neEdhdWdlVmFsdWUsIE5neEdhdWdlUHJlcGVuZCwgTmd4R2F1Z2VBcHBlbmQgfSBmcm9tICcuL2dhdWdlLWRpcmVjdGl2ZXMnO1xuXG5jb25zdCBERUZBVUxUUyA9IHtcbiAgICBNSU46IDAsXG4gICAgTUFYOiAxMDAsXG4gICAgVFlQRTogJ2FyY2gnLFxuICAgIFRISUNLOiA0LFxuICAgIEZPUkVHUk9VTkRfQ09MT1I6ICcjMDA5Njg4JyxcbiAgICBCQUNLR1JPVU5EX0NPTE9SOiAncmdiYSgwLCAwLCAwLCAwLjEpJyxcbiAgICBDQVA6ICdidXR0JyxcbiAgICBTSVpFOiAyMDBcbn07XG5cbmV4cG9ydCB0eXBlIE5neEdhdWdlVHlwZSA9ICdmdWxsJyB8ICdhcmNoJyB8ICdzZW1pJztcbmV4cG9ydCB0eXBlIE5neEdhdWdlQ2FwID0gJ3JvdW5kJyB8ICdidXR0JztcblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IoaSkge1xuICAgIHJldHVybiBbICcjMDA5Njg4JyAsICcjZGJmN2Y3J11baV07XG59XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1nYXVnZScsXG4gICAgdGVtcGxhdGVVcmw6ICdnYXVnZS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZ2F1Z2UuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAncm9sZSc6ICdzbGlkZXInLFxuICAgICAgICAnYXJpYS1yZWFkb25seSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy5uZ3gtZ2F1Z2UtbWV0ZXJdJzogJ3RydWUnLFxuICAgICAgICAnW2F0dHIuYXJpYS12YWx1ZW1pbl0nOiAnbWluJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtdmFsdWVtYXhdJzogJ21heCcsXG4gICAgICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICd2YWx1ZScsXG4gICAgICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdhcmlhTGFiZWwnLFxuICAgICAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdhcmlhTGFiZWxsZWRieSdcblxuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hHYXVnZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2NhbnZhcycsIHsgc3RhdGljOiB0cnVlIH0pIF9jYW52YXM6IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkKE5neEdhdWdlTGFiZWwsIHsgc3RhdGljOiBmYWxzZSB9KSBfbGFiZWxDaGlsZDogTmd4R2F1Z2VMYWJlbDtcbiAgICBAQ29udGVudENoaWxkKE5neEdhdWdlUHJlcGVuZCwgeyBzdGF0aWM6IGZhbHNlIH0pIF9wcmVwZW5kQ2hpbGQ6IE5neEdhdWdlUHJlcGVuZDtcbiAgICBAQ29udGVudENoaWxkKE5neEdhdWdlQXBwZW5kLCB7IHN0YXRpYzogZmFsc2UgfSkgX2FwcGVuZENoaWxkOiBOZ3hHYXVnZUFwcGVuZDtcbiAgICBAQ29udGVudENoaWxkKE5neEdhdWdlVmFsdWUsIHsgc3RhdGljOiBmYWxzZSB9KSBfdmFsdWVEaXNwbGF5Q2hpbGQ6IE5neEdhdWdlVmFsdWU7XG5cbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXIgPSBERUZBVUxUUy5TSVpFO1xuICAgIHByaXZhdGUgX21pbjogbnVtYmVyID0gREVGQVVMVFMuTUlOO1xuICAgIHByaXZhdGUgX21heDogbnVtYmVyID0gREVGQVVMVFMuTUFYO1xuICAgIHByaXZhdGUgX2FuaW1hdGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uUmVxdWVzdElEOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2l6ZTsgfVxuICAgIHNldCBzaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW4oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21pbjsgfVxuICAgIHNldCBtaW4odmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9taW4gPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgREVGQVVMVFMuTUlOKTtcbiAgICB9XG4gICAgQElucHV0KClcbiAgICBnZXQgYW5pbWF0ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2FuaW1hdGU7IH1cbiAgICBzZXQgYW5pbWF0ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9hbmltYXRlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heDsgfVxuICAgIHNldCBtYXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tYXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgREVGQVVMVFMuTUFYKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSB0eXBlOiBOZ3hHYXVnZVR5cGUgPSBERUZBVUxUUy5UWVBFIGFzIE5neEdhdWdlVHlwZTtcblxuICAgIEBJbnB1dCgpIGNhcDogTmd4R2F1Z2VDYXAgPSBERUZBVUxUUy5DQVAgYXMgTmd4R2F1Z2VDYXA7XG5cbiAgICBASW5wdXQoKSB0aGljazogbnVtYmVyID0gREVGQVVMVFMuVEhJQ0s7XG5cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXBwZW5kOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwcmVwZW5kOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBmb3JlZ3JvdW5kQ29sb3I6IHN0cmluZyA9IERFRkFVTFRTLkZPUkVHUk9VTkRfQ09MT1I7XG5cbiAgICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyA9IERFRkFVTFRTLkJBQ0tHUk9VTkRfQ09MT1I7XG5cbiAgICBASW5wdXQoKSB0aHJlc2hvbGRzOiBPYmplY3QgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfc3RlcHM/OiB7IHJhdGlvOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcgfVtdO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICAgIHNldCB2YWx1ZSh2YWw6IGFueSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICBpZiggdHlwZW9mKHZhbFswXSkgPT09ICdvYmplY3QnICl7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwucmVkdWNlKChhLCBiKSA9PiBhICsgYi5zdGVwLCAwKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RlcHMgPSB2YWwubWFwKChzLCBpKSA9PiAoeyByYXRpbzogcy5zdGVwIC8gdGhpcy5fdmFsdWUsIGNvbG9yOiBzLmNvbG9yIHx8IHNlbGVjdENvbG9yKGkpIH0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0ZXBzID0gdmFsLm1hcCgocywgaSkgPT4gKHsgcmF0aW86IHMgLyB0aGlzLl92YWx1ZSwgY29sb3I6IHNlbGVjdENvbG9yKGkpIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGR1cmF0aW9uOiBudW1iZXIgPSAxMjAwO1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcikgeyB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IGlzQ2FudmFzUHJvcGVydHlDaGFuZ2VkID0gY2hhbmdlc1sndGhpY2snXSB8fCBjaGFuZ2VzWyd0eXBlJ10gfHwgY2hhbmdlc1snY2FwJ10gfHwgY2hhbmdlc1snc2l6ZSddO1xuICAgICAgICBjb25zdCBpc0RhdGFDaGFuZ2VkID0gY2hhbmdlc1sndmFsdWUnXSB8fCBjaGFuZ2VzWydtaW4nXSB8fCBjaGFuZ2VzWydtYXgnXTtcblxuICAgICAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGlmIChpc0RhdGFDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgbGV0IG52LCBvdjtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlc1sndmFsdWUnXSkge1xuICAgICAgICAgICAgICAgICAgICBudiA9IGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBvdiA9IGNoYW5nZXNbJ3ZhbHVlJ10ucHJldmlvdXNWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKG52LCBvdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNDYW52YXNQcm9wZXJ0eUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgY3NzVW5pdCh0aGlzLl9zaXplKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBjc3NVbml0KHRoaXMuX3NpemUpKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSB0aGlzLnNpemU7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5uYXRpdmVFbGVtZW50LmhlaWdodCA9IHRoaXMuc2l6ZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Qm91bmRzKHR5cGU6IE5neEdhdWdlVHlwZSkge1xuICAgICAgICBsZXQgaGVhZCwgdGFpbDtcbiAgICAgICAgaWYgKHR5cGUgPT0gJ3NlbWknKSB7XG4gICAgICAgICAgICBoZWFkID0gTWF0aC5QSTtcbiAgICAgICAgICAgIHRhaWwgPSAyICogTWF0aC5QSTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdmdWxsJykge1xuICAgICAgICAgICAgaGVhZCA9IDEuNSAqIE1hdGguUEk7XG4gICAgICAgICAgICB0YWlsID0gMy41ICogTWF0aC5QSTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnYXJjaCcpIHtcbiAgICAgICAgICAgIGhlYWQgPSAwLjggKiBNYXRoLlBJO1xuICAgICAgICAgICAgdGFpbCA9IDIuMiAqIE1hdGguUEk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGVhZCwgdGFpbCB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RyYXdTaGVsbChzdGFydDogbnVtYmVyLCBtaWRkbGU6IG51bWJlciwgdGFpbDogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLl9nZXRDZW50ZXIoKSxcbiAgICAgICAgICAgIHJhZGl1cyA9IHRoaXMuX2dldFJhZGl1cygpO1xuXG4gICAgICAgIG1pZGRsZSA9IE1hdGgubWF4KG1pZGRsZSwgc3RhcnQpOyAvLyBuZXZlciBiZWxvdyAwJVxuICAgICAgICBtaWRkbGUgPSBNYXRoLm1pbihtaWRkbGUsIHRhaWwpOyAvLyBuZXZlciBleGNlZWQgMTAwJVxuICAgICAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5hcmMoY2VudGVyLngsIGNlbnRlci55LCByYWRpdXMsIG1pZGRsZSwgdGFpbCwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fc3RlcHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0LmFyYyhjZW50ZXIueCwgY2VudGVyLnksIHJhZGl1cywgc3RhcnQsIG1pZGRsZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyY2hsZW4gPSBtaWRkbGUgLSBzdGFydFxuICAgICAgICAgICAgICAgIGxldCBzdGVwc3RhcnQgPSBzdGFydDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgY29sb3IsIHJhdGlvIH0gb2YgdGhpcy5fc3RlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RlcGVuZCA9IHN0ZXBzdGFydCArIGFyY2hsZW4gKiByYXRpbztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0LmFyYyhjZW50ZXIueCwgY2VudGVyLnksIHJhZGl1cywgc3RlcHN0YXJ0LCBzdGVwZW5kLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0ZXBzdGFydCA9IHN0ZXBlbmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2dldFdpZHRoKCksIHRoaXMuX2dldEhlaWdodCgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UmFkaXVzKCkge1xuICAgICAgICB2YXIgY2VudGVyID0gdGhpcy5fZ2V0Q2VudGVyKCk7XG4gICAgICAgIHJldHVybiBjZW50ZXIueCAtIHRoaXMudGhpY2s7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Q2VudGVyKCkge1xuICAgICAgICB2YXIgeCA9IHRoaXMuX2dldFdpZHRoKCkgLyAyLFxuICAgICAgICAgICAgeSA9IHRoaXMuX2dldEhlaWdodCgpIC8gMjtcbiAgICAgICAgcmV0dXJuIHsgeCwgeSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXQoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSAodGhpcy5fY2FudmFzLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTENhbnZhc0VsZW1lbnQpLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgICB0aGlzLl9zZXR1cFN0eWxlcygpO1xuICAgICAgICB0aGlzLl9jcmVhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uUmVxdWVzdElEKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fYW5pbWF0aW9uUmVxdWVzdElEKTtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvblJlcXVlc3RJRCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0dXBTdHlsZXMoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZUNhcCA9IHRoaXMuY2FwO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMudGhpY2s7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Rm9yZWdyb3VuZENvbG9yQnlSYW5nZSh2YWx1ZSkge1xuXG4gICAgICAgIGNvbnN0IG1hdGNoID0gT2JqZWN0LmtleXModGhpcy50aHJlc2hvbGRzKVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXNOdW1iZXIoaXRlbSkgJiYgTnVtYmVyKGl0ZW0pIDw9IHZhbHVlIH0pXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpKVxuICAgICAgICAgICAgLnJldmVyc2UoKVswXTtcblxuICAgICAgICByZXR1cm4gbWF0Y2ggIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0aGlzLnRocmVzaG9sZHNbbWF0Y2hdLmNvbG9yIHx8IHRoaXMuZm9yZWdyb3VuZENvbG9yXG4gICAgICAgICAgICA6IHRoaXMuZm9yZWdyb3VuZENvbG9yO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZShudj86IG51bWJlciwgb3Y/OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgdHlwZSA9IHRoaXMudHlwZSxcbiAgICAgICAgICAgIGJvdW5kcyA9IHRoaXMuX2dldEJvdW5kcyh0eXBlKSxcbiAgICAgICAgICAgIGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbixcbiAgICAgICAgICAgIG1pbiA9IHRoaXMubWluLFxuICAgICAgICAgICAgbWF4ID0gdGhpcy5tYXgsXG4gICAgICAgICAgICB2YWx1ZSA9IGNsYW1wKHRoaXMudmFsdWUsIHRoaXMubWluLCB0aGlzLm1heCksXG4gICAgICAgICAgICBzdGFydCA9IGJvdW5kcy5oZWFkLFxuICAgICAgICAgICAgdW5pdCA9IChib3VuZHMudGFpbCAtIGJvdW5kcy5oZWFkKSAvIChtYXggLSBtaW4pLFxuICAgICAgICAgICAgZGlzcGxhY2VtZW50ID0gdW5pdCAqICh2YWx1ZSAtIG1pbiksXG4gICAgICAgICAgICB0YWlsID0gYm91bmRzLnRhaWwsXG4gICAgICAgICAgICBjb2xvciA9IHRoaXMuX2dldEZvcmVncm91bmRDb2xvckJ5UmFuZ2UodmFsdWUpLFxuICAgICAgICAgICAgc3RhcnRUaW1lO1xuXG4gICAgICAgIGlmIChzZWxmLl9hbmltYXRpb25SZXF1ZXN0SUQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShzZWxmLl9hbmltYXRpb25SZXF1ZXN0SUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYW5pbWF0ZSh0aW1lc3RhbXApIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcCA9IHRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGxldCBydW50aW1lID0gdGltZXN0YW1wIC0gc3RhcnRUaW1lO1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gTWF0aC5taW4ocnVudGltZSAvIGR1cmF0aW9uLCAxKTtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1Byb2dyZXNzID0gb3YgPyAob3YgLSBtaW4pICogdW5pdCA6IDA7XG4gICAgICAgICAgICBsZXQgbWlkZGxlID0gc3RhcnQgKyBwcmV2aW91c1Byb2dyZXNzICsgZGlzcGxhY2VtZW50ICogcHJvZ3Jlc3M7XG5cbiAgICAgICAgICAgIHNlbGYuX2RyYXdTaGVsbChzdGFydCwgbWlkZGxlLCB0YWlsLCBjb2xvcik7XG4gICAgICAgICAgICBpZiAoc2VsZi5fYW5pbWF0aW9uUmVxdWVzdElEICYmIChydW50aW1lIDwgZHVyYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYW5pbWF0aW9uUmVxdWVzdElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZXN0YW1wKSA9PiBhbmltYXRlKHRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoc2VsZi5fYW5pbWF0aW9uUmVxdWVzdElEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYW5pbWF0ZSkge1xuICAgICAgICAgICAgaWYgKG52ICE9IHVuZGVmaW5lZCAmJiBvdiAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnQgPSB1bml0ICogbnYgLSB1bml0ICogb3Y7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLl9hbmltYXRpb25SZXF1ZXN0SUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICAgICBzdGFydFRpbWUgPSB0aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZShzdGFydFRpbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLl9kcmF3U2hlbGwoc3RhcnQsIHN0YXJ0ICsgZGlzcGxhY2VtZW50LCB0YWlsLCBjb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGUobnY6IG51bWJlciwgb3Y6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9jbGVhcigpO1xuICAgICAgICB0aGlzLl9jcmVhdGUobnYsIG92KTtcbiAgICB9XG5cbn0iXX0=