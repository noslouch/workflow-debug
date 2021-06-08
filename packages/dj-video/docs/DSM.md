# Invision DSM

## `.dsmrc`

To publish to DSM, first you must setup a `.dsmrc` file.

Get a `.dsmrc` and access token [as explained in the invision DSM docs](https://support.invisionapp.com/hc/en-us/articles/360028510211)

`.dsmrc` is added to `.gitignore` to exclude it from commits and keep the token safe.

## Adding a storybook story to DSM

DSM provides a point-and-click interface editor for adding and organizing new components.

### Add a Page

Folders and pages are in the left-hand sidebar.

![image](./docs/assets/dsm-sidebar.png)

Generally, each component variant has its own page. The structure is decided on a component-by-component basis in coordination with design.

### Add a Tab

DSM organizes pages using tabs. To add a new component to DSM, add a corresponding page, then click `Add tab... > Storybook > React`.

![image](./docs/assets/dsm-tab.png)

### Get the ID

That new tab will display an id that you will use to connect storybook stories to that tab. Copy the value.

![image](./docs/assets/dsm-integration.png)

### Add the ID

In your storybook story, add the DSM id as a parameter under `'in-dsm'`:

![image](./docs/assets/dsm-story.png)

You can associate multiple stories with a single tab by adding the id to the stories you want to group together.

### Publish

Then, finally (_finally_), you can publish the changes to DSM:

```sh
yarn run dsm-storybook:publish
```

The full DSM docs on this topic are [here](https://support.invisionapp.com/hc/en-us/articles/360028692651).
