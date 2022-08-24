const express = require('express')

const { addComment, addProfilePicture, deleteComment, deleteOne, findOne, like, search, updateOne } = require('../controllers/user')
const { verifyToken } = require('../middlewares/authJwt')
const { upload } = require('../utils/uploader')

const router = express.Router()

router.get('/:id', findOne)

router.get('/get/:query', search)

router.put('/edit/:id', verifyToken, updateOne)

router.put('/edit/avatar/:id', [verifyToken, upload.single('image')], addProfilePicture)

router.delete('/delete', deleteOne)

router.post('/comment', verifyToken, addComment)

router.delete('/comment', verifyToken, deleteComment)

router.post('/like', verifyToken, like)

module.exports = router