const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  calculateDepth(arr) {
    if (arr.some(item => Array.isArray(item))) {
      let flattened = arr.flat();
      return 1 + this.calculateDepth(flattened);
    }
    return 1;
  }
};