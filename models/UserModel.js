const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chats'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    chatInvites: [{
        type: Schema.Types.ObjectId,
        ref: "Chats"
    }],
    friendInvites: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = model('Users', UserSchema)