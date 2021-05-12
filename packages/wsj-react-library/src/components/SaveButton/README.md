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
