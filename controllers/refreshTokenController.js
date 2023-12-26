require("dotenv").config();
const jwt = require("jsonwebtoken");
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt )
    return res.sendStatus(401) ;
 const refreshToken = cookies.jwt;
 const existingdUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!existingdUser) return res.sendStatus(401);

  jwt.verify(
    refreshToken, 
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded)=>{
        if(err || decoded.username !== existingdUser.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { "username": decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        )
        res.json({ accessToken })
    }
    )
};

module.exports = { handleRefreshToken };
