# Breadcrumbs

- `<Breadcrumbs>` renders a `nav` with a `ul` that contains `li` elements that act as "breadcrumbs" above headlines on WSJ pages.
- Can also include a "flashline" (typically for "WSJ News Exclusive")
  - `isRecent` makes the flashline red, `isExclusive` adds the icon. Both default to true as it is the most common scenario on wsj.com, but will not do anything if no flashline is provided
- Adds a JSON-LD Schema

_Important to note the definition of breadcrumbs is wide and varies by product and region. In this case, a breadcrumb refers to a link for an article/section type._

```js
Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object).isRequired,
  flashline: PropTypes.string,
  isExclusive: PropTypes.bool,
  isRecent: PropTypes.bool,
};

Breadcrumbs.defaultProps = {
  flashline: '',
  isExclusive: true,
  isRecent: true,
};
```

### Example

```js
<Breadcrumbs
  breadcrumbs={[{ label: 'U.S.', url: 'https://www.wsj.com/news/us' }]}
  flashline="WSJ News Exclusive"
/>
```
