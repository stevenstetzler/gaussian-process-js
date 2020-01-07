import * as math from "mathjs";
import { BaseKernel } from "./base-kernel";

export class SquaredExponentialKernel extends BaseKernel {
    constructor(scale, lengthScale) {
      super();
      this.scale = scale;
      this.lengthScale = lengthScale;
    }
    
    k(x, y) {
      var val = this.scale * math.exp(- math.pow(x - y, 2) / (2 * this.lengthScale));
      return val;
    }

    // evaluate the kernel on the outer product of vectors u and v
    // returns K = [ k(u_i, v_j) ] for 0 < i < u.length and 0 < j < j.length
    vectorEval(u, v) {
      var self = this;
      var fillElement = function(value, index) {
        var u_i = u.subset(math.index(index[0]));
        var v_j = v.subset(math.index(index[1]))
        return self.k(u_i, v_j);
      };
      var K = math.map(math.resize(math.matrix(), [u._size[0], v._size[0]]), fillElement);
      console.log(K);
      return K;
    }
  }

  