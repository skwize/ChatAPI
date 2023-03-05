const router = require("express").Router()
const controller = require("../controllers/UserController")
const Auth = require("../middlewares/Auth")
const ReqBodyValidate = require("../middlewares/ReqBodyValidate")


router.get('/', Auth, controller.getData)
router.patch('/friends/invite/', [Auth, ReqBodyValidate], controller.friendInvite)
router.patch('/friends/invite/answere', [Auth, ReqBodyValidate], controller.friendInviteAnswere)
router.patch('/chats/invite/answere', [Auth, /* ReqBodyValidate */], controller.chatInviteAnswere)


module.exports = router