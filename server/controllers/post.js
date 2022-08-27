const { Post, User } = require('../schemas')
const validator = require('validator')
const cloudinary = require('cloudinary').v2


const getAll = async(req, res) => {
    try {
        const posts = await Post.find({})
        return res.status(200).json({message: 'All posts gotten', posts})
    } catch (error) {
        return res.status(500).json({message: 'internal server error', error})
    }
}

const findOne = async(req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findOne({_id: id})
        if(!post) return res.status(404).json({message: 'Post not found'})
        return res.status(200).json({message: 'Post found', post})
    } catch (error) {
        return res.status(500).json({message: 'internal server error', error})
    }
}

const create = async(req, res) => {
    const { body, createdBy } = req.body
    let image = req?.file?.path
    let imageUrl

    if(!body === '' && !image) return res.status(400).json({message: 'Post body cannot be empty'})

    try {
        if(image) {
            const result = await cloudinary.uploader.upload(image, {folder: 'post-images'})
            if(!result) return res.status(400).json({message: 'Unable to upload image'})
            imageUrl = result ? result.url : null
        }

        const user = await User.findOne({_id: createdBy})
        if(!user) return res.status(404).json({message: 'User not found'})
        const newPost = new Post({body, image: imageUrl, createdBy: {name: user.username, image: user?.image}})
        const post  = await newPost.save()
        if(!post) return res.status(400).json({message: 'Unable to add post'})
        return res.status(201).json({message: 'Post saved'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const remove = async(req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findOneAndDelete({ _id: id})
        if(!post) return res.status(404).json({message: 'Post not found'})
        res.status(200).json({message: 'Post deleted successfully'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const comment = async(req, res) => {
    const { by, postId, comment, commentId, action } = req.body
    try {
        const user = await User.findOne({_id: by})
        if(!user) return res.status(404).json({message: 'User not found'})
        const updates = {by: { name: user.username, image: user?.image}, comment}
        if(action === 'add-comment') {
            const updatedPost = await Post.findOneAndUpdate({_id: postId}, {$push: {comments: updates}}, {new: true})
            if(!updatedPost) return res.status(400).json({message: 'Unable to add comment'})
            return res.status(201).json({message: 'comment added'})
        } else {
            const updatedPost = await Post.findOneAndUpdate({_id: postId}, {$pull: {comments: {_id: commentId}}}, {new: true})
            if(!updatedPost) return res.status(400).json({message: 'Unable to remove comment'})
            return res.status(201).json({message: 'comment removed'})
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const like = async(req, res) => {
    const { postId, action } = req.body

    try {
        switch(action) {
            case 'like':
                await Post.findOneAndUpdate({_id: postId}, {$inc: {likes: 1}}, {new: true}, (err) => {
                    if(err) return res.status(400).json({message: `Could not like post`})
                    return res.status(200).json({message: 'Post liked'})
                })
                break;
            case 'unlike':
                await Post.findOneAndUpdate({_id: postId}, {$inc: {likes: -1}}, {new: true}, (err) => {
                    if(err) return res.status(400).json({message: `Could not unlike post`})
                    return res.status(200).json({message: 'Post unliked'})
                })
                break;
        }
    } catch (error) {
        
    }
}

module.exports = { create, comment, findOne, getAll, like, remove }