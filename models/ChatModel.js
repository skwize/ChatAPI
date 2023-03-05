const {Schema, model} = require("mongoose")

const ChatSchema = new Schema()

module.exports = model("Chats", ChatSchema)