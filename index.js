require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongodb = require("mongoose")
const fileupload = require("express-fileupload")

const app = express()
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 8080
const db_port = process.env.DB_PORT || 27017

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(fileupload({
    createParentPath:true,
    limits: "20mb"
}))



//Middlewares



//Routes
const UserRoute = require("./routes/UserRoute")
const AuthRoute = require("./routes/AuthRoute")


app.use('/auth', AuthRoute)
app.use('/user', UserRoute)


//ErrorHandler
const ErrorHandler = require("./middlewares/ErrorHandler")
app.use(ErrorHandler)


//Connect database and start server
mongodb.connect(`mongodb://${host}:${db_port}/ChatApi`).then(()=>{
    console.log("\nMongoDB was successfully connected!")
    app.listen(port, (err)=>{
        if (err) throw err
        console.log(`Server listening on ${port}\nURL: http://${host}:${port}`)
    })
})