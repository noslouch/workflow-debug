# Headline

`<Headline />` renders a section heading styled according to our design system.

| Size          | Component |
| ------------- | --------- |
| xxl (default) | h1        |
| xl            | h2        |
| l             | h3        |
| m             | h4        |
| s             | h5        |
| xs            | h6        |
| xxs           | h6        |

```js
Headline.propTypes = {
  size: PropTypes.oneOf(['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs']),
  type: PropTypes.oneOf(['standard', 'opinion', 'features', 'magazine']),
}

Headline.defaultProps = {
  size: 'xxl',
  type: 'standard',
}
```

### Example

```js
<Headline size="l">Headline Standard News L</Headline>
```
