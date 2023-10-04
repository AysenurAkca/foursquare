const express = require('express')
const route = require('./config/routes')
const app = express()
const cors = require('cors')
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

app.use(cors(
    {
        "origin": [3000,"http://localhost:3000"],
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
      }
))
app.use(route)
app.listen(4000, ()=> {
    console.log('Running on port 4000');
})