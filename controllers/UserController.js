const User = require("../models/UserModel")
const Chat = require("../models/ChatModel")

module.exports = {
    getData: async (req, res, next) => {
        try {
            return res.send(await User.findById(req.user.id))
        } catch (err) {
            next(err)
        }
    },

    friendInvite: async (req, res, next) => {
        try {
            const userId = req.body.userId

            const user = await User.findById(userId)

            if(user.friendInvites.some(invite=>{ return invite.equals(req.user.id)}))
            {
                return res.send("You're already invite this user")
            }

            await User.findByIdAndUpdate(userId, {$push: {friendInvites: req.user.id}})
            return res.status(200).send("You are invite to the friend an user")
        } catch (err) {
            next(err)
        }
    },

    friendInviteAnswere: async (req, res, next) => {
        try {

            const {inviteId, isAccept} = req.body

            if(!isAccept){
                const updatedData = await User.findByIdAndUpdate(req.user.id, {$pull:{friendInvites: inviteId}})
                return res.status(200).send(updatedData)
            }

            await User.findByIdAndUpdate(req.user.id, {$pull:{friendInvites: inviteId}})
            const updatedData = await User.findByIdAndUpdate(req.user.id, {$push: {friends: inviteId}})
            await User.findByIdAndUpdate(inviteId, {$push: {friends: req.user.id}})
            return res.status(200).send(updatedData)

        } catch (err) {
            next(err)
        }
    },

    chatInviteAnswere: async (req, res, next) => {
        try {

            return res.status(501).send("Coming Soon...")

        } catch (err) {
            next(err)
        }
    },
}