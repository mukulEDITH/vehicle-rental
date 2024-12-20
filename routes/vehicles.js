const express = require('express');
const Vehicle = require('./models/Vehicle.js');
const router = express.Router();

router.get('/vehicle-types', async (req, res) => {
  try {
    const vehicleTypes = await Vehicle.distinct('type');
    res.json(vehicleTypes);
  } catch (error) {
    res.status(500).send('Error fetching vehicle types');
  }
});

router.get('/vehicles', async (req, res) => {
  const { type } = req.query;
  try {
    const vehicles = await Vehicle.find({ type }); 
    res.json(vehicles);
  } catch (error) {
    res.status(500).send('Error fetching vehicles');
  }
});

module.exports = router;
