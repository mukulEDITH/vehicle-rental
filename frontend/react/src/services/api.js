import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchVehicleTypes = async () => {
  const response = await axios.get(`${API_BASE}/vehicles/types`);
  return response.data;
};

export const fetchModels = async (type) => {
  const response = await axios.get(`${API_BASE}/vehicles/models`, { params: { type } });
  return response.data;
};

export const submitBooking = async (data) => {
  const response = await axios.post(`${API_BASE}/bookings`, data);
  return response.data;
};
