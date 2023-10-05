const Place = require('../models/placeModel')
const Review = require('../models/reviewModel')
const AppError = require('../AppError')


function wrapAsync (fn){
    return function(req,res,next){
        fn(req,res,next).catch(e=> next(e))
    }
}

const getPlaces = async (req,res) => {
    const places = await Place.find()
    .populate('reviews')
    .populate('user')
    .sort({created_at : "-1"})
    res.send(places)
    
}

const showPage = async (req,res) => {
    const place = await Place.findById(req.params.id)
    .populate('reviews')
    .populate('user')
    .populate({
        path: 'reviews',
        model: 'Review',
        populate: {
            path: 'user',
            model: 'User'
        }
        })
    res.send(place)
   
}
const newPage = (req,res) => {
    res.render('places/new', {err:''})
}
const addNewPlace = wrapAsync(async (req,res,next)=> {
        const place = new Place(req.body)
        await place.save()
        res.send(place)
})

const editPage = wrapAsync(async (req,res,next) => { 
    const place = await Place.findById(req.params.id)
    res.status(200).send(place)
})

const updatePlace = async (req,res)=> {
    const place =await Place.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send(place)
}

const deletePlace =async (req,res) => {
    const {id} = req.params

    try{
        await Place.findByIdAndDelete(id);
        return res.status(200).json({ success: true, msg: 'Product Deleted' });
    }
    catch(err){
        console.error(err);
    }
}

module.exports = {getPlaces,showPage,newPage,addNewPlace,editPage,updatePlace,deletePlace}