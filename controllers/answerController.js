const Answer = require('../models/answerModel')
const Question = require('../models/questionModel')


exports.create_post = (req, res) => {
    let answer = new Answer()
    answer.content = req.body.content
    answer.user = req.user
    answer.question = req.body.question_id
    answer.save()
    res.redirect(`/question/show/${req.body.question_id}`)
}

exports.rate = (req, res) => {
    Answer.findById(req.params.id)
    .exec( (err, answer) => {
            if (err) console.log(err)
            answer.ratingCount ++
            answer.ratingSum = answer.ratingSum + parseInt(req.body.rate) - 1
            answer.save()
            res.redirect(`/question/show/${req.body.question}`)
        }
    )
}

exports.my_answers = (req, res) => {
    Answer.find({ user: req.user })
    .exec( (err, answers) => {
        if (err) console.log(err)
        res.render('answer/myAnswers', { answers, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined  })
    })
}