const express = require("express");
const loginRoute = express.Router()
const loginController = require("../controllers/loginController");

loginRoute.post('/', loginController.handleLogin)

module.exports = loginRoute