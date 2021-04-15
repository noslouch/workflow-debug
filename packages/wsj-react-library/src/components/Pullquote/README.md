# Pullquote

`<Pullquote />` renders a `blockquote` containing `p` with content and optional `small` for citing an author. If an author is provided, an em dash will precede it. If quotes are detected within content, it will add curly quotes.

```js
Pullquote.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string,
};
```

### Example

```js
<Pullquote
  content="“In another 20 years, you’re not going to be wondering if you got a return. You’re wondering if there’s going to be a planet left for your great-grandchildren.”"
  author="Larry Cohen, CEO of Gates Ventures"
/>
```
