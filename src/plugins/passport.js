const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        
        User.findOne({ email: email }).then((user) => {

            bcrypt.compare(password, user.password).then((success) => {
                if (success) {
                    return done(null, user);
                }

                return done(null, false, { message: 'Invalid E-mail or password' }); 
            })
    
        }).catch((error) => {
            return done(null, false, {});
        });
    })
);