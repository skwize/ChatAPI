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
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Chats'
        }
    }],
    friends: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    }],
    invites: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: "Chats"
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = model('Users', UserSchema)