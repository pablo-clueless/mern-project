const express = require('express')

const { autoSignin, resetPassword, signin, signup } = require('../controllers/auth')
const { verifyToken } = require('../middlewares/authJwt')

const router = express.Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.post('/signin/:id', [verifyToken], autoSignin)

router.post('/reset-password', resetPassword)

module.exports = router