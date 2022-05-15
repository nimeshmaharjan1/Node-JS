const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    console.log("Empty cookies");
    return res.sendStatus(401);
  } //Unauthorized
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!foundUser) {
    console.log("User was not found.");
    return res.sendStatus(403);
  } //Forbidden
  //evaluate jwt and check
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120s" }
    );
    res.json({ accessToken });
  });
};
module.exports = {
  handleRefreshToken,
};
