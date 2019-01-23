
import WeAssertPackage from "./we-assert.js";
let resultVal;
let we;


beforeEach(() => {
    we = WeAssertPackage.build();

    we.setHandler(function(statement, message) {
        resultVal = false;
    });
    resultVal = undefined;
});

test("setting level works DEBUG", function() {
    we.setLevel("DEBUG");
    expect(we.getLevel()).toEqual("DEBUG");
})

test("evaluates correctly when 'atLevel' equals 'currentLevel' DEBUG", function() {
    we.setLevel("DEBUG");
    we.assert.atLevel("DEBUG").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' equals 'currentLevel' WARN", function() {
    we.setLevel("WARN");
    we.assert.atLevel("WARN").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' equals 'currentLevel' WARN", function() {
    we.setLevel("ERROR");
    we.assert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' ERROR  >= 'currentLevel' DEBUG", function() {
    we.setLevel("DEBUG");
    we.assert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' ERROR  >= 'currentLevel' WARN", function() {
    we.setLevel("WARN");
    we.assert.atLevel("ERROR").that(false, "test");
    expect(resultVal).toBe(false);
})

test("evaluates correctly when 'atLevel' DEBUG  >= 'currentLevel' ERROR", function() {
    we.setLevel("ERROR");
    we.assert.atLevel("DEBUG").that(false, "test");
    expect(resultVal).toBe(undefined);
})

test("validation works on simple correct assertion", function() {
    we.setLevel("ERROR");
    let int = 89;
    let prod = int*2;
    we.assert.atLevel("ERROR").that(prod % 2 == 0, "prod is divisible by 2");
    expect(resultVal).toBe(undefined);
})

test("validation works on simple incorrect assertion", function() {
    we.setLevel("ERROR");
    let int = 89;
    we.assert.atLevel("ERROR").that(int % 2 == 0, "int is divisible by 2");
    expect(resultVal).toBe(false);
})

test("forXBetween works on simple correct statement", function() {
    let arr = [2, 18, 92];
    we.assert.forXBetween(0, arr.length).that(i=>arr[i]%2 == 0);
    expect(resultVal).toBe(undefined);
})

test("forXBetween works on simple false statement", function() {
    let arr = [2, 9, 92];
    we.assert.forXBetween(0, arr.length).that(i=>arr[i]%2 == 0);
    expect(resultVal).toBe(false);
})

test("test vulcan module simple positive", function() {
    let x = 8;
    we.defineProposition("A", [x=> x % 4 == 0, [x] ]);
    we.assert.proposition("A");
    expect(resultVal).toBe(undefined);
})

test("test vulcan module simple negative", function() {
    let x = 9;
    we.defineProposition("A", [x=> x % 4 == 0, [x] ]);
    we.assert.proposition("A");
    expect(resultVal).toBe(false);
})

test("test vulcan proof positive", function() {
    let x = 8;
    we.defineProposition("A", [x=> x % 4 == 0, [x] ]);
    we.assert.proposition("A");
    we.defineProposition("B", [x=> x % 2 == 0, [x] ]);
    we.assume("A -> B");
    we.assert.thatIsProved("B");
    expect(resultVal).toBe(undefined);
})

test("test vulcan proof negative", function() {
    let x = 8;
    we.defineProposition("A", [x=> x % 4 == 0, [x] ]);
    we.assert.proposition("A", "x is divisible by ");
    we.defineProposition("B", [x=> x % 2 == 0, [x] ]);
    we.assert.thatIsProved("B");
    expect(resultVal).toBe(false);
})