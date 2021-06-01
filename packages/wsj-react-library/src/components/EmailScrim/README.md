# EmailScrim

`<EmailScrim />` renders a the email dialog that displays when accessed from the shared tools if a user is logged in.

## Props

```js
EmailScrim.propTypes = {
  articleURL: PropTypes.string,
  author: PropTypes.string.isRequired, // should not include "By "
  emailDialogOpen: PropTypes.bool,
  id: PropTypes.string.isRequired, // guid for video or sbid for articles
  headline: PropTypes.string,
  renderMobile: PropTypes.bool,
  setEmailDialogOpen: PropTypes.func,
  source: PropTypes.string.isRequired,
  summary: PropTypes.string,
  template: PropTypes.string.isRequired, // can be 'wsj_video' for video or a template name
  thumbnailURL: PropTypes.string,
  userEmail: PropTypes.string,
};

EmailScrim.defaultProps = {
  articleURL: '',
  emailDialogOpen: null,
  headline: '',
  renderMobile: false,
  setEmailDialogOpen: null,
  summary: '',
  thumbnailURL: 'https://ore.wsj.net/fp/assets/images/ico/WSJ_facebook.png',
  userEmail: '',
};
```

### Example

See the EmailScrim component in Storybook
