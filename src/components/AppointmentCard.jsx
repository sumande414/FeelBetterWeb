import { useState } from 'react';
import { format } from 'date-fns';
import api from '../utils/api';

function AppointmentCard({ appointment, onCancel }) {
  const [message, setMessage] = useState('');

  const handleCancel = async () => {
    try {
      const response = await api.cancelAppointment(appointment._id);
      if (response.message === 'Appointment cancelled successfully') {
        setMessage('Appointment cancelled successfully');
        onCancel();
      } else {
        setMessage(response.message || 'Cancellation failed');
      }
    } catch (error) {
      setMessage('Error cancelling appointment');
    }
  };

  return (
    <div className="bg-[#BFDBFE] bg-opacity-50 shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-[#1E3A8A]">
        {appointment.therapistId.name}
      </h3>
      <p className="text-sm text-[#5B21B6]">
        Specialization: {appointment.therapistId.specialization}
      </p>
      <p className="text-sm text-[#5B21B6]">
        Date: {format(new Date(appointment.slotDate), 'MMMM d, yyyy h:mm a')}
      </p>
      <p className="text-sm text-[#5B21B6]">
        Status: {appointment.status || 'Scheduled'}
      </p>
      {message && (
        <div
          className={`mt-2 p-2 rounded-lg text-sm ${
            message.includes('Error') || message.includes('failed')
              ? 'bg-[#5B21B6] bg-opacity-20 text-[#5B21B6]'
              : 'bg-[#BFDBFE] bg-opacity-50 text-[#1E3A8A]'
          }`}
        >
          {message}
        </div>
      )}
      
    </div>
  );
}

export default AppointmentCard;