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
