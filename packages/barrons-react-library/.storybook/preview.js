import { createGlobalStyle } from 'styled-components';

import '../src/assets/fonts/Aileron.css';
import '../src/assets/fonts/Tiempos.css';

const GlobalStyles = createGlobalStyle``;

export const decorators = [
  (story) => (
    <>
      <GlobalStyles />
      {story()}
    </>
  ),
];
