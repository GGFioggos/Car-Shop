var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');
const manufacturerController = require('../controllers/manufacturerController');

router.get('/categories', categoryController.all_categories);

router.get('/manufacturers', manufacturerController.all_manufacturers);

// GET home page.
router.get('/', (req, res, next) => {
    res.redirect('/home');
});

module.exports = router;
