import { useState, useEffect } from 'react';
import api from '../utils/api';

function AdminPanel() {
  const [therapists, setTherapists] = useState([]);
  const [therapistData, setTherapistData] = useState({
    name: '',
    email: '',
    specialization: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const data = await api.getTherapists();
        setTherapists(data);
      } catch (error) {
        setMessage('Error fetching therapists');
      }
    };
    fetchTherapists();
  }, []);

  const handleTherapistSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.addTherapist(therapistData);
      if (response.message === 'Therapist added') {
        setMessage('Therapist added successfully');
        setTherapists([...therapists, response.therapist]);
        setTherapistData({ name: '', email: '', specialization: '' });
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage('Error adding therapist');
    }
  };

  return (
    <div className="w-2xl bg-[#BFDBFE] bg-opacity-60 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center">
        Admin Panel
      </h2>
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            message.includes('Error') || message.includes('failed')
              ? 'bg-[#FEE2E2] text-[#991B1B]'
              : 'bg-[#D1FAE5] text-[#065F46]'
          }`}
        >
          {message}
        </div>
      )}

      <div className="mb-10">
        <h3 className="text-xl font-semibold text-[#5B21B6] mb-4">
          Add Therapist
        </h3>
        <form onSubmit={handleTherapistSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#1E3A8A]">
              Name
            </label>
            <input
              type="text"
              value={therapistData.name}
              onChange={(e) =>
                setTherapistData({ ...therapistData, name: e.target.value })
              }
              className="w-full p-3 border border-[#5B21B6] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E3A8A]">
              Email
            </label>
            <input
              type="email"
              value={therapistData.email}
              onChange={(e) =>
                setTherapistData({ ...therapistData, email: e.target.value })
              }
              className="w-full p-3 border border-[#5B21B6] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E3A8A]">
              Specialization
            </label>
            <input
              type="text"
              value={therapistData.specialization}
              onChange={(e) =>
                setTherapistData({
                  ...therapistData,
                  specialization: e.target.value,
                })
              }
              className="w-full p-3 border border-[#5B21B6] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#5B21B6] text-white px-4 py-2 rounded-full font-semibold text-base hover:from-[#5B21B6] hover:to-[#1E3A8A] transition-all duration-300 shadow-md"
          >
            Add Therapist
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
