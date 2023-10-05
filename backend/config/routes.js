const express = require('express');
const placeController = require('../controller/placeController')
const reviewController = require('../controller/reviewController')
const route = express.Router();
const userController = require('../controller/userController')
const auth = require('../middleware/auth');
const AppError = require('../AppError');

route.get('/', auth.userAuth, userController.mainPage)
route.get('/get-places',auth.userAuth, placeController.getPlaces)
route.get('/places/new', auth.userAuth,placeController.newPage)
route.get('/places/:id',auth.userAuth, placeController.showPage)
route.post('/places', placeController.addNewPlace)
route.get('/places/:id/edit', placeController.editPage)
route.put('/places/:id/edit', placeController.updatePlace)
route.delete('/places/:id/delete', placeController.deletePlace)
route.post('/places/:id/reviews', reviewController.saveReview)
route.get('/places/:id/reviews',reviewController.getReviews)
route.delete('/places/:id/reviews/:reviewid',reviewController.deleteReview)

route.get('/login', auth.loginAuth,userController.logIn)
route.post('/signup-user', userController.createUser)
route.post('/login-user', userController.logInUser)
route.get('/logout-user', userController.logOut)
route.get('/signup',auth.loginAuth, userController.signUpPage)

route.all('*', (req,res,next)=>{
    res.render('404')
})

route.use((err,req,res,next) => {
    const {status = 400} = err;
    if(!err.message) err.message ='Something went wrong!'
    res.status(status).send(err)
})
 
module.exports = route;
