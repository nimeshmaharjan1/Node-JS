const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      message: "Username and Password must be provided",
    });
  const foundUser = usersDB.users.find((user) => user.username === username);
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //evaluate password and check
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //?CREATE JWT
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "120s",
      }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    //* Saving refresh token with the current user
    const otherUsers = usersDB.users.filter(
      (user) => user.username !== foundUser.username
    );
    const currentUser = {
      ...foundUser,
      refreshToken,
    };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      true: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken,
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = {
  handleLogin,
};
