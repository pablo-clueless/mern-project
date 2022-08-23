const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    body: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    creatorImage: String,
    createdOn: { type: Date, default: Date.now },
    image: [],
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post