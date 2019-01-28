"use strict";
exports.__esModule = true;
//import vulcan from "vulcan";
//import vulcan from "xerocross.vulcan";
//const vulcan = require("xerocross.vulcan");
var vulcan = require("xerocross.vulcan");
var handler = function () { };
var levels = {
    0: "DEBUG",
    1: "WARN",
    2: "ERROR"
};
var levelStringToInt = function (levelString) {
    switch (levelString) {
        case "DEBUG":
            return 0;
        case "WARN":
            return 1;
        case "ERROR":
            return 2;
    }
    throw new Error();
};
exports["default"] = {
    checkVulcan: function () {
        return vulcan;
    },
    build: function () {
        var currentLevel = 2;
        var propositions = {};
        var types = {};
        var factBase = [];
        var we = {
            define: {
                type: function (typeName, vEval) {
                    types[typeName] = vEval;
                }
            },
            assume: function (logicSentence) {
                factBase.push(logicSentence);
            },
            setLevel: function (levelString) {
                var newLevel = levelStringToInt(levelString);
                if (newLevel == 0 || newLevel == 1 || newLevel == 2) {
                    currentLevel = newLevel;
                }
                else {
                    throw new Error("we-assert: invalid error level");
                }
            },
            getLevel: function () {
                return levels[currentLevel];
            },
            checkIsProved: function (symbol) {
                var proof = vulcan.prove(factBase, symbol);
                return vulcan.isProofComplete(proof);
            },
            setHandler: function (newHandler) {
                handler = newHandler;
            },
            getProposition: function (symbol) {
                return propositions[symbol];
            },
            defineProposition: function (symbol, prop) {
                propositions[symbol] = prop;
            },
            assert: {
                that: function (statement, message) {
                    if (!statement) {
                        handler(message);
                    }
                    return ((statement) == true);
                },
                proposition: function (symbol, prop) {
                    we.defineProposition(symbol, prop);
                    var propFunction = prop[0];
                    var propArgs = prop[1];
                    var propMessage = prop[2];
                    var val = propFunction.apply(void 0, propArgs);
                    if (val) {
                        factBase.push(symbol);
                    }
                    return this.that(val, propMessage);
                },
                thatIsProved: function (symbol, message) {
                    var res = we.checkIsProved(symbol);
                    if (!res) {
                        handler(message);
                    }
                    return res;
                },
                forXBetween: function (min, max) {
                    var that = this.that;
                    var obj = {
                        that: function (evalFunction, message) {
                            for (var x = min; x < max; x++) {
                                that(evalFunction(x), message);
                            }
                        }
                    };
                    return obj;
                },
                typeOf: function (data) {
                    var self = this;
                    return {
                        is: function (dataType, message) {
                            if (types[dataType]) {
                                self.that(types[dataType](data), message);
                            }
                            else {
                                throw new Error("undefined type");
                            }
                        }
                    };
                },
                atLevel: function (someLevelString) {
                    var upperThat = this.that;
                    var obj = {
                        that: function (statement, message) {
                            var level = levelStringToInt(someLevelString);
                            if (level >= currentLevel) {
                                upperThat(statement, message);
                            }
                        }
                    };
                    return obj;
                }
            }
        };
        return we;
    }
};
