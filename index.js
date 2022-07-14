const cookieParser = require("cookie-parser")
const express = require("express")
const dotenv = require("dotenv")

dotenv.config({ path: './config/config.env'})

const connMongo = require('./config/conn')

const app = express()
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(cookieParser())

app.use('/api', userRoutes)




// start db connection and listening to the server
connMongo().then(() => {
    app.listen(process.env.PORT, () => { 
        console.log(`Server is listening at ${process.env.PORT} port`)
    })
})

