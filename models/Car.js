const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: { type: String, required: true, maxLength: 30 },
    description: { type: String, required: true },
    releaseYear: { type: Date, required: false },
    price: Number,
    brand: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    image: String,
});

CarSchema.virtual('url').get(function () {
    return '';
});

module.exports = mongoose.model('Car', CarSchema);
