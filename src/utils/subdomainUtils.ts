export const getSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // Allow both admin.localhost and admin.yoursite.com, and fallback for /admin on localhost.
  if (hostname === 'localhost' || hostname.startsWith('127.')) {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      return 'admin';
    }
    return null;
  }

  // Production: e.g., admin.yoursite.com, www.yoursite.com, yoursite.com
  if (parts.length >= 3) {
    // admin.domain.tld
    return parts[0];
  } else if (parts.length === 2) {
    // domain.tld (no subdomain)
    return null;
  }
  return null;
};

export const isAdminSubdomain = (): boolean => {
  if (typeof window === "undefined") return false;
  return getSubdomain() === "admin";
};

export const redirectToMainDomain = () => {
  if (typeof window === 'undefined') return;
  
  const { protocol, hostname, port } = window.location;
  // Remove 'admin.' if it exists
  let destination = hostname;
  if (destination.startsWith('admin.')) {
    destination = destination.replace('admin.', '');
  }
  // Maintain port in local dev
  window.location.href =
    protocol +
    '//' +
    destination +
    (port && hostname.includes('localhost') ? ':' + port : '') +
    '/';
};

export const redirectToAdminDomain = () => {
  if (typeof window === 'undefined') return;

  const { protocol, hostname, port, pathname, search } = window.location;

  // Already on admin subdomain
  if (hostname.startsWith('admin.')) {
    // Avoid adding "admin." again
    return;
  }

  let baseHost = hostname;
  // If already on a subdomain (e.g., www.domain.com), replace with admin. (catches www)
  if (baseHost.startsWith('www.')) {
    baseHost = baseHost.replace(/^www\./, '');
  }

  let dest = `admin.${baseHost}`;
  let full =
    protocol +
    '//' +
    dest +
    (port && hostname.includes('localhost') ? ':' + port : '') +
    '/admin'; // always direct root to /admin

  // Retain /admin path+query from main domain, if applicable
  if (pathname.startsWith('/admin')) {
    full += pathname.replace('/admin', '') + search;
  }

  window.location.href = full;
};
