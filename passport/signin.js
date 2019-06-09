const LocalStrategy   = require('passport-local').Strategy
const User = require('../models/userModel')
const bCrypt = require('bcrypt-nodejs')

module.exports = (passport) => {
	passport.use('signin', new LocalStrategy({
            passReqToCallback : true
        },
        (req, username, password, done) => { 
            User.findOne({ 'username' :  username }, 
                (err, user) => {
                    if (err)
                        return done(err)
                    if (!user){
                        console.log('User Not Found with username ' + username);
                        return done(null, false/*, req.flash('message', 'User Not found.')*/)                
                    }
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password')
                        return done(null, false/*, req.flash('message', 'Invalid Password')*/); // redirect back to login page
                    }
                    return done(null, user)
                }
            );

        })
    );


    const isValidPassword = (user, password) => {
        return bCrypt.compareSync(password, user.password)
    }
    
}