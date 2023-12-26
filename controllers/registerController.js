const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const username = req.body.username;
  const pwd = req.body.pwd;
  if (!username || !pwd)
    return res.status(400).json({ message: "usermname and password required" });
  const duplicate = usersDB.users.find((user) => user.username === username);
  if (duplicate) return res.sendStatus(409); //conflict

  try {
    const hashedPWD = await bcrypt.hash(pwd, 10);
    const newUser = {
      "username": username,
      "pwd": hashedPWD,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    fsPromise.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );
    // console.log(usersDB.users);
    res.status(201).json({ success: "new user created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
