const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const { User } = require('./schemas')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')

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
    expires: 86400,
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

app.get('/', (req,res) => res.status(200).json({message: 'Hello world'}))

app.use('/auth', authRoutes)

app.use('/user', userRoutes)

app.use('/post', postRoutes)

app.use('/comment', commentRoutes)

app.listen(process.env.PORT, () => console.log(`Server runing on port ${process.env.PORT}`))