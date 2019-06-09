const mongoose = require('mongoose')

require('./userModel')
require('./disaeModel')

const questionModel = new mongoose.Schema({
    name: String,
    content : String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    disae: { type: mongoose.Schema.Types.ObjectId, ref: 'Disae' }
})

questionModel.set('timestamps', true)

module.exports = mongoose.model('Question', questionModel)
