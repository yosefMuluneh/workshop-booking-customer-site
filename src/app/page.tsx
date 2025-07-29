'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AcademicCapIcon } from '@heroicons/react/24/solid';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to workshops page after a brief delay
    const timer = setTimeout(() => {
      router.push("/workshops");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
          <AcademicCapIcon className="w-12 h-12 text-white animate-bounce" />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Welcome to WorkshopHub
        </h1>
        <p className="text-white/90 text-lg mb-8">
          Redirecting you to our amazing workshops...
        </p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
export default Page;