const fsPromise = require("fs").promises;
const path = require("path");
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogout = async(req, res) => {

  const cookies = req.cookies;

  if (!cookies?.jwt )
    return res.sendStatus(204) ;
// console.log(cookies.jwt);
const refreshToken = cookies.jwt;
 const existingdUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!existingdUser){
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    return res.sendStatus(204);
  } 
  const othrUsers = usersDB.users.filter(user => user.refreshToken !== existingdUser.refreshToken)
  const currentUser = {...existingdUser, refreshToken: ""};
  usersDB.setUsers([...othrUsers, currentUser]);

  await fsPromise.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(usersDB.users)
  )
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }) //in production, you should set 'secure: true'
    res.sendStatus(204);
};

module.exports = { handleLogout };
