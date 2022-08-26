const express = require('express')
const http = require('http')

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

const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const morgan =  require('morgan')

const { User } = require('./schemas')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const { sessionMiddleWare } = require('./middlewares/session')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(sessionMiddleWare)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
morgan('tiny')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('open', () => console.log('Successfully connected to MongoDB'))
db.on('error', console.error.bind(console, 'Connection error: '))

app.get('/', (req,res) => res.status(200).json({message: `Welcome to Developer's Hub`}))

const wrap = middleWare => (socket, next) => middleWare(socket.request, {}, next)
io.use(wrap(sessionMiddleWare))

// io.use((socket, next) => {
//     const session = socket.request.session
//     if(session && session.authenticated) {
//         next()
//     } else {
//         next(new Error('Not authorized'))
//     }
// })

io.on('connection', (socket) => {
    console.log(`url: ${socket.handshake.url} ${new Date().toLocaleString()}`)
})

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))