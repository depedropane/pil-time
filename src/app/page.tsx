import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import PortfolioProjects from '@/components/PortfolioProjects';

async function getAdmin() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: admin } = await supabase
      .from('admin')
      .select('id')
      .eq('admin_id', user.id)
      .single();

    return admin ? user : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const admin = await getAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Portfolio
          </Link>
          <div className="flex gap-4">
            {admin ? (
              <>
                <span className="text-gray-600 self-center">{admin.email}</span>
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              </>
            ) : (
              <Link href="/login">
                <Button>Admin Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            My Portfolio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Welcome to my personal portfolio. Below you can see all of my projects
            and work that I've been proud of.
          </p>
        </div>

        {/* Projects Grid */}
        <PortfolioProjects isAdmin={!!admin} />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 My Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
