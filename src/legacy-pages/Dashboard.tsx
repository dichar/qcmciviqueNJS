import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { usePurchaseStatus } from "@/hooks/usePurchaseStatus";
import { useUnreadNotifications } from "@/hooks/useUnreadNotifications";
import { AppLayout } from "@/components/AppLayout";
import { SEO } from "@/components/SEO";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  Trophy, 
  Target,
  Bell, 
  User as UserIcon, 
  Crown,
  ChevronRight,
  Clock,
  CheckCircle,
  TrendingUp,
  FileText,
  MessageSquare,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    quizCount: 0,
    bestScore: 0,
    averageScore: 0,
    lastQuizDate: null as Date | null,
    unreadMessages: 0
  });
  
  const { packType, hasFullAccess, expiresAt, isExpired } = usePurchaseStatus();
  const { unreadCount } = useUnreadNotifications();

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      
      // Fetch quiz stats
      const { data: quizResults } = await supabase
        .from('quiz_results')
        .select('score, total_questions, created_at')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (quizResults && quizResults.length > 0) {
        const scores = quizResults.map(r => (r.score / r.total_questions) * 100);
        setStats({
          quizCount: quizResults.length,
          bestScore: Math.max(...scores),
          averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
          lastQuizDate: new Date(quizResults[0].created_at),
          unreadMessages: 0
        });
      }
      
      // Fetch unread messages count from unified tickets table
      const { count } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id)
        .eq('status', 'open');
      
      setStats(prev => ({ ...prev, unreadMessages: count || 0 }));
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const quickActions = [
    { icon: BookOpen, label: "Commencer un QCM", href: "/quiz", color: "bg-primary", highlight: true },
    { icon: Trophy, label: "Mes résultats", href: "/results", color: "bg-green-500" },
    { icon: FileText, label: "Livret du Citoyen", href: "/livret-citoyen", color: "bg-blue-500" },
    { icon: Target, label: "Test d'éligibilité", href: "/eligibility", color: "bg-purple-500" },
  ];

  const menuSections = [
    {
      title: "Préparation",
      items: [
        { icon: BookOpen, label: "QCM Principal", href: "/quiz", badge: "40 questions" },
        { icon: FileText, label: "Livret du Citoyen", href: "/livret-citoyen" },
        { icon: Target, label: "Test d'éligibilité", href: "/eligibility" },
        { icon: TrendingUp, label: "Mes objectifs", href: "/objectives" },
      ]
    },
    {
      title: "Mon compte",
      items: [
        { icon: Trophy, label: "Mes résultats", href: "/results", badge: stats.quizCount > 0 ? `${stats.quizCount} quiz` : undefined },
        { icon: Bell, label: "Messages", href: "/notifications", badge: unreadCount > 0 ? `${unreadCount}` : undefined, highlight: unreadCount > 0 },
        { icon: Settings, label: "Paramètres", href: "/account" },
      ]
    }
  ];

  return (
    <AppLayout>
      <SEO 
        title="Tableau de bord"
        description="Votre espace personnel QCM Civique. Suivez votre progression et accédez à toutes les fonctionnalités."
        canonical="/dashboard"
        noIndex={true}
      />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* User Header */}
        <Card className="mb-6 border-none bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url || undefined} 
                  alt={user?.user_metadata?.full_name || 'User'} 
                />
                <AvatarFallback className="text-xl bg-primary/10">
                  {(user?.user_metadata?.full_name || user?.email)?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold truncate">
                  Bonjour, {user?.user_metadata?.full_name?.split(' ')[0] || 'vous'} !
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  {hasFullAccess && packType ? (
                    <Badge className="bg-primary/90">
                      <Crown className="w-3 h-3 mr-1" />
                      {packType === 'PREMIUM_PLUS' ? 'Premium+' : packType === 'REUSSITE' ? 'Réussite' : 'Essentiel'}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Mode essai</Badge>
                  )}
                  {expiresAt && !isExpired && (
                    <span className="text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Expire le {expiresAt.toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        {stats.quizCount > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="text-center">
              <CardContent className="pt-4 pb-3">
                <div className="text-2xl font-bold text-primary">{stats.quizCount}</div>
                <div className="text-xs text-muted-foreground">Quiz passés</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-3">
                <div className="text-2xl font-bold text-green-600">{Math.round(stats.bestScore)}%</div>
                <div className="text-xs text-muted-foreground">Meilleur score</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-3">
                <div className="text-2xl font-bold text-blue-600">{Math.round(stats.averageScore)}%</div>
                <div className="text-xs text-muted-foreground">Moyenne</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Card */}
        {stats.quizCount > 0 && (
          <Card className="mb-6">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progression vers 80%</span>
                <span className="text-sm text-muted-foreground">{Math.round(stats.averageScore)}%</span>
              </div>
              <Progress value={Math.min(stats.averageScore / 80 * 100, 100)} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {stats.averageScore >= 80 
                  ? "🎉 Bravo ! Vous êtes prêt pour l'examen !" 
                  : `Il vous reste ${Math.round(80 - stats.averageScore)}% à atteindre`
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {quickActions.map((action) => (
            <Link key={action.href} to={action.href}>
              <Card className={`h-full transition-all hover:shadow-md hover:scale-[1.02] ${action.highlight ? 'border-primary/50 bg-primary/5' : ''}`}>
                <CardContent className="pt-4 pb-3 text-center">
                  <div className={`w-10 h-10 rounded-full ${action.color}/10 flex items-center justify-center mx-auto mb-2`}>
                    <action.icon className={`w-5 h-5 ${action.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <p className={`text-sm font-medium ${action.highlight ? 'text-primary' : ''}`}>{action.label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <Card key={section.title} className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y">
                {section.items.map((item) => (
                  <Link 
                    key={item.href} 
                    to={item.href}
                    className={cn(
                      "flex items-center justify-between py-3 hover:bg-muted/50 -mx-4 px-4 transition-colors",
                      (item as any).highlight && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5", (item as any).highlight ? "text-primary" : "text-muted-foreground")} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <Badge variant={(item as any).highlight ? "destructive" : "secondary"} className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* CTA for non-paying users */}
        {!hasFullAccess && (
          <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="pt-6 text-center">
              <Crown className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Passez au niveau supérieur</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Débloquez toutes les fonctionnalités avec un paiement unique
              </p>
              <Button onClick={() => navigate('/')} className="w-full">
                Voir les offres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
