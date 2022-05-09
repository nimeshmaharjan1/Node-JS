"use strict";

var os = require("os");

var path = require("path");

var _require = require("./math"),
    add = _require.add,
    substract = _require.substract,
    multiply = _require.multiply,
    divide = _require.divide;

console.log(add(2, 2)); // console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());
// console.log(__dirname); //gives the whole directory path
// console.log(__filename); //gives the whole directory till file name
// console.log(path.dirname(__filename)); //* same as dirname
// console.log(path.basename(__filename)); //* just the file name
// console.log(path.extname(__filename)); //* extension of the file
// console.log(path.parse(__filename)); // * a object of all the values of the file directory