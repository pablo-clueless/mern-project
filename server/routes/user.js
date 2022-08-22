const express = require('express')

const { editUser } = require('../controllers/user')

const router = express.Router()

router.put('/edit', editUser)

module.exports = router