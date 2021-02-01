# dj-rendering

This is repo for documenting common standards & guidelines for DJ Rendering UI library.

![shared ui library](docs/images/shared-ui-library.png)

## Standards & Guidelines

### Documentation

### Brief guide to repo structure 🗺
* `docs/` contains assets, components, and guides
  * `components/` contains `README` files for each component 
* `src/` contains all of the source material + subdirectories
  * `components/` contains each exportable component as well as a `shared` folder for reusable internal components
  * `icons/`
  * `index.js` dictates exportable components

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
$ npm run themes
$ npm run storybook
```
## Component Development Guidelines

Components follow [Atomic design principles](https://atomicdesign.bradfrost.com/chapter-2/) and need to meet certain conventions, standards and best practices so that they can be used and re-used across apps, teams and projects in a consistent and user friendly manner.

Checkout the architecture and detailed guidelines [here](docs/component-design.md).

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
