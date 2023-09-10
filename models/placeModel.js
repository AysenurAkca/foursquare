const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title:String,
    kind:{
        type : String,
        enum : ['cafe', 'restaurant', 'playground' ]
    }, 
    description : String,
    location : String
})

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;