const API_URL = 'https://feelbetterapp.onrender.com/api';

const getToken = () => localStorage.getItem('token');

const api = {
  signup: async (userData) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  },

  getTherapists: async () => {
    const response = await fetch(`${API_URL}/therapists/fetch-all`);
    return await response.json();
  },

  getAvailableSlots: async ({ id, date }) => {
    const response = await fetch(`${API_URL}/therapists/slots`, {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ id, date })
    });
    if (!response.ok) {
      throw new Error('Failed to fetch available slots');
    }
    return await response.json();
  },

  bookAppointment: async ({ therapistId, slotDate }) => {
    console.log(therapistId)
    console.log(slotDate)
    const response = await fetch(`${API_URL}/appointments/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ therapistId, slotDate }),
    });
    if (!response.ok) {
      throw new Error('Failed to book appointment');
    }
    return await response.json();
  },

  getMyAppointments: async () => {
    const response = await fetch(`${API_URL}/appointments/fetch-appointments`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return await response.json();
  },

  addTherapist: async (therapistData) => {
    const response = await fetch(`${API_URL}/therapists/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(therapistData),
    });
    return await response.json();
  },
};

export default api;
