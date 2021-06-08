# Dynamic Inset Component

This dynamic inset component works by passing a dynamic inset data object as a `data` prop, or alternatively by passing a url for one via the `url` prop, which will be fetched on the client.

**Important**: Some dynamic insets are dependent on certain helper functions being defined on the global scope, to support these you will need to import the `LegacyScripts` component on your page as high as possible on the tree and preferably rendered on the server.
