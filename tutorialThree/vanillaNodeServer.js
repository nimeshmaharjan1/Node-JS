const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const logEvents = require("./logEvents");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on("log", (message, fileName) => {
  return logEvents(message, fileName);
});
//* If we to host this application somewhere it would use this detail
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      //! If the content includes a image file
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errorLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((request, res) => {
  console.log(request.url, request.method);
  myEmitter.emit("log", `${request.url}\t${request.method}`, "requestLog.txt");

  //! extension of the req url by using the path.extname method
  const extension = path.extname(request.url);

  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }
  let filePath =
    contentType === "text/html" && request.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && request.url.slice(-1) === "/"
      ? path.join(__dirname, "views", request.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", request.url) //? could be any other html file other than index.html
      : path.join(__dirname, request.url); //? could be css or any data file in the request.url

  if (!extension && request.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    //serve the file
    serveFile(filePath, contentType, res);
  } else {
    //404
    //301 redirect to somewhere else
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        //serve a 404 res
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
