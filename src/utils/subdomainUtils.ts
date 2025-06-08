
export const getSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // For localhost development, check for admin prefix
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      return 'admin';
    }
    return null;
  }
  
  // For production, check actual subdomain
  if (parts.length >= 3) {
    const subdomain = parts[0];
    if (subdomain === 'admin') {
      return 'admin';
    }
  }
  
  return null;
};

export const isAdminSubdomain = (): boolean => {
  return getSubdomain() === 'admin';
};

export const redirectToMainDomain = () => {
  if (typeof window === 'undefined') return;
  
  const hostname = window.location.hostname;
  
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    window.location.href = `${window.location.protocol}//${hostname.replace('admin.', '')}${window.location.port ? ':' + window.location.port : ''}`;
  } else {
    const mainDomain = hostname.replace('admin.', '');
    window.location.href = `${window.location.protocol}//${mainDomain}`;
  }
};

export const redirectToAdminDomain = () => {
  if (typeof window === 'undefined') return;
  
  const hostname = window.location.hostname;
  
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    window.location.href = `${window.location.protocol}//${hostname}${window.location.port ? ':' + window.location.port : ''}/admin`;
  } else {
    const adminDomain = hostname.startsWith('admin.') ? hostname : `admin.${hostname}`;
    window.location.href = `${window.location.protocol}//${adminDomain}`;
  }
};
