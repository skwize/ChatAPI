const router = require("express").Router()
const controller = require("../controllers/AuthController")

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router