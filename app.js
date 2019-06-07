const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/', routes())

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true })

app.listen(3001, () => {
    console.log('App listening on port 3000')
    console.log('Press Ctrl+C to quit.')
})