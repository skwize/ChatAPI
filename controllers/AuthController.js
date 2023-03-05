require("dotenv").config()
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function genAccessToken(id){
    const key = process.env.SECRET_KEY
    const payload = {
        id
    }
    return jwt.sign(payload, key, {expiresIn:"72h"})
}

module.exports = {
    login: async (req, res, next) => {
        try {

            const {login, password} = req.body
            const candidate = await User.find({login: login})
            const hash = candidate[0].password

            if (!bcrypt.compare(password, hash)){
                return res.send("Incorrect password")
            }

            return res.status(200).send({
                token: genAccessToken(candidate[0]._id)
            })
        } catch (error) {
            next(error)
        }
    },

    register: async (req, res, next) => {
        try {
        
            const {name, login, password} = req.body
            const isExist = await User.exists({login:login})

            if(isExist) {
                return res.send("User has Exists")
            }

            const hash = await bcrypt.hash(password, 7)

            await User.create({name: name, login:login, password: hash}).then(r=>{
                return res.status(201).send({
                    token: genAccessToken(r._id)
                })
            })

        } catch (error) {
            next(error)
        }
    },
}