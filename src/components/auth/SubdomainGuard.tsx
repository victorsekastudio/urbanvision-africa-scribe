import { useEffect } from 'react';
import { isAdminSubdomain, redirectToAdminDomain, redirectToMainDomain } from '@/utils/subdomainUtils';
import { useLocation } from 'react-router-dom';

interface SubdomainGuardProps {
  children: React.ReactNode;
}

export const SubdomainGuard = ({ children }: SubdomainGuardProps) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const isOnAdminSubdomain = isAdminSubdomain();

    console.log('🌐 SUBDOMAIN GUARD DEBUG:', {
      currentPath,
      isOnAdminSubdomain,
      hostname: window.location.hostname
    });

    // If accessing /admin on MAIN domain → redirect to admin subdomain
    if (currentPath.startsWith('/admin') && !isOnAdminSubdomain) {
      console.log('🔄 Redirecting to admin subdomain for /admin path');
      redirectToAdminDomain();
      return;
    }

    // If on admin subdomain and not accessing /admin route → redirect to main domain
    // (exception: allow /auth for admin login, e.g. /auth for password-reset)
    if (isOnAdminSubdomain && !(currentPath.startsWith('/admin') || currentPath.startsWith('/auth'))) {
      console.log('🔄 On admin subdomain but not at /admin or /auth; redirecting to main domain');
      redirectToMainDomain();
      return;
    }
  }, [location.pathname]);

  return <>{children}</>;
};
