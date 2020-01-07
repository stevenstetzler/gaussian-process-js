import * as math from "mathjs";

export default class ZeroMean {
    predict(testX) {
      return math.resize(math.matrix(), testX._size, 0);
    }
  }

