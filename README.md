# We Assert

A very small package for use in internally verifying statements inside scripts and functions at runtime---not just black-box checking of outputs.

This package is environment agnostic.

## development and deployment

We-Assert is written in TypeScript.  The package includes test suites and scripts for running them.  `yarn test` will compile the TypeScript and run the tests using Jest.

The bundle is packaged using webpack and then the final output is compiled using Google's closure-compile.  Closure-compile is a Java program.  If you want to clone this package locally for development, you will need to get your own copy of closure-compile (you may need to change the filename in the ``package.json`` file referring to the jar file), and it will only run if you have Java installed on your system.  Alternatively, you can remove this compile step and using something else like uglify.

## usage

The only export from this package is a function called `build` which takes no arguments.  So, for example, to get started you might do something like

```
import WeAssert from "we-assert";
var we = WeAssert.build();
```
Here ``we`` is not a singleton.  You can build as many as you want, and they all have independent interior namespacing.

The most basic usage is the `that(statement, message)` function.  For example
```
we.assert.that(x < y, "x < y");
```
We recommend writing messages that are positive assertions representing the calculation---not an error message to be thrown upon failure.

If the statement evaluates false, the weAssert handler will be called.  The handler should be a function of the form `handler(message`).  To define such a function, we use `we.setHandler` as in this example.
```
we.setHandler(function(message){
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
