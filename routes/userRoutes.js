const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const isAuthenticated = require("../middlewares/auth")
const router = express.Router()

const userController = require("../controllers/userController")

router.post('/register', userController.registerUser)

router.post('/login', async (req, res) => {
    
})

router.get('/user', isAuthenticated, async (req, res) => {
    
})

module.exports = router