const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
//* making .html optional
const HTML = "(.html)?";

/*
! begin with a slash = ^
! end with a slash = $
! or = |
*/
app.get(
  `^/$|index${HTML}`,
  (request, response) =>
    response.sendFile(path.join(__dirname, "views", "index.html")) //? send file from server to the client
);
app.get(`/new-page${HTML}`, (request, response) =>
  response.sendFile(path.join(__dirname, "views", "new-page.html"))
);
app.get(`/old-page${HTML}`, (request, response) =>
  response.redirect(301, "/new-page.html")
);

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

//DEFAULT
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
//? Use app to listen to the specific port.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
