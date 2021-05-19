# TableOfContents

`<TableOfContents />` renders a `nav` containing an `h2` and a `ul` with linked items

```js
TableOfContents.propTypes = {
  buttonText: PropTypes.string,
  collapseAfter: PropTypes.number,
  collapsedItemCount: PropTypes.number,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  forceExpand: PropTypes.bool,
  titleTag: PropTypes.elementType,
  titleText: PropTypes.string,
};

TableOfContents.defaultProps = {
  buttonText: 'Show All Sections',
  collapseAfter: 4,
  collapsedItemCount: 3,
  contents: [],
  forceExpand: false,
  titleTag: 'h2',
  titleText: 'Table Of Contents',
};
```

### Example

```js
<TableOfContents
  contents={[
    {
      id: 'section-1'
      text: 'section-1'
    },
    {
      id: 'section-2',
      text: 'section-2'
    },
    {
      id: 'section-3',
      text: 'section-3'
    }
  ]}
/>
```
