var express = require('express');
var router = express.Router();

const manufacturerController = require('../controllers/manufacturerController');

// PATH: localhost:3000/manufacturer

router.get('/:id', manufacturerController.get_manufacturer);

module.exports = router;
