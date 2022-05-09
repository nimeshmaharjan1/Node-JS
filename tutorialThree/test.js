const { format } = require("date-fns");
//*import v4 as uuid

const { v4: uuid } = require("uuid");
console.log(format(new Date(), "yyyy/MM/dd\tHH:mm:ss"));

//* delete dependencies rm/uninstall/un -g -D(--save-dev)
//! package.json: dependencies => "uuid" : "^~8.3.2" ^ = update the minor ver. and the patch, ~ = only update the patch, none = specific version
//! UUD lets us generate different IDs for each entries
console.log(uuid());
