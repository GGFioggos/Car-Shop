const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: { type: String, required: true, maxLength: 30 },
    description: { type: String, required: true },
    releaseYear: { type: Date, required: false },
    price: Number,
    brand: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    stats: {
        acceleration: { type: Float32Array },
        torque: String,
        drivewheels: String,
        transmission: String,
        gearbox: Int32Array,
        colors: { type: Array },
        fuelConsumption: Float32Array,
        range: Number,
        tankCapacity: Number,
        fuelType: String,
        doors: Int32Array,
        seats: Int32Array,
    },
});

CarSchema.virtual('url').get(function () {
    return '';
});

module.exports = mongoose.model('Car', CarSchema);
