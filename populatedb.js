#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Car = require('./models/Car');
var Category = require('./models/Category');
var Manufacturer = require('./models/Manufacturer');
require('dotenv').config();

var mongoose = require('mongoose');
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cars = [];
var categories = [];
var manufacturers = [];

function carCreate(
    name,
    description,
    releaseYear,
    price,
    brand,
    category,
    image,
    inStock,
    cb
) {
    cardetail = {
        name,
        description,
        releaseYear,
        price,
        brand,
        category,
        image,
        inStock,
    };

    var car = new Car(cardetail);

    car.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New car: ' + car);
        cars.push(car);
        cb(null, car);
    });
}

function categoryCreate(name, description, cb) {
    var category = new Category({ name: name, description: description });

    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

function manufacturerCreate(name, logo, cb) {
    let manufacturerdetail = {
        name: name,
        logo: logo,
    };
    var manufacturer = new Manufacturer(manufacturerdetail);
    manufacturer.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New manufacturer: ' + manufacturer);
        manufacturers.push(manufacturer);
        cb(null, manufacturer);
    });
}
function createManufacturers(cb) {
    async.series(
        [
            function (callback) {
                manufacturerCreate(
                    'Audi',
                    'https://www.freepnglogos.com/uploads/audi-logo-2.png',
                    callback
                );
            },
            function (callback) {
                manufacturerCreate(
                    'BMW',
                    'https://image.similarpng.com/very-thumbnail/2020/06/Logo-bmw-vector-transparent-PNG.png',
                    callback
                );
            },
            function (callback) {
                manufacturerCreate(
                    'Renault',
                    'https://www.carlogos.org/logo/Renault-logo-2015-2048x2048.png',
                    callback
                );
            },
            function (callback) {
                manufacturerCreate(
                    'Ferrari',
                    'https://www.carlogos.org/car-logos/scuderia-ferrari-logo-800x1050.png',
                    callback
                );
            },
            function (callback) {
                manufacturerCreate(
                    'Lamborghini',
                    'https://logos-world.net/wp-content/uploads/2021/03/Lamborghini-Logo.png',
                    callback
                );
            },
            function (callback) {
                manufacturerCreate(
                    'Mercedes',
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/800px-Mercedes-Logo.svg.png',
                    callback
                );
            },
            function (callback) {
                manufacturerCreate(
                    'Nissan',
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.png/1196px-Nissan_logo.png',
                    callback
                );
            },
        ],
        // optional callback
        cb
    );
}

function createCategories(cb) {
    async.parallel(
        [
            function (callback) {
                categoryCreate(
                    'Sports Cars',
                    'Made for high speeds and acceleration',
                    callback
                );
            },
            function (callback) {
                categoryCreate(
                    'SUVs',
                    'Made for safety and overall family cars',
                    callback
                );
            },
            function (callback) {
                categoryCreate(
                    'Super cars',
                    'Made to stand out as well as reach insane speeds',
                    callback
                );
            },
            function (callback) {
                categoryCreate(
                    'Off-road',
                    'Made for nature exploration',
                    callback
                );
            },
            function (callback) {
                categoryCreate(
                    'Micro-car',
                    'Made for city transportation',
                    callback
                );
            },
        ],
        // optional callback
        cb
    );
}

