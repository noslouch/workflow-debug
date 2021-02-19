# dj-rendering

This is repo for documenting common standards & guidelines for DJ Rendering UI library.

![shared ui library](docs/images/shared-ui-library.png)

## Standards & Guidelines

### Documentation

### Brief guide to repo structure 🗺

- `docs/` contains assets, components, and guides
- `packages/` contains the source code, storybook data and tests of all components
  - `/packages/:package` Contains groups of components that are logical to separate. This can be grouped by brand - like WSJ, Barrons etc or by application. For example

```
.
└── packages
    ├── newsletter-center
    │   ├── icons
    │   ├── index.js # entry point
    │   ├── readme.md # README for each component
    │   └── ...
    └── wsj
        ├── header
        │   ├── index.js
        │   └── ...
        └── footer
            ├── index.js
            └── ...
```

#### Storybook

#### Schema props

### Tests

#### Snapshot tests

#### Test coverage

### Customizable (themes, styles)

### Shared components decision tree

How do I decide if a component should be shared? Refer to [Component Design/Shared Components Decision Tree](docs/component-design.md#shared-components-decision-tree) for the checklist and process to do so.

### CI/CD Process

#### Automated versioning

#### Automated linting, fixing

#### Automated testing

#### Automated deployments

#### Automated PR process helpers

### Performance benchmarks

#### Bundle size checks

#### Build time checks

## Getting Started

### To install for local development:

```
$ git clone git@github.com:newscorp-ghfb/dj-rendering.git
$ cd dj-rendering
$ npm install
$ npm run start
```

## Component Development Guidelines

Components follow [Atomic design principles](https://atomicdesign.bradfrost.com/chapter-2/) and need to meet certain conventions, standards and best practices so that they can be used and re-used across apps, teams and projects in a consistent and user friendly manner.

Checkout the architecture and detailed guidelines [here](docs/component-design.md).

### Conventions

- Use `dj-design-tokens` in CSS whenever possible via import

```js
import { ColorMidnight } from '@newscorp-ghfb/dj-design-tokens/dist/js/wsj/tokens.es6'
```

- If there are several different styles via dark mode and light mode, save those as separate styles:

```js
import styled, { css } from 'styled-components'
import { ColorWhite, ColorMidnight } from '@newscorp-ghfb/dj-design-tokens/dist/js/wsj/tokens.es6.js'

const darkStyles = css`
  background: ${ColorMidnight};
  color: ${ColorWhite};
`

const lightStyles = css`
  background: ${ColorWhite};
  color: ${ColorMidnight};
`

const StyledNewComponent = styled.div`
  @media (prefers-color-scheme: dark) {
    ${darkStyles}
  }

  @media (prefers-color-scheme: light) {
    ${lightStyles}
  }

  && {
    ${(props) => (props.isDark ? darkStyles : lightStyles)}
  }
`

const NewComponent = ({ isDark }) => <StyledNewComponent isDark={isDark}>hello, i am new</StyledNewComponent>
```

- Set the respective `darkMode` setting within `NewComponent.stories.js`:

```js
export default {
  title: 'New Component',
  component: NewComponent,
  parameters: {
    darkMode: {
      current: 'light',
    },
    'in-dsm': {
      id: 'XXXX',
    },
  },
}

export const LightNewComponent = () => <NewComponent />

export const DarkNewComponent = () => <NewComponent isDark />

DarkNewComponent.parameters = {
  darkMode: {
    current: 'dark',
  },
}
```

### To build a component:

_using `NewComponent` as an example_

**1. Create a new component folder inside a package `src/packages/:package`**

```
src/packages/:package/NewComponent/
```

- Add an `index.js` file where you will create & export your `styled-component` as well as dictate `propTypes` and `defaultProps`.
- Add `NewComponent.stories.js` where you will import your component, export stories, pass `darkMode` parameters, and eventually pass your `in-dsm` id.
- Pull from `src/packages/shared` when you can
- If your component has subcomponents that are small and do not need to be shared among other components or exportable, add them within the main index folder. If they are larger / require use of `state`, etc, create a folder -> `NewComponent/SubComponent/`

**2. Export the component from `src/index.js`**

```js
export { default as NewComponent } from './packages/:package/NewComponent'
```

**3. Create a doc for your component at `docs/packages/:package/NewComponent.md`**

## Package Creation Guidelines

Checkout the package guidelines [here](docs/packages.md).

## How to? 🙋‍♂️

### Reach out for help

- Slack [#gcn-component-library](https://app.slack.com/client/T025QN6JG/C01LF5KCX0C)
- distribution list?

### Propose new changes

- RFC process?
- Raise a GitHub issue

### Upgrade shared dependencies

- how to upgrade shared dependencies

## Resources

- Read our [CONTRIBUTING](docs/CONTRIBUTING.md) guidelines to get started
- Reach out on slack channel [#TBD]()
- Our [roadmap]()
- Our [RFCs]()
- ...
