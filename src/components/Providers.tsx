"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import { AuthCallback } from "@/components/AuthCallback";
import { useServiceWorkerUpdate } from "@/hooks/useServiceWorkerUpdate";

const ServiceWorkerUpdater = () => {
  useServiceWorkerUpdate();
  return null;
};

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <ServiceWorkerUpdater />
            <Toaster />
            <Sonner />
            <AuthCallback>
              <FeedbackDialog />
              <PWAInstallPrompt />
              {children}
            </AuthCallback>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
