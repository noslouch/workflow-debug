# Box component

The box component is a container that contains multiple properties such as borders, margin, padding, space, layout and color. It's main purpose is to create the design and layout of our pages.

### Here are some examples of the usage of the `Box` component

1. Regular:

   ```html
   <Box>Some content</Box>
   ```

2. Box with padding:

   ```html
   <Box padding="5px">Some content with padding in all sides</Box>
   <Box p="{2}">Some content with constrained padding in all sides</Box>
   <Box pt="5px">Some content with padding top</Box>
   <Box paddingBottom="5px">Some content with padding bottom</Box>
   ```

3. Box with margin:

   ```html
   <Box margin="5px">Some content with margin in all sides</Box>
   <Box m="{2}"> Some content with constrained margin in all sides </Box>
   <Box mr="5px">Some content with right margin</Box>
   <Box marginLeft="5px">Some content with left margin</Box>
   ```

4. Box with color and bg:

   ```html
   <Box color="tomato" backgroundColor="blue"> Some content with color and backgroundColor </Box>
   <Box bg="blue">Some content with backgroundColor</Box>
   ```

5. Box with border:

   ```html
   <Box border="5px solid red">Some content with border</Box>
   <Box borderStyle="solid" borderRadius="25px"> Some content with backgroundColor </Box>
   ```

6. Box with flexbox:

```html
<Box my="5px" p="5px" display="flex" justifyContent="space-between">
  <div>Some</div>
  <div>Nested Items</div>
</Box>
```

The `space` and `backgroundColor` props have a shorthand version. See [Reference Table](https://styled-system.com/table#space) for more information.
