const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenght: [4, 'Name should have at least 4 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLenght: [8, 'Password should have at least 8 characters']
    },
    token: {
        type: String
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel