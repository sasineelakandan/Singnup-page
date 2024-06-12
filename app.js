const express = require('express')
const app = express()
let session = require('express-session')
require('dotenv').config()
require('./config/dbconnect.js')
app.set('view engine', 'ejs')
const userrouter = require('./routes/userroute.js')
const adminrouter = require('./routes/adminroute.js')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});


app.use(userrouter)
app.use(adminrouter)

app.listen(8000, (req, res) => {
    console.log('portstarted')
})