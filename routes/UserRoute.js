const router = require("express").Router()
const controller = require("../controllers/UserController")
const Auth = require("../middlewares/Auth")
const ReqBodyValidate = require("../middlewares/ReqBodyValidate")

// Got user data
router.get('/', Auth, controller.getData)

// Manipulation of friends
router.patch('/friends/invite/', [Auth, ReqBodyValidate], controller.friends.sendInvite)
router.patch('/friends/invite/answere', [Auth, ReqBodyValidate], controller.friends.inviteAnswere)


// Manipulation of chats
router.patch('/chats/invite/answere', [Auth, /* ReqBodyValidate */], controller.chats.inviteAnswere)


// User settings
router.patch('/settings/avatar/update', [Auth, /* ReqBodyValidate */], controller.settings.avatarUpdate)

module.exports = router