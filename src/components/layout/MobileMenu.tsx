import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Target,
  User as UserIcon,
  CreditCard,
  MessageCircle,
  LogOut,
  Home,
  CheckCircle,
  MapPin,
  FileText,
  Info,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";

const publicLinks = [
  { path: "/", label: "Accueil", icon: Home },
  { path: "/qcm-citoyennete-francaise", label: "QCM", icon: BookOpen },
  { path: "/eligibility", label: "Éligibilité", icon: CheckCircle },
  { path: "/centres", label: "Centres d'examen", icon: MapPin },
  { path: "/livret-citoyen", label: "Livret", icon: FileText },
  { path: "/blog", label: "Blog", icon: Newspaper },
  { path: "/about", label: "À propos", icon: Info },
];

const userSpaceLinks = [
  { path: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { path: "/qcm-citoyennete-francaise", label: "QCM Civique", icon: BookOpen },
  { path: "/results", label: "Mes résultats", icon: BarChart3 },
  { path: "/objectives", label: "Mes objectifs", icon: Target },
];

const accountLinks = [
  { path: "/account", label: "Mon compte", icon: UserIcon },
  { path: "/account", label: "Mon abonnement", icon: CreditCard },
  { path: "/notifications", label: "Messages", icon: MessageCircle },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function MobileMenu({ isOpen, onClose, user }: MobileMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onClose();
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0 bg-background">
        <div className="flex flex-col h-full overflow-y-auto">
          {/* User Space Section (if authenticated) */}
          {user && (
            <div className="p-4 border-b border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                👤 Mon espace
              </h3>
              <nav className="space-y-1">
                {userSpaceLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.path + link.label}
                      onClick={() => handleNavigation(link.path)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left",
                        isActive(link.path) && link.label !== "QCM Civique"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-white hover:bg-accent",
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Site Navigation Section */}
          <div className="p-4 border-b border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">🌐 Site</h3>
            <nav className="space-y-1">
              {publicLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavigation(link.path)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left",
                      isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-white hover:bg-accent",
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Account Section (if authenticated) */}
          {user && (
            <div className="p-4 border-b border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                ⚙️ Mon compte
              </h3>
              <nav className="space-y-1">
                {accountLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.label + index}
                      onClick={() => handleNavigation(link.path)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left text-muted-foreground hover:text-white hover:bg-accent"
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  <span>Se déconnecter</span>
                </button>
              </nav>
            </div>
          )}

          {/* Sign In Button (if not authenticated) */}
          {!user && (
            <div className="p-4">
              <Button onClick={() => handleNavigation("/auth")} className="w-full">
                Se connecter
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
