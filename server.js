const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');

const Booking = require('./models/Booking'); 


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
}));


app.use(bodyParser.json());

app.post('/api/book-vehicle', async (req, res) => {
  const { name, wheels, vehicleType, vehicleModel, startDate, endDate } = req.body;

 
  console.log('Booking data received:', req.body);

  
  const booking = new Booking({
    name,
    wheels,
    vehicleType,
    vehicleModel,
    startDate,
    endDate
  });

  try {
   
    await booking.save();
    console.log('Booking saved successfully');
    res.json({ message: 'Booking successful!' });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Error saving booking to the database' });
  }
});


const vehicleData = {
  2: ['Cruiser', 'Sports'],
  4: ['Hatchback', 'SUV', 'Sedan']
};


app.get('/api/vehicle-types', (req, res) => {
  res.json(vehicleData);
});

app.get('/api/vehicles', (req, res) => {
  const { type } = req.query;
  if (type === 'Cruiser') {
    res.json([{ model: 'Cruiser A' }, { model: 'Cruiser B' }]);
  } else if (type === 'SUV') {
    res.json([{ model: 'SUV A' }, { model: 'SUV B' }]);
  }
});


const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/vehicleRental', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once('open', () => {
  console.log('MongoDB connection successful!');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});


app.listen(5000, () => {
  console.log('Backend is running on port 5000');
});
