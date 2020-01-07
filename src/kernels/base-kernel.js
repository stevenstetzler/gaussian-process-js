export class BaseKernel {    
    k(x, y) {
        throw "Kernel not implemented";
    }
    // evaluate the kernel on the outer product of vectors u and v
    // returns K = [ k(u_i, v_j) ] for 0 < i < u.length and 0 < j < j.length
    vectorEval(u, v) {
        throw "Kernel not implemented";
    }
  }

