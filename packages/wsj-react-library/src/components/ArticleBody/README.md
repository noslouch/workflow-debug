# Article Body

The article body component renders a full article body when provided with the body array from an article's capi. It uses a mix of content platform flags, like amp, and a render prop to allow for full customization depending on the rendering context.

| Prop        | Description                                                                                                                                                                                                                                                                                                                                                | Type     | Default   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| data        | An [article body array](https://github.com/newscorp-ghfb/dj-capi-schema/blob/master/src/capi-v1/components/Domain/Models/Response/Articles/ArticleData.yaml#L43) from capi, where each array item is a valid [block](https://github.com/newscorp-ghfb/dj-capi-schema/blob/master/src/capi-v1/components/Domain/Models/BaseContentModels/BaseContent.yaml). | Array    | []        |
| isAmp       | Flag that determines whether it's rendering content for an AMP page.                                                                                                                                                                                                                                                                                       | Boolean  | false     |
| renderBlock | [Render prop](https://reactjs.org/docs/render-props.html) that allows overrides to the renderer.                                                                                                                                                                                                                                                           | Function | undefined |

## Components

Components make up the different blocks that can exist in an article body. They are plain React components with no extra or special props. They can be divided into two categories:

1. Native: These components are basically a 1:1 representation of a native DOM element but styled according to our design system. (Example: Paragraph, Link, List, etc.);
2. Story Components: These are more dynamic and engaging components that usually require more complex logic and might take different props to change their behavior. Most times they will also need altered versions of themselves to work correctly across different platforms, like amp. (Example: Table of Contents, Dynamic Insets, etc.)

## Renderer

The renderer function is what brings all the pieces together and returns a nicely rendered article body, it is for all intents and purposes a `React` version of [`capi-converter`](https://github.dowjones.net/responsive/capi-converter).
Taking advantage of the fact that the `capi` article body is just an array of elements that may or may not have children each, and knowing that if the element has children they will be under the `content` array property, this recursive function loops through the available child components:

```js
const renderer = (array) => (
  array.map((block, index) => {
    ...
  })
);
```

Declares a `contents` variable, that will be assigned `renderer(content)` if `content` is available or default to the `text` property:

```js
const contents = (content && renderer(content, options)) || text;
```

Next, it will check if the `type` property has an available component and if so will return that component with our previously defined `contents` as its children props and any additional data from the element `capi` it may require, in some cases it may be more convenient to just pass the whole `element` object as props:

```js
const { has_drop_cap: hasDropCap, type } = block;
if (type === 'paragraph') return <Paragraph key={key} hasDropCap={hasDropCap}>{contents}</Paragraph>;
if (type === 'image') return <Image key={key} data={element} />;
...
```

If the current element has no type, but has a text property it returns plain text. If there are no type or text properties, it returns `null`:

```js
if (!type && text) return <Fragment key={key}>{text}</Fragment>;
return null;
```

## `renderBlock` render prop

The Article Body component by itself will usually have everything you need to fully render an article's body, however there may be cases when you need to customize parts of it, either by adding a nonexistent component, overriding an existing component for one that fits your needs, or simply skip a component from rendering. To do this you can use the `renderBlock` prop to pass a function to evaluate blocks and return a custom component, it will override existing types and if no type matches it will let the renderer work normally. To skip a component from rendering completely return `null` when checking for its type. `renderBlock` render functions take two arguments: `block` which is the full capi json for the current iterated block, and `index` which is the current index in the loop, and return jsx. Example:

```js
<ArticleBody
  data={body}
  renderBlock={(block, index) => {
    const { type, ...props } = block;
    // Add a component that does not have a default component for its matching capi block
    if (type === 'newsletter') return <Newsletter {...props} />;
    // Override an existing component with your custom one
    if (type === 'image') return <FancyImage {...props} />;
    // Skip a component from rendering
    if (type === 'table-of-contents') return null;
    // If no matching type found, it will pass rendering to the normal renderer
  }}
/>
```

## What about ads, newsletters, etc.?

We want to keep this component simple and pure, to focus mostly on article body related development, but we understand that we are also required to add monetization and marketing features that most times are out of our control and sometimes even knowledge.
Luckily, the render prop `renderBlock` allows you to pass a function to render custom blocks. Knowing this, you can preemptively add json objects to the body array that could translate into your custom components, and render them using the render prop function. For example:

```js
export default ArticlePage = (body) => {
  let transformedBody = [...body];
  // Transform your body array and add an object that can translate to your component
  transformedBody.splice(10, 0, { type: 'ad', props: { adType: 'foo' } });
  return (
    <ArticleBody
      data={transformedBody}
      renderBlock={(block) => {
        const { type, props } = block;
        if (type === 'ad') return <Ad {...props} />;
      }}
    />
  );
};
```

## Text Sizing

Text from components inside the article body should have the ability to change depending on the user system's font size and/or some of our text resizing tools (Like the Text Resize Article Tool).
To achieve this, you must make sure that the base font size for our html document is set to a percentage. In our case, since our base font size is 17px, and the default browser font size is 16px, we'd need to set it to 106.25%.
Knowing that our base font size is 17px, every component that has readable text can use this to set its font size in `rem` units, a unit whose value is relative to the font-size of the root element. (Example: If your base font size is 17px, 1 rem = 17px)

Additionally, we have set a text size scale css variable `--article-text-size-scale` that you can use along with rems to provide an alternative way of resizing text without having to go into the browsers settings. To do so, you can use the `calc` css function to multiply your base component text's font size times the scale variable:

```css
font-size: calc(1rem * var(--article-text-size-scale));
```

If you're unsure of what your font size's value should be relative to the root value, instead of setting a very long decimal value you should use the `calc` function to let it calculate the value for you:

```css
/* convert 14px to its rem equivalent */
font-size: calc(
  (14 / var(--base-font-size)) * var(--article-text-size-scale) * 1rem
);
```

In the above example, our targeted font size is 14px, so in order to get the desired rem value, we divide it by the base font size which is 17px, multiply it by the text size scale value, and then multiply it by 1rem to convert it to rem units.

For convenience, we have created a helper function that will take your desired pixel value as an input and will output the css property value required for this, so using it will only require you to import the function and using it inside your template css string:

```js
import fontSize from '../helpers/fonts/articleFontSize';

const myCss = css`
  font-size: ${fontSize(14)};
`;
```

For line heights, since we want to keep them unitless, we will divide their target pixel value (provided by designers) by the target (not base) font size. Following the above example, we're working with a target font size of 14px.

```css
/* convert 27px to its unitless equivalent */
line-height: calc(27 / 14);
```
