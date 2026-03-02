import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, BarChart3, Instagram, Facebook, LayoutDashboard, Bell, Settings, BookOpen, Target, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { UserMenu } from "@/components/UserMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

// TikTok icon component (not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const Navigation = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate("/");
  };

  // Public header links (Level 1)
  const navLinks = [
    { path: "/", label: t("nav.home"), highlight: false },
    { path: "/qcm-citoyennete-francaise", label: "QCM", highlight: true },
    { path: "/eligibility", label: t("nav.eligibility"), highlight: false },
    { path: "/centres", label: t("nav.centers"), highlight: false },
    { path: "/livret-citoyen", label: "Livret", highlight: false },
    { path: "/blog", label: "Blog", highlight: false },
    { path: "/about", label: t("nav.about"), highlight: false },
  ];

  // User sidebar items (Level 2) - only for logged-in users
  const userSidebarItems = [
    { path: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { path: "/qcm-citoyennete-francaise", label: "QCM Civique", icon: BookOpen },
    { path: "/results", label: "Mes résultats", icon: BarChart3 },
    { path: "/objectives", label: "Mes objectifs", icon: Target },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg md:text-xl text-primary hover:text-primary/80 transition-colors"
          >
            <img src="/assets/logo.png" alt="QCM Civique Logo" className="h-8 w-8" />
            <span>QCM Civique</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
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
                    "bg-primary text-primary-foreground font-semibold px-3 py-1.5 rounded-full hover:bg-primary/90 hover:scale-105 shadow-md",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Social Media, Language Switcher, Theme Toggle & User Menu */}
          <div className="hidden md:flex items-center gap-2">
            {/* Social Media Links */}
            <div className="flex items-center gap-1 mr-2">
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
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1 border-t">
            {/* Section: Site (public) */}
            <div className="px-3 py-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">🌐 Site</p>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium transition-all",
                  isActive(link.path) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                  link.highlight && !isActive(link.path) && "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* User sections */}
            {user ? (
              <>
                {/* Section: Mon espace (user features) */}
                <div className="pt-3 mt-3 border-t">
                  <div className="px-3 py-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">👤 Mon espace</p>
                  </div>
                  {userSidebarItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive(item.path) 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Section: Mon compte (account settings) */}
                <div className="pt-3 mt-3 border-t">
                  <div className="px-3 py-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">⚙️ Mon compte</p>
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive("/account") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <User className="w-4 h-4" />
                    Mon compte
                  </Link>
                  <Link
                    to="/account"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted"
                  >
                    <CreditCard className="w-4 h-4" />
                    Mon abonnement
                  </Link>
                  <Link
                    to="/notifications"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive("/notifications") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Bell className="w-4 h-4" />
                    Messages
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("account.signOut")}
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-3 mt-3 border-t">
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <User className="w-4 h-4" />
                  {t("auth.signIn")}
                </Link>
              </div>
            )}

            {/* Social Media Links - Mobile */}
            <div className="flex items-center justify-center gap-4 pt-4 mt-4 border-t">
              <a
                href="https://www.instagram.com/qcmcivique"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@qcmcivique"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/qcmcivique"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
