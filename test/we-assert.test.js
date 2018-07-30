var WeAssertPackage = require("../we-assert.js");
var weAssert;
var resultVal;
weAssert = WeAssertPackage.buildWeAssert();
weAssert.setHandler(function() {
  console.log("handler executed!");
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
