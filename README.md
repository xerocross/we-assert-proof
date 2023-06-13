# We Assert (2018)

A utility for use in internally verifying statements inside scripts at runtime. One potential goal is to catch what would otherwise be silent errors, or perhaps even
to mathematically prove that an algorithm has functioned as expected.

This package is environment agnostic.

This project is from 2018-2019 and it **has not been maintained**. I'm writing now in June 2023, and I like the idea of this project, but I have found that I cannot add it as a dependency on modern projects because of peer dependency mismatch. I have not decided whether I will update this package.

## development and deployment

As of Version 3, we are now using npm to build this project, so to install simply
execute `npm install`.

We-Assert is written in TypeScript.  The package includes test suites and scripts for running them. Use `npm test` to run the test suite, which is written using 
Jest.

## usage


```
import WeAssert from "we-assert";
var we = WeAssert.build();
```
Here ``we`` is not a singleton.  You can build as many as you want, and they all have independent namespacing.

The most basic usage is the `that(statement, message)` function.  For example
```
we.assert.that(x < y, "x < y");
```
We recommend writing messages that are positive assertions representing the calculation---not an error message to be thrown upon failure.

If the statement evaluates false, the weAssert handler will be called.  The handler should be a function of the form `handler : (message) => {...}`.  To define such a function, we use `we.setHandler` as in this example.
```
we.setHandler((message) => {
    throw new Error(`The following assertion failed: ${message}`);
});
```
Note how in the handler we have translated the positive assertion into an error message about exactly which assertion failed.  Of course instead of throwing an error you could just swallow it, or log it, or throw the error and log it.  You get the idea.  We-Assert is agnostic to handling the failure of assertions.  Handle it however you want.   

We can set the level using any of the following:
`we.setLevel("DEBUG")`, `we.setLevel("WARN")`, or  `we.setLevel("ERROR")`.  The default is "ERROR".  

A specific assertion can be assigned a level using the `atLevel` function as in this example.
```
we.assert.atLevel("WARN").that(statement, message)
```
When using this construction, the *statement* will only be evaluated if the level given ("WARN") is greater than or equal to the threshhold level defined using `weAssert.setLevel`.  The order is `DEBUG` < `WARN` < `ERROR`.  Thus, for example, if we set `weAssert.setLevel("ERROR")` and then execute
```
we.assert.atLevel("WARN").that(false, "test")
```
the handler will not be called and nothing will happen because `WARN` is not greater than or equal to the current level `ERROR`.

By contrast, if you call
```
we.assert.that(false, "test")
```
then levels play no role in the assertion.  It will be treated as an error and it will go to the handler.

### data validators

You can define arbitrary data types so long as you can pass in a function that evaluates boolean to check whether any input passes or fails.

The usage pattern is ``we.assert.typeOf(data).is(_tyepstring_, _message_)`` to validate a given element _data_.

```
    we.define.type("natural", (x)=>FU.number.isNaturalNumber(x));
    we.assert.typeOf(x).is("natural", "x is a natural");
```
The ```we``` instance does not come with any predefined types.  If you want to use the standard types you could import them into your ``we`` instance by, for example, executing this:

```we.define.type("number", (x)=> typeof x === "number");```
```we.define.type("array", (x)=> Array.isArray(x));```

You can also _check_ a data element and get a boolean directly like this.  This has no side effects. If false, the handler will not be called.
```
let x = 12;
we.define.type("natural", (x)=>FU.number.isNaturalNumber(x));
expect(we.check.typeOf(x).is("natural")).toBe(true);
```

Putting these things together, we can define something like this:

```
we.define.type("natural", (x)=>FU.number.isNaturalNumber(x));
we.define.type("natural[]", function (x) {
    if (!Array.isArray(x)) {
        return false;
    } else {
        for (let i = 0; i < x.length; i++) {
            if (!we.check.typeOf(x[i]).is("natural")) {
                return false;
            }
        }
        return true;
    }
});
expect(we.check.typeOf([2, 4, 7.5, 10]).is("natural[]")).toBe(false);
```

## to do

We should probably have different, independent handlers for the different error levels, for DEBUG, WARN, AND ERROR.  I might do that later.

I'm playing with some ideas related to logical proof.  I would really like to wire automated proofs into this thing, but I have not cracked it yet.  