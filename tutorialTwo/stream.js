const fs = require("fs");
const path = require("path");
const readableStream = fs.createReadStream(
  path.join(__dirname, "files", "lorem.txt"),
  {
    encoding: "utf8",
  }
);
const writableStream = fs.createWriteStream(
  path.join(__dirname, "files", "new-lorem.txt")
);

//!Listen to the data coming from the stream
// readableStream.on("data", (dataChunk) => {
//   console.log(dataChunk);
//   writableStream.write(dataChunk);
// });
readableStream.pipe(writableStream);
