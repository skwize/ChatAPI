const Chat = require("../models/ChatModel")

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
            let {title, members} = req.body
            const data = await Chat.create({
                title: title,
                members: members
            })
            data.members.push(req.user.id)
            data.save()
            res.status(201).send(data)
        } catch (err) {
            next(err)
        }
    },
    
    sendMessage: async (req, res, next) => {
        try {

            const {chatId, text, files} = req.body
            var chat = await Chat.findById(chatId)

            if (!text && !files){
                return res.status(400).send("Bad Request")
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
    }
}