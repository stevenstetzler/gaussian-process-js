var math = require("mathjs");
var MyMultivariateNormal = require("./my-multivariate-normal").MyMultivariateNormal

class GaussianProcess {
  constructor(mean, kernel) {
    this.mean = mean;
    this.kernel = kernel;
  }

  fit(trainX, trainY) {
    this.trainX = trainX;
    this.trainY = trainY;
    this.n = this.trainY._size[0];

    this.trainMeanVector = (this.mean).predict(trainX);

    this.trainCovarianceMatrix = this.kernel.vectorEval(trainX, trainX);
    this.trainInverseCovarianceMatrix = math.inv(this.trainCovarianceMatrix);

    console.log("making likelihood");
    this.likelihood = new MyMultivariateNormal(this.trainMeanVector, this.trainCovarianceMatrix);
  }

  predict(testX) {
    // return mean and predictive variance at test locations
    this.testMeanVector = (this.mean).predict(testX);
    
    this.trainTestCovarianceMatrix = this.kernel.vectorEval(this.trainX, testX);
    this.testTrainCovarianceMatrix = math.transpose(this.trainTestCovarianceMatrix);
    this.testTestCovarianceMatrix = this.kernel.vectorEval(testX, testX);

    var testMeanVectorConditionedOnTrain = math.add(
      this.testMeanVector, 
      math.multiply(
        math.multiply(
          this.testTrainCovarianceMatrix,
          this.trainInverseCovarianceMatrix
        ), 
        math.subtract(
          this.trainY, 
          this.trainMeanVector
        )
      )
    )

    var testCovarianceConditionedOnTrain = math.subtract(
      this.testTestCovarianceMatrix,
      math.multiply(
        math.multiply(
          this.testTrainCovarianceMatrix,
          this.trainInverseCovarianceMatrix
        ),
        this.trainTestCovarianceMatrix
      )
    )

    return [testMeanVectorConditionedOnTrain, testCovarianceConditionedOnTrain]
  }
}

module.exports.GaussianProcess = GaussianProcess;