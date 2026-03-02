import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { PaymentDiscrepanciesAlert } from '@/components/admin/PaymentDiscrepanciesAlert';

export default function AdminPaymentAlerts() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader
          title="Alertes paiements"
          description="Anomalies de paiement détectées et en attente de traitement"
        />
        
        <PaymentDiscrepanciesAlert />
      </div>
    </AdminLayout>
  );
}
