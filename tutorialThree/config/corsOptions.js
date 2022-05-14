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
module.exports = { corsOptions };
