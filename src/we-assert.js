//import vulcan from "vulcan";
import vulcan from "xerocross.vulcan";

var levels = {
    0 : "DEBUG",
    1 : "WARN",
    2 : "ERROR"
};
var levelStringToInt = function(levelString) {
    switch (levelString) {
    case "DEBUG":
        return 0;
    case "WARN":
        return 1;
    case "ERROR":
        return 2;
    }
    return undefined;
};
export default {
    build : function() {
        let we = {};
        var handler = function () {};
        let currentLevel = 2;
        let propositions = {};
        let factBase = [];

        we.define = function(symbol) {
            return propositions[symbol];
        }
        we.assume = function (logicSentence) {
            factBase.push(logicSentence);
        }

        we.setLevel = function (levelString) {
            var newLevel = levelStringToInt(levelString);
            if (newLevel == 0 || newLevel == 1 || newLevel == 2) {
                currentLevel = newLevel;
            } else {
                throw new Error("we-assert: invalid error level");
            }
        }
        we.getLevel = function () {
            return levels[currentLevel];
        }
        we.checkIsProved = function(symbol) {
            var proof = vulcan.prove(factBase, symbol);
            return vulcan.isProofComplete(proof);
        }
        we.getProposition = function(symbol) {
            return propositions[symbol];
        }
        we.setHandler = function (newHandler) {
            handler = newHandler;
        }
        we.defineProposition = function(symbol, prop) {
            propositions[symbol] = prop;
        }

        we.assert = {
            that : function (statement, message) {
                if (!statement) {
                    handler(statement, message);
                }
                return ((statement) == true);
            },
            proposition : function (symbol, prop) {
                we.defineProposition(symbol, prop)
                let propFunction = prop[0];
                let propArgs = prop[1];
                let propMessage = prop[2];
                let val = propFunction(...propArgs);

                if (val) {
                    factBase.push(symbol);
                }
                return this.that(val, propMessage);
            },
            thatIsProved : function(symbol, message) {
                let res = we.checkIsProved(symbol);
                if (!res) {
                    handler(propositions[symbol], message);
                } 
                return res;
            },
            forXBetween : function(min, max) {
                let obj = {};
                var that = this.that;
                obj.that = function(evalFunction, message) {
                    for (let x = min; x < max; x++) {
                        that(evalFunction(x), message);
                    }
                }
                return obj;
            },
            atLevel : function(someLevelString) {
                var obj = {};
                var that = this.that;
                obj.that = function(statement, message) {
                    let level = levelStringToInt(someLevelString);
                    if (level >= currentLevel) {
                        that(statement, message);
                    }
                }
                return obj;
            }
        }
        return we;
    }
}