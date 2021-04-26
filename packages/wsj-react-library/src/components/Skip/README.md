# Skip Component

The Skip Component component is an accessibility feature that allows users to skip to landmarks within our pages using a keyboard. It should be the first tabbable element on a site so this component will most likely live on top of the header on a page.

This component skips to the `main` landmark, the `search` button, and other sections on the page. This is determined by components and sections, with aria labels for sections marked as `complementary` or `region`, as well as an `id`, and a tab index of `-1`.

## User Behavior

When a user clicks `tab` on initial loading of the page, the Skip Component appears with two Buttons, `Skip to Main` and `Skip to Search`, as well as a dropdown with listed regions and components that a user is able to navigate to. The user is able to `tab` to button, render the dropdown list using `enter`, and scroll up and down, using the `arrow down` or `arrow-up` buttons.

## Areas For Improvement

After initial implementation within web-ui, a bug fix was added in order to properly navigate to the `Main` section, and have the `Skip to Main` button lose focus, thus properly close the Skip component. This was achieved by setting a tab index to the `main` element via `element.setAttribute()` and removed immediately upon scrolling to said area via `element.removeAttribute()`. However, this is regarded as anti-pattern for React as it directly manipulates the DOM. And directly setting a tab index to a `main` element is not standard practice.

## Removed Functionality

In production, functionality was added to detect whether or not a user is using a keyboard to navigate the site `detectInputModality()` and apply the appropriate css classes to ensure that focusable elements have a visual outline.

## Last Sync With Web-UI

April 23, 2021
