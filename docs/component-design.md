# Component Design

![atomic design](images/atomic%20design.png)

### Atom

The smallest unit that is very generic and totally composable. Dumb components that accepts props and make no decision on their own (including styles); React hooks, headless UI components, shared utils, test helpers, mocks etc. would be some examples of such components. They make good candidates to live in `shared` repo.

### Molecule

Molecule is the first unit that makes business decisions ranging from business logic to styles. These are composable within the brand/product and can be made up of atoms. Some molecules can also be shared if they are generic enough. Molecules usually live under `/<brand>` repos but can occasionally be part of `/shared` as well.

### Organism

An organism is a group of molecules, atoms composed together to form a feature on a page.

[Food for thought: should the be part of UI library or app itself?]
