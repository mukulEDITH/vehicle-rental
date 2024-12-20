const express = require('express');
const Booking = require('../models/Booking.js');
const Vehicle = require('../models/Vehicle.js');
const router = express.Router();


router.post('/', async (req, res) => {
  const { name, vehicleId, startDate, endDate } = req.body;

  const overlappingBooking = await Booking.findOne({
    vehicleId,
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
    ],
  });

  if (overlappingBooking) {
    return res.status(400).json({ error: 'Vehicle already booked for selected dates.' });
  }


  const booking = new Booking({ name, vehicleId, startDate, endDate });
  await booking.save();

  await Vehicle.findByIdAndUpdate(vehicleId, { isAvailable: false });

  res.status(201).json({ message: 'Booking successful!' });
});

module.exports = router;
