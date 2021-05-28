import wretch from 'wretch';
import getDomain from '../environment';

export default function getShareUrlWithToken(url) {
  const payload = { url };
  return wretch(`${getDomain()}/emailthis/share-url`)
    .options({ credentials: 'include', mode: 'cors' })
    .accept('application/json')
    .content('application/json')
    .post(payload)
    .json((body) => {
      if (body && body.shareUrl) {
        return body.shareUrl;
        // eslint-disable-next-line no-else-return
      } else {
        throw new Error('Could not successfully generate share URL');
      }
    });
}
