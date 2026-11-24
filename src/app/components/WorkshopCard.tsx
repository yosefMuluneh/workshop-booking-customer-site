'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../api/customerApi';
import { useRouter } from 'next/navigation';
import { Workshop } from '@/types';
import {
  CalendarDaysIcon, ClockIcon, UserGroupIcon, SparklesIcon,
  ArrowRightIcon, CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface WorkshopCardProps { workshop: Workshop; }

const formatWorkshopDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
  timeZone: 'Africa/Addis_Ababa', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
});

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const [selectedSlotId, setSelectedSlotId] = useState(workshop.timeSlots?.[0]?.id || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();
  const selectedSlot = workshop.timeSlots?.find((slot) => slot.id === selectedSlotId);

  const handleBooking = async () => {
    if (!token) {
      setError('Please log in to book a workshop.');
      return;
    }
    if (!selectedSlotId) {
      setError('Please select an available time slot.');
      return;
    }
    if (selectedSlot && selectedSlot.availableSpots <= 0) {
      setError('This time slot is fully booked. Please choose another slot.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await createBooking({ workshopId: workshop.id, timeSlotId: selectedSlotId }, token);
      router.push(`/booking-confirmation/${response.bookingId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const selectId = `time-slot-select-${workshop.id}`;

  return (
    <article data-testid={`workshop-card-${workshop.id}`} className="group flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] border border-[#e7e8e2] bg-white shadow-[0_8px_30px_rgba(27,45,35,.045)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#cbdccf] hover:shadow-[0_20px_50px_rgba(27,45,35,.10)]">
      <div className="relative min-h-[190px] overflow-hidden bg-[#173e32] p-6 text-white">
        <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border border-white/10" />
        <div className="absolute -right-2 -top-6 h-36 w-36 rounded-full border border-white/10" />
        <div className="absolute -bottom-16 left-24 h-40 w-40 rounded-full bg-[#d5a65e]/20 blur-2xl" />
        <div className="relative flex h-full min-h-[142px] flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10"><SparklesIcon className="h-5 w-5 text-[#e5c58f]" /></span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#e4eee6]">
              {workshop.timeSlots?.length || 0} {workshop.timeSlots?.length === 1 ? 'session' : 'sessions'}
            </span>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#c3d8ca]">Featured workshop</p>
            <h2 className="max-w-sm text-2xl font-semibold leading-tight tracking-tight">{workshop.title}</h2>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#176b50]">
          <CalendarDaysIcon className="h-4 w-4" />
          <span>{formatWorkshopDate(workshop.date)}</span>
        </div>
        <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#68736d]">{workshop.description}</p>

        <div className="mt-5 border-t border-[#edf0e9] pt-5">
          <label htmlFor={selectId} className="mb-2 block text-xs font-bold uppercase tracking-[.12em] text-[#59665e]">Choose a time</label>
          <div className="relative">
            <ClockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#87938a]" />
            <select id={selectId} value={selectedSlotId} onChange={(event) => setSelectedSlotId(event.target.value)} className="w-full appearance-none rounded-xl border border-[#e3e7df] bg-[#fafbf8] py-3 pl-10 pr-4 text-sm font-semibold text-[#34443a] outline-none focus:border-[#176b50] focus:ring-2 focus:ring-[#176b50]/10">
              {!workshop.timeSlots?.length ? <option value="">No time slots available</option> : workshop.timeSlots.map((slot) => (
                <option key={slot.id} value={slot.id} disabled={slot.availableSpots <= 0}>
                  {slot.startTime} – {slot.endTime} · {slot.availableSpots} spots left
                </option>
              ))}
            </select>
          </div>
          {selectedSlot && (
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-[#78847b]"><UserGroupIcon className="h-4 w-4" /> Availability</span>
              <span className={selectedSlot.availableSpots > 0 ? 'font-semibold text-[#176b50]' : 'font-semibold text-red-600'}>
                {selectedSlot.availableSpots} spots left
              </span>
            </div>
          )}
        </div>

        {error && <p role="alert" className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-medium leading-5 text-red-700">{error}</p>}
        <button type="button" onClick={handleBooking} disabled={loading || !workshop.timeSlots?.length || (selectedSlot?.availableSpots ?? 0) <= 0} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#176b50] px-5 py-3.5 text-sm font-bold text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#10543e] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0">
          {loading ? 'Reserving your place...' : 'Book this workshop'}
          {!loading && <ArrowRightIcon className="h-4 w-4" />}
        </button>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#8a948d]"><CheckCircleIcon className="h-3.5 w-3.5" /> Secure booking · Instant confirmation</div>
      </div>
    </article>
  );
};

export default WorkshopCard;
