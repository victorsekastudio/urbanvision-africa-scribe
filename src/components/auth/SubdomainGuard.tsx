
import { useEffect } from 'react';
import { isAdminSubdomain, redirectToAdminDomain } from '@/utils/subdomainUtils';
import { useLocation } from 'react-router-dom';

interface SubdomainGuardProps {
  children: React.ReactNode;
}

export const SubdomainGuard = ({ children }: SubdomainGuardProps) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const isOnAdminSubdomain = isAdminSubdomain();
    
    console.log('🌐 SUBDOMAIN GUARD: Checking subdomain access', {
      currentPath,
      isOnAdminSubdomain,
      hostname: window.location.hostname
    });

    // If trying to access /admin but not on admin subdomain, redirect
    if (currentPath.startsWith('/admin') && !isOnAdminSubdomain) {
      console.log('🔄 SUBDOMAIN GUARD: Redirecting to admin subdomain');
      redirectToAdminDomain();
      return;
    }

    // If on admin subdomain but not accessing admin routes, redirect to main domain
    if (isOnAdminSubdomain && !currentPath.startsWith('/admin') && currentPath !== '/auth') {
      console.log('🔄 SUBDOMAIN GUARD: On admin subdomain but accessing non-admin route, redirecting');
      redirectToAdminDomain();
      return;
    }
  }, [location.pathname]);

  return <>{children}</>;
};
