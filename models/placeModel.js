const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Review = require('./reviewModel')


const placeSchema = new Schema({
    title:String,
    kind:{
        type : String,
        enum : ['cafe', 'restaurant', 'playground' ]
    },
    user:{
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    image: String,
    created_at:{
        type: Date,
        default : Date.now,
        get: function (createAt) {
            return moment(createAt).format('MMMM Do YYYY')
        }
    },
    description : String,
    location : String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref : 'Review'
    }]
})
placeSchema.post('findOneAndDelete', async (doc)=> {
    if(doc){
        await Review.deleteMany({
            _id:{
                $in : doc.reviews
            }
        })
    }
})
const Place = mongoose.model('Place', placeSchema);
module.exports = Place;