(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WeAssert", [], factory);
	else if(typeof exports === 'object')
		exports["WeAssert"] = factory();
	else
		root["WeAssert"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright 2015 Ryan Marcus
// This file is part of vulcan.
// 
// vulcan is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// vulcan is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with vulcan.  If not, see <http://www.gnu.org/licenses/>.



const parser = __webpack_require__(4);
const lexer = __webpack_require__(5);

Array.prototype.peek = function () {
    return this[this.length - 1];
};

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
	'use strict';
	var O = Object(this);
	var len = parseInt(O.length) || 0;
	if (len === 0) {
	    return false;
	}
	var n = parseInt(arguments[1]) || 0;
	var k;
	if (n >= 0) {
	    k = n;
	} else {
	    k = len + n;
	    if (k < 0) {k = 0;}
	}
	var currentElement;
	while (k < len) {
	    currentElement = O[k];
	    if (searchElement === currentElement ||
		(searchElement !== searchElement && currentElement !== currentElement)) {
		return true;
	    }
	    k++;
	}
	return false;
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
	position = position || 0;
	return this.indexOf(searchString, position) === position;
    };
}


function hoistNullActions(tree) {
    if (!tree || tree.action == "substitution" || tree.action == "literal")
	return tree;

    if (tree.action == null)
	return hoistNullActions(tree.args[0]);

    return { action: tree.action,
	     args: tree.args.map(hoistNullActions) };
}


module.exports.negate = negate;
function negate(a) {
    return { action: "negation",
	     args: [a] };
}

module.exports.treeToExpr = treeToExpr;
function treeToExpr(tree) {

    if (tree.action == "substitution") {
	return tree.args[0];
    }

    if (tree.action == "literal") {
	return tree.args[0];
    }

    if (tree.action == "negation") {
	if (tree.args[0].action == "substitution") {
	    return "!" + tree.args[0].args[0];
	}
	return "(!" + treeToExpr(tree.args[0]) + ")";
    }



    if (tree.action == "conjunction") {
	return "(" + treeToExpr(tree.args[0]) + " & " +  treeToExpr(tree.args[1]) + ")";
    }

    if (tree.action == "disjunction") {
	return "(" + treeToExpr(tree.args[0]) + " | " +  treeToExpr(tree.args[1]) + ")";
    }

    if (tree.action == "implication") {
	return "(" + treeToExpr(tree.args[0]) + " -> " + treeToExpr(tree.args[1]) + ")";
    }

    if (tree.action == "equivalence") {
	return "(" + treeToExpr(tree.args[0]) + " <-> " + treeToExpr(tree.args[1]) + ")";
    }

    return "";


}



module.exports.proofToString = proofToString;
function proofToString(proof) {
    proof = proof.map(function(i) {
	if (i.label == "sep")
	    return "------------------------------\n";
	
	if (i.tree) {
	    return i.idx + "\t" + i.tree + "\t" + i.label + "\n";
	}

	return i.label + "\n";
    });

    return proof.join("");
}

