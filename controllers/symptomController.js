const Symptom = require('../models/symptomModel')
const Area = require('../models/areaModel')


exports.list = (req, res) => {
    Symptom.find()
    .populate('area')
    .exec((err, symptoms) => {
        if (err) console.log(err)
        res.render('symptom', { symptoms, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}

exports.create_get = (req, res) => {
    Area.find()
    .exec((err, areas) => {
        if (err) console.log(err)
        res.render('symptom/create', { areas, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}

exports.create_post = (req, res) => {
    let symptom = new Symptom()
    symptom.name = req.body.name
    Area.findById(req.body.area)
    .exec((err, area) => {
        if (err) console.log(err)
        symptom.area = area
        symptom.save((err) => {
            if (err) console.log(err)
            res.redirect('/symptom')
        })
    })
   
}

exports.update_get = (req, res) => {
    Area.find()
    .exec((err, areas) => {
        if (err) console.log(err)
        Symptom.findById(req.params.id)
        .populate('area')
        .exec((err, symptom) => {
            if (err) console.log(err)
            res.render('symptom/update', { symptom, areas, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
        })
    })
}

exports.update_post = (req, res) => {
    Symptom.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, symptom) => {
                if (err) console.log(err)
                res.redirect('/symptom')
            }
    )
}

exports.remove = (req, res) => {
    Symptom.findOneAndRemove(
        { _id: req.params.id },
        (err, symptom) => {
            if (err) console.log(err)
            res.redirect(`/symptom`)
        }
    )       
}