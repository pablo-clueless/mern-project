const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    body: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdOn: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment