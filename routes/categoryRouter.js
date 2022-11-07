var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.all_categories);

module.exports = router;
