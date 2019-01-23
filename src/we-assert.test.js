
import WeAssertPackage from "./we-assert.js";
let resultVal;
let weAssert = WeAssertPackage.build();

weAssert.setHandler(function(statement, message) {
    resultVal = false;
});

beforeEach(() => {
    resultVal = undefined;
});

test("setting level works DEBUG", function() {
    weAssert.setLevel("DEBUG");
    expect(weAssert.getLevel()).toEqual("DEBUG");
})

test("evaluates correctly when 'atLevel' equals 'currentLevel' DEBUG", function() {
    weAssert.setLevel("DEBUG");
    weAssert.atLevel("DEBUG").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' equals 'currentLevel' WARN", function() {
    weAssert.setLevel("WARN");
    weAssert.atLevel("WARN").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' equals 'currentLevel' WARN", function() {
    weAssert.setLevel("ERROR");
    weAssert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' ERROR  >= 'currentLevel' DEBUG", function() {
    weAssert.setLevel("DEBUG");
    weAssert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' ERROR  >= 'currentLevel' WARN", function() {
    weAssert.setLevel("WARN");
    weAssert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' DEBUG  >= 'currentLevel' ERROR", function() {
    weAssert.setLevel("ERROR");
    weAssert.atLevel("DEBUG").that(false, "test");
    expect(resultVal).toBe(undefined);
})

test("validation works on simple correct assertion", function() {
    weAssert.setLevel("ERROR");
    let int = 89;
    let prod = int*2;
    weAssert.atLevel("ERROR").that(prod % 2 == 0, "prod is divisible by 2");
    expect(resultVal).toBe(undefined);
})

test("validation works on simple incorrect assertion", function() {
    weAssert.setLevel("ERROR");
    let int = 89;
    weAssert.atLevel("ERROR").that(int % 2 == 0, "int is divisible by 2");
    expect(resultVal).toBe(false);
})