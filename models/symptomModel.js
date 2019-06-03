const mongoose = require('mongoose')

require('./areaModel')

const SymptomSchema = mongoose.Schema({
    name: String,
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' }
})

module.exports = mongoose.model('Symptom', SymptomSchema)