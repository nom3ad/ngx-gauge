/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation, Renderer, ElementRef, ViewChild, ContentChild } from '@angular/core';
import { clamp, coerceBooleanProperty, coerceNumberProperty, cssUnit, isNumber } from '../common/util';
import { NgxGaugeLabel, NgxGaugeValue, NgxGaugePrepend, NgxGaugeAppend } from './gauge-directives';
/** @type {?} */
const DEFAULTS = {
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
export class NgxGauge {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
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
    /**
     * @return {?}
     */
    get size() { return this._size; }
    /**
     * @param {?} value
     * @return {?}
     */
    set size(value) {
        this._size = coerceNumberProperty(value);
    }
    /**
     * @return {?}
     */
    get min() { return this._min; }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = coerceNumberProperty(value, DEFAULTS.MIN);
    }
    /**
     * @return {?}
     */
    get animate() { return this._animate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set animate(value) {
        this._animate = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get max() { return this._max; }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = coerceNumberProperty(value, DEFAULTS.MAX);
    }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        if (Array.isArray(val)) {
            if (typeof (val[0]) === 'object') {
                this._value = coerceNumberProperty(val.reduce((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => a + b.step), 0));
                this._steps = val.map((/**
                 * @param {?} s
                 * @param {?} i
                 * @return {?}
                 */
                (s, i) => ({ ratio: s.step / this._value, color: s.color || selectColor(i) })));
            }
            else {
                this._value = coerceNumberProperty(val.reduce((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => a + b), 0));
                this._steps = val.map((/**
                 * @param {?} s
                 * @param {?} i
                 * @return {?}
                 */
                (s, i) => ({ ratio: s / this._value, color: selectColor(i) })));
            }
        }
        else {
            this._value = coerceNumberProperty(val);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const isCanvasPropertyChanged = changes['thick'] || changes['type'] || changes['cap'] || changes['size'];
        /** @type {?} */
        const isDataChanged = changes['value'] || changes['min'] || changes['max'];
        if (this._initialized) {
            if (isDataChanged) {
                /** @type {?} */
                let nv;
                /** @type {?} */
                let ov;
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
    }
    /**
     * @private
     * @return {?}
     */
    _updateSize() {
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'width', cssUnit(this._size));
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'height', cssUnit(this._size));
        this._canvas.nativeElement.width = this.size;
        this._canvas.nativeElement.height = this.size;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this._canvas) {
            this._init();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy();
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    _getBounds(type) {
        /** @type {?} */
        let head;
        /** @type {?} */
        let tail;
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
        return { head, tail };
    }
    /**
     * @private
     * @param {?} start
     * @param {?} middle
     * @param {?} tail
     * @param {?} color
     * @return {?}
     */
    _drawShell(start, middle, tail, color) {
        /** @type {?} */
        let center = this._getCenter();
        /** @type {?} */
        let radius = this._getRadius();
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
                const archlen = middle - start;
                /** @type {?} */
                let stepstart = start;
                for (const { color, ratio } of this._steps) {
                    /** @type {?} */
                    const stepend = stepstart + archlen * ratio;
                    this._context.beginPath();
                    this._context.strokeStyle = color;
                    this._context.arc(center.x, center.y, radius, stepstart, stepend, false);
                    this._context.stroke();
                    stepstart = stepend;
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    _clear() {
        this._context.clearRect(0, 0, this._getWidth(), this._getHeight());
    }
    /**
     * @private
     * @return {?}
     */
    _getWidth() {
        return this.size;
    }
    /**
     * @private
     * @return {?}
     */
    _getHeight() {
        return this.size;
    }
    /**
     * @private
     * @return {?}
     */
    _getRadius() {
        /** @type {?} */
        var center = this._getCenter();
        return center.x - this.thick;
    }
    /**
     * @private
     * @return {?}
     */
    _getCenter() {
        /** @type {?} */
        var x = this._getWidth() / 2;
        /** @type {?} */
        var y = this._getHeight() / 2;
        return { x, y };
    }
    /**
     * @private
     * @return {?}
     */
    _init() {
        this._context = ((/** @type {?} */ (this._canvas.nativeElement))).getContext('2d');
        this._initialized = true;
        this._updateSize();
        this._setupStyles();
        this._create();
    }
    /**
     * @private
     * @return {?}
     */
    _destroy() {
        if (this._animationRequestID) {
            window.cancelAnimationFrame(this._animationRequestID);
            this._animationRequestID = 0;
        }
        this._clear();
        this._context = null;
        this._initialized = false;
    }
    /**
     * @private
     * @return {?}
     */
    _setupStyles() {
        this._context.lineCap = this.cap;
        this._context.lineWidth = this.thick;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _getForegroundColorByRange(value) {
        /** @type {?} */
        const match = Object.keys(this.thresholds)
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
        (a, b) => Number(a) - Number(b)))
            .reverse()[0];
        return match !== undefined
            ? this.thresholds[match].color || this.foregroundColor
            : this.foregroundColor;
    }
    /**
     * @private
     * @param {?=} nv
     * @param {?=} ov
     * @return {?}
     */
    _create(nv, ov) {
        /** @type {?} */
        let self = this;
        /** @type {?} */
        let type = this.type;
        /** @type {?} */
        let bounds = this._getBounds(type);
        /** @type {?} */
        let duration = this.duration;
        /** @type {?} */
        let min = this.min;
        /** @type {?} */
        let max = this.max;
        /** @type {?} */
        let value = clamp(this.value, this.min, this.max);
        /** @type {?} */
        let start = bounds.head;
        /** @type {?} */
        let unit = (bounds.tail - bounds.head) / (max - min);
        /** @type {?} */
        let displacement = unit * (value - min);
        /** @type {?} */
        let tail = bounds.tail;
        /** @type {?} */
        let color = this._getForegroundColorByRange(value);
        /** @type {?} */
        let startTime;
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
            let runtime = timestamp - startTime;
            /** @type {?} */
            let progress = Math.min(runtime / duration, 1);
            /** @type {?} */
            let previousProgress = ov ? (ov - min) * unit : 0;
            /** @type {?} */
            let middle = start + previousProgress + displacement * progress;
            self._drawShell(start, middle, tail, color);
            if (self._animationRequestID && (runtime < duration)) {
                self._animationRequestID = window.requestAnimationFrame((/**
                 * @param {?} timestamp
                 * @return {?}
                 */
                (timestamp) => animate(timestamp)));
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
            (timestamp) => {
                startTime = timestamp || new Date().getTime();
                animate(startTime);
            }));
        }
        else {
            self._drawShell(start, start + displacement, tail, color);
        }
    }
    /**
     * @private
     * @param {?} nv
     * @param {?} ov
     * @return {?}
     */
    _update(nv, ov) {
        this._clear();
        this._create(nv, ov);
    }
}
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
NgxGauge.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZ2F1Z2UvIiwic291cmNlcyI6WyJnYXVnZS9nYXVnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBRUwsaUJBQWlCLEVBQ2pCLFFBQVEsRUFFUixVQUFVLEVBR1YsU0FBUyxFQUNULFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0gsS0FBSyxFQUNMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFDcEIsT0FBTyxFQUNQLFFBQVEsRUFDWCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7TUFFN0YsUUFBUSxHQUFHO0lBQ2IsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsR0FBRztJQUNSLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLENBQUM7SUFDUixnQkFBZ0IsRUFBRSxTQUFTO0lBQzNCLGdCQUFnQixFQUFFLG9CQUFvQjtJQUN0QyxHQUFHLEVBQUUsTUFBTTtJQUNYLElBQUksRUFBRSxHQUFHO0NBQ1o7Ozs7O0FBS0QsU0FBUyxXQUFXLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUUsU0FBUyxFQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFrQkQsTUFBTSxPQUFPLFFBQVE7Ozs7O0lBc0ZqQixZQUFvQixXQUF1QixFQUFVLFNBQW1CO1FBQXBELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQTdFaEUsVUFBSyxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDOUIsU0FBSSxHQUFXLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDNUIsU0FBSSxHQUFXLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDNUIsYUFBUSxHQUFZ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bnQsXG4gICAgSW5wdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBSZW5kZXJlcixcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgQ29udGVudENoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4R2F1Z2VFcnJvciB9IGZyb20gJy4vZ2F1Z2UtZXJyb3InO1xuaW1wb3J0IHtcbiAgICBjbGFtcCxcbiAgICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gICAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gICAgY3NzVW5pdCxcbiAgICBpc051bWJlclxufSBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5pbXBvcnQgeyBOZ3hHYXVnZUxhYmVsLCBOZ3hHYXVnZVZhbHVlLCBOZ3hHYXVnZVByZXBlbmQsIE5neEdhdWdlQXBwZW5kIH0gZnJvbSAnLi9nYXVnZS1kaXJlY3RpdmVzJztcblxuY29uc3QgREVGQVVMVFMgPSB7XG4gICAgTUlOOiAwLFxuICAgIE1BWDogMTAwLFxuICAgIFRZUEU6ICdhcmNoJyxcbiAgICBUSElDSzogNCxcbiAgICBGT1JFR1JPVU5EX0NPTE9SOiAnIzAwOTY4OCcsXG4gICAgQkFDS0dST1VORF9DT0xPUjogJ3JnYmEoMCwgMCwgMCwgMC4xKScsXG4gICAgQ0FQOiAnYnV0dCcsXG4gICAgU0laRTogMjAwXG59O1xuXG5leHBvcnQgdHlwZSBOZ3hHYXVnZVR5cGUgPSAnZnVsbCcgfCAnYXJjaCcgfCAnc2VtaSc7XG5leHBvcnQgdHlwZSBOZ3hHYXVnZUNhcCA9ICdyb3VuZCcgfCAnYnV0dCc7XG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKGkpIHtcbiAgICByZXR1cm4gWyAnIzAwOTY4OCcgLCAnI2RiZjdmNyddW2ldO1xufVxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtZ2F1Z2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnZ2F1Z2UuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2dhdWdlLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ3JvbGUnOiAnc2xpZGVyJyxcbiAgICAgICAgJ2FyaWEtcmVhZG9ubHknOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3Mubmd4LWdhdWdlLW1ldGVyXSc6ICd0cnVlJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtdmFsdWVtaW5dJzogJ21pbicsXG4gICAgICAgICdbYXR0ci5hcmlhLXZhbHVlbWF4XSc6ICdtYXgnLFxuICAgICAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAndmFsdWUnLFxuICAgICAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnYXJpYUxhYmVsJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnYXJpYUxhYmVsbGVkYnknXG5cbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTmd4R2F1Z2UgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgICBAVmlld0NoaWxkKCdjYW52YXMnLCB7IHN0YXRpYzogdHJ1ZSB9KSBfY2FudmFzOiBFbGVtZW50UmVmO1xuXG4gICAgQENvbnRlbnRDaGlsZChOZ3hHYXVnZUxhYmVsLCB7IHN0YXRpYzogZmFsc2UgfSkgX2xhYmVsQ2hpbGQ6IE5neEdhdWdlTGFiZWw7XG4gICAgQENvbnRlbnRDaGlsZChOZ3hHYXVnZVByZXBlbmQsIHsgc3RhdGljOiBmYWxzZSB9KSBfcHJlcGVuZENoaWxkOiBOZ3hHYXVnZVByZXBlbmQ7XG4gICAgQENvbnRlbnRDaGlsZChOZ3hHYXVnZUFwcGVuZCwgeyBzdGF0aWM6IGZhbHNlIH0pIF9hcHBlbmRDaGlsZDogTmd4R2F1Z2VBcHBlbmQ7XG4gICAgQENvbnRlbnRDaGlsZChOZ3hHYXVnZVZhbHVlLCB7IHN0YXRpYzogZmFsc2UgfSkgX3ZhbHVlRGlzcGxheUNoaWxkOiBOZ3hHYXVnZVZhbHVlO1xuXG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyID0gREVGQVVMVFMuU0laRTtcbiAgICBwcml2YXRlIF9taW46IG51bWJlciA9IERFRkFVTFRTLk1JTjtcbiAgICBwcml2YXRlIF9tYXg6IG51bWJlciA9IERFRkFVTFRTLk1BWDtcbiAgICBwcml2YXRlIF9hbmltYXRlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgX2luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgX2FuaW1hdGlvblJlcXVlc3RJRDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NpemU7IH1cbiAgICBzZXQgc2l6ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9taW47IH1cbiAgICBzZXQgbWluKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWluID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUsIERFRkFVTFRTLk1JTik7XG4gICAgfVxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGFuaW1hdGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9hbmltYXRlOyB9XG4gICAgc2V0IGFuaW1hdGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9tYXg7IH1cbiAgICBzZXQgbWF4KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWF4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUsIERFRkFVTFRTLk1BWCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgdHlwZTogTmd4R2F1Z2VUeXBlID0gREVGQVVMVFMuVFlQRSBhcyBOZ3hHYXVnZVR5cGU7XG5cbiAgICBASW5wdXQoKSBjYXA6IE5neEdhdWdlQ2FwID0gREVGQVVMVFMuQ0FQIGFzIE5neEdhdWdlQ2FwO1xuXG4gICAgQElucHV0KCkgdGhpY2s6IG51bWJlciA9IERFRkFVTFRTLlRISUNLO1xuXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFwcGVuZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcHJlcGVuZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZm9yZWdyb3VuZENvbG9yOiBzdHJpbmcgPSBERUZBVUxUUy5GT1JFR1JPVU5EX0NPTE9SO1xuXG4gICAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yOiBzdHJpbmcgPSBERUZBVUxUUy5CQUNLR1JPVU5EX0NPTE9SO1xuXG4gICAgQElucHV0KCkgdGhyZXNob2xkczogT2JqZWN0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3N0ZXBzPzogeyByYXRpbzogbnVtYmVyLCBjb2xvcjogc3RyaW5nIH1bXTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgICBzZXQgdmFsdWUodmFsOiBhbnkpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgaWYoIHR5cGVvZih2YWxbMF0pID09PSAnb2JqZWN0JyApe1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLnJlZHVjZSgoYSwgYikgPT4gYSArIGIuc3RlcCwgMCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0ZXBzID0gdmFsLm1hcCgocywgaSkgPT4gKHsgcmF0aW86IHMuc3RlcCAvIHRoaXMuX3ZhbHVlLCBjb2xvcjogcy5jb2xvciB8fCBzZWxlY3RDb2xvcihpKSB9KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGVwcyA9IHZhbC5tYXAoKHMsIGkpID0+ICh7IHJhdGlvOiBzIC8gdGhpcy5fdmFsdWUsIGNvbG9yOiBzZWxlY3RDb2xvcihpKSB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBkdXJhdGlvbjogbnVtYmVyID0gMTIwMDtcblxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIpIHsgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBjb25zdCBpc0NhbnZhc1Byb3BlcnR5Q2hhbmdlZCA9IGNoYW5nZXNbJ3RoaWNrJ10gfHwgY2hhbmdlc1sndHlwZSddIHx8IGNoYW5nZXNbJ2NhcCddIHx8IGNoYW5nZXNbJ3NpemUnXTtcbiAgICAgICAgY29uc3QgaXNEYXRhQ2hhbmdlZCA9IGNoYW5nZXNbJ3ZhbHVlJ10gfHwgY2hhbmdlc1snbWluJ10gfHwgY2hhbmdlc1snbWF4J107XG5cbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEYXRhQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIGxldCBudiwgb3Y7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgbnYgPSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgb3YgPSBjaGFuZ2VzWyd2YWx1ZSddLnByZXZpb3VzVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShudiwgb3YpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQ2FudmFzUHJvcGVydHlDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVNpemUoKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGNzc1VuaXQodGhpcy5fc2l6ZSkpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgY3NzVW5pdCh0aGlzLl9zaXplKSk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5uYXRpdmVFbGVtZW50LndpZHRoID0gdGhpcy5zaXplO1xuICAgICAgICB0aGlzLl9jYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEJvdW5kcyh0eXBlOiBOZ3hHYXVnZVR5cGUpIHtcbiAgICAgICAgbGV0IGhlYWQsIHRhaWw7XG4gICAgICAgIGlmICh0eXBlID09ICdzZW1pJykge1xuICAgICAgICAgICAgaGVhZCA9IE1hdGguUEk7XG4gICAgICAgICAgICB0YWlsID0gMiAqIE1hdGguUEk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAnZnVsbCcpIHtcbiAgICAgICAgICAgIGhlYWQgPSAxLjUgKiBNYXRoLlBJO1xuICAgICAgICAgICAgdGFpbCA9IDMuNSAqIE1hdGguUEk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2FyY2gnKSB7XG4gICAgICAgICAgICBoZWFkID0gMC44ICogTWF0aC5QSTtcbiAgICAgICAgICAgIHRhaWwgPSAyLjIgKiBNYXRoLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGhlYWQsIHRhaWwgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kcmF3U2hlbGwoc3RhcnQ6IG51bWJlciwgbWlkZGxlOiBudW1iZXIsIHRhaWw6IG51bWJlciwgY29sb3I6IHN0cmluZykge1xuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5fZ2V0Q2VudGVyKCksXG4gICAgICAgICAgICByYWRpdXMgPSB0aGlzLl9nZXRSYWRpdXMoKTtcblxuICAgICAgICBtaWRkbGUgPSBNYXRoLm1heChtaWRkbGUsIHN0YXJ0KTsgLy8gbmV2ZXIgYmVsb3cgMCVcbiAgICAgICAgbWlkZGxlID0gTWF0aC5taW4obWlkZGxlLCB0YWlsKTsgLy8gbmV2ZXIgZXhjZWVkIDEwMCVcbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgcmFkaXVzLCBtaWRkbGUsIHRhaWwsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3N0ZXBzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dC5hcmMoY2VudGVyLngsIGNlbnRlci55LCByYWRpdXMsIHN0YXJ0LCBtaWRkbGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcmNobGVuID0gbWlkZGxlIC0gc3RhcnRcbiAgICAgICAgICAgICAgICBsZXQgc3RlcHN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB7IGNvbG9yLCByYXRpbyB9IG9mIHRoaXMuX3N0ZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXBlbmQgPSBzdGVwc3RhcnQgKyBhcmNobGVuICogcmF0aW87XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dC5hcmMoY2VudGVyLngsIGNlbnRlci55LCByYWRpdXMsIHN0ZXBzdGFydCwgc3RlcGVuZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICBzdGVwc3RhcnQgPSBzdGVwZW5kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFyKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9nZXRXaWR0aCgpLCB0aGlzLl9nZXRIZWlnaHQoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFJhZGl1cygpIHtcbiAgICAgICAgdmFyIGNlbnRlciA9IHRoaXMuX2dldENlbnRlcigpO1xuICAgICAgICByZXR1cm4gY2VudGVyLnggLSB0aGlzLnRoaWNrO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldENlbnRlcigpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLl9nZXRXaWR0aCgpIC8gMixcbiAgICAgICAgICAgIHkgPSB0aGlzLl9nZXRIZWlnaHQoKSAvIDI7XG4gICAgICAgIHJldHVybiB7IHgsIHkgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0KCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gKHRoaXMuX2NhbnZhcy5uYXRpdmVFbGVtZW50IGFzIEhUTUxDYW52YXNFbGVtZW50KS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgdGhpcy5fc2V0dXBTdHlsZXMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGlvblJlcXVlc3RJRCkge1xuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGlvblJlcXVlc3RJRCk7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25SZXF1ZXN0SUQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldHVwU3R5bGVzKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVDYXAgPSB0aGlzLmNhcDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnRoaWNrO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEZvcmVncm91bmRDb2xvckJ5UmFuZ2UodmFsdWUpIHtcblxuICAgICAgICBjb25zdCBtYXRjaCA9IE9iamVjdC5rZXlzKHRoaXMudGhyZXNob2xkcylcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGlzTnVtYmVyKGl0ZW0pICYmIE51bWJlcihpdGVtKSA8PSB2YWx1ZSB9KVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKSlcbiAgICAgICAgICAgIC5yZXZlcnNlKClbMF07XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy50aHJlc2hvbGRzW21hdGNoXS5jb2xvciB8fCB0aGlzLmZvcmVncm91bmRDb2xvclxuICAgICAgICAgICAgOiB0aGlzLmZvcmVncm91bmRDb2xvcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGUobnY/OiBudW1iZXIsIG92PzogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHR5cGUgPSB0aGlzLnR5cGUsXG4gICAgICAgICAgICBib3VuZHMgPSB0aGlzLl9nZXRCb3VuZHModHlwZSksXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb24sXG4gICAgICAgICAgICBtaW4gPSB0aGlzLm1pbixcbiAgICAgICAgICAgIG1heCA9IHRoaXMubWF4LFxuICAgICAgICAgICAgdmFsdWUgPSBjbGFtcCh0aGlzLnZhbHVlLCB0aGlzLm1pbiwgdGhpcy5tYXgpLFxuICAgICAgICAgICAgc3RhcnQgPSBib3VuZHMuaGVhZCxcbiAgICAgICAgICAgIHVuaXQgPSAoYm91bmRzLnRhaWwgLSBib3VuZHMuaGVhZCkgLyAobWF4IC0gbWluKSxcbiAgICAgICAgICAgIGRpc3BsYWNlbWVudCA9IHVuaXQgKiAodmFsdWUgLSBtaW4pLFxuICAgICAgICAgICAgdGFpbCA9IGJvdW5kcy50YWlsLFxuICAgICAgICAgICAgY29sb3IgPSB0aGlzLl9nZXRGb3JlZ3JvdW5kQ29sb3JCeVJhbmdlKHZhbHVlKSxcbiAgICAgICAgICAgIHN0YXJ0VGltZTtcblxuICAgICAgICBpZiAoc2VsZi5fYW5pbWF0aW9uUmVxdWVzdElEKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoc2VsZi5fYW5pbWF0aW9uUmVxdWVzdElEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFuaW1hdGUodGltZXN0YW1wKSB7XG4gICAgICAgICAgICB0aW1lc3RhbXAgPSB0aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBsZXQgcnVudGltZSA9IHRpbWVzdGFtcCAtIHN0YXJ0VGltZTtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IE1hdGgubWluKHJ1bnRpbWUgLyBkdXJhdGlvbiwgMSk7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNQcm9ncmVzcyA9IG92ID8gKG92IC0gbWluKSAqIHVuaXQgOiAwO1xuICAgICAgICAgICAgbGV0IG1pZGRsZSA9IHN0YXJ0ICsgcHJldmlvdXNQcm9ncmVzcyArIGRpc3BsYWNlbWVudCAqIHByb2dyZXNzO1xuXG4gICAgICAgICAgICBzZWxmLl9kcmF3U2hlbGwoc3RhcnQsIG1pZGRsZSwgdGFpbCwgY29sb3IpO1xuICAgICAgICAgICAgaWYgKHNlbGYuX2FuaW1hdGlvblJlcXVlc3RJRCAmJiAocnVudGltZSA8IGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX2FuaW1hdGlvblJlcXVlc3RJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWVzdGFtcCkgPT4gYW5pbWF0ZSh0aW1lc3RhbXApKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHNlbGYuX2FuaW1hdGlvblJlcXVlc3RJRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGUpIHtcbiAgICAgICAgICAgIGlmIChudiAhPSB1bmRlZmluZWQgJiYgb3YgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50ID0gdW5pdCAqIG52IC0gdW5pdCAqIG92O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fYW5pbWF0aW9uUmVxdWVzdElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gdGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoc3RhcnRUaW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5fZHJhd1NoZWxsKHN0YXJ0LCBzdGFydCArIGRpc3BsYWNlbWVudCwgdGFpbCwgY29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlKG52OiBudW1iZXIsIG92OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlKG52LCBvdik7XG4gICAgfVxuXG59Il19