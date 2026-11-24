'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Workshop } from '@/types';
import WorkshopCard from './WorkshopCard';
import { AcademicCapIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function WorkshopCatalog({ workshops }: { workshops: Workshop[] }) {
  const [query, setQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return workshops.filter((workshop) => {
      const matchesQuery = !normalized ||
        workshop.title.toLowerCase().includes(normalized) ||
        workshop.description.toLowerCase().includes(normalized);
      const date = new Date(workshop.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const followingMonthStart = new Date(today.getFullYear(), today.getMonth() + 2, 1);
      const matchesDate = dateFilter === 'all' ||
        (dateFilter === 'upcoming' && date >= today) ||
        (dateFilter === 'next-month' && date >= nextMonthStart && date < followingMonthStart);
      return matchesQuery && matchesDate;
    });
  }, [workshops, query, dateFilter]);

  return (
    <div className="min-h-screen bg-[#f8f7f3]">
      <section className="border-b border-[#e9e8e1] bg-[#eef2eb]">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#176b50]">The workshop collection</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-[#17231f] sm:text-6xl">Find something <span className="italic text-[#176b50]">worth learning.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#68736d] sm:text-lg">Small steps, useful skills, fresh perspectives. Discover practical sessions and reserve a place in the room.</p>
          </div>
          <div className="mt-9 flex flex-col gap-3 rounded-2xl border border-[#e1e5dc] bg-white p-3 shadow-sm sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#87938a]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by workshop or topic..." aria-label="Search workshops" className="w-full rounded-xl bg-transparent py-3 pl-12 pr-4 text-sm text-[#17231f] outline-none placeholder:text-[#9aa39d]" />
            </div>
            <div className="flex items-center gap-2 border-t border-[#edf0e9] pt-3 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-[#87938a]" />
              <div className="relative min-w-40 flex-1">
                <select aria-label="Filter workshops by date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="w-full cursor-pointer appearance-none rounded-xl border border-[#e3e7df] bg-[#f8f9f5] px-4 py-3 pr-10 text-sm font-semibold text-[#34443a] shadow-sm outline-none transition hover:border-[#b9cbbd] focus:border-[#176b50] focus:ring-4 focus:ring-[#176b50]/10">
                  <option value="all">All time</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="next-month">Next month</option>
                </select>
                <svg aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718078]" viewBox="0 0 20 20" fill="none">
                  <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-medium text-[#7c887f]">
            <span>{filtered.length} {filtered.length === 1 ? 'workshop' : 'workshops'} to explore</span>
            {(query || dateFilter !== 'all') && <button onClick={() => { setQuery(''); setDateFilter('all'); }} className="font-bold text-[#176b50] hover:underline">Clear filters</button>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        {filtered.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((workshop) => <WorkshopCard key={workshop.id} workshop={workshop} />)}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#d9ddd5] bg-white/70 px-6 py-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1e9] text-[#176b50]"><AcademicCapIcon className="h-7 w-7" /></span>
            <h2 className="mt-5 font-serif text-3xl text-[#17231f]">{workshops.length ? 'No matching workshops' : 'The next sessions are being planned'}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#748078]">{workshops.length ? 'Try another search term or adjust the date filter.' : 'There are no workshops available right now. Check back soon for new opportunities to learn.'}</p>
            {workshops.length ? (
              <button onClick={() => { setQuery(''); setDateFilter('all'); }} className="mt-6 rounded-full bg-[#176b50] px-6 py-3 text-sm font-bold text-white hover:bg-[#10543e]">Clear filters</button>
            ) : (
              <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176b50] hover:gap-3">Back to home <ArrowRightIcon className="h-4 w-4" /></Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
