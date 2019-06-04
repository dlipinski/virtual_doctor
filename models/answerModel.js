const mongoose = require('mongoose')

const answerModel = new mongoose.Schema({
    content : String,
    rating: Number
})

answerModel.set('timestamps', true)

module.exports = mongoose.model('Answer', answerModel)
