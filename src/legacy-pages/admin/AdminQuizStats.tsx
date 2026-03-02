import { AdminLayout } from '@/components/admin/AdminLayout';
import { QuizTypeStats } from '@/components/admin/QuizTypeStats';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export default function AdminQuizStats() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader
          title="Statistiques par Type de QCM"
          description="Analyse détaillée des performances par type d'examen."
        />
        <QuizTypeStats />
      </div>
    </AdminLayout>
  );
}
