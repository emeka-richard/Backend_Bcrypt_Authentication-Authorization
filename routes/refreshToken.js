const express = require("express");
const refreshTokenRoute = express.Router()
const refreshTokenController = require("../controllers/refreshTokenController");

refreshTokenRoute.get('/', refreshTokenController.handleRefreshToken)

module.exports = refreshTokenRoute