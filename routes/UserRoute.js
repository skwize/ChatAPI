const router = require("express").Router()
const controller = require("../controllers/UserController")
const AuthMiddleware = require("../middlewares/AuthMiddleware")


router.get('/', AuthMiddleware, controller.getData)

module.exports = router