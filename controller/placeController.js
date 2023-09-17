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
    res.render('places/index', {places})
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
    res.render('places/show', {place, err:''})
}
const newPage = (req,res) => {
    res.render('places/new', {err:''})
}

const addNewPlace = wrapAsync(async (req,res,next)=> {
        const place = new Place({
            ...req.body,
            user : res.locals.id
        })
        await place.save()
        res.redirect(`/places/${place._id}`)
    
})

const editPage = wrapAsync(async (req,res,next) => { 
    const place = await Place.findById(req.params.id)
    res.render('places/edit', {place})
})

const updatePlace = async (req,res)=> {
    await Place.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/places/${req.params.id}`)
}

const deletePlace = async (req,res) => {
    await Place.findByIdAndDelete(req.params.id)
    res.redirect('/places')
}

module.exports = {getPlaces,showPage,newPage,addNewPlace,editPage,updatePlace,deletePlace}