
// Improved subdomain detection: production and localhost now handled consistently.
export const getSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null;
  const hostname = window.location.hostname;

  // Simulate subdomains locally with admin.localhost or admin.127.0.0.1
  if (
    hostname === 'localhost' ||
    hostname.startsWith('127.') ||
    hostname === '0.0.0.0'
  ) {
    // Use admin.localhost or admin.127.0.0.1 for subdomain testing locally!
    return null; // Main domain for "localhost" base (no subdomain)
  }

  const parts = hostname.split('.');
  // E.g. admin.yoursite.com, parts = [admin, yoursite, com]
  if (parts.length >= 3) {
    return parts[0];
  }
  return null; // Production main domain (yoursite.com or www.yoursite.com)
};

export const isAdminSubdomain = (): boolean => {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname;
  // For local development, 'admin.localhost' or 'admin.127.0.0.1' (allow both)
  return (
    hostname.startsWith('admin.') ||
    hostname === 'admin.localhost' ||
    hostname === 'admin.127.0.0.1'
  );
};

export const redirectToMainDomain = () => {
  if (typeof window === 'undefined') return;
  const { protocol, hostname, port } = window.location;
  let destination = hostname;
  // Remove 'admin.' prefix if present
  if (destination.startsWith('admin.')) {
    destination = destination.replace('admin.', '');
  }
  window.location.href =
    protocol +
    '//' +
    destination +
    (port && (hostname.includes('localhost') || hostname.includes('127.')) ? ':' + port : '') +
    '/';
};

export const redirectToAdminDomain = () => {
  if (typeof window === 'undefined') return;
  const { protocol, hostname, port, pathname, search } = window.location;
  // Already on admin subdomain
  if (
    hostname.startsWith('admin.') ||
    hostname === 'admin.localhost' ||
    hostname === 'admin.127.0.0.1'
  ) {
    return;
  }

  let baseHost = hostname;
  if (baseHost.startsWith('www.')) {
    baseHost = baseHost.replace(/^www\./, '');
  }
  let adminHost = `admin.${baseHost}`;
  // Localhost-specific override for easier dev
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
    adminHost = 'admin.localhost' + (port ? ':' + port : '');
  }
  let full =
    protocol +
    '//' +
    adminHost +
    '/admin'; // Always direct to /admin root
  // Retain querystring for smoother dev experience
  if (pathname !== '/' && search) {
    full += search;
  }
  window.location.href = full;
};
