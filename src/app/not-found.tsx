export const dynamic = "force-static";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen cyber-bg text-white">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl mb-8">Access Denied: Page Not Found</h2>
      <Link 
        href="/" 
        className="px-6 py-2 border border-red-500 hover:bg-red-500 transition-colors"
      >
        Return to Home Base
      </Link>
    </div>
  );
}