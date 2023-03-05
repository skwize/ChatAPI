const {Schema, model} = require("mongoose")

const ChatSchema = new Schema({
    title: String,
    members: [{
        id: Schema.Types.ObjectId
    }],
    message:[{
        user: Schema.Types.ObjectId,
        files: [{
            url:String,
        }],
        text: String
    }]
})

module.exports = model("Chats", ChatSchema)