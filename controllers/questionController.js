const Question = require('../models/questionModel')
const Answer = require('../models/answerModel')
const Disae = require('../models/disaeModel')

exports.list = (req, res) => {
    Question.find()
    .populate('disae')
    .populate('user')
    .exec((err, questions) => {
        if (err) console.log(err)
        res.render('question', { questions, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}

exports.show = (req, res) => {
    Question.findOne({ _id: req.params.id })
    .populate('user')
    .exec((err, question) => {
        if (err) console.log(err)
        Answer.find({ question: question.id })
        .populate('user')
        .exec( (err, answers) => {
            res.render('question/show', { question, answers, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
        })
    })
}

exports.create_get = (req, res) => {
    Disae.findById(
        req.params.disaeId,
        (err, disae) => {
            if (err) console.log(err)
            res.render('question/create', { disae, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
        }
    )
}

exports.create_post = (req, res) => {
    let question = new Question()
    question.name = req.body.name
    question.content = req.body.content
    question.user = req.user
    Disae.findById(
        req.body.disae_id,
        (err, disae) => {
            if (err) console.log(err)
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
        res.render('question/update', { question, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
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

exports.my_questions = (req, res) => {
    Question.find({ user: req.user })
    .populate('disae')
    .exec((err, questions) => {
        if (err) console.log(err)
        res.render('question/myQuestions', { questions, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}