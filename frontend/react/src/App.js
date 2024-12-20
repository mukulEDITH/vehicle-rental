import React, { useState, useEffect } from 'react';
import { TextField, RadioGroup, FormControlLabel, Radio, Button, CircularProgress, Select, MenuItem } from '@mui/material';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: 2,
    vehicleType: '',
    vehicleModel: '',
    startDate: '',
    endDate: ''
  });
  const [vehicleTypes, setVehicleTypes] = useState({ 2: [], 4: [] });
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const carTypes = ['Hatchback', 'SUV', 'Sedan'];
  const bikeTypes = ['Cruiser', 'Sports'];

  useEffect(() => {
    setVehicleTypes({
      2: bikeTypes,   
      4: carTypes     
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.firstName || !formData.lastName)) {
      alert('Please enter both first and last name.');
    } else if (step === 2 && !formData.wheels) {
      alert('Please select the number of wheels.');
    } else if (step === 3 && !formData.vehicleType) {
      alert('Please select a vehicle type.');
    } else if (step === 4 && !formData.vehicleModel) {
      alert('Please select a specific model.');
    } else if (step === 5 && (!formData.startDate || !formData.endDate)) {
      alert('Please select a date range.');
    } else {
      setStep(step + 1);
    }
  };



  const handleSubmit = async () => {
    setLoading(true);

    // Combine first and last name into a single name field
    const name = `${formData.firstName} ${formData.lastName}`;

    const res = await fetch('http://localhost:5000/api/book-vehicle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, name })  
    });

    const data = await res.json();
    alert(data.message);

    setLoading(false);
  };

  const stepImages = {
    1: '/asset/start.jpg',
    2: 'asset/vehicle.jpg',
    3: 'asset/download.jpg',
    4: 'asset/model.jpg',
    5: 'asset/date.jpg',
  };


  return (
    <div className="container mx-auto p-4">
  
      <img src={stepImages[step]} alt={`Step ${step}`} className="step-image fade-in-out" /> 
 
       
     
      {step === 1 && (
        <div >
          <h2>First,what is your name?</h2>
          <div className='box'>
          <TextField 
            label="First Name" 
            name="firstName"
            value={formData.firstName}
            onChange={handleChange} 
          />
          <TextField 
            label="Last Name" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange} 
          />
          </div>
          
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Number of wheels</h2>
          <RadioGroup 
            name="wheels"
            value={formData.wheels}
            onChange={handleChange}
          >
            <FormControlLabel value={2} control={<Radio />} label="2 Wheeler" />
            <FormControlLabel value={4} control={<Radio />} label="4 Wheeler" />
          </RadioGroup>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Type of vehicle</h2>
          <select 
            name="vehicleType" 
            value={formData.vehicleType} 
            onChange={handleChange} 
            required
          >
            <option value="">Select vehicle type</option>
            {vehicleTypes[formData.wheels].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

{step === 4 && (
  <div>
    <h2>Specific Model</h2>
    <Select
    
      name="vehicleModel"
      value={formData.vehicleModel}
      onChange={handleChange}
      required
    >
      <MenuItem value=""  aria-label="vehicleModel"  disabled>Select vehicle model</MenuItem>
      <MenuItem value="Model A">Model A</MenuItem>
      <MenuItem value="Model B">Model B</MenuItem>
 
      <MenuItem value="Other">Other</MenuItem>
    </Select>
 
    {formData.vehicleModel === "Other" && (
      <TextField
        name="vehicleModel"
        label="Enter custom model"
        value={formData.vehicleModel}
        onChange={handleChange}
        required
      />
    )}
  </div>
)}



{step === 5 && (
  <div>
    <h2>Select Date Range</h2>

    {/* Start Date */}
    <div>
      <label htmlFor="startDate" className="block text-lg font-medium mb-2">
        Start Date:
      </label>
      <input
        type="date"
        name="startDate"
        id="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
    </div>

    {/* End Date */}
    <div>
      <label htmlFor="endDate" className="block text-lg font-medium mb-2">
        End Date:
      </label>
      <input
        type="date"
        name="endDate"
        id="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
    </div>
  </div>
)}


      <div className='nxtbtn'>
        <br/>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={step === 5 ? handleSubmit : handleNext}>
            {step === 5 ? 'Submit' : 'Next'}
          </Button>
        )}
      </div>
            <br/>
      {step === 5 && ( <img src='asset/thankyou.png'  className="thankyou" /> )}
      
    </div>
  );
};

export default App;
