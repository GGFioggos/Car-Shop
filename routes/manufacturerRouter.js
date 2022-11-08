var express = require('express');
var router = express.Router();

const manufacturerController = require('../controllers/manufacturerController');

// PATH: localhost:3000/manufacturer

router.get('/create', manufacturerController.manufacturer_create_get);

router.post('/create', manufacturerController.manufacturer_create_post);

router.get('/:id', manufacturerController.get_manufacturer);

module.exports = router;
