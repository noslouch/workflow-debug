export default function getDomain() {
  const qaEnvironment =
    window &&
    (window.location.host.indexOf('s.dev') >= 0 ||
      window.location.host.indexOf('local') >= 0);
  const wsjDomain = qaEnvironment
    ? 'https://www.s.dev.wsj.com'
    : 'https://www.wsj.com';
  return wsjDomain;
}
