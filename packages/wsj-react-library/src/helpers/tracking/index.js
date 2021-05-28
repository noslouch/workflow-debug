// eslint-disable-next-line consistent-return
export default function sendTracking(params, utagView = false) {
  const callType = utagView ? 'view' : 'link';
  const utagExists =
    typeof window !== 'undefined' && typeof window.utag !== 'undefined';
  if (!utagExists) return console.info('utag unavailable.');
  const shouldRequestIdleCallback = utagExists && window.requestIdleCallback;
  if (shouldRequestIdleCallback) {
    window.requestIdleCallback(
      () => {
        window.utag[callType](params);
      },
      { timeout: 2000 }
    );
  } else {
    window.utag[callType](params);
  }
}
