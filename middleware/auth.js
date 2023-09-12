const jwt = require('jsonwebtoken')
const Place = require('../models/placeModel')
const userAuth = (req,res,next) => {
    if(req.cookies.jwt){
        jwt.verify(req.cookies.jwt,"this is secret baby", function(err,decodedUser){
            if(err){
                console.log('There is an issue with jwt');
            } else {
                res.locals.firstname = decodedUser.user.firstname;
                res.locals.id = decodedUser.user._id;
                res.locals.user = decodedUser.user
            }
        } )
        next()
    }
    else{
        res.redirect('/login')
    }
}

const checkUser = (req,res,next)=> {
    if(req.cookies.jwt){
        jwt.verify(req.cookies.jwt,"this is secret baby", function(err,decodedUser){
            if(err){
                console.log('There is an issue with jwt');
            } else {
                Place.findById(req.params.id).populate('user') 
                .then((place)=> {
                    
                    console.log(place.user.id);
                    console.log(decodedUser.user._id);
                    if(place.user.id == decodedUser.user._id){
                        console.log('yes');
                        next()
                    }else{
                        console.log('no');
                        res.redirect(`/places/${req.params.id}`)
                    }
                })
                
                
            }
        } )
    }
    else{
        res.redirect('/login')
    }
}

const loginAuth = (req,res,next) => {
    if(req.cookies.jwt){
        res.redirect('/')
    }else{
        next()
    }
}

module.exports = {userAuth,loginAuth,checkUser}