//? THREE TYPES OF MIDDLEWARE BUILT-in, CUSTOM AND 3RD PARTY

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

//CORS: Cross Origin Resource Sharing
//custom middleware logger
// app.use((req, res, next) => { //?as this can be cleaned up and be created as a custom middleware in the logEvent as a importable function.
//   logEvents(
//     `${req.method}\t${req.headers.origin}\t${req.url}`,
//     "requestLogs.txt"
//   );
//   console.log(`Request Method: ${req.method}\nRequest Path: ${req.path}`);
//   next();
// });

app.use(logger);

/* A whitelist of the allowed origins. */
const whitelist = ["http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS policy."));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
//!middleware app.use to use middlewares, applies to all urls
//?Its for handling url endcoded data or form data. To pull data out as a parameter
/* Used to handle url encoded data. */
app.use(express.urlencoded({ extended: false }));

//For JSON
app.use(express.json());

/* Telling the server to use the public folder as a static folder. */
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// app.use("/", require("./routes/root"));
//!ROUTES
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir")); //* provide the route that were providing the router for
//? So this router will route the request coming to the subdir route instead of the below provided routers

app.use("/employees", require("./routes/api/employees"));

//* making .html optional
const HTML = "(.html)?";

//? begin with a slash = ^
//? end with a slash = $
//? or = |

// app.get(
//   `^/$|index${HTML}`,
//   (request, response) =>
//     response.sendFile(path.join(__dirname, "views", "index.html")) //? send file from server to the client
// );
// app.get(`/new-page${HTML}`, (request, response) =>
//   response.sendFile(path.join(__dirname, "views", "new-page.html"))
// );
// app.get(`/old-page${HTML}`, (request, response) =>
//   response.redirect(301, "/new-page.html")
// );

//! ROUTE HANDLERS
app.get(
  `/hello${HTML}`,
  (request, response, next) => {
    console.log("Attempted to load the hello file.");
    next();
  },
  (request, response) => {
    response.send("Response after the first callback");
  }
);

/* This is the default route handler. It is used to handle any request that does not match any of the
other routes. */
//DEFAULT
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found." });
  } else {
    res.type("txt").send("404 not found.");
  }
});

app.use(errorHandler);
//? Use app to listen to the specific port.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
