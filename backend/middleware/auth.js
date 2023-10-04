const jwt = require('jsonwebtoken')
const Place = require('../models/placeModel')
const Review = require('../models/reviewModel')
const Joi = require('joi');
const AppError = require('../AppError');
const userAuth = (req,res,next) => {
    
    if(req.headers.token){
        next();
    } else {
        res.status(400).send('Auth is required')
    }
    // if(req.cookies.jwt){
    //     jwt.verify(req.cookies.jwt,"this is secret baby", function(err,decodedUser){
    //         if(err){
    //             console.log('There is an issue with jwt');
    //         } else {
    //             res.locals.firstname = decodedUser.user.firstname;
    //             res.locals.id = decodedUser.user._id;
    //             res.locals.user = decodedUser.user
    //         }
    //     } )
    //     next()
    // }
    // else{
    //     res.redirect('/login')
    // }
}

const checkUser = (req,res,next)=> {
    if(req.cookies.jwt){
        jwt.verify(req.cookies.jwt,"this is secret baby", function(err,decodedUser){
            if(err){
                console.log('There is an issue with jwt');
            } else {
                Place.findById(req.params.id).populate('user') 
                .then((place)=> {
                    
                    if(place.user.id == decodedUser.user._id){
                        next()
                    }else{
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

const checkUserforReview = (req,res,next)=> {
    if(req.cookies.jwt){
        jwt.verify(req.cookies.jwt,"this is secret baby", function(err,decodedUser){
            if(err){
                console.log('There is an issue with jwt');
            } else {
                Review.findById(req.params.reviewid).populate('user') 
                .then((review)=> {
                    
                    if(review.user.id == decodedUser.user._id){
                        next()
                    }else{
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

const validatePlace = (req,res,next)=> {
    const placeJoiSchema = Joi.object({
        title: Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .required(),
        kind: Joi.string().required(),
        user: Joi.string(),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().min(2).max(500).required(),
    })
    const result = placeJoiSchema.validate(req.body);
    if(result.error){
        res.render('places/new', {err: `${result.error.details[0].message}`})
    }else {
        next()
    }
    
}

// const validateReview = async (req,res,next)=> {
//     const reviewJoiSchema = Joi.object({
//         review: Joi.string()
//             .max(5)
//             .required(),
//         rating : Joi.number().required(),
//         user : Joi.string()
//     })
//     const result = reviewJoiSchema.validate(req.body);
//     if(result.error){
//         const {id} = req.params;
//         console.log(id);
//         const place = await Place.findById(req.params.id)
//         res.render('places/show', {place, err: `${result.error.details[0].message}`})
//     }else {
//         next()
//     }
    
// }


module.exports = {userAuth,loginAuth,checkUser,checkUserforReview, validatePlace}