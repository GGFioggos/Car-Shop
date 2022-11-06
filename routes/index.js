var express = require('express');
var router = express.Router();

const homepageController = require('../controllers/homepageController');

/* GET home page. */
router.get('/', homepageController.index);

module.exports = router;
