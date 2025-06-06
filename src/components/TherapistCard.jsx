import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../utils/api';

function combineDateAndTimeIST(selectedDate, timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const localDate = new Date(selectedDate);
  localDate.setHours(hours, minutes, 0, 0);
  const yyyy = localDate.getFullYear();
  const mm = String(localDate.getMonth() + 1).padStart(2, '0');
  const dd = String(localDate.getDate()).padStart(2, '0');
  const hh = String(localDate.getHours()).padStart(2, '0');
  const min = String(localDate.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:00.000+00:00`;
}

function TherapistCard({ therapist }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!therapist || !therapist._id) {
      setMessage('Invalid therapist data');
    }
  }, [therapist]);

  useEffect(() => {
    if (selectedDate && therapist && therapist._id) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      const date = `${yyyy}-${mm}-${dd}`;
      const fetchAvailableSlots = async () => {
        setIsLoading(true);
        try {
          const response = await api.getAvailableSlots({
            id: therapist._id,
            date: date,
          });
          setAvailableSlots(response.slots);
          setMessage('');
        } catch (error) {
          setMessage('Error fetching available slots');
        } finally {
          setIsLoading(false);
        }
      };
      fetchAvailableSlots();
    }
  }, [selectedDate, therapist]);

  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) {
      setMessage('Please select a date and time slot');
      return;
    }
    if (!therapist || !therapist._id) {
      setMessage('Invalid therapist data');
      return;
    }
    setIsLoading(true);
    try {
      const formatted = combineDateAndTimeIST(selectedDate, selectedSlot);
      const response = await api.bookAppointment({
        therapistId: therapist._id,
        slotDate: formatted,
      });
      if (response.message === 'Appointment booked') {
        setMessage('Appointment booked successfully');
        setSelectedDate(null);
        setSelectedSlot('');
        setAvailableSlots([]);
      } else {
        setMessage(response.message || 'Booking failed');
      }
    } catch (error) {
      setMessage(error.message || 'Error booking appointment');
    } finally {
      setIsLoading(false);
    }
  };

  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    timeSlots.push(`${hour}:00`);
  }

  return (
    <div className="bg-[#93C5FD] bg-opacity-60 shadow-lg rounded-lg p-4 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#93C5FD] bg-opacity-60 z-10 rounded-lg">
          <div className="w-12 h-12 border-4 border-[#5B21B6] border-t-transparent rounded-full animate-spin shadow-md"></div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#1E3A8A]">
        {therapist?.name || 'Unknown Therapist'}
      </h3>
      <p className="text-sm text-[#4C1D95]">
        Specialization: {therapist?.specialization || 'N/A'}
      </p>
      <p className="text-sm text-[#4C1D95]">
        Email: {therapist?.email || 'N/A'}
      </p>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-[#1E3A8A]">
          Select Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          className="w-full p-3 border border-[#5B21B6] rounded-lg mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
          placeholderText="Select a date"
          disabled={!therapist || !therapist._id || isLoading}
        />
      </div>

      {availableSlots && selectedDate && therapist && therapist._id && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#1E3A8A]">
            Available Slots
          </label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {timeSlots.map((slot) => {
              const isBooked = availableSlots.some(
                (s) => s.time === slot && s.isBooked
              );
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => !isBooked && setSelectedSlot(slot)}
                  className={`p-2 rounded-lg text-sm font-semibold ${
                    isBooked
                      ? 'bg-red-500 text-white cursor-not-allowed'
                      : selectedSlot === slot
                      ? 'bg-[#5B21B6] text-white'
                      : 'bg-[#BFDBFE] text-[#1E3A8A] hover:bg-[#A5B4FC]'
                  }`}
                  disabled={isBooked || isLoading}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {message && (
        <div
          className="mt-2 p-2 rounded-lg text-sm bg-[#BFDBFE] bg-opacity-60 text-[#1E3A8A]"
        >
          {message}
        </div>
      )}

      <button
        onClick={handleBook}
        className={`mt-4 w-full bg-gradient-to-r from-[#1E3A8A] to-[#5B21B6] text-white px-4 py-2 rounded-full font-semibold text-base hover:from-[#5B21B6] hover:to-[#1E3A8A] transition-all duration-300 shadow-lg ${
          !selectedDate || !selectedSlot || !therapist || !therapist._id || isLoading
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
        disabled={!selectedDate || !selectedSlot || !therapist || !therapist._id || isLoading}
      >
        {isLoading ? 'Booking...' : 'Book Appointment'}
      </button>
    </div>
  );
}

export default TherapistCard;
