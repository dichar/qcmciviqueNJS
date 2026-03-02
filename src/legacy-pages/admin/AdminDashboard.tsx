import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  FileText,
  MessageSquare,
  Clock,
  Zap
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DashboardStats {
  totalUsers: number;
  totalPurchases: number;
  totalRevenue: number;
  activeSubscriptions: number;
  quizResults: number;
  supportTickets: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
    quizResults: 0,
    supportTickets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch purchases count and revenue
        const { data: purchases, error: purchasesError } = await supabase
          .from('user_purchases')
          .select('*');

        if (purchasesError) throw purchasesError;

        const totalRevenue = purchases?.reduce((sum, p) => sum + Number(p.amount_paid), 0) || 0;
        const activeSubscriptions = purchases?.filter(p => {
          if (!p.expires_at) return true; // Lifetime
          return new Date(p.expires_at) > new Date();
        }).length || 0;

        // Fetch quiz results count
        const { count: quizCount, error: quizError } = await supabase
          .from('quiz_results')
          .select('*', { count: 'exact', head: true });

        if (quizError) throw quizError;

        // Fetch tickets count (new unified system)
        const { count: ticketsCount, error: ticketsError } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true });

        if (ticketsError) throw ticketsError;

        // Fetch profiles count (approximation of users)
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (usersError) throw usersError;

        setStats({
          totalUsers: usersCount || 0,
          totalPurchases: purchases?.length || 0,
          totalRevenue,
          activeSubscriptions,
          quizResults: quizCount || 0,
          supportTickets: ticketsCount || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm sm:text-base">Vue d'ensemble de la plateforme QCM Civique</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="h-4 w-4" />
            <span>Mis à jour {format(new Date(), 'HH:mm', { locale: fr })}</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-800/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                title="Utilisateurs"
                value={stats.totalUsers.toLocaleString()}
                description="Profils créés"
                icon={Users}
                gradient="blue"
              />
              <StatCard
                title="Paiements"
                value={stats.totalPurchases.toLocaleString()}
                description="Transactions totales"
                icon={CreditCard}
                gradient="green"
              />
              <StatCard
                title="Revenus"
                value={`${stats.totalRevenue.toFixed(2)}€`}
                description="Chiffre d'affaires total"
                icon={TrendingUp}
                gradient="cyan"
              />
              <StatCard
                title="Abonnements actifs"
                value={stats.activeSubscriptions.toLocaleString()}
                description="Accès valides"
                icon={Zap}
                gradient="amber"
              />
              <StatCard
                title="Quiz complétés"
                value={stats.quizResults.toLocaleString()}
                description="Résultats enregistrés"
                icon={FileText}
                gradient="purple"
              />
              <StatCard
                title="Tickets support"
                value={stats.supportTickets.toLocaleString()}
                description="Demandes de support"
                icon={MessageSquare}
                gradient="pink"
              />
            </div>

            {/* Revenue link */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Revenus & ventes</h2>
                <p className="text-slate-400 text-sm">Courbes de revenus quotidiens et évolution des ventes</p>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/gestion-qcmcivique-admin/revenue">Voir les courbes</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
