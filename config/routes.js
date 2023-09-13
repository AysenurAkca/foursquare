const express = require('express');
const placeController = require('../controller/placeController')
const reviewController = require('../controller/reviewController')
const route = express.Router();
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

route.get('/', auth.userAuth, userController.mainPage)
route.get('/places',auth.userAuth, placeController.getPlaces)
route.get('/places/new',auth.userAuth, placeController.newPage)
route.get('/places/:id',auth.userAuth, placeController.showPage)
route.post('/places',auth.userAuth, placeController.addNewPlace)
route.get('/places/:id/edit',auth.checkUser, placeController.editPage)
route.post('/places/:id/edit', placeController.updatePlace)
route.post('/places/:id/delete', placeController.deletePlace)
route.post('/places/:id/reviews',auth.userAuth, reviewController.saveReview)
route.post('/places/:id/reviews/:reviewid',auth.checkUserforReview, reviewController.deleteReview)


route.get('/login', auth.loginAuth,userController.logIn)
route.post('/signup-user', userController.createUser)
route.post('/login-user', userController.logInUser)
route.get('/logout-user', userController.logOut)
route.get('/signup',auth.loginAuth, userController.signUpPage)

 
module.exports = route;
