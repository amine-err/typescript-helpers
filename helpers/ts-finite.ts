import { Not } from "./ts-not";

type Infinity = 1e999 | -1e999;
type LiteralNumber<T> = T extends number ? (
  number extends T ? never : (
    T extends Infinity ? never : T
  )
) : never;
type FiniteNumber<T> = Not<Infinity, T, LiteralNumber<T>>;

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
