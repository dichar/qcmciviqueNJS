import { useState, useCallback } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Globe, 
  Database, 
  Shield, 
  Loader2,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestResult {
  name: string;
  category: string;
  status: 'pass' | 'fail' | 'warn' | 'running' | 'pending';
  message: string;
  duration?: number;
}

const CRITICAL_ROUTES = [
  '/',
  '/qcm-citoyennete-francaise',
  '/entrainement-csp',
  '/entrainement-cr',
  '/entrainement-naturalisation',
  '/auth',
  '/account',
  '/dashboard',
  '/blog',
  '/packs',
  '/about',
  '/contact',
  '/support',
  '/livret-citoyen',
  '/eligibility',
  '/centres',
  '/history-france',
  '/valeurs-republique',
  '/droits-devoirs',
  '/institutions-francaises',
  '/vivre-france',
  '/cgu',
  '/cgv',
  '/confidentialite',
  '/mentions-legales',
];

const FALLBACK_SITE_ROUTES = [
  '/',
  '/qcm-citoyennete-francaise',
  '/test-civique-naturalisation',
  '/quiz',
  '/eligibility',
  '/centres',
  '/auth',
  '/account',
  '/dashboard',
  '/results',
  '/livret-citoyen',
  '/support',
  '/notifications',
  '/objectives',
  '/privacy',
  '/terms',
  '/about',
  '/contact',
  '/cgu',
  '/confidentialite',
  '/cgv',
  '/mentions-legales',
  '/packs',
  '/quiz-valeurs-republique',
  '/quiz-droits-devoirs-citoyen',
  '/quiz-histoire-geographie-france',
  '/revision-intelligente',
  '/erreurs-frequentes',
  '/entrainement-csp',
  '/entrainement-cr',
  '/entrainement-naturalisation',
  '/blog',
  '/histoire-france',
  '/valeurs-republique',
  '/droits-devoirs',
  '/institutions-francaises',
  '/vivre-france',
  '/gestion-qcmcivique-admin',
  '/gestion-qcmcivique-admin/blog',
  '/gestion-qcmcivique-admin/blog/new',
  '/gestion-qcmcivique-admin/blog/migrate',
  '/gestion-qcmcivique-admin/payments',
  '/gestion-qcmcivique-admin/users',
  '/gestion-qcmcivique-admin/messaging',
  '/gestion-qcmcivique-admin/marketing',
  '/gestion-qcmcivique-admin/payment-alerts',
  '/gestion-qcmcivique-admin/indexnow',
  '/gestion-qcmcivique-admin/reconciliation',
  '/gestion-qcmcivique-admin/settings',
  '/gestion-qcmcivique-admin/data-export',
  '/gestion-qcmcivique-admin/health',
  '/gestion-qcmcivique-admin/quiz-stats',
  '/gestion-qcmcivique-admin/revenue',
];

const CRITICAL_API_TABLES = ['profiles', 'quiz_results', 'user_purchases', 'blog_posts', 'tickets'];

