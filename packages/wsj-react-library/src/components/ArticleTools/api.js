import wretch from 'wretch';

export const getArticleSaveStatus = async (baseURL, sbid) => {
  const url = `${baseURL}/saved-contents/by-content-id/${sbid}`;
  try {
    if (!sbid) throw new Error('no sbid');
    const result = await wretch(url)
      .options({ credentials: 'include', mode: 'cors' })
      .get()
      .json();
    return { res: result };
  } catch (err) {
    return { err };
  }
};

export const saveArticle = async (baseURL, sbid) => {
  const url = `${baseURL}/saved-contents`;
  try {
    const result = await wretch(url)
      .options({ credentials: 'include', mode: 'cors' })
      .post({ contentId: sbid })
      .json();
    // response returns back the article's sbid/contentId
    return { res: result && result.contentId };
  } catch (err) {
    return { err };
  }
};

export const removeArticle = async (baseURL, sbid) => {
  const url = `${baseURL}/saved-contents?contentId=${sbid}`;
  try {
    const result = await wretch(url)
      .options({ credentials: 'include', mode: 'cors' })
      .delete({ contentId: sbid })
      .json();
    // response returned should be number of user's remaining saved articles
    // response can be 0, which is falsey, so check for that as well
    return { res: result || result === 0 };
  } catch (err) {
    return { err };
  }
};
