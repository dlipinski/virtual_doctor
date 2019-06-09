const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const initPassport = require('./passport/init');
const routes = require('./routes')

const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true })

app.use(session({ secret: 'Wielki$ekret44', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

initPassport(passport)

app.use('/', routes(passport))

app.listen(3001, () => {
    console.log('App listening on port 3001')
    console.log('Press Ctrl+C to quit.')
})

