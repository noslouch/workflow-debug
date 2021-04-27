# Footer Full Component

The Desktop Footer used on WSJ.com

## Props

| Prop                | Type    | Description                                                           |
| ------------------- | ------- | --------------------------------------------------------------------- |
| ccpaApplies         | string  |                                                                       |
| currentEditionLabel | string  |                                                                       |
| footerLinks         | shape   |                                                                       |
| homepages           | string  | The data for the various editions of WSJ                              |
| i8nText             | string  | Internationalized text used throughout the footer                     |
| localizeTextContent | string  | Used when there is localized text for the copyright text              |
| urls                | shape   | Various URLs used throughout the footer                               |
| region              | string  | The current Edition Key of the user (used to come from dj.svc.region) |
| title               | string  | Title of the site, different across editions                          |
| isLoggedIn          | boolean | To render the footer for subscribed user                              |
| disableLogin        | boolean | To hide the login and subscribe links on static stacks                |
