"use strict";
exports.__esModule = true;
//@ts-ignore
var we_assert_js_1 = require("./we-assert.js");
var xerocross_fu_1 = require("xerocross.fu");
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
test("test data type def positive", function () {
    var x = 18;
    we.define.type("int", function (x) { return xerocross_fu_1["default"].number.isInteger(x); });
    we.assert.typeOf(x).is("int", "x is an int");
    expect(resultVal).toBe(undefined);
});
test("test data type def negative", function () {
    var x = 18.5;
    we.define.type("int", function (x) { return xerocross_fu_1["default"].number.isInteger(x); });
    we.assert.typeOf(x).is("int", "x is an int");
    expect(resultVal).toBe(false);
});
test("data is a natural number positive", function () {
    var x = 12;
    we.define.type("natural", function (x) { return xerocross_fu_1["default"].number.isNaturalNumber(x); });
    we.assert.typeOf(x).is("natural", "x is a natural");
    expect(resultVal).toBe(undefined);
});
test("data is a natural number negative", function () {
    var x = -12;
    we.define.type("natural", function (x) { return xerocross_fu_1["default"].number.isNaturalNumber(x); });
    we.assert.typeOf(x).is("natural", "x is a natural");
    expect(resultVal).toBe(false);
});
test("check is natural number negative", function () {
    var x = -12;
    we.define.type("natural", function (x) { return xerocross_fu_1["default"].number.isNaturalNumber(x); });
    expect(we.check.typeOf(x).is("natural")).toBe(false);
});
test("check is natural number positive", function () {
    var x = 12;
    we.define.type("natural", function (x) { return xerocross_fu_1["default"].number.isNaturalNumber(x); });
    expect(we.check.typeOf(x).is("natural")).toBe(true);
});
test("test nested type pos", function () {
    we.define.type("natural", function (x) { return xerocross_fu_1["default"].number.isNaturalNumber(x); });
    we.define.type("natural[]", function (x) {
        if (!Array.isArray(x)) {
            return false;
        }
        else {
            for (var i = 0; i < x.length; i++) {
                if (!we.check.typeOf(x[i]).is("natural")) {
                    return false;
                }
            }
            return true;
        }
    });
    expect(we.check.typeOf([2, 4, 7, 10]).is("natural[]")).toBe(true);
});
test("test nested type neg", function () {
    we.define.type("natural", function (x) { return xerocross_fu_1["default"].number.isNaturalNumber(x); });
    we.define.type("natural[]", function (x) {
        if (!Array.isArray(x)) {
            return false;
        }
        else {
            for (var i = 0; i < x.length; i++) {
                if (!we.check.typeOf(x[i]).is("natural")) {
                    return false;
                }
            }
            return true;
        }
    });
    expect(we.check.typeOf([2, 4, 7.5, 10]).is("natural[]")).toBe(false);
});
