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

/**
 * Tries to redirect and shows fallback or prompt if redirect fails.
 * @param url string
 */
const robustRedirect = (url: string) => {
  let redirected = false;
  try {
    // Feature detection for window.location.replace
    if (typeof window !== 'undefined' && typeof window.location.replace === 'function') {
      // Show loading overlay
      showRedirectLoadingOverlay();
      window.location.replace(url);
      redirected = true;
      // Retry check: after 2s, if still here, show fallback prompt.
      setTimeout(() => {
        if (!redirected || (window.location.href === url)) {
          showRedirectErrorOverlay(url);
        }
      }, 2000);
    } else {
      // Replace not available, fallback to location.assign
      window.location.assign(url);
      redirected = true;
    }
  } catch (e) {
    // On error, show fallback UI
    showRedirectErrorOverlay(url);
  }
};

/**
 * Displays a minimal overlay indicating a redirect in progress
 */
function showRedirectLoadingOverlay() {
  removeRedirectOverlays();
  const overlay = document.createElement('div');
  overlay.id = '__uv_redirect_loading';
  overlay.style.cssText = `
    position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;
    background:rgba(255,255,255,0.7);display:flex;flex-direction:column;align-items:center;justify-content:center;
    font-size:1.25rem;color:#111;
  `;
  overlay.innerHTML = `
    <div style="margin-bottom:16px;">
      <svg style="animation:spin 1s linear infinite" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#6c63ff" stroke-width="4" opacity="0.15"/>
        <path d="M22 12a10 10 0 0 1-10 10" stroke="#6c63ff" stroke-width="4"/>
        <style>
          @keyframes spin{100%{transform:rotate(360deg);}}
          svg{display:inline-block;}
        </style>
      </svg>
    </div>
    <div>Redirecting, please wait...</div>
  `;
  document.body.appendChild(overlay);
}

/**
 * If redirect fails, show overlay with manual suggestion.
 */
function showRedirectErrorOverlay(targetUrl: string) {
  removeRedirectOverlays();
  const overlay = document.createElement('div');
  overlay.id = '__uv_redirect_error';
  overlay.style.cssText = `
    position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;
    background:rgba(255,255,255,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;
    font-size:1.25rem;color:#c00;
    text-align:center;
  `;
  overlay.innerHTML = `
    <div style="font-size:2rem;margin-bottom:8px;">⚠️</div>
    <div>We were unable to redirect you automatically.<br/>
    Please click below to continue:</div>
    <button id="uv-redirect-btn" style="
      margin-top:24px;padding:12px 28px;font-size:1rem;background:#4f46e5;color:white;
      border:none;border-radius:4px;cursor:pointer;box-shadow:0 2px 5px 0 #e0e7ff;">
      Go to correct site
    </button>
  `;
  document.body.appendChild(overlay);
  const btn = document.getElementById('uv-redirect-btn');
  if (btn) {
    btn.onclick = () => {
      window.location.assign(targetUrl);
    };
  }
}

/** Helper to clear overlays if they exist */
function removeRedirectOverlays() {
  const loading = document.getElementById('__uv_redirect_loading');
  const error = document.getElementById('__uv_redirect_error');
  if (loading) loading.remove();
  if (error) error.remove();
}

/** 
 * Redirect to main domain with full state preserved.
 * Also now preserves hash fragment.
 * Robust: If redirect fails, shows fallback.
 */
export const redirectToMainDomain = () => {
  if (typeof window === 'undefined') return;
  const { protocol, hostname, port, pathname, search, hash } = window.location;
  let newHost = hostname.replace(/^admin\./, '');
  if (/^admin\.(localhost|127\.\d+\.\d+\.\d+)$/.test(hostname)) {
    // admin.localhost → localhost; admin.127.0.0.1 → 127.0.0.1
    newHost = hostname.replace(/^admin\./, '');
  }
  // Construct final url, including hash
  const url =
    protocol +
    '//' +
    newHost +
    (port && !/^(80|443)$/.test(String(port)) ? ':' + port : '') +
    '/' +
    (pathname.startsWith('/admin') ? '' : pathname.slice(1)) +
    search +
    (hash ?? '');
  robustRedirect(url);
};

/** 
 * Redirect to admin domain with full state preserved.
 * Also now preserves hash fragment.
 * Robust: If redirect fails, shows fallback.
 */
export const redirectToAdminDomain = () => {
  if (typeof window === 'undefined') return;
  const { protocol, hostname, port, pathname, search, hash } = window.location;
  let baseHost = hostname.replace(/^www\./, '').replace(/^admin\./, '');
  let adminHost: string;
  if (baseHost === 'localhost' || /^127\.\d+\.\d+\.\d+$/.test(baseHost)) {
    adminHost = `admin.${baseHost}${port ? ':' + port : ''}`;
  } else {
    adminHost = `admin.${baseHost}`;
  }
  // Always route to /admin + preserve query/hash
  const url = protocol + '//' + adminHost + '/admin' + search + (hash ?? '');
  robustRedirect(url);
};
