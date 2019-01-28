"use strict";
exports.__esModule = true;
//@ts-ignore
var we_assert_js_1 = require("./we-assert.js");
var resultVal;
var messages = [];
var we = we_assert_js_1["default"].build();
beforeEach(function () {
    var we = we_assert_js_1["default"].build();
    messages = [];
    we.setHandler(function (message) {
        resultVal = false;
        messages.push(message);
    });
    resultVal = undefined;
});
test("setting level works DEBUG", function () {
    we.setLevel("DEBUG");
    expect(we.getLevel()).toEqual("DEBUG");
});
test("evaluates correctly when 'atLevel' equals 'currentLevel' DEBUG", function () {
    we.setLevel("DEBUG");
    we.assert.atLevel("DEBUG").that(false, "test");
    expect(resultVal).toBe(false);
});
test("evaluates correctly when 'atLevel' equals 'currentLevel' WARN", function () {
    we.setLevel("WARN");
    we.assert.atLevel("WARN").that(false, "test");
    expect(resultVal).toBe(false);
});
test("evaluates correctly when 'atLevel' equals 'currentLevel' WARN", function () {
    we.setLevel("ERROR");
    we.assert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
});
test("evaluates correctly when 'atLevel' ERROR  and 'currentLevel' DEBUG", function () {
    we.setLevel("DEBUG");
    we.assert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
});
test("evaluates correctly when 'atLevel' ERROR  and 'currentLevel' WARN", function () {
    we.setLevel("WARN");
    we.assert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
});
test("evaluates correctly when 'atLevel' DEBUG  and 'currentLevel' ERROR", function () {
    we.setLevel("ERROR");
    we.assert.atLevel("DEBUG").that(false, "test");
    expect(resultVal).toBe(undefined);
});
test("validation works on simple correct assertion", function () {
    we.setLevel("ERROR");
    var int = 89;
    var prod = int * 2;
    we.assert.atLevel("ERROR").that(prod % 2 == 0, "prod is divisible by 2");
    expect(resultVal).toBe(undefined);
});
test("validation works on simple incorrect assertion", function () {
    we.setLevel("ERROR");
    var int = 89;
    we.assert.atLevel("ERROR").that(int % 2 == 0, "int is divisible by 2");
    expect(resultVal).toBe(false);
});
test("forXBetween works on simple correct statement", function () {
    var arr = [2, 18, 92];
    we.assert.forXBetween(0, arr.length).that(function (i) { return arr[i] % 2 == 0; }, "arr[i] % 2 for i = 0 .. arr.length");
    expect(resultVal).toBe(undefined);
});
test("forXBetween works on simple false statement", function () {
    var arr = [2, 9, 92];
    we.assert.forXBetween(0, arr.length).that(function (i) { return arr[i] % 2 == 0; }, "arr[i] % 2 for i = 0 .. arr.length");
    expect(resultVal).toBe(false);
});
test("test vulcan module simple positive", function () {
    var x = 8;
    we.assert.proposition("A", [function (x) { return x % 4 == 0; }, [x], x + " % 4 == 0"]);
    expect(resultVal).toBe(undefined);
});
test("test vulcan module simple negative", function () {
    var x = 9;
    we.assert.proposition("A", [function (x) { return x % 4 == 0; }, [x], x + " % 4 == 0"]);
    expect(resultVal).toBe(false);
});
test("test vulcan proof positive", function () {
    var x = 8;
    we.assert.proposition("A", [function (x) { return x % 4 == 0; }, [x], x + " % 4 == 0"]);
    we.assume("A -> B");
    we.assert.thatIsProved("B", "some interpretation of B");
    expect(resultVal).toBe(undefined);
});
test("test vulcan combination of statements positive", function () {
    var x = 8;
    we.assert.proposition("A", [function (x) { return x % 4 == 0; }, [x], "x % 4 == 0"]);
    we.assert.proposition("B", [function (x) { return x % 2 == 0; }, [x], "x % 2 == 0"]);
    we.assert.thatIsProved("A & B", "A & B");
    expect(resultVal).toBe(undefined);
});
test("test vulcan combination of statements negative", function () {
    var x = 18;
    we.assert.proposition("A", [function (x) { return x % 4 == 0; }, [x], "x % 4 == 0"]);
    we.assert.proposition("B", [function (x) { return x % 2 == 0; }, [x], "x % 2 == 0"]);
    we.assert.thatIsProved("A & B", "A & B");
    expect(messages[0]).toBe("x % 4 == 0");
});
