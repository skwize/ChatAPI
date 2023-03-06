const Chat = require("../models/ChatModel")
const { saveFile } = require("../utils/index")

module.exports = {
    getData: async (req, res, next) => {
        try {
            const data = Chat.findById(req.body.chatId)
            return res.status(200).send(data)
        } catch (err) {
            next(err)
        }
    },

    create: async (req, res, next) => {
        try {
            const {title, members, file} = req.body

            const data = await Chat.create({
                title: title,
                members: members
            })

            const fileUrl = saveFile(data._id, file)
            data.avatarUrl.replace(fileUrl)
            data.members.push(req.user.id)
            data.save()
            res.status(201).send(data)
        } catch (err) {
            next(err)
        }
    },
    
    messageManipulation: {
        sendMessage: async (req, res, next) => {
            try {
    
                const {chatId, text, files} = req.body
                var chat = await Chat.findById(chatId)
    
                if (!text && !files){
                    return res.status(400).send("You can't send empty message")
                }
    
                chat.message.push({
                    user: req.user.id,
                    text: text || "",
                    files: files || ""
                })
                chat.save()
                res.status(200).send(chat)
            } catch (err) {
                next(err)
            }
        },
    },

    settings: {
        changeTitle: async (req, res, next) => {
            try {
                res.status(501).send("Comming Soon...")
            } catch (err) {
                next(err)
            }
        },
    }
}