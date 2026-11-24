import Link from 'next/link';
import { AcademicCapIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="border-t border-[#e7e8e2] bg-[#f1f1eb]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-[#17231f]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#176b50] text-white"><AcademicCapIcon className="h-5 w-5" /></span>
            <span className="text-base font-extrabold tracking-tight">WorkshopHub</span>
          </Link>
          <p className="mt-3 max-w-sm text-xs leading-5 text-[#78837c]">A place to discover practical workshops, build useful skills, and keep growing.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#59665e]">
          <Link href="/workshops" className="hover:text-[#176b50]">Browse workshops</Link>
          <Link href="/my-bookings" className="hover:text-[#176b50]">My bookings</Link>
          <Link href="/login" className="inline-flex items-center gap-1 hover:text-[#176b50]">Sign in <ArrowUpRightIcon className="h-3.5 w-3.5" /></Link>
        </div>
        <p className="text-xs text-[#929b93]">© {new Date().getFullYear()} WorkshopHub</p>
      </div>
    </footer>
  );
}
