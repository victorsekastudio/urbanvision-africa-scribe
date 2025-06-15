
import { useEffect } from 'react';
import { isAdminSubdomain, redirectToAdminDomain, redirectToMainDomain } from '@/utils/subdomainUtils';
import { useLocation } from 'react-router-dom';

/**
 * Enforces split between main domain (public site) and admin subdomain.
 * - All `/admin` access MUST be on admin subdomain. Redirects from main domain.
 * - Any non-/admin route on admin subdomain is redirected to main domain (except `/auth` for admin login only).
 */
interface SubdomainGuardProps {
  children: React.ReactNode;
}

export const SubdomainGuard = ({ children }: SubdomainGuardProps) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const onAdminSubdomain = isAdminSubdomain();

    console.log('[SubdomainGuard]', { currentPath, onAdminSubdomain, hostname: window.location.hostname });

    // If /admin route accessed from main domain, FORCE redirect to admin subdomain
    if (currentPath.startsWith('/admin') && !onAdminSubdomain) {
      console.log('[SubdomainGuard] Redirecting to admin subdomain for /admin route');
      redirectToAdminDomain();
      return;
    }

    // If on admin subdomain but accessing anything OTHER THAN /admin* or /auth*
    // NOTE: restrict admin subdomain to ONLY /admin and /auth routes
    if (onAdminSubdomain && !(currentPath.startsWith('/admin') || currentPath.startsWith('/auth'))) {
      console.log('[SubdomainGuard] On admin subdomain, but route not allowed; redirecting to main domain');
      redirectToMainDomain();
      return;
    }
  }, [location.pathname]);

  return <>{children}</>;
};
