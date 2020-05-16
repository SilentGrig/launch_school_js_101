# Lesson 2 - Small Problems

## Truthiness

### Orders of Precedence

Don't rely on JavaScript orders of precedence, be explicit with `()`s in how you wish the operations to be executed.

### Short-Circuit Operators

`&&` and `||` operators short-circuit i.e. JavaScript will stop evaluting sub-expressions when it knows the final value of the expression. i.e. when a subexpression is `false` for `&&` and when a subexpression is `true` for `||`. This is evaluated from left-to-right.

Operator | True | False
--- | --- | ---
`&&` | return RHS | return LHS
`||` | return LHS | return RHS

e.g.

`"a" && "b" -> "b"`

`0 && "b" -> 0`

`"a" || "b" -> "a"`

`0 && "b" -> "b"`

### Truthiness Values
!Below values all evaluate to `false` other values evaluate to `truth`

- `false`
- `undefined`
- `null`
- `0`
- `""`
- `NaN`

***

## Pseudo Code / Flowcharts

Use Pseudo Code and Flowcharts to help map out program flow in an imperative form.

Pseudocode terms 

`START` - start of program

`SET` - set a variable

`GET` - retreive input from user

`PRINT` - display output to user

`READ` - retrive variable

`IF/ELSE` - conditional branching

`WHILE` - looping

`END` - end of program

`SUBPROCESS` - declarative way of defining a subprocess of progam not covered in pseudocode. Assumed this works.

## Type Coercion

### Explicit Type Coercion

#### Numbers

`Number` used to explictly coerce a type to a Number, if it can't convert will returned `NaN`. Ignores whitespace before and after number, though will covert a whitespace only string to 0.

`parseInt` converts a number even with non-numeric characters, aslong as the string starts with a number, though it can be proceeded with a `+` or `-`. Can also take a radix from 2 to 36. So can be used to convert binary strings to base 10. Best practice is to always provide the radix, see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#Description)

`+` also coerces the same as `Number` however isn't as explicit

#### Strings

`toString` method, apart from `null` and `undefined`. numbers need to be assigned to variables before using `toString` or using parenthesis `(4).toString()`. `4..toString()` is also possible.

`String` also coerces with added benefit of working with `null` and `undefined`.

Inside template literals interpolated expressions are implicitly coerced to Strings there is no need to explicitly coerce them.

### Implicit Coercion

We almost always prefer to use `===` over `==`.

Rules to remember.

- When a number is compared to a string then the string is coerced to a number.
- when a boolean is compared to any other value, it is coerced into a number and compared again using `==`
- When an object is compared with a primitive value it is first coerced to a primitive value and compared again using `==`
- Comparing `null` and `undefined` with `==` evaluates to `true`

`+` implicitly coerces values. If either side of the operator contains a string then generally the other side will be coerced to a string and concatenated. Other primitives will be coerced to numbers. If either operand is an object then both operands will be coerced to a string and concatenated together.

### Relational operators

Do numeric or lexicographical order (strings). If both sides are strings then ordered lexocgraphically otherwise both sides are coerced to numbers.

### Best Practices 

- *Always use explicit Type Coercions*
- *Always use strict equality operators `===` and `!==`*

Exceptions 
- Don't use explicity type coercion inside template literals.
- You can use `+` to coerce Strings to numbers.

## Coding Tips

Functions should either return a value or perform a side effect not both.

Think about how a function will be used before thinking about implementation.

Logic grouping of code, think about the scope of your code. Variables should be declared just before you use them, and shouldn't be outside the scope they are being used.

## Scope

- Rule 1: Outer scope variables can be accessed by the inner scope
- Rule 2: Inner scope variables cannot be accessed in the outer scope
- Rule 3: Peer scopes do not conflict
- Rule 4: Nested functions have their own variable scope
- Rule 5: Inner scope variables can shadow outer scope variables