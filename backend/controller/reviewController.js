const Review = require('../models/reviewModel')
const Place = require('../models/placeModel')

const saveReview = async (req,res) => {
    const {id} = req.params;
    const review = new Review(req.body)
    const savedReview = (await review.save()).populate('user')
    const place = await Place.findById(id)
    place.reviews.push(review)
    await place.save()
    res.status(200).send('Review saved')
}

const getReviews = async (req,res) => {
    const reviews = await Review.find()
    .populate('user')
    .sort({created_at : "-1"})
    res.status(200).send(reviews)
}


const deleteReview = async (req,res) => {
    const {id, reviewid} = req.params

    try{
        await Review.findByIdAndDelete(reviewid);
        return res.status(200).json({ success: true, msg: 'Product Deleted' });
    }
    catch(err){
        console.error(err);
    }
}
module.exports = {saveReview,deleteReview,getReviews}