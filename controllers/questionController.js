const Question = require('../models/questionModel')
const Answer = require('../models/answerModel')
const Disae = require('../models/disaeModel')

exports.list = (req, res) => {
    Question.find()
    .populate('user')
    .sort('-createdAt')
    .exec((err, questions) => {
        if (err) console.log(err)
        res.render('question', { questions, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}

exports.show = (req, res) => {
    Question.findOne({ _id: req.params.id })
    .populate('user')
    .populate('disae')
    .exec((err, question) => {
        if (err) console.log(err)
        let isGoodSpec = false
        if (req.user) {
            isGoodSpec = req.user.spec.toString() === question.disae.spec.toString() ? true : false
        }
        Answer.find({ question: question.id })
        .populate('user')
        .exec( (err, answers) => {
            if (err) console.log(err)
            res.render('question/show', { question, answers, isGoodSpec, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
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
    question.disae = req.body.disae_id
    question.save()
    res.redirect(`/disae/show/${ req.body.disae_id }`)
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
    .sort('-createdAt')
    .exec((err, questions) => {
        if (err) console.log(err)
        res.render('question/userQuestions', { questions, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}

exports.waiting_questions = (req, res) => {
    Question.find()
    .populate('disae')
    .sort('-createdAt')
    .exec( (err, questions) => {
        questions = questions.filter(q => q.disae.spec.toString() === req.user.spec.toString())
        res.render('question/waitingQuestions', { questions, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}