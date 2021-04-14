export function setCookie(name, value, options = {}) {
  const defaultOptions = {
    expiresIn: 60 * 60 * 24 * 365,
    domain: '.wsj.com',
    path: '/',
  };

  const cookieOptions = { ...defaultOptions, ...options };

  document.cookie = `${name}=${encodeURIComponent(value)};domain=${cookieOptions.domain || '.wsj.com'};path=${
    cookieOptions.path || '/'
  };max-age=${cookieOptions.expiresIn}`;
}
