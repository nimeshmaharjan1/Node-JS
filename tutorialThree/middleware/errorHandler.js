const { logEvents } = require("./logEvents");

/* This is a middleware that is used to handle errors. It is the last middleware in the chain. */
const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errorLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
