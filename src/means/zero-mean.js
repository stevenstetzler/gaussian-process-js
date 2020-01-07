var math = require("mathjs");

class ZeroMean {
  predict(testX) {
    return math.resize(math.matrix(), testX._size, 0);
  }
}

module.exports.ZeroMean = ZeroMean;