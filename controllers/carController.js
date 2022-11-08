const async = require('async');

const Car = require('../models/Car');
const Category = require('../models/Category');
const Manufacturer = require('../models/Manufacturer');

exports.get_car = (req, res, next) => {
    Car.findById(req.params.id)
        .populate('brand category')
        .exec(function (err, car) {
            if (err) {
                return next(err);
            }

            if (car == null) {
                const err = new Error('category not found');
                err.status = 404;
                return next(err);
            }

            res.render('car', {
                title: car.name,
                car: car,
            });
        });
};

exports.car_create_get = (req, res, next) => {
    async.parallel(
        {
            category(callback) {
                Category.findById(req.params.id).exec(callback);
            },
            categories(callback) {
                Category.find(callback);
            },
            brand(callback) {
                Manufacturer.findById(req.params.id).exec(callback);
            },
            brands(callback) {
                Manufacturer.find(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }

            res.render('create_car_form', {
                title: 'Create new car',
                selected_category: results.category,
                categories: results.categories,
                selected_brand: results.brand,
                brands: results.brands,
            });
        }
    );
};
