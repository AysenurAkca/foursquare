const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review:String,
    rating:Number
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;
