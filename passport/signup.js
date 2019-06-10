const LocalStrategy   = require('passport-local').Strategy
const User = require('../models/userModel')
const bCrypt = require('bcrypt-nodejs')

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true
        },
        (req, username, password, done) => {
            findOrCreateUser = () => {
                User.findOne({ 'username' :  username }, (err, user) => {
                    if (err){
                        console.log('Error in SignUp: '+err)
                        return done(err)
                    }
                    if (user) {
                        console.log('User already exists with username: ' + username)
                        return done(null, false, { message: 'Nazwa użytkownika jest zajęta.' })
                    } else {
                        let newUser = new User()

                        newUser.username = username
                        newUser.password = createHash(password)
                        newUser.firstName = req.param('firstName')
                        newUser.lastName = req.param('lastName')

                        newUser.save( (err) => {
                            if (err){
                                console.log('Error in Saving user: '+err)
                                throw err
                            }
                            console.log('User Registration succesful')
                            return done(null, newUser)
                        })
                    }
                })
            }
            process.nextTick(findOrCreateUser)
        })
    )

    const createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
    }

}