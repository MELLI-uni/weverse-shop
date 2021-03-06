require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')

//const favicon = require('serve-favicon')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Emitter = require('events')

// Database connection
const url = 'mongodb://localhost/weverse-shop';
mongoose.connect(url);
const connection = mongoose.connection;
connection
    .once('open', () => {
        console.log('Database connected...');
    })
    .on('error', () => {
        console.log('Connection failed...');
})

// Session store
let mongoStore = new MongoDbStore({
                mongooseConnection: connection,
                collection: 'sessions'
            })

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 *24 } // 24 hours
}))

// Passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

// Assets
app.use(express.static('public'))
//app.use(favicon(__dirname, 'public/favicon.ico'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

const server = app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })

const io = require('socket.io')(server)
io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('join', (orderId) => {
        console.log(orderId)
        socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})