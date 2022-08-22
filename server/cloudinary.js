const cloudinary = require('cloudinary').v2

require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CL_USER,
    api_key: process.env.CL_KEY,
    api_secret: process.env.CL_SECRET,
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.url, id: result.public_id })
        }, { resource_type: 'auto', folder: folder })
    })
}