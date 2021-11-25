const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
//const favicon = require('serve-favicon')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')

// Database connection
// const url = 'mongodb://localhost:27017/weverse-shop';
// mongoose.connect(url, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: true});
// const connection = mongoose;
// connection.on('connected', () => {
//     console.log('Database connected...');
// })
// .catch((err) => {
//     console.log('Connection failed...');
// });

const url = 'mongodb://localhost/weverse-shop';
mongoose.connect(url);

const connection = mongoose.connection;

connection
    .once('open', () => {
        console.log('Database connected...');
    })
    .on('error', () => {
        console.log('Conenction failed...');
})

// const connectDB = () => {
//     mongoose
//         .connection('mongodb://localhost:27017/weverse-shop', {
//             useCreateIndex: true,
//             useNewUrlParse: true,
//             useUnifiedTopology: true,
//             useFindAndModify: true
//         })
//         .then(() => console.log('Connected Successfully'))
//         .catch((err) => console.error('Not Connected'));
// }

// module.exports = connectDB;

// Assets
app.use(express.static('public'))
//app.use(favicon(__dirname, 'public/favicon.ico'))

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})