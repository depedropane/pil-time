'use client';

import { Button } from '@/components/ui/Button';
import { useAuth, logout } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Home } from 'lucide-react';

export function DashboardNavbar() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Portfolio
          </Link>
          {isAdmin && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Admin
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user?.email}</span>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Home size={18} />
                View Portfolio
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
