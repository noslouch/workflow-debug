# Component Design

## Component Classifications

![atomic design](images/atomic%20design.png)

### Atom

The smallest unit that is very generic and totally composable. Dumb components that accepts props and make no decision on their own (including styles); React hooks, headless UI components, shared utils, test helpers, mocks etc. would be some examples of such components. They make good candidates to live in `shared` repo.

### Molecule

Molecule is the first unit that makes business decisions ranging from business logic to styles. These are composable within the brand/product and can be made up of atoms. Some molecules can also be shared if they are generic enough. Molecules usually live under `/<brand>` repos but can occasionally be part of `/shared` as well.

### Organism

An organism is a group of molecules, atoms composed together to form a feature on a page.

[Food for thought: should the be part of UI library or app itself?]

### Example

![atomic design example](images/atomic%20design%20-%20example.png)

## Shared Components

Shared components are components that are widely used across products with a shared UX. They encapsulate logic that is shared across products allowing all to benefit from their utility.

Product specific design should be customizable based on props or themes without the need to change markup.

Shared components should not include any product specific logic. Accordingly props should all be generic and not reference specific products.

### Complexity
Development on shared components is complex and adds to cost (time and effort). Only components that have sufficient complexity to warrant the cost of upkeep should be shared, ensuring that the cost of developing on Shared Components is worth the gain.

### New Features
Product specific features that are unlikely to be implement across all products should not be included in a shared component.

Features that are intially being implemented for a single product, with the possibility of wider use, should take into account the current complexity of the component when deciding if adding the logic to the existing shared component is recommended. 
![shared component decision tree](images/shared-comp-decision-tree.png)

## Migrating components

You can migrate existing web-ui or other components to get a jump start on developing a component. A typical migration flow would involve the following steps

![existing component migration steps](images/comp-migration-flow.png)
