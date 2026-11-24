import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'WorkshopHub | Learn something remarkable',
  description: 'Discover practical, expert-led workshops and book your next learning experience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-80px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
