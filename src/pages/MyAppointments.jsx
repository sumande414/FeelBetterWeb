import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import AppointmentCard from '../components/AppointmentCard';

function MyAppointments() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await api.getMyAppointments();
      setAppointments(data.appointments || []);
      setMessage('');
    } catch (error) {
      setMessage(error.message || 'Error fetching appointments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchAppointments();
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#BFDBFE] via-[#C4B5FD] to-[#BFDBFE]">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#1E3A8A] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#5B21B6] opacity-15 rounded-full blur-3xl"></div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#BFDBFE] bg-opacity-60 z-10">
          <div className="w-12 h-12 border-4 border-[#5B21B6] border-t-transparent rounded-full animate-spin shadow-md"></div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-8 text-center">
          My Appointments
        </h1>
        {message && (
          <div className="mb-4 p-3 bg-[#5B21B6] bg-opacity-20 text-[#5B21B6] rounded-lg">
            {message}
          </div>
        )}
        {appointments.length === 0 && !isLoading ? (
          <p className="text-center text-[#1E3A8A] text-base">
            No appointments booked yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onCancel={fetchAppointments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
