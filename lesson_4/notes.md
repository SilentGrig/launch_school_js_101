# Lesson 4 JavaScript Collections

## String Methods

### String.fromCharCode()

Creates a character from it's unicode(UTF-16).

### String.fromCharPoint()

Creates a character from it's Unicode(UTF-32). Generally used to additional characters like (emojis)

### String.prototype.charAt()

Gets character from specified index in a string. Same as using the bracket syntax `[]`. Only works for UTF-16 characters.

### String.prototype.charCodeAt()

Returns the Unicode for character at specified index, only works for UTF-16 characters. See codePointAt for UTF-32 characters.

### String.prototype.codePointAt()

Returns Unicode (UTF-32) character at specified index.

### String.prototype.concat()

Returns string concatenated with each argument passed into concat. `+` and `+=` operators are preferred due to performance.

### String.prototype.endsWith()

Returns true or false depending on whether string ends with string provided. Second optional argument can be provided which specifies length, i.e. default is length of string if a length less than string length is provided will check end of string upto that point.

### String.prototype.includes()

Returns true or false depending if argument provided is found within the string. Second optional argument can be provided to determine starting index to search from. Is case sensitive.

### String.prototype.indexOf()

Similar to `includes` but returns index of the start of the first match, or `-1` if no match is found. Second optional argument can be provided for starting index.

### String.prototype.lastIndexOf()

Same as `indexOf` but starts searching from end of string.

### String.prototype.match()

Returns array of matches of regex provided, or null if no match is found.

### String.prototype.padEnd()

Pads end of string with spaces for number of times specified, optional second argument can be provided to set string to be used for padding.

### String.prototype.padStart()

Same as `padEnd` but pads start of string

### String.prototype.repeat()

Creates a String with string repeated specified number of times.

### String.prototype.replace()

Replaces string or regex provided with replacement string. Only replaces first occurance unless regex provided with global flag set.

### String.prototype.search()

Similar to `indexOf` but with a regex argument

### String.prototype.slice()

Returns a new string based on indexes provided. No arguments will copy whole string. First argument specifies starting index, second argument is ending index (exclusive). If no second argument provided then to end of string. Negative indexes will count from end of string.

### String.prototype.slice()

Splits string into an array based on string provided. No argument will create array with entire string at first index. Empty string will split by each character.

### String.prototype.startsWith()

Same as `endsWith` but start of string.

### String.prototype.substring()

Similar to slice, but behaviour is slightly difference. Prefer to use slice as behaviour is more consistant. e.g. If starting index is same or after ending index, slice will produce empty string substring will swap indexes.

### String.prototype.toLowercase()

Converts alphabetic characters to lowercase, if not already lowercase.

### String.prototype.trim()

Removes whitespace from start and end of string, includes all whitespace (space, tab, etc and line terminators);

### String.prototype.trimEnd()/trimStart()

Same as trim but just start or end of string.

## Array Methods

### Array.from()

Creates an Array from an iterable argument. `[...args]` syntax preferred.

### Array.isArray()

Returns true or false whether argument is an array.

### Array.prototype.concat()

Returns a New Array of called array with arguments provided, if an array is provided then a shallow copy of elements will be created in new array. i.e. arrays/objects in array argument will be referenced in the retured array.

### Array.prototype.every()

Returns true or false depending on results of predicate callback provided. If any element returns a falsey value from predicate then will return false.

### Array.prototype.filter()

Returns a New Array of length equal to or less than original. With elements that return a truethy value from the predicate callback.

### Array.prototype.find()

Returns first element that returns truthy from predicate callback. Returns `undefined` if no element returns a truthy value.

### Array.prototype.findIndex()

Similar to find bu returns index of element or `-1`.

### Array.prototype.flat()

Flattens original Array upto specified depth.

### Array.prototype.forEach()

Iterates through array and calls callback function on each element.

### Array.prototype.includes()

Returns true or false depending on whether element provided is in array. Optional starting index can be provided.

### Array.prototype.indexOf()

Similar to includes but returns index of first element or `-1` if not found.

### Array.prototype.join()

Returns a String by concatenating each element in the array with the delimiter provided. If no argument provided then default delimiter is `,`, `''` can be provided to join with no spaces.

### Array.prototype.lastIndexOf()

Similar to `indexOf` but starts from end of array.

### Array.prototype.map()

Returns a New Array with each new element being the result of the return value from the callback function called on each element.

### Array.prototype.pop()

Removes and returns the last element from the array. Returns `undefined` if array is empty.

### Array.prototype.push()

Adds element to end of array and increments length, returns new length of the array. Multiple elements can be added by passing multiple arguments.

### Array.prototype.reduce()

Returns a new value(any type) based on callback function provided. Map/Filter/ForEach methods can all be implemented with a reduce.

### Array.prototype.reduceRight()

Same as `reduce` but reduces from right-to-left.

### Array.prototype.reverse()

Reverses the order of the elements in the original array.

### Array.prototype.shift()

Similar to `pop` but removes from first element in array.

### Array.prototype.slice()

Returns a new Array. Similar to `String.prototype.slice` starting and ending index can be provided.

### Array.prototype.some()

Returns true or false, will return true if any element within the array returns a truthy value from the predicate callback function provided.

### Array.prototype.sort()

Sorts the original array, default order is ascending order according to UTF-16 code. Compare function can be provided to dictate ordering.

### Array.prototype.splice()

Removes/replaces/add new elements to original array. First argument is starting index, second argument is number of elements to remove, remaining arguments are elements to be added.

### Array.prototype.unshift()

Like `push` excepts adds to front of the array, returns new length.

## Object Methods

### Object.assign()

Creates a new Object by passing enumerables own properties from source objects into target object. First argument is target object, rest are sources objects. Passing `{}` to target can be used to copy an object.

### Object.entries()

Returns an Array of of nested 2-element arrays of `[key, value]` for each own property of object provided.

### Object.keys()

Returns an Array of the keys/properties of the object provided.

### Object.prototype.hasOwnProperty()

Returns true or false depending whether object has own property specified. Doesn't transverse prototype chain.

### Object.values()

Returns Array of values of each key/property in object provided.