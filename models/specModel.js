const mongoose = require('mongoose')

const specSchema = new mongoose.Schema({
	name : String
})

module.exports = mongoose.model('Spec', specSchema)
