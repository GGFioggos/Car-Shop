const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true, maxLength: 20 },
    description: { type: String, required: false, maxLength: 60 },
});

CategorySchema.virtual('url').get(function () {
    return '';
});

module.exports = mongoose.model('Category', CategorySchema);
