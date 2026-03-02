import { ReactNode } from "react";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <UnifiedLayout>
      {children}
    </UnifiedLayout>
  );
}
