# Storybook
[Storybook](https://storybook.js.org/) is a tool for developing UI components in isolation. **All component must have corresponding Storybook stories**. These are some conventions and best practices we follow.

## Purpose of Storybook
The biggest benefits for using Storybook are:
- make it easier to develop UI components by providing an environment where one can preview the component in isolation
- let users of the UI library preview the features and props for each component before deciding to use it

___

## Create examples of each variation of a component.
Use your judgment in deciding what combinations of props are important for illustrating all the possible and likely variations of a component. Some examples might be:

- A `Button` component with a story for the `Primary` button, and another for the `Secondary` button
- A `Slideshow` component with stories for no images, 1 image, 10 images, and images with different aspect ratios
- An `Image` component with stories for an image with an error, a typical image, and an image with an unusual aspect ratio

In general, you will be adding a single `*.stories.js` file for each component. [See how to add Storybook stories here](https://storybook.js.org/docs/react/writing-docs/docs-page).

___

## Write Documentation for Props
Storybook automatically generates a `Table` with a list of all props, as well as their description and default values. This information is generated from the `propTypes` definitions, as well as specially formatted comments. 

For example, a component with this documentation:

```js
Foo.propTypes = {
  /**
   Checks if the component should be disabled
  */
  disabled: PropTypes.bool.isRequired,
  /**
  The display content of the component
  */
  content: PropTypes.string.isRequired,
};

Foo.defaultProps = {
  disabled: false
};
```

Will generate a table that looks like this:

| Name     | Description                             | Default |
|----------|-----------------------------------------|---------|
| disabled | Checks if the button should be disabled | false   |
| content* | The display content of the button       | -       |

[See more information about `ArgsTable` here](https://storybook.js.org/docs/react/writing-docs/doc-blocks#argstable).

___

## Consider the use of Storybook add-ons and mixins
Once the basic documentation is in place, consider the use of add-ons or mixins to enhance the documentation further.

- The `Docs` add-on provides ways to customize the documentation with your own text or components, or even create standalone documentation pages
- The `Action` add-on can be used to display data received by event handler (callback) arguments in your stories
- The [`Storysource`](https://www.npmjs.com/package/@storybook/addon-storysource) add-on will display a panel with the source code for each story
- The `Controls` add-on can be used to give users a graphical UI to interact with a component's arguments dynamically
- And more!

[See more information about add-ons](https://storybook.js.org/docs/react/essentials/introduction) and search through [all available add-ons](https://storybook.js.org/addons).

___

## Link Storybook to the Design System documentation on DSM
[WSJ uses InVision DSM to document the Design System as a whole](https://dowjones.invisionapp.com/dsm/dow-jones/wsj). Whenever a new component is added, make sure that it has a valid `in-dsm` value. 

```js
Foo.story = {
  parameters: {
    'in-dsm': {
      id: '123udhkhkaewasi' // this ID comes from the component's DSM page, usually created by the design team
    }
  }
}
```

[See more information about configuring DSM here](https://support.invisionapp.com/hc/en-us/articles/360028510211).

