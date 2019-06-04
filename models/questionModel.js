const mongoose = require('mongoose')

require('./disaeModel')
require('./answerModel')

const questionModel = new mongoose.Schema({
    name: String,
    content : String,
	answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
})

questionModel.set('timestamps', true)

module.exports = mongoose.model('Question', questionModel)
