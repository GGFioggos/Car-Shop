const Car = require('../models/Car');

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
