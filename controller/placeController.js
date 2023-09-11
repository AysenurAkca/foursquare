const Place = require('../models/placeModel')


const mainPage = async (req,res)=> {
    res.render('main')
}
const getPlaces = async (req,res) => {
    const places = await Place.find()
    res.render('places/index', {places})
}

const showPage = async (req,res) => {
    const place = await Place.findById(req.params.id)
    .populate('reviews')
    res.render('places/show', {place})
}
const newPage = (req,res) => {
    res.render('places/new')
}

const addNewPlace = async (req,res)=> {
    const place = new Place(req.body)
    await place.save()
    res.redirect(`/places/${place._id}`)
}

const editPage = async (req,res) => {
    const place = await Place.findById(req.params.id)
    res.render('places/edit', {place})
}
const updatePlace = async (req,res)=> {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/places/${req.params.id}`)
}

const deletePlace = async (req,res) => {
    await Place.findByIdAndDelete(req.params.id)
    res.redirect('/places')
}

module.exports = {mainPage,getPlaces,showPage,newPage,addNewPlace,editPage,updatePlace,deletePlace}