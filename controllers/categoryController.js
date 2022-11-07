const async = require('async');

exports.all_categories = (req, res, next) => {
    res.render('showcase', {
        title: 'All Categories',
    });
};
