'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon, AcademicCapIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Modern Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                WorkshopHub
              </span>
              <p className="text-xs text-slate-500 -mt-1">Learn & Grow</p>
            </div>
          </Link>

          {/* Modern Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/workshops"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 font-medium"
            >
              <AcademicCapIcon className="w-4 h-4" />
              <span>Browse Workshops</span>
            </Link>
            
            {token ? (
              <>
                <Link 
                  href="/my-bookings" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 font-medium"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>My Bookings</span>
                </Link>
                
                <div className="w-px h-6 bg-slate-300 mx-2"></div>
                
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-sm font-medium"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-sm font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Modern Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/workshops"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                onClick={toggleMobileMenu}
              >
                <AcademicCapIcon className="w-5 h-5" />
                <span className="font-medium">Browse Workshops</span>
              </Link>
              
              {token ? (
                <>
                  <Link
                    href="/my-bookings"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                    onClick={toggleMobileMenu}
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="font-medium">My Bookings</span>
                  </Link>
                  
                  <div className="border-t border-slate-200 pt-2 mt-2">
                    <button
                      onClick={() => {
                        logout();
                        toggleMobileMenu();
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 w-full"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;