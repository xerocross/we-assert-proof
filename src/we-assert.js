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
        var handler = function () {};
        let currentLevel = 2;
        let assumptions = [];
        let WeAssert = {
        
            setLevel : function (levelString) {
                var newLevel = levelStringToInt(levelString);
                if (newLevel == 0 || newLevel == 1 || newLevel == 2) {
                    currentLevel = newLevel;
                } else {
                    throw new Error("we-assert: invalid error level");
                }
            },
            getLevel : function () {
                return levels[currentLevel];
            },
            setHandler : function (newHandler) {
                handler = newHandler;
            },
            internalVerification : function (levelString, verificationFunction) {
                let level = levelStringToInt(levelString);
                if (level <= currentLevel) {
                    verificationFunction();
                }
            },
            that : function (statement, message) {
                if (!statement) {
                    handler(statement, message);
                }
                return ((statement) == true);
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
        return WeAssert;
    }
}