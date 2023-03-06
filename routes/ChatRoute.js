const router = require("express").Router()
const controller = require("../controllers/ChatController")
const [AuthMiddleware, ReqBodyValidate] = require("../middlewares/index")


router.get('/', AuthMiddleware, controller.getData)
router.post('/create', [AuthMiddleware, ReqBodyValidate], controller.create)
router.patch('/send', [AuthMiddleware, ReqBodyValidate], controller.messageManipulation.sendMessage)

// Chat settings
router.patch('/settings/title', AuthMiddleware, controller.settings.changeTitle)

module.exports = router