//import vulcan from "vulcan";
//import vulcan from "xerocross.vulcan";
//const vulcan = require("xerocross.vulcan");
import * as vulcan from "xerocross.vulcan";
type GenericObject = { [key: string]: any };
type StringObject = { [key: string]: string };
type handlerFunction = (message:string) => void;
type evalFunction = (...args:any) => boolean;
var handler:handlerFunction = function () :void {};

var levels: StringObject = {
    0 : "DEBUG",
    1 : "WARN",
    2 : "ERROR"
};
var levelStringToInt = function (levelString:string) :number {
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

export default {
    checkVulcan () {
        return vulcan;
    },
    build : function () {
        
        let currentLevel = 2;
        type prop = [evalFunction, any[], string];
        let propositions :{ [key: string]: prop } = {};
        let types:GenericObject = {};
        type verifyFunction = (x:any) => boolean
        let factBase: string[] = [];

        let we = {
            define : {
                type : function (typeName:string, vEval :verifyFunction ) :void {
                    types[typeName] = vEval;
                }
            },
            assume : function (logicSentence:string) :void {
                factBase.push(logicSentence);
            },
            setLevel : function (levelString:string) {
                var newLevel = levelStringToInt(levelString);
                if (newLevel == 0 || newLevel == 1 || newLevel == 2) {
                    currentLevel = newLevel;
                } else {
                    throw new Error("we-assert: invalid error level");
                }
            },
            getLevel : function () :string {
                return levels[currentLevel];
            },
            checkIsProved : function (symbol:string) :Boolean {
                var proof = vulcan.prove(factBase, symbol);
                return vulcan.isProofComplete(proof);
            },
            setHandler : function (newHandler:handlerFunction) {
                handler = newHandler;
            },
            getProposition : function (symbol:string) {
                return propositions[symbol];
            },
            defineProposition : function (symbol:string, prop:prop) {
                propositions[symbol] = prop;
            },
            check : {
                typeOf : function (data:any) {
                    return {
                        is : function (dataTypeString:string) {
                            if (types[dataTypeString]) {
                                return types[dataTypeString](data);
                            } else {
                                return false;
                            }
                        }
                    }
                }
            },
            assert : {
                that : function (statement:boolean, message:string) {
                    if (!statement) {
                        handler(message);
                    }
                    return ((statement) == true);
                },
                proposition : function (symbol:string, prop:prop) {
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
                thatIsProved : function (symbol:string, message:string) {
                    let res = we.checkIsProved(symbol);
                    if (!res) {
                        handler(message);
                    } 
                    return res;
                },
                forXBetween : function (min:number, max:number) {
                    var that = this.that;
                    let obj = {
                        that : function (evalFunction:evalFunction, message:string) :void {
                            for (let x = min; x < max; x++) {
                                that(evalFunction(x), message);
                            }
                        }
                    }
                    return obj;
                },
                typeOf (data:any) {
                    let self = this;
                    return {
                        is (dataType:string, message:string) {
                            if (types[dataType]) {
                                self.that(types[dataType](data), message);
                            } else {
                                throw new Error("undefined type");
                            }
                        }
                    }
                },
                atLevel : function (someLevelString:string) {
                    var upperThat = this.that;
                    let obj = {
                        that : function (statement:boolean, message:string) {
                            
                            let level = levelStringToInt(someLevelString);
                            if (level >= currentLevel) {
                                upperThat(statement, message);
                            }
                        }
                    }
                    return obj;
                }
            }
        };
        return we;
    }
}