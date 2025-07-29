'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../api/customerApi';
import { useRouter } from 'next/navigation';
import { Workshop } from '@/types';
import Image from 'next/image';
import { CalendarDaysIcon, ClockIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>((workshop.timeSlots && workshop.timeSlots[0]?.id) || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const handleBooking = async () => {
    if (!token) {
      setError('Please log in to book a workshop.');
      //set time out
      setTimeout(()=> setError(''), 3000)
      return;
    }
    if (!selectedSlotId) {
      setError('Please select a time slot.');
      setTimeout(()=> setError(''), 3000)
      return;
    }
    setLoading(true);
    setError('');
    try {
      const bookingData = { workshopId: workshop.id, timeSlotId: selectedSlotId };
      const response = await createBooking(bookingData, token);
      router.push(`/booking-confirmation/${response.bookingId}`);
    } catch (err: any) {
      console.error('Error creating booking:', err);
      const errorMessage = err.response?.data?.message || 'Booking failed. Please try again later.';
      setError(errorMessage);
      //set timeout to clear error after 5 seconds
        setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const selectId = `time-slot-select-${workshop.id}`;

  return (
    <div 
      data-testid={`workshop-card-${workshop.id}`} 
      className="group relative w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-indigo-200"
    >
      {/* Card Header with Gradient */}
      <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-right">
              <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full font-medium">
                {workshop.maxCapacity} spots
              </span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-2 leading-tight">
            {workshop.title}
          </h3>
          
          <div className="flex items-center space-x-2 text-white/90">
            <CalendarDaysIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {new Date(workshop.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-2xl"></div>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        <p className="text-slate-600 mb-6 text-sm leading-relaxed">{workshop.description}</p>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
          Select a Time Slot <span className="text-red-500">*</span>
        </label>
        <select
          id={selectId}
          value={selectedSlotId}
          onChange={(e) => setSelectedSlotId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-poppins text-sm bg-white transition-all duration-300"
        >
          {workshop.timeSlots.length === 0 ? (
            <option value="" disabled>
              No time slots available
            </option>
          ) : (
            workshop.timeSlots.map((slot) => (
              <option
                key={slot.id}
                value={slot.id}
                className={`py-2 ${selectedSlotId === slot.id ? 'bg-teal-50' : ''}`}
              >
                {slot.startTime} - {slot.endTime}{' '}
                <span className="text-amber-700 bg-amber-100 px-2 py-1 rounded-full text-xs">
                  {slot.availableSpots} spots left
                </span>
              </option>
            ))
          )}
        </select>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm font-poppins mb-4 transition-all duration-300">
          {error}
        </div>
      )}
      <button
        onClick={handleBooking}
        disabled={loading}
        className={`w-full py-2 text-white bg-indigo-600 rounded-lg font-poppins text-sm transition-all duration-300 hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          loading ? 'bg-indigo-300 cursor-not-allowed animate-pulse' : ''
        }`}
      >
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </div>
    </div>
  );
};

export default WorkshopCard;