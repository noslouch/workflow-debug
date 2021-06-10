# Big Top

The Big Top component is designed to render above article content, outside the article body, and display an image or video.

There are four variations of the Big Top:

- Image
- Split Top
- Atmospheric (infinite looping silent video)
- Video (click to play)

Which one will render is mostly determined by the `datatype` property from the CAPI block.

## Props

| Prop            | Description                                                                                  | Type      | Default                        |
| --------------- | -------------------------------------------------------------------------------------------- | --------- | ------------------------------ |
| `breadcrumb`    | Breadcrumb link to content section                                                           | `Array`   | `[]`                           |
| `className`     | CSS class; used for `styled-components` compat                                               | `String`  | `''`                           |
| `dek`           | Content summary                                                                              | `String`  | `''`                           |
| `dynamicInset`  | Some insets will render a dynamic inset                                                      | `String`  | `''`                           |
| `flashline`     | Overrides the `breadcrumb` with a descriptive label                                          | `String`  | `''`                           |
| `headline`      | Article headline                                                                             | `String`  | `''`                           |
| `isExclusive`   | Boolean provided by Allesseh; if `true`, the `flashline` is rendered as `WSJ News Exclusive` | `Boolean` | `false`                        |
| `media`         | CAPI properties for the big top block                                                        | `Object`  | `{}`                           |
| `videoData`     | Video info retrieved from the video API                                                      | `Object`  | `{}`                           |
| `videoEndpoint` | Vido endpoint to pull video libs from                                                        | `String`  | `'https://video-api.wsj.com/'` |
