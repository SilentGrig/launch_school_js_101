# Notes for Lessons 3 - Practice Problems
Notes for interesting bits of information

## Arrays
If you assign a variable to an index that is greater than any currently assigned index then the length will be new index + 1, and any elements between the previous highest index and the new will be filled with `empty` slots. When trying to access these `empty` slots, undefined will be returned.

Use `Array.prototype.slice` or `[...array]` to copy an array.

Since `Array.prototype.concat` will concat individual arguemnts or arrays, you can use the spread syntax with concat to flatten an array with arrays inside, *note it won't flatten arrays inside the inside arrays*. There is an `Array.prototype.flat` method but still in experimental stage, this method will allow you to specify the depth to flatten to.

## Objects
When checking an Object for a key, use `Object.keys(obj).includes(key)` or `obj.hasOwnProperty(key)`. As checking `obj[key]` or `obj.key` will return `undefined` even it key doesn't exist or it does exist and has a value of `undefined`.

Use `Object.assign` to copy properties/values from one object to another. Also useful for making a shallow copy of an object by copying into an empty object.

## Regex

Regex useful when pattern matching with strings. Rather than using more verbose methods.

## Strings

`String.prototype.padStart` useful for padding a string for alignment.

## Conditionals/Booleans

Simplify code where you are explicitly returning `true/false` to return the outcome of a conditional, where possible.

Be careful comparing floating point numbers, precision can be lost when performing operations on them. e.g. `0.3 + 0.6 === 0.9` is `false`. `0.1 + 0.2 === 0.3 => false`