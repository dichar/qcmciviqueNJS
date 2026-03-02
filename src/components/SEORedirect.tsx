import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SEORedirectProps {
  to: string;
}

/**
 * SEO-friendly redirect component
 * Performs a client-side redirect while maintaining SEO best practices
 * For true 301 redirects, this should be paired with server-side configuration
 */
export const SEORedirect = ({ to }: SEORedirectProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Preserve query params and hash if any
    const searchParams = location.search;
    const hash = location.hash;
    const targetUrl = `${to}${searchParams}${hash}`;
    
    // Replace current history entry (equivalent to 301 behavior for SPA)
    navigate(targetUrl, { replace: true });
  }, [navigate, to, location.search, location.hash]);

  // Show nothing during redirect
  return null;
};
