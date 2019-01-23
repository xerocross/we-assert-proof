# We Assert

A very small package for use in internally verifying statements inside scripts and functions---not just black-box checking of outputs.

#Usage

# We Assert

A very small package for use in internally verifying the flow and logic of scripts.

## Usage

The only export from this package is a function called `buildWeAssert` which takes no arguments.  So, for example, to get started you might do something like

```
import WeAssert from "we-assert";
var weAssert = WeAssert.build();
```

The most basic usage is the `that(statement, message)` function.  For example
```
weAssert.that(x < y, "x < y");
```
If the statement evaluates false, the weAssert handler will be called.  The handler should be a function of the form `handler(statement, message`).  To define such a function, we use `weAssert.setHandler` as in this example.
```
weAssert.setHandler(function(statement, message){
    throw new Error(message);
});
```

We can set the level using any of the following:
`weAssert.setLevel("DEBUG")`, `weAssert.setLevel("WARN")`, or  `weAssert.setLevel("ERROR")`.  The default is "ERROR".  

A specific assertion can be assigned a level using the `atLevel` function as in this example.
```
weAssert.atLevel("WARN").that(statement, message)
```
When using this construction, the *statement* will only be evaluated if the level given ("WARN") is greater than or equal to the threshhold level defined using `weAssert.setLevel`.  The order is `DEBUG` < `WARN` < `ERROR`.  Thus, for example, if we set `weAssert.setLevel("ERROR")` and then execute
```
weAssert.atLevel("WARN").that(false, "test")
```
the handler will not be called and nothing will happen because `WARN` is not greater than or equal to the current level `ERROR`.