function createCars(cb) {
    async.parallel(
        [
            function (callback) {
                carCreate(
                    'BMW CSL Coupe',
                    'The 3.0 CSL Coupe features an improved version of its 4.4-litre twin-turbocharged V8, packing 625hp.',
                    '1973',
                    130,
                    manufacturers[1],
                    categories[0],
                    'https://bucket.carmodel.com/images/cm-lg/153514-2.jpg',
                    3,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'BMW M2 CS Coupe',
                    'This compact coupe is packed with a 3.0-liter BMW M TwinPower Turbo inline 6-cylinder engine that can reach a top speed of 174 mph and a standard 6-speed manual transmission.',
                    '2020',
                    130,
                    manufacturers[1],
                    categories[0],
                    'https://bucket.carmodel.com/images/cm-lg/160465-1.jpg',
                    2,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Audi RS7',
                    'Power comes from a brilliant twin-turbo 4.0-liter V-8 that pairs with a 48-volt hybrid system, eight-speed automatic transmission, and Quattro all-wheel drive. All this tech makes the RS7 heavier than the last generation model, which made as much as 605 horsepower.',
                    '2020',
                    150,
                    manufacturers[0],
                    categories[0],
                    'https://bucket.carmodel.com/images/cm-lg/159817.jpg',
                    6,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Audi R8 Coupe',
                    'Audi R8 models are available with a 5.2 L-liter gas engine, with output up to 602 hp, depending on engine type. The 2021 Audi R8 comes with rear wheel drive, and all wheel drive. Available transmissions include: 7-speed automated manual. The 2021 Audi R8 comes with a 4 yr./ 50000 mi.',
                    '2021',
                    195,
                    manufacturers[0],
                    categories[0],
                    'https://bucket.carmodel.com/images/cm-lg/158996.jpg',
                    8,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Mercedes AMG GT Black',
                    'It achieves a staggering 720 horsepower and 590 lb-ft of torque, races from 0–60 in 3.1 seconds, and reaches 124 mph in fewer than 9 seconds**. Based closely on the racing programs GT3, the GT Black Series is as close as you can get to the real thrill of the race.',
                    '2021',
                    149,
                    manufacturers[5],
                    categories[0],
                    'https://bucket.carmodel.com/images/cm-lg/160508-1.jpg',
                    1,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Mercedes EQS AMG',
                    'The EQS is the fully electric counterpart of the Mercedes S-Class, with some differences also in size: the wheelbase of 3.21 meters, for example, is in line with the long version of the "S". Competitor of the Porsche Taycan and the Tesla Model S, the EQS is marketed in different versions, including two branded AMG with 658 and 761hp. The EQS has been in production since July 2021.',
                    '2022',
                    139,
                    manufacturers[5],
                    categories[0],
                    'https://bucket.carmodel.com/images/cm-lg/160101-1.jpg',
                    12,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Ferrari SF90 Asseto fiorano',
                    'In an effort to always do better and innovate, Ferrari engineers conceived the SF90, the first hybrid road going Ferrari. The V8 atmospheric engine is part of the historical line of legendary cars such as the 288 GTO and F40, as opposed to the LaFerrari V12. The unit alone delivers 780 horses, which with the power of the electrified units gives a whopping total of 1000 bhp. The V8 biturbo that is fitted in the SF90 Stradale is an evolution of the one mounted on the 488 Pista and on the F8 Tributo, with an increased bore and other important modifications. The performance of the SF90 Stradale is remarkable, at least on paper: from 0 to 100 km / h in just 2 "5 and only 6" 7 to reach 200 km / h. The SF90 Stradale managed to beat LaFerrari on the Fiorano circuit',
                    '2019',
                    69,
                    manufacturers[3],
                    categories[2],
                    'https://bucket.carmodel.com/images/cm-lg/148629-3.jpg',
                    10,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Ferrari 812 Competizione',
                    'In an effort to always do better and innovate, Ferrari engineers conceived the SF90, the first hybrid road going Ferrari. The V8 atmospheric engine is part of the historical line of legendary cars such as the 288 GTO and F40, as opposed to the LaFerrari V12. The unit alone delivers 780 horses, which with the power of the electrified units gives a whopping total of 1000 bhp. The V8 biturbo that is fitted in the SF90 Stradale is an evolution of the one mounted on the 488 Pista and on the F8 Tributo, with an increased bore and other important modifications. The performance of the SF90 Stradale is remarkable, at least on paper: from 0 to 100 km / h in just 2 "5 and only 6" 7 to reach 200 km / h. The SF90 Stradale managed to beat LaFerrari on the Fiorano circuit',
                    '2021',
                    450,
                    manufacturers[3],
                    categories[2],
                    'https://bucket.carmodel.com/images/cm-lg/160937.jpg',
                    7,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Lamborghini Countach',
                    'Stylistic reinterpretation of the Countach in a modern key, the Countach LPI 800-4 is practically a Sian in disguise. It features the Aventadors atmospheric V12 engine with very light hybridization, thanks to a 34 horsepower supercapacitor and 4 mkg of torque. Total power is 819 horsepower. The transmission is 7-speed robotic. The performance is almost identical to that of the Aventador SVJ: 355 km / h as a maximum speed, from 0 to 100 km / h in 2 "8, and only 1 tenth of a second less than the standard Ultimae version to go from 0 at 200 km / h: 8 6. The weight is 1585kg. 112 examples of the Countach LPI 800-4 were produced, referring to the prototype of the original Countach, which bore the code name LP112. The price? 2 million and 800 thousand euros',
                    '2021',
                    25,
                    manufacturers[4],
                    categories[2],
                    'https://bucket.carmodel.com/images/cm-lg/148634-1.jpg',
                    3,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Lamborghini Diablo SE30',
                    'In September 1993 Lamborghini celebrated its thirtieth anniversary with a special version of the Diablo, the SE30. The car was fitted with showy aerodynamics, while on the bonnet the louvres resembled those of the Miura. On the SE30 the 5.7-liter V12 produced 525hp at 7000 rpm, with a speed of 331 km / h. 134 examples of the SE30 were produced between 1993 and 1994. An additional 12 examples, named SE30 Jota, were equipped with an engine upgrade kit.',
                    '1994',
                    335,
                    manufacturers[4],
                    categories[2],
                    'https://bucket.carmodel.com/images/cm-lg/154283-3.jpg',
                    15,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Renault Megane',
                    'The Renault Mégane underwent a restyling in spring 2020 and offers a wide choice of engines and two configurations: 5-door sedan and break, 27 centimeters longer than the sedan.',
                    '2020',
                    22,
                    manufacturers[2],
                    categories[1],
                    'https://bucket.carmodel.com/images/cm-lg/157984-1.jpg',
                    5,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Renault Clio',
                    'The Renault Clio underwent a restyling in spring 2019 and offers a wide choice of engines and two configurations: 5-door sedan and break, 27 centimeters longer than the sedan.',
                    '2019',
                    25,
                    manufacturers[2],
                    categories[4],
                    'https://bucket.carmodel.com/images/cm-lg/154004-1.jpg',
                    9,
                    callback
                );
            },
            function (callback) {
                carCreate(
                    'Nissan GTR',
                    'The GT-R abbreviation is now traditional in Nissans sports range. The model presented at the Tokyo Motor Show in 2007 was based on two concept cars that appeared in 2001 and 2005. The new GT-R no longer had anything to do with the Skyline, being a completely different project. Equipped with a 3799cc 480-horsepower V6, the GT-R had an aggressive look, excellent reliability and exceptional value for money',
                    '2009',
                    43,
                    manufacturers[6],
                    categories[0],
                    'https://bucket.carmodel.com/images/cm-lg/100648-1.jpg',
                    2,
                    callback
                );
            },
        ],
        // Optional callback
        cb
    );
}

async.series(
    [createManufacturers, createCategories, createCars],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        } else {
            console.log('BOOKInstances: ');
        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);
