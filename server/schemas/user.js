const mongoose = require('mongoose')
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    fullName: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, validate: (value) => {
        return validator.isEmail(value)
    }},
    password: String,
    image: { data: Buffer, contentType: String },
    bio: String,
    role: String,
    company: String,
    location: String,
    url: String,
    github: String,
    linkedin: String,
    twitter: String,
    createdOn: { type: Date, default: Date.now },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

userSchema.plugin(passportLocalMongoose)
const User = mongoose.model('User', userSchema)

module.exports = User