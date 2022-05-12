//* CREATING A ROUTER
const express = require("express");
const router = express.Router();
const path = require("path");
const HTML = "(.html)?";

router.get(`^/$|index${HTML}`, (request, response) =>
  response.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"))
);
router.get(`test${HTML}`, (request, response) =>
  response.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"))
);

module.exports = router;
