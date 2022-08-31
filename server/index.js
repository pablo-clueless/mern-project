const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')

const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:5173','http://localhost:5173'],
        // TODO: Add 'x-access-token' for logged in user
        // allowedHeaders: ['x-access-token']
    }
})

const resetEmailTemp = fs.readFileSync(path.join('templates', '/forgot-password.hbs'), 'utf-8')

const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const morgan =  require('morgan')

const { User } = require('./schemas')
const authRoutes = require('./routes/auth')
// const googleAuthRoutes = require('./utils/google-auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const { sessionMiddleWare } = require('./middlewares/session')
const transporter = require('./utils/email-service')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(sessionMiddleWare)
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('tiny'))
app.set('view engine', 'handlebars')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('open', () => console.log('Successfully connected to MongoDB'))
db.on('error', console.error.bind(console, 'Connection error: '))

app.get('/', (req,res) => res.status(200).json({message: `Welcome to Developer's Hub`}))

app.post('/mail-test', (req, res) => {
    const { email } = req.body
    let mailOptions = {
        from: 'DevHub Team',
        to: email,
        subject: 'Password Reset',
        text: `Hey there, let's process your password reset`,
        html: resetEmailTemp,
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) return res.send(err)
        if(info) return res.send(info)
    })
})

const wrap = middleWare => (socket, next) => middleWare(socket.request, {}, next)
io.use(wrap(sessionMiddleWare))

io.on('connection', (socket) => {
    console.log(`socket.io is running on ${socket.handshake.url} at ${new Date().toLocaleString()}`)
})

transporter.verify((err, success) => {
    if(err) return console.log(err)
    if(success) return console.log('Email service online!')
    return null
})

app.use('/auth', authRoutes)
// app.use('/auth', googleAuthRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))