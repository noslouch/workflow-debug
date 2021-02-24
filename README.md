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

### Storybook
Storybook is used to preview and document our UI components. [See our guidelines here](docs/storybook.md).

### Tests

The library's NPM modules should be maintaned like an open-source project. As such, each contributor should write tests that ensure that whoever picks up their component can be sure of its functionality 

**Unit tests** should be fundamental part of each component added to the library. Their goal is to test the component output, given props and ensure smooth refactoring is possible with high trust in the end result. 

The library is using `Jest` as a test runner and `React Testing Library` for API and a test helper when working with components

When designing tests, follow industry standards described here: ![React Testing](https://reactjs.org/docs/testing-recipes.html) and ![React Testing Library helpers](https://testing-library.com/docs/react-testing-library/api)


**Integration tests**  can be achieved by using visual rendering tools such as Storybook. There, we should expect to visualise and preview components. More in the Storybook section above.

**Page Browser tests** is the domain of each team and not part of this library. They would be responsible for creating end-to-end testing suite to test their web pages as desired. Some tools to use could be:

- New Relic Syntetics
- Selenium Web Driver / Mocha
- Nightwatch / Cucumber

#### Testing Principles

1) Each component should contain tests that cover **all** real-use cases as well as edge-cases
2) Child components should be mocked
3) Dependencies, even built-in one like setTimeOut should be mocked
4) API calls should be stubbed/mocked
5) When refactoring components, failed tests should not be ignored. This might indicate app will fail with the newer version of the library.
6) Difficult to test component might indicate badly written one - consider refactoring it to reduce effects/dependancies

#### Snapshot tests

We should avoid using snapshot tests. While easy to set up, they can lead to poor functionality coverage and can lead to developer detachment from the testing problem. 

#### Test coverage

While flawed, it is the metric we have to use to ensure teams follow testing requirements. As such, the library enforces minimum testing coverage for each and every component.

The following minimums would be set:

      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      },
      "./packages/shared": {
        "branches": 90,
        "functions": 90,
        "lines": 90,
        "statements": 90
      },
 

### Customizable (themes, styles)

### Shared components decision tree

How do I decide if a component should be shared? Refer to [Component Design/Shared Components Decision Tree](docs/component-design.md#shared-components-decision-tree) for the checklist and process to do so.

### CI/CD Process

#### Automated versioning

During deployment process, we automatically bump version based on [Conventional Commits](https://www.conventionalcommits.org/).

`lerna version --conventional-commits` will use the Conventional Commits Specification to [determine the version bump](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump) and generate `CHANGELOG.md` files.

##### On merge to `main`

With the `--conventional-prerelease` flag, `lerna version --conventional-commits`
creates pre release versions by prefixing the version recommendation from conventional commits with `pre`.

##### On release deploy

With the `--conventional-graduate` flag, `lerna version --conventional-commits` graduates the specified packages with the version recommendation from conventional commits.

#### Automated linting, fixing

`.github/workflows/linter.yml` runs linting and provides automatic fixes when feasible. Any linting errors that cannot be auto-fixed are bubbled up for the developer to take fix. This is done via branch protection mandatory checks. The PR will show any linting failures as failed status checks preventing merges to main branch.

##### Linter workflow

When a commit is pushed to a PR:

- run prettier to format code according to defined rules
- if changes made, auto commit them to PR
- attempt linting most recent code
- if no errors, report status `PASS`
- if errors, report status `FAIL` (blocks PR from getting merged)

Example auto fix commit:

![auto commit fixes](docs/images/auto-commit-fixes.png)

#### Automated testing

`.github/workflows/continous-testing.yml` runs unit testing for each commit as it is pushed in a PR. The PR is blocked from merging if tests fail.

`.github/workflows/continous-code-quality.yml` runs code quality checks for each commit as it is pushed in a PR. PR reviewers can weigh in if a piece of code is too complex and ask for refactoring or override with justifications on a case by case basis. [TODO: Exact tool, implementation TBD after SPIKE is concluded].

#### Automated deployments

When a PR is merged to `main` branch, `.github/workflows/continous-deploy.yml` triggers an automatic deploy of the **_changed_** packages to create a **prerelease** version of the package. This enables users to start using the changes immediately without releasing an unstable version in the wild.

Automatic deploy follows these rules:

- check if `no-deploy` label is applied to PR. If so, skip deploy. This is an escape hatch for emergency cases and should not be used normally
- run `lerna changed` to get a list of changed packages
- run `lerna version --conventional-commits --conventional-prerelease=package-X,package-M` to create pre release packages in the npm registry

Once a package is deemed stable, a new version can be released by triggering the [release workflow](TODO add link).

#### Automated PR process helpers

In order to ease the maintenance burden on library maintainers, there are several automated chores that get executed when a PR is opened/changed. Some of these are:

- **PR Labeler** - Adds a repo label based on changed files. This allows developer to quickly sort out what relevant PRs based on their domain.
- **PR Size** - Analyzes changed files, insertions/deletions per file and total number of changes for the changeset and adds a t-shirt size label. It also posts a helpful comment explaining what it means. E.g., PR sizes of `small`, `medium` are preferred and encouraged. `large` PRs are borderline acceptable if the reviewers agree (the dev needs to provide reasons as to why this couldn't be broken into smaller PRs). `x-large` PRs are a strict no no and should be refactored.
- **Stale** - Labels PRs with no activity and cleans them up if no further activity is found after a certain amount of time.
- **Semantic Pull Request** - ensures pull request title or at least one commit (in case of single commit PRs) conforms to [Conventional Commits spec](https://www.conventionalcommits.org/).

### Performance benchmarks

#### Bundle size checks

Automated check that analyzes the bundle size when a commit is pushed to a PR. The new stats are compared to the benchmark stats stored in `main` branch and the delta is reported in the PR. This flags any unwanted bundle size increases for PR reviewers.

#### Build time checks

Automated check that analyzes the `npm install` when a commit is pushed to a PR. This flags any potential increases to PR reviewers so that corrective actions can be taken.

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
