const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, 
  model: { type: String, required: true },
  wheels: { type: Number, required: true }, 
  available: { type: Boolean, default: true } 
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
