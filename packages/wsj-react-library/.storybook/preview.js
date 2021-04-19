import { default as GlobalWSJStyles } from '../src/components/GlobalStyles';

export const decorators = [
  (story) => (
    <>
      <GlobalWSJStyles />
      {story()}
    </>
  ),
];
