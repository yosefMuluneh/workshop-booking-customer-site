'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
  Bars3Icon, XMarkIcon, AcademicCapIcon, UserCircleIcon,
  ArrowRightOnRectangleIcon, ArrowRightIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLink = (href: string, label: string) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      pathname === href || (href === '/workshops' && pathname.startsWith('/workshops'))
        ? 'bg-emerald-50 text-emerald-800'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
    }`;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e8e1] bg-[#fbfaf7]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" onClick={closeMenu} className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#176b50] text-white shadow-sm shadow-emerald-900/15 transition-transform group-hover:-rotate-3">
            <AcademicCapIcon className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className="block text-[19px] font-extrabold tracking-tight text-[#17231f]">WorkshopHub</span>
            <span className="mt-0.5 block text-[11px] font-medium tracking-[.13em] text-[#78837c]">LEARN WITH PURPOSE</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/workshops" className={navLink('/workshops', 'Browse workshops')}>Browse workshops</Link>
          {token ? (
            <>
              <Link href="/my-bookings" className={navLink('/my-bookings', 'My bookings')}>My bookings</Link>
              <button onClick={logout} className="ml-2 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                <ArrowRightOnRectangleIcon className="h-4 w-4" /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={navLink('/login', 'Sign in')}>Sign in</Link>
              <Link href="/register" className="ml-1 inline-flex items-center gap-2 rounded-full bg-[#176b50] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#10543e] hover:shadow-md">
                Create account <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden"
        >
          {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-[#fbfaf7] px-5 py-4 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <Link href="/workshops" onClick={closeMenu} className={navLink('/workshops', 'Browse workshops')}>Browse workshops</Link>
            {token ? (
              <>
                <Link href="/my-bookings" onClick={closeMenu} className={navLink('/my-bookings', 'My bookings')}>My bookings</Link>
                <button onClick={() => { logout(); closeMenu(); }} className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-700 hover:bg-red-50">
                  <ArrowRightOnRectangleIcon className="h-5 w-5" /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={closeMenu} className={navLink('/login', 'Sign in')}>Sign in</Link>
                <Link href="/register" onClick={closeMenu} className="mt-1 rounded-xl bg-[#176b50] px-4 py-3 text-center text-sm font-semibold text-white">Create account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
