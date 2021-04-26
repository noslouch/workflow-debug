/* global Coral, window, document */
import wretch from 'wretch';

import initAnalytics from './coral-tracking';

const getCoralToken = async (baseURL, canComment) => {
  if (canComment) {
    const response = await wretch(`${baseURL}api/v1/auth/dj/token`)
      .options({
        credentials: 'include',
      })
      .get()
      .res();

    if (!response.ok) {
      return { token: null };
    }
    return response.json();
  }
  return { token: null };
};

const loadCoralLib = (url) => {
  return new Promise((resolve, reject) => {
    // check first if Coral has been set
    if (!window.Coral) {
      const embedCoralScript = document.createElement('script');
      embedCoralScript.type = 'text/javascript';
      embedCoralScript.src = url;
      embedCoralScript.onload = resolve;
      embedCoralScript.onerror = reject;
      document.body.appendChild(embedCoralScript);
    } else {
      resolve();
    }
  });
};

export const initCoral = async ({
  node,
  baseURL,
  loginURL,
  articleId,
  isAdmin,
  canComment,
}) => {
  const libraryUrl = `${baseURL}/static/embed.js`;
  const coralEndpoint = new URL(baseURL);

  if (isAdmin) {
    coralEndpoint.hostname = `admin.${coralEndpoint.hostname}`;
  }

  const [response] = await Promise.all([
    getCoralToken(coralEndpoint.href, canComment),
    loadCoralLib(libraryUrl),
  ]);

  Coral.Talk.render(node, {
    talk: coralEndpoint.href,
    auth_token: canComment ? response.token : null,
    events(_events) {
      _events.on('action.SHOW_SIGNIN_DIALOG', () => {
        window.location.href = `${loginURL}?target=${encodeURIComponent(
          `${window.location.href}#coral_toggle_${articleId}`
        )}`;
      });
      initAnalytics(_events);
    },
  });
};

// used to get value of commentId
export const getParameterByName = (name, url) => {
  const params = new URL(url || window.location.href).searchParams;
  return params.get(name);
};
