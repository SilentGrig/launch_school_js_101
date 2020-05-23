# Lesson 5 - Advanced JavaScript Collections

## Sorting

JavaScript provdes the `Array.prototype.sort` method to sort. By default it will
sort by the `UTF-16 Code point` of the `String` representation of each element.
If the element has multiple characters then it first sort by the first character
then the second, etc. If two Strings have identical Characters upto a certain point
then the shorter string will be first.

You can pass in a callback function to `sort` to specify how the elements will be
sorted. The callback function `(a, b) => a - b`, should return a `Number` if the
`Number` is less than `0` then `a` will be sorted first. If the number is greater
than `0` then `b` will be sorted first. Else leave both elements in their relative position.

### Notes about order of `UTF-16 Code points`
- Uppercase letters come before lowercase letters (sometimes called ASCIIbetical order)
- Digits and most punctuation come before letters.
- There are several punctuation characters between the uppercase and lowercase letters, and several more that come after all of the letters.
- There is an extended ASCII table that contains accented and other characters - this comes after the main ASCII table.
- All other UTF-16 characters come after the extended ASCII table and have a code point of at least 256.

## Nested Datastructures

You can nest objects within other objects. These are treated the same as a standalone datastructure, so you need to be careful as you can mutate the inner datastructure if you have an other reference to it.

`Array.prototype.slice`, `[...arr]` and `Object.assign` all perform a shallow copy. i.e. any nested objects copied will be referenced in both the original and the copy. So mutating objects within the original will also affect the same object referenced in the copy.

You can perform a deep copy in JavaScript by serialising and deserialising Objects to JSON Strings. `JSON.stringify` serializes a datastructure and then `JSON.parse` will deserialize this object, which will be a totally separate object from the original and won't share any references. Beaware it's not posssible to copy to use this method to copy objects that have methods or more complex objects.

### Freezing/Sealing objects

`Object.freeze` and `Object.seal` can be used to prevent objects from modifiable. `Object.freeze` will prevent it from being modified, however any nested objects will not be frozen and can still be modified. `Object.seal` will allow properties already on the object to be reassigned.

When trying to mutate a frozen object, it will silently fail. Where as mutating a frozen array will throw a TypeError.

## Callback functions

Functions in JavaScript are First-Class Objects, i.e. they can be passed around like other values. Which allows us to pass them into other functions as arguements and return functions from other functions.

Functions that take a function as an argument or return a function are called Higher-Order Function.

When parsing code involving iteration and callbacks, we need to be conscious of which object is being acted upon, what the return values are, if the return value is used and if there are any side affects.

- What type of action is being performed? Method call? Callback? Conditional? Something else?
- On what value is that action performed?
- What is the side-effect of that action (e.g., output or destructive action)?
- What is the return value of that action?
- Is the return value used by whatever instigated the action?

*Don't mutate the array you're iterating through, as this will result in non-obvious behaviour*