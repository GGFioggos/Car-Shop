const async = require('async');
const { body, validationResult } = require('express-validator');

const Category = require('../models/Category');
const Car = require('../models/Car');

exports.all_categories = (req, res, next) => {
    Category.find()
        .sort([['name', 'ascending']])
        .exec(function (err, list_categories) {
            if (err) {
                return next(err);
            }

            res.render('showcase', {
                title: 'All categories',
                list_categories,
            });
        });
};

exports.get_category = (req, res, next) => {
    async.parallel(
        {
            category(callback) {
                Category.findById(req.params.id).exec(callback);
            },
            category_cars(callback) {
                Car.find({ category: req.params.id })
                    .populate('brand category')
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.category == null) {
                // No results.
                const err = new Error('category not found');
                err.status = 404;
                return next(err);
            }

            res.render('catalog', {
                title: results.category.name,
                cars: results.category_cars,
            });
        }
    );
};

exports.category_create_get = (req, res, next) => {
    res.render('create_category_form', {
        title: 'Create new category',
    });
};

exports.category_create_post = [
    body('categoryName', 'Category name must be specified.')
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body('categoryDescription').trim().isLength({ max: 50 }).escape(),
    body('categoryImage')
        .trim()
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage('Image must be a valid URL.'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('create_category_form', {
                title: 'Create new category',
                category: req.body,
                errors: errors.array(),
            });
            return;
        }

        // Data is valid

        const newCategory = new Category({
            name: req.body.categoryName,
            description: req.body.categoryDescription,
            image: req.body.categoryImage,
        });
        newCategory.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/categories');
        });
    },
];
