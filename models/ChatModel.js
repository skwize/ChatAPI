const {Schema, model} = require("mongoose")

const ChatSchema = new Schema({
    chatTitle: String,
})

module.exports = model("Chats", ChatSchema)