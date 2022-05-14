const usersDB = {
  users: require("../model/users.json"),
  setUsers: (data) => {
    return (this.users = data);
  },
};
const bcrypt = require("bcrypt");
const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and Password must be provided" });
  const foundUser = usersDB.users.find((user) => user.username === username);
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //evaluate password and check
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    res.json({ success: `User ${username} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};
module.exports = { handleLogin };
