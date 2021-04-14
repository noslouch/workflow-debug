# EditionPicker

WSJ Edition Switcher, shared in WSJHeader and WSJFooter Components

This component appears in the top of the header allowing a user to choose their region.
Additionally, when region is China as second instance of this component appears allowing the
user to choose between variants of Chinese (Traditional and Simplified).

## Options

- `currentEditionLabel` | `string` | Label to display for the selected edition.
- `homepages` | `array` | Array of object fetched from `wsj-nav-service`, the data of each editions
- `placement` | `string` | One of two values: `header` or `footer`. Used for accessibility.
- `region` | `region` | Region of the page, follows `dj.svc.region`
- `tagName` | `string` | Sets tag type for the EditionPicker dropdown; default value is div.

## Contexts

- `editionPickerExpanded` | `boolean` | Handles the Edition Picker's toggling
