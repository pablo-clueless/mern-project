const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const cloudinary = require('cloudinary').v2

const { User } = require('./schemas')
const { upload } = require('./utils/uploader')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require('cookie-session')({
    name: 'auth-token',
    secret: process.env.SECRET,
    httpOnly: true,
    secure: true,
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('open', () => console.log('DB connection successful'))
db.on('error', console.error.bind(console, 'Connection error: '))

app.get('/', (req,res) => res.status(200).json({message: `Welcome to Developer's Hub`}))

app.post('/', upload.single('image'), async(req, res) => {
    const image = req.file.path
    try {
        const result = await cloudinary.uploader.upload(image, { folder: 'test-images' })
        if(!result) return res.status(400).json({message: 'Unable to upload image'})
        return res.status(202).json({message: 'Image uploaded', data: result})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
})

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))