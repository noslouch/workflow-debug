# `@newscorp-ghfb/wsj-react-library`

Library of functional React components (built as [Styled Components](https://styled-components.com/docs)) that implements the _WSJ_ and _Noted._ design systems. FKA `dj-milford`, it's now part of the `dj-rendering` monorepo.

To see `wsj` components side-by-side with their design specs, please visit the [WSJ Design System](https://dowjones.invisionapp.com/dsm/dow-jones/wsj).

## Important Links

- See [Contributing Guidelines]('./docs/CONTRIBUTING.md) and [code philosphy](./docs/STANDARDS.md).
- See `TKTKTK` for component documentation.

## Setup

`@newscorp-ghfb/wsj-react-library` is published as a private GitHub package, and so you will need to authenticate with a token in order to install.

- [Generate a Personal Access Token and Enable SSO Access](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)
  - Add the permissions `read:package` and `repo`
  - Make sure `Enable SSO` is turned ON, click on authorize (You will need to do this even if you are updating the scope of an existing Token).
- [Log in to npm using the Token you generated](https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-with-a-personal-access-token)
- Add this to your `~/.npmrc` file: `@newscorp-ghfb:registry=https://npm.pkg.github.com`

### Install

Once you're authenticated, simply install like any other node module:

```bash
yarn add --dev @newscorp-ghfb/wsj-react-library
```

Or if your project uses `npm`:

```bash
npm i @newscorp-ghfb/wsj-react-library --save
```

You must also install `styled-components`, `react`, and `react-dom` in your app. They're all `peerDependencies`.

```bash
yarn add styled-components react react-dom
```

### Running locally

```bash
yarn start
```

## Usage

```js
import { Button } from '@newscorp-ghfb/wsj-react-library';

export default function Home() {
  return (
    <div>
      <p>
        <Button primary>Now Go Make Something</Button>
      </p>
      <p>
        <Button secondary>Now Go Make Something Secondary</Button>
      </p>
      <p>
        <Button tertiary>Now Go Make Something Tertiary</Button>
      </p>
    </div>
  );
}
```

![image](./docs/assets/example.png)

### Theming

CSS variables are used to theme components when needed. Their values come from [DJ Design Tokens](https://github.com/newscorp-ghfb/dj-design-tokens), which are then used by the [`GlobalStyles`](src/components/GlobalStyles) component. When using a component that has themeable values, you will need to import the `GlobalStyles` component and place it onto the page.

### Server Side Rendering

Styled Components offers a few utilities for enabling server side rendering. If you're working with `nextjs`, follow the directions [here](https://styled-components.com/docs/advanced#nextjs).

There are docs for other frameworks at that link as well.

## Developing

```bash
git clone git@github.com:newscorp-ghfb/dj-rendering.git
cd dj-rendering
npx lerna bootstrap
cd packages/wsj-react-library
yarn start
```

This will boot up a storybook development environment for you.

### `nvm`

If you use [`nvm`](https://github.com/creationix/nvm), you can run `nvm use` to switch to the version of node specified in [`.nvmrc`](https://github.com/creationix/nvm#nvmrc).

### Local Development

Read more in the [local development guide](./docs/local-development.md).

## Tests

```bash
yarn test
```

## Distributing

`@newscorp-ghfb/wsj-react-library` is distributed as commonjs (node) and ecmascript modules. The component source is transpiled to es5 and can be tree-shaken from the app's final bundle.

Additionally, storybook stories are shipped to our Design System Manager (DSM) interface where they can be seen with the original design artifacts.

### Versioning

New versions are distributed by the [monorepo using `lerna`](https://github.com/newscorp-ghfb/dj-rendering#cicd-process).

### Updating DSM

See the [DSM guide](./docs/DSM.md).
