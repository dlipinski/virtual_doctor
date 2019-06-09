const mongoose = require('mongoose')

require('./disaeModel')
require('./answerModel')

const questionModel = new mongoose.Schema({
    name: String,
    content : String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

questionModel.set('timestamps', true)

module.exports = mongoose.model('Question', questionModel)
