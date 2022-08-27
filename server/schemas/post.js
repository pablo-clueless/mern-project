const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    body: { type: String },
    image: { type: String },
    createdBy: {
        name: { type: String, required: true },
        image: { type: String },
    },
    createdOn: { type: Date, default: Date.now },
    likes: { type: Number, default: 0, min: 0 },
    comments: [{
        by: {
            name: { type: String },
            image: { type: String },
        },
        comment: { type: String },
        createdOn: { type: Date, default: Date.now }
    }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post