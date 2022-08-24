const mongoose = require('mongoose')
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    fullName: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, validate: (value) => {
        return validator.isEmail(value)
    }},
    password: {type: String },
    image: { type:String },
    bio: { type:String },
    role: { type:String },
    company: { type:String },
    location: { type:String },
    url: { type:String },
    github: { type:String },
    linkedin: { type:String },
    twitter: { type:String },
    createdOn: { type: Date, default: Date.now },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    notifications: [{
        message: { type: String },
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        time: { type: Date }
    }],
    messages: [{
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        body: { type: String },
        time: { type: Date }
    }]
})

userSchema.set('toJSON', {
    transform: (doc, ret, opt) => {
        delete ret['password']
        return ret
    }
})

userSchema.plugin(passportLocalMongoose)
const User = mongoose.model('User', userSchema)

module.exports = User