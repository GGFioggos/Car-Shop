var express = require('express');
var router = express.Router();

const carController = require('../controllers/carController');

// PATH: localhost:3000/car

router.get('/create/:id', carController.car_create_get);

router.post('/create/:id', carController.car_create_post);

router.get('/delete/:id', carController.car_delete_get);

router.post('/delete/:id', carController.car_delete_post);

router.get('/:id', carController.get_car);

module.exports = router;
