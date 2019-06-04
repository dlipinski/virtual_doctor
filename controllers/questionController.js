const Question = require('../models/questionModel')
const Disae = require('../models/disaeModel')

exports.list = (req, res) => {
    Question.find()
    .populate('disae')
    .exec((err, questions) => {
        if (err) console.log(err)
        res.render('question', { questions })
    })
}

exports.show = (req, res) => {
    Question.findOne({ _id: req.params.id })
    .populate('answers')
    .exec((err, question) => {
        res.render('question/show', { question })
    })
}

exports.create_get = (req, res) => {
    Disae.findById(
        req.params.disaeId,
        (err, disae) => {
            res.render('question/create', { disae })
        }
    )
}

exports.create_post = (req, res) => {
    let question = new Question()
    question.name = req.body.name
    question.content = req.body.content
    Disae.findById(
        req.body.disae_id,
        (err, disae) => {
            question.save()
            disae.questions.push(question)
            disae.save()
            res.redirect(`/disae/show/${ disae._id }`)
        }
    )
}

exports.update_get = (req, res) => {
    Question.findById(req.params.id)
    .exec((err, question) => {
        if (err) console.log(err)
        res.render('question/update', { question })
    })
}
exports.update_post = (req, res) => {
    Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, question) => {
                if (err) console.log(err)
                res.redirect('/question')
            }
    )
}

exports.remove = (req, res) => {
    Question.findOneAndRemove(
        { _id: req.params.id },
        (err, question) => {
            if (err) console.log(err)
            res.redirect(`/question`)
        }
    )       
}