import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { RevenueChart } from '@/components/admin/RevenueChart';

export default function AdminRevenue() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader
          title="Revenus & ventes"
          description="Courbes de revenus quotidiens et évolution des ventes"
        />
        <RevenueChart />
      </div>
    </AdminLayout>
  );
}
