const nodemailer = require('nodemailer')

require('dotenv').config()

let transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_SERVER,
    // port: 587,
    service: 'Gmail',
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

module.exports = transporter