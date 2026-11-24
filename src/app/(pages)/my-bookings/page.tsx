'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getMyBookings, cancelBooking } from '@/app/api/customerApi';
import { MyBooking } from '@/types';
import Link from 'next/link';
import {
  CalendarDaysIcon, ClockIcon, ArrowRightIcon, TicketIcon,
  XMarkIcon, ExclamationTriangleIcon, CheckCircleIcon,
} from '@heroicons/react/24/outline';

const statusStyles: Record<MyBooking['status'], string> = {
  PENDING: 'bg-amber-50 text-amber-800 ring-amber-200',
  CONFIRMED: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  CANCELED: 'bg-slate-100 text-slate-600 ring-slate-200',
};

const BookingStatusChip = ({ status }: { status: MyBooking['status'] }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[.08em] ring-1 ring-inset ${statusStyles[status]}`}>{status.toLowerCase()}</span>
);

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    let active = true;
    if (!token) {
      setLoading(false);
      return;
    }
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings(token);
        if (active) setBookings(data);
      } catch {
        if (active) setError('We couldn’t load your bookings. Please try again.');
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchBookings();
    return () => { active = false; };
  }, [token]);

  const handleCancel = async () => {
    if (!token || !selectedBookingId) return;
    setCanceling(true);
    setError('');
    try {
      await cancelBooking(selectedBookingId, token);
      setBookings((previous) => previous.map((booking) =>
        booking.id === selectedBookingId ? { ...booking, status: 'CANCELED' } : booking
      ));
      setNotice('Your booking has been canceled.');
      setSelectedBookingId(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'We couldn’t cancel this booking. Please try again.');
      setSelectedBookingId(null);
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return <div className="flex min-h-[65vh] items-center justify-center bg-[#f8f7f3]"><div className="flex items-center gap-3 text-sm font-medium text-[#68736d]"><span className="h-5 w-5 animate-spin rounded-full border-2 border-[#176b50] border-t-transparent" /> Loading your bookings...</div></div>;
  }

  if (!token) {
    return <div className="flex min-h-[65vh] items-center justify-center bg-[#f8f7f3] px-5"><div className="w-full max-w-md rounded-[2rem] border border-[#e7e8e2] bg-white p-9 text-center shadow-sm"><TicketIcon className="mx-auto h-10 w-10 text-[#176b50]" /><h1 className="mt-5 font-serif text-3xl text-[#17231f]">Your bookings, all in one place.</h1><p className="mt-3 text-sm leading-6 text-[#77827b]">Sign in to see your upcoming workshops and booking history.</p><Link href="/login" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#176b50] px-6 py-3 text-sm font-bold text-white hover:bg-[#10543e]">Sign in <ArrowRightIcon className="h-4 w-4" /></Link></div></div>;
  }

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#f8f7f3]">
      <section className="border-b border-[#e9e8e1] bg-[#eef2eb]">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#176b50]">Your learning calendar</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight text-[#17231f]">My bookings.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#68736d]">Keep track of the sessions you’ve reserved. Your next learning experience is closer than you think.</p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#dce5da] bg-white/70 px-4 py-2 text-sm font-semibold text-[#526158]"><TicketIcon className="h-4 w-4 text-[#176b50]" /> {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}</div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {notice && <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><CheckCircleIcon className="h-5 w-5" /> {notice}</div>}
        {error && <div role="alert" className="mb-5 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"><ExclamationTriangleIcon className="h-5 w-5 shrink-0" /> {error}</div>}
        {bookings.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#d9ddd5] bg-white px-6 py-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1e9] text-[#176b50]"><TicketIcon className="h-7 w-7" /></span>
            <h2 className="mt-5 font-serif text-3xl text-[#17231f]">Nothing on your calendar yet.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#748078]">Find a session that sparks your curiosity and reserve your place.</p>
            <Link href="/workshops" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#176b50] px-6 py-3 text-sm font-bold text-white hover:bg-[#10543e]">Explore workshops <ArrowRightIcon className="h-4 w-4" /></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <article key={booking.id} className="flex flex-col gap-5 rounded-2xl border border-[#e7e8e2] bg-white p-5 shadow-[0_6px_24px_rgba(27,45,35,.035)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex min-w-0 gap-4">
                  <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1e9] text-[#176b50] sm:flex"><CalendarDaysIcon className="h-7 w-7" /></div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3"><h2 className="text-lg font-bold tracking-tight text-[#17231f]">{booking.workshop.title}</h2><BookingStatusChip status={booking.status} /></div>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#68736d]">
                      <span className="inline-flex items-center gap-1.5"><CalendarDaysIcon className="h-4 w-4 text-[#176b50]" />{new Date(booking.workshop.date).toLocaleDateString('en-US', { timeZone: 'Africa/Addis_Ababa', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="inline-flex items-center gap-1.5"><ClockIcon className="h-4 w-4 text-[#176b50]" />{booking.timeSlot.startTime} – {booking.timeSlot.endTime}</span>
                    </div>
                  </div>
                </div>
                {booking.status !== 'CANCELED' && <button onClick={() => setSelectedBookingId(booking.id)} className="self-start rounded-full border border-[#ead8d4] px-4 py-2.5 text-xs font-bold text-[#a34b3f] hover:border-red-300 hover:bg-red-50 sm:self-center">Cancel booking</button>}
              </article>
            ))}
          </div>
        )}
      </section>

      {selectedBookingId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14231c]/50 p-5 backdrop-blur-sm" onClick={() => !canceling && setSelectedBookingId(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="cancel-title" className="w-full max-w-md rounded-[1.7rem] bg-white p-7 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600"><ExclamationTriangleIcon className="h-6 w-6" /></span><button type="button" aria-label="Close dialog" onClick={() => setSelectedBookingId(null)} disabled={canceling} className="rounded-full p-2 text-slate-400 hover:bg-slate-100"><XMarkIcon className="h-5 w-5" /></button></div>
            <h2 id="cancel-title" className="mt-5 font-serif text-3xl text-[#17231f]">Cancel this booking?</h2>
            <p className="mt-3 text-sm leading-6 text-[#748078]">Your place will be released. You can always browse the workshops again if your plans change.</p>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" disabled={canceling} onClick={() => setSelectedBookingId(null)} className="rounded-full border border-[#e1e6de] px-5 py-3 text-sm font-bold text-[#526158] hover:bg-[#f7f8f4]">Keep booking</button><button type="button" disabled={canceling} onClick={handleCancel} className="rounded-full bg-[#a34b3f] px-5 py-3 text-sm font-bold text-white hover:bg-[#883d33] disabled:opacity-60">{canceling ? 'Canceling...' : 'Yes, cancel booking'}</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
