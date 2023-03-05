const router = require("express").Router()
const controller = require("../controllers/AuthController")
const ReqBodyValidate = require("../middlewares/ReqBodyValidate")

router.post('/login', ReqBodyValidate, controller.login)
router.post('/register', ReqBodyValidate, controller.register)

module.exports = router