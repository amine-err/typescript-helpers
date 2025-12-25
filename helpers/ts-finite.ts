type Not<N, T, A = any> = [T] extends [N] ? never : (
  [T] extends [A] ? T : never
);

type Infinity = 1e999 | -1e999;
type LiteralNumber<T> = T extends number ? (
  number extends T ? never : T
) : never;
type FiniteNumber<T> = Not<Infinity, T, LiteralNumber<T>>;

/* 
// In this use case `Not` is not really needed, you can just implement it directly with `LiteralNumber`:
type FiniteNumber<T> = T extends number ? (
  number extends T ? never : (
    T extends Infinity ? never : (
      T extends Infinity ? never : T
    )
  )
) : never;
 */

const takesFiniteNumber = <T extends number>(n: FiniteNumber<T>) => n;

takesFiniteNumber(10);
takesFiniteNumber(3.14);
takesFiniteNumber(-42.5);
takesFiniteNumber(1e6);
takesFiniteNumber(1e999);
takesFiniteNumber(-1e999);
takesFiniteNumber(Infinity);
takesFiniteNumber(-Infinity);
takesFiniteNumber(NaN);