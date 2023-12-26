const express = require("express");
const registerRoute = express.Router()
const registerController = require("../controllers/registerController");

registerRoute.post('/', registerController.handleNewUser)

module.exports = registerRoute