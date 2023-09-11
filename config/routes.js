const express = require('express');
const placeController = require('../controller/placeController')
const reviewController = require('../controller/reviewController')
const route = express.Router();
const userController = require('../controller/userController')
const auth = require('../middleware/auth')


route.get('/', placeController.mainPage)
route.get('/places', placeController.getPlaces)
route.get('/places/new', placeController.newPage)
route.get('/places/:id', placeController.showPage)
route.post('/places', placeController.addNewPlace)
route.get('/places/:id/edit', placeController.editPage)
route.post('/places/:id/edit', placeController.updatePlace)
route.post('/places/:id/delete', placeController.deletePlace)
route.post('/places/:id/reviews', reviewController.saveReview)
route.post('/places/:id/reviews/:reviewid', reviewController.deleteReview)

route.get('/', auth.userAuth, userController.mainPage)
route.get('/login', auth.loginAuth,userController.logIn)
route.post('/signup-user', userController.createUser)
route.post('/login-user', userController.logInUser)
route.get('/logout-user', userController.logOut)


 
module.exports = route;
