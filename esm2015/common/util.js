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
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
/**
 * @param {?} value
 * @return {?}
 */
export function coerceBooleanProperty(value) {
    return value != null && `${value}` !== 'false';
}
/**
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
export function coerceNumberProperty(value, fallbackValue = 0) {
    return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
/**
 * @param {?} value
 * @return {?}
 */
export function cssUnit(value) {
    return `${value}px`;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isNumber(value) {
    return value != undefined && !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1nYXVnZS8iLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFVBQVUsS0FBSyxDQUFDLEtBQWEsRUFBRSxHQUFXLEVBQUUsR0FBVztJQUN6RCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDL0MsQ0FBQzs7Ozs7QUFDRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsS0FBVTtJQUM1QyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLEVBQUUsS0FBSyxPQUFPLENBQUM7QUFDbkQsQ0FBQzs7Ozs7O0FBQ0QsTUFBTSxVQUFVLG9CQUFvQixDQUFDLEtBQVUsRUFBRSxnQkFBd0IsQ0FBQztJQUN0RSxPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVGLENBQUM7Ozs7O0FBQ0QsTUFBTSxVQUFVLE9BQU8sQ0FBQyxLQUFhO0lBQ2pDLE9BQU8sR0FBRyxLQUFLLElBQUksQ0FBQztBQUN4QixDQUFDOzs7OztBQUNELE1BQU0sVUFBVSxRQUFRLENBQUMsS0FBYTtJQUNsQyxPQUFPLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDcEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjbGFtcCh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgdmFsdWUpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGAke3ZhbHVlfWAgIT09ICdmYWxzZSc7XG59XG5leHBvcnQgZnVuY3Rpb24gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWU6IGFueSwgZmFsbGJhY2tWYWx1ZTogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSB8fCBpc05hTihOdW1iZXIodmFsdWUpKSA/IGZhbGxiYWNrVmFsdWUgOiBOdW1iZXIodmFsdWUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNzc1VuaXQodmFsdWU6IG51bWJlcikge1xuICAgIHJldHVybiBgJHt2YWx1ZX1weGA7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZSAhPSB1bmRlZmluZWQgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiAhaXNOYU4oTnVtYmVyKHZhbHVlKSk7XG59Il19