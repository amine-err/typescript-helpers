type AllKeys<T> = T extends object ? keyof T : never;
type AllProps<T> = {[K in AllKeys<T>]?: never};
type Combine<T, U> = (T & Omit<U, keyof T>) extends infer V ? {[K in keyof V]: V[K]} : never;
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
