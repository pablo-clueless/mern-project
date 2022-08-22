const express = require('express')

const { getComment, addComment, editComment, deleteComment } = require('../controllers/comment')
const { verifyToken } = require('../middlewares/authJwt')

const router = express.Router()

router.get('/get', getComment)

router.post('/add', addComment)

router.put('/edit', editComment)

router.delete('/delete', deleteComment)

module.exports = router