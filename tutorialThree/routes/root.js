const express = require("express");
const router = express.Router();
const path = require("path");
const HTML = "(.html)?";

router.get(
  `^/$|index${HTML}`,
  (request, response) =>
    response.sendFile(path.join(__dirname, "..", "views", "index.html")) //? send file from server to the client
);
module.exports = router;
