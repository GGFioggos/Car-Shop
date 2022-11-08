const async = require('async');
const { body, validationResult } = require('express-validator');

const Category = require('../models/Category');
const Manufacturer = require('../models/Manufacturer');
const Car = require('../models/Car');

exports.all_manufacturers = (req, res, next) => {
    Manufacturer.find()
        .sort([['name', 'ascending']])
        .exec(function (err, list_manufacturers) {
            if (err) {
                return next(err);
            }

            res.render('showcase', {
                title: 'All manufacturers',
                list_manufacturers,
            });
        });
};

exports.get_manufacturer = (req, res, next) => {
    async.parallel(
        {
            manufacturer(callback) {
                Manufacturer.findById(req.params.id).exec(callback);
            },
            manufacturer_cars(callback) {
                Car.find({ brand: req.params.id })
                    .populate('brand category')
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }

            if (results.manufacturer == null) {
                const err = new Error('category not found');
                err.status = 404;
                return next(err);
            }

            res.render('catalog', {
                manufacturer: results.manufacturer,
                title: results.manufacturer.name + ' Cars',
                cars: results.manufacturer_cars,
            });
        }
    );
};

exports.manufacturer_create_get = (req, res, next) => {
    res.render('create_manufacturer_form', {
        title: 'Create new manufacturer',
    });
};

exports.manufacturer_create_post = [
    body('manufacturerName', 'Manufacturer name must be specified.')
        .trim()
        .escape()
        .isLength({ min: 3 }),
    body('manufacturerLogo', 'Manufacturer logo must be specified.')
        .trim()
        .isURL()
        .withMessage('Manufacturer logo is not a valid URL.'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('create_manufacturer_form', {
                title: 'Create new manufacturer',
                manufacturer: req.body,
                errors: errors.array(),
            });
            return;
        }

        const newManufacturer = new Manufacturer({
            name: req.body.manufacturerName,
            logo: req.body.manufacturerLogo,
        });

        newManufacturer.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/manufacturers');
        });
    },
];
