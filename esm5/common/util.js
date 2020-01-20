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
    return value != null && "" + value !== 'false';
}
/**
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
export function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
/**
 * @param {?} value
 * @return {?}
 */
export function cssUnit(value) {
    return value + "px";
}
/**
 * @param {?} value
 * @return {?}
 */
export function isNumber(value) {
    return value != undefined && !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1nYXVnZS8iLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFVBQVUsS0FBSyxDQUFDLEtBQWEsRUFBRSxHQUFXLEVBQUUsR0FBVztJQUN6RCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDL0MsQ0FBQzs7Ozs7QUFDRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsS0FBVTtJQUM1QyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksS0FBRyxLQUFPLEtBQUssT0FBTyxDQUFDO0FBQ25ELENBQUM7Ozs7OztBQUNELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxLQUFVLEVBQUUsYUFBeUI7SUFBekIsOEJBQUEsRUFBQSxpQkFBeUI7SUFDdEUsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1RixDQUFDOzs7OztBQUNELE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBYTtJQUNqQyxPQUFVLEtBQUssT0FBSSxDQUFDO0FBQ3hCLENBQUM7Ozs7O0FBQ0QsTUFBTSxVQUFVLFFBQVEsQ0FBQyxLQUFhO0lBQ2xDLE9BQU8sS0FBSyxJQUFJLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2YWx1ZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gJ2ZhbHNlJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZTogYW55LCBmYWxsYmFja1ZhbHVlOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpIHx8IGlzTmFOKE51bWJlcih2YWx1ZSkpID8gZmFsbGJhY2tWYWx1ZSA6IE51bWJlcih2YWx1ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3NzVW5pdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGAke3ZhbHVlfXB4YDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9IHVuZGVmaW5lZCAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmICFpc05hTihOdW1iZXIodmFsdWUpKTtcbn0iXX0=