const Disae = require('../models/disaeModel')

const Spec = require('../models/specModel')
const Symptom = require('../models/symptomModel')

exports.list = (req, res) => {
    Disae.find()
    .populate('spec')
    .populate('symptoms')
    .exec((err, disaes) => {
        if (err) console.log(err)
        res.render('disae', { disaes })
    })
}

exports.create_get = (req, res) => {
    Spec.find()
    .exec((err, specs) => {
        if (err) console.log(err)
        Symptom.find()
        .exec((err, symptoms) => {
            if (err) console.log(err)
            res.render('disae/create', { specs, symptoms })
        })
    })
}

exports.create_post = (req, res) => {
    let disae = new Disae()
    disae.name = req.body.name
    disae.description = req.body.description
    disae.propability = req.body.propability
    console.log(disae.description)
    Spec.findById(req.body.spec)
    .exec((err, spec) => {
        if (err) console.log(err)
        disae.spec = spec
        Symptom.find({ _id : { $in: req.body.symptoms } })
        .exec((err, symptoms) => {
            try {
                disae.symptoms = symptoms
                disae.save()
                res.redirect('/disae')
            } catch (err) {
                console.log(err)
            }
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
                res.render('disae/update', { disae, specs, symptoms })
            })
        })
    })
}

exports.update_post = (req, res) => {
    Disae.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, symptom) => {
                if (err) console.log(err)
                res.redirect('/disae')
            }
    )
}

exports.remove = (req, res) => {
    Disae.findOneAndRemove(
        { _id: req.params.id },
        (err, disae) => {
            if (err) console.log(err)
            res.redirect(`/disae`)
        }
    )       
}
