const async = require('async');

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
