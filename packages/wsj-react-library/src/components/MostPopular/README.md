# MostPopular

`<MostPopular />` renders a list of most popular news, most popular opinion, or recommended videos.

```js
MostPopular.propTypes = {
  type: PropTypes.oneOf(['news', 'opinion', 'videos']).isRequired,
  collection: PropTypes.arrayOf(
    PropTypes.shape({
      headline: PropTypes.string,
      url: PropTypes.string,
      image: PropTypes.string,
      // caption for alt of img tag
      caption: PropTypes.string,
    })
  ).isRequired,
};
```

### Example

```js
<MostPopular
  type="news"
  collection={[
    {
      headline: 'test1',
      url: 'https://www.wsj.com/',
      image: 'https://images.wsj.net/image1',
      caption: 'Planet earth',
    },
    {
      headline: 'test2',
      url: 'https://www.wsj.com/',
      image: 'https://images.wsj.net/image2',
      caption: 'Planet Mars',
    },
  ]}
/>
```
