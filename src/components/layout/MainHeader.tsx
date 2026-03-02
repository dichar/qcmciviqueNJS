import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { useUnreadNotifications } from "@/hooks/useUnreadNotifications";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { 
  User as UserIcon, 
  CreditCard, 
  MessageCircle,
  LogOut,
  Shield,
  Menu,
  X,
  Instagram,
  Facebook
} from "lucide-react";

// TikTok icon component (not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const publicNavLinks = [
  { path: "/", label: "Accueil", highlight: false },
  { path: "/qcm-citoyennete-francaise", label: "QCM", highlight: true },
  { path: "/eligibility", label: "Éligibilité", highlight: false },
  { path: "/centres", label: "Centres d'examen", highlight: false },
  { path: "/livret-citoyen", label: "Livret", highlight: false },
  { path: "/blog", label: "Blog", highlight: false },
  { path: "/about", label: "À propos", highlight: false },
];

const userSidebarItems = [
  { path: "/dashboard", label: "Tableau de bord", icon: "🏠" },
  { path: "/qcm-citoyennete-francaise", label: "QCM Civique", icon: "📘" },
  { path: "/results", label: "Mes résultats", icon: "📊" },
  { path: "/objectives", label: "Mes objectifs", icon: "🎯" },
];

interface MainHeaderProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function MainHeader({ onMobileMenuToggle, isMobileMenuOpen }: MainHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { unreadCount } = useUnreadNotifications();
  const { isAdmin, loading: adminLoading } = useAdminAuth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMobileMenuToggle}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-lg md:text-xl text-primary hover:text-primary/80 transition-colors">
              <img src="/assets/logo.png" alt="QCM Civique" className="h-8 w-8" />
              <span className="hidden sm:inline">QCM Civique</span>
            </Link>
          </div>

          {/* Center: Public Navigation (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-6">
            {publicNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-all duration-300",
                  isActive(link.path)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground hover:text-primary",
                  link.highlight &&
                    !isActive(link.path) &&
                    "bg-primary text-primary-foreground font-semibold px-3 py-1.5 rounded-full hover:bg-primary/90 hover:scale-105 shadow-md"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Social Media, Theme, Language, Avatar */}
          <div className="flex items-center gap-2">
            {/* Social Media Links - Desktop only */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              <a
                href="https://www.instagram.com/qcmcivique"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted-foreground hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@qcmcivique"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/qcmcivique"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted-foreground hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            
            <ThemeToggle />
            <LanguageSwitcher />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.user_metadata?.avatar_url}
                        alt={user.user_metadata?.full_name || user.email}
                      />
                      <AvatarFallback>
                        {(user.user_metadata?.full_name || user.email)?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">
                        {user.user_metadata?.full_name || user.user_metadata?.name || "Utilisateur"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Mon compte
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Mon abonnement
                    </Link>
                  </DropdownMenuItem>
                  {!adminLoading && isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/gestion-qcmcivique-admin" className="w-full">
                        <Shield className="mr-2 h-4 w-4" />
                        Backoffice
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/notifications")} className="relative">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Messages
                    {unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-auto h-5 min-w-5 px-1.5 text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate("/auth")} size="sm">
                Se connecter
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export { publicNavLinks, userSidebarItems };
