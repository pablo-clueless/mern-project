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
        const post = await Post.findOne({ _id: id })
        if(!post) return res.status(404).json({message: 'Post not found'})
        return res.status(200).json({message: 'Post found', post})
    } catch (error) {
        return res.status(500).json({message: 'internal server error', error})
    }
}

const create = async(req, res) => {
    const { body, createdBy } = req.body
    if(validator.isEmpty(body)) return res.status(400).json({message: 'Post body cannot be empty'})
    let image = req?.file?.path

    try {
        const result = await cloudinary.uploader.upload(image, { folder: 'post-images' })
        if(!result) return res.status(400).json({message: 'Unable to upload image'})
        const imageUrl = result ? result.url : null

        const user = await User.findOne({ _id: createdBy })
        if(!user) return res.status(404).json({message: 'User not found'})
        const post = new Post({ body, image: imageUrl, createdBy: user._id })
        post.save((err, post) => {
            if(err) return res.status(500).json({message: 'An error occurred while saving the post', err})
            const updateUser = user.update({ $push: { posts: post._id }}, { new: true })
            if(!updateUser) return res.status(500).json({message: 'An error occurred while saving the post', err})
            return res.status(201).json({message: 'Post added'})
        })
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const remove = async(req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findOneAndDelete({ _id: id })
        if(!post) return res.status(404).json({message: 'Post not found'})
        res.status(200).json({message: 'Post deleted successfully'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const comment = async(req, res) => {
    const { by, postId, comment, action } = req.body
    const updates = { comment, by }

    try {
        switch(action) {
            case 'add-comment': await Post.findOneAndUpdate({_id: postId}, {$push: {}})
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const like = async(req, res) => {
    const { by, postId, action } = req.body

    try {
        switch(action) {
            case 'like':
                await Post.findOneAndUpdate({_id: postId},{$push: {like: by}},{new: true})
                res.status(200).json({message: 'Post liked'})
                break;
            case 'unlike':
                await Post.findOneAndUpdate({_id: postId},{$pull: {like: by}},{new: true})
                res.status(200).json({message: 'Post unliked'})
                break;
        }
    } catch (error) {
        
    }
}

module.exports = { create, comment, findOne, getAll, like, remove }