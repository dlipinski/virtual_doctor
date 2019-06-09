const signin = require('./signin')
const signup = require('./signup')
const User = require('../models/userModel')

module.exports = (passport) => {
    passport.serializeUser( (user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    signin(passport)
    signup(passport)

}