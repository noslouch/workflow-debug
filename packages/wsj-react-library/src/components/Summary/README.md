# Summary

`<Summary />` renders a paragraph "dek" styled according to our design system.

```js
Summary.propTypes = {
  size: PropTypes.oneOf(['m', 's']),
  bullet: PropTypes.bool,
}

Summary.defaultProps = {
  size: 'm',
  bullet: false,
}
```

### Example

```js
<Summary>Summary M</Summary>
```
