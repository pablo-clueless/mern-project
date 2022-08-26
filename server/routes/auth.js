const express = require('express')

const { resetPassword, signin, signup } = require('../controllers/auth')

const router = express.Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.post('/reset-password', resetPassword)

module.exports = router