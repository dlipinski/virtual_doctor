const mongoose = require('mongoose')

const answerModel = new mongoose.Schema({
    content : String,
    ratingSum: {
        type: Number,
        default: 0 
    },
    ratingCount: {
        type: Number,
        default: 1
    },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

answerModel.set('timestamps', true)

module.exports = mongoose.model('Answer', answerModel)
