# Troubleshooting Cross-Package Dependencies

Sometimes edge cases pop up. Here's a log of the issues and how we resolved them.

## Referring to unreleased versions

Keep in mind that when tests run on ci/cd, it installs dependencies from the registry, _just as it would for an end-user_. This means just because we're in a monorepo, it doesn't mean you can import and use unreleased code.

Let's say you've got `pkgA` that depends on `pkgB`. If you make a change in `pkgB` and you want to support the change in `pkgA`, _do it in separate PRs_.

In this example, you would do things in this order:

1. Merge a PR to `pkgB` with your new feature. This triggers a prerelease for `pkgB`.
2. Merge a PR to `pkgA` that references the new prerelease version and uses the new feature from `pkgB`.

You would _not_ open a single PR to add a new feature in `pkgB` and use that feature in `pkgA`. The new feature in `pkgB` is technically unreleased, so when tests run on ci/cd, `pkgA` will install a version of `pkgB` that does not have the new feature.

This will leave you with a release PR that fails tests and can't merge.

You may think about some clever ways to get around this limitation, but it's advised not do so. The best practice is to publish the new feature in `pkgB` either as a prerelease or full release, then in a new PR bump the version number of `pkgA` and use the new feature.

[Here's a slack thread that demonstrates the pain of trying to be too clever about this](https://dowjones.slack.com/archives/C01LF5KCX0C/p1623426253000500).

## Usage on Servo

`wsj-react-library` and other packages under `@newscorp-ghfb` are not available (yet) on the internal NPM registy used by Servo. You might see an error like this when Servo attempts to install your project's dependencies during a build:

```sh
ERR! 404 Not Found - GET https://npm.onservo.com/@newscorp-ghfb%2fwsj-react-library - Not found
```

If that happens, here's how to remedy using a cool templating feature of NPM.

### Configuration

First, create a `.npmrc` in the root of your project like this. Do _not_ add it to `.gitignore`; it should be checked into your repository. Be aware that this will override other `.npmrc` files in your system.

```sh
@newscorp-ghfb:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NPM_CONFIG_NC_GHFB_TOKEN}
```

Next, copy the Personal Access Token that you used [for setup](https://github.com/newscorp-ghfb/dj-rendering/tree/main/packages/wsj-react-library#setup), or create a new one.

### Servo setup

Use the token to set `NPM_CONFIG_NC_GHFB_TOKEN` as a **build argument**. Note that this value is _separate_ from regular environment variables on Servo that are available at runtime.

```sh
https://next.onservo.com/sources/github.com/newscorp-ghfb/my-cool-servo-app/configs#envs
```

At this point, your build should succeed on Servo! 🥳

### Local setup

But you also need to set the environment variable locally in order to use NPM in your project. Here are some ways to do that:

1. Add it to the `.env` in your project root.
2. If that doesn't work, set it in your `.bashrc`, `.zshrc`, or whatever you use.
3. If all else fails, set it on the command line.

```sh
NPM_CONFIG_NC_GHFB_TOKEN=my_personal_access_token npm install
```
