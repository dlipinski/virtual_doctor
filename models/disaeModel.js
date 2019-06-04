const mongoose = require('mongoose')

require('./specModel')
require('./symptomModel')
require('./questionModel')

const disaeSchema = new mongoose.Schema({
	name : String,
	description : String,
	propability : Number,
	spec: { type: mongoose.Schema.Types.ObjectId, ref: 'Spec' },
	symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Symptom' }],
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
})

module.exports = mongoose.model('Disae', disaeSchema)
