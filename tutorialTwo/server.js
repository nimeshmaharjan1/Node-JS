const fileSystemPromises = require("fs").promises;
const path = require("path");

const fileOperation = async () => {
  try {
    const data = await fileSystemPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fileSystemPromises.unlink(
      path.join(__dirname, "files", "starter.txt"),
      data
    );
    await fileSystemPromises.writeFile(
      path.join(__dirname, "files", "renamedFile.txt"),
      data
    );
    await fileSystemPromises.appendFile(
      path.join(__dirname, "files", "renamedFile.txt"),
      "\n\nAppend TEST"
    );
    await fileSystemPromises.rename(
      path.join(__dirname, "files", "renamedFile.txt"),
      path.join(__dirname, "files", "promiseRenamed.txt")
    );
    const newData = await fileSystemPromises.readFile(
      path.join(__dirname, "files", "promiseRenamed.txt"),
      "utf8"
    );
    console.log("This is the new Data: ", newData);
  } catch (err) {
    console.error(err);
  }
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
