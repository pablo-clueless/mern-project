const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdOn: { type: Date, default: Date.now },
    image: [],
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post