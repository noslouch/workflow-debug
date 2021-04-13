import { withDsm } from '@invisionapp/dsm-storybook';
import { default as GlobalWSJStyles } from '../src/components/GlobalStyles';

export const decorators = [
  withDsm,
  (story) => (
    <>
      <GlobalWSJStyles />
      {story()}
    </>
  ),
];
