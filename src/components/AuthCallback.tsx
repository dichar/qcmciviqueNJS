"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/**
 * This component handles the OAuth callback hash fragment.
 * After Google OAuth, Supabase redirects with tokens in the URL hash (#access_token=...).
 * This component processes that hash and establishes the session.
 */
export const AuthCallback = ({ children }: { children: React.ReactNode }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();
  const hasAccessToken =
    typeof window !== "undefined" && window.location.hash.includes("access_token");

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check if there's a hash fragment with auth tokens
      const hash = window.location.hash;

      if (hash && (hash.includes("access_token") || hash.includes("error"))) {
        try {
          // Supabase will automatically pick up the hash and establish the session
          const { data, error } = await supabase.auth.getSession();

          if (error) {
            console.error("Auth callback error:", error);
          }

          if (data.session) {
            // Clean the URL hash and redirect to home
            window.history.replaceState(null, "", window.location.pathname);
            navigate("/", { replace: true });
            return;
          }
        } catch (error) {
          console.error("Error processing auth callback:", error);
        }
      }

      setIsProcessing(false);
    };

    handleAuthCallback();
  }, [navigate]);

  // Show a loading state while processing auth callback
  if (isProcessing && hasAccessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Connexion en cours...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
