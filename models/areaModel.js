const mongoose = require('mongoose')

const areaSchema = new mongoose.Schema({
	name : String
})

module.exports = mongoose.model('Area', areaSchema)
