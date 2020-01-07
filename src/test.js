import { Kernels, Means, GaussianProcess } from "./gaussian-process";
import * as math from "mathjs";

var gp = new GaussianProcess(new Means.ZeroMean(), new Kernels.SquaredExponentialKernel(1, 0.5));
gp.fit(math.matrix([-2, 0, 2]), math.matrix([2, 4, 4]));

var x = math.range(-4, 4, 0.1);
var gpPrediction = gp.predict(x);
var y = gpPrediction[0];
var cov = gpPrediction[1];
var variances = [];
console.log(y._size[0]);
for (var i = 0; i < y._size[0]; i++) {
  variances.push(math.subset(cov, math.index(i, i)));
}

console.log(y);
console.log(variances);
