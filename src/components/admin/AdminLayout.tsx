import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  BarChart3,
  CreditCard, 
  Users, 
  AlertTriangle,
  TrendingUp,
  LogOut,
  Settings,
  FileText,
  Shield,
  Menu,
  Mail,
  Database,
  Megaphone,
  ChevronRight,
  X,
  Globe,
  HeartPulse
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/gestion-qcmcivique-admin', label: 'Dashboard', icon: LayoutDashboard, description: 'Vue d\'ensemble' },
  { path: '/gestion-qcmcivique-admin/revenue', label: 'Revenus & ventes', icon: TrendingUp, description: 'Courbes & tendances' },
  { path: '/gestion-qcmcivique-admin/quiz-stats', label: 'Stats QCM', icon: BarChart3, description: 'Types & performance' },
  { path: '/gestion-qcmcivique-admin/blog', label: 'Blog', icon: FileText, description: 'Articles & CMS' },
  { path: '/gestion-qcmcivique-admin/payments', label: 'Paiements', icon: CreditCard, description: 'Transactions' },
  { path: '/gestion-qcmcivique-admin/users', label: 'Utilisateurs', icon: Users, description: 'Gestion comptes' },
  { path: '/gestion-qcmcivique-admin/messaging', label: 'Messagerie', icon: Mail, description: 'Tickets support' },
  { path: '/gestion-qcmcivique-admin/marketing', label: 'Marketing', icon: Megaphone, description: 'Campagnes email' },
  { path: '/gestion-qcmcivique-admin/payment-alerts', label: 'Alertes paiements', icon: AlertTriangle, description: 'Anomalies détectées' },
  { path: '/gestion-qcmcivique-admin/indexnow', label: 'Indexation', icon: Globe, description: 'IndexNow SEO' },
  { path: '/gestion-qcmcivique-admin/data-export', label: 'Data & Export', icon: Database, description: 'Export données' },
  { path: '/gestion-qcmcivique-admin/reconciliation', label: 'Réconciliation', icon: Settings, description: 'Vérification paiements' },
  { path: '/gestion-qcmcivique-admin/settings', label: 'Paramètres', icon: Settings, description: 'Configuration' },
  { path: '/gestion-qcmcivique-admin/health', label: 'Diagnostic', icon: HeartPulse, description: 'Tests du site' },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAdmin, loading, error } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast.success('Déconnexion réussie');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <Shield className="absolute inset-0 m-auto h-6 w-6 text-primary" />
          </div>
          <p className="text-slate-400 mt-4 text-sm font-medium">Vérification des droits...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Accès refusé</h1>
          <p className="text-slate-400 mb-6">Vous devez être connecté pour accéder à cette page.</p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  // Not admin - 403 Forbidden
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">403 - Accès interdit</h1>
          <p className="text-slate-400 mb-6">
            Vous n'avez pas les droits nécessaires pour accéder à cette page.
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Erreur</h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  const userInitial = user.email?.charAt(0).toUpperCase() || 'A';

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-white">QCM Admin</span>
              <p className="text-xs text-slate-500">Back-office</p>
            </div>
          </div>
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-slate-800 group-hover:bg-slate-700'
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-medium text-sm truncate">{item.label}</span>
                  <span className={cn(
                    "block text-xs truncate",
                    isActive ? 'text-white/70' : 'text-slate-500'
                  )}>
                    {item.description}
                  </span>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                )} />
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3 mb-3 px-2">
          <Avatar className="h-10 w-10 border-2 border-slate-700">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white text-sm font-bold">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">{user.email}</p>
            <p className="text-xs text-slate-500">Administrateur</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  );

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* SEO - noIndex for all admin pages */}
      <SEO 
        title="Administration – QCM Civique"
        description="Back-office d'administration QCM Civique"
        noIndex={true}
      />
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 z-50 flex items-center px-4 gap-4">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 border-slate-800 bg-transparent">
            <SidebarContent onClose={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white">QCM Admin</span>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 border-r border-slate-800 z-50">
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
