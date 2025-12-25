type Infinity = 1e309 | -1e309;
type FiniteNumber<T> = T extends number ? (
  number extends T ? never : (
    T extends Infinity ? never : T
  )
) : never;

const takesFiniteNumber = <T extends number>(n: FiniteNumber<T>) => n;

takesFiniteNumber(''); // gives type error as it isn't a number
takesFiniteNumber(10);
takesFiniteNumber(3.14);
takesFiniteNumber(-42.5);
takesFiniteNumber(1e6);
takesFiniteNumber(1e999); // gives type error as it is inferred to `Infinity`
takesFiniteNumber(-1e999); // gives type error as it is inferred to `-Infinity`
takesFiniteNumber(Infinity); // gives type error as it is inferred to `number`
takesFiniteNumber(-Infinity); // gives type error as it is inferred to `number`
takesFiniteNumber(NaN); // gives type error as it is inferred to `number`

// We can also implement this using the `Not` type helper from ./ts-not.ts

import { type Not } from "./ts-not";
type LiteralNumber<T> = T extends number ? (
  number extends T ? never : T
) : never;
type Finite<T> = Not<Infinity, T, LiteralNumber<T>>; // Same as `FiniteNumber`, but using `Not`

const takesFinite = <T extends number>(n: Finite<T>) => n;

takesFinite(''); // gives type error as it isn't a number
takesFinite(10);
takesFinite(3.14);
takesFinite(-42.5);
takesFinite(1e6);
takesFinite(1e999); // gives type error as it is inferred to `Infinity`
takesFinite(-1e999); // gives type error as it is inferred to `-Infinity`
takesFinite(Infinity); // gives type error as it is inferred to `number`
takesFinite(-Infinity); // gives type error as it is inferred to `number`
takesFinite(NaN); // gives type error as it is inferred to `number`

// Limitations

// This won't work as expected
let value1 = 20; // values is inferred as just `number`.
let num1: FiniteNumber<typeof value1> = value1; // won't work as `typeof value` is `number` and not  the literal `20`.

// This will work
const value2 = 20; // values is inferred as the literal `20`.
let num2: FiniteNumber<typeof value2> = value2; // works because `typeof value` is the literal `20`.