// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

const express = require('express')
const app = express();
const port = 3000; 
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

const dbURI = 'mongodb://0.0.0.0:27017/test';

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(dbURI)
.then(() => {
    console.log("Connected to mongodb")
    app.listen(port ,()=> {
        console.log("Server is runningn")
    });
})
.catch((err) => {
    console.log("Error connecting to Mongodb ", err)
});

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open',() => console.log('Connected to mongoose'))



app.use('/', indexRouter)
app.listen(process.env.PORT || port, () => {
    console.log("server is running")
})

