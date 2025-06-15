
// Returns the subdomain or null if on root or www.
export const getSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null;
  const hostname = window.location.hostname;
  // Match localhost subdomain (admin.localhost, admin.127.0.0.1 or custom)
  const localRegex = /^([a-z0-9-]+)\.(localhost|127\.\d+\.\d+\.\d+)$/i;
  const prodRegex = /^([a-z0-9-]+)\./i;

  // Localhost with subdomain (admin.localhost or admin.127.0.0.1)
  const localMatch = hostname.match(localRegex);
  if (localMatch) {
    return localMatch[1];
  }
  // Non-localhost: any subdomain.yoursite.com
  const prodMatch = hostname.match(prodRegex);
  if (prodMatch) {
    const parts = hostname.split('.');
    if (parts.length >= 3 && parts[0] !== 'www') {
      return parts[0];
    }
  }
  return null;
};

export const isAdminSubdomain = (): boolean => {
  if (typeof window === "undefined") return false;
  const sub = getSubdomain();
  // Support admin.localhost, admin.127.0.0.1, admin.site.com, etc.
  return sub === 'admin';
};

export const redirectToMainDomain = () => {
  if (typeof window === 'undefined') return;
  const { protocol, hostname, port, pathname, search } = window.location;
  let newHost = hostname.replace(/^admin\./, '');
  if (/^admin\.(localhost|127\.\d+\.\d+\.\d+)$/.test(hostname)) {
    // admin.localhost → localhost; admin.127.0.0.1 → 127.0.0.1
    newHost = hostname.replace(/^admin\./, '');
  }
  window.location.replace(
    protocol +
      '//' +
      newHost +
      (port && !/^(80|443)$/.test(String(port)) ? ':' + port : '') +
      '/' +
      (pathname.startsWith('/admin') ? '' : pathname.slice(1)) +
      search
  );
};

export const redirectToAdminDomain = () => {
  if (typeof window === 'undefined') return;
  const { protocol, hostname, port, search } = window.location;
  let baseHost = hostname.replace(/^www\./, '').replace(/^admin\./, '');
  let adminHost: string;
  if (baseHost === 'localhost' || /^127\.\d+\.\d+\.\d+$/.test(baseHost)) {
    adminHost = `admin.${baseHost}${port ? ':' + port : ''}`;
  } else {
    adminHost = `admin.${baseHost}`;
  }
  window.location.replace(
    protocol + '//' + adminHost + '/admin' + search
  );
};
