const express = require('express')
const route = require('./config/routes')
const app = express();
require('./config/mongoose')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.use(route)
app.listen(3000, ()=> {
    console.log('Running on port 3000');
})