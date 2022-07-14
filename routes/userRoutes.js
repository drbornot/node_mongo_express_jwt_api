const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const isAuthenticated = require("../middlewares/auth")
const router = express.Router()

const userController = require("../controllers/userController")

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser)

router.get('/user', isAuthenticated, userController.getAuthUser)

module.exports = router