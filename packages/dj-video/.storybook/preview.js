import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  // Resets
  html {
    font-size: 106.25%; // 17px
  }
  body {
    margin: 0;
    padding: 0;
  }
  // Fonts
  @font-face {
    font-family: Retina;
    src: url('https://www.wsj.com/fonts/woffs/retina/Retina-Book.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/Retina-Book.woff') format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: optional;
  }
  @font-face {
    font-family: Retina;
    src: url('https://www.wsj.com/fonts/woffs/retina/Retina-BookItalic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/Retina-BookItalic.woff') format("woff");
    font-weight: 400;
    font-style: italic;
    font-display: optional;
  }
  @font-face {
    font-family: Retina;
    src: url('https://www.wsj.com/fonts/woffs/retina/Retina-Light.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/Retina-Light.woff') format("woff");
    font-weight: 300;
    font-style: normal;
    font-display: optional;
  }
  @font-face {
    font-family: Retina;
    src: url('https://www.wsj.com/fonts/woffs/retina/Retina-LightItalic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/Retina-LightItalic.woff') format("woff");
    font-weight: 300;
    font-style: italic;
    font-display: optional;
  }
  @font-face {
    font-family: Retina;
    font-style: normal;
    font-weight: 500;
    src: url('https://www.wsj.com/fonts/woffs/retina/Retina-Medium.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/Retina-Medium.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: Retina;
    font-style: italic;
    font-weight: 500;
    src: url('https://www.wsj.com/fonts/woffs/retina/Retina-MediumItalic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/Retina-MediumItalic.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: 'Retina Narrow';
    font-style: normal;
    font-weight: 300;
    src: url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-Light.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-Light.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: 'Retina Narrow';
    font-style: italic;
    font-weight: 300;
    src: url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-LightItalic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-LightItalic.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: 'Retina Narrow';
    font-style: normal;
    font-weight: 400;
    src: url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-Book.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-Book.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: 'Retina Narrow';
    font-style: italic;
    font-weight: 400;
    src: url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-BookItalic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-BookItalic.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: 'Retina Narrow';
    font-style: normal;
    font-weight: 500;
    src: url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-Medium.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-Medium.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: 'Retina Narrow';
    font-style: italic;
    font-weight: 500;
    src: url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-MediumItalic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-MediumItalic.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: 'Retina Narrow';
    font-style: normal;
    font-weight: 700;
    src: url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-Bold.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-Bold.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: 'Retina Narrow';
    font-style: italic;
    font-weight: 700;
    src: url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-BoldItalic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/RetinaNarr-BoldItalic.woff') format("woff");
    font-display: optional;
  }
  @font-face {
    font-family: 'Escrow Condensed';
    src: url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Bold.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Bold.woff') format("woff");
    font-weight: 700;
    font-style: normal;
    font-display: optional;
  }
  @font-face {
    font-family: 'Escrow Condensed';
    src: url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Bold+Italic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Bold+Italic.woff') format("woff");
    font-weight: 700;
    font-style: italic;
    font-display: optional;
  }
  @font-face {
    font-family: 'Escrow Condensed';
    src: url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Roman.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Roman.woff') format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: optional;
  }
  @font-face {
    font-family: 'Escrow Condensed';
    src: url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Light.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Light.woff') format("woff");
    font-weight: 300;
    font-style: normal;
    font-display: optional;
  }
  @font-face {
    font-family: 'Escrow Condensed';
    src: url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Italic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/escrow/Escrow+Display+Condensed+Italic.woff') format("woff");
    font-weight: 400;
    font-style: italic;
    font-display: optional;
  }
  @font-face {
    font-family: Exchange;
    src: url('https://www.wsj.com/fonts/woffs/exchange/Exchange-Book.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/exchange/Exchange-Book.woff') format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: optional;
  }
  @font-face {
    font-family: Exchange;
    src: url('https://www.wsj.com/fonts/woffs/exchange/Exchange-BookItalic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/exchange/Exchange-BookItalic.woff') format("woff");
    font-weight: 400;
    font-style: italic;
    font-display: optional;
  }
  @font-face {
    font-family: Exchange;
    src: url('https://www.wsj.com/fonts/woffs/exchange/Exchange-Medium.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/exchange/Exchange-Medium.woff') format("woff");
    font-style: normal;
    font-weight: 500;
    font-display: optional;
  }
  @font-face {
    font-family: Exchange;
    src: url('https://www.wsj.com/fonts/woffs/exchange/Exchange-MediumItalic.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/exchange/Exchange-MediumItalic.woff') format("woff");
    font-style: italic;
    font-weight: 500;
    font-display: optional;
  }`;

export const decorators = [
  (story) => (
    <>
      <GlobalStyles />
      {story()}
    </>
  ),
];
