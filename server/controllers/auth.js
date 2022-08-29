const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const { User } = require('../schemas')
const { EMAIL_REGEX, PASSWORD_REGEX } = require('../utils/validators')
const { secret, refresh_secret } = require('../config/auth.config')
const transporter = require('../utils/email-service')
let refreshTokens = {}

const resetEmailTemp = fs.readFileSync(path.join('templates', '/forgot-password.hbs'), 'utf-8')

const signin = async(req, res) => {
    const { username, password } = req.body
    
    try {
        const user = await User.findOne({username: username})
        if(!user) return res.status(404).json({message: 'user not found'})
        const isPasswordValid = bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(400).json({message: 'Invalid password'})
        const token = jwt.sign({ id: user._id}, secret, { expiresIn: '24h' })
        const refreshToken = jwt.sign({ id: user._id}, refresh_secret, { expiresIn: '30d'})
        req.session.token = token
        req.session.refresh_token = refreshToken
        const response = {message: 'Signin successful', user, token, refreshToken}
        refreshTokens[refreshToken] = response
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({message: `Internal server error, couldn't verify user`, error})
    }
}

const signup = async(req, res) => {
    const { fullName, username, email, password } = req.body

    if(!fullName) {
        return res.status(400).json({message: 'Name is required'})
    }

    if(!username) {
        return res.status(400).json({message: 'Username is empty or invalid'})
    }

    if(!email || !EMAIL_REGEX.test(email)) {
        return res.status(400).json({message: 'Email is empty or invalid'})
    }

    if(!password || !PASSWORD_REGEX.test(password)) {
        return res.status(400).json({message: 'Password is invalid or not strong enough'})
    }
    
    try {
        let isUsernameInUse = await User.findOne({username})
        let isEmailInUse = await User.findOne({email})
        if(isUsernameInUse || isEmailInUse) {
            return res.status(500).json({message: 'This user exists already, try logging instead.'})
        }
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        await User.create({fullName, username, email, password: hashedPassword })
        res.status(201).json({message: 'User created.'})
    } catch (error) {
        return res.status(500).json({message: `Internal server error, couldn't create user.`, error})
    }
}

const refresh = async(req, res) => {
    const { refreshToken, username, password } = req.body

    if(refreshToken && (refreshToken in refreshTokens)) {
        try {
            delete refreshTokens[refreshToken]
            const user = await User.findOne({username: username})
            if(!user) return res.status(404).json({message: 'user not found'})
            const isPasswordValid = bcrypt.compare(password, user.password)
            if(!isPasswordValid) return res.status(400).json({message: 'Invalid password'})
            const token = jwt.sign({id: user._id}, secret, {expiresIn: '24h'})
            req.session.token = token
            const response = {message: 'Signin successful', user, token}
            refreshTokens[refreshToken] = response
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({message: 'Internal server error', error})
        }
    } else {
        return res.status(401).json({message: 'User is unauthorized'})
    }
}

const requestPasswordReset = async(req, res) => {
    const { email } = req.body1
    
    try {
        const user = await User.findOne({email: email})
        if(!user) return res.status(404).json({message: 'User not found'})
        const token = jwt.sign({id: user._id}, secret, {expiresIn: 54000})
        // * Logic to send mail with token
        let mailOptions = {
            from: 'DevHub Team',
            to: email,
            subject: 'Password Reset',
            text: `Hey there, let's process your password reset`,
            html: resetEmailTemp,
            name: user.fullName,
            url: `${process.env.FE_URL}/reset-password/${token}`,
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) return console.log(error)
            console.log('Message sent', info)
        })
        return res.status(200).json({message: 'A link to reset your password has been sent to your email'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const resetPassword = async() => {
    const { password } = req.body
    let token = req.headers['x-access-token']
    let id
    jwt.verify(token, secret, (err, decoded) => {
        id = decoded.id
        next()
    })
    
    try {
        const user = await User.findOne({_id: id})
        if(!user) return res.status(404).json({message: 'User not found'})
        const updatedUser = await User.findOneAndUpdate({_id: id}, {$set: {password: password}}, {new: true})
        if(!updatedUser) return res.status(400).json({message: 'Unable to change password, try again'})
        return res.status(200).json({message: 'Password reset successful'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})     
    }
}

module.exports = { refresh, requestPasswordReset, resetPassword, signin, signup }