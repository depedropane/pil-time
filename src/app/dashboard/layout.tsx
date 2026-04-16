import { DashboardNavbar } from '@/components/shared/DashboardNavbar';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 ml-64 pt-20">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
