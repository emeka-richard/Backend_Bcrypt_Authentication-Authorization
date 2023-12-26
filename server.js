const express = require("express");
const app = express();
// const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middlewares/logEvents");
const { errorHandler } = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 8000;
const homePageRouter = require("./routes/homepage");
const employeeRouter = require("./routes/employee");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const verifyJWT = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");
const refreshTokenRoute = require("./routes/refreshToken");
const logoutRoute = require("./routes/logout");

app.use(logger);
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("^/$|/index", homePageRouter);
app.use("/register", registerRoute);
app.use("/auth", loginRoute);
app.use("/refresh", refreshTokenRoute);
app.use("/logout", logoutRoute);

app.use(verifyJWT);
app.use("/employees", employeeRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
  // if(req.accepts('html')){
  //     res.sendFile(path.join(__dirname, 'views', '404.html'));
  // } else if(req.accepts(json)){
  //     res.json({message: '404 Not Found'})
  // } else {
  //     res.type('txt').send('404 Not Found')
  // }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Successfully started server @${PORT}`));
