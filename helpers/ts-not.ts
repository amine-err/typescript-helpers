/** Given a type `T`, it returns `T` if it extends `A` AND does not extend `N`, if not it returns never */
export type Not<N, T, A = any> = [T] extends [N] ? never : (
  [T] extends [A] ? T : never
);

// Any but undefined: any & not undefined
type NotUndefined<T> = Not<undefined, T>;
function takesNotUndefined<T>(v: NotUndefined<T>) {};

takesNotUndefined(undefined); // gives a type error as it is undefined
takesNotUndefined(20); // works as expected
takesNotUndefined(''); // works as expected
takesNotUndefined({}); // works as expected

// Non empty strings: string & not ''
type NonEmptyString<T> = Not<'', T, string>;
function takesNonEmptyString<T>(v: NonEmptyString<T>) {};

takesNonEmptyString(''); // gives a type error as it is an empty string
takesNonEmptyString('not empty'); // works as expected
takesNonEmptyString(20); // gives a type error as it isn't a string

// Non zero number: number & not 0
type NonZeroNumber<T> = Not<0, T, number>;
function takesNonZeroNumber<T>(v: NonZeroNumber<T>) {}

takesNonZeroNumber(0); // gives a type error as it is 0
takesNonZeroNumber(20); // works as expected
takesNonZeroNumber('str'); // gives a type error as it isn't a number

// Any string but a set: string & not 'a' | 'b'
type AnyStringBut<T> = Not<'a' | 'b', T, string>;
function takesAnyStringBut<T>(v: AnyStringBut<T>) {};

takesAnyStringBut('a'); // gives a type error as it is 'a'
takesAnyStringBut('b'); // gives a type error as it is 'b'
takesAnyStringBut('c'); // works as expected as any other string
takesAnyStringBut(20); // gives an error as it isn't a string

// Any but function: any & not Function
function takesAnyButFunction<T>(v: Not<Function, T>) {};

takesAnyButFunction(function(){}); // gives type error as it a function
takesAnyButFunction({}); // works as expected
takesAnyButFunction(''); // works as expected

// Animal & not Dog
type Animal = { move: string; };
type Dog = Animal & { woof: string };
type AnimalButNotDog<T> = Not<Dog, T, Animal>;
function takesAnimalButNotDog<T>(v: AnimalButNotDog<T>) {}

takesAnimalButNotDog({move: ''}); // works as it is just `Animal`
takesAnimalButNotDog({move: '', woof: ''}); // gives type error as it is Dog
takesAnimalButNotDog({move: '', meow: ''}); // works as it is another Animal but not a Dog

// Infer value using generic function
function not<N, A = any>() {
  return { infer<T>(v: Not<N, T, A>) { return v } }
}

const anyButUndefined = not<undefined>().infer(undefined); // gives a type error as it is undefined
const nonEmptyString = not<'', string>().infer(''); // gives a type error as it is an empty string
const nonZeroNumber = not<0, number>().infer(0); // gives a type error as it is 0
const anyButFunction = not<Function>().infer(()=>{}) // gives  a type error as it is a function
const anyStringBut = not<'a' | 'b', string>().infer('b') // gives a type error as it is 'b'
