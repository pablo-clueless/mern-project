const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    body: { type: String, required: true },
    images: [{ tyep: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdOn: { type: Date, default: Date.now },
    likes: [{
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }],
    comments: [{
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String },
        createdOn: { type: Date, default: Date.now }
    }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post