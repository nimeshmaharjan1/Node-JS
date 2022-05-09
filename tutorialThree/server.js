const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const logEvents = require("./logEvents");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

//* If if we to host this application somewhere it would use this detail
const PORT = process.env.PORT || 3500;

const server = http.createServer((request, response) => {
  console.log(request.url, request.method);
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

// myEmitter.on("log", (message) => {
//   return logEvents(message);
// });

// myEmitter.emit("log", "Log event emitted");
