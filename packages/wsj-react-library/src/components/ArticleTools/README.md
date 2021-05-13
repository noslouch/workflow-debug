# Article Tools

# `<PrintButton />`

## Default Behavior

The Print Button opens the browser's print dialog to print the current article.

## Implementation

The Print Button should render as part of the Article Tools implemented within an article layout. In standard articles, the Print Button should only display on browser screens that are 980px or wider. It should be the first tool item displayed if a user is logged out, second if a user is logged in.

# `<SaveButton />`

```js
SaveButton.propTypes = {
  sbid: PropTypes.string.isRequired,
  baseURL: PropTypes.string,
};

SaveButton.defaultProps = {
  baseURL: 'https://www.s.dev.wsj.com/articles/svc/personalization',
};
```

### Example

```js
<SaveButton sbid="SB12140738439335043595204587449112906534498" />
```

### Purpose

To indicate an article's save status (component assumes the user is logged in, and the logic determining whether or nor the component should render will be done outside of `<SaveButton />`).

### Notes

- `SaveButton.test.js` uses a mocked network request

## Latest Sync with Web-UI

Wednesday, April 28, 2021
