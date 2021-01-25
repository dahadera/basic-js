const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  if ((!Array.isArray(arr))) {
    throw new Error();
  }
  
  let transformedArr = [];

  for(let i = 0; i < arr.length; i++) {
    if (arr[i] === '--discard-next') {
      i++;
    }
    else if (arr[i] === '--discard-prev') {
      if (arr[i - 2] !== '--discard-next') {
        transformedArr.pop();
      }
    }
    else if (arr[i] === '--double-next') {
      if (i != arr.length - 1) {
        transformedArr.push(arr[i + 1]);
      } 
    }
    else if (arr[i] === '--double-prev') {
      if (i != 0 && arr[i - 2] !== '--discard-next') {
        transformedArr.push(transformedArr[transformedArr.length - 1]);
      }
    } else {
      transformedArr.push(arr[i]);
    }
  }
  
  return transformedArr;
};
