# ReadToME component

`<ReadToMe />` renders the article player which reads the article for the user, normally found below article tools.

```js
ReadToMe.propTypes = {
  sbid: PropTypes.string.isRequired,
  endpoint: PropTypes.string,
};

ReadToMe.defaultProps = {
  endpoint: 'https://video-api.wsj.com',
};
```

Last sync: Thu 3 June 2021
