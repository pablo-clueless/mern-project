const express = require('express')

const { create, findOne, getAll, remove} = require('../controllers/post')
const { verifyToken } =  require('../middlewares/authJwt')
const { upload } = require('../utils/uploader')

const router = express.Router()

// router.get('/get', getAll)

// router.get('/get/:id', findOne)

router.post('/create', [verifyToken, upload.array('images')], create)

// router.delete('/delete/:id', verifyToken, remove)

module.exports = router