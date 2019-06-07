const Answer = require('../models/answerModel')



exports.create_post = (req, res) => {
    let answer = new Answer()
    answer.content = req.body.content
    answer.save((err) => {
        if (err) console.log(err)
        res.send('OK')
    })
}

exports.rate = (req, res) => {
    Answer.findById(req.params.id)
    .exec( (err, answer) => {
            if (err) console.log(err)
            console.log(answer.ratingCount)
            console.log(answer.ratingSum)
            answer.ratingCount ++
            answer.ratingSum = answer.ratingSum + parseInt(req.body.rate) - 1
            answer.save()
            res.redirect(`/question/show/${req.body.question}`)
        }
    )
}