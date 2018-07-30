var levels = {
    0 : "DEBUG",
    1 : "WARN",
    2 : "ERROR"
}
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
}
var currentLevel = 2;
var setLevel = function(levelString) {
  var newLevel = levelStringToInt(levelString);
  if (newLevel) {
    currentLevel = newLevel;
  }
}

var getLevel = function() {
  return levels(currentLevel);
}

var that = function(statement, message) {
    if (!statement) {
      throw new Error("false assertion: " + message);
    }
};
var internalVerification = function(levelString, verificationFunction) {
  let level = levelStringToInt(levelString);
  if (level <= currentLevel) {
    verificationFunction();
  }
}

module.exports.setLevel = setLevel;

module.exports.weAssert = {
  that : that
}
module.exports.verify = internalVerification;