module.exports.buildTree = buildTree;
function buildTree(string) {
    return hoistNullActions(parser.parse(lexer.lex(string)));
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
//import vulcan from "vulcan";
//import vulcan from "xerocross.vulcan";
//const vulcan = require("xerocross.vulcan");
var vulcan = __webpack_require__(2);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright 2015 Ryan Marcus
// This file is part of vulcan.
// 
// vulcan is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// vulcan is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with vulcan.  If not, see <http://www.gnu.org/licenses/>.



const cnf = __webpack_require__(3);
const util = __webpack_require__(0);

function findLiterals(clause) {
    let literals = [];
    let f = function (c) {
	if (!c)
	    return;

	if (c.action == "negation" && c.args[0].action == "substitution") {
	    literals.push("!" + c.args[0].args[0]);
	    return;
	}


	if (c.action == "substitution") {
	    literals.push(c.args[0]);
	    return;
	}

	f(c.args[0]);
	f(c.args[1]);
	
    };

    f(clause);
    return literals;
}

function resolve(clause1, clause2) {

    let clause1literals = findLiterals(clause1);
    let clause2literals = findLiterals(clause2);

    let findCompLiterals = function(c1l, c2l) {
	let toR = [];
	c1l.forEach(function (i) {
	    let symbol = (i.startsWith("!") ? i.substring(1) : i);
	    let inverse = (i.startsWith("!") ? i.substring(1) : "!" + i);
	    if (c2l.includes(inverse))
		toR.push(symbol);
	});
	return toR;
    };

    let compLit = findCompLiterals(clause1literals, clause2literals);
    if (compLit.length > 1) {
	// it's a tautology
	return {action: "literal",
		args: [true] };
    }

    let newLiterals = clause1literals.concat(clause2literals);

    newLiterals.sort();
    newLiterals = newLiterals.filter(function (i) {
	let symbol = (i.startsWith("!") ? i.substring(1) : i);
	if (compLit.includes(symbol))
	    return false;
	return true;
    }).reduce(function (accum, nxt) {
	if (accum.peek() == nxt)
	    return accum;

	return accum.concat([nxt]);

    }, []);


    if (newLiterals.length == 0)
	return {action: "literal",
		args: [false]};

    return util.buildTree(newLiterals.join(" | "));
    
}

module.exports.prove = prove;
function prove(sentences, q) {
    let cnfProofs = [];
    let toR = [];
    
    let pc = 0;

    // convert each sentence to CNF
    sentences.forEach(function (i) {
	let toAdd = cnf.convertToCNF(util.buildTree(i)).map(function (i) {
	    i.idx = pc++;
	    return i;
	});;
	toR = toR.concat(toAdd);
	cnfProofs.push(toR);
    });

    let pcCutoff = pc;

    // next, build the knowledge base
    let kb = cnfProofs.map(function (i) {
	let t = i.peek();
	return t;
    }).map(function (i) {
	let t = cnf.splitClauses(i.tree).map(function (c) {
	    c.idx = pc++;
	    c.from = i.idx;
	    return c;
	});
	return t;
    }).reduce(function (accum, nxt) {
	return accum.concat(nxt);
    }, []);

    //	toR.push({label: "sep"});

    kb.forEach(function (i) {
	toR.push({label: "knowledge base clause from " + i.from,
		  tree: i,
		  idx: i.idx});
    });

    // now add the negation of our query to the KB
    let negCNF = cnf.convertToCNF(util.negate(util.buildTree(q)));
    let neg = negCNF.peek().tree;
    cnf.splitClauses(negCNF.peek().tree).forEach(function (i) {
	i.idx = pc++;
	kb.push(i);
	toR.push({label: "assume for a contradiction",
		  tree: kb.peek(),
		  idx: kb.peek().idx});
    });
    /*	neg.idx = pc++;
     kb.push(neg);
     toR.push({label: "assume for a contradiction",
     tree: kb.peek(),
     idx: kb.peek().idx});*/

    let findRequiredSteps = function(idx) {
	let requiredSteps = [idx];
	
	let step = toR.filter(function (i) {
	    return i.idx == idx;
	})[0];


	if (!step.req)
	    return requiredSteps;

	step.req.forEach(function (i) {
	    requiredSteps = requiredSteps.concat(findRequiredSteps(i));
	});

	return requiredSteps;
    };

    while (true) {
	let newClauses = [];
	for (let i = 0; i < kb.length; i++) {
	    for (let j = 1; j < kb.length; j++) {
		let resolvent = resolve(kb[i], kb[j]);
		//console.log(util.treeToExpr(kb[i]) + " // " + util.treeToExpr(kb[j]) + " -> " + util.treeToExpr(resolvent));
		if (newClauses.map(util.treeToExpr).includes(util.treeToExpr(resolvent)))
		    continue;
		resolvent.idx = pc++;

		toR.push({label: "resolve of " + kb[i].idx + " and " + kb[j].idx,
			  tree: resolvent,
			  idx: resolvent.idx,
			  req: [kb[i].idx, kb[j].idx]});


		if (resolvent.action == "literal" && resolvent.args[0] == false) {
		    // we found a contradiction!
		    let req = findRequiredSteps(resolvent.idx);
		    return toR.filter(function (i) {
			return req.includes(i.idx) || i.idx <= pcCutoff || i.label == "sep";
		    }).map(function (i) {
			if (i.tree)
			    i.tree = util.treeToExpr(i.tree);
			return i;
		    });
		    

		} 

		if (resolvent.action == "literal" && resolvent.args[0] == true) {
		    // we found a tautology. not useful.
		    continue;
		}
		newClauses.push(resolvent);
	    }
	}
	

	let kbS = kb.map(util.treeToExpr);
	let haveAll = (newClauses.map(util.treeToExpr).every(function (i) {
	    return kbS.includes(i);
	}));

	if (haveAll) {
	    toR.push({label: "model exhausted, proof could not be reached"});
	    return toR.map(function (i) {
		if (i.tree)
		    i.tree = util.treeToExpr(i.tree);
		return i;
	    });
	    
	}
	

	kb = kb.concat(newClauses);
    }
}

module.exports.addParens = addParens;
function addParens(str) {
    return util.treeToExpr(util.buildTree(str));
}

module.exports.isProofComplete = isProofComplete;
function isProofComplete(proof) {
    return proof.peek().label != "model exhausted, proof could not be reached";
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright 2015 Ryan Marcus
// This file is part of vulcan.
// 
// vulcan is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// vulcan is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with vulcan.  If not, see <http://www.gnu.org/licenses/>.



const util = __webpack_require__(0);

function buildConjunction(a, b) {
    return { action: "conjunction",
	     args: [a, b] };
}

function buildImplication(a, b) {
    return { action: "implication",
	     args: [a, b] };
}

function buildNegation(a) {
    return { action: "negation",
	     args: [a] };
}

function buildDisjunction(a, b) {
    return { action: "disjunction",
	     args: [a, b] };
}

function eliminateBijection(tree) {

    if (!tree || tree.action == "substitution" || tree.action == "literal")
	return tree;

    if (tree.action == "equivalence") {
	// apply the transformation
	return buildConjunction(
	    buildImplication(
		eliminateBijection(tree.args[0]),
		eliminateBijection(tree.args[1])
	    ),
	    buildImplication(
		eliminateBijection(tree.args[1]),
		eliminateBijection(tree.args[0])
	    ));

	
    }

    return { action: tree.action,
	     args: tree.args.map(eliminateBijection) };
}

function deMorgans(tree) {
    if (!tree || tree.action == "substitution" || tree.action == "literal")
	return tree;
    
    if (tree.action == "negation") {
	if (tree.args[0].action == "disjunction") {
	    // move the negation in
	    return deMorgans(buildConjunction(
		buildNegation(tree.args[0].args[0]),
		buildNegation(tree.args[0].args[1])
	    ));
	}

	if (tree.args[0].action == "conjunction") {
	    // move negation in
	    return deMorgans(buildDisjunction(
		buildNegation(tree.args[0].args[0]),
		buildNegation(tree.args[0].args[1])
	    ));
	}
    }

    return { action: tree.action,
	     args: tree.args.map(deMorgans) };
}

function eliminateImplication(tree) {
    
    if (!tree || tree.action == "substitution" || tree.action == "literal")
	return tree;


    if (tree.action == "implication") {
	return buildDisjunction(
	    buildNegation(eliminateImplication(tree.args[0])),
	    eliminateImplication(tree.args[1]));
    }

    return { action: tree.action,
	     args: tree.args.map(eliminateImplication) };
    
}

function eliminateDoubleNegation(tree) {
    if (!tree || tree.action == "substitution" || tree.action == "literal")
	return tree;


    if (tree.action == "negation") {
	if (tree.args[0].action == "negation") {
	    return eliminateDoubleNegation(tree.args[0].args[0]);
	}
    }

    return { action: tree.action,
	     args: tree.args.map(eliminateDoubleNegation) };
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function distribOr(tree) {
    if (!tree || tree.action == "substitution" || tree.action == "literal")
	return tree;


    if (tree.action == "disjunction") {
	if (tree.args[1].action == "conjunction") {
	    return distribOr(buildConjunction(
		buildDisjunction(clone(tree.args[0]),
				 clone(tree.args[1].args[0])),
		buildDisjunction(clone(tree.args[0]),
				 clone(tree.args[1].args[1]))
	    ));
	    
	    
	}

	if (tree.args[0].action == "conjunction") {
	    return distribOr(buildConjunction(
		buildDisjunction(clone(tree.args[1]),
				 clone(tree.args[0].args[0])),
		buildDisjunction(clone(tree.args[1]),
				 clone(tree.args[0].args[1]))
	    ));
	    
	    
	}
    }


    return { action: tree.action,
	     args: tree.args.map(distribOr) };




}

function doComplementation(tree) {
    if (!tree || tree.action == "substitution" || tree.action == "literal")
	return tree;
    
    if (tree.action == "disjunction") {
	var lc = tree.args[0];
	var rc = tree.args[1];

	if (lc.action == "negation") {
	    if (util.treeToExpr(lc.args[0]) == util.treeToExpr(rc)) {
		return {action: "literal",
			args: [true]};
	    }
	}


	if (rc.action == "negation") {
	    if (util.treeToExpr(rc.args[0]) == util.treeToExpr(lc)) {
		return {action: "literal",
			args: [true]};
	    }
	}
    }

    if (tree.action == "conjunction") {
	var lc = tree.args[0];
	var rc = tree.args[1];

	if (lc.args[0].action == "negation") {
	    if (util.treeToExpr(lc.args[0].args[0]) == util.treeToExpr(rc)) {
		return {action: "literal",
			args: [false]};
	    }
	}


	if (rc.args[0].action == "negation") {
	    if (util.treeToExpr(rc.args[0].args[0]) == util.treeToExpr(lc)) {
		return {action: "literal",
			args: [false]};
	    }
	}
    }


    return { action: tree.action,
	     args: tree.args.map(doComplementation) };
}


function doIdentity(tree) {
    if (!tree || tree.action == "substitution" || tree.action == "literal")
	return tree;

    if (tree.action == "disjunction") {
	var lc = tree.args[0];
	var rc = tree.args[1];

	if (lc.action == "literal") {
	    if (lc.args[0] == true) {
		return lc;
	    } else if (lc.args[0] == false) {
		return rc;
	    }
	}

	if (rc.action == "literal") {
	    if (rc.args[0] == true) {
		return rc;
	    } else if (rc.args[0] == false) {
		return lc;
	    }
	}
    }

    if (tree.action == "conjunction") {
	var lc = tree.args[0];
	var rc = tree.args[1];
	
	if (lc.action == "literal") {
	    if (lc.args[0] == true) {
		return rc;
	    } else if (lc.args[0] == false) {
		return lc;
	    }
	}
	
	if (rc.action == "literal") {
	    if (rc.args[0] == true) {
		return lc;
	    } else if (rc.args[0] == false) {
		return rc;
	    }
	}
    }

    return {action: tree.action,
	    args: tree.args.map(doIdentity)};



}




module.exports.convertToCNF = convertToCNF;
function convertToCNF(tree) {
    var actions = [{task: "eliminate bijection", f: eliminateBijection},
		   {task: "eliminate implication", f: eliminateImplication},
		   {task: "DeMorgan's", f: deMorgans},
		   {task: "eliminate double negation", f: eliminateDoubleNegation},
		   {task: "distribute or over and", f: distribOr},
		   {task: "complementation", f: doComplementation},
		   {task: "identity", f: doIdentity}
		  ];


    var toR = [{label: "initial expression", tree: tree}];
    for (let a of actions) {

        // stop early if we are already in CNF
        if (isCNF(toR.peek().tree)) {
            break;

        }
        
        // apply the action until it has no effect
	while (true) {
	    var newTree = a.f(toR.peek().tree);
	    if (util.treeToExpr(newTree) == util.treeToExpr(toR.peek().tree))
		break;

	    toR.push({label: a.task, tree: newTree});
	}
    }



    return toR;
    
}

module.exports.isCNF = isCNF;
function isCNF(tree) {
    var conjChild = function (tree) {
        if (tree.args.length < 2)
            return false;


        if (tree.action == "implication"
            || tree.action == "equivalence"
            || tree.action == "disjunction")
            return false;
        
        
        var lc;
	if (tree.args[0].action == "conjunction") {
	    lc = conjChild(tree.args[0]);
	} else {
	    lc = otherChild(tree.args[0]);
	}


	if (tree.args[1].action == "conjunction") {
	    return conjChild(tree.args[1]) && lc;
	} else {
	    return otherChild(tree.args[1]) && lc;
	}

        return false;


    };

    var otherChild = function (tree) {
	if (!tree)
	    return false;
        
	if (tree.action == "substitution" || tree.action == "literal")
	    return true;

	if (tree.action == "conjunction")
	    return false;

	if (tree.action == "negation") 
            return tree.args[0].action == "substitution";

	if (tree.action == "disjunction")
	    return otherChild(tree.args[0] && tree.args[1]);


	return false;
    };

    if (tree.action == "substitution" || (tree.action == "negation" && tree.args[0].action == "substitution"))
	return true;

    return conjChild(tree);
}

module.exports.splitClauses = splitClauses;
function splitClauses(tree) {
    var clauses = [];
    var findTopLevelDisjunctions = function (tree) {
	if (tree.action == "conjunction") {
	    findTopLevelDisjunctions(tree.args[0]);
	    findTopLevelDisjunctions(tree.args[1]);
	    return;
	}

	clauses.push(tree);
    };

    findTopLevelDisjunctions(tree);
    return clauses;
    
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports.parse = parse;


/*
 This file is part of llang.

 llang is MIT licensed. Feel free to use it, contribute or spread the word. Created with love by Petr Nevyhoštěný (Twitter).
 */


function parse(tokens) {
    var token;
    return process();

    function process(operation) {
        operation = operation || null;
        var args = [];

        while (next()) {
            if (token.type == 'boundary') {
                if (token.value == '(') args.push(process());
                else if (token.value == ')') return node(operation, args);
            }

            else if (token.type == 'variable') {
                args.push(node('substitution', [ token.value ]));
                if (isUnary(operation)) return node(operation, args);
            }

            else if (token.type == 'operator') {
                if (isUnary(token.value)) {
                    args.push(process(token.value));
                    continue;
                }

                if (operation) {
                    var tmp = args.slice(0);
                    args = [];
                    args.push(node(operation, tmp));
                }

                operation = token.value;
            }
        }

        return node(operation, args);
    }

    function next() {
        //TODO: use pointer instead of shifting
        //(parse would not need to clone tokens array)
        return (token = tokens.shift());
    }

    function node(action, args) {
        return {
            action: translate(action),
            args: args
        };
    }

    function translate(operator) {
        var map = {
            '!': 'negation',
            '|': 'disjunction',
            '&': 'conjunction',
            '->': 'implication',
            '<->': 'equivalence'
        };

        return map[operator] || operator;
    }

    function isUnary(op) {
        return op === '!';
    }

    function syntaxError() {
        throw new Error('Syntax error!');
    }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
 This file is part of llang.

 llang is MIT licensed. Feel free to use it, contribute or spread the word. Created with love by Petr Nevyhoštěný (Twitter).
 */

module.exports.lex = lex;

function lex(input) {
    var pointer = 0;
    var tokens = [];
    var c;
    var operator = '';

    while (next()) {
        if (isSpecial(c)) {
            operator += c;
            if (operatorExists(operator)) {
                push('operator', operator);
                operator = '';
            }
        }

        else {
            if (operator.length) unrecognizedToken(operator, pointer - operator.length - 1);

            if (isWhiteSpace(c)) continue;
            else if (isVariable(c)) push('variable', c.toUpperCase());
            else if (isExpressionBoundary(c)) push('boundary', c);
            else unrecognizedToken(c, pointer - 2);
        }
    }

    return tokens;

    function next() {
        return (c = input[pointer++]);
    }

    function push(type, value) {
        tokens.push({
            type : type,
            value : value
        });
    }

    function isWhiteSpace(c) {
        return /\s/.test(c);
    }

    function isVariable(c) {
        return /[A-Za-z]/.test(c);
    }

    function isSpecial(c) {
        return /[<>\-|&!]/.test(c);
    }

    function isExpressionBoundary(c) {
        return /[\(\)]/.test(c);
    }

    function operatorExists(op) {
        return ['!', '|', '&', '->', '<->'].indexOf(op) !== -1;
    }

    function unrecognizedToken(token, position) {
        throw new Error('Unrecognized token "' + token + '" on position ' + position + '!');
    }
}


/***/ })
/******/ ]);
});