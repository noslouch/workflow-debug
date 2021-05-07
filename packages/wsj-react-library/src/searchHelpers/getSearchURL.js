/*
  Shared function to get search url for search button in header.
  Used in WSJHeader and SlimlineHeader
 */

const LANG_PATH = {
  'asia,cn': '/zh-hans',
  'asia,cn_hant': '/zh-hant',
};

const getSearchURL = (region = 'na,us', domain, keywords) => {
  // Later on we'll remove this if else, and use the new search url for all region
  const basePath = region.startsWith('asia,cn')
    ? `https://${domain}${LANG_PATH[region]}`
    : `https://${domain}`;

  return `${basePath}/search?query=${encodeURIComponent(
    keywords
  )}&mod=searchresults_viewallresults`;
};

export default getSearchURL;
