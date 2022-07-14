const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const isAuth = async (req, res, next) => {

    try {
        const {token} = req.cookies
        if (!token) {
            return next('Please login to get access')
        }

        const verify = await jwt.verify(token, process.env.JWT_SECRET)

        req.user = await userModel.findById(verify.id)
        next()
    } catch (error) {
        return next(error)
    }

}

module.exports = isAuth