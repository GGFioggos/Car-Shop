const async = require('async');

const Category = require('../models/Category');
const Manufacturer = require('../models/Manufacturer');

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
