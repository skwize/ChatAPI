const User = require("../models/UserModel")
const Chat = require("../models/ChatModel")
const { saveFile } = require("../utils/index")

module.exports = {
    getData: async (req, res, next) => {
        try {
            return res.send(await User.findById(req.user.id))
        } catch (err) {
            next(err)
        }
    },

    friends: {
        sendInvite: async (req, res, next) => {
            try {
                const userId = req.body.userId
    
                const user = await User.findById(userId)
    
                if(user.friendInvites.some(
                        invite=>{
                            return invite.equals(req.user.id)
                        }
                    ))
                {
                    return res.send("You're already invite this user")
                }
    
                await User.findByIdAndUpdate(userId, {$push: {friendInvites: req.user.id}})
                return res.status(200).send("You are invite to the friend an user")
            } catch (err) {
                next(err)
            }
        },
    
        inviteAnswere: async (req, res, next) => {
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
    },

    chats: {
        inviteAnswere: async (req, res, next) => {
            try {
    
                const {chatId, isAccept} = req.body
    
                if(!isAccept){
                    await User.findByIdAndUpdate(req.body.id, {
                        $pull: {
                            chatInvites: chatId
                        }
                    })
                    return res.status(203)
                }
    
            } catch (err) {
                next(err)
            }
        },
    },

    settings: {
        avatarUpdate: async (req, res, next) => {
            try {
                // Get file from request and save them in folder
                const {file} = req.files
                const fileUrl = saveFile(req.user.id, file)

                // Update user data
                const user = await User.findByIdAndUpdate(req.user.id, {
                    avatarUrl: fileUrl
                })

                res.status(200).json(user)
            } catch (err) {
                console.error(err)
                next({
                    status: 500,
                    message: "Avatar update failed"
                })
            }
        }
    }
}