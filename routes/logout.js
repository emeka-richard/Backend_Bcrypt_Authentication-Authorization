const express = require("express");
const logoutRoute = express.Router()
const logoutController = require("../controllers/logoutController");

logoutRoute.get('/', logoutController.handleLogout)

module.exports = logoutRoute