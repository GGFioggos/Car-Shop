var express = require('express');
var router = express.Router();

const carController = require('../controllers/carController');

// PATH: localhost:3000/car

router.get('/create/:id', carController.car_create_get);

router.get('/:id', carController.get_car);

module.exports = router;
