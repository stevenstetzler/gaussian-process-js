var math = require("mathjs");
var MultivariateNormal = require("multivariate-normal").default;

class MyMultivariateNormal extends MultivariateNormal {
  constructor(meanVector, covarianceMatrix) {
    super(meanVector._data, covarianceMatrix._data);
    this.meanVector = meanVector;
    this.covarianceMatrix = covarianceMatrix;
    this.dim = this.meanVector._size[0];
    this.inverseCovarianceMatrix = math.inv(math.matrix(this.covarianceMatrix));
    this.covarianceMatrixDeterminant = math.det(math.matrix(this.covarianceMatrix));
  }

  _pdf(x, meanVector, covarianceMatrix, inverseCovarianceMatrix, covarianceMatrixDeterminant) {
    var dim = meanVector._size[0];
    var diff = math.subtract(x, meanVector);
    var numerator = math.exp(
      -0.5 * math.multiply(
        math.transpose(diff), 
        math.multiply(
          inverseCovarianceMatrix, 
          diff
        )
      )
    );
    var denominator = math.sqrt(math.pow((2 * Math.PI), dim) * covarianceMatrixDeterminant);
    return math.divide(numerator, denominator);
  }

  pdf(x) {
    return this._pdf(x, this.meanVector, this.covarianceMatrix, this.inverseCovarianceMatrix, this.covarianceMatrixDeterminant);
  }

  pdfPoints(points) {
    var pdfAtPoints = [];
    for (var i = 0; i < points.length; i++) {
      pdfAtPoints.push(this.pdf(points[i]));
    }
    return pdfAtPoints;
  }
}

module.exports.MyMultivariateNormal = MyMultivariateNormal;