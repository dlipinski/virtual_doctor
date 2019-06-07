const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

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


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));