# ArticleCommenting Component

The ArticleCommenting components renders the comment section utilizing the [Coral Talk Platform](https://github.dowjones.net/wsjconsumerutil/comment). In order for comments to appear for said article, please make sure that a canonical link pointing to the article url is set in the head.

**Please note**, there is intention to move over to another platform, [Open Web/Spot.im](https://www.openweb.com/), which is used across NewsCorp. But for the time being we will be using the existing Coral Talk structure and script.

## Expected User Behaviors

1. The comment section should not show if the user is not logged in or if comments are disabled.
2. The comment section button appears if a user is logged in. If the module is not activated they should see "Show Conversation (comment count)".
3. Once a user clicks on the button, the module is render via the embedded script, and the commment section appears. The button text will change to "Hide Conversation (comment count)".
4. If the user arrives to the article via a permalink created for a specific comment, the module will automatically render and the window will scroll down to said comment.
5. If an error occur, then the "Show/Hide Conversation" should be replaced with "CONVERSATION TEMPORARILY UNAVAILABLE (comment count)".

## Props - Description and Default Value

| Prop                 | Description                                                            | Type    | Default |
| -------------------- | ---------------------------------------------------------------------- | ------- | ------- |
| id                   | The article's SBID                                                     | String  | None    |
| commentCount         | Number of comments                                                     | Number  | 0       |
| coralCommentsEnabled | Determines if the article should have comments enabled                 | Boolean | False   |
| shouldCoralLoad\*    | Determines whether or not the user should have access to their profile | Boolean | False   |
| isProd               | If the environment is prod or not                                      | Boolean | False   |

\* An instance where this could be false and the comments are accessible is if they are reaching the The Wall Street Journal Community Rules & FAQs, or a developer is using override.
