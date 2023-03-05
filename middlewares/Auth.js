require('dotenv').config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") next()

    try {
        if(!req.headers.authorization){
            res.status(403).send("")
            next()
        }
    
        const token = req.headers.authorization
    
        const decodedData = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decodedData
        next()
    } catch (error) {
        next(error)
    }
}