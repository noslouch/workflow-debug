# NPM Packages

In order to ensure maximum compatibility and easy reuse, each package should strive to adhere to these core tenets.

## Light packages

Packages should be tree shakable so the consumers only bundle what they need.
[TODO: add tree shakability how tos, samples (Brian's PR)]. ES6 bundles etc.

## SSR Friendly

Components should be able to render server side.

## Follow semver

With lerna, versioning can be shared or independent. To minimize noise and unnecessary burden of upgrades, we choose independent versioning. In other words, if a changeset includes changes to `/repoA`, only `repoA` gets a version bump.

### Automatic versioning

Commitizen and conventional commits

## Best Practices

--- Nice to haves ---

### Define CODEOWNERS
