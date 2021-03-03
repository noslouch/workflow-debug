# Stand-alone Guidelines

There are times when a component might offer functionality across so many use-cases that it merits its own package within this monorepo.

## But When?

Generally speaking, there are two scenarios that make the most sense for carving out a new package: low-level utility and high-level domain ownership.

## Low-level Utility

These are components that offer fundamental features that can find purchase in any of our web properties. These components would be good candidates for inclusion in projects that may not need any other component from the greater `dj-rendering` library.

An example of this might be an `<IFrame/>` component that captures enough complex logic as to prove useful to other many teams.

## High-level Domain Ownership

At the other end of the complexity spectrum, a group of components may be so tightly coordinated and logically organized that they don't offer any real value on their own. If you have certain components that tend to colocate only with other certain components, then you might have a candidate for a separate package.

These sorts of components tend to act as mini-apps within a larger app, but not always. 

An example of this might be a `NewsletterCenter`, which offers a stand-alone UI and several components specific to managing newsletter preferences.

## The Rules
It's critical that any component or group of components under consideration adhere to these guidelines:

### Ongoing Ownership and Maintenance
Are you (or your team) the primary author, user, and maintainer of a component or group of components? These would make a good candidate for moving into a new package.

### Large Dependencies
We're partly relying on ecmascript modules and tree-shaking to control bundle size in users of our library, but this requires ES module syntax all the way down. If your component depends on a third-party with a large bundle size that can't be tree-shaken (e.g. maybe it only exports as commonjs modules), you should consider moving your component to a new package.

**In general, think about dependency management and how new dependencies will affect bundle-size, dev setup, and build duration. See if there isn't a way to do what you want without adding to the dependency graph.**

### No Domain-Specific Business Rules
This is already a high-level goal for anything we're sharing between brands, but even in the absence of conditionals that check for a `'wsj'` string, domain-specific logic may be implied, e.g. expecting an opaque prop to conform to a particular structure.

Be mindful of any explicit or implicit logic that assumes too much context.

### No Nested Dependencies
Don't nest your dependencies. If your stand-alone module lists a package from `dj-rendering` as a dependency, we are in trouble.
