// There are two ways to use this file a module

// 1. CommonJS Module Syntax

const sum = (x, y) => {
  return x + y;
};

function difference(a, b) {
  return a - b;
}

function product(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

module.exports = {
  // module.exports is an object, i.e., it has key value pairs
  add: sum,
  subtract: difference,
  multiply: product,
  divide: divide,
};

// exports.sum = (x, y) => {
//   return x + y;
// };

// module.exports = function(x, y) {
//   return x + y;
// }

// module.exports = { sum, product };
