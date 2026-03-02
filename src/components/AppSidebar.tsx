import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { usePurchaseStatus } from "@/hooks/usePurchaseStatus";
import { PaymentGate } from "@/components/PaymentGate";
import {
  Home,
  BookOpen,
  Trophy,
  Target,
  User,
  LogOut,
  Crown,
  Lock,
  Flame,
  Star,
  Zap,
} from "lucide-react";

interface Objective {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  icon: React.ElementType;
  reward: string;
}

// User sidebar items (Level 2) - only user-specific features
const menuItems = [
  { title: "Tableau de bord", url: "/dashboard", icon: Home },
  { title: "QCM Civique", url: "/qcm-citoyennete-francaise", icon: BookOpen },
  { title: "Mes Résultats", url: "/results", icon: Trophy },
  { title: "Mes Objectifs", url: "/objectives", icon: Target },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const { hasFullAccess, packType } = usePurchaseStatus();
  const [user, setUser] = useState<any>(null);
  const [quizCount, setQuizCount] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [showPaymentGate, setShowPaymentGate] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: results } = await supabase
          .from("quiz_results")
          .select("score, total_questions")
          .eq("user_id", session.user.id);

        if (results) {
          setQuizCount(results.length);
          const best = results.reduce((max, r) => {
            const pct = Math.round((r.score / r.total_questions) * 100);
            return pct > max ? pct : max;
          }, 0);
          setBestScore(best);
        }
      }
    };

    fetchUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const newObjectives: Objective[] = [
      {
        id: "first_quiz",
        title: "Premier pas",
        description: "Terminer votre premier QCM",
        target: 1,
        current: Math.min(quizCount, 1),
        icon: Zap,
        reward: "🎯 Badge Débutant",
      },
      {
        id: "five_quizzes",
        title: "Régularité",
        description: "Compléter 5 QCM",
        target: 5,
        current: Math.min(quizCount, 5),
        icon: Flame,
        reward: "🔥 Badge Assidu",
      },
      {
        id: "score_80",
        title: "Excellence",
        description: "Obtenir 80% ou plus",
        target: 80,
        current: bestScore,
        icon: Star,
        reward: "⭐ Badge Expert",
      },
      {
        id: "ten_quizzes",
        title: "Maîtrise",
        description: "Compléter 10 QCM",
        target: 10,
        current: Math.min(quizCount, 10),
        icon: Crown,
        reward: "👑 Badge Maître",
      },
    ];
    setObjectives(newObjectives);
  }, [quizCount, bestScore]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleNavigation = (url: string) => {
    navigate(url);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const completedObjectives = objectives.filter(o => o.current >= o.target).length;
  const totalProgress = objectives.length > 0 
    ? Math.round((completedObjectives / objectives.length) * 100) 
    : 0;

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-border">
        <SidebarHeader className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">
              QCM Civique
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          {/* Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:sr-only">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      onClick={() => handleNavigation(item.url)}
                      className="cursor-pointer"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Quick Objectives Overview */}
          {user && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Objectifs
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 space-y-3">
                  {/* Overall Progress */}
                  <div 
                    className="bg-muted/50 rounded-lg p-3 cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleNavigation("/objectives")}
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">Progression globale</span>
                      <span>{completedObjectives}/{objectives.length}</span>
                    </div>
                    <Progress value={totalProgress} className="h-2" />
                    <p className="text-[10px] text-muted-foreground mt-1 text-center">
                      Cliquez pour voir tous les objectifs
                    </p>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Pack Status */}
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Mon abonnement
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3">
                {hasFullAccess ? (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Crown className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-medium">
                        {packType === 'PREMIUM_PLUS' ? 'Premium Plus' : 
                         packType === 'REUSSITE' ? 'Pack Réussite' : 'Pack Essentiel'}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Accès complet aux fonctionnalités
                    </p>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs font-medium">Mode essai</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-2">
                      2 quiz d'essai disponibles
                    </p>
                    <Button
                      size="sm"
                      className="w-full h-7 text-xs"
                      onClick={() => setShowPaymentGate(true)}
                    >
                      Voir les offres
                    </Button>
                  </div>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3 border-t border-border">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-2 py-1 group-data-[collapsible=icon]:justify-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                  <p className="text-xs font-medium truncate">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 group-data-[collapsible=icon]:p-2"
                  onClick={() => handleNavigation("/account")}
                >
                  <User className="w-4 h-4" />
                  <span className="ml-2 text-xs group-data-[collapsible=icon]:hidden">Mon compte</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group-data-[collapsible=icon]:p-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              className="w-full"
              onClick={() => handleNavigation("/auth")}
            >
              <User className="w-4 h-4" />
              <span className="ml-2 group-data-[collapsible=icon]:hidden">Se connecter</span>
            </Button>
          )}
        </SidebarFooter>
      </Sidebar>

      {showPaymentGate && (
        <PaymentGate 
          onClose={() => setShowPaymentGate(false)} 
          isClosable={true}
          redirectOnClose={location.pathname}
        />
      )}
    </>
  );
}
