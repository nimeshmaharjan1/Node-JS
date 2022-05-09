const logEvents = require("./logEvents");
const EventEmitter = require("events");

// So what happened here was euta function export garyo logEvent jun le chai takes a message as a parameter jun ma chai it records the date and time the function was called along with a unique id with the use of uuid for each time the function is called. Then index.js file ma euta custom event banayo
// custom event ko lagi chai paila events bhanne common module import garnu paryo
// tespachi euta class banaune Event Emitter bhanera tes pachi extend it to MyEmitter bhanne super class.
//then initialize its object ani create a custom event called log and also a callback function which takes the message as the parameter.
// then to emit the event we use event.emit custom event banauna chai .on emit garna lai .emit

class MyEmitter extends EventEmitter {}

//initialize object
const myEmitter = new MyEmitter();

//add event listener for the logEvent
//listening for a custom log event

myEmitter.on("log", (message) => {
  return logEvents(message);
});

setTimeout(() => {
  myEmitter.emit("log", "Log event emitted");
}, 2000);
