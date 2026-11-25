export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getPublicWorkshops } from './api/customerApi';
import WorkshopCard from './components/WorkshopCard';
import { Workshop } from '@/types';
import {
  ArrowRightIcon, ArrowUpRightIcon, CalendarDaysIcon, CheckBadgeIcon,
  SparklesIcon, UsersIcon, AcademicCapIcon,
} from '@heroicons/react/24/outline';

async function fetchFeaturedWorkshops(): Promise<Workshop[]> {
  try {
    const workshops = await getPublicWorkshops();
    return Array.isArray(workshops) ? workshops.slice(0, 3) : [];
  } catch (error) {
    console.error('Failed to load featured workshops:', error);
    return [];
  }
}

export default async function HomePage() {
  const workshops = await fetchFeaturedWorkshops();

  return (
    <div className="overflow-hidden bg-[#f8f7f3]">
      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -right-36 top-8 h-[460px] w-[460px] rounded-full bg-[#dcebe1] blur-3xl opacity-70" />
        <div className="pointer-events-none absolute -left-48 bottom-0 h-80 w-80 rounded-full bg-[#f3e7d2] blur-3xl opacity-70" />
        <div className="relative grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d9e7dd] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#176b50] shadow-sm">
              <SparklesIcon className="h-4 w-4" /> Make room to grow
            </div>
            <h1 className="text-[clamp(3.2rem,7vw,5.8rem)] font-semibold leading-[.99] tracking-[-.065em] text-[#17231f]">
              Learn skills.
              <br />
              <span className="font-serif italic font-medium text-[#176b50]">Build what’s next.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#68736d] sm:text-xl">
              Practical workshops led by people who do the work. Find your next learning experience and turn new knowledge into real progress.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/workshops" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#176b50] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 hover:-translate-y-1 hover:bg-[#10543e]">
                Explore workshops <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center rounded-full border border-[#d8ddd6] bg-white/70 px-7 py-4 text-sm font-bold text-[#25332c] hover:border-[#176b50] hover:bg-white">
                Join the community
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#e5e5dc] pt-7">
              <div className="flex items-center gap-2 text-sm font-medium text-[#68736d]"><CheckBadgeIcon className="h-5 w-5 text-[#176b50]" /> Expert-led sessions</div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#68736d]"><UsersIcon className="h-5 w-5 text-[#176b50]" /> Learn with others</div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#68736d]"><CalendarDaysIcon className="h-5 w-5 text-[#176b50]" /> Book your place</div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[510px] lg:ml-auto">
            <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-[#d4dfd4]" />
            <div className="absolute -bottom-7 -left-7 h-36 w-36 rounded-full bg-[#e8b86e]/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#173e32] p-7 text-white shadow-2xl shadow-[#173e32]/20 sm:p-9">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[.2em] text-[#c5d8ca]">The learning space</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-[#d8e6dc]">01 / 03</span>
                </div>
                <div className="mt-16 flex h-52 items-center justify-center">
                  <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/20 bg-white/[.06]">
                    <div className="absolute h-32 w-32 rounded-full border border-[#c8a46b]/60" />
                    <div className="absolute h-20 w-20 rounded-full bg-[#d5a65e] shadow-[0_0_70px_rgba(213,166,94,.3)]" />
                    <AcademicCapIcon className="relative z-10 h-14 w-14 text-[#173e32]" />
                  </div>
                </div>
                <div className="mt-12 border-t border-white/15 pt-6">
                  <p className="font-serif text-3xl leading-tight">A little curiosity can change everything.</p>
                  <p className="mt-3 text-sm leading-6 text-[#c5d8ca]">Make time for ideas, skills, and people that move you forward.</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-[#e9e8e1] bg-white p-4 shadow-xl sm:-left-10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3ead9] text-[#9a6b27]"><SparklesIcon className="h-5 w-5" /></span>
                <div><p className="text-sm font-bold text-[#17231f]">Learn by doing</p><p className="text-xs text-[#7b857e]">Practical from day one</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e9e8e1] bg-white/65 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-5 text-xs font-bold uppercase tracking-[.16em] text-[#849087] sm:px-8">
          <span>Curiosity first</span><span className="hidden h-1 w-1 rounded-full bg-[#d4a45f] sm:block" />
          <span>Learn together</span><span className="hidden h-1 w-1 rounded-full bg-[#d4a45f] sm:block" />
          <span>Put skills into practice</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#176b50]">Find your next step</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-[#17231f] sm:text-5xl">A good place to begin.</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#68736d]">Explore upcoming sessions selected to help you build useful skills and fresh perspectives.</p>
          </div>
          <Link href="/workshops" className="inline-flex items-center gap-2 text-sm font-bold text-[#176b50] hover:gap-3">View all workshops <ArrowUpRightIcon className="h-4 w-4" /></Link>
        </div>
        {workshops.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {workshops.map((workshop) => <WorkshopCard key={workshop.id} workshop={workshop} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#d9ddd5] bg-white/70 px-6 py-14 text-center">
            <AcademicCapIcon className="mx-auto h-10 w-10 text-[#8a9b8e]" />
            <h3 className="mt-4 text-xl font-bold text-[#25332c]">New workshops are on the way</h3>
            <p className="mt-2 text-sm text-[#77827b]">Visit the workshops page to check the latest availability.</p>
            <Link href="/workshops" className="mt-6 inline-flex rounded-full bg-[#176b50] px-5 py-3 text-sm font-bold text-white hover:bg-[#10543e]">Browse workshops</Link>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#e9eee6] px-7 py-12 sm:px-12 sm:py-16">
          <div className="absolute -right-12 -top-24 h-72 w-72 rounded-full border-[36px] border-white/40" />
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#176b50]">Your next chapter starts here</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-[#17231f] sm:text-4xl">Make your next hour an investment in yourself.</h2>
            </div>
            <Link href="/workshops" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#172f27] px-6 py-4 text-sm font-bold text-white hover:-translate-y-1 hover:bg-[#176b50]">Find a workshop <ArrowRightIcon className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
