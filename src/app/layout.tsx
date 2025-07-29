// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers'; // Import the new Providers component
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Workshop Bookings',
  description: 'Find and book your next workshop!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <Providers> 
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}