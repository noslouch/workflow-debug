import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle``;

export const decorators = [
  (story) => (
    <>
      <GlobalStyles />
      {story()}
    </>
  ),
];
