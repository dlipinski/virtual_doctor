const mongoose = require('mongoose')

require('./areaModel')
require('./symptomModel')

const searchSchema = mongoose.Schema({
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Symptom' }]
})

searchSchema.set('timestamps', true)

module.exports = mongoose.model('Search', searchSchema)