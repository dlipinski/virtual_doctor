const moment = require('moment')

const Search = require('../models/searchModel')

const Area = require('../models/areaModel')
const Symptom = require('../models/symptomModel')
const Disae = require('../models/disaeModel')

exports.client_index = (req, res) => {
    Area.find()
    .sort('name')
    .exec((err, areas) => {
        if (err) console.log(err)
        res.render('search/clientIndex', { areas, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
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
    let symptoms = req.params.ids.split(',')
    Disae.find({ symptoms: { $in: symptoms }})
    .sort('-propability')
    .exec((err, disaes) => {
        if (err) console.log(err)
        res.send(JSON.stringify(disaes))
    })
}

exports.create = (req, res) => {
    let area = req.body.area
    let symptoms = [...req.body.symptoms]
     
    let search = new Search()
    search.area = area
    search.symptoms = symptoms
    search.save((err) => {
        if (err) console.log(err)
        res.send('OK')
     })
 
}

exports.list = (req, res) => {
    const today = moment().startOf('day')
    Search.find({ createdAt: {  $gte: today.toDate(), $lte: moment(today).endOf('day').toDate() } })
    .populate('area')
    .populate('symptoms')
    .exec((err, searches) => {
        if (err) console.log(err)
        res.render('search', { searches, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined})
    })
}

exports.list_by_date = (req, res) => {
    let dates = decodeURIComponent(req.params.dates)
    let from = dates.split(';')[0].split('/')
    let to = dates.split(';')[1].split('/')
    from = moment(new Date(`${from[2]}-${from[1]}-${from[0]}`)).startOf('day').toDate()
    to =  moment(new Date(`${to[2]}-${to[1]}-${to[0]}`)).endOf('day').toDate()
    Search.find({ createdAt: {  $gte: from, $lte: to } })
    .populate('area')
    .populate('symptoms')
    .exec((err, searches) => {
        if (err) console.log(err)
        res.send(searches)
    })
}

exports.remove = (req, res) => {
    Search.findOneAndRemove(
        { _id: req.params.id },
        (err, spec) => {
            if (err) console.log(err)
            res.redirect(`/search`)
        }
    )       
}