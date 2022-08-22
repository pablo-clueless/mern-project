const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads')
    },
    filename: (req, file, cb) => {
        cd(null, `${new Date().toISOString()}-${file.originalname}`)
    }
})

const filter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb({message: 'Unsupported file format'}, false)
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: filter,
})

module.exports = upload