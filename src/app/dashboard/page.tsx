'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSkeleton } from '@/components/ui/Skeleton';

export default function DashboardPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      router.push('/login');
    }

    // Redirect if not admin
    if (!loading && user && !isAdmin) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your portfolio projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Admin Status</h3>
          <p className="text-3xl font-bold text-blue-600">✓ Authorized</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Portfolio Status</h3>
          <p className="text-3xl font-bold text-green-600">Active</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/dashboard/projects"
            className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Manage Projects
            </h3>
            <p className="text-gray-600">
              Create, edit, and delete projects in your portfolio
            </p>
          </a>
          <a
            href="/dashboard/profile"
            className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Edit Profile
            </h3>
            <p className="text-gray-600">
              Update your profile information
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
