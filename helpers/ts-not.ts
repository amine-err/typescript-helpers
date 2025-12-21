type Not<N, T, A = any> = [T] extends [N] ? never : (
  [T] extends [A] ? T : never
);

// Non empty strings
type NonEmptyString<T> = Not<'', T, string>;
function takesNonEmptyString<T>(v: NonEmptyString<T>) {};

takesNonEmptyString(''); // gives a type error as it is an empty string
takesNonEmptyString('not empty'); // works as expected
takesNonEmptyString(20); // gives a type error as it isn't a string

// Non zero number
type NonZeroNumber<T> = Not<0, T, number>;
function takesNonZeroNumber<T>(v: NonZeroNumber<T>) {}

takesNonZeroNumber(0); // gives a type error as it is 0
takesNonZeroNumber(20); // works as expected
takesNonZeroNumber('str'); // gives a type error as it isn't a number

// Any string but a set
type AnyStringBut<T> = Not<'a' | 'b', T, string>;
function takesAnyStringBut<T>(v: AnyStringBut<T>) {};

takesAnyStringBut('a'); // gives a type error as it is 'a'
takesAnyStringBut('b'); // gives a type error as it is 'b'
takesAnyStringBut('c'); // works as expected as any other string
takesAnyStringBut(20); // gives an error as it isn't a string

// Infer value using generic function
function not<N, A = any>() {
  return { infer<T>(v: Not<N, T, A>) { return v } }
}

const nonEmptyString = not<'', string>().infer(''); // gives a type error as it is an empty string
const nonZeroNumber = not<0, number>().infer(0); // gives a type error as it is 0
const anyButFunction = not<Function>().infer(()=>{}) // gives  a type error as it is a function
const anyStringBut = not<'a' | 'b', string>().infer('b') // gives a type error as it is 'b'

