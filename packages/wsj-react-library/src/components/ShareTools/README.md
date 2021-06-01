# ShareTools

`<ShareTools />` renders a the WSJ share tools that displays to the left of article pages.

## Props

```js
ShareTools.propTypes = {
  articleURL: PropTypes.string,
  author: PropTypes.string.isRequired, // should not include "By "
  emailSharePath: PropTypes.string,
  freeArticle: PropTypes.bool,
  headline: PropTypes.string,
  id: PropTypes.string.isRequired, // guid for video or sbid for articles
  isLoggedIn: PropTypes.bool,
  shareTargets: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      baseURL: PropTypes.string,
    })
  ),
  seoId: PropTypes.string,
  shareURLWithToken: PropTypes.string,
  shouldEncodeEmailURL: PropTypes.bool,
  source: PropTypes.string.isRequired,
  summary: PropTypes.string,
  template: PropTypes.string.isRequired, // can be 'wsj_video' for video or a template name
  thumbnailURL: PropTypes.string,
  userEmail: PropTypes.string,
};

ShareTools.defaultProps = {
  emailSharePath: null,
  freeArticle: false,
  isLoggedIn: false,
  articleURL: '',
  headline: '',
  seoId: null,
  shareTargets: [
    {
      key: 'facebook',
      title: 'Facebook',
      baseURL: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
      key: 'twitter',
      title: 'Twitter',
      baseURL: 'https://twitter.com/intent/tweet?text=',
    },
    {
      key: 'linkedin',
      title: 'LinkedIn',
      baseURL: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    },
  ],
  shareURLWithToken: null,
  shouldEncodeEmailURL: false,
  summary: '',
  thumbnailURL: '',
  userEmail: '',
};
```

### Example

See the ShareTools component in Storybook
