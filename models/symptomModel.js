const mongoose = require('mongoose')

require('./areaModel')

const symptomSchema = mongoose.Schema({
    name: String,
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' }
})

module.exports = mongoose.model('Symptom', symptomSchema)