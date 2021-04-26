# ArticleCommenting Component

The ArticleCommenting components renders the comment section utilizing the [Coral Talk Platform](https://github.dowjones.net/wsjconsumerutil/comment). In order for comments to appear for said article, please make sure that a canonical link pointing to the article url is set in the head, for example: `<link rel="canonical" href={source_url}/>`

**Please note**, there is intention to move over to another platform, [Open Web/Spot.im](https://www.openweb.com/), which is used across NewsCorp. But for the time being we will be using the existing Coral Talk structure and script.

## Expected User Behaviors

1. Once a user clicks on the button, the module is rendered via the embedded script, and the commment section appears. The button text will change from "SHOW CONVERSATION (comment count)" to "HIDE CONVERSATION (comment count)".
2. If the user arrives to the article via a permalink created for a specific comment, the module will automatically render and the window will scroll down to said comment.
3. If an error occurs, then the "SHOW/HIDE CONVERSATION" text should be replaced with "CONVERSATION TEMPORARILY UNAVAILABLE (comment count)".

## Third-Party Script

This component wraps the [Coral](https://coralproject.net/) commenting library. It loads a JS library from and makes calls to a third-party endpoint.

The JS lib is requested from `${coralURL}/static/embed.js` and the API calls are made against `${coralURL}/api/v1/auth/dj/token`. Moderators who have been authenticated via Okta will have a cookie set (`coral-okta-signed-in=true`). Enable admin controls for these users by passing the `isAdmin` prop.

### Config

`coralURL` and `loginURL` have environment-specific values you can pass in based on your application's environment.

| Prop       | Env         | Value                                |
| ---------- | ----------- | ------------------------------------ |
| `coralURL` | nonprod/dev | `https://commenting.s.dev.wsj.com`   |
| `coralURL` | prod        | `https://commenting.wsj.com`         |
| `loginURL` | nonprod/dev | `https://int.accounts.wsj.com/login` |
| `loginURL` | prod        | `https://accounts.wsj.com/login`     |
