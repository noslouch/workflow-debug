import { createGlobalStyle } from 'styled-components'
import cssTokens from '@newscorp-ghfb/dj-design-tokens/dist/web/noted/tokens.css'

export const GlobalStyles = createGlobalStyle`
  ${cssTokens}

  @font-face {
    font-family: Retina;
    font-style: normal;
    font-weight: 500;
    src: url('https://www.wsj.com/fonts/woffs/retina/Retina-Medium.woff2') format("woff2"), url('https://www.wsj.com/fonts/woffs/retina/Retina-Medium.woff') format("woff");
    font-display: swap;
  }
`