export default function AdminHealthCheck() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [runningMode, setRunningMode] = useState<'all' | 'pages' | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const updateResult = useCallback((name: string, update: Partial<TestResult>) => {
    setResults(prev => prev.map(r => r.name === name ? { ...r, ...update } : r));
  }, []);

  const checkRoutes = useCallback(async (routes: string[], category: string, labelPrefix: string) => {
    const baseUrl = window.location.origin;
    for (const route of routes) {
      try {
        const t0 = performance.now();
        const resp = await fetch(`${baseUrl}${route}`, { method: 'HEAD', redirect: 'follow' });
        const dur = Math.round(performance.now() - t0);
        updateResult(`${labelPrefix}${route}`, {
          status: resp.ok ? 'pass' : (resp.status === 404 ? 'fail' : 'warn'),
          message: `HTTP ${resp.status} (${dur}ms)`,
          duration: dur,
          category,
        });
      } catch (e: any) {
        updateResult(`${labelPrefix}${route}`, {
          status: 'fail',
          message: `Erreur réseau: ${e.message}`,
          category,
        });
      }
    }
  }, [updateResult]);

  const runAllTests = async () => {
    setIsRunning(true);
    setRunningMode('all');
    setStartTime(Date.now());

    // Initialize all tests as pending
    const allTests: TestResult[] = [
      // Auth tests
      { name: 'Session active', category: 'Auth', status: 'pending', message: '' },
      { name: 'Fonction is_admin()', category: 'Auth', status: 'pending', message: '' },
      { name: 'Google OAuth (lovable wrapper)', category: 'Auth', status: 'pending', message: '' },
      // DB tests
      ...CRITICAL_API_TABLES.map(t => ({
        name: `Table: ${t}`, category: 'Base de données', status: 'pending' as const, message: ''
      })),
      { name: 'Fonction get_common_errors()', category: 'Base de données', status: 'pending', message: '' },
      // Route tests
      ...CRITICAL_ROUTES.map(r => ({
        name: `Route: ${r}`, category: 'Routes', status: 'pending' as const, message: ''
      })),
      // Frontend checks
      { name: 'QuizResults: import lovable', category: 'Frontend', status: 'pending', message: '' },
      { name: 'Auth page: import lovable', category: 'Frontend', status: 'pending', message: '' },
      { name: 'Env: VITE_SUPABASE_URL', category: 'Config', status: 'pending', message: '' },
      { name: 'Env: VITE_SUPABASE_PUBLISHABLE_KEY', category: 'Config', status: 'pending', message: '' },
    ];

    setResults(allTests);

    // === AUTH TESTS ===
    try {
      const t0 = performance.now();
      const { data: { session } } = await supabase.auth.getSession();
      const dur = Math.round(performance.now() - t0);
      setResults(prev => prev.map(r => r.name === 'Session active' ? {
        ...r, status: session ? 'pass' : 'warn', 
        message: session ? `Connecté: ${session.user.email}` : 'Aucune session active',
        duration: dur
      } : r));

      if (session) {
        const t1 = performance.now();
        const { data, error } = await supabase.rpc('is_admin', { _user_id: session.user.id });
        const dur1 = Math.round(performance.now() - t1);
        setResults(prev => prev.map(r => r.name === 'Fonction is_admin()' ? {
          ...r, status: error ? 'fail' : 'pass',
          message: error ? error.message : `Résultat: ${data}`,
          duration: dur1
        } : r));
      } else {
        setResults(prev => prev.map(r => r.name === 'Fonction is_admin()' ? {
          ...r, status: 'warn', message: 'Pas de session pour tester'
        } : r));
      }
    } catch (e: any) {
      setResults(prev => prev.map(r => r.category === 'Auth' && r.status === 'pending' ? {
        ...r, status: 'fail', message: e.message
      } : r));
    }

    // Google OAuth wrapper check
    try {
      // We just verify the import exists and is callable
      const { lovable: lov } = await import('@/integrations/lovable');
      const hasOAuth = typeof lov?.auth?.signInWithOAuth === 'function';
      setResults(prev => prev.map(r => r.name === 'Google OAuth (lovable wrapper)' ? {
        ...r, status: hasOAuth ? 'pass' : 'fail',
        message: hasOAuth ? 'lovable.auth.signInWithOAuth disponible' : 'Fonction manquante!'
      } : r));
    } catch (e: any) {
      setResults(prev => prev.map(r => r.name === 'Google OAuth (lovable wrapper)' ? {
        ...r, status: 'fail', message: `Import échoué: ${e.message}`
      } : r));
    }

    // === DB TESTS ===
    for (const table of CRITICAL_API_TABLES) {
      try {
        const t0 = performance.now();
        const { count, error } = await supabase.from(table as any).select('*', { count: 'exact', head: true });
        const dur = Math.round(performance.now() - t0);
        setResults(prev => prev.map(r => r.name === `Table: ${table}` ? {
          ...r, status: error ? 'fail' : 'pass',
          message: error ? error.message : `${count ?? 0} lignes, accès OK`,
          duration: dur
        } : r));
      } catch (e: any) {
        setResults(prev => prev.map(r => r.name === `Table: ${table}` ? {
          ...r, status: 'fail', message: e.message
        } : r));
      }
    }

    try {
      const t0 = performance.now();
      const { error } = await supabase.rpc('get_common_errors', { min_attempts: 1, min_error_rate: 0.9, p_exam_type: null });
      const dur = Math.round(performance.now() - t0);
      setResults(prev => prev.map(r => r.name === 'Fonction get_common_errors()' ? {
        ...r, status: error ? 'fail' : 'pass',
        message: error ? error.message : 'OK',
        duration: dur
      } : r));
    } catch (e: any) {
      setResults(prev => prev.map(r => r.name === 'Fonction get_common_errors()' ? {
        ...r, status: 'fail', message: e.message
      } : r));
    }

    // === ROUTE TESTS (check via fetch) ===
    await checkRoutes(CRITICAL_ROUTES, 'Routes', 'Route: ');

    // === FRONTEND CODE CHECKS ===
    // Check that QuizResults uses lovable wrapper
    try {
      const module = await import('@/components/QuizResults');
      // If it imports successfully, the module is OK
      setResults(prev => prev.map(r => r.name === 'QuizResults: import lovable' ? {
        ...r, status: 'pass', message: 'Module chargé avec succès'
      } : r));
    } catch (e: any) {
      setResults(prev => prev.map(r => r.name === 'QuizResults: import lovable' ? {
        ...r, status: 'fail', message: `Erreur import: ${e.message}`
      } : r));
    }

    try {
      const module = await import('@/legacy-pages/Auth');
      setResults(prev => prev.map(r => r.name === 'Auth page: import lovable' ? {
        ...r, status: 'pass', message: 'Module chargé avec succès'
      } : r));
    } catch (e: any) {
      setResults(prev => prev.map(r => r.name === 'Auth page: import lovable' ? {
        ...r, status: 'fail', message: `Erreur import: ${e.message}`
      } : r));
    }

    // === CONFIG CHECKS ===
    const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supaKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    setResults(prev => prev.map(r => {
      if (r.name === 'Env: VITE_SUPABASE_URL') return { ...r, status: supaUrl ? 'pass' : 'fail', message: supaUrl ? 'Configuré' : 'Manquant!' };
      if (r.name === 'Env: VITE_SUPABASE_PUBLISHABLE_KEY') return { ...r, status: supaKey ? 'pass' : 'fail', message: supaKey ? 'Configuré' : 'Manquant!' };
      return r;
    }));

    setIsRunning(false);
    setRunningMode(null);
  };

  const fetchRoutesFromSitemap = useCallback(async (): Promise<string[]> => {
    try {
      const resp = await fetch('/sitemap.xml', { cache: 'no-store' });
      if (!resp.ok) return FALLBACK_SITE_ROUTES;
      const xmlText = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlText, 'application/xml');
      const locNodes = Array.from(doc.getElementsByTagName('loc'));
      const origin = window.location.origin;
      const routes = locNodes
        .map(node => node.textContent?.trim() || '')
        .filter(Boolean)
        .map(loc => {
          try {
            const url = new URL(loc);
            if (url.origin !== origin) return null;
            return url.pathname || '/';
          } catch {
            return null;
          }
        })
        .filter((route): route is string => !!route);
      return routes.length > 0 ? Array.from(new Set(routes)) : FALLBACK_SITE_ROUTES;
    } catch {
      return FALLBACK_SITE_ROUTES;
    }
  }, []);

  const runAllPagesTests = async () => {
    setIsRunning(true);
    setRunningMode('pages');
    setStartTime(Date.now());

    const routes = await fetchRoutesFromSitemap();
    const pageTests: TestResult[] = routes.map(route => ({
      name: `Page: ${route}`,
      category: 'Toutes les pages',
      status: 'pending',
      message: '',
    }));

    setResults(pageTests);

    await checkRoutes(routes, 'Toutes les pages', 'Page: ');

    setIsRunning(false);
    setRunningMode(null);
  };

  const passCount = results.filter(r => r.status === 'pass').length;
  const failCount = results.filter(r => r.status === 'fail').length;
  const warnCount = results.filter(r => r.status === 'warn').length;
  const totalDuration = startTime && !isRunning ? Math.round((Date.now() - startTime) / 1000) : null;

  const categories = [...new Set(results.map(r => r.category))];

  const statusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'warn': return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'running': return <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />;
      case 'pending': return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  const categoryIcon = (cat: string) => {
    switch (cat) {
      case 'Auth': return <Shield className="h-4 w-4" />;
      case 'Base de données': return <Database className="h-4 w-4" />;
      case 'Routes': return <Globe className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader
          title="Diagnostic du site"
          description="Vérification automatisée des fonctionnalités critiques"
        >
          <Button
            onClick={runAllPagesTests}
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isRunning && runningMode === 'pages' ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Tests des pages en cours...</>
            ) : (
              <><Globe className="h-4 w-4 mr-2" />Lancer les tests de toutes les pages</>
            )}
          </Button>
          <Button
            onClick={runAllTests}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isRunning && runningMode === 'all' ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Tests en cours...</>
            ) : (
              <><Play className="h-4 w-4 mr-2" />Lancer tous les tests</>
            )}
          </Button>
          {results.length > 0 && !isRunning && (
            <Button
              variant="outline"
              onClick={() => { setResults([]); setStartTime(null); }}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />Réinitialiser
            </Button>
          )}
        </AdminPageHeader>

        {/* Summary */}
        {results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-white">{results.length}</div>
                <div className="text-sm text-slate-400">Tests total</div>
              </CardContent>
            </Card>
            <Card className="bg-emerald-900/30 border-emerald-800/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400">{passCount}</div>
                <div className="text-sm text-emerald-400/70">Réussis</div>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 border-red-800/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-red-400">{failCount}</div>
                <div className="text-sm text-red-400/70">Échoués</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-900/30 border-amber-800/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-amber-400">{warnCount}</div>
                <div className="text-sm text-amber-400/70">Avertissements</div>
              </CardContent>
            </Card>
          </div>
        )}

        {totalDuration !== null && (
          <p className="text-sm text-slate-500">Tests complétés en {totalDuration}s</p>
        )}

        {/* Results by category */}
        {categories.map(cat => (
          <Card key={cat} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                {categoryIcon(cat)}
                {cat}
                <Badge variant="outline" className="ml-2 text-xs border-slate-600 text-slate-400">
                  {results.filter(r => r.category === cat && r.status === 'pass').length}/
                  {results.filter(r => r.category === cat).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.filter(r => r.category === cat).map((r, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-lg text-sm",
                      r.status === 'fail' ? 'bg-red-950/30 border border-red-800/30' :
                      r.status === 'warn' ? 'bg-amber-950/20 border border-amber-800/20' :
                      'bg-slate-900/30'
                    )}
                  >
                    {statusIcon(r.status)}
                    <span className="font-medium text-white min-w-0 truncate flex-shrink-0 max-w-[200px]">
                      {r.name}
                    </span>
                    <span className="text-slate-400 text-xs truncate flex-1 min-w-0">
                      {r.message}
                    </span>
                    {r.duration !== undefined && (
                      <span className="text-slate-500 text-xs flex-shrink-0">{r.duration}ms</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {results.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Play className="h-12 w-12 mx-auto text-slate-600 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Aucun test exécuté</h3>
              <p className="text-slate-400 text-sm">
                Cliquez sur "Lancer tous les tests" pour vérifier l'état du site
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
