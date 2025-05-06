import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import TherapistCard from '../components/TherapistCard';

function Therapists() {
  const { user } = useContext(AuthContext);
  const [therapists, setTherapists] = useState([]);
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

  return (
    <div className="min-h-screen bg-[#BFDBFE] bg-opacity-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#1E3A8A]">
          Our Therapists
        </h1>
        {message && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {message}
          </div>
        )}
        {!user && (
          <div className="mb-6 p-4 bg-yellow-100 text-yellow-700 rounded text-center">
            <p>
              Please{' '}
              <Link to="/login" className="underline">
                log in
              </Link>{' '}
              or{' '}
              <Link to="/signup" className="underline">
                sign up
              </Link>{' '}
              to book an appointment.
            </p>
          </div>
        )}
        {therapists.length === 0 ? (
          <p className="text-center text-[#1E3A8A]">
            No therapists available.
          </p>
        ) : (
          <div className="space-y-4">
            {therapists.map((therapist) => (
              <TherapistCard key={therapist._id} therapist={therapist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Therapists;
