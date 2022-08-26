const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const { User } = require('../schemas')
const { secret } = require('../config/auth.config')

const signin = async(req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({username: username})
        if(!user) return res.status(404).json({message: 'user not found'})
        const isPasswordValid = bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(400).json({message: 'Invalid password'})
        const token = jwt.sign({ id: user._id}, secret, { expiresIn: 86400 })
        req.session.token = token
        return res.status(200).json({message: 'Signin successful', user, token})
    } catch (error) {
        return res.status(500).json({message: `Internal server error, couldn't verify user`, error})
    }
}

const signup = async(req, res) => {
    const { fullName, username, email, password } = req.body

    if(validator.isEmpty(fullName) || validator.isAlphanumeric(username)) {
        return res.status(400).json({message: 'Name is required'})
    }

    if(validator.isEmpty(username) || validator.isAlphanumeric(username)) {
        return res.status(400).json({message: 'Username is empty or invalid'})
    }

    if(validator.isEmpty(email) || !validator.isEmail(email)) {
        return res.status(400).json({message: 'Email is empty or invalid'})
    }

    if(validator.isEmpty(password) || !validator.isStrongPassword(password)) {
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

const resetPassword = async(req, res) => {}

module.exports = { resetPassword, signin, signup }