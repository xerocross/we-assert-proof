
//@ts-ignore
import WeAssertPackage from "./we-assert.js";
let resultVal:any;
let messages:string[] = [];
let we = WeAssertPackage.build();
const FU : any = {};

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
    FU.isType = (x : number) => {
        if (x===18)
            return true;
    };
    we.define.type("int", (x)=>FU.isType(x));
    we.assert.typeOf(x).is("int", "x is an int");
    expect(resultVal).toBe(undefined);
})

test("test data type def negative", function () {
    let x = 18;
    FU.isType = (x : number) => {
        if (x===18)
            return false;
    };
    we.define.type("int", (x)=>FU.isType(x));
    we.assert.typeOf(x).is("int", "x is an int");
    expect(resultVal).toBe(false);
})


test("test nested type pos", function () {
    FU.isType = (x : number) => {
        return false;
    };
    we.define.type("natural", (x)=>FU.isType(x));
    
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
    expect(we.check.typeOf([2, 4, 7, 10]).is("natural[]")).toBe(true);
});

test("test nested type neg", function () {
    FU.isType = (x : number) => {
        if (x === 7.5)
            return false
        return true;
    };
    we.define.type("natural", (x)=>FU.isType(x));
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
});