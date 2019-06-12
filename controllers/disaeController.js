const Disae = require('../models/disaeModel')
const Spec = require('../models/specModel')
const Symptom = require('../models/symptomModel')

const Question = require('../models/questionModel')

exports.list = (req, res) => {
    Disae.find()
    .populate('spec')
    .populate('symptoms')
    .exec((err, disaes) => {
        if (err) console.log(err)
        res.render('disae', { disaes, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}

exports.create_get = (req, res) => {
    Spec.find()
    .exec((err, specs) => {
        if (err) console.log(err)
        Symptom.find()
        .exec((err, symptoms) => {
            if (err) console.log(err)
            res.render('disae/create', { specs, symptoms, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
        })
    })
}

exports.create_post = (req, res) => {
    let disae = new Disae()
    disae.name = req.body.name
    disae.description = req.body.description
    disae.propability = req.body.propability
    Spec.findById(req.body.spec)
    .exec((err, spec) => {
        if (err) console.log(err)
        disae.spec = spec
        Symptom.find({ _id : { $in: req.body.symptoms } })
        .exec((err, symptoms) => {
            if (err) console.log(err)
            disae.symptoms = symptoms
            disae.save((err) => {
                if (err) console.log(err)
                res.redirect('/disae')
            })
        })
    })   
}

exports.update_get = (req, res) => {
    Spec.find()
    .exec((err, specs) => {
        if (err) console.log(err)
        Symptom.find()
        .exec((err, symptoms) => {
            if (err) console.log(err)
            Disae.findById( req.params.id, (err, disae) => {
                if (err) console.log(err)
                res.render('disae/update', { disae, specs, symptoms, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
            })
        })
    })
}

exports.update_post = (req, res) => {
    Disae.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, disae) => {
                if (err) console.log(err)
                res.redirect('/disae')
            }
    )
}

exports.show = (req, res) => {
    console.log(req.params.id)
    Disae.findOne({ _id: req.params.id })
    .exec((err, disae) => {
        if (err) console.log(err)
        Question.find({ disae: disae.id })
        .populate('user')
        .sort('-createdAt')
        .exec( (err, questions) => {
            if (err) console.log(err)
            res.render('disae/show', { disae, questions, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
        })
        
    })
}

exports.remove = (req, res) => {
    Question.deleteMany({
        disae: req.params.id
    }, (err) => {
        console.log(err)
    })

    Disae.findOneAndRemove(
        { _id: req.params.id },
        (err, disae) => {
            if (err) console.log(err)
            res.redirect(`/disae`)
        }
    )       
}
