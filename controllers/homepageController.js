const async = require('async');
const Category = require('../models/Category');
const Car = require('../models/Car');
const Manufacturer = require('../models/Manufacturer');

exports.index = function (req, res, next) {
    res.render(index, {
        title: 'Homepage',
    });
};
