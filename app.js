const express = require('express')
const route = require('./config/routes')
const app = express()
const ejsMate = require('ejs-mate')
require('./config/mongoose')

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.use(route)
app.listen(3000, ()=> {
    console.log('Running on port 3000');
})