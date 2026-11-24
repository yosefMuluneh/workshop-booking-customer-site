'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '../../api/customerApi';
import { AcademicCapIcon, ArrowRightIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);
    try {
      await registerUser(formData);
      setSuccess('Your account is ready. Taking you to sign in...');
      setTimeout(() => router.push('/login'), 1600);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-[#f1f3ed] px-5 py-14">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#dcebe1] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-[#f2e5ce] blur-3xl" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_25px_80px_rgba(30,55,40,.10)] md:grid-cols-[.9fr_1.1fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#173e32] p-10 text-white md:flex">
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full border border-white/10" />
          <Link href="/" className="relative inline-flex items-center gap-2 text-sm font-bold"><AcademicCapIcon className="h-7 w-7 text-[#e5c58f]" /> WorkshopHub</Link>
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#c5d8ca]">Make space to grow</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.08]">Your next chapter starts with a question.</h1>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[#c5d8ca]">Join a community of curious people building practical skills, one session at a time.</p>
          </div>
          <p className="relative text-xs text-[#a8c0b0]">Learn with purpose. Grow with people.</p>
        </div>
        <div className="p-7 sm:p-12 lg:p-14">
          <div className="mb-8 md:hidden"><Link href="/" className="inline-flex items-center gap-2 font-bold text-[#176b50]"><AcademicCapIcon className="h-7 w-7" /> WorkshopHub</Link></div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#176b50]">Join the community</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight text-[#17231f]">Create your account</h2>
          <p className="mt-3 text-sm leading-6 text-[#77827b]">A few details and you’ll be ready to book your first workshop.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && <div role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
            {success && <div role="status" className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</div>}
            <div><label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#34443a]">Full name</label><div className="relative"><UserIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b978e]" /><input id="name" type="text" name="name" required autoComplete="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} disabled={loading} placeholder="Your name" className="w-full rounded-xl border border-[#e1e6de] bg-[#fafbf8] py-3.5 pl-12 pr-4 text-sm outline-none focus:border-[#176b50] focus:ring-4 focus:ring-[#176b50]/10" /></div></div>
            <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#34443a]">Email address</label><div className="relative"><EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b978e]" /><input id="email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} disabled={loading} placeholder="you@example.com" className="w-full rounded-xl border border-[#e1e6de] bg-[#fafbf8] py-3.5 pl-12 pr-4 text-sm outline-none focus:border-[#176b50] focus:ring-4 focus:ring-[#176b50]/10" /></div></div>
            <div><label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#34443a]">Password</label><div className="relative"><LockClosedIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b978e]" /><input id="password" type="password" name="password" required minLength={6} autoComplete="new-password" value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} disabled={loading} placeholder="At least 6 characters" className="w-full rounded-xl border border-[#e1e6de] bg-[#fafbf8] py-3.5 pl-12 pr-4 text-sm outline-none focus:border-[#176b50] focus:ring-4 focus:ring-[#176b50]/10" /></div></div>
            <button type="submit" disabled={loading || !!success} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#176b50] px-6 py-4 text-sm font-bold text-white shadow-md shadow-emerald-900/10 hover:-translate-y-0.5 hover:bg-[#10543e] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Creating your account...' : 'Create account'} {!loading && <ArrowRightIcon className="h-4 w-4" />}</button>
          </form>
          <p className="mt-7 text-center text-sm text-[#77827b]">Already have an account? <Link href="/login" className="font-bold text-[#176b50] hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
