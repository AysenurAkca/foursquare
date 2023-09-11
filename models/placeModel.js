const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title:String,
    kind:{
        type : String,
        enum : ['cafe', 'restaurant', 'playground' ]
    }, 
    image: String,
    description : String,
    location : String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref : 'Review'
    }]
})

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;