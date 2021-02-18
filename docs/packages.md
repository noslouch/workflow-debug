# NPM Packages

Each package is published as a separate NPM module. Each component npm module can be used independently from the others so a rendering app might use one or more npm modules. 

Creating a new package should be approved by the repository code-owners, the council managing the library.

After creating a new package, a new build process needs to be set up

## Light packages


Packages should be tree shakable so the consumers only bundle what they need.
[TODO: add tree shakability how tos, samples (Brian's PR)]. ES6 bundles etc.

## Follow semver

With lerna, versioning can be shared or independent. To minimize noise and unnecessary burden of upgrades, we choose independent versioning. In other words, if a changeset includes changes to `/repoA`, only `repoA` gets a version bump.

### Automatic versioning

Commitizen and conventional commits

## Best Practices
 
### Building shared packages
 
Components in shared packages should be:

- fully tested  
- contain storybook data that shows their full functionality
- support themes
- are product-agnostic
- do not contain business logic

## Package types
Some example of packages that would exist in the library are:

 - **Brand Packages** This would be packages containing components unique for each brand. They might inherit from shared packages, adding unique product logic

Examples:

  `/src/components/wsj` 

  `/src/components/barrons`

  `/src/components/mansionglobal`

- **`shared/`** contains components that are generic and reusable between brands. See "Shared Components decision tree" bellow for more information if a component should be shared.

- **Logical Grouping** - group of components that represent a shared app or perhaps are components needed for a unique app within a brand. 

Examples:

  `/src/components/real-estate/`

  `/src/components/newsletter-cetner/`

You might want to extract a bunch of components as a separate package if they are used by a unique rendering app. This would make a brand's package simpler and would not pollute it with unique code.
Another reason why you might want to use it if there is a niche best practises/technologies applied that might not fit with the overall best practises. For example, using a different CSS framework

Benefits of extracting components into packages are:

- Faster builds
- Flexibility on rendering apps and technology they use
- Flexibility on the technology used such as CSS frameworks or varied builds 

### Define CODEOWNERS

Each team should define and communicate to the council the owners of a new package to ensure encapsulated access and avoid errors in merging by accident 
