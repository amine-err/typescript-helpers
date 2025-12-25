declare const brand: unique symbol;
/** Returns a branded type of `T`, and a brand of value `Brand`. */
type Branded<T, Brand extends string> = T & { [brand]: Brand };

/** Finite number */
type FiniteNumber = Branded<number, 'FiniteNumber'>;

/** Checks if a number is a FiniteNumber. */
function isFiniteNumber(n: number): n is FiniteNumber {
  return isFinite(n);
};

/** Takes a number and returns a FiniteNumber. */
function asFiniteNumber(n: number): FiniteNumber {
  if (!isFiniteNumber(n)) {
    throw new Error(`${n} is not a finite number`);
  }
  return n;
};

/** Asserts if a number is FiniteNumber. */
function assertFiniteNumber(n: number): asserts n is FiniteNumber {
  if (!isFinite(n)) {
    throw new Error(`${n} is not a finite number`);
  }
};

// Usage

// An example function that only accepts a FiniteNumber.
const takesFiniteNumber = (n: FiniteNumber) => n;

takesFiniteNumber(Infinity); // fails.
takesFiniteNumber(NaN); // fails.
takesFiniteNumber(20); // Will also fail because it is just a number, and not a branded one.

// To be able to use FiniteNumber, we either need to check for it first (type narrowing), or to assert first.

// Type narrowing:
const num = 20; // Just a normal number, not branded.
takesFiniteNumber(num); // Fails as expected because `num` can still be an unbranded number.
if (isFiniteNumber(num)) { // We check first if `num` is a branded number of type FiniteNumber.
  takesFiniteNumber(num); // Works because we narrowed the type of `num` from just a normal number to a FiniteNumber type.
};

// Type assertion
assertFiniteNumber(num); // Will throw an error if `num` is not a finite number, if it is, it will continue execution.
takesFiniteNumber(num);  // Doesn't give an error, because we know that any `num` following the assertion is guaranteed to be of type FiniteNumber.
