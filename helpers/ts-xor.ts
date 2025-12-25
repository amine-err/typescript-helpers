/** Given type `T`, if it is an object, it will return a union of all keys of `T`. */
type AllKeys<T> = T extends object ? keyof T : never;
/** Given type `T`, it will return an object type of all properties of `T` as optional, and their values set to never. */
type AllProps<T> = {[K in AllKeys<T>]?: never};
/**
 * Returns a new object type built from the combined properties of the given `T` and `U` types.\
 * It removes from `U` properties that already exists in `T`.
 */
type Combine<T, U> = (T & Omit<U, keyof T>) extends infer V ? {[K in keyof V]: V[K]} : never;
/**
 * Returns a combined object type of `T` and `U`, where all properties of `U` are set to never.\
 * If `T` is not an object, it returns `T` as is.
 */
type Only<T, U extends object> = T extends object ? Combine<T, U> : T;
type XOR<T> = Only<T, AllProps<T>>;

type A1 = {m: string, a?: string};
type A2 = {m: string, b: string};
type A3 = {m: string, c: string};
type A4 = {m: string, d: string};
type A = number | 'test2' | A1 | A2 | A3 | A4;

type XORTest = XOR<A>;

const test1: XORTest = 24;
const test2: XORTest = 'test2';
const test3: XORTest = {m: 'test3', c: 'works'};
const test4: XORTest = {m: 'test4', b: 'gives', c: 'error'};
