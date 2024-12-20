const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  wheels: { type: Number, required: true },
  vehicleType: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
