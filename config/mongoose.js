const mongoose = require('mongoose')
//Hello
mongoose.connect('mongodb+srv://aysnr0204:aysnrakca01@cluster0.1p0zvyl.mongodb.net/')
.then(()=> console.log('Connected DB'))
.catch((err)=> console.log('You have a problem about connecting DB', err))