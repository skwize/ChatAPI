const router = require("express").Router()
const controller = require("../controllers/ChatController")
const [AuthMiddleware, ReqBodyValidate] = require("../middlewares/index")


router.get('/', AuthMiddleware, controller.getData)
router.post('/create', [AuthMiddleware, ReqBodyValidate], controller.create)
router.patch('/send', [AuthMiddleware, ReqBodyValidate], controller.sendMessage)


module.exports = router