const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const { User } = require('../schemas')

passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',
}, (username, password, done) => {
    User.findOne({email})
    .then(user => {
        if(!user) {

        }
    })
}))