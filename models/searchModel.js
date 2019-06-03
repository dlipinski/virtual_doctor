const mongoose = require('mongoose')

require('./areaModel')
require('./symptomModel')

const SearchSchema = mongoose.Schema({
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    symptom: { type: mongoose.Schema.Types.ObjectId, ref: 'Symptom' }
})

module.exports = mongoose.model('Search', SearchSchema)