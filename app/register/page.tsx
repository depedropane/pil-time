'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration</h1>
        <p className="text-gray-600 mb-8">Admin account setup only</p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-blue-900 mb-4">
            🔐 <strong>Important:</strong> This is a personal portfolio application with admin-only management.
          </p>
          <p className="text-blue-700 text-sm mb-4">
            To create an admin account, please contact the portfolio owner directly.
          </p>
          <p className="text-blue-700 text-sm">
            Visitors can view the portfolio without registration or login.
          </p>
        </div>

        <Link href="/" className="block w-full">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Back to Portfolio
          </button>
        </Link>
      </div>
    </div>
  );
}
