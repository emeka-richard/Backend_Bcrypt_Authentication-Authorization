require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromise = require("fs").promises;
const path = require("path");
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const username = req.body.username;
  const pwd = req.body.pwd;
  if (!username || !pwd)
    return res.status(400).json({ message: "usermname and password required" });
  const registeredUser = usersDB.users.find(
    (user) => user.username === username
  );
  if (!registeredUser) return res.sendStatus(401);
  const authUser = await bcrypt.compare(pwd, registeredUser.pwd);
  if (authUser) {
    const accessToken = jwt.sign(
        {username: registeredUser.username},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30s"}
    );
    const refreshToken = jwt.sign(
        {username: registeredUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1d"}
    );
    const otherUsers = usersDB.users.filter(others => others.username !== registeredUser.username);
    const currentUser = {...registeredUser, refreshToken};
    usersDB.setUsers([...otherUsers, currentUser]);
    fsPromise.writeFile(path.join(__dirname, "..", "models", "users.json"), JSON.stringify(usersDB.users));
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000});
    console.log(accessToken)
    res.json({accessToken});
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
