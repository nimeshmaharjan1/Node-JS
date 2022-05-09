"use strict";

var fileSystemPromises = require("fs").promises;

var path = require("path");

var fileOperation = function fileOperation() {
  var data, newData;
  return regeneratorRuntime.async(function fileOperation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fileSystemPromises.readFile(path.join(__dirname, "files", "starter.txt"), "utf8"));

        case 3:
          data = _context.sent;
          console.log(data);
          _context.next = 7;
          return regeneratorRuntime.awrap(fileSystemPromises.unlink(path.join(__dirname, "files", "starter.txt"), data));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(fileSystemPromises.writeFile(path.join(__dirname, "files", "renamedFile.txt"), data));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(fileSystemPromises.appendFile(path.join(__dirname, "files", "renamedFile.txt"), "\n\nAppend TEST"));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(fileSystemPromises.rename(path.join(__dirname, "files", "renamedFile.txt"), path.join(__dirname, "files", "promiseRenamed.txt")));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(fileSystemPromises.readFile(path.join(__dirname, "files", "promiseRenamed.txt"), "utf8"));

        case 15:
          newData = _context.sent;
          console.log("This is the new Data: ", newData);
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

fileOperation();
/*
fileSystem.readFile(
  //*Join the directory name then the files folder then the file itself so its dynamic
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    console.log(data);
    if (err) throw err;
  }
); //!use toString method or use another argument as the encoding
*/
// console.log("Hello");
//*Write to file

/* fileSystem.writeFile(
  path.join(__dirname, "files", "write.txt"),
  "Nice to meet you", //!Content to put in the file
  (err) => {
    console.log("Write Complete");
    if (err) throw err;
    fileSystem.appendFile(
      path.join(__dirname, "files", "write.txt"),
      "\n\nAppend Test", //!Content to put in the file
      (err) => {
        console.log("Append Complete");
        if (err) throw err;
        fileSystem.rename(
          path.join(__dirname, "files", "write.txt"),
          path.join(__dirname, "files", "renamedFile.txt"),
          (err) => {
            console.log("Rename Complete");
            if (err) throw err;
          }
        );
      }
    );
  }
);
*/
//APPEND TO FILE
// fileSystem.appendFile(
//   path.join(__dirname, "files", "testAppend.txt"),
//   "Add Text", //!Content to put in the file
//   (err) => {
//     console.log("Append Complete");
//     if (err) throw err;
//   }
// );
// //* exit on uncaught errors
// process.on("uncaughtException", (err) => {
//   console.error(`There was an uncaught error: ${err}`);
//   process.exit(1);
// });