const async = require('async');

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
                title: results.manufacturer.name + ' Cars',
                cars: results.manufacturer_cars,
            });
        }
    );
};
