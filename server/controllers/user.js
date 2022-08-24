const cloudinary = require('cloudinary').v2

const { User } = require('../schemas')

const search = async(req, res) => {
    const { query } = req.params

    try {
        await User.find({ username: query }).exec((err, results) => {
            if(err) return res.status(404).json({message: 'User not found'})
            if(results) return res.status(200).json({message: 'Search successful', data: results})
        })
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const findOne = async(req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOne({_id: id})
        if(!user) return res.status(404).json({message: 'User not found'})
        res.status(200).json({message: 'User found', data: user })
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const updateOne = async(req, res) => {
    const { id } = req.params
    const { fullName, bio, role, company, location, url, github, linkedin, twitter } = req.body
    const updates = { fullName, bio, role, company, location, url, github, linkedin, twitter }
    
    try {
        const user = await User.findOne({ _id: id })
        if(!user) return res.status(404).json({message: 'User not found'})

        const updatedUser = await User.findOneAndUpdate({ _id: id}, updates , { new: true })
        if(!updatedUser) return res.status(500).json({message: 'An error occurred'})
        res.status(201).json({message: 'User updated'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const addProfilePicture = async(req, res) => {
    const { id } = req.params
    const image = req.file.path

    try {
        const result = await cloudinary.uploader.upload(image, { folder: 'user-images' })
        if(!result) return res.status(400).json({message: 'Unable to upload image'})

        const user = await User.findOne({ _id: id })
        if(!user) return res.status(404).json({message: 'User not found'})

        const updatedUser = await User.findOneAndUpdate({ _id: id}, { image: result.url }, { new: true })
        if(!updatedUser) return res.status(500).json({message: 'An error occurred'})
        res.status(201).json({message: 'Profile picture added'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const deleteOne = async(req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOneAndDelete({ _id: id })
        if(!user) return res.status(404).json({message: 'User not found'})
        res.status(200).json({message: 'Account deleted successfully'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const addComment = async(req, res) => {
    const { userId, postId, comment } = req.body

    try {
        const user = await User.findOne({ _id: userId })
        if(!user) return res.status(404).json({message: 'User not found'})
        user.posts.forEach((post) => {
            if(post._id === postId) {
                post.comments.push(comment.body)
                user.notifications.push({
                    message: `@${comment.by} commented on your post`,
                    by: comment.by,
                    time: new Date()
                })
                user.save((err) => {
                    if(err) return res.status(500).json({message: 'Internal server error', err})
                    return res.status(201).json({message: 'Comment added'})
                })
            }
        })
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const deleteComment = async(req, res) => {
    const { userId, postId, commentId } = req.body

    try {
        const user = await User.findOne({_id: userId })
        if(!user) return res.status(404).json({message: 'User not found'})
        user.posts.forEach((post) => {
            if(post._id === postId) {
                post.comments.filter((comment) => comment._id === commentId)
            }
        })
        await user.save((err => {
            if(err) return res.status(500).json({message: 'Internal server error', err})
            return res.status(200).json({message: 'Comment deleted'})
        }))
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const like = async(req, res) => {
    const { userId, postId, like } = req.body

    try {
        const user = await User.findOne({ _id: userId })
        if(!user) return res.status(404).json({message: 'User not found'})
        user.posts.forEach((post) => {
            if(post._id === postId) {
                post.likes.push(like.by)
                user.notifications.push({
                    message: `@${like.by} liked your post`,
                    by: like.by,
                    time: new Date()
                })
                user.save((err) => {
                    if(err) return res.status(500).json({message: 'Internal server error', err})
                    return res.status(201).json({message: 'Post liked'})
                })
            }
        })
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

module.exports = { addComment, addProfilePicture, deleteComment, deleteOne, findOne, like, search, updateOne }