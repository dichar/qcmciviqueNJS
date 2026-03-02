import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MainHeader } from "./MainHeader";
import { UserSidebar } from "./UserSidebar";
import { MobileMenu } from "./MobileMenu";
import { Footer } from "./Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

// Pages where the sidebar should be shown for authenticated users
const SIDEBAR_PAGES = ["/dashboard", "/results", "/objectives", "/account"];

interface UnifiedLayoutProps {
  children: ReactNode;
}

export function UnifiedLayout({ children }: UnifiedLayoutProps) {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if current page should show sidebar
  const shouldShowSidebar = user && SIDEBAR_PAGES.some(page => 
    location.pathname === page || location.pathname.startsWith(page + "/")
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Always visible */}
      <MainHeader 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Sidebar - Only on specific pages for authenticated users (Desktop) */}
        {shouldShowSidebar && (
          <UserSidebar className="hidden lg:flex sticky top-16 h-[calc(100vh-4rem)]" />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Footer - Always visible */}
      <Footer />

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}
