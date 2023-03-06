const AuthMiddleware = require("./Auth")
const BodyValidate = require("./ReqBodyValidate")

module.exports = [AuthMiddleware, BodyValidate]