const express = require('express')
const route = require('./config/routes')
const app = express()
const ejsMate = require('ejs-mate')
require('./config/mongoose')
require('dotenv').config()
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
var cookieParser = require("cookie-parser");
app.use(cookieParser())
app.use(express.json())

app.use(route)
app.listen(3000, ()=> {
    console.log('Running on port 3000');
})