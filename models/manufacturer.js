const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
    name: { type: String, required: true, maxlength: 20 },
    logo: { type: String, required: false },
});

ManufacturerSchema.virtual('url').get(function () {
    return '';
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);
