"use strict";

var add = function add(a, b) {
  return a + b;
};

var substract = function substract(a, b) {
  return a - b;
};

var multiply = function multiply(a, b) {
  return a * b;
};

var divide = function divide(a, b) {
  return a / b;
};

module.exports = {
  add: add,
  substract: substract,
  multiply: multiply,
  divide: divide
};