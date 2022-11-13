const async = require('async');
const { body, validationResult } = require('express-validator');

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

exports.car_create_post = [
    body('carName', 'Car name must be specified.').trim().escape().notEmpty(),
    body('carDescription', 'Description must be specified.')
        .trim()
        .escape()
        .notEmpty(),
    body('carRelease', 'Release year must be specified.')
        .trim()
        .escape()
        .notEmpty(),
    body('carPrice', 'Price must be specified.').trim().escape().notEmpty(),
    body('carImage', 'Image must be specified.').trim().isURL(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
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
                        car: req.body,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        const newCar = new Car({
            name: req.body.carName,
            description: req.body.carDescription,
            releaseYear: req.body.carRelease,
            price: req.body.carPrice,
            brand: req.body.carBrand,
            category: req.body.carCategory,
            image: req.body.carImage,
            inStock: req.body.carStock,
        });

        newCar.save((error) => {
            if (error) {
                return next(error);
            }

            res.redirect(`/car/${newCar._id}`);
        });
    },
];

exports.car_delete_get = (req, res, next) => {
    Car.findById(req.params.id).exec(function (err, results) {
        if (err) {
            return next(err);
        }

        if (results == null) {
            const err = new Error('category not found');
            err.status = 404;
            return next(err);
        }

        res.render('delete_car', {
            title: 'Delete car',
            car: results,
        });
    });
};

exports.car_delete_post = (req, res, next) => {
    Car.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return next(err);
        }

        res.redirect('/home');
    });
};

exports.car_update_get = (req, res, next) => {};

exports.car_update_post = (req, res, next) => {};
