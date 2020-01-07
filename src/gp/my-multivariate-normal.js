import * as math from "mathjs";
import MultivariateNormal from "multivariate-normal";

export default class MyMultivariateNormal {
    constructor(meanVector, covarianceMatrix) {
      this.meanVector = meanVector;
      this.dim = this.meanVector._size[0];
      this.covarianceMatrix = covarianceMatrix;
      this.inverseCovarianceMatrix = math.inv(this.covarianceMatrix);
      this.covarianceMatrixDeterminant = math.det(this.covarianceMatrix);
      this.distribution = new MultivariateNormal(this.meanVector._data, this.covarianceMatrix._data);
    }

    getMean() {
      return this.distribution.getMean();
    }

    setMean(meanVector) {
      return new MyMultivariateNormal(meanVector, this.covarianceMatrix);
    }

    getCov() {
      return this.distribution.getCov();
    }

    setCov(covarianceMatrix) {
      return new MyMultivariateNormal(this.meanVector, covarianceMatrix);
    }

    sample() {
      return this.distribution.sample();
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
