
//@ts-ignore
import WeAssertPackage from "./we-assert.js";
import FU from "xerocross.fu";
let resultVal:any;
let messages:string[] = [];
let we = WeAssertPackage.build();

beforeEach(() => {
    let we = WeAssertPackage.build();
    messages = [];
    we.setHandler(function (message:string) {
        resultVal = false;
        messages.push(message);
    });
    resultVal = undefined;
});

test("setting level works DEBUG", function () {
    we.setLevel("DEBUG");
    expect(we.getLevel()).toEqual("DEBUG");
})

test("evaluates correctly when 'atLevel' equals 'currentLevel' DEBUG", function () {
    we.setLevel("DEBUG");
    we.assert.atLevel("DEBUG").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' equals 'currentLevel' WARN", function () {
    we.setLevel("WARN");
    we.assert.atLevel("WARN").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' equals 'currentLevel' WARN", function () {
    we.setLevel("ERROR");
    we.assert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' ERROR  and 'currentLevel' DEBUG", function () {
    we.setLevel("DEBUG");
    we.assert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' ERROR  and 'currentLevel' WARN", function () {
    we.setLevel("WARN");
    we.assert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' DEBUG  and 'currentLevel' ERROR", function () {
    we.setLevel("ERROR");
    we.assert.atLevel("DEBUG").that(false, "test");
    expect(resultVal).toBe(undefined);
})

test("validation works on simple correct assertion", function () {
    we.setLevel("ERROR");
    let int = 89;
    let prod = int * 2;
    we.assert.atLevel("ERROR").that(prod % 2 == 0, "prod is divisible by 2");
    expect(resultVal).toBe(undefined);
})

test("validation works on simple incorrect assertion", function () {
    we.setLevel("ERROR");
    let int = 89;
    we.assert.atLevel("ERROR").that(int % 2 == 0, "int is divisible by 2");
    expect(resultVal).toBe(false);
})

test("forXBetween works on simple correct statement", function () {
    let arr = [2, 18, 92];
    we.assert.forXBetween(0, arr.length).that((i:number)=>arr[i] % 2 == 0, "arr[i] % 2 for i = 0 .. arr.length");
    expect(resultVal).toBe(undefined);
})

test("forXBetween works on simple false statement", function () {
    let arr = [2, 9, 92];
    we.assert.forXBetween(0, arr.length).that((i:number)=>arr[i] % 2 == 0, "arr[i] % 2 for i = 0 .. arr.length");
    expect(resultVal).toBe(false);
})

test("test vulcan module simple positive", function () {
    let x = 8;
    we.assert.proposition("A", [(x:number)=> x % 4 == 0, [x], `${x} % 4 == 0`]);
    expect(resultVal).toBe(undefined);
})

test("test vulcan module simple negative", function () {
    let x = 9;
    we.assert.proposition("A", [(x:number)=> x % 4 == 0, [x], `${x} % 4 == 0`]);
    expect(resultVal).toBe(false);
})

test("test vulcan proof positive", function () {
    let x = 8;
    we.assert.proposition("A", [(x:number)=> x % 4 == 0, [x], `${x} % 4 == 0`]);
    we.assume("A -> B");
    we.assert.thatIsProved("B", "some interpretation of B");
    expect(resultVal).toBe(undefined);
})

test("test vulcan combination of statements positive", function () {
    let x = 8;
    we.assert.proposition("A", [(x:number)=> x % 4 == 0, [x], "x % 4 == 0"]);
    we.assert.proposition("B", [(x:number)=> x % 2 == 0, [x], "x % 2 == 0"]);
    we.assert.thatIsProved("A & B", "A & B");
    expect(resultVal).toBe(undefined);
})

test("test vulcan combination of statements negative", function () {
    let x = 18;
    we.assert.proposition("A", [(x:number) => x % 4 == 0, [x], "x % 4 == 0"]);
    we.assert.proposition("B", [(x:number) => x % 2 == 0, [x], "x % 2 == 0"]);
    we.assert.thatIsProved("A & B", "A & B");
    expect(messages[0]).toBe("x % 4 == 0");
})

test("test data type def positive", function () {
    let x = 18;
    we.define.type("int", (x)=>FU.number.isInteger(x));
    we.assert.typeOf(x).is("int", "x is an int");
    expect(resultVal).toBe(undefined);
})
test("test data type def negative", function () {
    let x = 18.5;
    we.define.type("int", (x)=>FU.number.isInteger(x));
    we.assert.typeOf(x).is("int", "x is an int");
    expect(resultVal).toBe(false);
})
test("data is a natural number positive", function () {
    let x = 12;
    we.define.type("natural", (x)=>FU.number.isNaturalNumber(x));
    we.assert.typeOf(x).is("natural", "x is a natural");
    expect(resultVal).toBe(undefined);
})
test("data is a natural number negative", function () {
    let x = -12;
    we.define.type("natural", (x)=>FU.number.isNaturalNumber(x));
    we.assert.typeOf(x).is("natural", "x is a natural");
    expect(resultVal).toBe(false);
})