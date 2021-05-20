# Dek

`<Dek />` renders a h2 "dek" styled according to our design system.

```js
Dek.propTypes = {
  size: PropTypes.oneOf(['m', 's']),
};

Dek.defaultProps = {
  size: 'm',
};
```

### Example

```js
<Dek>Example Medium Dek</Dek>
<Dek size="s">Example Small Dek</Dek>

```
