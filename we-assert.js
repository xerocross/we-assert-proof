var buildWeAssert = function() {
  var levels = {
      0 : "DEBUG",
      1 : "WARN",
      2 : "ERROR"
  };
  var levelStringToInt = function(levelString) {
    switch (levelString) {
      case "DEBUG":
        return 0;
        break;
      case "WARN":
        return 1;
        break;
      case "ERROR":
        return 2;
        break;
    }
  };
  var currentLevel = 2;
  var setLevel = function(levelString) {
    var newLevel = levelStringToInt(levelString);
    if (newLevel == 0 || newLevel == 1 || newLevel == 2) {
      currentLevel = newLevel;
    } else {
      throw "unexpected level"
    }
  };

  var getLevel = function() {
    return levels[currentLevel];
  };

  var handler = function() {};
  var setHandler = function(newHandler) {
    handler = newHandler;
  };

  var that = function(statement, message) {
      if (!statement) {
        handler(statement, message);
      }
  };
  var internalVerification = function(levelString, verificationFunction) {
    let level = levelStringToInt(levelString);
    if (level <= currentLevel) {
      verificationFunction();
    }
  };

  var atLevel = function(someLevelString) {
    var obj = {};
    obj.that = function(statement, message) {
      let level = levelStringToInt(someLevelString);
      if (level >= currentLevel) {
        that(statement, message);
      } else {

      }
    }
    return obj;
  }

  return {
    setLevel : setLevel,
    that : that,
    atLevel: atLevel,
    setHandler : setHandler,
    getLevel: getLevel
  }
}
module.exports.buildWeAssert = buildWeAssert;
