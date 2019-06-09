const User = require('../models/userModel')
const Spec = require('../models/specModel')
const Answer = require('../models/answerModel')

exports.list = (req, res) => {
    User.find()
    .populate('area')
    .exec((err, users) => {
        if (err) console.log(err)
        res.render('user', { users, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}

exports.show = (req, res) => {
    User.findById(
        req.user.id,
        (err, user) => {
            Spec.find()
            .exec( (err, specs) => {
                if (err) console.log(err)
                res.render('user/show', { username: user.username, role: user.role, realName: user.realName , userSpec: req.user.spec, specs })
            })
        }
    )
}


exports.update = (req, res) => {
    let realName = req.body.realName
    let spec = req.body.spec
    User.findById(
        req.user.id,
        (err, user) => {
            user.realName = realName
            user.spec = spec
            user.save( (err, user) => {
                if (err) console.log(err)
                res.redirect('/account')
            })
        }
    )
}

exports.set_unset_doctor = (req, res) => {
    User.findById(
        req.params.id,
        (err, user) => {
            if (user.role === 'user')
                user.role = 'doctor'
            else
                user.role = 'user'
            user.save( (err, user) => {
                res.redirect('/user')
            })
        }
    )
}

exports.show_doctor = (req, res) => {
    User.findById(req.params.id)
    .populate('spec')
    .exec((err, doctor) => {
            Answer.find({ user: doctor.id })
            .sort('-createdAt')
            .exec( (err, answers) => {
                let rate = 0
                let count = 0
                answers.forEach( a => {
                    rate += Math.floor(a.ratingSum/a.ratingCount)
                    count ++
                })
                res.render('user/showDoctor', { doctor, answers, rate: Math.floor(rate/count) - 1, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined  } )
            })
        }
    )
}

exports.remove = (req, res) => {
    User.findOneAndRemove(
        { _id: req.params.id },
        (err, user) => {
            if (err) console.log(err)
            res.redirect(`/user`)
        }
    ) 
}