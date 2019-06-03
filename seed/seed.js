
const Area = require('../models/areaModel')
const Spec = require('../models/specModel')
const Symptom = require('../models/symptomModel')
const Disae = require('../models/disaeModel')

const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true }, () => {
    mongoose.connection.db.dropDatabase()

    let head = new Area({ name: 'głowa' })
    let tors = new Area({ name: 'tors' })
    head.save((err) => { if (err) console.log(err) })
    tors.save((err) => { if (err) console.log(err) })

    let lekarz = new Spec({ name: 'Lekarz ogólny' })
    lekarz.save((err) => { if (err) console.log(err) })

    let head_pain = new Symptom({ name: 'bół głowy', area: head.id})
    let heart_pain = new Symptom( { name: 'migotanie przedsionków', area: tors.id})
    head_pain.save((err) => { if (err) console.log(err) })
    heart_pain.save((err) => { if (err) console.log(err) })

    let disae = new Disae({ name: 'rak', spec: lekarz, symptoms: [head_pain, heart_pain] })
    disae.save((err) => { if (err) console.log(err) })
    
})

console.log('Seeded')
process.exit()