const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.URI).then((data) => 
            console.log(`Database connection success at ${data.connection.host}`)
        )

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB