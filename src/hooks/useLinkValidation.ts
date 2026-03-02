import { useEffect } from 'react';
import { logLinkValidation } from '@/utils/linkValidator';

/**
 * Hook to validate all links on the current page in development mode
 * Add to any page component to get warnings about broken links
 */
export function useLinkValidation() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // Wait for DOM to be ready
      const timeoutId = setTimeout(() => {
        logLinkValidation();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, []);
}
