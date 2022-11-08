var express = require('express');
var router = express.Router();

const homepageController = require('../controllers/homepageController');

// PATH: localhost:3000/home

router.get('/', homepageController.index);

module.exports = router;
