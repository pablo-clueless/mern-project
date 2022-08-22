const express = require('express')
const { ensureLoggedIn } = require('connect-ensure-login')

const { getAllPosts, getPostById, getPostByUser, addPost, editPost, deletePost } = require('../controllers/post')
const { verifyToken } = require('../middlewares/authJwt')

const router = express.Router()

router.get('/get-all', getAllPosts)

router.get('/get-by-id/:id', [verifyToken, ensureLoggedIn()], getPostById)

router.get('/get-by-user/:userId', [verifyToken, ensureLoggedIn()], getPostByUser)

router.post('/add', [verifyToken, ensureLoggedIn()], addPost)

router.put('/edit/:id', [verifyToken, ensureLoggedIn()], editPost)

router.delete('/delete/:id', [verifyToken, ensureLoggedIn()], deletePost)

module.exports = router