const express = require('express')
const { default: axios } = require('axios')
const querystring = require('query-string')
const jwt = require('jsonwebtoken')

const { secret } = require('../config/auth.config')

const router = express.Router()

const redirectURI = '/google'
const SERVER_URL = process.env.SERVER_URL
const CLIENT_URL = process.env.CLIENT_URL
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const COOKIE_NAME = process.env.COOKIE_NAME

const getGoogleAuthURL = () => {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
        redirect_uri: `${SERVER_URL}/${redirectURI}`,
        client_id: GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: "consent",
        scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        ].join(' '),
    }

    return `${rootURL}?${querystring.stringify(options)}`
}

// * Login URL
router.get('/google/url', (req, res) => {
    res.send(getGoogleAuthURL())
})

const getTokens = async({code, clientId, clientSecret, redirectUri}) => {
    const url = 'https://oauth2.googleapis.com/token'
    const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
  }

  return axios
  .post(url, querystring.stringify(values),{
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then((response) => response.data)
  .catch((error) => {
    console.error(`Failed to fetch auth tokens`)
    throw new Error(error.message);
  })
}

router.get(`${redirectURI}`, async(req, res) => {
    const code = req.query.code

    const { id_token, access_token } = await getTokens({
        code,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        redirectUri: `${SERVER_URL}${redirectURI}`
    })

    const googleUser = await axios
    .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,{
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
        console.error(`Failed to fetch user`)
        throw new Error(error.message)
    })

    const token = jwt.sign(googleUser, secret, {expiresIn: '30d'})
    req.session.token = token
    res.cookie( COOKIE_NAME ,token, {maxAge: 90000, httpOnly: true, secure: false})
    res.redirect(CLIENT_URL)
})

router.get('/google/user', (req, res) => {
    console.log('get me')
    try {
        const decoded = jwt.verify(req.cookies[COOKIE_NAME], secret)
        console.log(decoded)
        res.send(decoded)
    } catch (error) {
        console.log(error)
        res.send(null)
    }
})

module.exports = router