const mongoose = require('mongoose')

const SymptomSchema = mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Symtom', SymptomSchema)