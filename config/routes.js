const express = require('express');
const placeController = require('../controller/placeController')
const route = express.Router();

route.get('/', placeController.mainPage)
route.get('/places', placeController.getPlaces)
route.get('/places/new', placeController.newPage)
route.get('/places/:id', placeController.showPage)
route.post('/places', placeController.addNewPlace)
route.get('/places/:id/edit', placeController.editPage)
route.post('/places/:id/edit', placeController.updatePlace)
route.post('/places/:id/delete', placeController.deletePlace)

 
module.exports = route;
