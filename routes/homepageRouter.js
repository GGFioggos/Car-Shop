var express = require('express');
var router = express.Router();

const homepageController = require('../controllers/homepageController');

router.get('/', homepageController.index);

module.exports = router;
