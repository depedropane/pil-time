'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSkeleton } from '@/components/ui/Skeleton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ProfilePage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!loading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setFullName(user.user_metadata.full_name);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });

      if (error) throw error;

      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-gray-600 mt-1">Manage your admin account information</p>
      </div>

      {message && (
        <div className={`px-4 py-3 rounded-lg mb-6 border ${
          message.includes('successfully')
            ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
            />
            <p className="text-gray-500 text-sm mt-1">
              Email cannot be changed (this is your admin login)
            </p>
          </div>

          <Input
            label="Full Name"
            placeholder="Your Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <div className="pt-6 border-t border-gray-200 flex gap-3">
            <Button variant="ghost" className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={saving} className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Admin Information</h2>
        <p className="text-blue-700 mb-4">
          ✓ You are authorized as portfolio admin
        </p>
        <p className="text-blue-700 text-sm">
          You can manage projects, update your profile, and configure portfolio settings from the dashboard.
        </p>
      </div>
    </div>
  );
}
