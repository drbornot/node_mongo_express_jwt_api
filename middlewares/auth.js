const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const isAuth = async (req, res, next) => {

    try {
        const {token} = req.cookies

        // if no token then request for login
        if (!token) {
            const error = new Error('Please login to get access')
            error.status = 404
            throw error
            // return next('Please login to get access')
        }

        // verify token
        const verify = await jwt.verify(token, process.env.JWT_SECRET)

        req.user = await userModel.findById(verify.id)
        next()
    } catch (error) {
        return res.status(error.status).json({ message: error.message, code: error.status })
        // return next(error)
    }

}

module.exports = isAuth