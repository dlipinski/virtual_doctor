const mongoose = require('mongoose')

require('./areaModel')
require('./symptomModel')

const SearchSchema = mongoose.Schema({
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Symptom' }]
})

SearchSchema.set('timestamps', true)

module.exports = mongoose.model('Search', SearchSchema)