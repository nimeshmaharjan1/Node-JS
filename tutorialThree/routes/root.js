const express = require("express");
const router = express.Router();
const path = require("path");
const HTML = "(.html)?";

router.get(
  `^/$|index${HTML}`,
  (request, response) =>
    response.sendFile(path.join(__dirname, "..", "views", "index.html")) //? send file from server to the client
);
router.get(`/new-page${HTML}`, (request, response) =>
  response.sendFile(path.join(__dirname, "..", "views", "new-page.html"))
);
router.get(`/old-page${HTML}`, (request, response) =>
  response.redirect(301, "/new-page.html")
);
module.exports = router;
