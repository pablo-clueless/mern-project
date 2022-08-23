const express = require('express')

const { getUserById, followUser, unfollowUser, editUser, deleteUser } = require('../controllers/user')

const router = express.Router()

router.get('/get/:id', getUserById)

router.get('/follow', followUser)

// router.post('/unfollow', unfollowUser)

router.put('/edit', editUser)

router.delete('/delete', deleteUser)

module.exports = router