const express = require('express')

const { addProfilePicture, deleteOne, findOne, follow, search, updateOne } = require('../controllers/user')
const { verifyToken } = require('../middlewares/authJwt')
const { upload } = require('../utils/uploader')

const router = express.Router()

router.get('/:id', findOne)

router.get('/get/:query', search)

router.put('/edit/:id', verifyToken, updateOne)

router.put('/edit/avatar/:id', [verifyToken, upload.single('image')], addProfilePicture)

router.delete('/delete', deleteOne)

router.post('/follow', verifyToken, follow)

module.exports = router