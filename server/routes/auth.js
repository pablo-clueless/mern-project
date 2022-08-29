const express = require('express')

const { refresh, requestPasswordReset, resetPassword, signin, signup } = require('../controllers/auth')
const { verifyRefreshToken, verifyToken } = require('../middlewares/authJwt')

const router = express.Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.post('/signin/:id', verifyRefreshToken, refresh)

router.post('/forgot-password', requestPasswordReset)

router.post('/reset-password', [verifyToken], resetPassword)

module.exports = router