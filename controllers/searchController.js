const mongoose = require('mongoose')

const Search = require('../models/searchModel')

const Area = require('../models/areaModel')
const Symptom = require('../models/symptomModel')
const Disae = require('../models/disaeModel')

exports.index = (req, res) => {
    Area.find()
    .exec((err, areas) => {
        if (err) console.log(err)
        res.render('search', { areas })
    })
}

exports.symptoms_by_area = (req, res) => {
    Symptom.find({ area: req.params.id })
    .exec((err, symptoms) => {
        if (err) console.log(err)
        res.send(JSON.stringify(symptoms))
    })
}

exports.disaes_by_symptoms = (req, res) => {
    Disae.find({ symptom: { $in: [req.body.symptoms] }})
    .populate('spec')
    .sort('-propability')
    .exec((err, disaes) => {
        if (err) console.log(err)
        res.send(JSON.stringify(disaes))
    })
}