const mongoose = require('mongoose')

require('./specModel')
require('./symptomModel')

const disaeSchema = new mongoose.Schema({
	name : String,
	description : String,
	propability : Number,
	spec: { type: mongoose.Schema.Types.ObjectId, ref: 'Spec' },
	symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Symptom' }]
})

module.exports = mongoose.model('Disae', disaeSchema)
