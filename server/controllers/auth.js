const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../schemas')
const cloudinary = require('../cloudinary')
const { secret } = require('../config/auth.config')

const signin = async(req, res, next) => {
    const { username, password } = req.body

    try {
        const existingUser = await User.findOne({username}).select({ password: 0, __v: 0 })
        if(!existingUser) {
            return res.status(404).json({message: 'User not found, please try again.'})
        }    
        const validPassword = await bcrypt.compare(password, existingUser.password)
        if(validPassword) {
            const token = jwt.sign({ id: existingUser._id }, secret, { expiresIn: 86400 })
            req.session.token = token
            const user = existingUser
            res.status(200).json({message: 'Signin successful.', data: { user, token}})
        } else {
            return res.status(400).json({message: 'Invalid password, please try again.',})
        }
    } catch (error) {
        return res.status(500).json({message: `Internal server error, couldn't verify user`, error})
    }
}

const signup = async(req, res, next) => {
    const { fullName, username, email, password } = req.body
    
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

const signout = async(req, res, next) => {
    try {
        req.session = null
        return res.status(200).json({message: 'Signout successfull.'})
    } catch (error) {
        next(err)
    }
}

module.exports = { signin, signup, signout }