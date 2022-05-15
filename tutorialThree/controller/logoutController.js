const usersDB = {
  users: require("../model/users.json"),
  setUsers: (data) => {
    return (this.users = data);
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content to send back
  const refreshToken = cookies.jwt;

  //is refreshToken is in the databased
  const foundUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, true: "None", secure: true });
    return res.sendStatus(403);
  }
  //Dlete token in database
  const otherUsers = usersDB.users.filter(
    (user) => user.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true, true: "None", secure: true });
  res.sendStatus(204);
};
module.exports = {
  handleLogout,
};
