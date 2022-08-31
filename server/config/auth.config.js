require('dotenv').config()

module.exports = {
    secret: process.env.JWT_ACCESS_SERET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
}
