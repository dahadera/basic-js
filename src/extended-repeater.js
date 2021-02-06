const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  if (!options.hasOwnProperty('separator'))
    options.separator = '+';
  if (!options.hasOwnProperty('additionSeparator'))
    options.additionSeparator = '||';

  if (options.hasOwnProperty('repeatTimes') && options.repeatTimes == undefined) {
    options.repeatTimes = 1;
  }
  if (options.hasOwnProperty('additionRepeatTimes') && options.additionRepeatTimes == undefined) {
    options.additionRepeatTimes = 1;
  }
  if (options.hasOwnProperty('addition') && options.addition == null) {
    options.addition = 'null';
  }

  let subArr = Array(options.additionRepeatTimes).fill().map(i => options.addition);
  let subStr = subArr.join(options.additionSeparator);

  let finalStr = Array(options.repeatTimes).fill().map(i => str + subStr)

  return finalStr.join(options.separator);
}