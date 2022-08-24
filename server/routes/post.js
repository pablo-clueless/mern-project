const express = require('express')

const { create, comment, findOne, getAll, like, remove } = require('../controllers/post')
const { verifyToken } =  require('../middlewares/authJwt')
const { upload } = require('../utils/uploader')

const router = express.Router()

router.get('/get', getAll)

router.get('/get/:id', findOne)

router.post('/create', [verifyToken, upload.single('image')], create)

router.delete('/delete/:id', verifyToken, remove)

router.post('/comment', verifyToken, comment)

router.post('/like', verifyToken, like)

module.exports = router