var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');

// PATH: localhost:3000/category

router.get('/', categoryController.all_categories);

router.get('/create', categoryController.category_create_get);

router.post('/create', categoryController.category_create_post);

// Renders all cars corresponding to the given category
router.get('/:id', categoryController.get_category);

module.exports = router;
