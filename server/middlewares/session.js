const session = require('express-session')

const { secret } = require('../config/auth.config')

const sessionMiddleWare = session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
})

module.exports = { sessionMiddleWare }