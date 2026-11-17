/**
 * GoF Prototype — an object that knows how to copy itself.
 *
 * Use when a valid object is expensive or tedious to build from scratch (for
 * example a captured API payload with nested images and ingredients), and tests
 * only need small variations of it: clone the prototype, change what matters.
 */
export interface Prototype<T> {
    clone(): T;
}
