const usersDB = {
  users: require("../model/users.json"),
  setUsers: (data) => {
    return (this.users = data);
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password must be provided." });
  //check for duplicate username
  const checkDuplicateUsername = usersDB.users.find(
    (user) => user.username === username
  );
  if (checkDuplicateUsername) res.sendStatus(409); //! STATUS FOR CONFLICT
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //passing salts
    //store the new user
    const newUser = { username: username, password: hashedPassword };
    //harek choti naya variable banayera push garnu bhanda sidhai spread garera new arr create garne
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(path.join(__dirname, "..", "model", "users.json"));
    console.log(usersDB.users);
    res
      .status(201)
      .json({ success: `New user ${username} has been successfully created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { handleNewUser };
