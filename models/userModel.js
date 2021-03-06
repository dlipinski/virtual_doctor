const mongoose = require('mongoose')

require('./specModel')

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    realName: String,
    spec: { type: mongoose.Schema.Types.ObjectId, ref: 'Spec' }
})

module.exports = mongoose.model('User',UserSchema)