
const { User } = require('../schemas')

const getUserById = async(req, res, next) => {
    const { id } = req.params

    try {
        const user = await User.findOne({_id: id}).select({password: 0})
        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json({message: 'User found', data: user})
    } catch (error) {
        res.status(500).json({message: 'Internal server error, unable to get user'})
    }
}

const followUser = async(req, res, next) => {
    const { id } = req.params
    const { username } = req.body
    
    try {
        const followedUser = User.findOne({ username })
        if(!followedUser) {
            return res.status(404).json({message: 'This user does not exist.'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error, unable to follow user'})
    }
}

const unfollowUser = async(req, res, next) => {
    
}

const editUser = async(req, res, next) => {
    const { id } = req.params
    const { fullName, image, bio, role, company, location, url, github, linkedin, twitter } = req.body
    const updates = { fullName, image, bio, role, company, location, url, github, linkedin, twitter }

    try {
        let user = await User.findOne({_id: id}).select({ password: 0, __v: 0 })
        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }
        await User.findOneAndUpdate({_id: id}, updates, { new: true }, (err) => {
            if(!err) {
                return res.status(201).json({message: 'User updated succesfully.'})
            } else {
                return res.status(400).json({message: 'An error occurred, unable to update user.'})
            }
        })
    } catch (error) {
        res.status(500).json({message: `Internal server error, unable to edit user's details`})
    }
}

const deleteUser = async(req, res, next) => {
    const { id } = req.params
    try {
        let user = await User.findOneAndDelete({_id: id})
        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json({message: 'user delete successfully.'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error, unable to remove user'})
    }
}

module.exports = { getUserById, followUser, unfollowUser, editUser, deleteUser }