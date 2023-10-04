const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review:String,
    rating:Number,
    user : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    created_at:{
        type: Date,
        default : Date.now,
        get: function (createAt) {
            return moment(createAt).format('MMMM Do YYYY')
        }
    },
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;
