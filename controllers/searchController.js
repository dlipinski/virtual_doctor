const Search = require('../models/searchModel')

const Area = require('../models/areaModel')
const Symptom = require('../models/areaModel')

exports.index = (req, res) => {
    Area.find()
    .exec((err, areas) => {
        if (err) console.log(err)
        res.render('search', { areas })
    })
}

exports.symptoms_by_area = (req, res) => {
    Symptom.find({ area: req.params.id})
    .exec((err, symptoms) => {
        if (err) console.log(err)
        console.log(symptoms)
        res.send(symptoms)
    })
}