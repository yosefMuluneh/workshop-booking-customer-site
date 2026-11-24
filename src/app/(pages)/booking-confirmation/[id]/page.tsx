'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckIcon, CalendarDaysIcon, ArrowRightIcon, TicketIcon } from '@heroicons/react/24/outline';

const BookingConfirmationPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return (
    <div className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-[#f1f3ed] px-5 py-16">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#dcebe1] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#f2e5ce] blur-3xl" />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_25px_80px_rgba(30,55,40,.10)]">
        <div className="bg-[#173e32] px-8 py-10 text-center text-white sm:px-14 sm:py-14">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10"><CheckIcon className="h-10 w-10 text-[#e5c58f]" /></span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#c5d8ca]">You’re on the list</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Your place is reserved.</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#c5d8ca]">Thanks for booking with WorkshopHub. We’re looking forward to having you with us.</p>
        </div>
        <div className="px-7 py-9 text-center sm:px-12 sm:py-11">
          <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-2xl border border-[#e7e8e2] bg-[#fafbf8] p-4 text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf1e9] text-[#176b50]"><TicketIcon className="h-5 w-5" /></span>
            <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#87938a]">Booking reference</p><p className="mt-1 break-all font-mono text-sm font-semibold text-[#34443a]">{id}</p></div>
          </div>
          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#77827b]">You can review your reservation details from your bookings page.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/my-bookings" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#176b50] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#10543e]">View my bookings <ArrowRightIcon className="h-4 w-4" /></Link>
            <Link href="/workshops" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e1e6de] px-6 py-3.5 text-sm font-bold text-[#526158] hover:bg-[#f7f8f4]"><CalendarDaysIcon className="h-4 w-4" /> Explore more</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
