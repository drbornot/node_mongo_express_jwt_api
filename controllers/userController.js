const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
    try {
        
        // check the incoming data
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            const error = new Error("Please enter all required information")
            error.status = 400
            throw error
            // return res.status(400).json({ message: "Please enter all required information", code: 400})
        }
        
        // check if user already exist
        const userExist = await userModel.findOne({ email: req.body.email })
        if (userExist) {
            const error = new Error("User already exist")
            error.status = 409
            throw error
            // return res.status(409).json({ message: "User already exist", code: 409 })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        // register user
        const user = new userModel(req.body)
        await user.save()

        // generate jwt for created user
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })

        return res.status(200).cookie({ 'token': token }).json({ message: "User registered successfully", code: 200, data: user })

    } catch (err) {
        return res.status(err.status).json({ error: err.message, code: err.status })
    }
}

module.exports = {
    registerUser
}