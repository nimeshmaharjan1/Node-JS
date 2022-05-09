const fs = require("fs");
const path = require("path");

if (fs.existsSync(path.join(__dirname), "new")) {
  !fs.existsSync(path.join(__dirname), "new")
    ? fs.mkdir(path.join(__dirname, "new"), (err) => {
        if (err) throw err;
        console.log("Directory created.");
      })
    : console.log("Directory with the same name already exists.");

  if (fs.existsSync(path.join(__dirname), "new")) {
    fs.rmdir(path.join(__dirname, "new"), (err) => {
      if (err) throw err;
      console.log("Directory deleted.");
    });
  }
} else {
  console.log("The directory does not exist");
}
