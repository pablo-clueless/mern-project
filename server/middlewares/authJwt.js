const jwt = require('jsonwebtoken')

const { secret, refresh_secret } = require('../config/auth.config')

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']
    if(!token) {
        res.status(403).json({message: 'No access token provided'})
    }
    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            res.status(401).json({message: 'User is unauthorized'})
        }
        req.userId = decoded.id
        next()
    })
}

const verifyRefreshToken = (req, res, next) => {
    let token = req.headers['x-refresh-token']
    if(!token) {
        res.status(403).json({message: 'No refresh token provided'})
    }
    jwt.verify(token, refresh_secret, (err, decoded) => {
        if(err) {
            res.status(401).json({message: 'User is unauthorized'})
        }
        req.userId = decoded.id
    })
}

const authJwt = { verifyToken, verifyRefreshToken }

module.exports = authJwt